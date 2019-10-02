USE bamazon_db;

CREATE TABLE products (
item_id INTEGER AUTO_INCREMENT NOT NULL, 
product_name VARCHAR(100) NOT NULL,
department_name VARCHAR(100) NOT NULL, 
price DECIMAL(10,2) NOT NULL,
stock_quantity INTEGER (10),
PRIMARY KEY (item_id)
);


INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Stuart Weitzman", "Shoes",450, 20),("Blender", "Appliances",45.99, 20),("Sofa","Furniture",3000, 3),("Coffee", "Grocery",7.99, 500),("Micheal Kors Skirt", "Apparel",2000, 15),("Baseball", "Sporting Goods",8.99, 300),("Chicken Fingers", "Cafateria",3.99, 5),("Campbell's Chicken Noodle Soup", "Grocery",4.99, 50),("14K Gold Bracelet", "Jewelry",750, 1),("Diamond Necklace", "Jewlry",3000, 5),("Hat", "Outerwear",15.99, 400),("Dress", "Apparel", 250, 120)


