

function setToRichieste() {
  // ligth red #ff7375
  // red #ff3336
  
  var range = ss.getActiveRange()
  var bgColors = range.getBackgrounds()
  Logger.log(bgColors)
  var data = ss.getActiveRange().getValues()
  Logger.log('data richieste ' + data)
  var richieste = 0
  var selAlert = false
  for (var row=0; row<data.length; row++){
      for (var col=0; col<data[row].length; col++){
      Logger.log(bgColors[row][col])
              if (bgColors[row][col] != '#ff3336'){ 
                      data[row][col] = 'R'
                      richieste++
              }
              else
              {
                  if (bgColors[row][col] != '#ff7375'){ 
                      data[row][col] = 'R'
                      richieste++
                  }
                  else
                  {
                          var selAlert = true
                  }
              }
      }
 }
if (selAlert == true){
     Browser.msgBox('Nella selezione sono compresi giorni festivi. Ripeti la selezione')
}
range.setValues(data)
switch(richieste) {
    case 0:
        var html = "<div id='output' class='alert alert-warning'>Non è stato selezionato nessun giorno</div>"
        break;
    case 1:
        var html ="<div id='output' class='alert alert-success'>Registrata correttamente la richiesta per un giorno di ferie</div>"
        break;
    default:
        var html = "<div id='output' class='alert alert-success'> Sono state correttamente registrate richieste per " + richieste + " giorni di ferie</div>"
}
 return html
}


function setToAccettate() {
  // ligth red #ff7375
  // red #ff3336
  
  var range = ss.getActiveRange()
  var bgColors = range.getBackgrounds()
  Logger.log(bgColors)
  var data = ss.getActiveRange().getValues()
  Logger.log(data)
  var selAlert = false
  var accettate = 0
  var cell
  for (var row=0; row<data.length; row++){
      for (var col=0; col<data[row].length; col++){
      Logger.log(bgColors[row][col])
              if (bgColors[row][col] != '#ff3336'){ 
                      cell = data[row][col]
                      if (cell == 'R'){
                            data[row][col] = 'A'
                            accettate++
                      }
              }
              else
              {
                  if (bgColors[row][col] != '#ff7375'){ 
                      data[row][col] = 'A'
                      accettate++
                  }
                  else
                  {
                          var selAlert = true
                  }
              }
      }
 }
if (selAlert == true){
     Browser.msgBox('Nella selezione sono compresi giorni festivi. Ripeti la selezione')
}
range.setValues(data)

switch(accettate) {
    case 0:
        var html = "<div id='output' class='alert alert-warning'>Non è stata selezionato nessuna richiesta di ferie</div>"
        break;
    case 1:
        var html ="<div id='output' class='alert alert-success'>Registrata correttamente la richiesta per un giorno di ferie</div>"
        break;
    default:
        var html = "<div id='output' class='alert alert-success'>Sono state accettate correttamente " + accettate + " richieste di ferie</div>"
}
 
 return html
}


function acceptAll(range) {
  // ligth red #ff7375
  // red #ff3336
  
  // seleziona la porzione di foglio con le richieste
  var range = ss.getActiveSheet().getRange(rangeCalendario)
  var data = range.getValues()
  var cell
  var accettate = 0
  for (var i=0; i<data.length; i++){
      for (var j=0; j<data[i].length; j++){
            cell = data[i][j]
            Logger.log(cell)
            if (cell == 'R'){
                data[i][j] = 'A'
                accettate++
            }
       }      
 }
  
  range.setValues(data)
 switch(accettate) {
    case 0:
        var html = "<div id='output' class='alert alert-success close'>Non è stato selezionato nessun giorno</div>"
        break;
    case 1:
        var html = "<div id='output' class='alert alert-success '>Accettata correttamente la richiesta di un giorno di ferie</div>"
        break;
    default:
        var html = "<div id='output' class='alert alert-success'>Sono state accettate correttamente " + accettate + " richieste di ferie</div>"
}
  return html
 }

