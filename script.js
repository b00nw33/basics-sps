/* Teo Boon Wee - B12S2
Base
How many hours did you spend on this assignment?
Ans: 10 hrs
What part of the assignment did you spend the most time on?
Ans: Input validation and control flow
What is one error and/or error message you received while working on this assignment, and how did you solve the error?
Ans: "inputRaw.toLowerCase is not a function" with main(123).
How comfortable did you feel with this assignment? (1-5):
Ans: 4
Is there anything in this code that you feel pleased about?
Ans: I learned how to use a class to handle a bunch of data
What's one aspect of your code you would like specific, elaborate feedback on?
Ans: How do I not get lost looking at code several hundred lines long?
*/

/* Create a basic version of Scissors Paper Stone where the user inputs one of "scissors", "paper", or "stone", the program internally randomly chooses scissors, paper, or stone, and the program outputs whether the user won, the program won, or it's a draw.
Rules: scissors beats paper, paper beats stone, and stone beats scissors. If both parties choose the same object, it's a draw.
🤺⚔🔫🛡✌🤞💻⌨🎲😓😔😢😄😆⚖
*/

//  A round can consist of unlimited plays. In Korean mode, a play can have unlimited hands.
// Enter "settings" during gameplay to change game settings
// Enter "restart" during gameplay to reset progress

const DEFAULT_SETTINGS = {
  userName: undefined,
  koreanMode: undefined,      //  muk-jji-ppa mode ON if true
  reversedRules: undefined,   //  Wins become losses if true
  botMode: undefined,         //  Computer rolls for player if true
  score: [0, 0, 0],           //  [COM WINS, DRAWS, PLAYER WINS]
  comAttacks: undefined       //  In Korean mode, when com is the attacker
}

const OPTIONS = [
  ["scissors", 0, "✂️"],
  ["paper", 1, "📃"],
  ["stone", 2, "🗿"]
]

var SETTINGS = DEFAULT_SETTINGS

// var SETTINGS = {
//   userName: "Tester",
//   koreanMode: true,          //  muk-jji-ppa mode ON if true
//   reversedRules: true,       //  Wins become losses if true
//   botMode: true,             //  Computer rolls for player if true
//   score: [0, 0, 0],           //  [COM WINS, DRAWS, PLAYER WINS]
//   comAttacks: undefined       //  In Korean mode, when com is the attacker
// }

var GAME_STATE = 1
var MESSAGE_1 = ""
var MESSAGE_2 = ""

var spsRoll = function() {
  return Math.floor(Math.random()*3)
}

var toggleInput = function(input,setting){   //Setting: 0 - word to num   1 - num to word      2 - num to emoji
  var output = -1
  OPTIONS.forEach(option => {
    if (setting == 0 && input == option[0]) output = option[1]
    if (setting == 1 && input == option[1]) output = option[0]
    if (setting == 2 && input == option[1]) output = option[2]
  })
  return output
}

var changeSettings = function() {

  SETTINGS.koreanMode = undefined
  SETTINGS.reversedRules = undefined
  SETTINGS.botMode = undefined
  GAME_STATE = 2
  return ""

}

