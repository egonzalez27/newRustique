const express = require('express');
const exphbs = require('express-handlebars');
const fs = require('fs');
const path = require('path');
const itemsData = require('./itemsData');
const title = require('process');

const app = express();

// Configuración de Express y Handlebars
app.engine('.hbs', exphbs({
  defaultLayout: 'main',
  extname: '.hbs',
  layoutsDir: path.join(__dirname, 'views/layouts'),
  partialsDir: path.join(__dirname, 'views/partials')
}));
app.set('view engine', '.hbs');
app.set('views', path.join(__dirname, 'views'));

// Rutas
app.get('/', (req, res) => {
  const itemPath = path.join(__dirname, 'views/index.hbs');

  fs.readFile(itemPath, 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      res.sendStatus(500);
    } else {
      res.render('index', { itemContent: data, showHeader:false });
    }
  });
});

app.get('/items/:id', (req, res) => {
  const itemId = req.params.id;
  const itemPath = path.join(__dirname, `views/partials/item${itemId}.hbs`);

  fs.readFile(itemPath, 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      res.sendStatus(500);
    } else {
      res.render('item', { item: itemsData[itemId - 1], itemContent: data });
    }
  });
});

app.use(express.static(path.join(__dirname, 'public')));



// Iniciar el servidor
const port = 3000;
app.listen(port, () => {
  console.log(`Servidor iniciado en http://localhost:${port}`);
});

