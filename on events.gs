// onEdit function that opens sidebar if a particular cell is edited.
function onEdit(e) {

  var ss = SpreadsheetApp.getActiveSpreadsheet()
  var sheet = ss.getActiveSheet()
    if (sheet.getName() == "Festività"){
    var range = sheet.getRange(2,1).setValue("Modificato in data ")
    var range = sheet.getRange(2,2).setBackground(new Date())
    //Browser.msgBox("Per assegnare il personale alle diverse categorie di contact center inserisci una 'x' (in minuscolo) nella casella desiderata" )
    }
   
}

function onOpen(){
  var ui = SpreadsheetApp.getUi();
  if(!UserProperties.getProperty('author')){
  console.log('ok')
    ui.createMenu('Custom Menu')
    .addItem("Authorize this app", 'authorize')
    .addToUi();
    var html = HtmlService.createHtmlOutputFromFile('Index1')
    .setTitle("Install Menu").setWidth(400);
    ui.showSidebar(html);
  }else{
    Logger.log('showSidebar')
  
    var html = HtmlService.createHtmlOutputFromFile('Index')
        .setTitle('Crea prospetto ferie per mese')
        .setWidth(300);
    SpreadsheetApp.getUi() // Or DocumentApp or FormApp.
        .showSidebar(html)
  }

}
