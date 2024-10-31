require('dotenv').config();
const Queue = require('bull');
const nodemailer = require("nodemailer");

// Define environment variables
const { REDIS_HOST, REDIS_PORT, EMAIL_HOST, EMAIL_PORT, EMAIL_USER, EMAIL_PASS } = process.env;

// Redis connection options for Bull queue
const redisOptions = {
    redis: {
        host: REDIS_HOST,
        port: REDIS_PORT
    }
};

// Created a Bull queue named 'send email'
const sendEmailQueue = new Queue('send email', redisOptions);

// Defined the Nodemailer transporter for sending emails
const transporter = nodemailer.createTransport({
    host: EMAIL_HOST,
    port: EMAIL_PORT,
    secure: false,
    auth: {
        user: EMAIL_USER,
        pass: EMAIL_PASS
    }
});

// Function to send email using the Nodemailer transporter
const sendMailOptions = async (emailData) => {
    try {        
        await transporter.sendMail({
            from: `"Maddison Foo Koch 👻" <${EMAIL_USER}>`,
            to: 'officialecho95@outlook.com',
            subject: emailData.subject,
            text: emailData.text,
            html: emailData.html
        });
        
    } catch (error) {
        console.error('Error sending email:', error);
        throw new Error('Failed to send email');
    }
};

function emailProcess() {
    // Process jobs from the 'send email' queue
    sendEmailQueue.process(async (job, done) => {
        try {
            await sendMailOptions(job.data);
            console.log(`Mail sent to ${emailData.to} successfully`);
            done();
        } catch (error) {
            done(error);
        }
    });
}

sendEmailQueue.on('completed', async (job) => {
    await job.finished();
})

console.log("Queue and email job setup complete.");

module.exports = { emailProcess }