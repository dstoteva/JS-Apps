
const offerController = function(){

    const getCreate = function(context){
        helper.addHeaderInfo(context);

        helper.loadPartials(context)
        .then(function(){
            this.partial('../views/offer/create.hbs');
        });
    };

    const postCreate = function(context){
        const offer = context.params;
        
        if(offer.product != '' && offer.description != '' && offer.price != '' && offer.imageUrl != ''){
            offer.price = +offer.price;

            requester.post('offers', 'appdata', 'Kinvey', offer)
            .then(helper.handler)
            .then(() =>{
                context.redirect('#/dashboard');
            });
        }
        else{
            alert('Invalid data! Try again.');
        }
    };
    const getOffers = function(context){
        helper.addHeaderInfo(context);

        requester.get('offers', 'appdata', 'Kinvey')
        .then(helper.handler)
        .then(data => {
            Object.keys(data).forEach(key => {
                data[key].index = key;
                data[key].isCreator = data[key]._acl.creator == sessionStorage.getItem('userId');
                
            })
            context.offers = data;
            
            
            helper.loadPartials(context)
            .then(function(){
                this.partial("../views/offer/dashboard.hbs");
            })
        });
        
    };
    
    const getEdit = function(context){      
        helper.addHeaderInfo(context);
        const offerId = context.params.offerId;      

        requester.get(`offers/${offerId}`, 'appdata', 'Kinvey')
        .then(helper.handler)
        .then(offer => {
            context.offer = offer;
            Object.keys(offer).forEach((key) =>{
                context[key] = offer[key]
            });

            helper.loadPartials(context)
            .then(function() {
                this.partial('../views/edit.hbs');
            });
        });

    };

    const postEdit = function(context){
        let offerId = context.params.offerId;

        delete context.params.offerId;

        context.params.price = +context.params.price;
        requester.put(`offers/${offerId}`, 'appdata', 'Kinvey', context.params)
        .then(helper.handler)
        .then(() => {
            context.redirect('#/home');
        })
        

    };

    const getDelete = function(context){
        let offerId = context.params.offerId;

        delete context.params.offerId; 

        requester.get(`offers/${offerId}`, 'appdata', 'Kinvey')
        .then(helper.handler)
        .then((offer) => {
            Object.keys(offer).forEach((key) =>{
                context[key] = offer[key]
            });

            helper.loadPartials(context)
            .then(function() {
                this.partial('../views/user/delete.hbs');
            });
        });
    };

    const postDelete = function(context){
        let offerId = context.params.offerId;
        console.log(offerId);
        
        requester.del(`offers/${offerId}`, 'appdata', 'Kinvey')
        .then(helper.handler)
        .then(() => {
            context.redirect('#/dashboard');
        });
        
    };
    const getDetails = function(context){
        let offerId = context.params.offerId;

        delete context.params.offerId;

        requester.get(`offers/${offerId}`, 'appdata', 'Kinvey')
        .then(helper.handler)
        .then(offer => {
            Object.keys(offer).forEach((key) =>{
                context[key] = offer[key]
            });
            helper.loadPartials(context)
            .then(function() {
                this.partial('../views/user/details.hbs');
            });
        });
    };



    return{
        getCreate,
        postCreate,
        getOffers,
        getEdit,
        postEdit,
        getDelete,
        postDelete,
        getDetails
    };
}();
