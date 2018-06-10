const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const passport = require("passport");
const path = require("path");
const fs = require("fs");

const users = require("./routes/users");
const forms = require("./routes/forms");
const datas = require("./routes/datas");
const posts = require("./routes/posts");
const sendmail = require("./routes/sendmail");
const Post = require("./models/Post");

const app = express();

// Body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// DB Config
const db = require("./config/keys").mongoURI;

// Connect to MongoDB
mongoose
  .connect(db)
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

// Passport middleware
app.use(passport.initialize());

// Passport Config
require("./config/passport")(passport);

// Use Routes
app.use("/api", users);
app.use("/api", forms);
app.use("/api", datas);
app.use("/api", posts);
app.use("/api", sendmail);

// Server static assets if in production
if (process.env.NODE_ENV === "production") {
  // Set static folder
  app.use(express.static("client/build"));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server running on port ${port}`));

var MailListener = require("mail-listener-next");

var mailListener = new MailListener({
  username: "stage.fst2018@gmail.com",
  password: "stagefst2018",
  host: "imap.gmail.com",
  port: 993, // imap port
  tls: true,
  connTimeout: 10000, // Default by node-imap
  authTimeout: 5000, // Default by node-imap,
  debug: null, // Or your custom function with only one incoming argument. Default: null
  tlsOptions: { rejectUnauthorized: false },
  mailbox: "INBOX", // mailbox to monitor
  searchFilter: ["UNSEEN"], // the search filter being used after an IDLE notification has been retrieved
  markSeen: true, // all fetched email willbe marked as seen and not fetched next time
  fetchUnreadOnStart: true, // use it only if you want to get all unread email on lib start. Default is `false`,
  mailParserOptions: { streamAttachments: false }, // options to be passed to mailParser lib.
  attachments: false, // download attachments as they are encountered to the project directory
  attachmentOptions: {
    directory: "attachments/"
  }, // specify a download directory for attachments
  fetchingPauseThreshold: null, // amount bytes
  fetchingPauseTime: 5000 // ms to pause fetching and process other requests
});

mailListener.start(); // start listening

// stop listening
//mailListener.stop();

mailListener.on("server:connected", function() {
  console.log("imapConnected");
});

mailListener.on("server:disconnected", function() {
  console.log("imapDisconnected");
  this.start();
});

mailListener.on("error", function(err) {
  console.log(err);
});

mailListener.on("mail", function(mail, seqno, attributes) {
  const newPost = new Post({
    title: mail.subject,
    text: mail.text,
    desc: mail.text.substr(0, mail.text.indexOf("\n"))
  });

  if (mail.attachments && mail.attachments.length) {
    newPost.text += "\nPièce(s) jointe(s) :\n";
    mail.attachments.forEach(attach => {
      fs.writeFile("attachments/" + attach.fileName, attach.content, err => {
        if (err) throw err;
        console.log("Fichier sauvegardé.");
      });
    });
  }

  newPost.save().then(console.log("Nouvelle offre de stage enregistrée."));
});

mailListener.on("attachment", function(attachment, email) {
  console.log(attachment);
});
