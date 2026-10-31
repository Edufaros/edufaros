"use client";
import { useEffect, useRef, useState } from "react";
import type { ClientLogo } from "@/data/clients";

type Props = { logos: ClientLogo[]; cycleMs?: number; mode?: "mono" | "original" };
type Particle = { tx:number; ty:number; r:number; g:number; b:number; seed:number; delay:number; ox:number; oy:number; size:number };
type LogoItem = {
  name:string; particles:Particle[]; sprite:HTMLCanvasElement; shimmer:HTMLCanvasElement;
  x:number; y:number; width:number; height:number;
  glints:{x:number;y:number;strength:number}[];
  puffs:{x:number;y:number;delay:number;scale:number}[];
};

const W=720,H=405,MAX_PARTICLES=2200,ACCENT="97,238,219";
const clamp=(v:number,min=0,max=1)=>Math.min(max,Math.max(min,v));
const outExpo=(t:number)=>t>=1?1:1-Math.pow(2,-10*t);
const pad=(n:number)=>String(n).padStart(2,"0");

function loadImage(src:string):Promise<HTMLImageElement|null>{
  return new Promise(resolve=>{
    const image=new window.Image();
    image.decoding="async"; image.onload=()=>resolve(image); image.onerror=()=>resolve(null); image.src=src;
  });
}

function buildLogo(name:string,image:HTMLImageElement,mode:"mono"|"original"):LogoItem|null{
  const scale=Math.min((W*.5)/image.naturalWidth,(H*.34)/image.naturalHeight);
  const width=Math.max(2,Math.round(image.naturalWidth*scale));
  const height=Math.max(2,Math.round(image.naturalHeight*scale));
  const x=Math.round((W-width)/2),y=Math.round((H-height)/2-8);
  const source=document.createElement("canvas"); source.width=width; source.height=height;
  const sourceContext=source.getContext("2d",{willReadFrequently:true});
  if(!sourceContext)return null;
  let pixels:Uint8ClampedArray;
  try{sourceContext.drawImage(image,0,0,width,height);pixels=sourceContext.getImageData(0,0,width,height).data;}catch{return null;}
  const countVisible=(step:number)=>{
    let count=0;
    for(let py=0;py<height;py+=step)for(let px=0;px<width;px+=step)if(pixels[(py*width+px)*4+3]>110)count++;
    return count;
  };
  let step=2; while(countVisible(step)>MAX_PARTICLES&&step<8)step++;
  const particles:Particle[]=[];
  for(let py=0;py<height;py+=step)for(let px=0;px<width;px+=step){
    const p=(py*width+px)*4; if(pixels[p+3]<=110)continue;
    const angle=Math.random()*Math.PI*2;
    particles.push({tx:x+px,ty:y+py,r:mode==="mono"?255:pixels[p],g:mode==="mono"?255:pixels[p+1],b:mode==="mono"?255:pixels[p+2],
      seed:Math.random(),delay:Math.random()*.15,ox:Math.cos(angle),oy:Math.sin(angle),size:step*.95});
  }
  if(!particles.length)return null;
  const sprite=document.createElement("canvas");sprite.width=width;sprite.height=height;
  const spriteContext=sprite.getContext("2d");if(!spriteContext)return null;
  spriteContext.drawImage(image,0,0,width,height);
  if(mode==="mono"){spriteContext.globalCompositeOperation="source-in";spriteContext.fillStyle="#fff";spriteContext.fillRect(0,0,width,height);}
  const shimmer=document.createElement("canvas");shimmer.width=width;shimmer.height=height;
  const choose=()=>particles[Math.floor(Math.random()*particles.length)];
  const glints=Array.from({length:8},()=>{const p=choose();return{x:p.tx,y:p.ty,strength:Math.random()};});
  const puffs=Array.from({length:14},()=>({x:x+Math.random()*width,y:y+Math.random()*height,delay:Math.random()*.4,scale:.6+Math.random()}));
  return{name,particles,sprite,shimmer,x,y,width,height,glints,puffs};
}

function createSmokeSprite():HTMLCanvasElement{
  const canvas=document.createElement("canvas");canvas.width=canvas.height=64;
  const context=canvas.getContext("2d")!;
  const gradient=context.createRadialGradient(32,32,0,32,32,32);
  gradient.addColorStop(0,"rgba(190,200,220,.6)");gradient.addColorStop(1,"rgba(190,200,220,0)");
  context.fillStyle=gradient;context.fillRect(0,0,64,64);return canvas;
}

function drawGlint(ctx:CanvasRenderingContext2D,x:number,y:number,r:number,a:number){
  ctx.fillStyle="rgba(255,255,255,"+a+")";ctx.fillRect(x-r,y-.7,r*2,1.4);ctx.fillRect(x-.7,y-r,1.4,r*2);
}

