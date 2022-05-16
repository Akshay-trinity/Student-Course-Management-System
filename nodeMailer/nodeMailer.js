const nodeMailer = require('nodemailer')
const sendEmail = async (email, subject, text) => {
  try {
    const transport = nodeMailer.createTransport({
      host: 'smtp.gmail.com',
      auth: {
        user: "rajivvviisshhwwaa@gmail.com",
        pass: "Rraajjiivv123@"
      },
    })
    transport.sendMail({
      from: "rajivvviisshhwwaa@gmail.com",
      to: email,
      text: text,
      subject: subject,
    })
    console.log("email sent");
  }
  catch (err) {
    console.log(err);
  }
}
module.exports = sendEmail
