import { Point, Direction } from '@/models'

export function nextPoint(point: Point, d: Direction): Point {
  let p = copyPoint(point)

  switch (d) {
    case Direction.LEFT:
      p.x -= 1
      break
    case Direction.RIGHT:
      p.x += 1
      break
    case Direction.UP:
      p.y -= 1
      break
    case Direction.DOWN:
      p.y += 1
      break
    default:
      break
  }
  return p
}

export function copyPoint(p: Point) {
  return {
    x: p.x,
    y: p.y
  }
}

export function isVertical(d: Direction) {
  return d === Direction.UP || d === Direction.DOWN
}

export function isHorizontal(d: Direction) {
  return d === Direction.LEFT || d === Direction.RIGHT
}

export function isOpposite(d1: Direction, d2: Direction): boolean {
  return (
    (d1 === Direction.LEFT && d2 === Direction.RIGHT) ||
    (d1 === Direction.RIGHT && d2 === Direction.LEFT) ||
    (d1 === Direction.UP && d2 === Direction.DOWN) ||
    (d1 === Direction.DOWN && d2 === Direction.UP)
  )
}

export function acceptKey(keycode: number): boolean {
  return (
    keycode === Direction.LEFT ||
    keycode === Direction.UP ||
    keycode === Direction.RIGHT ||
    keycode === Direction.DOWN
  )
}
