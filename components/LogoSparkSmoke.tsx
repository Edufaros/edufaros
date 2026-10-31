"use client";

import { useEffect, useRef, useState, type PointerEvent as ReactPointerEvent } from "react";
import type { ClientLogo } from "@/data/clients";

type Props = { logos: ClientLogo[]; cycleMs?: number; mode?: "mono" | "original" };
type Particle = {
  tx:number; ty:number; r:number; g:number; b:number;
  seed:number; delay:number; ox:number; oy:number; size:number;
};
type LogoItem = {
  name:string; particles:Particle[]; sprite:HTMLCanvasElement; shimmer:HTMLCanvasElement;
  x:number; y:number; width:number; height:number;
  glints:{x:number;y:number;strength:number}[];
  puffs:{x:number;y:number;delay:number;scale:number}[];
  embers:{x:number;y:number;delay:number;vx:number;vy:number;size:number;hue:number}[];
};
type PointerState = {x:number;y:number;active:boolean};

const W=720,H=328,ACCENT="97,238,219",BLUE="104,145,255";
const clamp=(v:number,min=0,max=1)=>Math.min(max,Math.max(min,v));
const outExpo=(t:number)=>t>=1?1:1-Math.pow(2,-10*t);
const easeInOut=(t:number)=>t<.5?2*t*t:1-Math.pow(-2*t+2,2)/2;
const pad=(n:number)=>String(n).padStart(2,"0");

function loadImage(src:string):Promise<HTMLImageElement|null>{
  return new Promise(resolve=>{
    const image=new window.Image();
    image.decoding="async";
    image.onload=()=>resolve(image);
    image.onerror=()=>resolve(null);
    image.src=src;
  });
}

function buildLogo(name:string,image:HTMLImageElement,mode:"mono"|"original",maxParticles:number):LogoItem|null{
  const scale=Math.min((W*.5)/image.naturalWidth,(H*.49)/image.naturalHeight);
  const width=Math.max(2,Math.round(image.naturalWidth*scale));
  const height=Math.max(2,Math.round(image.naturalHeight*scale));
  const x=Math.round((W-width)/2),y=Math.round((H-height)/2-6);
  const source=document.createElement("canvas");
  source.width=width;source.height=height;
  const sourceContext=source.getContext("2d",{willReadFrequently:true});
  if(!sourceContext)return null;

  let pixels:Uint8ClampedArray;
  try{
    sourceContext.drawImage(image,0,0,width,height);
    const imageData=sourceContext.getImageData(0,0,width,height);
    const data=imageData.data;
    for(let i=0;i<data.length;i+=4){
      if(data[i+3]===0)continue;
      const luminance=data[i]*.2126+data[i+1]*.7152+data[i+2]*.0722;
      const alpha=clamp((248-luminance)/34);
      data[i+3]=Math.round(data[i+3]*alpha);
      data[i]=0;data[i+1]=0;data[i+2]=0;
    }
    sourceContext.putImageData(imageData,0,0);
    pixels=data;
  }catch{return null;}

  const countVisible=(step:number)=>{
    let count=0;
    for(let py=0;py<height;py+=step)for(let px=0;px<width;px+=step){
      if(pixels[(py*width+px)*4+3]>110)count++;
    }
    return count;
  };
  let step=2;
  while(countVisible(step)>maxParticles&&step<10)step++;

  const particles:Particle[]=[];
  for(let py=0;py<height;py+=step)for(let px=0;px<width;px+=step){
    const p=(py*width+px)*4;
    if(pixels[p+3]<=110)continue;
    const angle=Math.random()*Math.PI*2;
    particles.push({
      tx:x+px,ty:y+py,
      r:mode==="mono"?255:pixels[p],
      g:mode==="mono"?255:pixels[p+1],
      b:mode==="mono"?255:pixels[p+2],
      seed:Math.random(),delay:Math.random()*.22,
      ox:Math.cos(angle),oy:Math.sin(angle),size:step*.95
    });
  }
  if(!particles.length)return null;

  const sprite=document.createElement("canvas");
  sprite.width=width;sprite.height=height;
  const spriteContext=sprite.getContext("2d");
  if(!spriteContext)return null;
  spriteContext.drawImage(source,0,0,width,height);
  if(mode==="mono"){
    spriteContext.globalCompositeOperation="source-in";
    spriteContext.fillStyle="#fff";
    spriteContext.fillRect(0,0,width,height);
  }

  const shimmer=document.createElement("canvas");
  shimmer.width=width;shimmer.height=height;
  const choose=()=>particles[Math.floor(Math.random()*particles.length)];
  const glints=Array.from({length:12},()=>{
    const p=choose();return{x:p.tx,y:p.ty,strength:Math.random()};
  });
  const puffs=Array.from({length:18},()=>({
    x:x+Math.random()*width,y:y+Math.random()*height,
    delay:Math.random()*.55,scale:.6+Math.random()*1.2
  }));
  const embers=Array.from({length:38},()=>{
    const p=choose();
    return{
      x:p.tx,y:p.ty,delay:Math.random()*.45,
      vx:(Math.random()-.5)*95,vy:48+Math.random()*150,
      size:1+Math.random()*2.8,hue:Math.random()
    };
  });
  return{name,particles,sprite,shimmer,x,y,width,height,glints,puffs,embers};
}

