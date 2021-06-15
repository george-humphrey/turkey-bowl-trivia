let changeName = function (team) {
  let newName = prompt('Please enter a new name for your team');
  if (team === 'team1') {
    this.setState({ team1Name: newName });
  } else if (team === 'team2') {
    this.setState({ team2Name: newName });
  }
};

let changeLogo = function (team) {
  let logos = ['A', 'C', 'F', 'I', 'K', 'Q'];

  if (team === 1) {
    let currentIndex = logos.indexOf(this.state.team1Logo);
    let newLogo = logos[(currentIndex + 1) % logos.length];
    this.setState({ team1Logo: newLogo });
  } else {
    let currentIndex = logos.indexOf(this.state.team2Logo);
    let newLogo = logos[(currentIndex + 1) % logos.length];
    this.setState({ team2Logo: newLogo });
  }
}

module.exports = {
  changeName, changeLogo,
}