const draggable_list = document.getElementById('draggable-list');
const check = document.getElementById('check');
const richest = [
    'Jeff Bezos',
    'Bill Gates',
    'Bernard Arnault',
    'Warren Buffet',
    'Larry Ellison',
    'Amancio Ortega',
    'Mark Zuckerberg',
    'Jim Walton',
    'Alice Walton',
    'Rob Walton',
];

// Almacenar items
const listItems = [];

let dragStartIndex;

createList();

// insertar items en el DOM
function createList() {
    [...richest]
        .map(a => ({ value: a, sort: Math.random() }))
        .sort((a, b) => a.sort - b.sort)
        .map(a => a.value)
        .forEach((person, index) => {
            const listItem = document.createElement('li');
            listItem.setAttribute('data-index', index);
            listItem.innerHTML = `
        <span class="number">${index + 1}</span>
        <div class="draggable" draggable="true">
          <p class="person-name">${person}</p>
          <i class="fas fa-grip-lines"></i>
        </div>
      `;
            listItems.push(listItem);
            draggable_list.appendChild(listItem);
        });
}