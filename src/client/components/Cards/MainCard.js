import React from 'react'

const MainCard = ({classes, styles, children}) => {
  return (
    <div className={`card-main align-hori-center ${classes || ""}`} style={{ ...styles }} >
      { children }
    </div>
  )
}

export default MainCard
