
import './App.css';
import {useState} from "react";
import Predict from './components/Predict';
import heart from "../src/heart.png"


function App() {
  const [predictions,setPredictions]=useState()

  return (
    <div className="App">
      <header className="App-header">
      <img src={heart} alt="heart" />
        <h1>Heart Disease Prediction Model</h1>
       
      </header>
      <section>
      <Predict/>
        
      </section>
    </div>
  );
}

export default App;
