import $ from 'jquery';

const newDrive = function (team, newGame = true, quarter, drive, m1 = '', m2 = '', score1, score2) {
  let teamName = this.state[`team${team}Name`];
  let freshSlate;

  if (newGame) {
    freshSlate = {
      activeGame: true,
      winner: null,
      message1: m1,
      message2: `${teamName} Starts with Posession`,
      message3: `The Ball is on the 50-Yard Line`,

      currentTeam: team,
      yards: 0,
      conversion: false,

      team1Score: score1,
      team2Score: score2,
      quarter: quarter,
      drive: drive,

      usedQuestions: [],
      question: '',
      trueAnswer: '',
      answerA: '',
      answerB: '',
      answerC: '',
      answerD: '',
    }
  } else {
    freshSlate = {
      activeGame: true,
      winner: null,
      message1: m1,
      message2: m2,
      message3: `${teamName} has Taken Posession`,

      currentTeam: team,
      yards: 0,
      conversion: false,

      team1Score: score1,
      team2Score: score2,
      quarter: quarter,
      drive: drive,

      usedQuestions: [],
      question: '',
      trueAnswer: '',
      answerA: '',
      answerB: '',
      answerC: '',
      answerD: '',
    }
  }

  this.setState(freshSlate, () => {
    this.newQuestion();
    $('#scrimmageLine').css('left', 293);
    $('#ball').css('left', 277);
    if ((this.state.quarter !== 1 || this.state.drive !== 1) && (this.state.quarter !== 4 || this.state.drive !== 4)) {
      $('#message2').css('color', 'lawngreen')
    } else {
      $('#message2').css('color', 'rgb(249, 251, 208)')
    }
  });
}

const newGame = function () {
  let coinFlip = Math.floor(Math.random() * 2) + 1;
  this.newDrive(coinFlip, true, 1, 1, '', '', 0, 0);
}

const clickAnswer = function (letter, answer) {
  if (this.state.activeGame) {
    if (this.state.trueAnswer === answer) {
      this.goodPlay();
    } else {
      let quarter = this.state.drive === 2 ? this.state.quarter + 1 : this.state.quarter;
      let drive = this.state.drive === 2 ? 1 : 2;

      if (quarter === 4 && drive === 2) {
        this.endGame();
      } else {
        let m1 = 'Uffda! The Correct Answer was:'
        let m2 = this.state.trueAnswer;
        let score1 = this.state.team1Score;
        let score2 = this.state.team2Score;
        this.state.currentTeam === 1 ? this.newDrive(2, false, quarter, drive, m1, m2, score1, score2) : this.newDrive(1, false, quarter, drive, m1, m2, score1, score2);
      }
    }
  }
}

const chooseYardage = function () {
  return Math.ceil(Math.random() * 25);
}

const endGame = function () {
  let m1 = 'GAME OVER'
  let m2 = `Final Score: ${this.state.team1Score} - ${this.state.team2Score}`
  let m3 = `It's a Tie!`
  if (this.state.team1Score > this.state.team2Score) {
    m3 = `${this.state.team1Name} Wins!`;
  } else if (this.state.team1Score < this.state.team2Score) {
    m3 = `${this.state.team2Name} Wins!`;
  };

  this.setState({
    activeGame: false,
    winner: null,
    message1: m1,
    message2: m2,
    message3: m3,

    currentTrivium: {},
    question: '',
    trueAnswer: '',
    answerA: '',
    answerB: '',
    answerC: '',
    answerD: '',
  })
}

const goodPlay = function () {
  let gained = this.chooseYardage();
  let newPosition = this.state.yards + gained;
  let linePos = this.state.currentTeam === 1 ? 293 + (4.5 * newPosition) : 293 - (4.5 * newPosition);
  let ballPos = this.state.currentTeam === 1 ? 277 + (4.5 * newPosition) : 277 - (4.5 * newPosition);

  $('#scrimmageLine').css('left', `${linePos}px`);
  $('#ball').css('left', `${ballPos}px`);

  if (newPosition >= 50) {
    let quarter = this.state.drive === 2 ? this.state.quarter + 1 : this.state.quarter;
    let drive = this.state.drive === 2 ? 1 : 2;
    let m1 = 'TOUCHDOWN!!';
    let score1, score2;

    if (quarter === 4 && drive === 2) {
      let score1 = this.state.team1Score;
      let score2 = this.state.team2Score;
      this.state.currentTeam === 1 ? score1 += 7 : score2 += 7;
      this.setState({ team1Score: score1, team2Score: score2 })
      this.endGame();
    } else {
      if (this.state.currentTeam === 1) {
        score1 = this.state.team1Score + 7;
        score2 = this.state.team2Score;
        let m2 = `The Score is now ${score1} - ${score2}`;
        this.newDrive(2, false, quarter, drive, m1, m2, score1, score2);
      } else {
        score1 = this.state.team1Score;
        score2 = this.state.team2Score + 7;
        let m2 = `The Score is now ${score1} - ${score2}`;
        this.newDrive(1, false, quarter, drive, m1, m2, score1, score2);
      }
    }
  } else {
    let teamName = this.state[`team${this.state.currentTeam}Name`];
    let update = {
      message1: `Correct! You Gained ${gained} Yards!`,
      message2: `${teamName} has Posession`,
      message3: `The Ball is at the ${50 - newPosition}-Yard Line`,

      yards: newPosition,
    }
    this.setState(update, () => {
      $('#message2').css('color', 'rgb(249, 251, 208)');
      this.newQuestion()
    });
  }
}

module.exports = {
  newDrive, newGame, chooseYardage, goodPlay, endGame, clickAnswer
}