function createSmokeSprite():HTMLCanvasElement{
  const canvas=document.createElement("canvas");canvas.width=canvas.height=96;
  const context=canvas.getContext("2d")!;
  const gradient=context.createRadialGradient(48,48,0,48,48,48);
  gradient.addColorStop(0,"rgba(210,225,235,.34)");
  gradient.addColorStop(.36,"rgba(115,190,195,.16)");
  gradient.addColorStop(1,"rgba(75,120,150,0)");
  context.fillStyle=gradient;context.fillRect(0,0,96,96);
  return canvas;
}

function drawGlint(ctx:CanvasRenderingContext2D,x:number,y:number,radius:number,alpha:number,color="255,255,255"){
  ctx.fillStyle="rgba("+color+","+alpha+")";
  ctx.fillRect(x-radius,y-.7,radius*2,1.4);
  ctx.fillRect(x-.7,y-radius,1.4,radius*2);
  ctx.beginPath();ctx.arc(x,y,radius*.22,0,Math.PI*2);ctx.fill();
}

function drawEnergyImpact(ctx:CanvasRenderingContext2D,cx:number,cy:number,t:number){
  if(t<0||t>1.05)return;
  ctx.save();ctx.globalCompositeOperation="lighter";
  for(let ring=0;ring<2;ring++){
    const delay=ring*.17,progress=clamp((t-delay)/.82);
    if(progress<=0||progress>=1)continue;
    const radius=12+easeInOut(progress)*(ring===0?245:195);
    ctx.beginPath();ctx.arc(cx,cy,radius,0,Math.PI*2);
    ctx.strokeStyle=ring===0
      ?"rgba("+ACCENT+","+(1-progress)*.82+")"
      :"rgba("+BLUE+","+(1-progress)*.62+")";
    ctx.lineWidth=ring===0?2.2:1.25;
    ctx.shadowColor=ring===0?"rgba("+ACCENT+",.8)":"rgba("+BLUE+",.7)";
    ctx.shadowBlur=18;ctx.stroke();
  }
  ctx.shadowBlur=0;

  const rayFade=1-clamp(t/.54);
  if(rayFade>0){
    for(let i=0;i<46;i++){
      const angle=(i/46)*Math.PI*2+Math.sin(i*12.37)*.035;
      const near=30+((i*37)%68)+t*45;
      const length=24+((i*17)%80)*(1-t*.45);
      ctx.beginPath();
      ctx.moveTo(cx+Math.cos(angle)*near,cy+Math.sin(angle)*near);
      ctx.lineTo(cx+Math.cos(angle)*(near+length),cy+Math.sin(angle)*(near+length));
      ctx.strokeStyle=i%5===0
        ?"rgba("+BLUE+","+rayFade*.9+")"
        :"rgba(225,252,255,"+rayFade*.76+")";
      ctx.lineWidth=i%7===0?2:.9;ctx.stroke();
    }
  }

  const slashFade=1-clamp(t/.43);
  if(slashFade>0){
    for(let i=0;i<3;i++){
      const offset=(i-1)*34;
      ctx.beginPath();
      ctx.moveTo(cx-145+t*130+offset,cy+78-offset*.45);
      ctx.lineTo(cx-28+t*130+offset,cy-42-offset*.45);
      ctx.lineTo(cx+115+t*130+offset,cy-105-offset*.45);
      ctx.strokeStyle=i===1
        ?"rgba(255,255,255,"+slashFade*.95+")"
        :"rgba("+ACCENT+","+slashFade*.62+")";
      ctx.lineWidth=i===1?2.6:1.1;
      ctx.shadowColor="rgba("+ACCENT+",.7)";ctx.shadowBlur=13;ctx.stroke();
    }
  }
  ctx.restore();
}

