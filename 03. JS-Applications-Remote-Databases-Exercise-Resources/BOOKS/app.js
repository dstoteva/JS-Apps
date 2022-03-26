function addEvents(){
    const kinveyUserName = 'guest';
    const kinveyPassword = 'guest';
    const appKey = 'kid_SJmmXzIGH';
    const appSecret = 'cd1d54c5774e439a8b44675774322b33';
    const baseUrl = 'https://baas.kinvey.com/appdata/kid_SJmmXzIGH/books';
    
    let submitBtn = document.querySelector('#submitBtn');
    let loadBtn = document.querySelector('#loadBooks');
    
    document.getElementsByTagName('tbody')[0].innerHTML = ''

    function load(){
        fetch(baseUrl, {
            credentials: 'include',
            Authorization: 'Basic ' + btoa(`${kinveyUserName}:${kinveyPassword}`),
        }).then(response => response.json())
        .then(data => {
            let body = document.getElementsByTagName('tbody')[0];
            body.innerHTML = '';

            Object.keys(data).forEach(key => {
                let tr = elementFactory('tr');
                let book = data[key];

                let bookTitle = elementFactory('td', book.title);
                let bookAutohr = elementFactory('td', book.author);
                let bookISBN = elementFactory('td', book.isbn);
                let buttonsHolder = elementFactory('td');
                let editBtn = elementFactory('button', 'Edit');
                let deleteBtn = elementFactory('button', "Delete");

                buttonsHolder.appendChild(editBtn);
                buttonsHolder.appendChild(deleteBtn);
                tr.appendChild(bookTitle);
                tr.appendChild(bookAutohr);
                tr.appendChild(bookISBN);
                tr.appendChild(buttonsHolder);

                body.appendChild(tr);

                editBtn.addEventListener('click', () => {
                    document.getElementsByTagName('h3')[0].innerHTML = 'Edit the book';

                    let title = document.getElementById('title');
                    let author = document.getElementById('author');
                    let isbn = document.getElementById('isbn');

                    title.value = book.title;
                    author.value = book.author;
                    isbn.value = book.isbn;

                    let editItBtn = elementFactory('button', 'Edit it');
                    editItBtn.id = 'editIt';
                    editItBtn.style.display = 'block';

                    editItBtn.addEventListener('click', (ev) => {
                        ev.preventDefault();
                        fetch(`${baseUrl}/${book._id}`, {
                            method: 'PUT',
                            credentials: 'include',
                            Authorization: 'Basic ' + btoa(`${kinveyUserName}:${kinveyPassword}`),
                            headers: {
                                'content-type':'application/json'
                            },
                            body: JSON.stringify({
                                    author: author.value,
                                    title: title.value,
                                    isbn: isbn.value,
                            })
                        })
                        .then(() => {
                            load();
                            document.getElementsByTagName('h3')[0].innerHTML = 'FORM';
                            title.value = '';
                            author.value = '';
                            isbn.value = '';
                            editItBtn.style.display = 'none';
                            document.getElementById('submitBtn').style.display = 'block';
                        });
                    });

                    document.getElementsByTagName('form')[0].appendChild(editItBtn);
                    document.getElementById('submitBtn').style.display = 'none';
                });

                deleteBtn.addEventListener('click', () => {
                    fetch(`${baseUrl}/${book._id}`, {
                        method: 'DELETE',
                        credentials: 'include',
                        Authorization: 'Basic ' + btoa(`${kinveyUserName}:${kinveyPassword}`),
                        headers: {
                            'content-type':'application/json'
                        }
                    })
                    .then(load);
                });
            });

        });
    };

    function elementFactory(tag, text){
        let currentElement = document.createElement(tag);
        if(text){
            currentElement.innerHTML = text;
        }
        return currentElement;
    }

    loadBtn.addEventListener('click', load);

    submitBtn.addEventListener('click', (ev) => {
        ev.preventDefault(ev); // prevents refreshing in form tag

        let author = document.getElementById('author');
        let title = document.getElementById('title');
        let isbn = document.getElementById('isbn');

        if(author.value && title.value && isbn.value){
            fetch(baseUrl, {
                method: "POST",
                body: JSON.stringify({
                    author: author.value,
                    title: title.value,
                    isbn: isbn.value,
                }),
                credentials: 'include',
                Authorization: 'Basic ' + btoa(`${kinveyUserName}:${kinveyPassword}`),
                headers: {
                    'content-type':'application/json'
                }
            }).then(load);
        };
        author.value ='';
        title.value = '';
        isbn.value = '';
    });
};

addEvents();