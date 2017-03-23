
function highlightToday(){
  Logger.log("highlightToday")
        var ss = SpreadsheetApp.getActiveSpreadsheet()
        var today = new Date()
        var currentMonth = today.getMonth()+1
        var currentDay = today.getDate()
        var sheetName = sheetMonthName(currentMonth)
        var sheet = ss.getSheetByName(sheetName)
        var sheetVariabili = ss.getSheetByName("Variabili")
        Logger.log (sheet)
        var range = sheet.getRange(4,2,1,31)
        var daysInMonth = range.getValues()
        var range = sheet.getRange(2,2,1,daysInMonth[0].length) 
        var currentHoliday 
        var dayHoliday
        var green = "#d9ead3"
        var prevRibbonRange = sheetVariabili.getRange(2,1,10)
       Logger.log(daysInMonth[0].length)
       Logger.log(currentDay)
             
       
       for (var i = 0; i<daysInMonth[0].length; i++){
          if (currentDay == i) {
            
            
            var previousDay = sheetVariabili.getRange(2,2).getValue()
            Logger.log(previousDay)
            if (currentDay > previousDay) {
                sheet.getRange(2, currentDay,1).copyFormatToRange(sheetVariabili, 1, 1, 2, 14)
                //sheet.getRange(4, currentDay,10).copyFormatToRange(sheetVariabili, 2, 2, 3, 8)
                sheetVariabili.getRange(2,2,1,11).copyFormatToRange(sheet, currentDay+1, currentDay+1, 2, 11)
                           
            continue
            }
            //range = sheet.getRange(2,currentDay+1).setValue("OGGI")     
            
          }
       }
}

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
  var holidays = sheetHolidays.getRange(2,1,lastRowHolidays,2).getValues()
  var holidaysInMonth = [] 
  for (var i=0; i<holidays.length; i++){
  //var currentHoliday = decrementDate(new Date(holidays[i][1]),1)
  var currentHoliday = new Date(holidays[i][1])
  var currentHolidayName = holidays[i][0]
     if ((currentHoliday.getMonth())+1 == mm && currentHoliday.getYear() == year) {
      holidaysInMonth.push([currentHoliday, currentHolidayName])
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
          Logger.log(dayHoliday) 
          var red = "#FF3336"
          range = sheet.getRange(3,dayHoliday+3,12).setBackground(red) 
//          range = sheet.getRange(4,dayHoliday+1).setBackground(red) 
//          
//          // scrive il nome della festività nella riga 4
         
          range = sheet.getRange(5,dayHoliday+3).setBackground(red) 
          range = sheet.getRange(6,dayHoliday+3).setBackground(red) 
          range = sheet.getRange(6,dayHoliday+3).setFontColor("#000000")
          range = sheet.getRange(6,dayHoliday+3).setValue(holidaysInMonth[i][1])
          range = sheet.getRange(7,dayHoliday +3,5,1).setBackground(red)
          
        }
        for (var j=0; j<daysInMonth.length; j++){
          currentDay = (new Date(daysInMonth[j])).getDay()
          currentDate = (new Date(daysInMonth[j])).getDate()
          if (currentDay = 0){
           range = sheet.getRange(5,currentDate+3,8,1).setBackground('red')
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
        var lastRow = range.getLastRow()
        var lastCol = range.getLastColumn()
        var currentDay
        var currentDate 
        var lightRed = "#FF7375"
          for (var col=0; col<=daysInMonth[0].length; col++){
             var newDate = new Date(daysInMonth[0][col]-1)
             Logger.log('new Date ' + newDate)
             currentDate = incrementDate(newDate,1).getDate()
             Logger.log('currentDate ' + currentDate) 
             currentDay = newDate.getDay()
             if (currentDay == 6 || currentDay == 0) {
             Logger.log('currentDay ' + ' ' + currentDay)
               range = sheet.getRange(6,col+4).setValue("festivo")
               range = sheet.getRange(6,col+4).setFontColor(lightRed)
               range = sheet.getRange(3,col+4,12,1).setBackground(lightRed)
             }
          }
}

