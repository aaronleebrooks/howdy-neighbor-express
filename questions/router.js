const express = require('express');
const bodyParser = require('body-parser');
const _ = require('lodash');

const {Question, Answer} = require('./models');

const router = express.Router();

router.use(bodyParser.json());

router.get('/questions', (req, res) => {
  return Question
    .find()
    .then(questions => res.json(questions))
    .catch(err => res.status(500).json({message: 'Internal server error'}));
});

router.get('/', (req, res) => {
  return 'hello Aaron'
    .catch(err => res.status(500).json({message: 'Internal server error'}));
});

router.post('/questions', (req, res) => {

  let newQuestion = new Question({
  title: req.body.title,
	explain: req.body.explain,
	user: req.body.user,
	timestamp: req.body.timestamp,
	answers: []
 });

  return newQuestion.save().then((doc) => {
    res.send(doc);
  }, (e) => {
    res.status(400).send(e);
  });
});

router.post('/questions/:id', (req, res) => {
  //Checks to make sure the required fields are there. In this case, it is only the item description 
  const requiredFields = ['answer', 'user', 'timestamp'];
  for  (let i=0; i<requiredFields.length; i++) {
    const field = requiredFields[i];
    if (!(field in req.body)) {
      const message = `Missing \`${field}\` in request body`
      console.error(message);
      return res.status(400).send(message);
    }
  }

	let answer = new Answer({
	  answer: req.body.answer,
		user: req.body.user,
		timestamp: req.body.timestamp,
	});

  Question
  .findById(req.params.id)
  .then(function(question) {

      question.answers.push(answer);
      // Need this line for mongoose to realize the array has been modified
      question.markModified('answers');
      return question.save();
  })
  .then(function(saved) {
      res.sendStatus(204);
  })
    .catch(err => {
      res.status(500).json({message: err})
    });
});

module.exports = {router};