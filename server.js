//server.js

const express = require('express');
const path = require('path');
require('babel-polyfill');
const Recipe = require('./src/controller/Recipe');

if(!process.env.PRODUCTION){
	const dotenv = require('dotenv');
	dotenv.config();
}

const app = express();

app.use(express.json());

app.use(express.static(path.join(__dirname, 'client/build')));

app.post('/recipe', Recipe.create);
app.get('/recipe', Recipe.getAll);
app.get('/recipe/:id', Recipe.getOne);
app.put('/recipe/:id', Recipe.update);
app.delete('/recipe/:id', Recipe.delete);
app.get('/recipe/ingredients/list', Recipe.getShoppingList);
app.get('/recipe/ingredients/:id', Recipe.getIngredients);


app.get('*', (req, res) => {
	res.sendFile(path.join(__dirname + '/client/build/index.html'));
})

//-----------------------------------------------------------

const port = process.env.PORT || 5000

app.listen(port);

console.log('App running on port ', port);