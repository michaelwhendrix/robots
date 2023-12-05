const express = require('express');
const client = require('./db/client.cjs');
const {getAllRobots} = require('./db/robots.cjs');
const app = express();
client.connect();

app.use('/assets', express.static(__dirname + '/dist/assets'));

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/dist/index.html');
})

app.get('/robots', async(req, res) => { 
    try {
        const allRobots = await getAllRobots();
        res.send(allRobots);    
    } catch (error) {
        console.log(error);
    }

});


const PORT = 3000;
app.listen(PORT, () => console.log(`Listening on port ${PORT}`));