/**
 * Google Apps Script integration for Next.js contact form (Customized for User's script)
 * 
 * INSTRUCTIONS FOR SETTING UP GOOGLE SHEETS & APPS SCRIPT:
 * 
 * 1. Create a new Google Sheet:
 *    - Rename the spreadsheet tab to "Sheet1" (the default name).
 *    - Create the headers in row 1:
 *      A1: Timestamp
 *      B1: Name
 *      C1: Email
 *      D1: Message
 * 
 * 2. Open Apps Script:
 *    - Click on "Extensions" in the top menu bar, then select "Apps Script".
 * 
 * 3. Copy-Paste Code:
 *    - Delete any default code in the editor (usually `myFunction()`).
 *    - Copy the code below and paste it into the editor.
 * 
 * 4. Save and Deploy:
 *    - Save (Ctrl+S / Cmd+S).
 *    - Click "Deploy" > "New deployment".
 *    - Click the gear icon and select "Web app".
 *    - Configure:
 *      - Description: "Portfolio Contact Form API"
 *      - Execute as: "Me" (your-email@gmail.com)
 *      - Who has access: "Anyone"
 *    - Click "Deploy".
 *    - Authorize permissions when prompted.
 * 
 * 5. Update Env Variable:
 *    - Copy the Web app URL.
 *    - Add it to your `.env.local` file as:
 *      CONTACT_FORM_WEBHOOK_URL=https://script.google.com/macros/s/.../exec
 */

// ==================== GOOGLE APPS SCRIPT CODE ====================

function doPost(e) {
  try {
    const sheet = SpreadsheetApp
      .getActiveSpreadsheet()
      .getSheetByName("Sheet1");

    const data = JSON.parse(e.postData.contents);

    // Validation
    if (!data.name || !data.email || !data.message) {
      return jsonResponse({
        success: false,
        message: "Missing required fields"
      });
    }

    // Email Validation
    const emailRegex =
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(data.email)) {
      return jsonResponse({
        success: false,
        message: "Invalid email address"
      });
    }

    // Prevent Duplicate Messages
    // Note: row[0] is Timestamp, row[1] is Name, row[2] is Email, row[3] is Message
    const rows = sheet.getDataRange().getValues();

    const duplicateFound = rows.some((row) => {
      return (
        row[2] === data.email && // Corrected from row[1] to row[2]
        row[3] === data.message  // Corrected from row[2] to row[3]
      );
    });

    if (duplicateFound) {
      return jsonResponse({
        success: false,
        message: "Duplicate message detected"
      });
    }

    // Save Data
    sheet.appendRow([
      new Date(),
      data.name,
      data.email,
      data.message
    ]);

    return jsonResponse({
      success: true,
      message: "Message submitted successfully"
    });

  } catch (error) {
    return jsonResponse({
      success: false,
      message: error.toString()
    });
  }
}

function jsonResponse(data) {
  return ContentService
    .createTextOutput(JSON.stringify(data))
    .setMimeType(ContentService.MimeType.JSON);
} 
