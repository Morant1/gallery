'use strict';
var KEY = 'books';
var gBooks;
var PAGE_SIZE = 4;
var gPageIdx = 0;
var gLocalBooks = ['cinderlla', 'leon', 'run', 'monkey'];
var gSortBy = 'name';

_createBooks();

function getBooks() {
     gBooks = gBooks.sort(function (a, b) {
            if (a[gSortBy] > b[gSortBy]) return 1;
            if (a[gSortBy] < b[gSortBy]) return -1;
            return 0;

    })
 
    var startIdx = gPageIdx * PAGE_SIZE;
        
    var books = gBooks.slice(startIdx, startIdx + PAGE_SIZE);
    return books;
}

function updateNextPage(pageNumber) {
    var pageCount = getPageCount();

    gPageIdx = (pageNumber + 1 <= pageCount) ? pageNumber : 0;

}

function setSortListBy(sortBy) {
    gSortBy = sortBy;

}

function updateBook(bookId, bookPrice) {
    var bookIdx = _getBookById(bookId);
    gBooks[bookIdx].price = `${bookPrice}`;

    _saveBooksToStorage();

}

function getPageCount() {
    return Math.ceil(gBooks.length / PAGE_SIZE);
}

function _createBooks() {

    var books = loadFromStorage(KEY);
    if (!books || !books.length) {
        books = []
        var localBooks = gLocalBooks;
        for (let i = 0; i < 4; i++) {
            var book = localBooks[getRandomIntInclusive(0, localBooks.length - 1)]
            books.push(_createBook(book));
        }
    }
    gBooks = books;
    _saveBooksToStorage();


}

function _getBookById(bookId) {
    var bookIdx = gBooks.findIndex(function (book) {
        return bookId === book.id;
    })

    return bookIdx

}
function removeBook(bookId) {
    var bookIdx = _getBookById(bookId);
    gBooks.splice(bookIdx, 1);
    _saveBooksToStorage();

    if (!gBooks.length) _createBooks();

}

function getBook(bookId) {
    var bookIdx = _getBookById(bookId);

    return gBooks[bookIdx];
}

function addBook(bookName, bookPrice, bookImg) {
    var newBook = _createBook(bookName, bookPrice);
    newBook.imgUrl = bookImg;
    gBooks.push(newBook);
    _saveBooksToStorage();
}

function setBookRate(value, bookId) {
    var book = getBook(bookId);
    book.rate = value;

    _saveBooksToStorage();
}
function _createBook(name, price = getRandomIntInclusive(50, 200), rate = 0) {
    return {
        id: makeId(),
        name: name.toUpperCase(),
        price: price,
        description: makeLorem(),
        imgUrl: `./img/${name}.jpg`,
        rate: rate
    }
}

function _saveBooksToStorage() {
    saveToStorage(KEY, gBooks);
}