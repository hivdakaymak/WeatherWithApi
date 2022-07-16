import React, { useState, useEffect } from "react";
//  kaldırdım
// 7beb60fd8e0d46e2a49185238221507
import "./App.css";

function App() {
  const [loading, setLoading] = useState(null);
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
      setLoading(true)
      navigator.geolocation.getCurrentPosition((position) => {
        setCoords(`${position.coords.latitude}, ${position.coords.longitude}`);
      });
    }
  };

  useEffect(() => {
    setLoading(true);
    const apiURL = `http://api.weatherapi.com/v1/current.json?key=7beb60fd8e0d46e2a49185238221507&q=${coords}&aqi=no`;
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
        setLoading(false);
      });
  }, [coords]);
  // süslü parantezden sonra gelen [] işareti sayfa açıldığında bir
  // kere çalıştır anlamında kullanılmaktadır eğer bu işareti koymazsak
  // her seferinde useEffect çalışacak ve performansı olumsuz etkileyecektir.
  // dizinin içine girilen değer sayfa açıldfığında bir kere çalışır - güncellenir

  return (
    <div className="App">
      <span>{coords}</span>
      <button className="weatherButton" onClick={getLocation}>
        Hava durumunu getir
      </button>

      {!loading && (
        <div>
          <div className="weather">
            <img src={current.icon} alt="" />
            <div>
              Sıcaklık
              <span>{current.temp}</span>
            </div>
            <div>
              Hissedilen
              <span>{current.feelslike_c}</span>
            </div>
          </div>
          <div>
            <div className="location">
              <span>{location.name}</span> - <span>{location.region}</span> -{" "}
              <span>{location.country}</span>
            </div>
            <div className="time">{location.localtime}</div>
          </div>
        </div>
      )}
      {loading && (
        <div className="loading">
          <span>
            <img
              src="http://ecenazhediyelik.com/Assets/images/loader.gif"
              alt="yükleniyor"
            />
          </span>
        </div>
      )}
    </div>
  );
}

export default App;
