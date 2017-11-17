import { Point } from '@/models'

export enum BonusType {
  RICE = 0,
  CANDY,
  APPLE,
  PEAR,
  TOY,
  UNKOWN
}

export function randomBonus(): BonusType {
  let random = Math.random() * 5
  let t = Math.round(random)
  return t
}

export interface BonusItem {
  type: BonusType
  point: Point
}

export default class Bonus {
  private _data: Array<BonusItem>

  constructor() {
    this._data = []
  }

  get data (): Array<BonusItem> {
    return this._data
  }

  /**
   * remove item from bonus list
   * called when it is eaten by the snake
   * @param {BonusItem} item - item to be removed
   * @return {boolean} - returns `true` if the item exits, otherwise `false`
   */
  remove (item: BonusItem): boolean {
    return true
  }

  /**
   * add item to bonus list
   * @param {BonusItem} item - item to be added
   */
  add (item: BonusItem): void {
    this._data.push(item)
  }

  addList (list: Array<BonusItem>): void {
    this._data.concat(list)
  }

  /**
   * empty data
   */
  empty (): void {
    this._data = []
  }

  contains (p: Point): boolean {
    let len = this._data.length
    for (let i = 0; i < len; i++) {
      let point = this._data[i].point
      if (point.x === p.x && point.y === p.y) {
        return true
      }
    }
    return false
  }

}
