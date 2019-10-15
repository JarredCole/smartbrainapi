const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');

const register = require('./controllers/register');
const signin = require('./controllers/signin');
const profile = require('./controllers/profile');
const image = require('./controllers/image');

const db = knex({
  client: 'pg',
  connection: {
    host : process.env.DATABASE_URL,
    ssl: true
  }
});


const app = express();

app.use(bodyParser.json());
app.use(cors());

app.get('/', (req, res) => {res.send('it is working!')})
app.post('/signin', signin.handleSignin(db, bcrypt))
app.post('/register', (req, res) => {register.handleRegister(req, res, db, bcrypt)})
app.get('/profile/:id', (req, res) => {profile.handleProfileGet(req, res, db)})
app.put('/image', (req, res) => { image.handleImage(req, res, db)})
app.post('/imageurl', (req, res) => { image.handleApiCall(req, res)})


bcrypt.hash("bacon", null, null, function(err, hash) {
	// Store hash in your password DB.
})

// // Load hash from your password DB.
// bcrypt.compare("bacon", hash, function(err, res) {
// 	//res == true
// });

// bcrypt.compare("veggies", hash, function(err, res) {
// 	// res = false
// });



app.listen(process.env.PORT || 3000, () => {
	console.log(`app is running on port ${process.env.PORT}`);
})




