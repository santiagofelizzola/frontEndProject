// import * as mdb from 'mdb-ui-kit'; // lib

// IMDb Most Popular Movies - Used to collect the specific ttID to know what movie is being targeted
const popMovieID = async () => {
    let moviesData;
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

        return moviesData

        // //Get random Movie ID
        // const randomMovie = Math.floor(Math.random() * moviesData.length);
        // console.log("Random index:", randomMovie);
        // console.log("Random element:", moviesData[randomMovie]);
        // return moviesData[randomMovie];

    } catch (error) {
        console.error(error);
    }
}
// console.log(popMovieID())


const popShowID = async () => {
    let showData;
    const popShowURL = "https://imdb8.p.rapidapi.com/title/get-most-popular-tv-shows?homeCountry=US&purchaseCountry=US&currentCountry=US"
    const url = popShowURL;
    const options = {
        headers: {
            method: "GET",
            "X-RapidAPI-Key": "80b360fcefmsh174cc3d1b1f6f97p1d3709jsn5ee1ff6263e8", //df
            "X-RapidAPI-Host": "imdb8.p.rapidapi.com",
        },
    };

    try {
        const response = await fetch(url, options);
        const result = await response.json();
        showData = result;

        for (let i = 0; i < showData.length; i++) {
            showData[i] = showData[i].replaceAll("/title/", "");
            showData[i] = showData[i].replaceAll("/", "");
        }

        return showData

        // //Get random TV ID
        // const randomShow = Math.floor(Math.random() * showData.length);
        // console.log("Random index:", randomShow);
        // console.log("Random element:", showData[randomShow]);
        // return showData[randomShow];

    } catch (error) {
        console.error(error);
    }
}
// console.log(popShowID())

//Combined Media
mediaMerge = (x,y) => {
    let combinedArr = []

    for(i=0; i < x.length; i++){
        combinedArr.push(x[i])
    } for(j=0; j < y.length; j++){
        combinedArr.push(y[j])
    } 
    // console.log(combinedArr)
    return combinedArr
}

const combinedMedia = async() => {
    try {
        const movieData = await popMovieID();
        const tvShowData = await popShowID();
        // console.log(movieData)
        const combinedMediaArray = mediaMerge(movieData,tvShowData)
        console.log(combinedMediaArray)

        //Get random Movie ID
        const randomMediaID = Math.floor(Math.random() * combinedMediaArray.length);
        console.log("Random index:", randomMediaID);
        console.log("Random element:", combinedMediaArray[randomMediaID]);
        return combinedMediaArray[randomMediaID];

    } catch (error) {
        console.error('An error occurred:', error);
    }
}
// console.log(combinedMedia())

//Get Basic API w ttID embeded
const getBasic = async (ttID) => {
    const getBasicURL = `https://streaming-availability.p.rapidapi.com/v2/get/basic?country=us&imdb_id=${ttID}&output_language=en`;
    const url = getBasicURL;
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': '4c17913e8emsh9b101b9899fc9fcp1dd57ajsnf0c65e109735',
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



// Grab as much info as possible from one fetch
const grabInfo = async () => {
    try {
        const ttNum = await combinedMedia();
        console.log(ttNum)
        const data = await getBasic(ttNum);
        console.log(data)
        const title = data.result.title;
        console.log(title);

        const overview = data.result.overview;
        console.log(overview);

        const posterURL = data.result.posterURLs.original;
        console.log(posterURL);

        const youtubeID = data.result.youtubeTrailerVideoId;
        console.log(youtubeID);

        const cast = data.result.cast.join(', ');
        console.log(cast);

        const releaseYear = data.result.year;
        console.log(releaseYear);

        return { title, overview, posterURL, youtubeID, cast, releaseYear };
    } catch (error) {
        console.error('An error occurred:', error);
        // await grabInfo()
    }
}
// console.log(grabInfo())

// Async function that posts both media poster and youtube video on page
const postMedia = (posterURL, youtubeID) => {
    const posterImage = document.getElementById("dynamicPoster");
    posterImage.src = posterURL;
    const trailerVideo = document.getElementById("dynamicTrailer");
    trailerVideo.src = `https://www.youtube.com/embed/${youtubeID}`;
}

//Test Function to input Title, Overview, Realease Year, and Cast
const postInfo = (title, overview, releaseYear, cast) => {
    const mediaTitle = document.getElementById("mediaTitle");
    mediaTitle.innerText = title;

    const mediaOverview = document.getElementById("mediaOverview");
    mediaOverview.innerText = overview;

    const movieYear = document.getElementById("releaseYear");
    movieYear.innerText = releaseYear || 'year not available';

    const mediaCast = document.getElementById("mediaCast");
    mediaCast.innerText = cast
}
// postInfo()

// Test to now merge the last 3 functions into executeInfo
// Async Function that will populate the page with media information
const executeInfo = async () => {
    try {
        const info = await grabInfo();
        console.log(info);
        postInfo(info.title, info.overview, info.releaseYear, info.cast);
        postMedia(info.posterURL, info.youtubeID)

    } catch (error) {
        console.error('An error occurred:', error);
    }
}
console.log(executeInfo())
// executeInfo()

// Button will populate the screen w info when clicked.
const generateButton = document.getElementById("generateBtn");
generateButton.addEventListener("click", () => {
    executeInfo() // Remember, we only have 100 API requests per day
})
