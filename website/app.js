const d = new Date();
const date = `${d.getMonth()}.${d.getDate()}.${d.getFullYear()}`;
const time = `${d.getHours()}:${d.getMinutes()}`;
const apiKey = '&APPID=56ff4739e48e6ca6e4ff944ff2de599d';
const baseURL = 'http://api.openweathermap.org/data/2.5/weather?zip=';

// get API data
const getData = async (baseURL, zip, apiKey) => {
  const res = await fetch(`${baseURL}${zip}${apiKey}`);
  let weatherData;
  try {
    weatherData = await res.json();
  }  catch (error) {
    console.error(error);
  }
  return weatherData;
};

// post the API data
const postData = async (url = '', data = {}) => {
  const response = await fetch(url, {
    method: 'POST', 
    credentials: 'same-origin', 
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),    
  });

  try {
    const newData = await response.json();
    return newData;
  } catch (error) {
    console.error(error)
  }
}

// update UI

const updateUI = ({ date, feeling, temp }) => {
  document.getElementById('date').innerText = `Date: ${date}`;
  document.getElementById('temp').innerText = `Temperature: ${temp} °F`;
  document.getElementById('content').innerText = `I feel: ${feeling}`;
}


// onClick event handler
const onClickHandler = async () => {
  const newZip =  document.getElementById('zip').value;
  const zip = `${newZip},us`;

  const feeling = document.getElementById('feelings').value;

  // I prefer async/await over promise chaining, hope it's OK :)

  const weatherData = await getData(baseURL, zip, apiKey);

  if (weatherData) {
    const { main: { temp }, name, weather } = weatherData;
    const postResult = await postData('/post', { 
      temp, 
      description: weather[0].description,
      name,
      feeling,
      date,
      time,
    });
    if (postResult && postResult.temp) {
      updateUI(postResult)
    }
  }
}

const generateCtaBtn = document.getElementById('generate');

// bind the onClick event handler to generate button
generateCtaBtn.addEventListener('click', onClickHandler);