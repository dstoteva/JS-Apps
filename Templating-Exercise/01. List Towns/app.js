function attachEvents(){
    let btn = document.getElementById('btnLoadTowns');
    btn.addEventListener('click', async(ev) => {
        ev.preventDefault();
        let townsInput = document.getElementById('towns').value;
        let towns = [];
        
        if(townsInput != ''){
            townsInput.split(', ').forEach(element => {
                towns.push({
                    name: element
                })
            });;
    
            let templ = await fetch('./towns-template.hbs');
            let textTempl = await templ.text();
    
            let finalTempl = Handlebars.compile(textTempl);
            document.getElementById('root').innerHTML = finalTempl({ towns }); 
        }
    });
}
attachEvents();