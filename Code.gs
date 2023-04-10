//////       CREATE A GOOGLE SHEET - GO TO EXTENSIONS - THEN APPSSCRIPT - AND THEN PASTE THIS SCRIPT INSIDE A FILE NAMED CODE.GS   //////
//////       MODIFY THE COLUMNS, ROWS, AND DATA AS REQUIRED TO SUIT YOUR SPECIFIC NEEDS.                                           //////

function doGet() {
  return ContentService.createTextOutput(getKeyAndMarkAsTaken());
}

function onOpen() {
  var spreadsheet = SpreadsheetApp.getActive();
  var menuItems = [
    { name: "Get Key and Mark as True", functionName: "getKeyAndMarkAsTaken" },
  ];
  spreadsheet.addMenu("Custom Menu", menuItems);
}

function getKeyAndMarkAsTaken() {
  var spreadsheet = SpreadsheetApp.getActive();
  var sheet = spreadsheet.getActiveSheet();
  var lastRow = sheet.getLastRow();
  var data = sheet.getRange(1, 1, lastRow, 2).getValues(); // Assuming keys are in column A and status in column B

  for (var i = 0; i < data.length; i++) {
    if (data[i][1] == "ready") {
      data[i][1] = "taken";
      sheet.getRange(i + 1, 2).setValue("taken");
      return data[i][0];
    }
  }

  return "No available keys";
}
