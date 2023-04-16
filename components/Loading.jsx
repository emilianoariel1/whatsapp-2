import React from 'react'
import { SpinnerCircularSplit } from 'spinners-react'

function Loading() {
  return (
    <center style={{ display: "grid", placeItems: "center", height: "100vh", }}>
        <div>
            
            <SpinnerCircularSplit size={250}/>
        </div>
    </center>
  )
}

export default Loading