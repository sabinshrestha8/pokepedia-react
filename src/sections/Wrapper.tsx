import React from "react"

// Higher Order Component (HOC)
const Wrapper = (Component: React.FC) => () => {
  return (
    <div className="content">
      <Component />
    </div>
  )
}

export default Wrapper
