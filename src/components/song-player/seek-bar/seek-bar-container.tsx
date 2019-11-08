import * as React from 'react'
import produce from 'immer'

import DoubleSeekBar from './double-seek-bar.slider'

export interface DoubleSeekBarContainerProps {
    setBounds: (obj: {}) => {};
}

export interface DoubleSeekBarContainerState {
    circlePosition: number;
    draggingCircle: string | null;
    intentCircle: string | null;
    eventStack: object[];
}

const CIRCLES = {
    LEFT: 'LEFT',
    RIGHT: 'RIGHT',
}

const distance = (x: number, y: number) => Math.abs(x - y)

const CLOSE_PROXIMITY = 2

export default class DoubleSeekBarContainer extends React.PureComponent<DoubleSeekBarContainerProps, DoubleSeekBarContainerState> {
    state = {
        circlePosition: this.props.leftPosition,
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
            } else if (seekValue > rightPosition || rightDistance < leftDistance) {
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
            } else if (rightDistance < leftDistance) {
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
            } else if (draggingCircle === CIRCLES.RIGHT && seekValue > leftPosition + CLOSE_PROXIMITY) {
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
            onSeekStart: this.onSeekStart,
            onSeek: this.onSeek,
            onSeekEnd: this.onSeekEnd,
            onIntent: this.onIntent,
        }
        return (
            <div>
                <DoubleSeekBar {...props}/>
            </div>
        )
    }
}
