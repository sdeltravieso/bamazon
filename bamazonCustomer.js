var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,

    // Your username
    user: "root",

    // Your password
    password: "",
    database: "bamazon"
});

// connect to the mysql server and sql database
connection.connect(function (err) {
    if (err) throw err;
    // run the start function after the connection is made to prompt the user
    // listItems();  delete this when done
    startBamazon();
});


function displayProducts() {
    connection.query("SELECT * FROM products", function (err, results) {
        if (err) throw err;
        console.log(" ");
        console.log("Inventory");
        console.log("---------");

        var productString = "";
        for (var i = 0; i < results.length; i++) {
            productString = "";

            productString += "Item ID: " + results[i].item_id + " ----- Product: " + results[i].product_name +
                " ------ Price: $" + results[i].price;

            console.log(productString);
        }
        makePurchase();
    })
}


function makePurchase() {
    inquirer
        .prompt([
            {
                name: "itemID",
                type: "input",
                message: "Enter the Item ID of the item you would like to purchase: ",
            },
            {
                name: "quantity",
                type: "input",
                message: "How many would you like to purchase?"
            }
        ])
        .then(function (response) {
            var itemID = parseInt(response.itemID);
            var quantity = parseInt(response.quantity);

            var query = "SELECT * FROM products WHERE ?";

            connection.query(query,
                {
                    item_id: itemID
                },
                function (err, results) {
                    if (err) throw err;

                    // if there is no result, send back to display products.
                    if (!results.length) {
                        console.log(" ");
                        console.log("----------------------------------------------");
                        console.log("*********Invalid Item ID. Please enter a valid Item ID.**********");
                        displayProducts();
                    } else {
                        var productData = results[0];

                        if (productData.stock_quantity >= quantity) {
                            console.log("")

                            var updateQuery = "UPDATE products SET ? WHERE ?";

                            connection.query(updateQuery,
                                [
                                    {
                                        stock_quantity: productData.stock_quantity - quantity
                                    },
                                    {
                                        item_id: itemID
                                    }
                                ],
                                function (error) {
                                    if (error) throw err;
                                    console.log(" ");
                                    console.log("**********************************");
                                    console.log("Order placed! Your total is: $" + productData.price * quantity + ".");
                                    console.log("**********************************");
                                    console.log(" ");

                                    connection.end();
                                })
                        } else {
                            console.log(" ");
                            console.log("******************************************");
                            console.log("Insufficient Quantity. Please lower the quantity.");
                            console.log("******************************************");

                            displayProducts();
                        }
                    }
                })
        })
}

function startBamazon() {
    displayProducts();
}