import React from 'react'

type Props = {
  onClick: () => void,
  className: string,
  children: string,
  disabled?: boolean,
}

export default function Button(props: Props) {
  const {onClick, className, children, disabled} = props

  return (
    <button
      disabled={disabled}
      className={`btn btn-primary ${className}`}
      onClick={onClick}
    >
      {children}
    </button>
  )
}
