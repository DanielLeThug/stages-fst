const express = require("express");
const router = express.Router();
const nodemailer = require("nodemailer");
const Validator = require("validator");

router.post("/send-email", function(req, res) {
  if (Validator.isEmail(req.body.to)) {
    // Generate test SMTP service account from ethereal.email
    // Only needed if you don't have a real mail account for testing
    nodemailer.createTestAccount((err, account) => {
      // create reusable transporter object using the default SMTP transport
      let transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        secure: true, // true for 465, false for other ports
        auth: {
          user: "stage.fst2018@gmail.com", // generated ethereal user
          pass: "stagefst2018" // generated ethereal password
        }
      });

      // setup email data with unicode symbols
      let mailOptions = {
        from: "<stage.fst2018@gmail.com>", // sender address
        to: req.body.to, // list of receivers
        subject: "Convention de stage UHA", // Subject line
        text: req.body.text // plain text body
        //html: '<b>corp HTml</b>' // html body
      };

      // send mail with defined transport object
      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          return console.log(error);
        }
        console.log("Message sent: %s", info.messageId);
        // Preview only available when sending through an Ethereal account
        console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
      });

      return res.json({
        message: "Email envoyé avec succès.",
        color: "#007bff"
      });
    });
  } else {
    return res.json({
      message: "L'adresse mail n'est pas valide.",
      color: "#dc3545"
    });
  }
});

module.exports = router;
