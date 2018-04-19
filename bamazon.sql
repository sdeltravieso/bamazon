DROP DATABASE IF EXISTS bamazon;
CREATE database bamazon;

USE bamazon;

CREATE TABLE products (
	item_id INT NOT NULL AUTO_INCREMENT,
    product_name VARCHAR(100) NOT NULL,
    department_name varchar(100),
	price DECIMAL(6,2) NOT NULL,
    stock_quantity INT NOT NULL,
    PRIMARY KEY (item_id)
);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Punctured Basketball", "Sports", 209.83, 7);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Lemon Popsicle", "Frozen Treats", 1.56, 10);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Chicken Feather", "Bedding", 7.29, 95);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Lego", "Toys", 5.67, 956);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Haircut Kit", "Beauty", 56.89, 14);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Drill", "Tools", 109.99, 5);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Paintbrush", "Tools", 12.86, 17);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Toy Story", "Movies", 24.96, 23);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Tennis Shoes", "Apparel", 75.89, 15);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Banana Bread", "Food", 3.65, 4);