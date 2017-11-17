import SnakeGame from '@/core/snake-game'

declare var module: any

const DEBUG = true
if (DEBUG) {
  const game = new SnakeGame()
  game.mountOn(document.getElementById('game-app'))
  game.start()
}

if (window) {
  (window as any).SnakeGame = SnakeGame
} else {
  module.exports = SnakeGame
}
