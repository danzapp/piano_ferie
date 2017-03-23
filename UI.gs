function showSidebar() {
    Logger.log('showSidebar')
  
    var html = HtmlService.createHtmlOutputFromFile('Index')
        .setTitle('Crea prospetto ferie per mese')
        .setWidth(300);
    SpreadsheetApp.getUi() // Or DocumentApp or FormApp.
        .showSidebar(html)
}