function drawFrame(ctx:CanvasRenderingContext2D,logo:LogoItem,t:number,elapsed:number,smoke:HTMLCanvasElement,pointer:PointerState){
  ctx.clearRect(0,0,W,H);
  const autoX=Math.sin(elapsed*.72)*.12,autoY=Math.cos(elapsed*.54)*.09;
  const px=pointer.active?pointer.x:autoX,py=pointer.active?pointer.y:autoY;
  ctx.save();
  ctx.translate(px*4.5,py*3);

  const cx=logo.x+logo.width/2,cy=logo.y+logo.height/2;
  const glowAlpha=clamp(t/.3)*(1-clamp((t-3.05)/.85))*(.23+.12*(Math.sin(elapsed*2)+1));
  if(glowAlpha>0){
    const glow=ctx.createRadialGradient(cx+px*105,cy+py*55,0,cx+px*105,cy+py*55,245);
    glow.addColorStop(0,"rgba("+ACCENT+","+glowAlpha+")");
    glow.addColorStop(.58,"rgba(36,113,155,"+glowAlpha*.22+")");
    glow.addColorStop(1,"rgba(0,0,0,0)");
    ctx.fillStyle=glow;ctx.fillRect(0,0,W,H);
  }

  const orbitX=cx+Math.cos(elapsed*.85)*170,orbitY=cy+Math.sin(elapsed*.9)*72;
  const orbit=ctx.createRadialGradient(orbitX,orbitY,0,orbitX,orbitY,90);
  orbit.addColorStop(0,"rgba("+BLUE+",.12)");orbit.addColorStop(1,"rgba("+BLUE+",0)");
  ctx.fillStyle=orbit;ctx.fillRect(0,0,W,H);

  drawEnergyImpact(ctx,cx,cy,t);

  // Spiral particles sweep in from a loose orbital field and settle into the mark.
  const assembleStart=.28,assembleDuration=.92,particleFade=1-clamp((t-1.32)/.28);
  if(t>=assembleStart&&t<1.62&&particleFade>0){
    for(const p of logo.particles){
      const progress=clamp((t-(assembleStart+p.delay*.45))/assembleDuration);
      if(progress<=0)continue;
      const eased=outExpo(progress);
      const baseAngle=Math.atan2(p.ty-cy,p.tx-cx);
      const spin=baseAngle+(1-eased)*Math.PI*3.25+(p.seed-.5)*.72;
      const radius=(1-eased)*(90+p.seed*145);
      const swirlX=Math.cos(spin)*radius,swirlY=Math.sin(spin)*radius*.72;
      const settle=Math.sin(eased*Math.PI)*(p.seed-.5)*7;
      const x=p.tx+swirlX+settle,y=p.ty+swirlY-settle*.35;
      const teal=p.seed<.18?1-eased:0,blue=p.seed>.92?1-eased:0;
      const r=Math.round(255-teal*145-blue*145);
      const g=Math.round(255-blue*105),b=Math.round(255-teal*36);
      ctx.fillStyle="rgba("+r+","+g+","+b+","+particleFade*clamp(progress*2.7)+")";
      const size=p.size*(1+(1-eased)*1.7);ctx.fillRect(x,y,size,size);
    }
  }

  // A brief luminous contour outlines the logo before its solid reveal.
  const outlineAlpha=clamp((t-.91)/.28)*(1-clamp((t-1.38)/.2));
  if(outlineAlpha>0){
    ctx.save();ctx.globalCompositeOperation="lighter";
    ctx.globalAlpha=outlineAlpha*.72;ctx.shadowColor="rgba("+ACCENT+",.9)";ctx.shadowBlur=24;
    ctx.drawImage(logo.sprite,logo.x,logo.y);
    ctx.globalAlpha=outlineAlpha*.24;ctx.shadowColor="rgba("+BLUE+",.9)";ctx.shadowBlur=34;
    ctx.drawImage(logo.sprite,logo.x+3,logo.y-1);ctx.restore();
  }

  // The logo locks into focus; a diagonal holographic scan sweeps across it.
  const logoAlpha=clamp((t-1.05)/.28)*(1-clamp((t-3.02)/.24));
  if(logoAlpha>0){
    const sh=logo.shimmer.getContext("2d")!;
    sh.globalCompositeOperation="source-over";sh.clearRect(0,0,logo.width,logo.height);
    sh.drawImage(logo.sprite,0,0);
    const scan=clamp((t-1.18)/1.22);
    if(scan>0&&scan<1){
      sh.globalCompositeOperation="source-atop";
      const bandX=-logo.width*.42+scan*logo.width*1.84;
      const band=sh.createLinearGradient(bandX,0,bandX+logo.width*.32,logo.height);
      band.addColorStop(0,"rgba("+ACCENT+",0)");
      band.addColorStop(.28,"rgba("+ACCENT+",.1)");
      band.addColorStop(.5,"rgba(255,255,255,.98)");
      band.addColorStop(.72,"rgba("+BLUE+",.2)");
      band.addColorStop(1,"rgba("+ACCENT+",0)");
      sh.fillStyle=band;sh.fillRect(0,0,logo.width,logo.height);
    }

    // A few controlled horizontal slices suggest holographic interference.
    if(t>1.42&&t<1.92){
      ctx.save();ctx.globalAlpha=.22*logoAlpha;
      for(let band=0;band<5;band++){
        const sourceY=Math.floor((band+.5)*logo.height/6);
        const sliceHeight=Math.max(2,Math.floor(logo.height*.035));
        const offset=Math.sin(t*66+band*3.2)*(band%2?4:-4);
        ctx.drawImage(logo.sprite,0,sourceY,logo.width,sliceHeight,logo.x+offset,logo.y+sourceY,logo.width,sliceHeight);
      }
      ctx.restore();
    }

    ctx.globalAlpha=logoAlpha;ctx.shadowColor="rgba("+ACCENT+",.72)";ctx.shadowBlur=25;
    ctx.drawImage(logo.shimmer,logo.x,logo.y);ctx.shadowBlur=0;ctx.globalAlpha=1;
  }

  // A calm hero hold keeps the logo clean and fully readable.
  if(t>2.08&&t<3.03){
    const pulse=.72+.12*Math.sin((t-2.08)*5.5);
    ctx.save();ctx.globalCompositeOperation="lighter";
    for(const point of logo.glints){
      const wave=Math.pow(Math.max(0,Math.sin(elapsed*3.1+point.strength*11)),12);
      const alpha=wave*pulse;
      if(alpha>.035)drawGlint(ctx,point.x,point.y,4+point.strength*7,alpha,point.strength>.83?BLUE:ACCENT);
    }
    ctx.restore();
  }

  // Smoke exit: the mark breaks into rising fragments, embers and soft volumetric puffs.
  if(t>3.0){
    const progress=clamp((t-3.0)/.92);
    const fade=1-clamp(progress*1.55);
    if(fade>0){
      for(let i=0;i<logo.particles.length;i+=4){
        const p=logo.particles[i];
        const lift=Math.pow(progress,1.2)*(42+p.seed*135);
        const drift=Math.sin(progress*4.5+p.seed*16)*22*progress;
        const x=p.tx+drift+(p.seed-.5)*22*progress,y=p.ty-lift;
        const alpha=Math.pow(1-progress,1.35)*.68;
        ctx.fillStyle=p.seed>.88?"rgba("+BLUE+","+alpha+")":"rgba("+ACCENT+","+alpha+")";
        ctx.shadowColor="rgba("+ACCENT+",.85)";ctx.shadowBlur=8;
        ctx.fillRect(x,y,p.size*(1.2+progress),p.size*(1.2+progress));
      }
      ctx.shadowBlur=0;
    }

    for(const puff of logo.puffs){
      const u=clamp((progress-puff.delay*.35)/(1-puff.delay*.35));
      if(u<=0)continue;
      const size=35+u*125*puff.scale,drift=Math.sin(u*3+puff.delay*9)*21;
      ctx.globalAlpha=(1-u)*.27;
      ctx.drawImage(smoke,puff.x+drift-size/2,puff.y-u*100-size/2,size,size);
    }
    ctx.globalAlpha=1;

    ctx.save();ctx.globalCompositeOperation="lighter";
    for(const ember of logo.embers){
      const u=clamp((progress-ember.delay)/(1-ember.delay));
      if(u<=0||u>=1)continue;
      const x=ember.x+ember.vx*u+Math.sin(u*5+ember.delay*12)*13;
      const y=ember.y-ember.vy*u,alpha=(1-u)*.9;
      const color=ember.hue>.55?BLUE:ACCENT;
      ctx.strokeStyle="rgba("+color+","+alpha*.55+")";ctx.lineWidth=ember.size;
      ctx.beginPath();ctx.moveTo(x,y+8+ember.vy*.025);ctx.lineTo(x,y);ctx.stroke();
      ctx.fillStyle="rgba(255,255,255,"+alpha+")";
      ctx.fillRect(x-ember.size*.35,y-ember.size*.35,ember.size*.7,ember.size*.7);
    }
    ctx.restore();
  }

  // Pointer light on desktop; animated ambient drift is used on touch devices.
  if(pointer.active&&t>.65&&t<3.05){
    const lx=W*(.5+pointer.x*.35),ly=H*(.5+pointer.y*.34);
    const light=ctx.createRadialGradient(lx,ly,0,lx,ly,80);
    light.addColorStop(0,"rgba(255,255,255,.09)");
    light.addColorStop(.35,"rgba("+ACCENT+",.075)");
    light.addColorStop(1,"rgba("+ACCENT+",0)");
    ctx.fillStyle=light;ctx.fillRect(0,0,W,H);
  }
  ctx.restore();
}

