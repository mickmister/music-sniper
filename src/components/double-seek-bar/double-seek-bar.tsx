import React, {Component} from 'react'
import autobind from 'autobind-decorator'
import classnames from 'classnames'
import {
    compose,
    withChildrenStyles,
    withCustomizableClasses,
    withChildClasses,
} from 'react-player-controls/dist/utils/composers.js'
import RangeControlOverlay from 'react-player-controls/dist/components/RangeControlOverlay.js'
import './double-seek-bar.scss'

type DoubleSeekBarProps = {
    totalTime?: any,
    currentTime?: any,
    bufferedTime?: any,
    isSeekable?: any,
    onSeek?: any,
    onSeekStart?: any,
    onSeekEnd?: any,
    onIntent?: any,
    style?: any
};
type DoubleSeekBarState = {
    currentIntent: any | number
};

/**
 * Seekable progress bar
 *
 * TODO: Make use of the range input element?
 */
class DoubleSeekBar extends React.PureComponent<DoubleSeekBarProps, DoubleSeekBarState> {
    static defaultProps = {
        totalTime: 100,
        currentTime: 2,
        bufferedTime: 0,
        isSeekable: true,
        onSeek: (num: number) => {
            console.log(`Seek ${num}`)
        },
        onSeekEnd: (num: number) => {
            console.log(`Seek end ${num}`)
        },
        onSeekStart: (num: number) => {
            console.log(`Seek start ${num}`)
        },
        onIntent: (num: number) => {
            console.log(`Intent ${num}`)
        },
        style: {},
    };

    progressBarEl: HTMLElement | null = null;
    state = {
        currentIntent: 0,
    }

  @autobind
    storeRef(rootEl: HTMLElement) {
        this.progressBarEl = rootEl
    }
  @autobind
  handleSeek(relativeTime: number) {
      const {isSeekable, onSeek, totalTime} = this.props
      if (isSeekable) {
          onSeek(relativeTime * totalTime)
      }
  }
  @autobind
  handleSeekStart(relativeTime: number) {
      const {isSeekable, onSeekStart, totalTime} = this.props
      if (isSeekable) {
          onSeekStart(relativeTime * totalTime)
      }
  }
  @autobind
  handleSeekEnd(relativeTime: number) {
      const {isSeekable, onSeekEnd, totalTime} = this.props
      if (isSeekable) {
          onSeekEnd(relativeTime * totalTime)
      }
  }
  @autobind
  handleIntent(relativeTime: number) {
      const {isSeekable, onIntent, totalTime} = this.props
      const intent = isSeekable ? relativeTime : 0
      this.setState({
          ...this.state,
          currentIntent: intent,
      })
      if (isSeekable) {
          onIntent(relativeTime * totalTime)
      }
  }
  render() {
      const {
          totalTime,
          currentTime,
          bufferedTime,
          isSeekable,
          className,
          extraClasses,
          childClasses,
          style,
          childrenStyles,
          leftCircle,
          rightCircle,
      } = this.props
      const {currentIntent} = this.state
      const progressPercent = Math.min(100, (100 * currentTime) / totalTime)
      const styleLeft = `${progressPercent}%`

      // const styleLeft = leftCircle.position;
      const isRewindIntent =
      currentIntent !== 0 && currentIntent < currentTime / totalTime
      return (
          <div
              className={classnames(className, extraClasses, 'seek-bar', {
                  isSeekable,
                  isRewindIntent,
              })}
              style={style}
              ref={this.storeRef}
          >
              <div
                  className={childClasses.elapsed || 'ProgressBar-elapsed'}
                  style={{
                      left: `${leftCircle.position}%`,
                      width: `${rightCircle.position - leftCircle.position}%`,
                      ...(childrenStyles.elapsed || {}),
                  }}
              />

              <div
                  className={childClasses.intent || 'ProgressBar-intent'}
                  style={{
                      width: `${currentIntent * 100}%`,
                      ...(childrenStyles.intent || {}),
                  }}
              />

              <div
                  className={classnames({selectedCircle: leftCircle.selected}, 'seekBarCircle', 'ProgressBar-handle')}
                  style={{left: `${leftCircle.position}%`, ...(childrenStyles.handle || {})}}
              />

              <div
                  className={classnames({selectedCircle: rightCircle.selected}, 'seekBarCircle', 'ProgressBar-handle')}
                  style={{left: `${rightCircle.position}%`, ...(childrenStyles.handle || {})}}
              />

              {isSeekable && (
                  <RangeControlOverlay
                      className={childClasses.seek || 'ProgressBar-seek'}
                      style={childrenStyles.RangeControlOverlay}
                      bounds={() => this.progressBarEl.getBoundingClientRect()}
                      onValue={this.handleSeek}
                      onChangeStart={this.handleSeekStart}
                      onChangeEnd={this.handleSeekEnd}
                      onIntent={this.handleIntent}
                  />
              )}
              {/* <pre>{JSON.stringify(this.props, null, 4)}</pre> */}
          </div>
      )
  }
}
export default compose(
    withChildrenStyles(),
    withCustomizableClasses('ProgressBar'),
    withChildClasses()
)(DoubleSeekBar)
