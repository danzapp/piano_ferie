// crea mesi specifici
function createMonthFromHtml(form){
Logger.log("creatMonthFromHtml")
// splitta la data acquisita dal datapicker  
   var startDay = stringToDate(form.monthYear)
   var endDay = stringToDate(form.monthYear)
   
   // estrae giorno,mese,anno  
   var month = startDay[1]
   var mm = parseInt(month,10) //converte month in un intero nel sistema decimale '10'
   var year = startDay[0]
   var dd = startDay[2]
   
   // recupera nome del mese
   var created = cloneTemplate(sheetMonthName(mm),mm,year)
   if (created){
       fillCalendar(sheetMonthName(mm),mm, year)
          highlightWeekHolidays(sheetMonthName(mm))
          var holidaysInMonth = checkHolidays(sheetMonthName(mm), mm)      
          if (holidaysInMonth.length > 0) {  
           Logger.log("vacanze nel mese " + holidaysInMonth)
           highlightHolidays(holidaysInMonth, sheetMonthName(mm)) 
          }
      sortSheets()
      var currentSheet = sheetMonthName(mm)
      Logger.log(currentSheet)
      ss.getSheetByName(currentSheet).activate()
      var html = '<p>Prospetto mese creato correttamente.</p>'
  }
  else {
    var html = "<p>Operazione Annullata</p>"
  }
  return html
} 
   

function createOneMonth(){
 
  var ss = SpreadsheetApp.getActiveSpreadsheet()
  var wishMonths = Browser.inputBox
  ("Inserire i mesi desiderati separati da una virgola es: 3,4,7 per indicare marzo, aprile e luglio")
   
   var monthsToCreate = wishMonths.split(",") 
   for (var i = 0; i < monthsToCreate.length; i++){
      var mmmm = Month[monthsToCreate[i]]
      var mm = monthsToCreate[i]
      cloneTemplate(sheetMonthName(mm), mm, year)
      fillCalendar(sheetMonthName(mm),mm, year)
      highlightWeekHolidays(sheetMonthName(mm))
      var holidaysInMonth = checkHolidays(sheetMonthName(mm), mm)
      
      if (holidaysInMonth.length > 0) {  
       Logger.log("vacanze nel mese " + holidaysInMonth)
       highlightHolidays(holidaysInMonth, sheetMonthName(mm)) 
      }
      
   } 
  sortSheets()
  var currentSheet = sheetMonthName(mm)
  ss.getSheetByName(currentSheet).activate()
}


// crea mesi per tutto l'anno
function createAllMonths(){

var ss = SpreadsheetApp.getActiveSpreadsheet()

  for (var mm = 1; mm <= 12; mm++){
    if (ss.getSheetByName(sheetMonthName(mm))){
      Browser.msgBox("sono presenti già alcuni fogli")
    }
    var mmmm = Month[mm]
    cloneTemplate(sheetMonthName(mm), mm,year)
    fillCalendar(sheetMonthName(mm),mm, year)
    var holidaysInMonth = checkHolidays(sheetMonthName(mm), mm)
    highlightHolidays(holidaysInMonth, sheetMonthName(mm)) 
    highlightWeekHolidays(sheetMonthName(mm))
  }
  sortSheets()
}

function cloneTemplate(sheetName, mm,year){
Logger.log("cloneTemplate new per " + sheetName)
var ui = SpreadsheetApp.getUi()
    if (ss.getSheetByName(sheetName)){
         // dovrebbe tornare il controllo al form html
         var answer = ui.alert('Prospetto già esistente. Vuoi sovrascriverlo ?', Browser.Buttons.YES_NO)
         if (answer == ui.Button.NO){
            ui.alert("La creazione del prospetto sarà annullata")
            return false
         }
         Logger.log("Sovrascrivi il prospetto "+ sheetName)
         var old = ss.getSheetByName(sheetName);
         ss.deleteSheet(old); // or old.setName(new Name); 
         SpreadsheetApp.flush(); // Utilities.sleep(2000);
    } 
   var sheet = ss.getSheetByName('Template').copyTo(ss)
   sheet.setName(sheetName).activate();
   /* Make the new sheet active */
   Logger.log("Prospetto creato")
   return true
}


