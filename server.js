require('dotenv').config();
const express = require('express');
const { emailProcess } = require('./emailQueue/emailQueue.cons');
const { emailSender } = require('./emailQueue/emailQueue.prod');

const app = express();
const PORT = process.env.PORT || 4000;

app.use(express.json())

emailSender();
emailProcess();

app.listen(PORT, () => {
    console.log('Server listening on port:', PORT);
});