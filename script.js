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
    addEventListeners();
}
function dragStart() {
    // console.log('Event: ', 'dragstart');
    dragStartIndex = +this.closest('li').getAttribute('data-index');
}
function dragOver(e) {
    e.preventDefault();
    // console.log('Event: ', 'dragover');
}
function dragDrop() {
    // console.log('Event: ', 'drop');
    const dragEndIndex = +this.getAttribute('data-index');
    swapItems(dragStartIndex, dragEndIndex);
    this.classList.remove('over');

}
function dragEnter() {
    // console.log('Event: ', 'dragenter');
    this.classList.add('over');
}

function dragLeave() {
    this.classList.remove('over');
    console.log('Event: ', 'dragleave');
}

// Verificar el orden correcto de la lista
function checkOrder() {
    listItems.forEach((listItem, i) => {
        const personName = listItem.querySelector('.draggable').innerText.trim();
        if (personName !== richest[i]) {
            listItem.classList.add('wrong');
        } else {
            listItem.classList.remove('wrong');
            listItem.classList.add('right');
        }
    });
}

// Intercambio de items en evento drag n drop
function swapItems(from, to) {
    const itemOne = listItems[from].querySelector('.draggable');
    const itemTwo = listItems[to].querySelector('.draggable');
    listItems[from].appendChild(itemTwo);
    listItems[to].appendChild(itemOne);
}

function addEventListeners() {
    const draggables = document.querySelectorAll('.draggable');
    const dragListItems = document.querySelectorAll('.draggable-list li');
    draggables.forEach(draggable => {
        draggable.addEventListener('dragstart', dragStart);
    });

    dragListItems.forEach(item => {
        item.addEventListener('dragover', dragOver);
        item.addEventListener('drop', dragDrop);
        item.addEventListener('dragenter', dragEnter);
        item.addEventListener('dragleave', dragLeave);
    });
}

check.addEventListener('click', checkOrder);