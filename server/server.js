const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');
const cors = require('cors');
const app = express();
// db config
const db = require('./config/keys').mongoURL;
// passport
app.use(passport.initialize());
app.use(cors())
require('./config/passport')(passport);
// connect to MongoDB
mongoose.connect(db).then(()=>console.log('MongoDB Connected')).catch((err)=>console.log(err));
app.get('/', (req, res) => res.send('Hello world 12'));
// bodyParser
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
// Use routes
app.use('/api/users', require('./routes/api/users'));
app.use('/api/posts', require('./routes/api/posts'));
app.use('/api/profile', require('./routes/api/profile'));
const port = process.env.port || 5000;

app.listen(port, ()=> console.log(`Server running on port ${port}`));