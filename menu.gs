function onOpen() {
  var ui = SpreadsheetApp.getUi();
  // Or DocumentApp or FormApp.
  ui.createMenu('Piano Ferie')
      .addItem('Richiedi ferie per il periodo selezionato', 'setToRichieste')
      .addSeparator()
      .addItem('Accetta ferie per il periodo selezionato', 'setToAccettate')
      .addSeparator()
      .addItem('Gestione prospetto', 'showSidebar')
      .addSeparator()
//      .addItem('Crea i prospetto ferie per mesi specifici', 'createOneMonth')
//      .addSeparator()
//      //.addSubMenu(ui.createMenu('Sub-menu')
//      .addItem("Crea tutti i prospetti ferie per l'intero anno ", 'createAllMonths')
//      .addSeparator()
//      //.addSubMenu(ui.createMenu('Sub-menu')
//      .addItem('Cancella i prospetti ferie per tutti i mesi presenti ', 'deleteAllMonths')
//      .addSeparator()
//      //.addSubMenu(ui.createMenu('Sub-menu')
//      .addItem('Esporta il prospetto sul calendario ', 'exportToCalendar')
//      .addSeparator()
//      //.addSubMenu(ui.createMenu('Sub-menu')
//      .addItem('Importa le festività ', 'importHolidays')
//      .addSeparator()
//      //.addSubMenu(ui.createMenu('Sub-menu')
//      .addItem('Imposta anno in corso ', 'setYear')
      .addToUi();
}