var restartGame = function() {

  SETTINGS.koreanMode = undefined
  SETTINGS.reversedRules = undefined
  SETTINGS.botMode = undefined
  SETTINGS.score = [0, 0, 0]
  GAME_STATE = 2
  return ""

}

  var getGamePrompt = function(playerInput) {

  //  State 1 - Obtain user name
  if (GAME_STATE === 1) {
    if (!SETTINGS.userName) {
      if (!playerInput) {
        return "🤞 Welcome to <b><em>SPS</em></b>! Please enter your name.<br />"
      }
      SETTINGS.userName = playerInput
      GAME_STATE = 2
    }
  }

  //  State 2 - Select game settings
  if (GAME_STATE === 2) {

    if (SETTINGS.koreanMode === undefined) {
      if (playerInput.toLowerCase() != "on" && playerInput != "") {
        return `Welcome to <b><em>SPS</em></b>, ${SETTINGS.userName}!<br /><br />
        💻 Click through for regular mode, or input '<span style="color:green">ON</span>' for muk-jji-ppa mode!`
      }
      if (playerInput == "") SETTINGS.koreanMode = false
      else SETTINGS.koreanMode = true
      MESSAGE_1 = `Muk-jji-ppa mode ${SETTINGS.koreanMode ? '<span style="color:green">ON</span>' : '<span style="color:red">OFF</span>'}<br /><br />
      💻 Click through for normal rules, or input '<span style="color:green">ON</span>' to turn all losses to become wins!`
      return MESSAGE_1
    }
    
    if (SETTINGS.reversedRules === undefined) {
      if (playerInput.toLowerCase() != "on" && playerInput != "") {
        return MESSAGE_1
      }
      if (playerInput == "") SETTINGS.reversedRules = false
      else SETTINGS.reversedRules = true
      MESSAGE_1 = `Reversed mode ${SETTINGS.koreanMode ? '<span style="color:green">ON</span>' : '<span style="color:red">OFF</span>'}<br /><br />
      💻 Click through to start game, or input '<span style="color:green">ON</span>' to activate your very own personal <b><em>SPS</em></b> bot!`
      return MESSAGE_1
    }
    
    if (SETTINGS.botMode === undefined) {
      if (playerInput.toLowerCase() != "on" && playerInput != "") {
        return MESSAGE_1
      }
      if (playerInput == "") SETTINGS.botMode = false
      else SETTINGS.botMode = true
      MESSAGE_1 = `⌨ Excellent choice ${SETTINGS.userName}. You have selected:<br />
      <br />Korean mode ${SETTINGS.koreanMode ? '<span style="color:green">ON</span>' : '<span style="color:red">OFF</span>'}<br />
      Reversed rules ${SETTINGS.reversedRules ? '<span style="color:green">ON</span>' : '<span style="color:red">OFF</span>'}<br />
      Bot ${SETTINGS.botMode ? '<span style="color:green">ON</span>' : '<span style="color:red">OFF</span>'}<br /><br />Continue? (Y/n)`
      return MESSAGE_1
    }

    if (playerInput.toLowerCase() != "y" && playerInput.toLowerCase() != "n") {
      return MESSAGE_1
    }
    if (playerInput.toLowerCase() == "y") {
      GAME_STATE = 3
      MESSAGE_1 = `Let's start!<br /><br />${SETTINGS.botMode ? "Click through to have your bot choose" : "Type"} "scissors", "paper" or "stone" for your first play!`
      return MESSAGE_1
    } else {
      SETTINGS.koreanMode = undefined
      SETTINGS.reversedRules = undefined
      SETTINGS.botMode = undefined
      return `Welcome to <b><em>SPS</em></b>, ${SETTINGS.userName}!<br /><br />
      💻 Click through for regular mode, or input 'Korean' for muk-jji-ppa!`
    }
    
  }

  // State 3 - Play
  if (GAME_STATE === 3) {

    const validInput = [OPTIONS[0][0], OPTIONS[1][0], OPTIONS[2][0], "", "settings", "restart"]
    var play = [-1, -1, -1]     //  [COM, PLAYER, OUTCOME]

    //  COM roll
    if (SETTINGS.comAttacks === undefined || SETTINGS.comAttacks === null) {
    }
    play[0] = spsRoll()

    //  Player input or bot roll
    if (!validInput.includes(playerInput.toLowerCase())) {
      return `${SETTINGS.botMode ? "🎲 Click through to have your bot choose" : "Type"} "scissors", "paper" or "stone" to play!`
    }
    if (playerInput.toLowerCase() === validInput[4]) {
      changeSettings()
      return `Please indicate new settings.<br /><br />💻 Click through for regular mode, or input '<span style="color:green">ON</span>' for muk-jji-ppa mode!`
    }
    if (playerInput.toLowerCase() === validInput[5]) {
      restartGame()
      return `All progress has been reset.<br /><br />💻 Click through for regular mode, or input '<span style="color:green">ON</span>' for muk-jji-ppa mode!`
    }

    if (SETTINGS.botMode) play[1] = spsRoll()
    else if (playerInput === "") return `Bot mode currently set to <span style="color:red">OFF</span>. Type "scissors", "paper" or "stone" to play!`
    else play[1] = toggleInput(playerInput.toLowerCase(),0)
    
    //  Compute outcome 0 - Com win   1 - Tie   2 - Player win
    if(play[0] === play[1]) play[2] = 1
    else if (play[0] + 1 === play[1] || (play[0] === 2 && play[1] === 0)) {
      if (SETTINGS.reversedRules) play[2] = 2
      else play[2] = 0
    } else {
        if (SETTINGS.reversedRules) play[2] = 0
        else play[2] = 2
    }

    //  Retrieve emoji
    play[0] = toggleInput(play[0],2)
    play[1] = toggleInput(play[1],2)
    
    MESSAGE_1 = `${SETTINGS.botMode ? '<b>Bot</b> plays' : '<b>You</b> play'} ${play[1]}
    <br /><b>COM</b> plays ${play[0]}<br /><br />`

    // State 4 - Evaluation
    if (!SETTINGS.koreanMode) {

      //  Update score
      SETTINGS.score[play[2]]++

      if (play[2] === 1) MESSAGE_2 = "It's a <b>tie</b>! ⚖"
      if (play[2] === 0) MESSAGE_2 = "<b>COM</b> wins 😢"
      if (play[2] === 2) MESSAGE_2 = "<b>You</b> win! 😄"

      return MESSAGE_1 + MESSAGE_2
    }
  }

  //  Korean mode ON
  //  Initial play
  if (SETTINGS.comAttacks === undefined || SETTINGS.comAttacks === null) {

    if (play[2] === 1)
      MESSAGE_2 = "It's a <b>tie</b>! ⚖"
    if (play[2] === 0) {
      MESSAGE_2 = "<b>COM</b> gets to attack! Watch out! ⚔"
      SETTINGS.comAttacks = true
    }
    if (play[2] === 2) {
      MESSAGE_2 = "<b>You</b> get to attack! Force a draw to win! 🤺"
      SETTINGS.comAttacks = false
    }

    console.log(play, SETTINGS.comAttacks)
    return  MESSAGE_1 + MESSAGE_2
  }
  
  // Player attacking
  if (SETTINGS.comAttacks === false) {

    if (play[2] === 1) {
      MESSAGE_2 = "You forced a draw, and you won! ⚖😆"
      SETTINGS.comAttacks = null
      SETTINGS.score[2]++
    }
    if (play[2] === 0) {
      MESSAGE_2 = "<b>COM</b> gets to attack now! Watch out! 🛡"
      SETTINGS.comAttacks = true
    }
    if (play[2] === 2) {
      MESSAGE_2 = "<b>You</b> win! Keep attacking! 🔫"
      SETTINGS.comAttacks = false
    }
    
    console.log(play, SETTINGS.comAttacks)
    return  MESSAGE_1 + MESSAGE_2
  }
  
  // COM attacking
  if (SETTINGS.comAttacks === true) {

    if (play[2] === 1) {
      MESSAGE_2 = "<b>COM</b> forced a draw, so you lost! ⚖😔"
      SETTINGS.comAttacks = null
      SETTINGS.score[0]++
    }
    if (play[2] === 0) {
      MESSAGE_2 = "<b>COM</b> gets to attack again! Watch out! 🛡"
      SETTINGS.comAttacks = true
    }
    if (play[2] === 2) {
      MESSAGE_2 = "<b>You</b> get to attack now! Force a draw to win! 🤺"
      SETTINGS.comAttacks = false
    }

    console.log(play, SETTINGS.comAttacks)
    return  MESSAGE_1 + MESSAGE_2
  }
}

