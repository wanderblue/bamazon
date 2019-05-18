DROP DATABASE if exists bamazon;

CREATE DATABASE bamazon;

USE bamazon;

CREATE TABLE products(
	id INT AUTO_INCREMENT,
	sku INT  NOT NULL,  
	product_name VARCHAR(30) NOT NULL,  
	department_name VARCHAR(30) NOT NULL,
	price DECIMAL(10,2) NOT NULL,
	stock_quantity INT NOT NULL,
    PRIMARY KEY (id)
);

INSERT INTO products(sku, product_name, department_name, price, stock_quantity)
VALUES(1111,'Clamue Mask', 'Skin Care',30.00,100);

INSERT INTO products(sku, product_name, department_name, price, stock_quantity)
VALUES(2222,'Eye Cream', 'Skin Care',300.00,50);

INSERT INTO products(sku, product_name, department_name, price, stock_quantity)
VALUES(3333,'Eye Shadow', 'Make Up',20.00,50);

INSERT INTO products(sku, product_name, department_name, price, stock_quantity)
VALUES(4444,'Lip Gloss', 'Make Up',10.00,100);

INSERT INTO products(sku, product_name, department_name, price, stock_quantity)
VALUES(6999,'Slip Dress', 'Clothes',100.00,100);

INSERT INTO products(sku, product_name, department_name, price, stock_quantity)
VALUES(6987,'Maxi Dress', 'Clothes',200.00,100);

INSERT INTO products(sku, product_name, department_name, price, stock_quantity)
VALUES(9666,'Skinny Jean', 'Clothes',160.00,300);

INSERT INTO products(sku, product_name, department_name, price, stock_quantity)
VALUES(9687,'T Shirt', 'Clothes',10.00,400);

INSERT INTO products(sku, product_name, department_name, price, stock_quantity)
VALUES(5678,'Africa', 'Books',70.00,4);

INSERT INTO products(sku, product_name, department_name, price, stock_quantity)
VALUES(6789,'Avengers', 'Books',100.00,1000);
