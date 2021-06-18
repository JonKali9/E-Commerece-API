const express = require('express');
const app = express();
const PORT = 4000;
const bodyParser = require('body-parser')
const mysql = require('mysql');


//Connect to DB
const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "password1234",
    database: "store"
});

db.connect((err) => {
    if (err) throw err;
    console.log("Connected!");
});

//Body Parsing
app.use(express.json());


//Login Request
app.post('/login', (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    try {
        db.query(`SELECT * FROM users`, (err, rows) => {
            let foundUser = false;
            rows.forEach(row => {
                if (row.username === username) {
                    foundUser = true;
                    if (row.password === password) {
                        db.query(`SELECT * FROM users WHERE username = "${username}";`, (err, rows) => {
                            return res.send({...rows[0]});
                        })
                    } else {
                        return res.sendStatus(404);
                    }
                }
            })
            if (!foundUser) return res.sendStatus(404);
        })
    } catch(err) {
        res.sendStatus(404);
    }
})

//Register Request
app.post('/register', (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    db.query('SELECT COUNT(*) FROM users', (err, rows) => {
        const id = rows[0]['COUNT(*)']+1;
        const query = `INSERT INTO users VALUES (${id}, "${username}", "${password}");`;
        db.query(query, (err, rows) => {
            if (err) {
                res.sendStatus(404);
            } else {
                console.log(`[+] Created User ${username}`);
                res.sendStatus(201);
            }
        })
    });
})

//Products CRUD
app.get('/products', (req, res) => {
    db.query('SELECT * FROM products;', (err, rows) => {
        const products = [];
        rows.forEach(row => {
            products.push(row);
        })
        return res.send(products);
    })
});
app.get('/products/:id', (req, res) => {
    db.query('SELECT * FROM products;', (err, rows) => {
        const products = [];
        rows.forEach(row => {
            products.push(row);
        })
        return res.send(products[req.params.id-1]);
    })
});
app.post('/products', (req, res) => {
    db.query('SELECT * FROM products;', (err, rows) => {
        const products = [];
        rows.forEach(row => {
            products.push(row);
        })
        const id = rows[rows.length-1].id+1;
        const query = `INSERT INTO products VALUES (${id}, "${req.body.description}", ${req.body.price})`;
        db.query(query);
        return res.sendStatus(201);
    })
});
app.delete('/products/:id', (req, res) => {
    db.query(`DELETE FROM products WHERE id=${req.params.id};`);
    return res.sendStatus(200);
});

//Orders CRUD
app.get('/orders', (req, res) => {
    db.query('SELECT * FROM orders;', (err, rows) => {
        const orders = [];
        rows.forEach(row => {
            orders.push(row);
        })
        return res.send(orders);
    })
});
app.get('/orders/:id', (req, res) => {
    db.query('SELECT * FROM orders;', (err, rows) => {
        const orders = [];
        rows.forEach(row => {
            orders.push(row);
        })
        return res.send(orders[req.params.id-1]);
    })
});
app.post('/orders', (req, res) => {
    db.query('SELECT * FROM orders;', (err, rows) => {
        const orders = [];
        rows.forEach(row => {
            orders.push(row);
        })
        const id = rows[rows.length-1].id+1;
        const query = `INSERT INTO orders VALUES (${id}, ${req.body.userId}, ${req.body.productId}, '2008-11-11')`;
        db.query(query);
        return res.sendStatus(201);
    })
});
app.delete('/orders/:id', (req, res) => {
    db.query(`DELETE FROM orders WHERE id=${req.params.id};`);
    return res.sendStatus(200);
});


//Start Server
app.listen(PORT, () => {
    console.log(`[+] Server started on Port ${PORT}.`)
});