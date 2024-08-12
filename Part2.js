const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

// Sample data: an array of objects with email and content
const emailData = [
  { email: "alex@example.com", content: "Hello Alex, here is your content!" },
  { email: "bola@example.com", content: "Hello Bola, here is your content!" },
];

emailData.forEach(({ email, content }) => {
  const message = {
    to: email,
    from: "orders@example.com",
    subject: "Example Order Confirmation",
    text: content, // Plain text content for the email
  };

  sgMail
    .send(message)
    .then(() => {
      console.log(`Mail sent successfully to ${email}`);
    })
    .catch((error) => {
      console.error(`Error sending mail to ${email}:`, error);
    });
});
