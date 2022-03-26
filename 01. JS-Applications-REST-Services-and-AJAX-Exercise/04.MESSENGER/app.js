function attachEvents() {
    let url = 'https://rest-messanger.firebaseio.com/messanger.json';
    let sendBtn = document.getElementById('submit');
    let refreshBtn = document.getElementById('refresh');

    sendBtn.addEventListener('click', () => {
        let name = document.getElementById('author');
        let content = document.getElementById('content');

        fetch(url, {
            method: 'POST',
            body: JSON.stringify({
                author: name.value,
                content: content.value
            })
        }).catch(err => console.log('Error'));

        name.value = '';
        content.value = '';
    });
    refreshBtn.addEventListener('click', () => {
        let messages = document.getElementById('messages');
        messages.textContent = '';
        fetch(url)
        .then(data => data.json())
        .then(kvp => Object.entries(kvp).forEach(m => {
            messages.textContent += `${m[1].author}: ${m[1].content}\n`;
        }))
    });
}

attachEvents();