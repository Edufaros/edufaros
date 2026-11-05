# Connect the EduFaros enquiry form to Google Sheets

The website's contact form posts to its own Next.js API route. The API validates the fields and forwards the enquiry server-to-server to a Google Apps Script web app. The Apps Script writes one row to the Google Sheet.

The Google webhook secret is never sent to the visitor's browser and must never be committed to GitHub.

## 1. Create the destination sheet

1. Sign in to the Google account that should own the enquiries.
2. Create a Google Sheet named **EduFaros Website Enquiries**.
3. Open **Extensions → Apps Script**.
4. Replace the starter code in the editor with the complete contents of `google-sheets-webhook.gs` from this folder.
5. Save the Apps Script project.

## 2. Prepare the sheet tab

1. In Apps Script, select `setupEdufarosSheet` from the function selector.
2. Run it once.
3. Review and approve the Google authorisation prompt.
4. Return to the spreadsheet. It should contain an **Enquiries** tab with a formatted header row.

Do not rename the `Enquiries` tab after setup unless you also update the script configuration.

## 3. Add the private webhook secret

Generate a random secret of at least 64 hexadecimal characters. For example, on a recent Windows PowerShell version:

```powershell
[Convert]::ToHexString([Security.Cryptography.RandomNumberGenerator]::GetBytes(32))
```

Keep the generated value private. Do not put it in the form, page source, a public document or GitHub.

In Apps Script:

1. Open **Project Settings** (gear icon).
2. Find **Script Properties** and add:
   - Property: `EDUFAROS_WEBHOOK_SECRET`
   - Value: the generated secret
3. Save the property.

The script also stores the spreadsheet ID and tab name when `setupEdufarosSheet` runs. Do not add those manually unless you are repairing a setup.

## 4. Deploy Apps Script as a web app

1. Select **Deploy → New deployment**.
2. Choose **Web app** as the deployment type.
3. Set **Execute as** to **Me**.
4. Set **Who has access** to **Anyone**. The random secret protects the receiver; do not use a deployment that requires every website visitor to sign into Google.
5. Deploy and complete Google's authorisation.
6. Copy the Web app URL. It must look like `https://script.google.com/macros/s/DEPLOYMENT_ID/exec`.

If the Google account or Workspace administrator does not offer the **Anyone** access option, the public website cannot call that deployment. Resolve the account policy first; do not publish the form as active.

When changing the Apps Script code later, create a new version and update the existing deployment to that version.

## 5. Configure the Vercel Preview environment

In the Vercel project **edufaros-company-website**, open **Settings → Environment Variables** and add these two variables for **Preview** only while testing:

| Variable | Value |
|---|---|
| `GOOGLE_SHEETS_WEBHOOK_URL` | The deployed Apps Script Web app URL ending in `/exec` |
| `GOOGLE_SHEETS_WEBHOOK_SECRET` | The exact same random secret stored in Apps Script Script Properties |

Mark the secret as sensitive/encrypted where Vercel offers that option. Do not add either value to the example environment file or GitHub. Do not configure Production until the privacy notice, ownership, access and final launch checks are approved.

After saving the Preview variables, redeploy the latest `setup/edufaros-company-site` Preview deployment so the server function receives them.

## 6. Test with dummy information

1. Open the new website's Preview deployment and go to **Discuss Your Growth Challenge**.
2. Submit a test enquiry using fictional details—never use a real student's personal information.
3. Confirm that the form displays the success state only after the Apps Script confirms the write.
4. Open the **Enquiries** tab and confirm that exactly one row has been added with the submitted values and status **New**.
5. Submit a second test to confirm that multiple enquiries append as separate rows.
6. Test an invalid form and confirm no row is created.
7. Test a temporary misconfiguration only in Preview and confirm the form shows an error and keeps the entered values.

The receiver includes a submission ID to suppress short-window retries, a script lock to reduce simultaneous-write conflicts, text-cell escaping to prevent spreadsheet formula injection, and a shared secret. The website API also validates the incoming fields and never returns the secret to the browser.

## Fields written to the sheet

Submitted At (UTC), Submission ID, Name, Work Email, Business Name, Website, Country, Business Type, Challenges, Additional Context, Phone, Source Page and Status.

The spreadsheet is the destination for the business enquiry details. It should be shared only with people who need access to respond to EduFaros enquiries. Do not collect or store student/applicant personal records in this form.

## Current status and launch gate

The code bridge is implemented, but this integration is **not live until** the Google Sheet is created, the Apps Script is deployed, both Vercel Preview environment variables are configured and a test row is verified. The website form must remain treated as unavailable until that test passes.

Before enabling Production, publish a complete privacy notice that reflects the actual data controller, storage location, access, retention, deletion and relevant cross-border handling. Configure an appropriate durable rate limit at the edge/WAF and verify the process for handling deletion requests.
