const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const http = require('http')
const cors = require('cors')
const path = require('path');

require('dotenv').config()
// body parser
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use(cors({
    origin: '*',
  }));


const publicDirectoryPath = path.join(__dirname, 'public');
app.use(express.static(publicDirectoryPath));

require('./routes/images')(app)

let server = http.createServer(app);

const port = process.env.PORT
server.listen(port, () => {
    console.log(`server listening on port ${port}`)
})
