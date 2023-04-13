import data from './data.js';

console.log(data);

//1.sukurti funkcija, kuri gauna pagal id - filmo informacija
//funkcijai duosime parametra 436270
const getMovieFromFile = (movieId) => {
    const movie = data.find(m => m.id == movieId);
    return movie;
}
//console.log(getMovieFromFile(436270));
//console.log(getMovieFromFile(19995));
//2.sukurti funkcija, kuri uzsetintu i LS megstama filma (id, title)

const setMovieToFavoriteList = (id) => {
    //patikrinimui ar yra jau masyvas
    //pati save iskviecianti funkcija
    const items = (() => {
        //ant kintamojo favoriteMovie saugau, ka randu LS
        const favoriteMovie = localStorage.getItem("favorite_movies");
        //tikrinu ka ten radau
        //jei nera masyvo man grazina null
        console.log(favoriteMovie);
        //priklausomai nuo favoriteMovie reiksmes
        //mano funkcija turi grazinti skirtingus dalykus
        //todel reikia if'o
        return favoriteMovie === null ? [] : JSON.parse(favoriteMovie);
    })();
    //gaunu patinkancio filmo info is duomenu failo
    const myFavoriteMovie = getMovieFromFile(id);
    console.log(myFavoriteMovie);
    //sukuriu duomenu struktura, kuria saugosiu LS
    const new_movie = {
        movieId: myFavoriteMovie.id,
        movieTitle: myFavoriteMovie.title,
        movieOverview: myFavoriteMovie.overview
    }
    //i masyva idedu nauja favorita filma
    //o kas jei jau yra toks filmas?
    //ismesti is favoritu listo
    let filmIndex = items.findIndex(m => m.movieId === id);
    if (filmIndex > -1) {
        items.splice(filmIndex, 1)
    } else {
        //reiskia nera tokio filmo dar
        items.push(new_movie);
    }
    //atlikus visus darbus - saugome i LS
    localStorage.setItem("favorite_movies", JSON.stringify(items));
}

// setMovieToFavoriteList(829280)

//3.sukurti funkcija, kuri gautu duomenis is LS pagal ID
const getMovieFromLS = (id) => {
    //gauti is LS visus duomenis
    //gausime string -> parsinti i [ {}, {}]
    let allmoviesdata = JSON.parse(localStorage.getItem("favorite_movies"));

    //ieskoti gautoje duomenu strukturoje mums reikalinga filma
    return allmoviesdata.find(movie => movie.movieId === id)

}
//console.log(getMovieFromLS(420634));



//4.jei toks filmas jau yra LS - trinti, jei tokio filmo dar nera, irasyti

//gauti is LS visus duomenis
//gausime string -> parsinti i [ {}, {}]
//rasti jei egzistuoja toks filmas - index
//istrinti elementa pagal jo index
const deleteFilmFromLSByID = (id) => {
    let allmoviesdata = JSON.parse(localStorage.getItem("favorite_movies"));

    //jei toks filmas yra LS, grazins jo index
    let filmindex = allmoviesdata.findIndex(movie => movie.movieId === id);

    //o kas jei tokio filmo nera?
    if (filmindex > -1) {
        allmoviesdata.splice(filmindex, 1);
    }
    //atlikus visus pakeitimus su lokaliu masyvu, irasome i LS nauja info, perrasom kintamaji LS
    localStorage.setItem("favorite_movies", JSON.stringify(allmoviesdata));

}

//localStorage.clear()

const getAllMoviesFromLS = () => {
    let allmoviesdata = JSON.parse(localStorage.getItem("favorite_movies"));

    for(let index in allmoviesdata){
        console.log(" ___________________")
        console.log(parseInt(index)+1 + " Title " + allmoviesdata[index].movieTitle +" Overview " + allmoviesdata[index].movieOverview)
    }
}
getAllMoviesFromLS();