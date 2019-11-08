import React, {useEffect, useState} from 'react'

import {displayTime} from '../../../util/display-time'

const getTimeString = (fullLength, position) => {
    const time = fullLength * (position / 100)
    return displayTime(time)
}

const useFadeIn = () => {
    const [className, setClassName] = useState('fading')
    useEffect(() => {
        setClassName('fade-in fading')
        return () => {
            return new Promise((r) => {
                setClassName('fade-out fading')
                r()
            })
        }
    })
    return className
}

const TimePopover = ({fullLength, position, show}) => {
    // const className = useFadeIn()
    // console.log(className)
    console.log('dude')

    return (
        <div
            style={{opacity: show ? 1 : 0, left: `${position}%`, top: '30', position: 'absolute'}}
            className={'fading'}
        >
            <span>{getTimeString(fullLength, position)}</span>
        </div>
    )
}

export default TimePopover
