// const nodemailer = require("nodemailer");
// const Queue = require("bull");

// // Redis options for Bull Queue (make sure Redis is running on localhost:6379)
// const redisOptions = { redis: { host: "localhost", port: 6379 } };

// // Create a Bull queue named 'send email'
// const sendEmailQueue = new Queue("send email", redisOptions);

// // Function to add jobs to the 'send email' queue
// const emailSender = async (data) => {
//     try {
//         await sendEmailQueue.add(data, {
//             attempts: 3, // Number of retry attempts on failure
//             delay: 3000, // Delay of 3 seconds before processing
//             removeOnComplete: true, // Remove from queue after successful completion
//             removeOnFail: false, // Keep in queue on failure
//         });
//         console.log("Job added to the queue");
//     } catch (error) {
//         console.log(`Error occurred: ${error}`);
//     }
// };

// // Configure Nodemailer transporter
// const transporter = nodemailer.createTransport({
//     host: "smtp.ethereal.email",
//     port: 587,
//     secure: false, // true for port 465, false for other ports
//     auth: {
//         user: "maddison53@ethereal.email", // Ethereal email username (for testing)
//         pass: "jn7jnAPss4f63QBp6D", // Ethereal email password (for testing)
//     },
// });

// // Function to send email using Nodemailer
// const sendMailOptions = async (emailData) => {
//     try {
//         const info = await transporter.sendMail({
//             from: `"Maddison Foo Koch 👻" <maddison53@ethereal.email>`, // Sender address
//             to: emailData.to, // Recipient email address from job data
//             subject: emailData.subject, // Subject from job data
//             text: emailData.text, // Plain text body from job data
//             html: emailData.html, // HTML body from job data
//         });
//         console.log(`Email sent: ${info.messageId}`);
//     } catch (error) {
//         console.error("Error sending email:", error);
//         throw new Error("Failed to send email"); // Re-throw error to be handled by Bull queue
//     }
// };

// // Process jobs from the 'send email' queue
// sendEmailQueue.process(async (job, done) => {
//     try {
//         console.log(`Processing job ID: ${job.id} with data:`, job.data);
//         await sendMailOptions(job.data);
//         done(); // Mark job as done
//         console.log(`Email sent successfully from queue job ID: ${job.id}`);
//     } catch (error) {
//         done(error); // Mark job as failed and pass the error
//     }
// });

// // Example data for testing the producer function
// const exampleEmailData = {
//     to: "officialecho95@outlook.com",
//     subject: "Welcome to Our Platform",
//     text: "Hello! Welcome aboard. We're excited to have you with us.",
//     html: "<b>Hello! Welcome aboard. We're excited to have you with us.</b>",
// };

// // Add the example email data to the queue
// emailSender(exampleEmailData);

// // Function to send a direct test email using Nodemailer (optional)
// async function main() {
//     try {
//         const info = await transporter.sendMail({
//             from: '"Maddison Foo Koch 👻" <maddison53@ethereal.email>', // Sender address
//             to: "bar@example.com, baz@example.com", // List of receivers
//             subject: "Hello ✔", // Subject line
//             text: "Hello world?", // Plain text body
//             html: "<b>Hello world?</b>", // HTML body
//         });

//         console.log("Direct test email sent with message ID: %s", info.messageId);
//     } catch (error) {
//         console.error("Error sending direct test email:", error);
//     }
// }

// // Run the direct test email function (optional)
// main().catch(console.error);
