import nodemailer from 'nodemailer';
import smtpTransport from 'nodemailer-smtp-transport';
import hbs from 'nodemailer-express-handlebars'
import path from "path"

let transporter = nodemailer.createTransport(smtpTransport({
    service: 'gmail',
    host: 'smtp.gmail.com',
    auth: {
        user: 'shinadoe@gmail.com',
        pass: 'jcclrqmzibiuabzm'
    }
}));

transporter.use('compile', hbs({
    viewEngine: {
        extName: ".handlebars",
        partialsDir: path.resolve('../server/views'),
        defaultLayout: false,
    },
    viewPath: path.resolve('../server/views'),
    extName: ".handlebars"
}))

function sendSms(to, subject, title, otp) {
    let mailOptions = {
        from: 'shinadoe@gmail.com', // for multiple enter email with comma separated values
        to: to,
        subject: subject,
        template: 'Email',
        context: {
            title,
            otp
        }
    };

    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });

}


export default sendSms;