function drawFrame(ctx:CanvasRenderingContext2D,L:LogoItem,t:number,smoke:HTMLCanvasElement){
  ctx.clearRect(0,0,W,H);
  const cx=L.x+L.width/2,cy=L.y+L.height/2;
  const glowAlpha=clamp(t/.3)*(1-clamp((t-2.9)/.9))*.35;
  if(glowAlpha>0){
    const g=ctx.createRadialGradient(cx,cy,0,cx,cy,260);
    g.addColorStop(0,"rgba("+ACCENT+","+glowAlpha+")");g.addColorStop(1,"rgba(0,0,0,0)");
    ctx.fillStyle=g;ctx.fillRect(0,0,W,H);
  }
  ctx.globalCompositeOperation="lighter";
  if(t<.9){
    const flash=1-clamp(t/.18);
    if(flash>0){
      const burst=ctx.createRadialGradient(cx,cy,0,cx,cy,70+t*400);
      burst.addColorStop(0,"rgba(255,255,255,"+flash+")");burst.addColorStop(.4,"rgba("+ACCENT+","+(flash*.5)+")");burst.addColorStop(1,"rgba(0,0,0,0)");
      ctx.fillStyle=burst;ctx.fillRect(0,0,W,H);
    }
    const fade=1-clamp(t/.4);
    if(fade>0){
      ctx.strokeStyle="rgba(255,255,255,"+fade+")";ctx.lineWidth=1.4;ctx.beginPath();
      for(let i=0;i<32;i++){
        const a=(i/32)*Math.PI*2+(i%3)*.05,r1=30+t*700*(1+(i%4)*.15),r2=r1+70*fade*(1+(i%5)*.2);
        ctx.moveTo(cx+Math.cos(a)*r1,cy+Math.sin(a)*r1);ctx.lineTo(cx+Math.cos(a)*r2,cy+Math.sin(a)*r2);
      }ctx.stroke();
    }
    const ring=clamp(t/.5);
    if(ring<1){ctx.strokeStyle="rgba("+ACCENT+","+(1-ring)+")";ctx.lineWidth=2.5;ctx.beginPath();ctx.arc(cx,cy,outExpo(ring)*300,0,Math.PI*2);ctx.stroke();}
  }
  const pa=t<2.85?1-clamp((t-1)/.4):0;
  if(pa>0)for(const p of L.particles){
    const u=clamp((t-p.delay)/.6);if(u<=0)continue;
    const e=outExpo(u),sway=Math.sin(e*Math.PI)*(p.seed-.5)*90,m=1-e;
    const px=cx+(p.tx-cx)*e+p.ox*sway,py=cy+(p.ty-cy)*e+p.oy*sway;
    const r=Math.round(p.r+(255-p.r)*m),g=Math.round(p.g+(255-p.g)*m),b=Math.round(p.b+(210-p.b)*m);
    ctx.fillStyle="rgba("+r+","+g+","+b+","+pa+")";const size=p.size*(1+m*1.5);ctx.fillRect(px,py,size,size);
  }
  ctx.globalCompositeOperation="source-over";
  const ca=clamp((t-.6)/.5)*(1-clamp((t-2.85)/.35));
  if(ca>0){
    const sh=L.shimmer.getContext("2d")!;sh.globalCompositeOperation="source-over";sh.clearRect(0,0,L.width,L.height);sh.drawImage(L.sprite,0,0);
    const u=clamp((t-1.2)/1.4);
    if(u>0&&u<1){
      sh.globalCompositeOperation="source-atop";
      const bx=-L.width*.3+u*L.width*1.6,g=sh.createLinearGradient(bx,0,bx+L.width*.3,L.height*.4);
      g.addColorStop(0,"rgba("+ACCENT+",0)");g.addColorStop(.5,"rgba(255,255,255,.95)");g.addColorStop(1,"rgba("+ACCENT+",0)");
      sh.fillStyle=g;sh.fillRect(0,0,L.width,L.height);
    }
    ctx.globalAlpha=ca;ctx.shadowColor="rgba("+ACCENT+",.6)";ctx.shadowBlur=22;ctx.drawImage(L.shimmer,L.x,L.y);ctx.shadowBlur=0;ctx.globalAlpha=1;
  }
  if(t>1&&t<2.9){
    ctx.globalCompositeOperation="lighter";
    for(const gl of L.glints){const a=Math.pow(Math.max(0,Math.sin(t*3+gl.strength*10)),10)*ca;if(a>.02)drawGlint(ctx,gl.x,gl.y,6+gl.strength*6,a);}
    ctx.globalCompositeOperation="source-over";
  }
  if(t>2.85){
    const u=clamp((t-2.85)/1.15);
    for(const p of L.particles){
      const rise=Math.pow(u,1.4)*(50+p.seed*170),px=p.tx+Math.sin(u*3+p.seed*20)*28*u+(p.seed-.5)*50*u,py=p.ty-rise,size=p.size*(2+u*5);
      ctx.globalAlpha=Math.pow(1-u,1.3)*.5;ctx.drawImage(smoke,px-size/2,py-size/2,size,size);
    }
    for(const p of L.puffs){const pu=clamp((u-p.delay)/(1-p.delay));if(pu<=0)continue;const size=40+pu*120*p.scale;ctx.globalAlpha=(1-pu)*.22;ctx.drawImage(smoke,p.x-size/2,p.y-pu*90-size/2,size,size);}
    ctx.globalAlpha=1;
  }
  ctx.globalCompositeOperation="source-over";ctx.globalAlpha=1;ctx.shadowBlur=0;
}

