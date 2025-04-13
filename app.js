// DOM Elements
const newItemInput = document.getElementById('new-item');
const addButton = document.getElementById('add-button');
const itemsList = document.getElementById('items-list');

// Load items from localStorage
let items = JSON.parse(localStorage.getItem('items')) || [];

// Render items
function renderItems() {
    itemsList.innerHTML = '';
    
    items.forEach((item, index) => {
        const li = document.createElement('li');
        li.innerHTML = `
            <span>${item}</span>
            <button class="delete-btn" data-index="${index}">
                <i class="fas fa-trash"></i>
            </button>
        `;
        itemsList.appendChild(li);
    });
    
    // Add event listeners to delete buttons
    document.querySelectorAll('.delete-btn').forEach(button => {
        button.addEventListener('click', deleteItem);
    });
}

// Add new item
function addItem() {
    const newItem = newItemInput.value.trim();
    
    if (newItem) {
        items.push(newItem);
        saveItems();
        newItemInput.value = '';
        renderItems();
    }
}

// Delete item
function deleteItem(e) {
    const index = e.target.closest('.delete-btn').dataset.index;
    items.splice(index, 1);
    saveItems();
    renderItems();
}

// Save items to localStorage
function saveItems() {
    localStorage.setItem('items', JSON.stringify(items));
}

// Event listeners
addButton.addEventListener('click', addItem);
newItemInput.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        addItem();
    }
});

// Initial render
renderItems(); 