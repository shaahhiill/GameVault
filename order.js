// Get saved cart data from localStorage (if nothing is saved, use an empty object)
let cartData = JSON.parse(localStorage.getItem("currentOrder")) || {};
let order = []; // This will store the actual list of items in the cart

// Loop through cartData and prepare the order list
for (const name in cartData) {
  order.push({
    item: name, // Item name
    quantity: cartData[name].quantity, // How many the user wants
    total: cartData[name].quantity * cartData[name].price // Price times quantity
  });
}

// This function fills the table on the page with the order items
function populateOrderTable() {
  const tbody = document.querySelector("#orderTable tbody"); // Get the table body
  tbody.innerHTML = ""; // Clear the table first
  let total = 0; // Keep track of the total cost

  // Add each order item to the table
  order.forEach(item => {
    const row = document.createElement("tr"); // Create a new table row
    row.innerHTML = `<td>${item.item}</td><td>${item.quantity}</td><td>${item.total}</td>`; // Fill the row
    tbody.appendChild(row); // Add the row to the table
    total += item.total; // Add to the final total
  });

  // Add a final row to show the grand total
  const row = document.createElement("tr");
  row.innerHTML = `<td colspan="2"><strong>Total</strong></td><td><strong>${total} LKR</strong></td>`;
  tbody.appendChild(row);
}

// This runs when the user clicks "Pay Now"
function payNow() {
  // Get user input from the form fields
  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const address = document.getElementById("address").value.trim();
  const card = document.getElementById("card").value.trim();
  const cvv = document.getElementById("cvv").value.trim();

  // Validation patterns:
  const nameRegex = /^[A-Za-z\s]+$/; // Only letters and spaces allowed
  const emailValid = email.includes('@') && email.endsWith('.com'); // Email must contain '@' and end with '.com'
  const cardRegex = /^\d{16}$/; // Card number must be exactly 16 digits
  const cvvRegex = /^\d{3}$/; // CVV must be exactly 3 digits

  // Check if any field is empty
  if (!name || !email || !address || !card || !cvv) {
    alert("Please fill in all fields.");
    return;
  }

  // Check for valid name (no numbers or special characters)
  if (!nameRegex.test(name)) {
    alert("Name must only contain letters and spaces (no numbers or special characters).");
    return;
  }

  // Check for valid email format
  if (!emailValid) {
    alert("Email must include '@' and end with '.com'.");
    return;
  }

  // Check for valid card number (16 digits only)
  if (!cardRegex.test(card)) {
    alert("Card number must be exactly 16 digits.");
    return;
  }

  // Check for valid CVV (3 digits only)
  if (!cvvRegex.test(cvv)) {
    alert("CVV must be exactly 3 digits.");
    return;
  }

  // Set a delivery date 3 days from today
  const deliveryDate = new Date();
  deliveryDate.setDate(deliveryDate.getDate() + 3);

  // Display thank you message and delivery details
  const message = `
    <h3>Thank you for your purchase, ${name}!</h3>
    <p>Your order will be delivered to:</p>
    <p>${address}</p>
    <p><strong>Expected Delivery Date:</strong> ${deliveryDate.toDateString()}</p>
  `;
  document.getElementById("thankYouMessage").innerHTML = message;
  document.getElementById("thankYouMessage").style.display = "block"; // Show thank you message
  document.getElementById("orderForm").style.display = "none"; // Hide form after payment
}


// Save the current order as a "favourite" to localStorage
function saveFavourites() {
  localStorage.setItem("favouriteOrder", JSON.stringify(order)); // Save it under the key "favouriteOrder"
  alert("Favourite order saved!"); // Change this message if you want
}

// Load the favourite order from localStorage and show it in the table
function applyFavourites() {
  const fav = JSON.parse(localStorage.getItem("favouriteOrder")); // Get saved favourite
  if (fav) {
    order = fav; // Replace the current order with the favourite one
    populateOrderTable(); // Show it in the table
    alert("Favourites applied!"); // You can change this message
  } else {
    alert("No favourite saved."); // This shows if nothing is saved yet
  }
}

// This will run when the page loads and show the current order in the table
window.onload = populateOrderTable;
