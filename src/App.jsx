import React, {useState, useEffect} from 'react'
import './App.css'
import sun from '../src/assets/sun.svg'
import rain from '../src/assets/rain.svg'
import wind from '../src/assets/wind.svg'
import clouds from '../src/assets/clouds.svg'
import searchicon from '../src/assets/searchicon.svg'
import suncloud from '../src/assets/sun.png'

const api = {
  key: "7bb2c23da5b457b33289f08024baa77a",
  base: "https://api.openweathermap.org/data/2.5/"
}


function App() {
  
  useEffect(() => {
    document.querySelector('html').setAttribute('data-theme' , "light");
  }, []);

  const dataBuild = (d) => {
    let date = String(new window.Date());
    date = date.slice(3, 15);
    return date;
  }

  const [query, setQuery] = useState("");
  const [weather, setWeather] = useState({});
  
  const search = (e) => {
    e.preventDefault(); // ป้องกันการรีเฟรชหน้าเว็บ
    fetch(`${api.base}weather?q=${query}&units=metric&appid=${api.key}`)
      .then((res) => res.json())
      .then((results) => {
        setQuery("");
        setWeather(results);
      })
  }

  return (
    <div className='h-screen bg-indigo-600 overflow-hidden'>
      <div className='w-full flex justify-center items-center'>
        <div className='md:w-5/12 lg:w-4/12 w-6/12 pt-5'>
          <form onSubmit={search} className='flex justify-center items-center gap-2 hover:scale-105 hover:ease-in-out duration-300'>
            <input
              className='border-2 p-3 w-full rounded-3xl'
              type='text'
              placeholder='Search...'
              onChange={(e) => setQuery(e.target.value)}
              value={query}
            />
            <button type='submit' className='bg-white p-3 rounded-full hover:scale-105 hover:ease-in-out duration-300 hover:bg-slate-200'>
              <img src={searchicon} alt="Search Icon"/>
            </button>
          </form>
        </div>
      </div>
      <div className='w-full'>
        {weather.main ? (
        <div>
          <div className='flex justify-center mt-20'>
            <div className='bg-white p-2 rounded-2xl md:w-5/12 lg:w-3/12 w-6/12 grid grid-cols-1 gap-3 text-center'>
              <div>
                <p className='text-2xl font-semibold'>{weather.name}, {weather.sys.country}</p>
                <p className='text-5xl text-center font-bold'>{Math.round(weather.main.temp)}°C</p>
              </div>
              <div className='flex justify-center'>
                <img src={
                  weather.weather[0].main === "Snow" ? snow :
                  weather.weather[0].main === "Rain" ? rain :
                  weather.weather[0].main === "Clouds" ? clouds :
                  weather.weather[0].main === "Wind" ? wind :
                  sun
                } 
                alt={weather.weather[0].main} 
                className='w-8/12'
                />
              </div>
              <div>
                <p className='text-md font-semibold'>{weather.weather[0].main}</p>
                <p className='text-md font-semibold'>{dataBuild()}</p>
              </div>
            </div>
          </div>
        </div>
        ) :(
        <div className='flex flex-col justify-center items-center mt-20'>
          <div className='w-1/3 md:w-1/4 lg:w-1/5 flex justify-center'>
            <img className='' src={suncloud}/>
          </div>
          <p className='sm:text-3xl text-2xl font-bold text-slate-100'>What's The Weather?</p>
        </div>
         
        )}

      </div>      
    </div>
  );
}

export default App
