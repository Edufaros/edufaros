/**
 * EduFaros website -> Google Sheets enquiry receiver.
 *
 * Install this as a container-bound Apps Script in the destination Google Sheet.
 * Set these Script Properties before deploying:
 *   EDUFAROS_WEBHOOK_SECRET = the same 64+ character secret set in Vercel
 *
 * Run setupEdufarosSheet() once from the spreadsheet to save its ID and
 * create the Enquiries tab with the required header row.
 */

const EDUFAROS_SHEET_NAME = "Enquiries";
const EDUFAROS_HEADERS = [
  "Submitted At (UTC)",
  "Submission ID",
  "Name",
  "Work Email",
  "Business Name",
  "Website",
  "Country",
  "Business Type",
  "Challenges",
  "Additional Context",
  "Phone",
  "Source Page",
  "Status"
];

function setupEdufarosSheet() {
  const spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  if (!spreadsheet) {
    throw new Error("Open this script from the destination Google Sheet, then run setupEdufarosSheet().");
  }

  let sheet = spreadsheet.getSheetByName(EDUFAROS_SHEET_NAME);
  if (!sheet) sheet = spreadsheet.insertSheet(EDUFAROS_SHEET_NAME);

  if (sheet.getLastRow() === 0) {
    sheet.getRange(1, 1, 1, EDUFAROS_HEADERS.length).setValues([EDUFAROS_HEADERS]);
  } else {
    const existingHeaders = sheet.getRange(1, 1, 1, EDUFAROS_HEADERS.length).getDisplayValues()[0];
    const matches = EDUFAROS_HEADERS.every((header, index) => existingHeaders[index] === header);
    if (!matches) {
      throw new Error(
        'The "Enquiries" tab already contains data or different headers. Rename that tab or review it before running setup again.'
      );
    }
  }

  sheet.setFrozenRows(1);
  sheet.getRange(1, 1, 1, EDUFAROS_HEADERS.length)
    .setFontWeight("bold")
    .setWrap(true);
  sheet.setColumnWidth(1, 175);
  sheet.setColumnWidth(2, 245);
  sheet.setColumnWidth(3, 150);
  sheet.setColumnWidth(4, 220);
  sheet.setColumnWidth(5, 190);
  sheet.setColumnWidth(6, 230);
  sheet.setColumnWidth(7, 130);
  sheet.setColumnWidth(8, 230);
  sheet.setColumnWidth(9, 280);
  sheet.setColumnWidth(10, 360);
  sheet.setColumnWidth(11, 150);
  sheet.setColumnWidth(12, 180);
  sheet.setColumnWidth(13, 100);

  PropertiesService.getScriptProperties().setProperties({
    EDUFAROS_SPREADSHEET_ID: spreadsheet.getId(),
    EDUFAROS_SHEET_NAME: EDUFAROS_SHEET_NAME
  }, true);

  return "EduFaros Enquiries tab is ready.";
}

function doPost(e) {
  try {
    const rawBody = e && e.postData && e.postData.contents;
    if (!rawBody) return jsonResponse({ ok: false, error: "Missing request body." });

    const payload = JSON.parse(rawBody);
    const properties = PropertiesService.getScriptProperties();
    const expectedSecret = properties.getProperty("EDUFAROS_WEBHOOK_SECRET") || "";
    const receivedSecret = typeof payload.secret === "string" ? payload.secret : "";

    if (!expectedSecret || !constantTimeEquals(expectedSecret, receivedSecret)) {
      return jsonResponse({ ok: false, error: "Unauthorised." });
    }

    const spreadsheetId = properties.getProperty("EDUFAROS_SPREADSHEET_ID");
    const sheetName = properties.getProperty("EDUFAROS_SHEET_NAME") || EDUFAROS_SHEET_NAME;
    if (!spreadsheetId) {
      return jsonResponse({ ok: false, error: "Sheet setup has not been completed." });
    }

    const submissionId = cleanText(payload.submissionId, 80);
    const name = cleanText(payload.name, 100);
    const email = cleanText(payload.email, 254);
    const businessName = cleanText(payload.businessName, 140);
    const website = cleanText(payload.website, 300);
    const country = cleanText(payload.country, 40);
    const businessType = cleanText(payload.businessType, 100);
    const context = cleanText(payload.context, 1600);
    const phone = cleanText(payload.phone, 40);
    const sourcePage = cleanText(payload.sourcePage, 100);
    const challenges = Array.isArray(payload.challenges)
      ? payload.challenges.map(function (item) { return cleanText(item, 100); }).filter(Boolean).slice(0, 8)
      : [];

    if (!submissionId || !name || !email || !businessName || !website || !country || !businessType || challenges.length === 0) {
      return jsonResponse({ ok: false, error: "Required enquiry details are missing." });
    }

    const lock = LockService.getScriptLock();
    if (!lock.tryLock(10000)) {
      return jsonResponse({ ok: false, error: "The sheet is busy. Try again." });
    }

    try {
      const cache = CacheService.getScriptCache();
      const cacheKey = "edufaros_submission_" + submissionId;
      if (cache.get(cacheKey)) {
        return jsonResponse({ ok: true, duplicate: true, submissionId: submissionId });
      }

      const spreadsheet = SpreadsheetApp.openById(spreadsheetId);
      const sheet = spreadsheet.getSheetByName(sheetName);
      if (!sheet) return jsonResponse({ ok: false, error: "The Enquiries tab could not be found." });

      const submittedAt = Utilities.formatDate(new Date(), "UTC", "yyyy-MM-dd HH:mm:ss");
      const row = [
        submittedAt,
        submissionId,
        name,
        email,
        businessName,
        website,
        country,
        businessType,
        challenges.join(" | "),
        context,
        phone,
        sourcePage,
        "New"
      ].map(safeCell);

      sheet.appendRow(row);
      SpreadsheetApp.flush();
      cache.put(cacheKey, "saved", 21600);

      return jsonResponse({ ok: true, submissionId: submissionId });
    } finally {
      lock.releaseLock();
    }
  } catch (error) {
    // Do not log submitted details.
    return jsonResponse({ ok: false, error: "The enquiry could not be saved." });
  }
}

function cleanText(value, maxLength) {
  return typeof value === "string" ? value.trim().slice(0, maxLength) : "";
}

function safeCell(value) {
  const text = value === null || value === undefined ? "" : String(value);
  return /^[\\s]*[=+\\-@]/.test(text) ? "'" + text : text;
}

function constantTimeEquals(a, b) {
  if (!a || !b || a.length !== b.length) return false;
  let difference = 0;
  for (let index = 0; index < a.length; index += 1) {
    difference |= a.charCodeAt(index) ^ b.charCodeAt(index);
  }
  return difference === 0;
}

function jsonResponse(value) {
  return ContentService
    .createTextOutput(JSON.stringify(value))
    .setMimeType(ContentService.MimeType.JSON);
}
