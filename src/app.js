const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
const router = require('../router/routes');

app.set('view engine', 'ejs');

app.use('/', router);

// Export the app for testing (supertest). Only start server when run directly.
if (require.main === module) {
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
}

module.exports = app;