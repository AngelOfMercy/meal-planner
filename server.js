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


//-----------------------------------------------------
//API
//-----------------------------------------------------
app.post('/api/recipe', Recipe.create);
app.get('/api/recipe', Recipe.getAll);
app.get('/api/recipe/:id', Recipe.getOne);
app.put('/api/recipe/:id', Recipe.update);
app.delete('/api/recipe/:id', Recipe.delete);
//app.get('/api/recipe/ingredients/list', Recipe.getShoppingList);
app.get('/api/recipe/:id/ingredients/', Recipe.getIngredients);

//-----------------------------------------------------
//Web Page
//-----------------------------------------------------

app.get('*', (req, res) => {
	res.sendFile(path.join(__dirname + '/client/build/index.html'));
})

//-----------------------------------------------------

const port = process.env.PORT || 5000

app.listen(port);

console.log('App running on port ', port);