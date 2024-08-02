const prices = {
    'Apple':200,
    'Banana':200,
    'Orange':200,
    'Grapes':200,
    'Mango':200,
    'Pineapple':200,
    'Carrot': 200,
    'Beans':200,
    'beet-root':200,
    'Potato': 200,
    'Tomato':200,
    'Onion':200,
    'milk-powder':200,
    'Cheese': 200,
    'Yogurt':200,
    'Butter':200,
    'Cream': 200,
    'Eggs': 200,
    'Chicken':200,
    'Salmon':200,
    'Beef':200,
    'Shrimp':200,
    'Pork':200,
    'Lamb':200,
    'Flour':200,
    'Sugar':200,
    'Baking Powder':200,
    'salt':200,
    'bell-pepper':200,
    'chocolate-powder':200,
};

function addItem(name, category) {
    const quantityInput = document.getElementById(`${name.toLowerCase().replace(' ', '-')}-quantity`);
    const quantity = parseFloat(quantityInput.value);
    if (quantity > 0) {
        const price = prices[name] * quantity;
        const tableBody = document.getElementById('order-table').getElementsByTagName('tbody')[0];
        const rows = tableBody.getElementsByTagName('tr');
        let itemExists = false;
        
        for (let i = 0; i < rows.length; i++) {
            const row = rows[i];
            if (row.cells[0].textContent === name) {
                const existingQuantity = parseFloat(row.cells[2].textContent);
                row.cells[2].textContent = (existingQuantity + quantity).toFixed(1);
                row.cells[3].textContent = (parseFloat(row.cells[3].textContent) + price).toFixed(2);
                itemExists = true;
                break;
            }
        }

        if (!itemExists) {
            const row = tableBody.insertRow();
            row.insertCell(0).textContent = name;
            row.insertCell(1).textContent = category;
            row.insertCell(2).textContent = quantity.toFixed(1);
            row.insertCell(3).textContent = price.toFixed(2);
            row.insertCell(4).innerHTML = '<button onclick="removeItem(this)">Remove</button>';
        }
        updateTotalPrice();
        alert(`Added ${quantity.toFixed(1)} kg of ${name} to your order.`);
    } else {
        alert(`Please enter a quantity greater than 0 for ${name}.`);
    }
}

function removeItem(button) {
    const row = button.parentNode.parentNode;
    const price = parseFloat(row.cells[3].textContent);
    const quantity = parseFloat(row.cells[2].textContent);
    row.parentNode.removeChild(row);
    updateTotalPrice();
}

// Function to update total price
function updateTotalPrice() {
    let totalPrice = 0;
    const rows = document.querySelectorAll('#order-table tbody tr');
    rows.forEach(row => {
        const price = parseFloat(row.children[3].textContent);
        totalPrice += price;
    });
    document.getElementById('total-price').textContent = `$${totalPrice.toFixed(2)}`;
}

function navigateToCheckout() {
    const rows = document.querySelectorAll('#order-table tbody tr');
    const orderDetails = [];
    rows.forEach(row => {
        const itemName = row.children[0].textContent;
        const category = row.children[1].textContent;
        const quantity = row.children[2].textContent;
        const price = row.children[3].textContent;
        orderDetails.push({ itemName, category, quantity, price });
    });
    localStorage.setItem('orderDetails', JSON.stringify(orderDetails));
    window.location.href = './pay.html'; // Redirect to checkout page
}

function addToFavourites() {
    const tableBody = document.getElementById('order-table').getElementsByTagName('tbody')[0];
    const rows = tableBody.getElementsByTagName('tr');
    let favourites = [];
    for (let i = 0; i < rows.length; i++) {
        const row = rows[i];
        const item = row.cells[0].textContent;
        const category = row.cells[1].textContent;
        const quantity = parseInt(row.cells[2].textContent);
        const price = parseFloat(row.cells[3].textContent);
        favourites.push({ item, category, quantity, price });
    }
    localStorage.setItem('favourites', JSON.stringify(favourites));
    alert('Your selected items have been added to favourites!\nYou can Apply your order after order the products! ');
}

function applyFavourites() {
    const favourites = JSON.parse(localStorage.getItem('favourites')) || [];
    const tableBody = document.getElementById('order-table').getElementsByTagName('tbody')[0];
    favourites.forEach(fav => {
        const row = tableBody.insertRow();
        row.insertCell(0).textContent = fav.item;
        row.insertCell(1).textContent = fav.category;
        row.insertCell(2).textContent = fav.quantity;
        row.insertCell(3).textContent = fav.price.toFixed(2);
        row.insertCell(4).innerHTML = '<button onclick="removeItem(this)">Remove</button>';
    });
    alert('Your Choose products added to the Order!....');
    updateTotalPrice();
}

function clearLocalStorage() {
    localStorage.removeItem('favourites');
    alert('Your favourites have been cleared!\nYou can choose products again...');
}
