const express = require("express");

const app = express();

const PORT = 3000;

// Allows the server to read JSON data
app.use(express.json());
let books = [
    {
        id: 1,
        title: "The Alchemist",
        author: "Paulo Coelho"
    },
    {
        id: 2,
        title: "1984",
        author: "George Orwell"
    }
];


app.get("/books", (req, res) => {
    res.json(books);
});


// Test route
app.get("/", (req, res) => {
    res.send("Book API is running!");
});
app.post("/books", (req, res) => {
    const { title, author } = req.body;

    const newBook = {
        id: books.length > 0 ? books[books.length - 1].id + 1 : 1,
        title: title,
        author: author
    };

    books.push(newBook);

    res.status(201).json(newBook);
});
app.put("/books/:id", (req, res) => {
    const id = parseInt(req.params.id);

    const book = books.find(book => book.id === id);

    if (!book) {
        return res.status(404).json({
            message: "Book not found"
        });
    }

    const { title, author } = req.body;

    book.title = title;
    book.author = author;

    res.json(book);
});
app.delete("/book/:id", (req, res) => {
    const id = parseInt(req.params.id);

    const bookIndex = books.findIndex(book => book.id === id);

    if (bookIndex === -1) {
        return res.status(404).json({
            message: "Book not found"
        });
    }

    const deletedBook = books.splice(bookIndex, 1);

    res.json({
        message: "Book deleted successfully",
        book: deletedBook[0]
    });
});


// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
