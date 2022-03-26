function getInfo() {
    let stopId = document.getElementById('stopId');
    let stopName = document.getElementById('stopName'); 
    let buses = document.getElementById('buses');
    buses.textContent = '';
    fetch(`https://judgetests.firebaseio.com/businfo/${stopId.value}.json`)
    .then((response) => response.json())
    .then(function(data){       
        stopName.textContent = data.name;

        Object.keys(data.buses).forEach((k) => {
            let li = document.createElement('li');
            li.innerHTML = `Bus ${k} arrives in ${data.buses[k]} minutes`;
            buses.appendChild(li);
        });

    })
    .catch(() => {
        stopName.textContent = 'Error';
    });
    
    stopId.value = '';
}