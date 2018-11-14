const express = require('express');
const bodyparser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');


const app = express();

app.use(bodyparser.json());
app.use(cors());

database = {
  users: [
    {
      id: '123',
      name: 'john',
      email: 'john@email.com',
      password: 'cookies',
      entries: 0,
      joined: new Date()
    },
    {
      id: '124',
      name: 'sally',
      email: 'sally@email.com',
      password: 'apple',
      entries: 0,
      joined: new Date()
    },
  ]
}

app.get('/',(req, res) => {
  res.json(database.users);
})

app.post('/signin', (req, res) => {
  if( req.body.email === database.users[0].email
      && req.body.password === database.users[0].password){
        //res.json('success');
        res.json(database.users[0]);

      }else{
        res.status(400).json('login fail');
      }
})

app.post('/register', (req, res) => {
  const { user, name, email, password } = req.body;
  database.users.push({
        id: '125',
        name: name,
        email: email,
        entries: 0,
        joined: new Date()
  })
  res.json(database.users[database.users.length-1]);
})

app.get('/profile/:id', (req, res) => {
  const {id} = req.params;
  let found = false;
  database.users.forEach( user => {
    found = true;
    if(user.id === id){
      return res.json(user);
    }else{
      return res.status(404).json('user not found');
    }
  })
  // if(!found){
  //    res.status(404).json('user not found');
  // }
})

app.put('/image', (req,res) => {
      const {id} = req.body;
      let found = false;
      database.users.forEach( user => {
        found = true;
        if(user.id === id){
          user.entries++;
          return res.json(user.entries);
        }
      })
      if(found){
         res.status(404).json('user not found');
      }
})


app.listen(5000, () =>{
  console.log('app is listening at port 5000');
})
