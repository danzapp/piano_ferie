var ss = SpreadsheetApp.getActiveSpreadsheet()
var green = ss.getSheetByName('Template').getRange('B7').getBackground()
var yellow = ss.getSheetByName('Template').getRange('C7').getBackground()
Logger.log(green + ' ' + yellow)
var year = 2016

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

                     