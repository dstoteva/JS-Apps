function attachEvents() {
    let locationInput = document.getElementById('location');
    let weatherBtn = document.getElementById('submit');
    let weatherSymbols = {
        'Sunny': '☀',
        'Partly sunny': '⛅',
        'Overcast': '☁',
        'Rain': '☂',
        'Degrees': '°'
    }

    weatherBtn.addEventListener('click', () => {
        fetch('https://judgetests.firebaseio.com/locations.json')
        .then((response) => response.json())
        .then((data) => {
            let currentWeaterDiv = document.getElementById('current');
            let upcomingWeatherDiv = document.getElementById('upcoming');

            if(document.getElementsByClassName('error')[0]){
                //if an error is thrown in the previous submition:
                //hides error div
                //displays weather divs
                document.getElementsByClassName('error')[0].style.display = 'none';
                currentWeaterDiv.style.display = 'block';
                upcomingWeatherDiv.style.display = 'block';
            }
            else{
                //in any other case removes info from previous submition in weather divs
                currentWeaterDiv.lastChild.remove();
                upcomingWeatherDiv.lastChild.remove();
            }

            document.getElementById('forecast').style.display = 'block';
            
            let targetCode = data.filter(x => x.name === locationInput.value)[0].code;
            
            fetch(`https://judgetests.firebaseio.com/forecast/today/${targetCode}.json`)
            .then((r) => r.json())
            .then((d) => {
                let locationName = d.name;
                let forecast = d.forecast;

                let div = elementFactory('div', 'forecasts');
                
                let symbolSpan = elementFactory('span', 'condition symbol', weatherSymbols[forecast.condition]);
                let conditionSpan = elementFactory('span', 'condition');

                let forecastLocationSpan = elementFactory('span', 'forecast-data', locationName);
                let tempString = `${forecast.low}${weatherSymbols.Degrees}/${forecast.high}${weatherSymbols.Degrees}`;
                let forecastTempSpan = elementFactory('span', 'forecast-data', tempString);
                let forecastConditionSpan = elementFactory('span', 'forecast-data', forecast.condition);

                conditionSpan.appendChild(forecastLocationSpan);
                conditionSpan.appendChild(forecastTempSpan);
                conditionSpan.appendChild(forecastConditionSpan);
               
                div.appendChild(symbolSpan);
                div.appendChild(conditionSpan);

                currentWeaterDiv.appendChild(div);
            });

            fetch(`https://judgetests.firebaseio.com/forecast/upcoming/${targetCode}.json`)
            .then((r) => r.json())
            .then((d) => {
                let threeDayForecast = d.forecast;

                let div = elementFactory('div', 'forecast-info');

                for(let day of threeDayForecast){
                    let daySpan = elementFactory('span', 'upcoming');

                    let symbolSpan = elementFactory('span', 'symbol', weatherSymbols[day.condition]);
                    let tempString = `${day.low}${weatherSymbols.Degrees}/${day.high}${weatherSymbols.Degrees}`;
                    let tempSpan = elementFactory('span', 'forecast-data', tempString);
                    let conditionSpan = elementFactory('span', 'forecast-data', day.condition);

                    daySpan.appendChild(symbolSpan);
                    daySpan.appendChild(tempSpan);
                    daySpan.appendChild(conditionSpan);

                    div.appendChild(daySpan);
                }
                upcomingWeatherDiv.appendChild(div);
            });
        })
        .catch(displayError);
    });
    function displayError(){
        //displays error in the forecast section
        //displays error div
        //hides weather divs
        let forecastSecion = document.getElementById('forecast');

        let errorDiv = elementFactory('div', 'error', 'Error');
        forecastSecion.appendChild(errorDiv);

        document.getElementById('current').style.display = 'none';
        document.getElementById('upcoming').style.display = 'none';

        forecastSecion.style.display = 'block';
    };
    function elementFactory(tagName, className, text){
        let currentElement = document.createElement(tagName);
        
        if(className){
            currentElement.className = className;
        }
        
        if(text){
            currentElement.textContent = text;
        }
        
        return currentElement;
    };
}

attachEvents();