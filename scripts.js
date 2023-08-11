// IMDb Most Popular Movies
const popMovies = async () => {
    const url = 'https://imdb8.p.rapidapi.com/title/get-most-popular-movies?homeCountry=US&purchaseCountry=US&currentCountry=US';
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': '48e1d91eaamsh7d1603a58366f17p12af73jsn09e18c026e08',
            'X-RapidAPI-Host': 'imdb8.p.rapidapi.com'
        }
    };

    try {
        const response = await fetch(url, options);
        const result = await response.text();
        console.log(result);
    } catch (error) {
        console.error(error);
    }
}

// IMDb Most Popular TV-Shows
const popTvShows = async () => {
    const url = 'https://imdb8.p.rapidapi.com/title/get-most-popular-tv-shows?homeCountry=US&purchaseCountry=US&currentCountry=US';
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': '48e1d91eaamsh7d1603a58366f17p12af73jsn09e18c026e08',
            'X-RapidAPI-Host': 'imdb8.p.rapidapi.com'
        }
    };

    try {
        const response = await fetch(url, options);
        const result = await response.text();
        console.log(result);
    } catch (error) {
        console.error(error);
    }
}

// Film Info:
// Images, Title, Genres, Plot, number of seasons
const filmOverview = async () => {
    const url = 'https://imdb8.p.rapidapi.com/title/get-overview-details?tconst=tt5180504&currentCountry=US';
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': '48e1d91eaamsh7d1603a58366f17p12af73jsn09e18c026e08',
            'X-RapidAPI-Host': 'imdb8.p.rapidapi.com'
        }
    };

    try {
        const response = await fetch(url, options);
        const result = await response.text();
        console.log(result);
    } catch (error) {
        console.error(error);
    }
}

// Get Videos
const videoTrailer = async () => {
    const url = 'https://imdb8.p.rapidapi.com/title/get-videos?tconst=tt5180504&limit=25&region=US';
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': '48e1d91eaamsh7d1603a58366f17p12af73jsn09e18c026e08',
            'X-RapidAPI-Host': 'imdb8.p.rapidapi.com'
        }
    };

    try {
        const response = await fetch(url, options);
        const result = await response.text();
        console.log(result);
    } catch (error) {
        console.error(error);
    }
}

// Get Basic , Streaming Availability API
let getBasic = async () => {
    const url = 'https://streaming-availability.p.rapidapi.com/v2/get/basic?country=us&imdb_id=tt5180504&output_language=en';
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': '48e1d91eaamsh7d1603a58366f17p12af73jsn09e18c026e08',
            'X-RapidAPI-Host': 'streaming-availability.p.rapidapi.com'
        }
    };

    try {
        const response = await fetch(url, options);
        const result = await response.text();
        console.log(result);
    } catch (error) {
        console.error(error);
    }
}

// Access trailer video
let trailerVideo = () => {

}