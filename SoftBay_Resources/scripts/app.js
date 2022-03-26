const app = Sammy('#main', function () {

    this.use('Handlebars', 'hbs');

    // Home
    this.get('#/home', homeController.getHome);

    // User
    this.get('#/register', userController.getRegister);
    this.get('#/login', userController.getLogin);

    this.post('#/register', userController.postRegister);
    this.post('#/login', userController.postLogin);
    this.get('#/logout', userController.logout);

    //Offer
    this.get('#/create', offerController.getCreate);
    this.get('#/dashboard', offerController.getOffers);
    this.get('#/edit/:offerId', offerController.getEdit);
    this.get('#/delete/:offerId', offerController.getDelete);
    this.get('#/details/:offerId', offerController.getDetails);

    this.post('#/create', offerController.postCreate);
    this.post('#/edit/:offerId', offerController.postEdit);
    this.post('#/delete/:offerId', offerController.postDelete);
    
});

(() => {
    app.run('#/home');
})();