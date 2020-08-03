'use strict';


function onInit() {
    renderBooks()
}


function renderBooks() {
    var books = getBooks();

    var strHtmls = books.map(function (book) {
        return `
        <tr>
        <td>${book.id}</td>
        <td>${book.name}</td>
        <td>${book.price}$</td>
        <td><button onclick="onReadBook('${book.id}')" class="read">READ</button></td>
        <td><button onclick="onUpdateBook('${book.id}')" class="update">UPDATE</button></td>
        <td><button onclick="onRemoveBook('${book.id}')" class="delete">DELETE</button></td>
        </tr>   
        `
    })
    document.querySelector('.books-table').innerHTML = strHtmls.join('')


    var strHtml = '';
    var pagesNumber = getPageCount();
    for (var index = 0; index < pagesNumber ; index++) {
        strHtml +=`<button onclick="onNextPage(${index})">${index+1}</button>`;
    }
    document.querySelector('.next-page').innerHTML = strHtml;

}

function onSetSort(sortBy){
    setSortListBy(sortBy);
    renderBooks();
}

function onNextPage(pageNumber) {
    updateNextPage(pageNumber);
    renderBooks();
}


function onReadBook(bookId) {
    var currBook = getBook(bookId);
    var elModal = document.querySelector('.modal');

    var strHtml = `
    <button class="close-modal" onclick="onCloseModal()">Close</button>
    <h1>${currBook.name}</h1>
    <h3>${currBook.price}$</h3>
    <p>${currBook.description}</p>
    <div class="img-modal">
        <img src="${currBook.imgUrl}">
    </div>
    <div class="rate">
    <input class="input-rate" onclick="onBookRate('${currBook.id}')" type="number" min="0" max="10" value="${currBook.rate}">
    <label>Rate the book</label>
    </div>`

    elModal.innerHTML = strHtml;
    elModal.style.visibility = 'visible';



}
function onBookRate(bookId) {
    var elRate = document.querySelector('.input-rate');
    setBookRate(elRate.value ,bookId);
    renderBooks();
}

function onCloseModal() {
    document.querySelector('.modal').style.visibility = 'hidden';
    renderBooks()

}

function onUpdateBook(bookId) {
    var bookPrice = +prompt('Please insert the price of the book:');
    if (!bookPrice || bookPrice<0) return;
    updateBook(bookId, bookPrice);
    renderBooks();
}

function onAddBook() {
    var bookName = prompt('Please insert the name of the book:');
    var bookPrice = +prompt('Please insert the price of the book:');
    var bookImg = prompt('Please insert the url of the book image:');

    if (!bookImg) bookImg ='./img/no-image.jpg';
    if (!bookPrice || bookPrice<0) bookPrice = 0;

    addBook(bookName, bookPrice, bookImg);
    renderBooks();


}




function onRemoveBook(bookId) {
    removeBook(bookId);
    renderBooks();
}