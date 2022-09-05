const express = require('express');
const routes = require('./routes/routes');
const handlebars = require('express-handlebars');
const path = require('path');
const bodyParser = require('body-parser');

require('./database');

const app = express();

app.engine('handlebars', handlebars.engine({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')
app.set('views', path.join(__dirname, 'views'))
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(routes);

// notFound
app.use((req, res, next) => {
    const error = new Error('not found');
    error.status = 404;
    next(error);
})

// catch all
app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({ error: error.message });
})

app.listen(3333);