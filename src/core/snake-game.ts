import { Point, Direction } from '@/models'
import { acceptKey } from '@/utils'

import SnakeMap from '@/core/snake-map'
import Snake from '@/core/snake'
import Bonus, { BonusItem } from '@/core/bonus'
import Drawer from '@/core/drawer'

import {
  GameController,
  EventBus,
  KeyboardListener,
  ScheduleTimer
} from '@/controllers'

export default class SnakeGame implements GameController {

  private snakeMap: SnakeMap
  private snake: Snake
  private bonus: Bonus
  private drawer: Drawer

  bus: EventBus
  listener: KeyboardListener
  scheduler: ScheduleTimer

  private snakeMovable(): boolean {
    return this.snakeMap.checkSnake(this.snake)
  }

  constructor() {
    this.bus = new EventBus(this)
    this.listener = new KeyboardListener(this.bus)
    this.scheduler = new ScheduleTimer(this.bus)

    this.snake = new Snake({ x: 30, y: 30 })
    this.snakeMap = new SnakeMap(40, 40)
    this.bonus = new Bonus()
    this.bonus.addList(this.snakeMap.bonusGen(4))

    this.drawer = new Drawer()
    this.drawer.dataSource({
      snake: this.snake,
      snakeMap: this.snakeMap,
      bonus: this.bonus
    })
  }

  mountOn(el: HTMLElement): void {
    let canvas = document.createElement('canvas')
    canvas.width = this.snakeMap.width
    canvas.height = this.snakeMap.height
    this.drawer.bindTo(canvas)
    el.appendChild(canvas)
  }

  start(): void {
    this.listener.attach()
    this.scheduler.start()
  }

  pause(): void {
    this.listener.dettach()
    this.scheduler.stop()
  }

  stop(): void {
    this.pause()
  }

  private moveSnake() {
    if (this.snakeMovable()) {
      this.snake.move()
      this.drawer.render()
    } else {
      this.stop()
    }
  }

  // callbacks implemeting interface
  playStart() {
    this.drawer.render()
  }

  userPlay(keycode): void {
    if (acceptKey(keycode)) {
      this.snake.movingDirection = keycode

      if (this.snakeMovable()) {
        this.scheduler.renew(() => {
          this.snake.move(keycode)
          this.drawer.render()
        })
      } else {
        this.stop()
      }
    }
  }

  nextRound(): void {
    this.moveSnake()
  }

}
