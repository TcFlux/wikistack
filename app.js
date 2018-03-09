const express = require('express')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const path = require('path')
const models = require('./models')
const app = express()

app.use(morgan('dev'))
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, 'public')))

// db.authenticate().then(() => {
//     console.log("Connected to database!");
// })

app.get('/', (req, res) => {
    res.send("Homepage!");
});

const PORT = 3000;


const init = async () => {
    await models.db.sync({force: true});

    app.listen(PORT, () => {
        console.log(`Listening at ${PORT}`)
    });
}

init();
