# Topic
## TODO
- [x] Settings
- [ ] Emojis
- [x] Restart
- [x] Korean mode

## Game logic
- GAME_STATE == 3
- COM rolls
- loop check input for valid word
- if input == settings changeSettings()
- if input == restart restartGame()
- if botMode, roll
- else input == SPS, assign player's choice
- else GG

Korean mode: Start w a regular play to decide attacker
- On bot mode?
  - NOT bot mode, prompt for valid input
    - If valid input, com roll
  - Bot mode
    - com roll twice

Korean mode
  - Attacker continues attacking as long as he keeps winning (comAttacks t/f)
  - Defender takes over as attacker if he wins (comAttacks t/f)
  - Attacker wins if manages to force a draw (comAttacks null)
  - Update result based on normal/reversed rules (comAttacks null, set to t/f)

## SPS2 Planning
- Welcome to SPS! Please enter your name
- Game mode settings (Restart)
  - Mode - Regular/Korean
  - Rules - Normal/Reverse
  - Player - Human/Bot
- 'You are' currently playing on 'Regular' mode with 'Normal' rules. Do you want to restart?
- Please input scissors, paper or stone to play.
- At any point in time, input 'Restart' to reset your progress, or 'Settings' to change game modes
- Display result







| Left | Centre | Right |
| :--- | :----: | ----: |
| 1    |   2    |     3 |
| we   |   fs   |    fe |

$$
f(x) = \frac{-b\pm\sqrt{b^2-4ac}}{2a}
$$

