
export enum Direction {
  LEFT = 37,
  UP,
  RIGHT,
  DOWN
}

export interface Point {
  x: number
  y: number
}

export interface Grid {
  point: Point
  size: number
}

export interface Bound {
  width: number
  height: number
}
