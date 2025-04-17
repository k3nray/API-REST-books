const express = require("express"); // importar express
const app = express(); // crear el servidor --> Objeto de la clase express
const port = process.env.PORT || 3000; // puerto donde se ejecuta el servidor

const fs = require('fs');
const path = require('path');

// Cargar el archivo JSON
const books = JSON.parse(fs.readFileSync(path.join(__dirname, 'data', 'books.json'), 'utf8'));
console.log(`Libros cargados: ${books.length}`);


// Endpoint para acceder a los libros
app.get('/books', (req, res) => {
  res.status(200).json(books);
});

// Iniciar servidor
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
//Crea una ruta /all para obtener todos los libros
// GET http://localhost:3000/all
app.get('/all', (req, res) => {
  res.status(200).json(books);
});
//Crea una ruta /firstpara obtener el primer libro
// GET http://localhost:3000/first
app.get('/first', (req, res) => {
  if (books.length > 0) {
    res.status(200).json(books[0]);
  } else {
    res.status(404).json({});
  }
});
//Crea una ruta /lastpara obtener el último libro
// GET http://localhost:3000/last
app.get('/last', (req, res) => {
  if (books.length > 0) {
    res.status(200).json(books[books.length - 1]);
  } else {
    res.status(404).json({});
  }
});

//Crea una ruta /middle para obtener el libro en la mitad (número 50 en el array)
// GET http://localhost:3000/middle
app.get('/middle', (req, res) => {
  if (books.length > 0) {
    const middle = Math.floor(books.length / 2);
    const mitad= books[middle]
    res.status(200).json(mitad);
  } else {
    res.status(404).json({ mensaje: 'No hay libros cargados' });
  }
});
//Crea una ruta /author/dante-alighieripara obtener SÓLO EL TÍTULO del libro deDante Alighieri
// GET http://localhost:3000/author/dante-alighieri  
app.get('/author/dante-alighieri', (req, res) => {
  const libro = books.find(book => book.author.toLowerCase() === 'dante alighieri');
  
  if (libro) {
    res.status(200).json(libro.title);
  } else {
    res.status(404).json({ msj: 'No se encontró un libro de Dante Alighieri' });
  }
});


//Crea una ruta /country/charles-dickens para obtener SÓLO EL PAÍS del libro deCharles Dickens
// GET http://localhost:3000/author-country/charles-dickens
app.get('/author-country/charles-dickens', (req, res) => {
  const libro = books.find(book => book.author.toLowerCase() === 'charles dickens');
  if (libro) {
    res.status(200).json(libro.country); // solo el string
  } else {
    res.status(404).json({});
  }
});

//Crea una ruta /year&pages/cervantespara obtener LAS PÁGINAS Y EL AÑO del libro de Miguel de Cervantes, Ejemplo de respuesta:{ pages: ..., year: ... }
//GET http://localhost:3000/year-pages/cervantes
app.get('/year-pages/cervantes', (req, res) => {
  const libro = books.find(book => book.title.toLowerCase() === 'don quijote de la mancha');
  if (libro) {
    res.status(200).json({
      pages: libro.pages,
      year: libro.year
    });
  } else {
    res.status(404).json({});
  }
});  

//Crea una ruta /country/count/spainpara obtener EL NÚMERO DE LIBROS deEspaña

//GET http://localhost:3000/country/count/spain
  app.get('/country/count/spain', (req, res) => {
  const libros = books.filter(book => book.country.toLowerCase()==='spain');

  if (libros.length > 0) {
    res.status(200).json(libros.length);
  } else {
    res.status(404).json({ msj: 'No se encontraron libros de españa' });
  }
});

//Crea una ruta /country/at-least/germanypara obtener VERDADERO O FALSO dependiendo de si hay o no un libro deAlemania
//GET http://localhost:3000/country/at-least/germany
  app.get('/country/at-least/germany', (req, res) => {
  const librosDeAlemania = books.some(book => 
    book.country && book.country.toLowerCase() === 'germany'
  );

  res.status(200).json(true);
});

//Crea una ruta /pages/all-greater/200para obtener VERDADERO O FALSO dependiendo de si todos los libros tienen más de 200páginas.
//GET http://localhost:3000/pages/all-greater/200
app.get('/pages/all-greater/200', (req, res) => {
  const masDe200 = books.every(book => book.pages > 200);

  res.status(200).json(masDe200);
});