var getGameProgress = function() {
  var total = SETTINGS.score[0] + SETTINGS.score[2]
  if (GAME_STATE >= 3 && total > 0) return `<br /><br /><br />
  <table>
  <tr>
    <td><b>Player</b></td>
    <td>${SETTINGS.score[2]}</td>
    <td>${(100 * SETTINGS.score[2] / total).toFixed(1)}%</td>
  </tr>
  <tr>
    <td><b>COM</b></td>
    <td>${SETTINGS.score[0]}</td>
    <td>${(100 * SETTINGS.score[0] / total).toFixed(1)}%</td>
    </tr>
    <tr>
    <td>Total</td>
    <td>${total}</td>
    <td></td>
  </tr>
  </table>`
  return ""
}

var getGameFooter = function() {
  if (GAME_STATE >= 3) return `<br /><br /><hr><h6>
    Korean mode ${SETTINGS.koreanMode ? '<span style="color:green">ON</span>' : '<span style="color:red">OFF</span>'}<br />
    Reversed rules ${SETTINGS.reversedRules ? '<span style="color:green">ON</span>' : '<span style="color:red">OFF</span>'}
    <br />Bot ${SETTINGS.botMode ? '<span style="color:green">ON</span>' : '<span style="color:red">OFF</span>'}</h6>`

  return ""
}

var main = function(text) {

  var gamePrompt = getGamePrompt(text)
  var gameProgress = getGameProgress()
  var gameFooter = getGameFooter()
  return gamePrompt + gameProgress + gameFooter
}

var imgURL = "https://www.scienceabc.com/wp-content/uploads/2017/12/Two-little-girls-playing-Rock-paper-scissor-playing-children.jpg"
var audioURL = "https://vgmsite.com/soundtracks/bokujou-monogatari-harvest-moon-original-soundtrack/ptgwlght/01%20-%20title.mp3"
document.body.style.backgroundImage = `url(${imgURL})`
document.body.style.backgroundRepeat = "no-repeat"
document.body.style.backgroundSize = "cover"
document.getElementById("container").style.opacity = "0.95";
var audio = new Audio(audioURL)
audio.play()
document.querySelector("#output-div").innerHTML = main("")