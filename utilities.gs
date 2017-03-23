function zeroPadMonth(number, width) {
var string = String(number);
while (string.length < width)
string = "0" + string;
return string;
}

function sortSheets () {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheetNameArray = [];
  var sheets = ss.getSheets();
 
  for (var i = 0; i < sheets.length; i++) {
    sheetNameArray.push(sheets[i].getName());
  }
 
  sheetNameArray.sort();
 
  for( var j = 0; j < sheets.length - 3; j++ ) {
    ss.setActiveSheet(ss.getSheetByName(sheetNameArray[j]));
    ss.moveActiveSheet(j + 1);
  }
}

function sheetMonthName(mm){
    var sheetMonthName = zeroPadMonth(mm,2)+ " (" + Month[mm] +")"
return sheetMonthName
}

function getMaxOfArray(numArray) {
  return Math.max.apply(null, numArray);
}