const movieController = function(){

    const getCreate = function(context){
        helper.addHeaderInfo(context);
        context.loadPartials({
            header: "../views/common/header.hbs",
            footer: "../views/common/footer.hbs"
        }).then(function() {
            this.partial('../views/movie/create.hbs');
        });
    };

    const postCreate = function(context){
        const data = context.params;
        data.tickets = Number(data.tickets);
        requester.post('movies', 'appdata', 'Kinvey', data)
        .then(helper.handler)
        .then(() => {
            context.redirect('#/home');
        })
    };

    const getMovies = function(context){
        helper.addHeaderInfo(context);

        requester.get('movies?query={}&sort={"tickets":-1}', 'appdata', 'Kinvey')
        .then(helper.handler)
        .then(movies => {
            context.movies = movies;
            context.loadPartials({
                header: "../views/common/header.hbs",
                footer: "../views/common/footer.hbs",
                singleMovie: "../views/movie/singleMovie.hbs"
            }).then(function() {
                this.partial('../views/movie/allMovies.hbs');
            });
        })
    };

    const getMyMovies = function(context){
        helper.addHeaderInfo(context);
        const userId = sessionStorage.getItem('userId');
        
        requester.get(`movies?query={"_acl.creator":"${userId}"}`, 'appdata', 'Kinvey')
        .then(helper.handler)
        .then(movies => {
            context.movies = movies;
            
            context.loadPartials({
                header: "../views/common/header.hbs",
                footer: "../views/common/footer.hbs",
                mySingleMovie: "../views/movie/mySingleMovie.hbs"
            }).then(function() {
                this.partial('../views/movie/myMovies.hbs');
            });
        })
    };

    const getEditMovie = function(context){
        helper.addHeaderInfo(context);
        const movieId = context.params.movieId;     

        requester.get(`movies/${movieId}`, 'appdata', 'Kinvey')
        .then(helper.handler)
        .then((movie) => {
            Object.keys(movie).forEach((key) =>{
                context[key] = movie[key]
            });

            context.loadPartials({
                header: "../views/common/header.hbs",
                footer: "../views/common/footer.hbs",

            }).then(function() {
                this.partial('../views/movie/edit.hbs');
            });
        });
        
    };

    const postEditMovie = function(context){
        let movieId = context.params.movieId;

        delete context.params.movieId;

        context.params.tickets = +context.params.tickets;
        requester.put(`movies/${movieId}`, 'appdata', 'Kinvey', context.params)
        .then(helper.handler)
        .then(() => {
            context.redirect('#/home');
        })
        
    }

    const getDeleteMovie = function(context){
        helper.addHeaderInfo(context);
        const movieId = context.params.movieId;  

        requester.get(`movies/${movieId}`, 'appdata', 'Kinvey')
        .then(helper.handler)
        .then((movie) => {
            Object.keys(movie).forEach((key) =>{
                context[key] = movie[key]
            });

            helper.loadPartials(context)
            .then(function() {
                this.partial('../views/movie/delete.hbs');
            });
        });
    };

    const postDeleteMovie = function(context){
        let movieId = context.params.movieId;

        requester.del(`movies/${movieId}`, 'appdata', 'Kinvey')
        .then(helper.handler)
        .then(() => {
            context.redirect('#/home');
        });
        
    };

    const getDetails = function(context){
        helper.addHeaderInfo(context);
        const movieId = context.params.movieId;

        requester.get(`movies/${movieId}`, 'appdata', 'Kinvey')
        .then(helper.handler)
        .then(movie => {
            Object.keys(movie).forEach((key) =>{
                context[key] = movie[key]
            });
            helper.loadPartials(context)
            .then(function() {
                this.partial('../views/movie/details.hbs');
            });
        });
    };
    const buyTicket = function(context){
        helper.addHeaderInfo(context);
        const movieId = context.params.movieId;

        requester.get(`movies/${movieId}`, 'appdata', 'Kinvey')
        .then(helper.handler)
        .then(movie => {
            movie.tickets--;
            Object.keys(movie).forEach((key) =>{
                context[key] = movie[key]
            });
            requester.put(`movies/${movieId}`, 'appdata', 'Kinvey', movie)
            .then(helper.handler)
            .then(()=>{
                context.redirect(`#/details/${movieId}`);
            });
        });
    };

    return{
        getCreate,
        postCreate,
        getMovies,
        getMyMovies,
        getEditMovie,
        postEditMovie,
        getDeleteMovie,
        postDeleteMovie,
        getDetails,
        buyTicket
    }
}();