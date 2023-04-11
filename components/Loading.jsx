import React from 'react'
import { SpinnerCircularSplit } from 'spinners-react'

function Loading() {
  return (
    <center style={{ display: "grid", placeItems: "center", height: "100vh", }}>
        <div>
            <img 
            src="https://www.pngmart.com/files/11/Chat-Logo-PNG-Photos.png" 
            alt=""
            style={{ marginBottom: 10 }} 
            height={200}
            />
            <SpinnerCircularSplit />
        </div>
    </center>
  )
}

export default Loading