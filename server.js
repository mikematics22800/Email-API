// Import necessary modules
import express from 'express';
import cors from 'cors';
import nodemailer from 'nodemailer';

const PORT = process.env.PORT || 3000;

const app = express();

const corsOptions = {
  origin: ['http://localhost:3000', 'https://mikematics22800.github.io'],
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type'],
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.static('public'));

const email = process.env.EMAIL;
const password = process.env.PASSWORD;

app.post('/', (req, res) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: email,
      pass: password,
    }
  });

  const mailOptions = {
    from: email, 
    to: 'mikematics@mikematics.net', 
    subject: `Message from ${req.body.email}`,
    text: req.body.message
  };

  transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      console.log(error);
      res.send('Error sending email');
    } else {
      console.log('Email sent: ' + info.response);
      res.send('Email sent successfully');
    }
  });
});

// Listen on the specified port
app.listen(PORT, () => console.log(`Server running on port http://localhost:${PORT}`));