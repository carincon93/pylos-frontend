import React from 'react'

interface Props {
    className?: string
}

const Loading = React.forwardRef<HTMLInputElement, Props>(function LoadingComponent({ className }, ref) {
    return (
        <span
            className={`loader ${className}`}
            ref={ref}
        />
    )
})

export { Loading }
