const express = require('express')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const path = require('path')

const app = express()

app.use(morgan('dev'))
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, 'public')))

app.get('/', (req, res) => {
    res.send("Homepage!");
});

const PORT = 3000;

app.listen(PORT, () => {
    console.log(`Listening at ${PORT}`)
});