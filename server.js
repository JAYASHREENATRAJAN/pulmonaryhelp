const express = require('express');
const bodyParser = require('body-parser');
const multer = require('multer');
const lime = require('lime'); // Replace with your LIME library/module
const cors = require('cors'); // Import CORS module

const app = express();
const port = process.env.PORT || 3000;

// Middleware to parse JSON bodies
app.use(bodyParser.json());

// Enable CORS (for all origins during development)
app.use(cors());

// Configure multer to handle multipart/form-data (for file uploads)
const upload = multer({ dest: 'uploads/' });

// Endpoint to handle LIME explanation
app.post('/explain', upload.single('image'), async (req, res) => {
    try {
        const imagePath = req.file.path;

        // Process image with LIME (example using a hypothetical LIME function)
        const heatmap = await lime.explain(imagePath); // Replace with actual LIME function

        // Send back the heatmap as JSON response
        res.json({ heatmap });
    } catch (error) {
        console.error('Error processing LIME explanation:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
