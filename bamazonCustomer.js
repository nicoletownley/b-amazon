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
//   connection.end();
loadProduct();
});

//the purpose of this function is to load the products
function loadProduct () {
        connection.query("SELECT * FROM products", function (err, res){
            if (err) throw err;
            console.table (res,)
            promptCustomerForItem(res);
        })
}
// loadProduct();
// function promptCustomerForId (inventory) {
//     inquirer
//     .prompt([
//         {
//         type: "input",
//         name:  "choice",
//         message: "What is the Item-id of the product you would like to buy?"
//         }
//     ])
//     .then(function(val){
//         var choiceId = parseInt(val.choice);
//         var product= checkinventory (choiceId,inventory);
//         if (product) {
//             promptCustomerForQuantity (product)
//         }
//         else {
//             loadProduct()
//         }
//     })
// }

function promptCustomerForItem(inventory) {
    // Prompts user for what they would like to purchase
    inquirer
      .prompt([
        {
          type: "input",
          name: "choice",
          message: "What is the ID of the item you would you like to purchase? press Q to exit",
          validate: function(val) {
            return !isNaN(val) || val.toLowerCase() === "q";
          }
          
        }
      ])
      .then(function(val) {
        // Check if the user wants to quit the program
        // clear
        checkIfShouldExit(val.choice);
        var choiceId = parseInt(val.choice);
        var product = checkInventory(choiceId, inventory);
  
        // If there is a product with the id the user chose, prompt the customer for a desired quantity
        if (product) {
          // Pass the chosen product to promptCustomerForQuantity
          promptCustomerForQuantity(product);
        }
        else {
          // Otherwise let them know the item is not in the inventory, re-run loadProducts
          console.log("\nThat item is not in the inventory.");
          loadProducts();
        }
      });
  }

    function promptCustomerForQuantity (product) {
        inquirer
        .prompt([
            {
            type: "input",
            name:  "quantity",
            message: "How many items would you like to purchase? press Q to quit",
            validate: function(val) {
                return !isNaN(val) || val.toLowerCase() === "q";
              }
            }
        ])
        .then(function(val){
            checkIfShouldExit(val.quantity)
           var quantity = parseInt(val.quantity);
            if (quantity>product.stock_quantity) {
                console.log("insufficient products. Please review the inventory and select a lesser amount");
                loadProduct ();
            } else {
                makePurchase (product, quantity);

            }
        });
    }

    // function makePurchase(product, quantity){
    //     connection.query(
    //         "UPDATE products SET stock_quantity = - ? WHERE item_id = ?",
    //         [quantity, product.item_id],
    //         function(err, res){
    //             loadProduct();
    //         }
    //     )
    // }

    function makePurchase(product, quantity) {
        connection.query(
          "UPDATE products SET stock_quantity = stock_quantity - ? WHERE item_id = ?",
          [quantity, product.item_id],
          function(err, res) {
            // Let the user know the purchase was successful, re-run loadProducts
            console.log("\nSuccessfully purchased " + quantity + " " + product.product_name + "'s!");
            loadProduct();
          }
        );
    }
    function checkInventory(choiceId, inventory){
        for (var i = 0; i < inventory.length; i++){
            if (inventory[i].item_id === choiceId){
                return inventory[i]
            }
        }
        console.log("This item is not avaliable, please select another item")
    }

    function checkIfShouldExit(choice) {
        if (choice.toLowerCase() === "q") {
          // Log a message and exit the current node process
          console.log("Goodbye!");
          process.exit(0);
        }
      }