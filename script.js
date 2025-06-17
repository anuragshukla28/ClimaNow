document.addEventListener('DOMContentLoaded',()=>{

    // grab all the data
    const cityinput=document.getElementById('city-input');
    const fetchbtn=document.getElementById('get-weather-btn');
    const weatherInfo=document.getElementById('weather-info');
    const cityName=document.getElementById('city-name');
    const tempreture=document.getElementById('tempreture');
    const humidity=document.getElementById('humidity');
    const description=document.getElementById('description');
    const errorMsg=document.getElementById('error-message');
    const weatherIcon = document.getElementById('weather-icon');

    const API_KEY ="e7916d8a941e9ab8607baa605670bb91";// env variables

    
     fetchbtn.addEventListener('click',async ()=>{
     const city= cityinput.value.trim();
     if(!city)return;

     // while calling in another server or database remember server may throw you some error go gurantee of response
     // database is always in another continent

     try {
     const weatherdata= await  fetchweatherdata(city);
     displayData(weatherdata);
        
     } catch (error) {
        displayerror();
     }


    });

    async function fetchweatherdata(city){
        // gets the data

        // web request ki hai and it got the data
        // if not then it has thrown error

        const url=`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`;

       const response =await fetch(url);
    //    console.log(typeof response);
    //    console.log("RESPONSE",response);

       if(!response.ok){
        throw new Error("City not found");
        
       }
      const data= await response.json();

      return data;



    }


    
    function displayData(data){
        // display data
        console.log(data);

        const {name,main,weather}=data;
        cityName.textContent=name;

        const iconCode = weather[0].icon;
        weatherIcon.src = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
        weatherIcon.classList.remove("hidden");

        tempreture.textContent=`Tempreture: ${(main.temp - 273.15).toFixed(1)}°C`;
        humidity.textContent=`Humidity: ${main.humidity}`;
        description.textContent=`Weather: ${weather[0].description} `




        // unlock the display
        weatherInfo.classList.remove("hidden");
        errorMsg.classList.add("hidden")

    }


    function displayerror(){
        // error messsage display
        weatherInfo.classList.add('hidden');      // Hide weather info
        errorMsg.classList.remove('hidden');      // Show error message
        weatherIcon.classList.add("hidden");  
    }


    











});