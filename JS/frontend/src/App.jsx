import './App.css';
import {Route,Routes} from "react-router-dom"
import Home from './Screens/Home.jsx';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<Home />} ></Route>
      </Routes>  
    </div>
  );
}

export default App;
