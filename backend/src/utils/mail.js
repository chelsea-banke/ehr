const nodemailer = require('nodemailer');

async function sendEmail(recpient, code) {
    try {
        const transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            user: 'medicamrecords@gmail.com',
            pass: process.env.MAIL_KEY
        }
    });

    const mailOptions = {
        from: 'medicamrecords@gmail.com',
        to: 'bankechelsea@gmail.com',
        subject: 'Center Identification',
        text: `Your center identification code "${code}"`
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent:', info.messageId);
    } catch (error) {
        console.error('Error occurred:', error);
    }
}

module.exports = { sendEmail }