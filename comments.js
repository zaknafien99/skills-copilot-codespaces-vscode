// Create web server
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');
const PORT = 3000;

// Set up body-parser
app.use(bodyParser.json());

// GET request
app.get('/comments', (req, res) => {
    // Read comments.json
    fs.readFile(path.join(__dirname, 'comments.json'), 'utf8', (err, data) => {
        if (err) {
            res.status(500).send('Internal Server Error');
            return;
        }
        // Send back the comments
        res.send(data);
    });
});

// POST request
app.post('/comments', (req, res) => {
    // Read comments.json
    fs.readFile(path.join(__dirname, 'comments.json'), 'utf8', (err, data) => {
        if (err) {
            res.status(500).send('Internal Server Error');
            return;
        }
        // Parse the data
        const comments = JSON.parse(data);
        // Add the new comment
        comments.push(req.body);
        // Write the new data back to comments.json
        fs.writeFile(path.join(__dirname, 'comments.json'), JSON.stringify(comments, null, 2), (err) => {
            if (err) {
                res.status(500).send('Internal Server Error');
                return;
            }
            // Send back the new comment
            res.send(req.body);
        });
    });
});

// Listen on PORT
app.listen(PORT, () => {
    console.log(`Server is listening on http://localhost:${PORT}`);
});
// End of comments.js