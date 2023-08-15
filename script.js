// IMDb Most Popular Movies - Used to collect the specific ttID to know what movie is being targeted
let moviesData;
const popMovieID = async () => {
    const popMovieURL = "https://imdb8.p.rapidapi.com/title/get-most-popular-movies?homeCountry=US&purchaseCountry=US&currentCountry=US"
    const url = popMovieURL;
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': '4c17913e8emsh9b101b9899fc9fcp1dd57ajsnf0c65e109735',
            'X-RapidAPI-Host': 'imdb8.p.rapidapi.com'
        }
    };

    try {
        const response = await fetch(url, options);
        const result = await response.json();
        moviesData = result;
        // console.log(moviesData);

        /* The code is iterating over each element in the `moviesData` array and replacing the string
        "/title/" with an empty string. It then logs the updated string to the console. */
        for (let i = 0; i < moviesData.length; i++) {
            moviesData[i] = moviesData[i].replaceAll("/title/", "");
            moviesData[i] = moviesData[i].replaceAll("/", "")
            // console.log(moviesData[i])
        }

        //Get random Movie ID
        const randomMovie = Math.floor(Math.random() * moviesData.length);
        console.log("Random index:", randomMovie);
        console.log("Random element:", moviesData[randomMovie]);
        return moviesData[randomMovie]

    } catch (error) {
        console.error(error);
    }
}

// console.log(popMovieID())

//Get Basic API w ttID embeded
const getBasic = async (ttID) => {
    const getBasicURL = `https://streaming-availability.p.rapidapi.com/v2/get/basic?country=us&imdb_id=${ttID}&output_language=en`;
    const url = getBasicURL;
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': '48e1d91eaamsh7d1603a58366f17p12af73jsn09e18c026e08',
            'X-RapidAPI-Host': 'streaming-availability.p.rapidapi.com'
        }
    };

    try {
        const response = await fetch(url, options);
        const data = await response.json();
        console.log(data);
        return data
    } catch (error) {
        console.error(error);
    }
}
// console.log(getBasic())

// Function to grab the trailer from Streaming Services API
const grabTrailer = async () => {
    let movieTrailer;
    try {
        // input returned data from popMovieID function into variable 'ttNum'
        const ttNum = await popMovieID();
        console.log(ttNum)
        // input returned data from getBasic with embeded new data from popMovieID, into variable 'data'
        const data = await getBasic(ttNum);
        console.log(data);
        // Dive into the object in data and target specifically the value inside of `youtubeTrailerVideoLink` and re-assign to movieTrailer
        movieTrailer = data.result.youtubeTrailerVideoLink;
        console.log(movieTrailer);
        // Log movie title just to fact check
        console.log(data.result.title);
        return movieTrailer;
    } catch (error) {
        console.error('An error occurred:', error);
        // Call the function again to retry if error occurs
        await grabTrailer();
    }
};
// console.log(grabTrailer())

// * API data to incorporate later * //

    // Most Popular TV-Shows
        // URL: 'https://imdb8.p.rapidapi.com/title/get-most-popular-tv-shows?homeCountry=US&purchaseCountry=US&currentCountry=US'
        // Will give tv shows // will need to extract ttID just as we did with Popular Movies

    // Film Info: Images, Title, Genres, Plot, # of Seasons
        // URL: 'https://imdb8.p.rapidapi.com/title/get-overview-details?tconst=tt5180504&currentCountry=US'
        // Will only work with ttID dynamically embeded in URL

    // We should only use Streaming Services for the trailer,  streaming info, & cast because there are only 100 calls/day with each key.
    // We can get all the other info from IMDb

// Grab as much info as possible from one fetch
const grabInfo = async() => {
    try { 
        const ttNum = await popMovieID();
        const data = await getBasic(ttNum);
        const title = data.result.title;
        console.log(title)
        const overview = data.result.overview
        console.log(overview)
        const posterURL = data.result.posterURLs.original;
        console.log(posterURL)
        const trailerLink = data.result.youtubeTrailerVideoLink;
        console.log(trailerLink)
        const cast = data.result.cast.join(', ');
        console.log(cast)
        return {title, overview, posterURL, trailerLink, cast}
    } catch(error) {
        console.error('An error occurred:', error);
        await grabInfo()
    }
}
// console.log(grabInfo())