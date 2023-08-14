movies
- movie desrciption
- rating
- fun facts
- behind the scene
- cast
- trailer

//instructions for the popular movies/tv API
The first functon to be coded was the popMovies function that fetches info about popular movies. We used the IMDb API and the function returns the id of a randomly selected movie from a list. In the option object we have the resquired headers for the API and inside the try block the code makes a GET request, converts the response from the API to JSON format and stores the data in the results variable. The for loop goes through each move in the moviesData array and replaces the string "/titles/" and "/" in each movie's string to leave only the movie data. The code from the movie titles generates a random index within the range of the moviesData array length and is used to select a random movie. The function then returns the selected movie title and displays it in text and if an error were to occur during the API request or processing, the error is caught in the catch block and an error message is logged to the console. The popular TV function goes through the exact same process as the popular movies API it just fetches TV shows instead of movies.



