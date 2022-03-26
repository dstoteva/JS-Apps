function attachEvents() {
    let loadBtn = document.querySelector('button.load');
    let addBtn = document.querySelector('button.add');

    let allCatches = document.getElementById('catches');
    let copy = allCatches.children[0].cloneNode(true);
    allCatches.firstChild.remove();

    loadBtn.addEventListener('click', load);

    function load(){
        fetch('https://fisher-game.firebaseio.com/catches.json')
        .then(response => response.json())
        .then(data => {
            allCatches.innerHTML = '';
            Object.keys(data).forEach(key => {
                let catchTemplate = copy.cloneNode(true);
                let catchData = data[key];
                let updateBtn = catchTemplate.querySelector('button.update');
                let deleteBtn = catchTemplate.querySelector('button.delete');

                catchTemplate.setAttribute('data-id', key);
                catchTemplate.getElementsByClassName('angler')[0].value = catchData.angler;
                catchTemplate.getElementsByClassName('weight')[0].value = catchData.weight;
                catchTemplate.getElementsByClassName('species')[0].value = catchData.species;
                catchTemplate.getElementsByClassName('location')[0].value = catchData.location;
                catchTemplate.getElementsByClassName('bait')[0].value = catchData.bait;
                catchTemplate.getElementsByClassName('captureTime')[0].value = catchData.captureTime;

                    updateBtn.addEventListener('click', () => {
                        fetch(`https://fisher-game.firebaseio.com/catches/${key}.json`, {
                            method: 'PUT',
                            body: JSON.stringify({
                                'angler': catchTemplate.getElementsByClassName('angler')[0].value,
                                'weight': catchTemplate.getElementsByClassName('weight')[0].value,
                                'species': catchTemplate.getElementsByClassName('species')[0].value,
                                'location': catchTemplate.getElementsByClassName('location')[0].value,
                                'bait': catchTemplate.getElementsByClassName('bait')[0].value,
                                'captureTime': catchTemplate.getElementsByClassName('captureTime')[0].value
                            })
                        })
                        .then(load);    
                    });

                deleteBtn.addEventListener('click', () => {
                    fetch(`https://fisher-game.firebaseio.com/catches/${key}.json`, {
                        method: 'DELETE'
                    })
                    .then(load);
                });

                allCatches.appendChild(catchTemplate);              
            });
        });
    };

    addBtn.addEventListener('click', () => {
        let addForm = document.getElementById('addForm');
        let angler = addForm.querySelector('input.angler');
        let weight = addForm.querySelector('input.weight');
        let species = addForm.querySelector('input.species');
        let location = addForm.querySelector('input.location');
        let bait = addForm.querySelector('input.bait');
        let captureTime = addForm.querySelector('input.captureTime');

        if(angler.value != '' && weight.value != '' && species.value != '' && location.value != '' 
        && bait.value != '' && captureTime.value != ''){
            fetch('https://fisher-game.firebaseio.com/catches.json', {
                method: 'POST',
                body: JSON.stringify({
                    'angler': angler.value,
                    'weight': weight.value,
                    'species': species.value,
                    'location': location.value,
                    'bait': bait.value,
                    'captureTime': captureTime.value
                })
            })
            .then(load);
        }
        angler.value = '';
        weight.value = '';
        species.value = '';
        location.value = '';
        bait.value = '';
        captureTime.value = '';
    });

    function elementFactory(tagName, className, text, attr){
        let currentElement = document.createElement(tagName);
        
        if(className){
            currentElement.className = className;
        }
        
        if(text){
            currentElement.textContent = text;
        }
        if(attr){
            currentElement.setAttribute(attr.name, attr.value);
        }
        return currentElement;
    };
}

attachEvents();

