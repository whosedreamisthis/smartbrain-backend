const express = require('express');
const bcrypt = require('bcryptjs');
const cors = require('cors');
const knex = require ('knex');

const { sumBy } = require('lodash');
const Clarifai = require( 'clarifai');

const register = require('./controllers/register');
const profile = require('./controllers/profile');
const signin = require('./controllers/signin');
const image = require('./controllers/image');

const { preProcessFile } = require('typescript');
//import dotenv from  'dotenv';y
  const appClarifai = new Clarifai.App({
    apiKey: '6db181cd35e74f609d3956b56cb11f6f'
   });
/**
 * @type {Knex}
 */
 const db = knex({
    client: 'pg',
    connection: {
      host : '127.0.0.1',
      user : 'postgres',
      password : 'test',
      database : 'smart-brain'
    }
  });
db.select('*').from('users').then(data => {
    //console.log(data);
})

const app = express();
app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use(cors());

app.get('/',(req,res) => {
   // res.send(db(.users));
})

app.post('/signin', signin.handleSignin(db,bcrypt));

app.post('/register', register.handleRegister(db,bcrypt));

app.get('/profile/:id', profile.handleProfileGet(db));

app.put('/image',image.handleImage(db));



app.listen(3000, ()=>{
    console.log('app is running on port 3000');
});

/*
/ ---> res this is working
/signin  --> POST res success/fail
/register --> POST = user
/profile/:userId --> GET = user
/image --> PUT --> user 
*/ 