import React, { Component } from 'react';
import classnames from 'classnames';
import RangeControlOverlay from 'react-player-controls/dist/components/RangeControlOverlay';

import TimePopover from '../time-popover/time-popover'
import HighlightMarker from '../highlight-marker/highlight-marker'

// import '../../../styles/react-player-controls.scss'
import './seek-bar.scss'

type SeekBarProps = {
  totalTime?: any,
  currentTime?: any,
  bufferedTime?: any,
  isSeekable: boolean,
  onSeek?: any,
  onSeekStart?: any,
  onSeekEnd?: any,
  onIntent?: any,
  style?: any,
  lastTouched?: string,
  className?: any,
  leftCircle?: any,
  fullLength: number,
  highlights: number[],
};
type SeekBarState = {
  currentIntent: any | number
};

class SeekBar extends Component<SeekBarProps, SeekBarState> {
  static defaultProps = {
    totalTime: 100,
    currentTime: 2,
    bufferedTime: 0,
    isSeekable: true,
    onSeek: (num: number) => {
      console.log(`Seek ${num}`);
    },
    onSeekEnd: (num: number) => {
      console.log(`Seek end ${num}`);
    },
    onSeekStart: (num: number) => {
      console.log(`Seek start ${num}`);
    },
    onIntent: (num: number) => {
      console.log(`Intent ${num}`);
    },
    style: {}
  };

  progressBarEl: HTMLElement | null = null;
  state = {
    currentIntent: 0,
  }

  storeRef = (rootEl: HTMLElement) => {
    this.progressBarEl = rootEl;
  }

  handleSeek = (relativeTime: number) => {
    debugger
    const { isSeekable, onSeek, totalTime } = this.props;
    if (isSeekable) {
      onSeek(relativeTime * totalTime);
    }
  }

  handleSeekStart = (relativeTime: number) => {
    const { isSeekable, onSeekStart, totalTime } = this.props;
    if (isSeekable) {
      onSeekStart(relativeTime * totalTime);
    }
  }

  handleSeekEnd = (relativeTime: number) => {
    const { isSeekable, onSeekEnd, totalTime, fullLength } = this.props;
    if (isSeekable) {
      // this.props.seek(relativeTime * fullLength)
      this.props.seek(relativeTime * totalTime)
      onSeekEnd(relativeTime * totalTime);
    }
  }

  handleIntent = (relativeTime: number) => {
    const { isSeekable, onIntent, totalTime } = this.props;
    const intent = isSeekable ? relativeTime : 0;
    this.setState({
      ...this.state,
      currentIntent: intent
    });
    if (isSeekable) {
      onIntent(relativeTime * totalTime);
    }
  }
  render() {
    const {
      totalTime,
      currentTime,
      isSeekable,
      style,
      lastTouched,
      className,
      leftCircle,
    } = this.props;
    const { currentIntent } = this.state;
    const isRewindIntent =
    currentIntent !== 0 && currentIntent < currentTime / totalTime;

    console.log('seekbar', currentTime)
    const seekPopoverPosition = lastTouched === 'SEEK' ? leftCircle.position : currentIntent * 100

    return (
      <div
        className={classnames(className, 'seek-bar', 'ProgressBar', {
          isSeekable,
          isRewindIntent
        })}
        style={style}
        ref={this.storeRef}
      >
        <div
          className={'ProgressBar-elapsed'}
          // className={childClasses.elapsed || 'ProgressBar-elapsed'}
          style={{
            width: `${leftCircle.position}%`,
            // ...(childrenStyles.elapsed || {})
          }}
        />

        <div
          className={classnames({selectedCircle: leftCircle.selected}, 'seekBarCircle', 'ProgressBar-handle')}
          style={{
            left: `${leftCircle.position}%`,
            // ...(childrenStyles.handle || {}),
          }}
        />

        {isSeekable && (
          <RangeControlOverlay
            className={'ProgressBar-seek'}
            // className={childClasses.seek || 'ProgressBar-seek'}
            // style={childrenStyles.RangeControlOverlay}
            bounds={() => this.progressBarEl.getBoundingClientRect()}
            onChange={this.handleSeek}
            onChangeStart={this.handleSeekStart}
            onChangeEnd={this.handleSeekEnd}
            onIntent={this.handleIntent}
          />
        )}

        <TimePopover
          show={this.props.showPopover}
          lastTouched={this.props.lastTouched}
          leftCircle={leftCircle}
          currentIntent={currentIntent}
          fullLength={this.props.fullLength}
          position={seekPopoverPosition}
        />

        {this.props.highlights.map((highlight, i: number) => (
          <HighlightMarker
            key={i}
            className={'seekBarHighlight'}
            highlight={highlight}
            left={(highlight/this.props.fullLength) * 100}
            fullLength={this.props.fullLength}
            seek={this.props.seek}
          />
        ))}

      </div>
    );
  }
}
export default SeekBar
