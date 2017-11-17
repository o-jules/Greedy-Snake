import Snake from '@/core/snake'
import SnakeMap from '@/core/snake-map'
import Bonus, {BonusItem, BonusType} from '@/core/bonus'

export function genBonus(
  snake: Snake,
  map: SnakeMap,
  count: number
): BonusItem {

  let len = map.square - snake.length
  if (len <= 0) {
    return null
  }

  let pos = Math.floor(Math.random() * len)
  let type = Math.floor(Math.random() * BonusType.UNKOWN)

  let x = 0
  let y = 0

  return ({
    type,
    point: {
      x: 0,
      y: 0
    }
  } as BonusItem)
}

export enum Action {
  move,
  eat,
  over
}

export function actionDetect(
  snake: Snake,
  map: SnakeMap,
  bonus: Bonus
): Action {
  return Action.move
}
