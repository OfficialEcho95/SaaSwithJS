require('dotenv').config();
const Queue = require('bull');
const { REDIS_HOST, REDIS_PORT } = process.env;
const redisClient = require('../redisClient');

const redisOptions = { redis: { REDIS_HOST, REDIS_PORT } }

const sendEmail = new Queue('send email', redisOptions);

const emailSender = async function (data) {
    await sendEmail.add(data,
        { attempt: 0 }
    ).catch((error) => console.log(`Error occured: ${error}`));
}

// Handles the email scheduling for newly registered user
redisClient.subscribe('user-registered', async (message) => {
    console.log('Received user-registered message:', message);

    try {
        const emailData = JSON.parse(message);

        await emailSender({
            to: emailData.email,
            subject: emailData.subject,
            text: emailData.text,
            html: '<p>' + emailData.text + '</p>'
        });

        console.log(`Email job added to queue for: ${emailData.email}`);
    } catch (error) {
        console.error('Error processing message:', error);
    }
});

// Handles the email scheduling for newly registered user
redisClient.subscribe('order-confirmation', async (message) => {
    console.log('Received order confirmation message:', message);

    try {
        const emailData = JSON.parse(message);
        await emailSender({
            to: emailData.email,
            subject: emailData.subject,
            text: emailData.text,
            html: '<p>' + emailData.text + '</p>'
        });

        console.log(`Email job added to queue for: ${emailData.email}`);
    } catch (error) {
        console.error('Error processing message:', error);
    }
});

redisClient.subscribe('running low on product', async (message) => {
    console.log('Received Seller\'s low stock', message);

    try {
        const emailData = JSON.parse(message);
        await emailSender({
            to: emailData.email,
            subject: emailData.subject,
            text: emailData.text,
            html: '<p>' + emailData.text + '</p>'
        });
        console.log(`Email job added to queue for: ${emailData.email}`);
    } catch (error) {
        console.error('Error processing message:', error);
    }
});

redisClient.subscribe('cart-abandoned', async (message) => {
    try {
        const emailData = JSON.parse(message);
        await emailSender({
            to: emailData.email,
            subject: emailData.subject,
            text: emailData.text,
            html: '<p>' + emailData.text + '</p>'
        });
        console.log(`Email job added to queue for: ${emailData.email}`);
    } catch(error) {
        console.error("Error processing message:", error);
    }
});

module.exports = { emailSender, redisOptions, sendEmail }