import app from './Server'

// Start the server

const port = 3000

app.listen(port, "0.0.0.0", () => {
    console.log(`service listening on : http://localhost:${port}`)
})