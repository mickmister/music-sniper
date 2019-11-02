import React, {Component} from 'react'
import PropTypes from 'prop-types'
import autobind from 'autobind-decorator'
import classNames from 'classnames'

import {compose, withChildrenStyles, withCustomizableClasses, withChildClasses} from 'react-player-controls/dist/utils/composers.js'
import RangeControlOverlay from 'react-player-controls/dist/components/RangeControlOverlay.js'

const {number, bool, func, object} = PropTypes

/**
 * Seekable progress bar
 *
 * TODO: Make use of the range input element?
 */
class ProgressBar extends React.PureComponent {
    static propTypes = {
        totalTime: number,
        currentTime: number,
        bufferedTime: number,
        isSeekable: bool,
        onSeek: func,
        onSeekStart: func,
        onSeekEnd: func,
        onIntent: func,
        style: object,
    }

    static defaultProps = {
        totalTime: Infinity,
        currentTime: 0,
        bufferedTime: 0,
        isSeekable: false,
        onSeek: () => {},
        onSeekStart: () => {},
        onSeekEnd: () => {},
        onIntent: () => {},
        style: {},
    }

    constructor(props) {
        super(props)

        this.progressBarEl = null

        this.state = {
            currentIntent: 0,
        }
    }

  @autobind
    storeRef(rootEl) {
        this.progressBarEl = rootEl
    }

  @autobind
  handleSeek(relativeTime) {
      const {isSeekable, onSeek, totalTime} = this.props

      if (isSeekable) {
          onSeek(relativeTime * totalTime)
      }
  }

  @autobind
  handleSeekStart(relativeTime) {
      const {isSeekable, onSeekStart, totalTime} = this.props

      if (isSeekable) {
          onSeekStart(relativeTime * totalTime)
      }
  }

  @autobind
  handleSeekEnd(relativeTime) {
      const {isSeekable, onSeekEnd, totalTime} = this.props

      if (isSeekable) {
          onSeekEnd(relativeTime * totalTime)
      }
  }

  @autobind
  handleIntent(relativeTime) {
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
          totalTime, currentTime, bufferedTime, isSeekable,
          className, extraClasses, childClasses, style, childrenStyles,
      } = this.props
      const {currentIntent} = this.state

      const progressPercent = Math.min(100, 100 * currentTime / totalTime)
      const styleLeft = `${progressPercent}%`

      const isRewindIntent = currentIntent !== 0 && currentIntent < currentTime / totalTime

      return (
          <div
              className={classNames(className, extraClasses, 'seek-bar', {
                  isSeekable,
                  isRewindIntent,
              })}
              style={style}
              ref={this.storeRef}
          >
              <div
                  className={childClasses.buffered || 'ProgressBar-buffered'}
                  style={{width: `${Math.min(100, 100 * bufferedTime / totalTime)}%`, ...(childrenStyles.buffered || {})}}
              />

              <div
                  className={childClasses.elapsed || 'ProgressBar-elapsed'}
                  style={{width: styleLeft, ...(childrenStyles.elapsed || {})}}
              />

              <div
                  className={childClasses.intent || 'ProgressBar-intent'}
                  style={{width: `${currentIntent * 100}%`, ...(childrenStyles.intent || {})}}
              />

              <div
                  className={childClasses.handle || 'ProgressBar-handle'}
                  style={{left: styleLeft, ...(childrenStyles.handle || {})}}
              />

          </div>
      )
  }
}

export default compose(
    withChildrenStyles(),
    withCustomizableClasses('ProgressBar'),
    withChildClasses()
)(ProgressBar)
