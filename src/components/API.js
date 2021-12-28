import axios from 'axios';
import { useEffect, useState } from 'react';


const API = () => {

    const [data, setData] = useState(null);
    const [button, setButton] = useState();
    
    
    // Call OpenWeather API
    
    useEffect(() => {

        const error = () => {
            alert("Sorry, no position available.")
        };
            
        const options = {
            enableHighAccuracy: true,
            maximumAge: 30000,
            timeout: 27000
        };
        
        const success = (position) => {
            const lat = position.coords.latitude;
            const lon = position.coords.longitude;   
            axios
            .get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=efb990a58f6c2110b7599bb221cc00ae`)
            .then(res => {
                setData(res.data)
                console.log(res.data)
            });
        };
        
        navigator.geolocation.getCurrentPosition(success,error,options);

    }, []);
    
    
    const btnFunction = () => {
        setButton(kelvinToFahrenheit(num))
    }
    
    // Convert Kelvin to Celsius

    const kelvinToCelsius = (num) =>  num = parseFloat(num-273.15).toFixed(1);
    

    // Convert Kelvin to Fahrenheit

    const kelvinToFahrenheit = (num) => num = parseFloat((num-273.15)*1.8.toFixed(1))+32;

    let num = data?.main.temp
    
    // JSX

    return (
        <div className='weatherCard'>
            <h1>{data?.name}, {data?.sys.country}</h1>
            <div className='data'>
                <ul>
                    <i class="fas fa-cloud"></i>
                    <i class="fas fa-wind"></i>
                    <i class="fas fa-tint"></i>
                    <li><span className='des1'>{data?.weather[0].description}</span></li>
                    <li><span className='des2'>Wind Speed is {data?.wind.speed}<span className='lower'> m/s </span></span></li>
                    <li><span className='des3'>Humidity is {data?.main.humidity}</span></li>
                </ul>
                <button className='btn' onClick={btnFunction}>°C to °F</button>
                <span className='temp'>{button}{kelvinToCelsius(num)}<span className='grades'>°C</span></span>
                <img src={`https://openweathermap.org/img/wn/${data?.weather[0]?.icon}@2x.png`} alt="" />
                
            </div>
            
            
        </div>
    );
};

export default API;