const express = require('express');
const bcrypt = require('bcryptjs');
const cors = require('cors');
const knex = require ('knex');
 
   
require('dotenv').config();
const register = require('./controllers/register');
const profile = require('./controllers/profile');
const signin = require('./controllers/signin');
const image = require('./controllers/image');


//const dotenv = require('dotenv');



  
/**
 * @type {Knex}
 */
 const db = knex({
    client: 'pg',
    connection: {
      host : 'postgresql-pointy-32515',
      user : 'postgres',
      password : 'test',
      database : 'smart-brain'
    }
  });
// db.select('*').from('users').then(data => {
//     //console.log(data);
// })

const app = express();
app.use(cors());
app.use(express.urlencoded({extended: false}));
app.use(express.json());


app.get('/',(req,res) => {
    res.send("It's working");
})

app.post('/signin', signin.handleSignin(db,bcrypt));

app.post('/register', register.handleRegister(db,bcrypt));

app.get('/profile/:id', profile.handleProfileGet(db));

app.put('/image',image.handleImage(db));
app.post('/imageurl',(req,res)=>{image.handleAPICall(req,res)});


app.listen(process.env.PORT || 3000, ()=>{
    console.log(`app is running on port ${process.env.PORT}`);
});

console.log(process.env.CLARIFAI_API_KEY);

/*
/ ---> res this is working
/signin  --> POST res success/fail
/register --> POST = user
/profile/:userId --> GET = user
/image --> PUT --> user 
*/ 