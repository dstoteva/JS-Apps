function solve() {
    let currentId = 'depot';
    let info = document.getElementById('info');
    let departBtn = document.getElementById('depart');
    let arriveBtn = document.getElementById('arrive');

    function depart() {
        fetch(`https://judgetests.firebaseio.com/schedule/${currentId}.json`)
        .then((data) => data.json())
        .then(function(s){
            departBtn.disabled = true;
            arriveBtn.disabled = false;
            info.textContent = `Next stop ${s.name}`;
        })
        .catch(() => {
            departBtn.disabled = true;
            arriveBtn.disabled = true;
            info.textContent = 'Error';
        })
    }

    function arrive() {
        fetch(`https://judgetests.firebaseio.com/schedule/${currentId}.json`)
        .then((data) => data.json())
        .then(function(s){
            departBtn.disabled = false;
            arriveBtn.disabled = true;
            info.textContent = `Arriving at ${s.name}`;
            currentId = s.next;
        })
        .catch(() => {
            departBtn.disabled = true;
            arriveBtn.disabled = true;
            info.textContent = 'Error';
        })
    }
    
    return {
        depart,
        arrive
    };
}

let result = solve();