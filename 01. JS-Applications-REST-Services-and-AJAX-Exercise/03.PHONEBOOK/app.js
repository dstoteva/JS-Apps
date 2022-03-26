function attachEvents() {
    let loadBtn = document.getElementById('btnLoad');
    let createBtn = document.getElementById('btnCreate');
    let phonebook = document.getElementById('phonebook');

    let load = function () {
        fetch('https://phonebook-nakov.firebaseio.com/phonebook.json')
        .then((data) => data.json())
        .then((kvp) => {
            Object.entries(kvp).forEach(contact => {  
                let contactKey = contact[0];           

                let li = document.createElement('li');
                li.textContent = `${contact[1].person}: ${contact[1].phone}`;

                let deleteBtn = document.createElement('button');
                deleteBtn.innerHTML = 'Delete';

                deleteBtn.addEventListener('click', function(){
                    fetch(`https://phonebook-nakov.firebaseio.com/phonebook/${contactKey}.json`, {
                        method: 'delete',
                    }).then((r) => r.json()) //Returns null!!??????????
                    .catch((err) => console.log("Just leaving the error here."));
                    phonebook.textContent = '';
                    load();
                });
                
                li.append(deleteBtn);
                phonebook.appendChild(li);

            });
        })
    };
    loadBtn.addEventListener('click', load);

    createBtn.addEventListener('click', function() {
        let personName = document.getElementById('person');
        let personPhone = document.getElementById('phone');
        fetch('https://phonebook-nakov.firebaseio.com/phonebook.json', {
            method: 'POST',
            body: JSON.stringify({
                "person": personName.value,
                "phone": personPhone.value
            })
        }).then(() => {
            personName.value = '';
            personPhone.value = '';
            phonebook.textContent = '';
            load();
        });
    });
}

attachEvents();