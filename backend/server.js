const express = require('express')
const mysql = require('mysql')
const cors = require('cors')
const jwt = require('jsonwebtoken')
const cookieParser = require('cookie-parser')
const bcrypt = require('bcrypt')
const salt = 10;
const SECRET_KEY = 'your_secret_key';
const app = express()
app.use(express.json())
app.use(cors())
app.use(cookieParser())


const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "krw"
})

app.get('/', (req, res) => {
    return res.json("Server side")
})

app.get('/users', (req, res) => {
    const sql = 'SELECT * FROM register'
    db.query(sql, (err, data) => {
        return res.json(data)
    })
})

app.post('/register', (req, res) => {
    const emailExists = "SELECT * FROM register WHERE email = ?";
    const sql = "INSERT INTO register (`email`, `password`) VALUES (?)";
    db.query(emailExists, [req.body.email], (err, result) => {
        if (err) return res.status(500).json({ Error: "Error in checking email" });
        if (result.length > 0) return res.status(409).json({ Error: "Email already exists" });
        bcrypt.hash(req.body.password.toString(), salt, (err, hash) => {
            if (err) return res.status(500).json({ Error: "Error hashing password" });
            const values = [req.body.email, hash]
            db.query(sql, [values], (err, result) => {
                if (err) return res.status(500).json({ Error: "Error inserting the data" });
                return res.status(201).json({ Status: "Success" });
            })
        })
    })
})


// *******************
app.post('/login', (req, res) => {
    const sql = "SELECT * FROM register WHERE email = ?"
    db.query(sql, [req.body.email], (err, data) => {
        if (err) return res.json({ Error: "Login error from Server" })
        console.log({ err: "Login error from Server" })
        if (data.length > 0) {
            bcrypt.compare(req.body.password.toString(), data[0].password, (err, isMatch) => {
                if (err) return res.json({ Error: "Password compare error" })
                if (isMatch) {

                    return res.json({ Status: "Login Success" })
                }
                else { return res.json({ Error: "Password did not match" }) }
            })
        }
        else {
            return res.json({ Error: "This email does not exists" })
        }
    })
})


// ********* Middleware to verify token ******
function authenticateToken(req, res, next) {
    const token = req.headers['authorization']?.split(' ')[1];
    if (!token) return res.sendStatus(401);

    jwt.verify(token, SECRET_KEY, (err, user) => {
        if (err) return res.sendStatus(500)
        req.user = user;
        next()
    })
}

app.listen(8000, () => {
    console.log("Listening")
})