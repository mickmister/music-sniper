import React from 'react'
import classnames from 'classnames'
import { displayTime } from '../../../util/display-time'

const HighlightMarker = ({highlight, left, fullLength, seek, className}) => {
  return (
    <React.Fragment>
      <button
        className={classnames('highlightMarker', className)}
        style={{left: `${left}%`}}
        onClick={() => seek(highlight)}
      >
        {displayTime(highlight)}
      </button>
    </React.Fragment>
  )
}

export default HighlightMarker
