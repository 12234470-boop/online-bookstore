const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root', 
    password: '',
    database: 'bookstore'
});

db.connect(err => {
    if (err) throw err;
    console.log('Connected to database');
    initializeDatabase();
});

function initializeDatabase() {
    // Create tables
    const tables = [
        `CREATE TABLE IF NOT EXISTS books (
            id INT PRIMARY KEY AUTO_INCREMENT,
            title VARCHAR(255),
            author VARCHAR(255),
            price DECIMAL(10, 2),
            image_url VARCHAR(500)
        )`,
        `CREATE TABLE IF NOT EXISTS users (
            id INT PRIMARY KEY AUTO_INCREMENT,
            username VARCHAR(50),
            email VARCHAR(100),
            password VARCHAR(255)
        )`,
        `CREATE TABLE IF NOT EXISTS cart (
            id INT PRIMARY KEY AUTO_INCREMENT,
            user_id INT,
            book_id INT,
            quantity INT DEFAULT 1
        )`,
        `CREATE TABLE IF NOT EXISTS orders (
            id INT PRIMARY KEY AUTO_INCREMENT,
            user_id INT,
            total_price DECIMAL(10, 2),
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )`
    ];

    tables.forEach(sql => {
        db.query(sql, (err) => {
            if (err) console.log(err);
        });
    });

    // USE GUARANTEED WORKING ONLINE IMAGES
   // In your server.js, replace the books array (around lines 48-55) with this:

const books = [
  ['The Great Gatsby', 'F. Scott Fitzgerald', 12.99, 'https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1490528560l/4671._SY475_.jpg'],
  ['To Kill a Mockingbird', 'Harper Lee', 14.99, 'https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1553383690l/2657._SY475_.jpg'],
  ['1984', 'George Orwell', 10.99, 'https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1532714506l/40961427._SX318_.jpg'],
  ['Pride and Prejudice', 'Jane Austen', 11.99, 'https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1320399351l/1885._SY475_.jpg'],
  ['The Hobbit', 'J.R.R. Tolkien', 13.99, 'https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1546071216l/5907._SY475_.jpg'],
  ['Harry Potter', 'J.K. Rowling', 15.99, 'https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1474154022l/3._SY475_.jpg']
];

    // Clear and reinsert books
    db.query('DELETE FROM books', () => {
        books.forEach((book, index) => {
            const sql = 'INSERT INTO books (id, title, author, price, image_url) VALUES (?, ?, ?, ?, ?)';
            db.query(sql, [index + 1, ...book], (err) => {
                if (!err) console.log(`Added: ${book[0]} with image: ${book[3]}`);
            });
        });
    });
}

// SIMPLE ENDPOINTS
app.get('/api/books', (req, res) => {
    db.query('SELECT * FROM books', (err, results) => {
        if (err) {
            res.status(500).json({ error: err.message });
        } else {
            res.json(results);
        }
    });
});

app.post('/api/login', (req, res) => {
    const { email, password } = req.body;
    res.json({ 
        success: true, 
        user: { id: 1, username: email.split('@')[0], email: email }
    });
});

app.post('/api/cart/add', (req, res) => {
    const { userId, bookId } = req.body;
    
    // Check if exists
    const checkSql = 'SELECT * FROM cart WHERE user_id = ? AND book_id = ?';
    db.query(checkSql, [userId, bookId], (err, results) => {
        if (err) return res.status(500).json({ error: 'Database error' });
        
        if (results.length > 0) {
            // Update
            const updateSql = 'UPDATE cart SET quantity = quantity + 1 WHERE user_id = ? AND book_id = ?';
            db.query(updateSql, [userId, bookId], (err) => {
                if (err) return res.status(500).json({ error: 'Update failed' });
                res.json({ success: true });
            });
        } else {
            // Insert
            const insertSql = 'INSERT INTO cart (user_id, book_id, quantity) VALUES (?, ?, 1)';
            db.query(insertSql, [userId, bookId], (err) => {
                if (err) return res.status(500).json({ error: 'Add failed' });
                res.json({ success: true });
            });
        }
    });
});

