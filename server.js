const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(bodyParser.json());
app.use(cors());

app.get('/', (req, res)=> {
    res.json(database.users);
})

//Sign In project
// 1) pretend we have a database that store user that have registered before

const database = {
    users: [
        {
            id: '123',
            name: 'shaolin',
            email: 'shaolin@gmail.com',
            password: 'banana',
            entries: 0,
            joined: new Date()
        },
        {
            id: '124',
            name: 'jinfa',
            email: 'jinfa@gmail.com',
            password: 'guava',
            entries: 0,
            joined: new Date()
        }
    ]
}

// 2) write signin post, under the conditio of shaolin is signing in through POSTMAN signin-post-body-raw-json
// 3) write a condition to check if the user is using right information to sign in, and give the right response
// *** in order for the server to read req.body, remember to include body-parser in line 2 and line 5
app.post('/signin', (req, res)=> {
    if(req.body.email === database.users[0].email &&
        req.body.password === database.users[0].password) {
            res.json(database.users[0]);
        }else {
            res.status(400).json('error logging in')
        }
})

// Register Project
// 1) pretend there is a new user called "rich" is joining in through POSTMAN register-post-body-raw-json
// 2) we will wirte the responsive register post code to add new users into the database using push property of array
// 3) and we will response the last user that just created
app.post('/register', (req, res)=> {
    const { name, email, password } = req.body;
    database.users.push({
        id: '126',
        name: name,
        email: email,
        entries: 0,
        joined: new Date()    
    })
    res.json(database.users[database.users.length -1]);
})


// Profile Project, the goal is to check if we have the same user in the database by user id
// forEach won't stop looping after a return, we use let found = false to achive our goal
app.get('/profile/:id', (req, res)=> {
    const { id } = req.params;
    let found = false;
    database.users.forEach((user)=> {
        if( user.id === id){
            found = true;
            return res.json(user);
        }
    })
    if(!found){
        res.status(400).json('not found');
    }
})

// Image Project, this process is as same as Profile project, expect it detect id from req.body, and entries will + 1 everytime the id matches
app.put('/image', (req, res)=> {
    const { id } = req.body;
    let found = false;
    database.users.forEach((user)=> {
        if(user.id === id){
            found = true;
            user.entries++
            return res.json(user.entries)
        }
    })
    if(!found){
        res.status(400).json('not found');
    }
})



//1. when the basic has written, we need to design API, layout what kind of url and which res and req they need
//2. API design
// url: / (homepage) -- GET --- this is working
// url: /signin --- POST(insert) --- success/fail
// url: /register --- POST(insert) --- user information
// url: /profile/:userID (everyone has their own homepage distingushed by their unique userID) --- GET(we just need to know who he/she is) --- user information 
// url: /image (where people can submit their image) --- PUT(need to update the rank of each user) --- updated user rank information





app.listen(3000, ()=> {
    console.log('app is running on port 3000');
});
//this is always at the end