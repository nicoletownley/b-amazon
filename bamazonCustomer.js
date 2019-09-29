
var mysql = require("mysql");
require ("console.table")
var inquirer = require ("inquirer")
var connection = mysql.createConnection({
  host: "localhost",

  // Your port; if not 3306
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "Edith191$1@",
  database: "bamazon_db"
});

connection.connect(function(err) {
  if (err) throw err;
  console.log("connected as id " + connection.threadId);
  connection.end();
});

//the purpose of this function is to load the products
function loadProduct () {
        connection.query("SELECT * FROM products", function (err, res){
            if (err) throw err;
            console.table (res,)
            promptCustomerForId(res);
        })
}
// loadProduct();
function promptCustomerForId (inventory) {
    inquirer
    .prompt([
        {
        type: "input",
        name:  "choice",
        message: "What is the name of the product you would like to buy?"
        }
    ])
    .then(function(val){
        var choiceId = parseInt(val.choice);
        var product= checkinventory (choiceId,inventory);
        if (product) {
            promptCustomerForQuantity (product)
        }
        else {
            loadProduct()
        }
    })
}
    function promptCustomerForQuantity (product) {
        inquirer
        .prompt([
            {
            type: "input",
            name:  "quantity",
            message: "How many items would you like to purchase?"
            }
        ])
        .then(function(val){
           var quantity = parseInt(val.quanity);
            if (quanity>product.stock_quantity) {
                console.log("insufficient products");
                loadProduct ();
            } else {
                makePurchase (product, quantity);

            }
        });
    }

    function makePurchase(product, quanity){
        connection.query(
            "UPDATE products SET stock_quanity = - ? WHERE item_id = ?",
            [quanity, product.item_id],
            function(err, res){
                loadProduct();
            }
        )
    }
    function checkinventory(choiceId, inventory){
        for (var i = 0; i < inventory.length; i++){
            if (inventory[i].item_id === choiceId){
                return inventory[i]
            }
        }
    }