const fs = require("fs");
const path = require("path");

const questionsPath = path.join(__dirname, "../config/questions.json");
const questions = JSON.parse(fs.readFileSync(questionsPath, "utf-8"));

function getAnswerByQuestionId(qId, selectedIndexes, textAnswer) {
  const question = questions.find((q) => q.id === qId);
  if (!question) return null;

  // All questions in current structure have options, so handle as choice questions
  // but protect against undefined selectedIndexes
  if (question.options) {
    return {
      question: question.question,
      options: question.options,
      selected: selectedIndexes && Array.isArray(selectedIndexes) 
        ? selectedIndexes.map((index) => question.options[index]) 
        : [],
    };
  }

  // Fallback for any edge cases
  return {
    question: question.question,
    options: [],
    selected: []
  };
}

module.exports = { getAnswerByQuestionId };
