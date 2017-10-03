const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

const AnswerSchema = mongoose.Schema({
	answer: {
		type: String,
		required: true
	},
	user: {
		type: String,
		required: true
	},
	timestamp: {
		type: String,
		required: true
	}
});

const QuestionSchema = mongoose.Schema({
	title: {
		type: String,
		required: true,
	},
	explain: {
		type: String,
		required: true,
	},
	user: {
		type: String,
		required: true,
	},
	timestamp: {
		type: String,
		required: true,
	},
	answers: [AnswerSchema]
});

const Question = mongoose.model('Question', QuestionSchema, 'questions');
const Answer = mongoose.model('Answer', AnswerSchema);

module.exports = {Question, Answer};