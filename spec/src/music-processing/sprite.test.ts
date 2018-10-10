import 'mocha'
import * as chai from 'chai'
import * as sinon from 'sinon'
import { MockHowl } from '../../mock/mock-howler'
import { Sprite } from '../../../src/music-processing/sprite'
import { SpriteInformation } from '../../../src/types/music-types'

let sprite: Sprite
const expect = chai.expect
describe('Sprite', () => {

  beforeEach(() => {
  })

  afterEach(() => {

  })

  it('it should do the thing', () => {
    sprite = new Sprite('', {name: '', start: 8, end: 22})
    const seekStub = sinon.stub()
    sprite.howl = new MockHowl()
    sprite.howl.seek = seekStub.returns(20.8473)
    const info: SpriteInformation = sprite.getSpriteInfo()

    expect(info.songPosition).to.eq(20.8473)
    expect(info.spritePosition).to.eq(12.8473)
    expect(info.spriteProgress.toFixed(4)).to.eq('91.7664')
    expect(info.length).to.eq(14)
  })
})
