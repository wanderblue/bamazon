//save and require the MySQL and Inquirer npm packages 
var mysql = require('mysql');
var inquirer = require('inquirer');

var connection = mysql.createConnection({
	host:'localhost',
	port:3306,
	user:'newuser',
	password:'',
	database:'bamazon'
});

connection.connect(function (err) {
	if (err) throw err
	runSearch()
  })
  
function runSearch () {
  //first display all of the items available for sale. Include the skus, names, and prices of products for sale.
   connection.query('SELECT * FROM products', function(err,res){
	  if (err) throw err;
	  for (var i = 0; i < res.length; i++) {
		console.log('ID: ' + res[i].id + '| sku: ' + res[i].sku + ' | name: ' + res[i].product_name + " | Price: $" + res[i].price);
	    };
	// prompt users for purchase
	orderSearch();
  });
}

//The app then prompt users with two messages.
//The first should ask them the SKU of the product they would like to buy.
//The second message should ask how many units of the product they would like to buy.
function orderSearch(){
	inquirer.prompt([
		{
			type:'input',
			name:'skuofOrder',
			message:'Enter the sku of the product you would like to buy:',
		},
		{
			type:'input',
			name:'unitsofOrder',
			message:'Enter amount of units of the product they would like to buy:',
		}

	]).then(function(answer){
		
        //check if store has enough of the product to meet the customer's request.
		checkQuantity(answer.skuofOrder, answer.unitsofOrder);

	});
};

//fuction to check if store has enough of the product to meet the customer's request.
function checkQuantity(skuofOrder, units){
	connection.query('SELECT * FROM products WHERE ?', { sku: skuofOrder}, function(err,res){
		if (err) throw err;

		//if store has not enough of the product to meet the customer's request
		//log a phrase like Insufficient quantity!, and then prevent the order from going through.
        if(units > res[0].stock_quantity){
			console.log('Insufficient quantity!');
			orderSearch();
    	    }else{
		    //if the store does have enough of the product, fulfill the customer's order.	
			processOrder(skuofOrder, res[0].stock_quantity ,units, res[0].product_name, res[0].price);
		}
	});
};


//function to fulfill the customer's order.
//updating the SQL database to reflect the remaining quantity.
//Once the update goes through, show the customer the total cost of their purchase.
function processOrder(id,originalUnits,units,orderName,price){
	connection.query('UPDATE products SET ? WHERE ?',
		[
			{
				stock_quantity: originalUnits - units,
			},
			{
				sku: id
			}
		],
	 function(err,res){
	 	console.log('\nThank you for your order of ',units,'unit(s) of',orderName + '.' +'\n'); 	
	 	console.log("The total cost of your purchase is $" + units*price + '.\n');
	 	connection.end();
	 });
}


