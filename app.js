const express = require('express')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const path = require('path')
const models = require('./models')
const app = express()

const wikiRouter = require('./routes/wiki')
const userRouter = require('./routes/user')

app.use(morgan('dev'))
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, 'public')))
app.use('/wiki', wikiRouter);

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
