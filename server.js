const express = require('express');
const bcrypt = require('bcryptjs');
const cors = require('cors');
const app = express();
app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use(cors())
const database = {
    users: [
        {
            id: '123',
            name: 'John',
            password: "cookies",
            email:'john@gmail.com',
            entries: 0,
            joined: new Date()
        },
        {
            id: '124',
            name: 'Sally',
            email:'sally@gmail.com',
            password: "bananas",

            entries: 0,
            joined: new Date()
        }
    ],
    login: [
        {
            id:'987',
            hash:'',
            email: 'john@gmail.com'
        }
    ]
}
app.get('/',(req,res) => {
    res.send(database.users);
})

app.post('/signin',(req,res) => {
    bcrypt.compare("balls", "2a$10$eaIiogeEJi2DAqMXlybo5OROWfBUiHwbDJY\Rjqss7Yl\b5QSOSvC", function(err, res) {
        console.log("balls",res);
    });
     
    // As of bcryptjs 2.4.0, compare returns a promise if callback is omitted:
    bcrypt.compare("not_balls", "2a$10$eaIiogeEJi2DAqMXlybo5OROWfBUiHwbDJY\Rjqss7Yl\b5QSOSvC").then((res) => {
        console.log("not_balls",res);
    });
    if (req.body.email === database.users[0].email &&
         req.body.password === database.users[0].password) {
             res.json('success');
         }
         else {
             res.status(400).json("Error logging in.");
         }
});

app.post('/register',(req,res) => {
    const {email,name,password} = req.body;

    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);
    console.log(hash)


    database.users.push ( {id: '125',
    name: name,
    email:email,
    entries: 0,
    joined: new Date()});
    res.json(database.users[database.users.length - 1])
});

app.get('/profile/:id', (req,res) => {
    const {id} = req.params;

    let found = false;
    database.users.forEach(user => {
        if (user.id === id) {
            found = true;
            return res.json(user);
        }
    });
    if (!found) {
        res.status(400).json("not found");
    }

    return 

});

app.put('/image', (req,res) => {
    const {id} = req.body;

    let found = false;
    database.users.forEach(user => {
        if (user.id === id) {
            found = true;
            user.entries++;
            return res.json(user.entries);
        }
    });
    if (!found) {
        res.status(400).json("not found");
    }
});



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