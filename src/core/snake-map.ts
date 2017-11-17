import { Point, Grid, Bound } from '@/models'
import Snake from '@/core/snake'
import { BonusItem, randomBonus } from '@/core/bonus'

type LineLoopFn = (start: Point, end: Point, vertical: boolean) => void

class BaseMap {
  padding = { x: 20, y: 20 }
  columns: number
  rows: number
  gridSize: number

  get square(): number {
    return this.columns * this.rows
  }

  get topLeft(): Point {
    return this.pointOf(0, 0)
  }

  get topRight(): Point {
    return this.pointOf(this.columns, 0)
  }

  get bottomLeft(): Point {
    return this.pointOf(0, this.rows)
  }

  get bottomRight(): Point {
    return this.pointOf(this.columns, this.rows)
  }

  get width(): number {
    return this.bound.width + this.padding.x * 2
  }

  get height(): number {
    return this.bound.height + this.padding.y * 2
  }

  getGridSize(): number {
    return this.gridSize
  }

  get bound(): Bound {
    return {
      width: this.columns * this.gridSize,
      height: this.rows * this.gridSize
    }
  }

  constructor(columns: number, rows: number, gridSize: number) {
    this.columns = columns
    this.rows = rows
    this.gridSize = gridSize
  }

  pointOf(x: number, y: number): Point {
    return {
      x: x * this.gridSize + this.padding.x,
      y: y * this.gridSize + this.padding.y
    }
  }

  contains(p: Point): boolean {
    return (
      (p.x >= 0 && p.x < this.columns) &&
      (p.y >= 0 && p.y < this.rows)
    )
  }

}

export default class SnakeMap extends BaseMap {

  constructor(
    columns: number = 30,
    rows: number = 30,
    gridSize: number = 12
  ) {
    super(columns, rows, gridSize)
  }

  hLoop(callback: LineLoopFn): void {
    const len = this.rows
    for (let i = 1; i < len; i++) {
      callback(this.pointOf(0, i), this.pointOf(this.columns, i), false)
    }
  }

  vLoop(callback: LineLoopFn): void {
    const len = this.columns
    for (let i = 1; i < len; i++) {
      callback(this.pointOf(i, 0), this.pointOf(i, this.rows), true)
    }
  }

  borderLoop(callback: LineLoopFn): void {
    // horizontal
    callback(this.topLeft, this.topRight, false)
    callback(this.bottomLeft, this.bottomRight, false)

    // vertical
    callback(this.topLeft, this.bottomLeft, true)
    callback(this.topRight, this.bottomRight, true)
  }

  bonusGen(count: number = 1): Array<BonusItem> {
    const bonus = new Array<BonusItem>()
    for (let i = 0; i < count; i++) {
      let item: BonusItem = {
        point: this.random(),
        type: randomBonus()
      }
      bonus.push(item)
    }
    return bonus
  }

  random(): Point {
    return {
      x: this.randomX(),
      y: this.randomY()
    }
  }

  randomX(): number {
    return Math.floor(Math.random() * this.columns)
  }

  randomY(): number {
    return Math.floor(Math.random() * this.rows)
  }

  checkSnake(snake: Snake): boolean {
    let next = snake.nextHead
    return this.contains(next)
  }

}
