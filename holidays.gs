
function importHolidays(){
  
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheets = ss.getSheets()
  var isHolidaySheet = false

  for (var i=0; i<sheets.length; i++){
    Logger.log(i)
    var activeSheetName = sheets[i].getName()
        if (activeSheetName == "Festività"){
           isHolidaySheet = true
           Logger.log(i+ " " + activeSheetName + " true")
        }
  } 
  Logger.log (isHolidaySheet)
  
  if (isHolidaySheet == false){ 
    Logger.log("crea Festività")
    ss.insertSheet().setName("Festività")
  }
  else {
    var sheet = ss.getSheetByName("Festività")
    ss.setActiveSheet(sheet).getName()
  }
  
  var cal = CalendarApp.getCalendarById('it.italian#holiday@group.v.calendar.google.com');
  var firstDateOfMonth = new Date ("January 01, 2017 00:00:00 CST");
  var lastDateOfMonth = new Date ("December 31, 2018 00:00:00 CST");
  var events = cal.getEvents(firstDateOfMonth,lastDateOfMonth);
 
  //Then loop through and write out (choose your own calendar fields, I've used just five):
 
  //scrive la fonte e la data di importazione
  var imported = [["importato dal calendario ",cal.getName()," in data ",new Date()]]
  Logger.log(imported)
  var range=sheet.getRange("A1:D1")
  range.setValues(imported)
  
  //scrive le festività su sheet
  for (var i=0;i<events.length;i++) {
   var date = incrementDate(events[i].getAllDayEndDate(),-1) // decrementa la data di 1 giorno
   var details=[[events[i].getTitle(),date]]
   var range=sheet.getRange(i+3,1,1,2);
   range.setValues(details);
   Logger.log('details ' + details)
 }
  
  sortSheets()
}


// inserisce in un array le festività per un mese

function checkHolidays(sheetMonthName, mm,year){
  Logger.log("checkHolidays")
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName(sheetMonthName)
  var range = sheet.getRange(3,2,2,31)
  var sheetHolidays = ss.getSheetByName("Festività")
  var lastRowHolidays = sheetHolidays.getLastRow()
  Logger.log(lastRowHolidays)
  var holidays = sheetHolidays.getRange(3,1,lastRowHolidays-2,2).getValues() // inizia dalla riga 3
  Logger.log(holidays)
  Logger.log(holidays.length)
  var holidaysInMonth = [] 
  for (var i=0; i<holidays.length; i++){
  //var currentHoliday = decrementDate(new Date(holidays[i][1]),1)
    var currentHoliday = new Date(holidays[i][1])
    var currentHolidayName = holidays[i][0]
    Logger.log(currentHoliday.getYear())
    Logger.log(year)
    if (currentHoliday.getYear() == year){
        if (currentHoliday.getMonth()+1 == mm) {
              holidaysInMonth.push([currentHoliday, currentHolidayName])
        }
    }
  }
  if (holidaysInMonth.length >0 ){
  Logger.log(holidaysInMonth)
       return holidaysInMonth
  } 
  else {
    return []
  }
  
}

function highlightHolidays(holidaysInMonth, sheetMonthName){
Logger.log("highlightHolidays")
        var ss = SpreadsheetApp.getActiveSpreadsheet()
        var sheet = ss.getSheetByName(sheetMonthName)
        var range = sheet.getRange(3,2,1,31)
        var daysInMonth = range.getValues()
        var currentHoliday 
        var dayHoliday
        var currentDay
        var currentDate
         
        for (var i = 0; i<holidaysInMonth.length; i++){
          dayHoliday = (new Date(holidaysInMonth[i][0])).getDate()
          Logger.log('dayHoliday ' + dayHoliday) 
          var red = "#FF3336"
          //range = sheet.getRange(inizioFestivita).(0,dayHoliday-1,12).setBackground(red) 
//          range = sheet.getRange(4,dayHoliday+1).setBackground(red) 
//          
//          // scrive il nome della festività nella riga 4
         Logger.log("dayHoliday " + dayHoliday)
         Logger.log(sheet.getRange(inizioCalendario).getA1Notation())
         Logger.log('numeroPersonale ' + numeroPersonale())
         sheet.getRange(inizioCalendario).offset(0, dayHoliday-1,numeroPersonale() + 9-1).setBackground(red)
         sheet.getRange(inizioCalendario).offset(3, dayHoliday-1).setValue(holidaysInMonth[i][1])
        }
        for (var j=0; j<daysInMonth.length; j++){
          currentDay = (new Date(daysInMonth[j])).getDay()
          currentDate = (new Date(daysInMonth[j])).getDate()
          if (currentDay = 0){
          var lastRow = sheet.getRange(inizioFestivita).getLastRow()
          Logger.log('lastRow ' + lastRow)
           sheet.getRange(2, currentDate-1,lastRow).setBackground(red) 
          }
         }
}

function highlightWeekHolidays(sheetMonthName){
  Logger.log("highlightWeekHolidays")
        var ss = SpreadsheetApp.getActiveSpreadsheet()
        var sheet = ss.getSheetByName(sheetMonthName)
        var range = sheet.getRange(3,4,1,31)
        var daysInMonth = range.getValues()
        Logger.log('daysInMonth ' + daysInMonth)
        Logger.log('daysInMonth ' + daysInMonth[0].length) 
        var lastRow = range.getLastRow()
        var lastCol = range.getLastColumn()
        var currentDay
        var currentDate 
        var lightRed = "#FF7375"
        Logger.log('daysInMonth ' + daysInMonth[0].length)
          for (var col=0; col<=daysInMonth[0].length-1; col++){
             var newDate = new Date(daysInMonth[0][col]-1)
             Logger.log('col ' + col)
             Logger.log('new Date ' + newDate)
             currentDate = incrementDate(newDate,1).getDate()
             Logger.log('currentDate ' + currentDate) 
             currentDay = newDate.getDay()
             if (currentDay == 6 || currentDay == 0) {
             Logger.log('currentDay ' + ' ' + currentDay)
               //range = sheet.getRange(6,col+primaColonnaGiorni).setValue("festivo")
               sheet.getRange(inizioCalendario).offset(0, col-1,numeroPersonale() + 9 -1).setBackground(lightRed)
               
             }
          }
}

