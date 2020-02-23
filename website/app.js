/* Global Variables */

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();

const apiKey = '&APPID=56ff4739e48e6ca6e4ff944ff2de599d';
const baseURL = 'http://api.openweathermap.org/data/2.5/weather?zip=';

// get API data
const getEntry = async (baseURL, zip, key) => {
  const res = await fetch(`${baseURL}${zip}${key}`);
  try {
    const weatherData = await res.json();
    console.log(weatherData);
    return weatherData;
  }  catch (error) {
    console.error(error);
  }
};

// post the API data
const postData = async (url = '', data = {}) => {
  const response = await fetch(url, {
    method: 'POST', 
    credentials: 'same-origin', 
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data), // body data type must match "Content-Type" header        
  });

  try {
    const newData = await response.json();
    return newData;
  } catch (error) {
    console.error(error)
  }
}

