import React from 'react'
import Button from '@material-ui/core/Button'

type Props = {
    onClick: () => void,
    className: string,
    children: string,
    disabled?: boolean,
}

export default function CustomButton(props: Props) {
    const {onClick, className, children, disabled} = props

    return (
        <Button
            variant='contained'
            color='primary'
            disabled={disabled}
            className={className}
            onClick={onClick}
        >
            {children}
        </Button>
    )
}
