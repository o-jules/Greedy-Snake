import {
  Point,
  Direction,
} from '@/models'

import {
  nextPoint,
  isOpposite
} from '@/utils'

export default class Snake {

  movingDirection: Direction = Direction.LEFT
  list: Array<Point>

  constructor(p: Point) {
    this.list = [
      /* test data */
      { x: 30, y: 30 },
      { x: 31, y: 30 },
      { x: 32, y: 30 }
    ]
  }

  get head(): Point {
    return this.list[0]
  }

  get tail(): Point {
    return this.list[this.length - 1]
  }

  get length(): number {
    const len = this.list.length
    if (len <= 0) {
      throw new RangeError('Snake length can not be less or equal to 0.')
    }
    return len
  }

  get array(): Array<Point> {
    return this.list
  }

  get nextHead(): Point {
    return nextPoint(this.head, this.movingDirection)
  }

  loop(callback) {
    const len = this.list.length
    for (let i = 0; i < len; i++) {
      callback(this.list[i], i)
    }
  }

  public move(
    d: Direction = null,
    eat: boolean = false
  ): void {
    if (d !== null) {
      if (isOpposite(d, this.movingDirection)) {
        console.warn('reverse direction: ', d, this.movingDirection)
        return
      } else {
        this.movingDirection = d
      }
    }
    this.forward(eat)
  }

  forward(eat: boolean) {
    let index = this.list.length
    let tag = Date.now()
    if (eat) {
      this.list.unshift(this.nextHead)
    } else {
      while (index--) {
        if (index === 0) {
          this.list[index] = this.nextHead
        } else {
          this.list[index] = this.list[index - 1]
        }
      }
    }
  }

}
