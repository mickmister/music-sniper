export class MockHowl {

  constructor(options?: {}) {

  }
  play = (spriteOrId?: string | number) => {
    return 0
  }

  static seek = (num?: number) => (seek?: number, id?: number) => {
    return 0
  }
}
