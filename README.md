# bamazon


Bamazon
Description
This application will take in orders from customers and deplete stock from the store's inventory using the npm inquirer package and the MySQL database backend together with the npm mysql package. The application presents two interfaces: customer and manager.

MySQL Database Setup
Bamazon database and the products table were created with the SQL code found in Bamazon.sql. 
The products table should have each of the following columns:
sku (unique id for each product)
product_name (Name of product)
department_name
price (cost to customer)
stock_quantity (how much of the product is available in stores)

then you will be ready to proceed with running the Bamazon customer and manager interfaces.

Customer Interface
The customer interface allows the user to view the current inventory of store items. The user is then able to purchase one of the existing items by entering the item ID and the desired quantity. If the selected quantity is currently in stock, the user's order is fulfilled, displaying the total purchase price and updating the store database. If the desired quantity is not available, the user is prompt insufficient quantity.


The manager interface presents a list of four options, as below.
❯ View Products for Sale 
  View Low Inventory 
  Add to Inventory 
  Add New Product
The View Products for Sale option allows the user to view the current inventory of store items: item IDs, descriptions, department in which the item is located, price, and the quantity available in stock.

The View Low Inventory option shows the user the items which currently have fewer than 100 units available.

The Add to Inventory option allows the user to select a given item ID and add additional inventory to the target item.

The Add New Product option allows the user to enter details about a new product which will be entered into the database upon completion of the form.


Bamazon Demo

![alt-text](https://github.com/wanderblue/bamazon/blob/master/example1.png)

![alt-text](https://github.com/wanderblue/bamazon/blob/master/example2.png)
