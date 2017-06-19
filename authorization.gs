function authorize(){
  //SpreadsheetApp.openById('0AnqSFd3iikE3dDRlSC05ZTNxb2xORzNnR3NmMllyeUE');
  UserProperties.setProperty('author','yes');
  var ui = SpreadsheetApp.getUi();
  var html = HtmlService.createHtmlOutput('Autorizzazione completata<br>Grazie<br><br>Per continuare, aggiorna il tuo browser.').setTitle("Confirmation").setWidth(400);
  ui.showSidebar(html);
}
