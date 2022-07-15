import React, { useState, useEffect } from "react";
//  kaldırdım
// 7beb60fd8e0d46e2a49185238221507
import "./App.css";

function App() {
  const [coords, setCoords] = useState(null);
  const [current, setCurrent] = useState({
    temp_c: "",
    icon: "",
    feelslike_c: "",
  });
  const [location, setLocation] = useState({
    name: "",
    country: "",
    region: "",
    localtime: "",
  });

  const getLocation = () => {
    if (!navigator.geolocation) {
      alert("Geolocation bulunamadı");
    } else {
      navigator.geolocation.getCurrentPosition((position) => {
        setCoords(`${position.coords.latitude}, ${position.coords.longitude}`);
      });
    }
  };

  useEffect(() => {
    const apiURL = `http://api.weatherapi.com/v1/current.json?key=7beb60fd8e0d46e2a49185238221507&q=40.9940877, 28.770898&aqi=no`;
    fetch(apiURL)
      .then((res) => res.json())
      .then((data) => {
        setCurrent({
          temp: data.current.temp_c,
          icon: data.current.condition.icon,
          feelslike_c: data.current.feelslike_c,
        });
        setLocation({
          name: data.location.name,
          region: data.location.region,
          country: data.location.country,
          localtime: data.location.localtime,
        });
      });
  }, [coords]);
  // süslü parantezden sonra gelen [] işareti sayfa açıldığında bir
  // kere çalıştır anlamında kullanılmaktadır eğer bu işareti koymazsak
  // her seferinde useEffect çalışacak ve performansı olumsuz etkileyecektir.
  // dizinin içine girilen değer sayfa açıldfığında bir kere çalışır - güncellenir

  return (
    <div className="App">
      <span>{coords}</span>
      <button onClick={getLocation}>Hava durumunu getir</button>
      <div>
        <img src={current.icon} alt="" />
        <span>{current.temp}</span>
        <span>{current.feelslike_c}</span>
      </div>
      <div>
        <div>{location.name}</div>
        <div>{location.region}</div>
        <div>{location.country}</div>
        <div>{location.localtime}</div>
      </div>
    </div>
  );
}

export default App;
