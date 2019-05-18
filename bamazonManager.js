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
	managerView()
  })

  //run list of menu options:
function managerView(){
	inquirer.prompt([
		{
			type:'list',
			name:'manager',
			message:'What managerial option will you like to do:',
			choices: [
				'View Products for Sale',
				'View Low Inventory',
				'Add to Inventory',
				'Add New Product',
				'EXIT'
			]
		}
	]).then(function(answer){
		if (answer.manager === 'View Products for Sale'){
			console.log('\n');
			viewProducts();
		}else if(answer.manager === 'View Low Inventory'){
			console.log('\n');
			viewLowInventory();
		}else if(answer.manager === 'Add to Inventory'){
			addInventory();
		}else if(answer.manager === 'Add New Product'){
			addNewProduct();
		}else {
			connection.end()
		  };
	});
};


//If a manager selects View Products for Sale, the app should list
//every available item: the item SKUs, names, prices, and quantities.
function viewProducts(){
	connection.query('SELECT * FROM products', function(err,res){
		if (err) throw err;
		for (var i = 0; i < res.length; i++) {
			console.log('ID: ' + res[i].id + '| sku: ' + res[i].sku +' | name: ' + res[i].product_name + " | Price: $" + res[i].price + " | Quantity: " + res[i].stock_quantity);
		};
		console.log('\n');
		managerView();
	});
};

//If a manager selects View Low Inventory,
// then it should list all items with an inventory count lower than five.
function viewLowInventory(){
	connection.query('SELECT * FROM products WHERE stock_quantity <= 5', function(err,res){
		if (err) throw err;
		for (var i = 0; i < res.length; i++) {
			console.log('ID: ' + res[i].id + '| sku: ' + res[i].sku + ' | name: ' + res[i].product_name + " | Price: $" + res[i].price + " | Quantity: " + res[i].stock_quantity);
		};
		console.log('\n');
		managerView();
	});
};


//If a manager selects Add to Inventory, your app should display a prompt 
//that will let the manager "add more" of any item currently in the store.
function addInventory(){	
	inquirer.prompt([
		{
			type:'input',
			name:'skuSelect',
			message:'Enter sku of product you want to add inventory to:',
		},
		{
			type:'input',
			name:'unitEntered',
			message:'Enter units of products you want to add:',
		}
	]).then(function(answer){

    	connection.query('SELECT * FROM products WHERE ?', { sku: answer.skuSelect}, function(err,res){
		   	if (err) throw err;
	
			  var newUnits = parseInt(res[0].stock_quantity) + parseInt(answer.unitEntered);
				updateProduct(answer.skuSelect, newUnits,answer.unitEntered);
			
		});
	})
}; 

//function to update new quantity
function updateProduct(skuAdd, quantityNew, units){
	connection.query('UPDATE products SET ? WHERE ?',
		[
			{
				stock_quantity: quantityNew
			},
			{
				sku: skuAdd
			}
		],
		function(err,res){
			console.log("\n  Product of sku #" + skuAdd + " increased by " + units + " units.")
			console.log('\n');
 	 		managerView();
	 	});
};

//if a manager selects Add New Product, 
//it should allow the manager to add a completely new product to the store.
function addNewProduct(){
	inquirer.prompt([
		{
			type:'input',
			name:'sku',
			message:'Enter sku of the product:',
		},
		{
			type:'input',
			name:'product_name',
			message:'Enter name of the product:',
		},
		{
			type:'input',
			name:'department_name',
			message:'Enter department name:',
		},		
		{
			type:'input',
			name:'price',
			message:'Enter product price ($00.00): $',
		},		
		{
			type:'input',
			name:'stock_quantity',
			message:'Enter units of product avaiable for purchase:'
		},

	]).then(function(answer){
		connection.query(
    	"INSERT INTO products SET ?",
    	{
			sku: answer.sku,
			product_name: answer.product_name,
    		department_name: answer.department_name,
      	    price: answer.price,
         	stock_quantity: answer.stock_quantity,
       	},
    	function(err, res) {
    	console.log('\n'+answer.product_name+' added to '+ answer.department_name+' at $'+answer.price+'. Total '+answer.stock_quantity+' in stock.\n');
        managerView();
    	}
  	);
	})
};

