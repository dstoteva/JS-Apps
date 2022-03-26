(() => {
     renderCatTemplate();

     function renderCatTemplate() {
         let templateString = document.getElementById('cat-template').innerHTML;
         let template = Handlebars.compile(templateString);
         document.getElementById('allCats').innerHTML = template(window);

         let btns = document.getElementsByClassName('showBtn');
         [...btns].forEach(btn => {
             btn.addEventListener('click', (ev)=>{
                let currentBtn = ev.target;
                let parent = currentBtn.parentNode;
                let statusDiv = parent.getElementsByClassName('status')[0];
                
                if(currentBtn.innerHTML == 'Show status code'){
                    statusDiv.style.display = 'block';
                    currentBtn.innerHTML = 'Hide status code';
                }
                else if(currentBtn.innerHTML == 'Hide status code'){
                    statusDiv.style.display = 'none';
                    currentBtn.innerHTML = 'Show status code';
                }
             })
         });
     }
 
})();
