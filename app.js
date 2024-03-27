
   
const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const serverless = require('serverless-http');
const fs = require('fs');
const path = require('path');
const ejs = require('ejs');
const simpleParser = require('mailparser');


const port = 3000;

require ('dotenv').config();


const app = express();


app.set('view engine ', 'ejs');
app.use(express.static("public"));

//data parsing
app.use(bodyParser.urlencoded({extended : true}));
app.use(bodyParser.json());

app.get('/index',function(req,res){
    res.sendFile(__dirname + '/index.html');
});

app.get('/about',function(req,res){
    res.sendFile(__dirname + '/about.html');
});

app.get('/contact',function(req,res){
    res.sendFile(__dirname + '/contact.html');
});

app.get('/picture',function(req,res){
    res.sendFile(__dirname + '/picture.html');
});

app.get('/video',function(req,res){
    res.sendFile(__dirname + '/video.html');
});


app.listen(port, () => {
    console.log(`server running on port ${port}`);
});



// contact us mail script start


app.post("/send_email", (req, res) => {
    const first = req.body.firstName;
    const last = req.body.lastName;
    const email = req.body.mail;
     const msg = req.body.message;
    const full = first + ' ' +last;


const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.AUTH_EMAIL,
        pass: process.env.AUTH_PASS
      }
    });

 // Generate HTML content for the email
 const htmlContent = `
 <html>
  <body>
     <h3>From: ${email}</h3>
     <p>${msg}</p>
 </body>
 </html>
`;

const mailOptions = {
    from: full,
    to: process.env.AUTH_EMAIL,
    // cc: process.env.AUTH_EMAIL2,
    subject: 'Comment from ' + full,
    html: htmlContent

};

transporter.sendMail(mailOptions)
    .then(() => {
        //Successful message
        res.sendFile(__dirname + '/contact.html');
    })
    .catch((error) => {
        //An error occurred
        console.log(error);
        res.json({
            status: 'FAILED',
            message: 'An error occured!'})

})

});
// contact us mail script ends

// Picture script start

let slideIndex = 1;

function openModal() {
    document.getElementById('myModal').style.display = 'block';
}

function closeModal() {
    document.getElementById('myModal').style.display = 'none';
}

function currentSlide(n) {
    showSlides(slideIndex = n);
}

function showSlides(n) {
    let i;
    const slides = document.getElementsByClassName('mySlides');
    if (n > slides.length) {
        slideIndex = 1;
    }
    if (n < 1) {
        slideIndex = slides.length;
    }
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = 'none';
    }
    slides[slideIndex - 1].style.display = 'block';
}
//   picture script ends