export default function LogoSparkSmoke({logos,cycleMs=4000,mode="mono"}:Props){
  const canvasRef=useRef<HTMLCanvasElement>(null);
  const pointerRef=useRef<PointerState>({x:0,y:0,active:false});
  const [index,setIndex]=useState(0);
  const [names,setNames]=useState<string[]>([]);
  const [ready,setReady]=useState(false);
  const [reducedMotion,setReducedMotion]=useState(false);

  useEffect(()=>{
    if(window.matchMedia("(prefers-reduced-motion: reduce)").matches){
      setReducedMotion(true);setReady(true);return;
    }
    const canvas=canvasRef.current,ctx=canvas?.getContext("2d");
    if(!canvas||!ctx){setReady(true);return;}
    const small=window.matchMedia("(max-width: 680px)").matches;
    const dpr=Math.min(window.devicePixelRatio||1,small?1.5:2);
    const maxParticles=small?1050:1850;
    canvas.width=W*dpr;canvas.height=H*dpr;ctx.setTransform(dpr,0,0,dpr,0,0);

    let cancelled=false,raf=0,visible=false,clock=0,last=0,current=-1,items:LogoItem[]=[];
    const smoke=createSmokeSprite(),cycleSeconds=cycleMs/1000;
    const pause=()=>{if(raf)window.cancelAnimationFrame(raf);raf=0;last=0;};
    const tick=(now:number)=>{
      if(cancelled||!visible||document.hidden){raf=0;return;}
      const dt=Math.min((now-last)/1000,.05);last=now;clock+=dt;
      const next=Math.floor(clock/cycleSeconds)%items.length;
      if(next!==current){current=next;setIndex(next);}
      drawFrame(ctx,items[next],(clock%cycleSeconds)*(4/cycleSeconds),clock,smoke,pointerRef.current);
      raf=window.requestAnimationFrame(tick);
    };
    const start=()=>{if(cancelled||raf||!visible||document.hidden||!items.length)return;last=performance.now();raf=window.requestAnimationFrame(tick);};
    const observer=new IntersectionObserver(([entry])=>{visible=entry.isIntersecting;if(visible)start();else pause();},{threshold:.05});
    observer.observe(canvas);
    const onVisibility=()=>{if(document.hidden)pause();else start();};
    document.addEventListener("visibilitychange",onVisibility);

    Promise.all(logos.map(async logo=>({logo,image:await loadImage(logo.src)}))).then(results=>{
      if(cancelled)return;
      items=results
        .filter((item):item is {logo:ClientLogo;image:HTMLImageElement}=>item.image!==null)
        .map(item=>buildLogo(item.logo.name,item.image,mode,maxParticles))
        .filter((item):item is LogoItem=>item!==null);
      setNames(items.map(item=>item.name));setReady(true);start();
    }).catch(()=>{if(!cancelled)setReady(true);});

    return()=>{
      cancelled=true;pause();observer.disconnect();
      document.removeEventListener("visibilitychange",onVisibility);
    };
  },[logos,cycleMs,mode]);

  const total=names.length||logos.length;
  const displayName=names[index]||"Loading client logos";
  const handlePointerMove=(event:ReactPointerEvent<HTMLDivElement>)=>{
    if(event.pointerType!=="mouse")return;
    const rect=event.currentTarget.getBoundingClientRect();
    pointerRef.current={
      x:clamp(((event.clientX-rect.left)/rect.width-.5)*2,-1,1),
      y:clamp(((event.clientY-rect.top)/rect.height-.5)*2,-1,1),
      active:true
    };
  };
  const handlePointerLeave=()=>{
    pointerRef.current={x:0,y:0,active:false};
  };

  return(
    <section className="logo-box" aria-label="Companies and professionals we have worked with">
      <header className="lb-head">
        <span className="lb-eyebrow">TRUSTED BY</span>
        <span className="lb-count">{pad(Math.min(index+1,total))} / {pad(total)}</span>
      </header>
      {reducedMotion?(
        <ul className="lb-grid">
          {logos.map(logo=><li key={logo.name}><img src={logo.src} alt={logo.name} loading="lazy"/></li>)}
        </ul>
      ):(
        <div className="lb-stage lb-stage-cinematic" onPointerMove={handlePointerMove} onPointerLeave={handlePointerLeave}>
          <canvas ref={canvasRef} aria-hidden="true"/>
          {!ready&&<div className="lb-loading">Preparing the showcase…</div>}
          {ready&&names.length===0&&<div className="lb-loading">Client logos could not be loaded.</div>}
          <i className="lb-c lb-tl" aria-hidden="true"/>
          <i className="lb-c lb-tr" aria-hidden="true"/>
          <i className="lb-c lb-bl" aria-hidden="true"/>
          <i className="lb-c lb-br" aria-hidden="true"/>
        </div>
      )}
      {!reducedMotion&&ready&&names.length>0&&(
        <footer className="lb-foot">
          <span key={displayName} className="lb-name" aria-live="polite">{displayName}</span>
          <div className="lb-bar" aria-hidden="true"><i key={index} style={{animationDuration:cycleMs+"ms"}}/></div>
        </footer>
      )}
      <ul className="logo-sr-only">{logos.map(logo=><li key={logo.name}>{logo.name}</li>)}</ul>
    </section>
  );
}
