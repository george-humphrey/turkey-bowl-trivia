import $ from 'jquery';

export default function readyPlay() {
  var p1 = this.state.player1;
  var p2 = this.state.player2;

  var tieBreak = this.state.tieBreak;
  var setWinner = this.state.setWinner;
  var currentSet = this.state.currentSet;

  var rankDif = p1.rank - p2.rank;
  var head2head = 0;
  if (this.state.head2head.player1 !== 'X' && this.state.head2head.player1 !== 'X') {
    head2head = this.state.head2head.player1 / (this.state.head2head.player1 + this.state.head2head.player2);
  };

  var p1WinChance;

  if (rankDif > 0) {
    p1WinChance = (50 - (Math.log(rankDif + 1)) + (head2head * 8)) / 100;
  } else if (rankDif < 0) {
    p1WinChance = (50 + (Math.log(-rankDif + 1)) + (head2head * 8)) / 100;
  } else if (rankDif === 0) {
    p1WinChance = (50 + (head2head * 8)) / 100;
  }
  console.log(`${p1.name} has a ${p1WinChance} chance of winning`)

  var determineOdds = function () {
    return Math.random()
  };

  var playGame = function () {
    var luck = determineOdds();
    if (luck <= p1WinChance) {
      p1.games[currentSet]++;
      this.setState({ player1: p1 })
    } else {
      p2.games[currentSet]++;
      this.setState({ player2: p2 })
    }
    // console.log(`${p1.games[currentSet]} - ${p2.games[currentSet]}`)
  };

  var wonSet = function (state, props) {
    if (p1.games[currentSet] > 5 && p2.games[currentSet] < 5) {
      setWinner = 'player 1';
    } else if (p2.games[currentSet] > 5 && p1.games[currentSet] < 5) {
      setWinner = 'player 2';
    } else if (p1.games[currentSet] === 7) {
      setWinner = 'player 1';
    } else if (p2.games[currentSet] === 7) {
      setWinner = 'player 2';
    }
    this.setState({ setWinner });
  };

  var playSet = function () {
    while (setWinner === false && this.state.tieBreak === false) {
      playGame.bind(this)();
      wonSet.bind(this)();
    }
    if (setWinner === 'player 1') {
      console.log(
        `${p1.name} wins the set ${p1.games[currentSet]} - ${p2.games[currentSet]}!`
      );

      p1.sets++;
      currentSet++;
      tieBreak = false;
      setWinner = false;
      this.setState({ player1: p1, player2: p2, currentSet, setWinner, tieBreak })

    }
    if (setWinner === 'player 2') {
      console.log(
        `${p2.name} wins the set ${p2.games[currentSet]} - ${p1.games[currentSet]}!`
      );

      p2.sets++;
      currentSet++;
      tieBreak = false;
      setWinner = false;
      this.setState({ player1: p1, player2: p2, currentSet, setWinner, tieBreak })
    }
  }

  var playMatch = function () {
    while (
      p1.sets < this.state.setsToWin &&
      p2.sets < this.state.setsToWin
    ) {
      p1.games[currentSet] = 0;
      p2.games[currentSet] = 0;
      playSet.bind(this)();
    };
    if (p1.sets === this.state.setsToWin) {
      console.log(
        `${p1.name} wins the match ${p1.sets} - ${p2.sets}!`
      );
      $('#p1lineName').addClass('winner').removeClass('nonWinner')
    };
    if (p2.sets === this.state.setsToWin) {
      console.log(
        `${p2.name} wins the match ${p2.sets} - ${p1.sets}!`
      );
      $('#p2lineName').addClass('winner').removeClass('nonWinner')
    };

    this.setState({ player1: p1, player2: p2, currentSet, setWinner, tieBreak });
  }

  playMatch.bind(this)();

}