// riempi il calendario per il mese
function fillCalendar(sheetMonthName, mm,year){
Logger.log(sheetMonthName)

  Logger.log("fillCalendar")
//per testare la funzione
//var mm = 1
//var year = 2016


  //trova la prima e l'ultima data del mese
  
  // il parametro mese in new Date(year, mm, dd) inizia dall'indice 0=gennaio
  var firstDayOfMonth = new Date (year,mm-1,1) // ---- Attenzione giorno è stato impostato a 0 perchè altrimenti inizia dal giorno 2
  
    
  if (mm < 12){
    var nextMonth = parseInt(mm) +1 
    var yearOfNextMonth = year
  }
  else {
    var nextMonth = 1
    var yearOfNextMonth = parseInt(year) +1
  }
  
   // il parametro mese in new Date(year, mm, dd) inizia dall'indice 0=gennaio 
   var firstDayOfNextMonth =  new Date (yearOfNextMonth,nextMonth-1,1)
   var lastDayOfMonth =  decrementDate(firstDayOfNextMonth,1)
   var daysOfMonth =  DateDiff.inDays (firstDayOfMonth, lastDayOfMonth) + 1
   var currentDate = new Date (firstDayOfMonth)
   
   Logger.log(currentDate)
  // inserisci il nome del calendario su A2
  var ss = SpreadsheetApp.getActiveSpreadsheet()
  ss.getRange('A2').setValue(Month[mm] + ' ' + year)
  //compila il calendario del mese
  //Browser.msgBox('Sarà creato il prospetto del mese con ' + daysOfMonth + ' giorni')
  currentDate = incrementDate(currentDate, -1)
  Logger.log('Giorni del mese ' + daysOfMonth)
  for (var i = 0; i< daysOfMonth; i++){
    Logger.log(i + ' - - ' + currentDate)
    currentDate = incrementDate(currentDate, 1)
    var dayOfTheWeek = currentDate.getDay()
    var ss = SpreadsheetApp.getActiveSpreadsheet()
    
    if (dayOfTheWeek >=0 && dayOfTheWeek <=7) {
    
      modifySheetDays(currentDate, i+1) 

    }
    //cancellare eventuali colonne in eccesso es. settembre 30 giorni
  }
  var sheet = ss.getSheetByName(sheetMonthName).activate()
 }

// richiamata da fillCalendar, inserisce le date nel foglio del mese
function modifySheetDays(date, day){
    if (day > 31){stop}
  Logger.log('day ' + day)
  Logger.log("date " + date + " modifySheetDays di " + (day+3))// inizia dalla quarta colonna
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getActiveSheet()
  var range = sheet.getRange(3,day + 3 ).setValue(new Date(date)) 

}

// cancella tutti i mesi
function deleteAllMonths(){
  sortSheets()
  confirmDelete = Browser.msgBox("Confermi la cancellazione di tutti i fogli dei turni presenti ? ", Browser.Buttons.YES_NO_CANCEL)
  if (confirmDelete != "yes") {
    return
  }
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheets = ss.getSheets()
    for (var i=0; i<sheets.length; i++){
      var sheet = sheets[i]
      if (sheet.getName() != "Template"){
        ss.setActiveSheet(sheet)
      }
      for (var month in Month){
      var currentSheetName = ss.getActiveSheet().getName()
        if ( currentSheetName == sheetMonthName(month)){
            //Logger.log(ss.setActiveSheet(ss.getSheetByName(currentSheetName)).getName())    
            ss.deleteActiveSheet()
          }   
        }
      }
}


function exportToCalendarMenu (){
    var wishMonths = Browser.inputBox
  ("Inserire il numero del mese che si vuole esportare (es. 7 per Luglio)")
  exportToCalendar(mm)
}  
