//server.js

import express from 'express';
import dotenv from 'dotenv';
import 'babel-polyfill';

const path = require('path');

import Recipe from './src/controller/Recipe';
//import Recipe from './src/controllers/Recipe';

const app = express();


//dotenv.config();

app.use(express.json());

app.use(express.static(path.join(__dirname, 'client/build')));


// app.get('*', (req, res) => {
// 	res.sendFile(path.join(__dirname+'/client/public/index.html'));
// })

app.post('/recipe', Recipe.create);
app.get('/recipe', Recipe.getAll);
app.get('recipe/:id', Recipe.getOne);
app.put('/recipe/:id', Recipe.update);
app.delete('/recipe/:id', Recipe.delete);

app.get('*', (req, res) => {
	console.log('Fallback request');
	res.sendFile(path.join(__dirname + '/client/build/index.html'));
})

//-----------------------------------------------------------

const port = process.env.PORT || 5000

app.listen(port);

console.log('App running on port ', port);