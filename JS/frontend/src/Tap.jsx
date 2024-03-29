import {useState} from 'react'

const Tap = (props) => {
    console.log(props)

  return (
    <div>
        <h2 className={`${props.x ? props.x : 'bg-green-300'} hover:bg-green-400`}>ap</h2>
    </div>
  )
}

export default Tap