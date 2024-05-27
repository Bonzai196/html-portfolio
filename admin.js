let menuDatabase = JSON.parse(localStorage.getItem('menuData')) || {
    breakfast: [],
    lunch: [],
    dinner: [],
    dessert: []
};

let ingredients = JSON.parse(localStorage.getItem('ingredients')) || [];

document.addEventListener('DOMContentLoaded', function() {
    // Initialize display
    displayItems(document.getElementById('mealType').value);
    displayIngredients();

    // Add event listener to meal type dropdown to update items display on change
    document.getElementById('mealType').addEventListener('change', function() {
        displayItems(this.value);
    });
});

function addItem() {
    const mealType = document.getElementById('mealType').value;
    const itemName = document.getElementById('itemName').value;
    const description = document.getElementById('description').value;
    const time = document.getElementById('time').value;
    const ingredientsInput = document.getElementById('ingredients').value;

    const newItem = {
        name: itemName,
        description: description,
        time: time,
        ingredients: ingredientsInput
    };

    menuDatabase[mealType].push(newItem);
    localStorage.setItem('menuData', JSON.stringify(menuDatabase));
    document.getElementById('menuForm').reset();
    displayItems(mealType);
}

function displayItems(mealType) {
    const itemList = document.getElementById('itemList');
    itemList.innerHTML = ''; // Clear existing items
    menuDatabase[mealType].forEach((item, index) => {
        const itemElement = document.createElement('div');
        itemElement.innerHTML = `${item.name} - ${item.time} mins <button onclick="deleteItem('${mealType}', ${index})">Delete</button> <button onclick="editItem('${mealType}', ${index})">Edit</button>`;
        itemList.appendChild(itemElement);
    });
}

function deleteItem(mealType, index) {
    menuDatabase[mealType].splice(index, 1);
    localStorage.setItem('menuData', JSON.stringify(menuDatabase));
    displayItems(mealType);
}

function editItem(mealType, index) {
    const item = menuDatabase[mealType][index];
    document.getElementById('itemName').value = item.name;
    document.getElementById('description').value = item.description;
    document.getElementById('time').value = item.time;
    document.getElementById('ingredients').value = item.ingredients;

    const saveButton = document.getElementById('saveButton');
    saveButton.style.display = 'inline';
    saveButton.onclick = function() {
        saveEdit(mealType, index);
    };
}

function saveEdit(mealType, index) {
    const item = {
        name: document.getElementById('itemName').value,
        description: document.getElementById('description').value,
        time: document.getElementById('time').value,
        ingredients: document.getElementById('ingredients').value
    };

    menuDatabase[mealType][index] = item;
    localStorage.setItem('menuData', JSON.stringify(menuDatabase));
    document.getElementById('menuForm').reset();
    document.getElementById('saveButton').style.display = 'none';
    displayItems(mealType);
}

function addIngredient() {
    const newIngredient = document.getElementById('newIngredient').value;
    if (!ingredients.includes(newIngredient)) {
        ingredients.push(newIngredient);
        localStorage.setItem('ingredients', JSON.stringify(ingredients));
        displayIngredients();
        document.getElementById('ingredientForm').reset();
    }
}

function displayIngredients() {
    const list = document.getElementById('ingredientList');
    list.innerHTML = '';
    ingredients.forEach((ingredient, index) => {
        const item = document.createElement('div');
        item.innerHTML = `${ingredient} <button onclick="deleteIngredient(${index})">Delete</button>`;
        list.appendChild(item);
    });
}

function deleteIngredient(index) {
    ingredients.splice(index, 1);
    localStorage.setItem('ingredients', JSON.stringify(ingredients));
    displayIngredients();
}
