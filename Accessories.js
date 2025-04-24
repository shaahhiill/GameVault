//All the products are stored here
let cart = {};

// This runs automatically when the page finishes loading
document.addEventListener("DOMContentLoaded", function () {

    // Find the table body where we will show cart items
    const cartTable = document.querySelector("#cartTable tbody");

    // Find the element where we will show the total price
    const totalPrice = document.getElementById("totalPrice");

    // This function displays all items in the cart on the page
    function showCart() {
        cartTable.innerHTML = ""; // Clear the table before adding new rows
        let total = 0; // Total price of all items in the cart

        // Go through each item in the cart
        for (let itemName in cart) {
            let item = cart[itemName]; // Get item details (quantity & price)

            // Create a new row in the table
            let row = document.createElement("tr");

            // Adds the item name to the cart
            let nameCell = document.createElement("td");
            nameCell.textContent = itemName;

            // Adds the quantity and buttons to change it
            let quantityCell = document.createElement("td");

            // "−" button to reduce quantity
            let minusButton = document.createElement("button");
            minusButton.textContent = "-";
            minusButton.onclick = function () {
                item.quantity--; // Reduce quantity by 1
                if (item.quantity <= 0) {
                    delete cart[itemName]; // Remove item if quantity is 0
                }
                showCart(); // Refresh the cart view
            };

            // Show current quantity
            let quantityText = document.createElement("span");
            quantityText.textContent = item.quantity;
            quantityText.style.margin = "0 10px";

            // "+" button to increase quantity
            let plusButton = document.createElement("button");
            plusButton.textContent = "+";
            plusButton.onclick = function () {
                item.quantity++; // Increase quantity by 1
                showCart(); // Refresh the cart view
            };

            // Add the buttons and quantity to the quantityCell
            quantityCell.appendChild(minusButton);
            quantityCell.appendChild(quantityText);
            quantityCell.appendChild(plusButton);

            // Price
            let priceCell = document.createElement("td");
            let itemTotal = item.quantity * item.price; // Calculate total for this item
            priceCell.textContent = itemTotal;

            // Add this item's total to the final total
            total += itemTotal;

            // Add all cells to the row
            row.appendChild(nameCell);
            row.appendChild(quantityCell);
            row.appendChild(priceCell);

            // Add the row to the table
            cartTable.appendChild(row);
        }

        // Show the final total price
        totalPrice.textContent = total;
    }

    // This runs when someone clicks the "Add to Cart" button
    let addButtons = document.querySelectorAll(".add-to-cart");
    addButtons.forEach(function (button) {
        button.onclick = function () {
            // Get the product name and price from the button's data attributes
            let name = button.getAttribute("data-name");
            let price = parseInt(button.getAttribute("data-price"));

            // Increases the item quantity in the cart
            if (cart[name]) {
                cart[name].quantity++;
            } else {
                // Otherwise, add the item to the cart for the first time
                cart[name] = { quantity: 1, price: price };
            }

            // Update the cart display
            showCart();
        };
    });

    // Buy Now Button
    // Saves current cart to local storage and goes to the order page
    window.buyNow = function () {
        localStorage.setItem("currentOrder", JSON.stringify(cart)); // Save cart
        window.location.href = "Order.html"; // Go to order page
    };

    // Save Favourites Button
    // Stores current cart as a "favourites" cart in local storage
    window.saveFavourites = function () {
        localStorage.setItem("favourites", JSON.stringify(cart)); // Save as favourites
        alert("Favourites saved!");
    };

    // Apply Favourites Button
    // Loads previously saved favourites and puts them in the cart
    window.applyFavourites = function () {
        let saved = localStorage.getItem("favourites"); // Get saved favourites
        if (saved) {
            cart = JSON.parse(saved); // Load into the cart
            showCart(); // Show the updated cart
            alert("Favourites added to cart!");
        } else {
            alert("No favourites found!");
        }
    };

    // Clear Favourites Button
    window.clearFavourites = function () {
        localStorage.removeItem("favourites"); // Remove from local storage
        alert("Favourites cleared!");
    };

});
