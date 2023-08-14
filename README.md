movies
- movie desrciption
- rating
- fun facts
- behind the scene
- cast
- trailer

//popular movies/tv API explanation
The first functon to be coded was the popMovies function that fetches info about popular movies using a asynchronous function. We used the IMDb API and the function returns the id of a randomly selected movie from a list. In the option object we have the required headers for the API and inside the try block the code makes a GET request, converts the response from the API to JSON format and stores the data in the results variable. The for loop goes through each movie in the moviesData array and replaces the string "/titles/" and "/" in each movie's string to leave only the movie data. The code from the movie titles generates a random index within the range of the moviesData array length and is used to select a random movie. The function then returns the selected movie title and displays it in text and if an error were to occur during the API request or processing, the error is caught in the catch block and an error message is logged to the console. The popular TV function goes through the exact same process as the popular movies API it just fetches TV shows instead of movies.

//grab trailer API explanation
The code defines an asynchronous function called grabTrailer that attempts to retrieve the trailer link of a randomly selected popular movie. The code first calls the popMovieID function to get the randomly selected movie's IMDb ID. The IMDb ID is assigned to the ttNum variable. The code then calls the getBasic function with the retrieved IMDb ID (ttNum). The function retrieves streaming availability data for the movie with that IMDb ID. The code accesses the youtubeTrailerVideoLink property within the data.result object and this property contains the trailer link for the chosen movie, so the trailer link is assinged to the movieTrailer variable. The function returns the movieTrailer variable, which contains the trailer link for the movie and the try block is used to handle potential errors during the process.

//Get Basic API w ttID embeded
This code defines an asynchronous function called getBasic that fetches information about the availability of a movie or TV show for streaming. The function takes an IMDb ID as an argument. The URL for fetching streaming availability data is constructed using the provided ttID parameter. The URL is built to query the streaming-availability.p.rapidapi.com API with the IMDb ID and the country set to the US. The API is expected to return information about the basic availability of the content for streaming in English. Inside the options object there are necessary headers for the API request including the X-RapidAPI-Key and X-RapidAPI-Host headers. Inside the try block the the function makes a get request to the streaming avalibility API and the response is converted to JSON format and stored in the data variable. The function returns the fetched data and if an error occurs during the API request or processing, the error is caught in the catch block.


//Grab info API (title, overview, posterURL, trailerLink, and cast)
The code defines an asynchronous function called grabInfo that attempts to retrieve various pieces of information about a randomly selected popular movie. The try block handles any errors presented the process. The code calls the popMovieID function to get a randomly selected movie's IMDb ID. It then calls the getBasic function with the retreaved IMDb ID. The function retrieves streaming avalibility data assigned to the data variable. The title of the movie is extracted from the data.result.overview property and the URL of the movie's poster image is extracted from the data.result.posterURLs.original property. The YouTube trailer link of the movie is extracted from the data.result youtubeTrailerVideoLink property. The cast of the movie is extracted from the data.result.cast property, which is an array of cast members' names and the array is joined into a comma-separated string using .join(', '). The function then returns an object containing the extracted information: title, overview, posterURL, trailerLink, and cast. If an error occurs within the try block, the catch block is executed. The function then calls itself again using await grabInfo(). This recursive call is an attempt to retry the entire process if an error occurs.




