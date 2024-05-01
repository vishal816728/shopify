import './App.css'
import PrimarySearchAppBar from './Components/Navbar'
import { TextField, Button } from "@mui/material"

function App() {

  return (
    <div className="App">
      <PrimarySearchAppBar />
      <div style={{ margin: "0.25rem 0.5rem", display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column" }}>
        <h1>Hello world</h1>
        <form>
          <TextField
            style={{ minWidth: "20rem", margin: "5px" }}
            type="text"
            label="UserName"
            variant="outlined"
          />
        </form>
        <Button color="inherit" >Create</Button>
      </div>
    </div>
  )
}

export default App
