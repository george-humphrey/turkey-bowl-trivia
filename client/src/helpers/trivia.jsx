import $ from 'jquery';

const randomizeAnswers = function (trivium) {
  let unsorted = [trivium.true_answer, trivium.false_answer1, trivium.false_answer2, trivium.false_answer3];
  let sorted = [];

  unsorted.forEach((answer) => {
    let index = Math.floor(Math.random() * (sorted.length + 1));
    sorted.splice(index, 0, answer);
  })

  return sorted;
}

const updateQuestion = function (trivium) {
  let randomized = this.randomizeAnswers(trivium);
  let used = this.state.usedQuestions;
  used.push(trivium.id);
  let updatedState = {
    trueAnswer: trivium.true_answer,
    answerA: randomized[0],
    answerB: randomized[1],
    answerC: randomized[2],
    answerD: randomized[3],
    question: trivium.question,
    usedQuestions: used,
  }
  this.setState(updatedState);
}

const newQuestion = function () {
  let id = Math.ceil(Math.random() * 300)
  while (this.state.usedQuestions.includes(id)) {
    id = Math.ceil(Math.random() * 300)
  }

  $.ajax({
    type: 'GET',
    url: '/trivia',
    dataType: 'json',
    data: { id },
    error: (err) => {
      console.log('error in ajax get to /trivia api');
      console.log(err)
    },
    success: (data) => {
      this.updateQuestion(data[0]);
    }
  })
}

module.exports = {
  randomizeAnswers, updateQuestion, newQuestion
}