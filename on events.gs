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

function onActiveRange(e){
    Browser.msgBox(JSON.stringify(e))
  }