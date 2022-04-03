import React,{useState, useEffect} from "react";

const SearchWeather = () => {
  
  const API_KEY = '164f60aede6b0343964b89c9163fb8cc'
    const [search, setSearch] = useState('Berlin')
    const[data, setData] = useState([])
    const[input, setInput] = useState('')

    let componentMounted = true;

    useEffect (() => {
    const fetchWeather = async() =>{
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${search}&appid=${API_KEY}`);
        if(componentMounted){
            setData(await response.json())
            console.log(data)
        }
        return ( ) => {
            componentMounted = false;
        }
    }
    fetchWeather();

    }, [search]);

    let emoji= null
    if(typeof data.main != "undefined"){
      if( data.weather[0].main === "Coulds"){
        emoji ='fa-could'
      }else if( data.weather[0].main === "Thunderstorm"){
        emoji ='fa-bolt'
      }else if( data.weather[0].main === "Drizzle"){
        emoji ='fa-could-rain'
      }else if( data.weather[0].main === "Rain"){
        emoji ='fa-could-shower-heavy'
      }else if( data.weather[0].main ==="Snow"){
        emoji ='fa-snow-flake'
      }else {
        emoji= 'fa-smog'
      }
    }else{
      return(
        <div>.....loading</div>
      )
    }

    let temp = (data.main.temp - 273.15).toFixed(2)
    let temp_min = (data.main.temp_min - 273.15).toFixed(2)
    let temp_max = (data.main.temp_max - 273.15).toFixed(2)

    let d = new Date();
    let date = d.getDate()
    let year =d.getFullYear()
    let month = d.toLocaleDateString("default", {month:'long'})
    let day = d.toLocaleDateString("default", {weekday:'long'})

let time = d.toLocaleString([],{
  hour: '2-digit',
  minute:'2-digit',
  second:'2-digit'
});
const handleSubmit = (event) =>{
  event.preventDefault();
  setSearch(input)
}
    return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-4"> 
          <div className="card text-white text-center border-0">
            <img
              src={`https://source.unsplash.com/600x900/?${data.weather[0].main}`}
              className="card-img"
              alt="..."
            />
            <div className="card-img-overlay">
              <form onSubmit={handleSubmit}>
                <div className="input-group mb-3">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Search City"
                    aria-label="Search City"
                    aria-describedby="basic-addon2"
                    name="search" value={input}
                    onChange={(e)=>setInput(e.target.value)}
                    required
                    />
                 <button type="submit" className="input-group-text" id="basic-addon2">
                      <i className="fas fa-search"></i>
                  </button>
                </div>
              </form>
              <div className="card-body bg-dark bg-opacity-50 py-3 mb-4">
              <h2 className="card-title">{data.name}</h2>
              <p className="card-text lead">
                {day}, {month} {date},  {year}
                <br />
                {time}
              </p>
              <p className="card-text"></p>
              <hr />
              <i className={`fas ${emoji} fa-3x `}></i>
              <h1 className="fw-bolder mb-5">{temp} &deg;C</h1>
              <p className="lead fw-bolder mb-0">{data.weather[0].main}</p>
              <p className="lead">{temp_min}&deg;C | {temp_max}&deg;c</p>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchWeather;
