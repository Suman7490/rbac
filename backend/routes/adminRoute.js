import express from "express"
import con from '../utils/db.js'
import jwt from "jsonwebtoken"
import bcrypt from 'bcrypt'
import multer from 'multer'
import path from 'path'

const router = express.Router()



router.post('/adminlogin', (req, res) => {
    const sql = "SELECT * FROM admin WHERE email = ? AND password = ?"
    con.query(sql, [req.body.email, req.body.password], (err, result) => {
        if (err) return res.json({ LoginStatus: false, Error: "Query Error" })
        if (result.length > 0) {
            const email = result[0].email;
            const token = jwt.sign(
                { role: "Admin", email: email },
                "JWT_secret_key",
                { expiresIn: '1d' }
            );
            console.log("Generated Token:", token);
            res.cookie('token', token, { httpOnly: true, sameSite: 'Lax' })
            return res.json({ LoginStatus: true });
        } else {
            return res.json({ LoginStatus: false, Error: "Wrong Email or Password" })
        }

    })
})


router.post('/', async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({ LoginStatus: false, Error: "Email and Password are required" });
    }
    try {
        const sql = "SELECT * FROM employee WHERE email = ?";
        con.query(sql, [email], async (err, result) => {
            if (err) {
                return res.status(500).json({ LoginStatus: false, Error: "Query Error" });
            }
            console.log("Query Result:", result);
            if (result.length === 0) {
                return res.status(401).json({ LoginStatus: false, Error: "Wrong Email or Password" });
            }

            const user = result[0];
            console.log("User Role:", user.role)
            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) {
                return res.status(401).json({ LoginStatus: false, Error: "Wrong Email or Password" });
            }
            const role = user.role;
            const id = user.id;
            const category = user.category;
            const token = jwt.sign({ id, role, email, category }, "JWT_secret_key", { expiresIn: '1d' });
            res.cookie('token', token, { httpOnly: true, sameSite: 'Lax', secure: process.env.NODE_ENV === 'production' });
            if (role === 'Admin') {
                return res.json({
                    LoginStatus: true,
                    Redirect: '/dashboard',
                    UserData: { email, role },
                });
            } 
            else if (role === 'Team Head') {
                return res.json({
                    LoginStatus: true,
                    Redirect: '/teamHeadDashboard',
                    UserData: { email, role },
                });
            }
            else if (role === 'Executive') {
                return res.json({
                    LoginStatus: true,
                    Redirect: '/empdashboard',
                    UserData: { email, role },
                });
            } else {
                return res.status(403).json({ LoginStatus: false, Error: "Unknown Role" });
            }
        });
    } catch (error) {
        res.status(500).json({ LoginStatus: false, Error: "Server Error" });
    }
});


router.get('/verifytoken', (req, res) => {
    const token = req.cookies.token;

    if (!token) {
        return res.status(403).json({ message: 'Token missing' });
    }
    try {
        const decoded = jwt.verify(token, 'JWT_secret_key');
        console.log('Decoded Token of verifytoken:', decoded);
        res.status(200).json({ isAuthenticated: true, role: decoded.role });
    } catch (err) {
        console.error('Token verification failed:', err);
        res.status(403).json({ message: 'Invalid Token.', });
    }
});

// ********* Fetch data of legged in user *********************
router.get('/profile', (req, res) => {
    const token = req.cookies.token;   
    if (!token) return res.status(401).json({ success: false, error: 'Unauthorized' });

    jwt.verify(token, 'JWT_secret_key', (err, decoded) => {
        if(err) return res.status(401).json({success: false, error: "Unauthorized"});
        console.log("Decoded Token of profile: ", decoded);
        
        const sql = 'SELECT * FROM employee WHERE id = ?'  
        con.query(sql, [decoded.id], (err, result) => {
            if(err) return res.status(500).json({success: false, error: 'Server Error'})
            if(result.length === 0) return res.status(404).json({success: false, error: 'User not found'})
            res.json({success: true, data: result[0]})
        
        })
    })
})

router.post('/add_category', (req, res) => {
    const sql = 'INSERT INTO category (`name`) VALUES (?)'
    con.query(sql, [req.body.category], (err, result) => {
        if (err) return res.json({ Status: false, Error: "Query Error" })
        return res.json({ Status: true })
    })
})

router.post('/add_role', (req, res) => {
    const sql = 'INSERT INTO roles (`role`) VALUES (?)'
    con.query(sql, [req.body.role], (err, result) => {
        if (err) return res.json({ Status: false, Error: "Query Error" })
        return res.json({ Status: true })
    })
})

router.get('/category', (req, res) => {
    const sql = 'SELECT * FROM category'
    con.query(sql, (err, result) => {
        if (err) return res.json({ Status: false, Error: "Query Error" })
        return res.json({ Status: true, Result: result })
    })
})

router.get('/roles', (req, res) => {
    const sql = 'SELECT * FROM roles'
    con.query(sql, (err, result) => {
        if (err) return res.json({ Status: false, Error: "Query Error" })
        return res.json({ Status: true, Result: result })
    })
})
// ******** Image Upload **********
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'Public/Images')
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + "_" + Date.now() + path.extname(file.originalname))
    }
})

