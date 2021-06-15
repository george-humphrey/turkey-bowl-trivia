import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import QandA from './components/QandA.jsx';
import Scoreboard from './components/Scoreboard.jsx';
import FootballField from './components/FootballField.jsx';
import MessageBoard from './components/MessageBoard.jsx';
import triviaHelpers from './helpers/trivia.jsx';
import gameplayHelpers from './helpers/gameplay.jsx';
import customHelpers from './helpers/customization.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeGame: false,
      winner: null,
      message1: 'Click "New Game" to Start!',
      message2: '',
      message3: '',

      currentTeam: 1,
      yards: 50,
      conversion: false,
      quarter: 0,
      drive: 0,
      team1Score: 0,
      team2Score: 0,


      team1Name: 'Team Apples',
      team2Name: 'Team Pumpkins',
      team1Logo: 'A',
      team2Logo: 'C',

      usedQuestions: [],
      question: '',
      trueAnswer: '',
      answerA: '',
      answerB: '',
      answerC: '',
      answerD: '',
    }

    this.randomizeAnswers = triviaHelpers.randomizeAnswers;
    this.updateQuestion = triviaHelpers.updateQuestion;
    this.newQuestion = triviaHelpers.newQuestion;
    this.newGame = gameplayHelpers.newGame;
    this.newDrive = gameplayHelpers.newDrive;
    this.goodPlay = gameplayHelpers.goodPlay;
    this.chooseYardage = gameplayHelpers.chooseYardage;
    this.endGame = gameplayHelpers.endGame;
    this.clickAnswer = gameplayHelpers.clickAnswer.bind(this);
    this.changeName = customHelpers.changeName.bind(this);
    this.changeLogo = customHelpers.changeLogo.bind(this);
  }

  componentDidMount() {
  }

  render() {
    return (
      <div id='app'>
        <h1>Turkey Bowl Trivia</h1>
        <QandA q={this.state.question} aA={this.state.answerA} aB={this.state.answerB} aC={this.state.answerC} aD={this.state.answerD} click={this.clickAnswer} />
        <Scoreboard t1Score={this.state.team1Score} t2Score={this.state.team2Score} t1Name={this.state.team1Name} t2Name={this.state.team2Name} q={this.state.quarter} changeName={this.changeName.bind(this)} />
        <MessageBoard m1={this.state.message1} m2={this.state.message2} m3={this.state.message3} />
        <FootballField logo1={this.state.team1Logo} logo2={this.state.team2Logo} change={this.changeLogo} conversion={this.state.conversion} winner={this.state.winner} />
        <button id='newGameButton' onClick={() => { this.newGame() }}>New Game</button>
      </div >
    )
  }
}

ReactDOM.render(<App />, document.getElementById('app'));