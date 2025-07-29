const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const languageRoutes = require('./routes/languageRoutes');

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log('MongoDB connected'));

app.use('/api/languages', languageRoutes);

app.listen(process.env.PORT || 5000, () => {
  console.log('Server is running...');
});

PORT=5000
MONGO_URI=mongodb://localhost:27017/codestart

const mongoose = require('mongoose');

const lessonSchema = new mongoose.Schema({
  title: String,
  content: String
});

const languageSchema = new mongoose.Schema({
  name: String,
  description: String,
  lessons: [lessonSchema]
});

module.exports = mongoose.model('Language', languageSchema);
const express = require('express');
const router = express.Router();
const Language = require('../models/Language');

router.get('/', async (req, res) => {
  const languages = await Language.find();
  res.json(languages);
});

router.get('/:id', async (req, res) => {
  const lang = await Language.findById(req.params.id);
  res.json(lang);
});

router.post('/', async (req, res) => {
  const newLang = new Language(req.body);
  const savedLang = await newLang.save();
  res.status(201).json(savedLang);
});

module.exports = router;

<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>CodeStart</title>
  <link rel="stylesheet" href="styles.css" />
</head>
<body>
  <h1>Welcome to CodeStart!</h1>
  <div id="language-list"></div>

  <script src="script.js"></script>
</body>
</html>

body {
  font-family: Arial, sans-serif;
  padding: 20px;
  background-color: #f5f5f5;
}
h1 {
  color: #333;
}
#language-list {
  margin-top: 20px;
}
.language {
  background: white;
  margin: 10px 0;
  padding: 10px;
  border-radius: 5px;
}

fetch('http://localhost:5000/api/languages')
  .then(res => res.json())
  .then(data => {
    const container = document.getElementById('language-list');
    data.forEach(lang => {
      const div = document.createElement('div');
      div.className = 'language';
      div.innerHTML = `<h3>${lang.name}</h3><p>${lang.description}</p>`;
      container.appendChild(div);
    });
  });

[
  {
    "name": "Python",
    "description": "A beginner-friendly programming language for general purposes.",
    "lessons": [
      {"title": "Variables", "content": "Variables in Python are created by assigning values."},
      {"title": "Loops", "content": "Python has for and while loops."}
    ]
  },
  {
    "name": "JavaScript",
    "description": "The language of the web, used for frontend and backend development.",
    "lessons": [
      {"title": "DOM Manipulation", "content": "You can change HTML content using JavaScript."},
      {"title": "Events", "content": "React to user actions using events."}
    ]
  },
  {
    "name": "C++",
    "description": "A powerful general-purpose language used in systems programming.",
    "lessons": [
      {"title": "Pointers", "content": "Pointers store memory addresses."},
      {"title": "Classes", "content": "C++ supports object-oriented programming with classes."}
    ]
  }
]

