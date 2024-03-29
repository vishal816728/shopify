import { useEffect, useState } from "react"
import axios from "axios";
import Tap from "./Tap";

const App2 = () => {
  const [x,setX]=useState("")
  
  useEffect(()=>{
    async function changecolor(){
      const loadCss=await axios.get("http://localhost:8000/")
      setX(loadCss.data.style)
    }
    changecolor()
    console.log("x ",x)
  },[x])
  return (
    <div >
      <Tap x={x} />
    </div>
  )
}

export default App2