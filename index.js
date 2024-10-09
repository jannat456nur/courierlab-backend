// Importing necessary modules
const express = require('express')
const mysql = require('mysql')
const bodyParser = require('body-parser')
const cors = require('cors')

// Creating an Express application
const app = express()

// Middleware
app.use(cors()) // Enable CORS
app.use(bodyParser.json()) // Parse JSON bodies

// Database connection
const conn = mysql.createConnection({
  host: '127.0.0.1', // Changed from 'localhost' for compatibility
  user: 'root', // MySQL user
  password: '', // MySQL password
  database: 'courierlab', // Database name
})

// Connect to the database
conn.connect(function (err) {
  if (err) {
    console.error('Error connecting to the database:', err)
    return // Stop if there is an error
  }
  console.log('Database is connected successfully!')
})

// Simple GET route for testing
// app.get('/name', (req, res) => {
//   res.send('Hello World!');
// });

// POST route for user registration
app.post('/api/user-registration', (req, res) => {
  const sql =
    'INSERT INTO users (`companyName`, `name`, `address`, `district`, `area`, `contactNumber`, `email`, `password`) VALUES (?, ?, ?, ?, ?, ?, ?, ?)'
  console.log('Request body:', req.body)
  const values = [
    req.body.companyName,
    req.body.name,
    req.body.address,
    req.body.district,
    req.body.area,
    req.body.contactNumber,
    req.body.email,
    req.body.password,
  ]

  console.log('SQL:', sql)
  console.log('Values:', values)

  conn.query(sql, values, (err, data) => {
    if (err) {
      console.error('Error executing query:', err.sqlMessage) // More detailed error message
      return res
        .status(500)
        .json({ error: 'Error registering user', details: err })
    }
    return res
      .status(201)
      .json({ message: 'User registered successfully', data })
  })
})

app.get('/', (req, res) => {
  res.send('Hello World!')
})

// Start the server
app.listen(3000, () => {
  console.log('Server is running on port 3000')
})