const upload = multer({
    storage: storage
})
// ******** End Image Upload **********

router.post('/add_employee', upload.single('photo'), (req, res) => {
    const sql = 'INSERT INTO employee (`name`, `role`, `email`, `password`, `category`, `salary`, `address`, `photo`, `status`) VALUES (?)'
    bcrypt.hash(req.body.password, 10, (err, hash) => {
        if (err) return res.json({ Status: false, Error: "Query Error" })
        const values = [
            req.body.name,
            req.body.role,
            req.body.email,
            hash,
            req.body.category,
            req.body.salary,
            req.body.address,
            req.file.filename,
            req.body.status
        ]
        con.query(sql, [values], (err, result) => {
            if (err) return res.json({ Status: false, Error: "Query Error" })
            return res.json({ Status: true, Result: result })
        })
    })
})

router.get('/employee', (req, res) => {
    const sql = 'SELECT * FROM employee'
    con.query(sql, (err, result) => {
        if (err) return res.json({ Status: false, Error: "Query Error" })
        return res.json({ Status: true, Result: result })
    })
})

// router.get('/teamHeadDashboard', (req, res) => {
//     const sql = "SELECT * FROM employee WHERE role = 'Executive' AND category = 'Engineering'";
//     con.query(sql, (err, result) => {
//         if (err) return res.json({ Status: false, Error: "Query Error" })
//         return res.json({ Status: true, Result: result })
//     })
// })


router.get('/teamHeadDashboard', (req, res) => {
    const token = req.cookies.token;

    jwt.verify(token, 'JWT_secret_key', (err, decoded) => {
        if (err) {
            return res.status(401).json({ Status: false, Error: "Unauthorized" });
        }
        console.log("Decoded Token of teamHeadDashboard: ", decoded);

        const userCategory = decoded.category; 

        if (!userCategory) {
            return res.status(400).json({ Status: false, Error: "User category not found in token" });
        }

        const sql = "SELECT * FROM employee WHERE role = 'Executive' AND category = ?"; 
        con.query(sql, [userCategory], (err, result) => {
            if (err) {
                return res.status(500).json({ Status: false, Error: "Query Error" });
            }

            if (result.length === 0) {
                return res.status(404).json({ Status: false, Error: 'No executives found in this category' });
            }

            res.json({ Status: true, Result: result });
        });
    });
});



router.get('/employee/:id', (req, res) => {
    const id = req.params.id;
    const sql = 'SELECT * FROM employee WHERE id = ?'
    con.query(sql, [id], (err, result) => {
        if (err) return res.json({ Status: false, Error: "Query Error" })
        return res.json({ Status: true, Result: result })
    })
})

router.put('/edit_employee/:id', (req, res) => {
    const id = req.params.id;
    const sql = `UPDATE employee 
    set name= ?, role= ?, email= ?, category= ?, salary= ?, address= ?, status= ?
    WHERE id = ?`
    const values = [
        req.body.name,
        req.body.role,
        req.body.email,
        req.body.category,
        req.body.salary,
        req.body.address,
        req.body.status
    ]
    con.query(sql, [...values, id], (err, result) => {
        if (err) {
            console.error("SQL Error:", err); 
            return res.json({ Status: false, Error: err.message })
        } 
        return res.json({ Status: true, Result: result })
    })
})

router.delete('/delete_employee/:id', (req, res) => {
    const id = req.params.id;
    const sql = 'DELETE FROM employee WHERE id = ?'
    con.query(sql, [id], (err, result) => {
        if (err) return res.json({ Status: false, Error: "Query Error" })
        return res.json({ Status: true, Result: result })
    })
})

router.get('/admin_count', (req, res) => {
    const sql = 'SELECT count(id) as admin FROM admin'
    con.query(sql, (err, result) => {
        if (err) return res.json({ Status: false, Error: "Query Error" })
        return res.json({ Status: true, Result: result })
    })
})

router.get('/employee_count', (req, res) => {
    const sql = 'SELECT count(id) as employee FROM employee'
    con.query(sql, (err, result) => {
        if (err) return res.json({ Status: false, Error: "Query Error" })
        return res.json({ Status: true, Result: result })
    })
})

router.get('/salary_count', (req, res) => {
    const sql = 'SELECT sum(salary) as salary FROM employee'
    con.query(sql, (err, result) => {
        if (err) return res.json({ Status: false, Error: "Query Error" })
        return res.json({ Status: true, Result: result })
    })
})

router.get('/admin_records', (req, res) => {
    const sql = 'SELECT * FROM admin'
    con.query(sql, (err, result) => {
        if (err) return res.json({ Status: false, Error: "Query Error" })
        return res.json({ Status: true, Result: result })
    })
})



router.get('/logout', (req, res) => {
    res.clearCookie('token')
    return res.json({ Status: true })
})

export { router as adminRouter }