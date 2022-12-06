/*
(c) 2022 Louis. D. Nel

WARNING:
NOTE: THIS CODE WILL NOT RUN UNTIL YOU
ENTER YOUR OWN openweathermap.org APP_ID KEY

NOTE: You need to install the npm modules by executing >npm install
before running this server

Simple express server re-serving data from openweathermap.org
To test:
http://localhost:3000
or
http://localhost:3000/weather?city=Ottawa
to just set JSON response. (Note it is helpful to add a JSON formatter extension, like JSON Formatter, to your Chrome browser for viewing just JSON data.)
*/
const express = require('express') //express framework
const http = require('http')
const PORT = process.env.PORT || 3000 //allow environment variable to possible set PORT

/*YOU NEED AN APP ID KEY TO RUN THIS CODE
  GET ONE BY SIGNING UP AT openweathermap.org
*/
let API_KEY = 'b89121f11c0f599017e59bb605812cdb' //<== YOUR API KEY HERE


const app = express()

//Middleware
app.use(express.static(__dirname + '/public')) //static server

//Routes
app.get('/', (request, response) => {
  response.sendFile(__dirname + '/views/index.html')
})

//Routes
app.get('/mytunes.html', (request, response) => {
  response.sendFile(__dirname + '/views/index.html')
})

//Routes
app.get('/mytunes', (request, response) => {
  response.sendFile(__dirname + '/views/index.html')
})

//Routes
app.get('/index.html', (request, response) => {
  response.sendFile(__dirname + '/views/index.html')
})

app.get('/song', (request, response) => {
  const titleWithPlusSigns = request.query.title.replaceAll(' ', '+')

  if(!titleWithPlusSigns) {
    //send json response to client using response.json() feature
    //of express
    response.json({message: 'Please enter a song name'})
    return
  }

  console.log(titleWithPlusSigns)



  const options = {
    method: "GET",
    host: "itunes.apple.com",
    port: null,
    path: `/search?term=${titleWithPlusSigns}&entity=musicTrack&limit=20`,
    headers: {
      "useQueryString": true
    }
  }
  //create the actual http request and set up
  //its handlers
  http.request(options, function(apiResponse) {
    let songData = ''
    console.log('sending request')
    apiResponse.on('data', function(chunk) {
      songData += chunk
    })
    apiResponse.on('end', function() {
      console.log(JSON.parse(songData))
      response.contentType('application/json').json(JSON.parse(songData))
    })
  }).end()  //important to end the request
           //to actually send the message
})

//start server
app.listen(PORT, err => {
  if(err) console.log(err)
  else {
    console.log(`Server listening on port: ${PORT}`)
    console.log(`To Test:`)
    console.log(`http://localhost:3000/mytunes`)
    console.log(`http://localhost:3000/mytunes.html`)
    console.log(`http://localhost:3000/index.html`)
    console.log(`http://localhost:3000`)
  }
})
