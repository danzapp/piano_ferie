var ss = SpreadsheetApp.getActiveSpreadsheet()
var rangeTitolo = 'A1'
var rangeMese = 'A3'
var inizioCalendario = 'E2'
var inizioFestivita =  'E5'
var rangeCalendario = 'E7:AI13'
var currentUserMail = Session.getActiveUser().getEmail()
var currentUser = findCurrentUser(currentUserMail)
var sheetTemplate = ss.getSheetByName('Template')

var numeroPersonale = function (){
    var lastRow = sheetTemplate.getLastRow()
    var numPersonale = sheetTemplate.getRange(lastRow-2, 2).getValue()
    Logger.log(numPersonale)
    return numPersonale
}
 


var primaColonnaGiorni = 5
var green = ss.getSheetByName('Template').getRange('B7').getBackground()
var yellow = ss.getSheetByName('Template').getRange('C7').getBackground()
Logger.log(green + ' ' + yellow)

  var Month = {1: 'gennaio', 2: 'febbraio', 3: 'marzo', 4: 'aprile', 5: 'maggio', 6: 'giugno', 7: 'luglio', 8: 'agosto', 9: 'settembre', 10: 'ottobre', 11: 'novembre', 12: 'dicembre'} 
    
// calcola la differenza tra due date
var DateDiff = {

    inDays: function(d1, d2) {
        var t2 = new Date(d2).getTime();
        var t1 = new Date(d1).getTime();
        return parseInt((t2-t1)/(24*3600*1000));
    },

    inWeeks: function(d1, d2) {
        var t2 = d2.getTime();
        var t1 = d1.getTime();

        return parseInt((t2-t1)/(24*3600*1000*7));
    },

    inMonths: function(d1, d2) {
        var d1Y = d1.getFullYear();
        var d2Y = d2.getFullYear();
        var d1M = d1.getMonth();
        var d2M = d2.getMonth();

        return (d2M+12*d2Y)-(d1M+12*d1Y);
    },

    inYears: function(d1, d2) {
        return d2.getFullYear()-d1.getFullYear();
    }
}

                     