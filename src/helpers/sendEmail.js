const nodemailer = require("nodemailer");


class Email {
    static emailTemplate(dataEmail) {
        const html = /*html*/ `
            <h1 style="text-align:center;padding:5px;border-radius:5px;background:#007bff;color:white">
            Halo ${dataEmail.username}
            </h1>
            <p>Selamat datang</p>
         `;
        return html;
    }

    static sendEmail(dataEmail, subject, filename, fileContent) {
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USERNAME,
                pass: process.env.EMAIL_PASSWORD,
            }
        });

        const mailOptions = {
            from: process.env.EMAIL_USERNAME,
            to: dataEmail.email,
            subject: subject,
            html: this.emailTemplate(dataEmail),
            attachments: [{
                filename: filename,
                content: fileContent
            }]
        };

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                return console.log(error);
            }
            console.log('Message sent: %s', info.messageId);
            return;
        });
    }
}

module.exports = Email;