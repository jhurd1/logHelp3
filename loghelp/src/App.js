import React, {useEffect} from 'react';
import './SCSS/index.css';
import TakeInput from "./TakeInput";

function App() {
    //test hook outside of class
        useEffect(() => {
            fetch("/TakeInput").then(response => {
                return response.json().then(data => {
                    console.log(data);
                });
            })
        }, []);
  return (
      <div className="TakeInput">
        <TakeInput/>
      </div>
  );
}

export default App;
