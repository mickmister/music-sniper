import * as React from 'react';
import produce from 'immer'
import DoubleSeekBar from './double-seek-bar'

export interface DoubleSeekBarContainerProps {
  setBounds: (obj: {}) => {}
}

export interface DoubleSeekBarContainerState {
  leftPosition: number,
  rightPosition: number,
  oldLeftPosition: number,
  oldRightPosition: number,
  draggingCircle: string | null,
  intentCircle: string | null,
  eventStack: object[],
}

const CIRCLES = {
  LEFT: 'LEFT',
  RIGHT: 'RIGHT',
}

const distance = (x: number, y: number) => Math.abs(x - y)

const CLOSE_PROXIMITY = 2

export default class DoubleSeekBarContainer extends React.PureComponent<DoubleSeekBarContainerProps, DoubleSeekBarContainerState> {
  state = {
    leftPosition: this.props.leftPosition,
    rightPosition: this.props.rightPosition,
    oldLeftPosition: this.props.leftPosition,
    oldRightPosition: this.props.rightPosition,
    draggingCircle: null,
    intentCircle: null,
    eventStack: [],
  }

  componentDidMount() {
    // document.body.addEventListener('click', () => alert('hey'))
  }

  onSeekStart = (seekValue: number) => {
    const nextState = produce(this.state, (draft: DoubleSeekBarContainerState) => {
      const {leftPosition, rightPosition} = draft
      const leftDistance = distance(leftPosition, seekValue)
      const rightDistance = distance(rightPosition, seekValue)
      if (seekValue < leftPosition || leftDistance < rightDistance) {
        draft.leftPosition = seekValue
        draft.draggingCircle = CIRCLES.LEFT
      }
      else if (seekValue > rightPosition || rightDistance < leftDistance) {
        draft.rightPosition = seekValue
        draft.draggingCircle = CIRCLES.RIGHT
      }
      draft.intentCircle = null
      draft.eventStack.push({
        leftPosition,
        rightPosition,
      })
    })
    this.setState(nextState)
  }

  onSeekEnd = (seekValue: number) => {
    const nextState = produce(this.state, (draft: DoubleSeekBarContainerState) => {
      draft.draggingCircle = null
    })
    const {leftPosition, rightPosition} = this.state
    this.props.setBounds({leftPosition, rightPosition})
    this.setState(nextState)
  }

  onIntent = (seekValue: number) => {
    const nextState = produce(this.state, (draft: DoubleSeekBarContainerState) => {
      const {leftPosition, rightPosition} = draft
      const leftDistance = distance(leftPosition, seekValue)
      const rightDistance = distance(rightPosition, seekValue)
      if (leftDistance < rightDistance) {
        draft.intentCircle = CIRCLES.LEFT
      }
      else if (rightDistance < leftDistance) {
        draft.intentCircle = CIRCLES.RIGHT
      }
    })
    this.setState(nextState)
  }

  onSeek = (seekValue: number) => {
    const nextState = produce(this.state, (draft: DoubleSeekBarContainerState) => {
      const {draggingCircle, leftPosition, rightPosition} = draft
      if (!draggingCircle) {
        return
      }
      if (draggingCircle === CIRCLES.LEFT && seekValue < rightPosition - CLOSE_PROXIMITY) {
        draft.leftPosition = seekValue
      }
      else if (draggingCircle === CIRCLES.RIGHT && seekValue > leftPosition + CLOSE_PROXIMITY) {
        draft.rightPosition = seekValue
      }
    })
    this.setState(nextState)
  }

  undo = () => {
    const nextState = produce(this.state, (draft: DoubleSeekBarContainerState) => {
      const {eventStack} = this.state
      if (eventStack.length === 0) {
        return
      }
      const newEvents = [...eventStack]
      const eventToUndo = newEvents.pop()
      Object.assign(draft, eventToUndo)
      draft.eventStack = newEvents
    })
    this.props.setBounds(nextState)
    this.setState(nextState)
  }

  public render() {
    const {spriteContainer} = this.props
    const {leftPosition, rightPosition, draggingCircle, intentCircle} = this.state
    const props = {
      leftCircle: {
        position: leftPosition,
        selected: [draggingCircle, intentCircle].includes(CIRCLES.LEFT),
      },
      rightCircle: {
        position: rightPosition,
        selected: [draggingCircle, intentCircle].includes(CIRCLES.RIGHT),
      },

      onSeekStart: this.onSeekStart,
      onSeek: this.onSeek,
      onSeekEnd: this.onSeekEnd,
      onIntent: this.onIntent,
    }
    let duration
    if (spriteContainer) {
      duration = spriteContainer.duration()
    }
    // const scaleNumber = (num: number) => {
    //   return parseFloat(leftPosition.toFixed(2))
    // }
    return (
      <div>
        <DoubleSeekBar {...props} />
        {/* <input
          type='number'
          step={0.1}
          value={parseFloat(leftPosition.toFixed(2))}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => this.setState({leftPosition: parseFloat(e.target.value)})}
        />
        <input
          type='number'
          step={0.1}
          value={parseFloat(rightPosition.toFixed(2))}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => this.setState({rightPosition: parseFloat(e.target.value)})}
        /> */}
        <button onClick={this.undo}>Undo</button>
      </div>
    );
  }
}
