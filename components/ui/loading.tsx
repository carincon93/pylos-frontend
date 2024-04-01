import React from 'react'

const Loading = React.forwardRef<HTMLInputElement>(function LoadingComponent(props, ref) {
    return (
        <span
            className="loader"
            ref={ref}
            {...props}
        />
    )
})

export { Loading }
