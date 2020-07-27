# copy by https://github.com/reincarne/google_questions_bank/blob/master/google_questions_bank_vbscript
function getSpreadsheetData(sheetName) {

  // This function gives you an array of objects modeling a worksheet's tabular data, where the first items — column headers — become the property names.
  var arrayOfArrays = SpreadsheetApp.openById("1uG2Fxh3rbxBlBOmf06lMN8wg2K9hTfsyJpqvJb_6vLc").getSheetByName(sheetName || 'Questions').getDataRange().getValues();
  console.log("Spreadsheet: " + arrayOfArrays[0]);
  console.log("Spreadsheet: " + arrayOfArrays[1]);
  var headers = arrayOfArrays.shift();
  return arrayOfArrays.map(function (row) {
	return row.reduce(function (memo, value, index) {
  	if (value) {
    	memo[headers[index]] = value;
  	}
  	return memo;
	}, {});
  });
}

function onOpen(e){

//var form = FormApp.create('New Form Document
//var form = FormApp.openById("11T9J8Q8qbRi3oMMmfEzC5vtbLmWo15WAoVRYSalW5gE")
var form = FormApp.getActiveForm();
  form.setTitle('DO ANY TITLE YOU WANT HERE');
  form.setDescription('This is an example of Form generation');



  getSpreadsheetData().forEach(function (row) {

	var capitalizedName = row.Questions.charAt(0).toUpperCase() + row.Questions.slice(1);
	console.log("Spreadsheet: " + capitalizedName);

	form.addSectionHeaderItem()
  	.setTitle(capitalizedName);

	var item = form.addMultipleChoiceItem();
	item.setTitle(row.Questions)
  	.setChoices([
    	item.createChoice(row.Answer1),
    	item.createChoice(row.Answer2),
    	item.createChoice(row.Answer3),
    	item.createChoice(row.Answer4)
  	]);

	form.addParagraphTextItem()
  	.setTitle('Please describe');
  });
}

function onSubmit(e) {
  var form = FormApp.getActiveForm();
	var items = form.getItems();
  while(items.length > 0){
	form.deleteItem(items.pop());
  }

}
