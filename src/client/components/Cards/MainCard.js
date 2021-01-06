import React from 'react'

const MainCard = ({classes, styles, children}) => {
  return (
    <div className={`card-main ${classes || ""}`} style={{ ...styles }} >
      { children }
    </div>
  )
}

export default MainCard
