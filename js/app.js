window.addEventListener('load', ()=> {
  let long;
  let lat;
  let temperatureDescription = document.querySelector('.temperature-description');
  let temperatureDegree = document.querySelector('.temperature-degree');
  let locationTimezone = document.querySelector('.location-timezone');
  let latitude = document.querySelector('.latitude');
  let longitude = document.querySelector('.longitude');
  let temperatureSection =document.querySelector('.degree-section');
  const temperatureSpan = document.querySelector('.degree-section span');
  
  if(navigator.geolocation){
    navigator.geolocation.getCurrentPosition(position => {
      console.log(position);
      long = position.coords.longitude;
      lat = position.coords.latitude;
      const proxy  ="https://cors-anywhere.herokuapp.com/";
      const api = `${proxy}https://api.darksky.net/forecast/fa6e60570d3e821fb37ecc76b8c08bfe/${lat},${long}`;

      fetch(api)
      .then(response =>{
        return response.json();
      })
      .then(data => {
        console.log(data);
        const {temperature,summary,icon} = data.currently;
        // !Set DOM elements from API
        temperatureDegree.textContent = temperature;
        temperatureDescription.textContent = summary;
        locationTimezone.textContent = data.timezone;
        longitude.textContent = long;
        latitude.textContent = lat;

        // !FORMULA FOR CELSIUS
        let celsius = (temperature - 32) * (5 /9);
        // !Set Icons
        setIcons(icon,document.querySelector('.icon')); 
        // !Change temperature to Celsius/Ferenheit
        temperatureSection.addEventListener('click', () => {
          if(temperatureSpan.textContent === "F"){
            temperatureSpan.textContent = "C";
            temperatureDegree.textContent = Math.floor(celsius);
          }else{
            temperatureSpan.textContent ="F";
            temperatureDegree.textContent = temperature;
          }
        });
        
      })
    });
    function setIcons(icon, iconsID){
      const skycons = new Skycons({color:"white"});
      const currentIcon = icon.replace(/-/g, "_").toUpperCase();
      skycons.play();
      return skycons.set(iconsID, Skycons[currentIcon]);
    }

  }
});