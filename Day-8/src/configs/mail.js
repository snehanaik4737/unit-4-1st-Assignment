const nodemailer = require("nodemailer");

module.exports = nodemailer.createTransport({
  host: "smtp.mailtrap.io",
  port: 2525,
  secure: false, // true for 465, false for other ports
  auth: {
    user: "fa69e24fab9b53", // generated ethereal user
    pass: "f86aeff29f0e25", // generated ethereal password
  },
  tls:{
    ciphers: "SSLv3",
    rejectUnauthorized:false,
}
});


// fa69e24fab9b53
// Password:
// f86aeff29f0e25