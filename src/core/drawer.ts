import { Point } from '@/models'
import Snake from '@/core/snake'
import SnakeMap from '@/core/snake-map'
import Bonus from '@/core/bonus'

interface GameCore {
  snakeMap: SnakeMap
  snake: Snake
  bonus: Bonus
}

export default class Drawer {
  canvas: HTMLCanvasElement
  ctx: CanvasRenderingContext2D
  core: GameCore

  constructor(canvas: HTMLCanvasElement = null) {
    this.bindTo(canvas)
  }

  bindTo(canvas: HTMLCanvasElement): void {
    if (canvas) {
      this.canvas = canvas
      this.ctx = this.canvas.getContext('2d')
    }
  }

  dataSource(source: GameCore): void {
    this.core = source
  }

  setSize(w: number, h: number): void {
    this.canvas.width = w
    this.canvas.height = h
  }

  private drawLine(start: Point, end: Point, vertical: boolean): void {
    this.ctx.moveTo(start.x, start.y)
    this.ctx.lineTo(end.x, end.y)
  }

  private drawBorderLine(start: Point, end: Point, vertical: boolean): void {
    this.drawLine(start, end, vertical)
  }

  draw(callback: (ctx) => void) {
    this.ctx.save()
    callback(this.ctx)
    this.ctx.restore()
  }

  drawBorder(): void {
    this.draw(ctx => {
      ctx.strokeStyle = '#000'
      ctx.lineWidth = 1
      ctx.beginPath()
      this.core.snakeMap.borderLoop(this.drawBorderLine.bind(this))
      ctx.stroke()
      ctx.closePath()
    })
  }

  drawGrid() {
    this.draw(ctx => {
      ctx.strokeStyle = '#aaa'
      ctx.lineWidth = 0.2
      ctx.beginPath()
      this.core.snakeMap.hLoop(this.drawLine.bind(this))
      this.core.snakeMap.vLoop(this.drawLine.bind(this))
      ctx.stroke()
      ctx.closePath()
    })
  }

  drawBonus (): void {
    this.draw(ctx => {
      this.ctx.fillStyle = '#0000ff'
      const size = this.core.snakeMap.getGridSize()
      this.core.bonus.data.forEach((item, index) => {
        const p = item.point
        let point = this.core.snakeMap.pointOf(p.x, p.y)
        this.ctx.fillRect(point.x, point.y, size, size)
      })
    })
  }

  drawScore(): void { }

  drawSnake(): void {
    this.draw(ctx => {
      const size = this.core.snakeMap.getGridSize()
      this.core.snake.loop((item, i) => {
        ctx.fillStyle = i === 0 ? '#03d803' : '#00ff00'
        let point = this.core.snakeMap.pointOf(item.x, item.y)
        ctx.fillRect(point.x, point.y, size, size)
      })
    })
  }

  clear() {
    this.ctx.clearRect(0, 0, this.core.snakeMap.width, this.core.snakeMap.height)
  }

  render(): void {
    this.clear()
    this.drawBorder()
    this.drawGrid()
    this.drawBonus()
    this.drawSnake()
    this.drawScore()
  }
}
