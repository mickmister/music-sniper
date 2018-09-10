import 'mocha'
import * as chai from 'chai'
import * as sinon from 'sinon'
import { MockHowl } from '../../mock/mock-howler'
import { Sprite } from '../../../src/music-processing/sprite'

let sprite: Sprite
const expect = chai.expect
describe('Sprite', () => {

  beforeEach(() => {
    sprite = new Sprite('', {name: '', start: 0, end: 20})
  })

  afterEach(() => {

  })

  it('it should do the thing', () => {
    expect(sprite.section.start).to.eq(0)
    const seekStub = sinon.stub()
    sprite.howl = new MockHowl()
    sprite.howl.seek = seekStub
    seekStub.returns(20)
    expect(sprite.howl.seek()).to.eq(20)
    expect(sprite.getLength()).to.eq(20)
  })
})
