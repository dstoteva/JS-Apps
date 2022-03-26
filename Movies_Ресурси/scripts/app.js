const app = Sammy("#container", function () {

    this.use('Handlebars', 'hbs');

    // Home
    this.get('#/home', homeController.getHome);

    // User
    this.get('#/register', userController.getRegister);
    this.get('#/login', userController.getLogin);

    this.post('#/register', userController.postRegister);
    this.post('#/login', userController.postLogin);
    this.get('#/logout', userController.logout);

    //Movie
    this.get('#/create', movieController.getCreate);
    this.get('#/allMovies', movieController.getMovies);
    this.get('#/myMovies', movieController.getMyMovies);
    this.get('#/edit/:movieId', movieController.getEditMovie);
    this.get('#/delete/:movieId', movieController.getDeleteMovie);
    this.get('#/details/:movieId', movieController.getDetails);
    this.get('#/buyTicket/:movieId', movieController.buyTicket);

    this.post('#/create', movieController.postCreate);
    this.post('#/edit/:movieId', movieController.postEditMovie);
    this.post('#/delete/:movieId', movieController.postDeleteMovie)
    
});

(() => {
    app.run('#/home');
})();