export default function LogoSparkSmoke({logos,cycleMs=4000,mode="mono"}:Props){
  const canvasRef=useRef<HTMLCanvasElement>(null);
  const [index,setIndex]=useState(0),[names,setNames]=useState<string[]>([]),[ready,setReady]=useState(false),[reduced,setReduced]=useState(false);
  useEffect(()=>{
    if(window.matchMedia("(prefers-reduced-motion: reduce)").matches){setReduced(true);setReady(true);return;}
    const canvas=canvasRef.current,ctx=canvas?.getContext("2d");
    if(!canvas||!ctx){setReady(true);return;}
    const dpr=Math.min(window.devicePixelRatio||1,2);
    canvas.width=W*dpr;canvas.height=H*dpr;ctx.setTransform(dpr,0,0,dpr,0,0);
    let cancelled=false,raf=0,visible=false,clock=0,last=0,current=-1,items:LogoItem[]=[];
    const smoke=createSmokeSprite(),cycleSeconds=cycleMs/1000;
    const pause=()=>{if(raf)window.cancelAnimationFrame(raf);raf=0;last=0;};
    const tick=(now:number)=>{
      if(cancelled||!visible||document.hidden){raf=0;return;}
      const dt=Math.min((now-last)/1000,.05);last=now;clock+=dt;
      const next=Math.floor(clock/cycleSeconds)%items.length;
      if(next!==current){current=next;setIndex(next);}
      drawFrame(ctx,items[next],(clock%cycleSeconds)*(4/cycleSeconds),smoke);
      raf=window.requestAnimationFrame(tick);
    };
    const start=()=>{if(cancelled||raf||!visible||document.hidden||!items.length)return;last=performance.now();raf=window.requestAnimationFrame(tick);};
    const observer=new IntersectionObserver(([entry])=>{visible=entry.isIntersecting;if(visible)start();else pause();},{threshold:.05});
    observer.observe(canvas);
    const onVisibility=()=>{if(document.hidden)pause();else start();};
    document.addEventListener("visibilitychange",onVisibility);
    Promise.all(logos.map(async logo=>({logo,image:await loadImage(logo.src)}))).then(results=>{
      if(cancelled)return;
      items=results.filter((r):r is {logo:ClientLogo;image:HTMLImageElement}=>r.image!==null)
        .map(r=>buildLogo(r.logo.name,r.image,mode)).filter((item):item is LogoItem=>item!==null);
      setNames(items.map(item=>item.name));setReady(true);start();
    }).catch(()=>{if(!cancelled)setReady(true);});
    return()=>{cancelled=true;pause();observer.disconnect();document.removeEventListener("visibilitychange",onVisibility);};
  },[logos,cycleMs,mode]);

  const total=names.length||logos.length,displayName=names[index]||"Loading client logos";
  return <section className="logo-box" aria-label="Companies and professionals we have worked with">
    <header className="lb-head"><span className="lb-eyebrow">TRUSTED BY</span><span className="lb-count">{pad(Math.min(index+1,total))} / {pad(total)}</span></header>
    {reduced ? <ul className="lb-grid">{logos.map(logo=><li key={logo.name}><img src={logo.src} alt={logo.name} loading="lazy"/></li>)}</ul> :
      <div className="lb-stage"><canvas ref={canvasRef} aria-hidden="true"/>{!ready&&<div className="lb-loading">Preparing the showcase…</div>}{ready&&names.length===0&&<div className="lb-loading">Client logos could not be loaded.</div>}<i className="lb-c lb-tl" aria-hidden="true"/><i className="lb-c lb-tr" aria-hidden="true"/><i className="lb-c lb-bl" aria-hidden="true"/><i className="lb-c lb-br" aria-hidden="true"/></div>}
    {!reduced&&ready&&names.length>0&&<footer className="lb-foot"><span key={displayName} className="lb-name" aria-live="polite">{displayName}</span><div className="lb-bar" aria-hidden="true"><i key={index} style={{animationDuration:cycleMs+"ms"}}/></div></footer>}
    <ul className="logo-sr-only">{logos.map(logo=><li key={logo.name}>{logo.name}</li>)}</ul>
  </section>;
}
