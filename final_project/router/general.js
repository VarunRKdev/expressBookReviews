const express = require('express');
const axios = require('axios');   // <-- Added for Task 10
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();


// ================= REGISTER =================
public_users.post('/register', function (req, res) {

    const username = req.body.username;
    const password = req.body.password;

    if (!username || !password) {
        return res.status(400).json({ message: "Username and password required" });
    }

    const userExists = users.find(user => user.username === username);

    if (userExists) {
        return res.status(409).json({ message: "User already exists" });
    }

    users.push({ username: username, password: password });

    return res.status(200).json({ message: "User successfully registered" });

});


// ================= TASK 1 =================
// Get all books
public_users.get('/', function (req, res) {
    return res.status(200).send(JSON.stringify(books, null, 4));
});


// ================= TASK 2 =================
// Get book details based on ISBN
public_users.get('/isbn/:isbn', function (req, res) {

    const isbn = req.params.isbn;
    const book = books[isbn];

    if (!book) {
        return res.status(404).json({ message: "Book not found" });
    }

    return res.status(200).send(JSON.stringify(book, null, 4));
});


// ================= TASK 3 =================
// Get book details based on author
public_users.get('/author/:author', function (req, res) {

    const author = req.params.author;
    const bookKeys = Object.keys(books);
    const matchedBooks = {};

    bookKeys.forEach(key => {
        if (books[key].author === author) {
            matchedBooks[key] = books[key];
        }
    });

    if (Object.keys(matchedBooks).length === 0) {
        return res.status(404).json({ message: "No books found by this author" });
    }

    return res.status(200).send(JSON.stringify(matchedBooks, null, 4));
});


// ================= TASK 4 =================
// Get book details based on title
public_users.get('/title/:title', function (req, res) {

    const title = req.params.title;
    const bookKeys = Object.keys(books);
    const matchedBooks = {};

    bookKeys.forEach(key => {
        if (books[key].title === title) {
            matchedBooks[key] = books[key];
        }
    });

    if (Object.keys(matchedBooks).length === 0) {
        return res.status(404).json({ message: "No books found with this title" });
    }

    return res.status(200).send(JSON.stringify(matchedBooks, null, 4));
});


// ================= TASK 5 =================
// Get book review
public_users.get('/review/:isbn', function (req, res) {

    const isbn = req.params.isbn;
    const book = books[isbn];

    if (!book) {
        return res.status(404).json({ message: "Book not found" });
    }

    return res.status(200).send(JSON.stringify(book.reviews, null, 4));
});


// ================= TASK 10 =================
// Get all books using Axios + async/await
public_users.get('/asyncbooks', async function (req, res) {

    try {
        const response = await axios.get('http://localhost:5000/');
        return res.status(200).json(response.data);
    } catch (error) {
        return res.status(500).json({ message: "Error fetching books using async/await" });
    }

});


// ================= EXPORT =================
module.exports.general = public_users;