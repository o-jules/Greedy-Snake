import { acceptKey } from '@/utils'

export enum EventType {
  START,
  PLAY,
  NEXT
}

export interface GameController {
  bus: EventBus
  listener: KeyboardListener
  scheduler: ScheduleTimer

  playStart(): void
  userPlay(keycode): void
  nextRound(): void
}

export class EventBus {
  reciever: GameController

  constructor(r: GameController) {
    this.reciever = r
  }

  emit(event: EventType, payload: any = null) {
    switch (event) {
      case EventType.START:
        this.reciever.playStart()
        break
      case EventType.PLAY:
        this.reciever.userPlay(payload)
        break
      case EventType.NEXT:
        this.reciever.nextRound()
        break
    }
  }

}

export class Emitter {
  bus: EventBus

  constructor (bus: EventBus) {
    this.bus = bus
  }

}

export class KeyboardListener extends Emitter {
  listener: any;

  constructor (bus: EventBus) {
    super(bus)
    this.listener = this.handler.bind(this)
  }

  attach () {
    document.body.addEventListener('keydown', this.listener)
  }

  dettach () {
    document.body.removeEventListener('keydown', this.listener)
  }

  handler(event: KeyboardEvent) {
    let keycode = event.keyCode
    if (acceptKey(keycode)) {
      this.bus.emit(EventType.PLAY, keycode)
    }
  }

}

export class ScheduleTimer extends Emitter {
  speed: number = 800
  timerRef: number = null
  private stoped: boolean = false

  constructor (bus: EventBus) {
    super(bus)
  }

  setSpeed (s: number) {
    this.speed = s
    // todo:
  }

  clearTimer() {
    window.clearTimeout(this.timerRef)
  }

  start() {
    this.bus.emit(EventType.START)
    this.stoped = false
    this.resume()
  }

  resume () {
    this.timerRef = window.setTimeout(() => {
      this.bus.emit(EventType.NEXT)
      if (!this.stoped) {
        this.resume()
      }
    }, this.speed)
  }

  stop () {
    this.clearTimer()
    this.stoped = true
  }

  renew (task: () => void) {
    this.clearTimer()
    task()
    this.resume()
  }

}
