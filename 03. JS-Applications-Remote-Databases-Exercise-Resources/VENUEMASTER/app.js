function iHaveNoSocialLifeBecauseOfThis(){

    const kinveyUserName = 'guest';
    const kinveyPassword = 'pass';
    const appID = 'kid_BJ_Ke8hZg';

    let getVenuesBtn = document.getElementById('getVenues');
    let venueInfoDiv = document.getElementById('venue-info');
    let venueTemplate = document.getElementsByClassName('venue')[0];  
    document.getElementsByClassName('venue')[0].remove();

    let confirmationSpan = document.getElementsByClassName('head')[0];
    document.getElementsByClassName('head')[0].remove();
    let confirmationDiv = document.getElementsByClassName('purchase-info')[0];
    document.getElementsByClassName('purchase-info')[0].remove();
    
    getVenuesBtn.addEventListener('click', () => {
        let date = document.getElementById('venueDate');
        let postUrl = `https://baas.kinvey.com/rpc/kid_BJ_Ke8hZg/custom/calendar?query=${date.value}`;

        fetch(postUrl, {
            method: 'POST',
            credentials: 'include',
            Authorization: 'Basic ' + btoa(`${kinveyUserName}:${kinveyPassword}`)
        })
        .then(response => response.json())
        .then(data => {
            data.forEach(id => {
                let getUrl = `https://baas.kinvey.com/appdata/kid_BJ_Ke8hZg/venues/${id}`;
                fetch(getUrl, {
                    credentials: 'include',
                    Authorization: 'Basic ' + btoa(`${kinveyUserName}:${kinveyPassword}`)
                })
                .then(res => res.json())
                .then(venue => {
                    let currentCopy = venueTemplate.cloneNode(true);
                    currentCopy.id = id;
                    let venueName = currentCopy.getElementsByTagName('span')[0].firstChild;               
                    venueName.textContent = venue.name;

                    let venuePrice = currentCopy.getElementsByClassName('venue-price')[0];
                    venuePrice.textContent = venue.price + ' lv';
                    let venueDescription = currentCopy.getElementsByClassName('description')[0];
                    venueDescription.textContent = venue.description;
                    let venueSartingTime = currentCopy.getElementsByClassName('description')[1];
                    venueSartingTime.textContent = `Starting time: ${venue.startingHour}`;

                    let moreInfoBtn = currentCopy.getElementsByClassName('info')[0];
                    moreInfoBtn.addEventListener('click', () => {
                        
                        let allVenuesDetails = document.getElementsByClassName('venue-details');
                        Object.entries(allVenuesDetails).forEach(element => {                          
                            element[1].style.display = 'none';
                        });
                        currentCopy.getElementsByClassName('venue-details')[0].style.display = 'block';

                        let purchaseBtn = currentCopy.getElementsByClassName('purchase')[0];
                        purchaseBtn.addEventListener('click', () => {
                            let quantityMenu = currentCopy.getElementsByClassName('quantity')[0];
                            let quantity = quantityMenu.options[quantityMenu.selectedIndex].value;                          
                            venueInfoDiv.textContent = '';

                            confirmationDiv.getElementsByTagName('span')[0].textContent = venue.name;
                            confirmationDiv.getElementsByTagName('span')[1].textContent = `${quantity} x ${venue.price}`;
                            confirmationDiv.getElementsByTagName('span')[2].textContent = `Total: ${+quantity*+venue.price} lv`;

                            let confirmBtn = confirmationDiv.getElementsByTagName('input')[0];

                            confirmBtn.addEventListener('click', () => {
                                fetch(`https://baas.kinvey.com/rpc/kid_BJ_Ke8hZg/custom/purchase?venue=${id}&qty=${quantity}`, {
                                    method: 'POST',
                                    credentials: 'include',
                                    Authorization: 'Basic ' + btoa(`${kinveyUserName}:${kinveyPassword}`)
                                }).then(r => r.json())
                                .then(d => {
                                    venueInfoDiv.textContent = 'You may print this page as your ticket';
                                    let div = document.createElement('div');
                                    div.innerHTML = d.html;
                                    venueInfoDiv.appendChild(div);
                                })
                            });
                            venueInfoDiv.appendChild(confirmationSpan);
                            venueInfoDiv.appendChild(confirmationDiv);
                        });
                    });

                    venueInfoDiv.appendChild(currentCopy);
                });

            });
        })
    });

}

iHaveNoSocialLifeBecauseOfThis();