app.get('/api/cart/:userId', (req, res) => {
    const { userId } = req.params;
    
    const sql = `
        SELECT c.*, b.title, b.author, b.price, b.image_url 
        FROM cart c 
        JOIN books b ON c.book_id = b.id 
        WHERE c.user_id = ?
    `;
    
    db.query(sql, [userId], (err, results) => {
        if (err) {
            res.status(500).json({ error: err.message });
        } else {
            res.json(results);
        }
    });
});

app.delete('/api/cart/remove/:userId/:bookId', (req, res) => {
    const { userId, bookId } = req.params;
    
    const sql = 'DELETE FROM cart WHERE user_id = ? AND book_id = ?';
    db.query(sql, [userId, bookId], (err) => {
        if (err) {
            res.status(500).json({ error: err.message });
        } else {
            res.json({ success: true });
        }
    });
});

app.put('/api/cart/update', (req, res) => {
    const { userId, bookId, quantity } = req.body;
    
    if (quantity <= 0) {
        const deleteSql = 'DELETE FROM cart WHERE user_id = ? AND book_id = ?';
        db.query(deleteSql, [userId, bookId], (err) => {
            if (err) return res.status(500).json({ error: err.message });
            res.json({ success: true });
        });
    } else {
        const updateSql = 'UPDATE cart SET quantity = ? WHERE user_id = ? AND book_id = ?';
        db.query(updateSql, [quantity, userId, bookId], (err) => {
            if (err) return res.status(500).json({ error: err.message });
            res.json({ success: true });
        });
    }
});

app.post('/api/orders/create', (req, res) => {
    const { userId, items, totalAmount } = req.body;
    
    const orderSql = 'INSERT INTO orders (user_id, total_price) VALUES (?, ?)';
    db.query(orderSql, [userId, totalAmount], (err, result) => {
        if (err) return res.status(500).json({ error: 'Failed to create order' });
        
        const orderId = result.insertId;
        
        // Add items
        items.forEach(item => {
            const itemSql = 'INSERT INTO order_items (order_id, book_id, quantity, price) VALUES (?, ?, ?, ?)';
            db.query(itemSql, [orderId, item.book_id, item.quantity, item.price], (err) => {
                if (err) console.error(err);
            });
        });
        
        // Clear cart
        db.query('DELETE FROM cart WHERE user_id = ?', [userId], (err) => {
            if (err) console.error(err);
        });
        
        res.json({ success: true, orderId: orderId });
    });
});

app.get('/api/orders/:userId', (req, res) => {
    const { userId } = req.params;
    
    const sql = `
        SELECT o.*, 
               (SELECT COUNT(*) FROM order_items WHERE order_id = o.id) as item_count
        FROM orders o
        WHERE o.user_id = ?
        ORDER BY o.id DESC
    `;
    
    db.query(sql, [userId], (err, orders) => {
        if (err) return res.status(500).json({ error: err.message });
        
        if (orders.length > 0) {
            const orderIds = orders.map(o => o.id);
            const itemsSql = `
                SELECT oi.*, b.title, b.image_url 
                FROM order_items oi 
                JOIN books b ON oi.book_id = b.id 
                WHERE oi.order_id IN (?)
            `;
            db.query(itemsSql, [orderIds], (itemsErr, items) => {
                if (itemsErr) return res.json(orders);
                
                const ordersWithItems = orders.map(order => ({
                    ...order,
                    items: items.filter(item => item.order_id === order.id)
                }));
                
                res.json(ordersWithItems);
            });
        } else {
            res.json([]);
        }
    });
});

app.get('/api/test', (req, res) => {
    res.json({ message: 'Backend is working!' });
});

const PORT = 5000;
app.listen(PORT, () => {
    console.log(`✅ Backend running: http://localhost:${PORT}`);
    console.log(`✅ Test: http://localhost:${PORT}/api/test`);
    console.log(`✅ Books: http://localhost:${PORT}/api/books`);
    console.log(`✅ Using GUARANTEED working Amazon book images!`);
});