$(async() => {
    let templateString = document.getElementById('monkey-template').innerHTML;
    let template = Handlebars.compile(templateString);
    document.getElementsByClassName('monkeys')[0].innerHTML = template({monkeys});
    
    let infoBtns = document.getElementsByTagName('button');
    [...infoBtns].forEach(btn => {
        btn.addEventListener('click', (ev)=>{
            let currentBtn = ev.target;
            let parent = currentBtn.parentNode;
            //assuming we'll have one single <h2> with name per monkey
            //getting the name, in order to compare ids and get the exact <p> with this id (in case of more <p>s being added);
            let name = parent.getElementsByTagName('h2')[0].innerHTML;
            let id = monkeys.filter(m => m.name == name)[0].id;
            let p = document.getElementById(id);
            p.style.display = p.style.display == 'none' ? 'block' : 'none';
        });
    });
});