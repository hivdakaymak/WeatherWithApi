import React, { useState,  } from "react";
// useEffect kaldırdım
import "./App.css";

function App() {
  const [coords, setCoords] = useState(null);

  const getLocation = () => {
    if (!navigator.geolocation) {
      alert("Geolocation bulunamadı");
    } else {
      navigator.geolocation.getCurrentPosition((position) => {
        setCoords(`${position.coords.latitude}, ${position.coords.longitude}`);
      });
    }
  };

  return (
    <div className="App">
      <span>{coords}</span>
      <button onClick={getLocation}>Hava durumunu getir</button>
    </div>
  );
}

export default App;
