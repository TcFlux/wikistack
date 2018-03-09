const express = require('express')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const path = require('path')
const models = require('./models')
const main = require('./views/main')
const index = require('./views/index')
const app = express()

const wikiRouter = require('./routes/wiki')
const userRouter = require('./routes/user')

app.use(morgan('dev'))
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, 'public')))
app.use('/wiki', wikiRouter);

app.get('/', async (req, res) => {
    const pages = await models.Page.findAll();
    console.log(pages);
    res.send(main(pages));
});

const PORT = 3000;


const init = async () => {
    await models.db.sync();

    app.listen(PORT, () => {
        console.log(`Listening at ${PORT}`)
    });
}

init();
