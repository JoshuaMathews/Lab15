//Setup libraries and required files needed for express and routing.
const express = require('express')
const apiRoutes = require('./roots/api')
const path = require('path')

const app = express()

// Setup client distributables through a static filepath, in this context its index.html.
const staticFilePath = path.join(__dirname, 'client', 'dist')
const staticFiles = express.static(staticFilePath)

// Tell express about the static files.
app.use('/', staticFiles)

// Tell express we're expecting JSON.
app.use(express.json())

// Feed express our API's routes.
app.use('/api', apiRoutes)

// Send 404 if we can't route their request to anything.
app.use(function(req, res, next) {
    res.status(404).send("Sorry, not found.")
})

// Output any errors to server's console and tell user it is a server error.
app.use(function(error, req, res, next) {
    console.log(error.stack)
    res.status(500).send('Server error')
})

// start the Server listening on given port or 3000.
const server = app.listen(process.env.PORT || 3000, function() {
    console.log(`server is running on port ${server.address().port}`);
})