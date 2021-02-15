# leisure-center-API

## Copyright

This work is not licensed — all rights are reserved.

## About

This is my very first API, feedback/comments are welcome. :smile:

---

## Running in development mode

1. Create a confidential.env file in the ./config/environment folder.
2. Set the following environment variables in your confidential.env file:
    * `MAPBOX_API_KEY=`your access token for the [Mapbox Geocoding API](https://docs.mapbox.com/help/how-mapbox-works/geocoding/).
    * `OPENWEATHER_API_KEY=`your API key for the [OpenWeather One Call API](https://openweathermap.org/api/one-call-api).
    * If you're using Docker Toolbox (i.e., if you have Windows 10 Home or earlier Windows version), then set `USE_DOCKER_TOOLBOX=true`.
3. Run Docker.
4. In a terminal run `npm install`, then `npm start`.
5. The server will start on [localhost:2627](http://localhost:2627).


## OpenApi

OpenApi 3.0 documentation: [localhost:2627/api-docs](http://localhost:2627/api-docs/).
## Authentication

* Type: Bearer
* How to: Include `'Bearer <token>'` in the authorization header of each request.
* Token: `unicorn`
    * Alternatively, you can also overwrite the `API_KEYS` variable if you set it in your confidential.env file to an array of strings, and use any of those. For ex: `API_KEYS=["sunshine","cheese"]`.

## Testing

I used the Jasmine node package for testing. To run the jasmine tests, run `npm test` (Docker must be running for this).

You can test the endpoints with the Swagger UI on [localhost:2627/api-docs](http://localhost:2627/api-docs/).