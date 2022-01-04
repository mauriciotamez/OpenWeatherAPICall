import axios from "axios";
import { useEffect, useState } from "react";
import moment from "moment";

const API = () => {

    // useStates  ----------------------------------------------------------------------------------------------------------------------------------------------
    const [data, setData] = useState(null);
    const [button, setButton] = useState(true);
    
    // Get user coords to later use on the endpoint four our request to te API via AXIOS -----------------------------------------------------------------------
    useEffect(() => {

        const error = () => alert("Sorry, you need to allow Geolocation in order to use this website.");
   
        const options = { enableHighAccuracy: false, maximumAge: 30000, timeout: 27000 };
        
        const success = (position) => {
            const lat = position.coords.latitude.toFixed(2);
            const lon = position.coords.longitude.toFixed(2);   
            axios
            .get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=efb990a58f6c2110b7599bb221cc00ae`)
            .then(res => {
                setData(res.data)
                console.log(res.data)
            });
        };
        
        navigator.geolocation.getCurrentPosition(success,error,options);

    }, []);
    
    //  Functions for our buttons to execute in the onClicks----------------------------------------------------------------------------------------------------
    const btnStateFn = () => setButton(!button);
    
    const reloadIconFN = () => window.location.reload();
    
    // Convert Kelvin to Celsius
    const kelvinToCelsius = (data) =>  data = parseFloat(data-273.15).toFixed(1);

    // Convert Kelvin to Fahrenheit
    const kelvinToFahrenheit = (data) => data = parseFloat((data-273.15)*1.8+32).toFixed(1);
   
    // Declare the data that we are going to use as parameters on the functions that convert Kelvin to other units  --------------------------------------------
   let mainTemp = data?.main.temp
   let minTemp =  data?.main.temp_min
   let maxTemp = data?.main.temp_max
    
    // JSX -----------------------------------------------------------------------------------------------------------------------------------------------------
    return (
        <div className="weatherCard">
            <h1>{data?.name},{data?.sys.country}</h1>
            <div className="data">
                <ul>
                    <i className="fas fa-cloud"></i>
                    <i className="fas fa-wind"></i>
                    <i className="fas fa-tint"></i>
                    <li>
                        <span className="des1">{data?.weather[0].description}</span>
                    </li>
                    <li>
                        <span className="des2">Wind Speed is {data?.wind.speed}
                            <span className="lower"> m/s </span>
                        </span>
                    </li>
                    <li>
                        <span className="des3">Humidity : {data?.main.humidity} %</span>
                    </li>
                </ul>
                <div className="minMaxTemp">
                    <span>Min temp is {
                        button 
                        ? kelvinToCelsius(minTemp) 
                        : kelvinToFahrenheit(minTemp)
                    } 
                    <span className="grades">{button ? "C°" : "F°"}</span> /           
                    </span>
                    <span>Max temp is {
                        button 
                        ? kelvinToCelsius(maxTemp) 
                        : kelvinToFahrenheit(maxTemp)
                    } 
                        <span className="grades">{button ? "C°" : "F°"} </span> 
                    </span>
                </div> 
                <p className="date">{moment().format("dddd")} {moment().format("LL")}</p>
                <button className="btn" onClick={btnStateFn}> Metric C° / Imperial F°</button>
                <span className="temp">
                    {
                        button 
                        ? kelvinToCelsius(mainTemp) 
                        : kelvinToFahrenheit(mainTemp)
                    }
                    <span className="grades">{button ? "C°" : "F°"}</span>
                </span>
                <button onClick={reloadIconFN} className="btn2"> <i className="fas fa-sync-alt"></i> </button>
                <img src={`https://openweathermap.org/img/wn/${data?.weather[0]?.icon}@2x.png`} alt="" />
            </div>
        </div>
    );
};

export default API;