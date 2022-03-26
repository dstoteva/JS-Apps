(async function(){
    const { getTemplateFunc, getTemplateString } = window.templates;
    const cardTemplate = await getTemplateString('card');
    Handlebars.registerPartial('card', cardTemplate); 

    const cardsListFunc = await getTemplateFunc('cards-list');
    document.getElementById('contacts').innerHTML = cardsListFunc({ contacts });

    const getCardParent = (btn) => {
        let parentCard = btn.parentNode;
        while(parentCard != null){
            if(parentCard.classList.contains('contact')){
                return parentCard;
            }
            parentCard = parentCard.parentNode;
        }
        return parentCard;
    };

    const handleDetails = (ev) => {
        const btn = ev.target;
        const card = getCardParent(btn);
        const details = card.querySelector('.details');
        details.style.display = 'block'; 
    };

    [...document.getElementsByClassName('detailsBtn')]
    .forEach(element => {
        element.addEventListener('click', handleDetails);
    });
})();