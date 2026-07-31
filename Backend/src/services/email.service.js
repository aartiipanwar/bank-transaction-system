const nodemailer = require("nodemailer");

//transporters STP servers se communicate krne k liye bnate he
const transporter = nodemailer.createTransport({
    service:'gmail',
    auth:{
        type:'OAuth2',
        user: process.env.EMAIL_USER,
        clientId:process.env.CLIENT_ID,
        clientSecret:process.env.CLIENT_SECRET,
        refreshToken:process.env.REFRESH_TOKEN
    },
});

//verify the connection configuration
transporter.verify((error, success)=>{
    if(error){
        console.error("ERROR connecting to email server: ", error);
    }else{
        console.log("Email server is ready to send messages");
    }
});

const sendEmail = async (to, subject, text, html) => {
    try{
        const info = await transporter.sendMail({
            from: `"Your Name <${process.env.EMAIL_USER}>`,
            to, //list of receviers
            subject, //Subject lines
            text, //plain text body
            html, //html body
        });

        console.log("Message sent: %s", info.messageId);
        console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
    }catch(error){
        console.error("ERROR sending email: ", error);
    }
};

async function sendRegistrationEmail(userEmail, name){
    const subject = 'Welcome to Bank Transcation System !!';
    const text = `Hello ${name}, \n\nThank you for registering at Backend Project,
    we're excited to have you on board!\n\nBest regards,\nThe Backend Team`;
    const html = `<p>Hello ${name}, ,</p><p> Thank you for registration. 
    We're excited to have you on board!</p><p>Best regards,<br>The Backend Team</p>`

    await sendEmail(userEmail, subject, text, html);
}


module.exports = {
    sendRegistrationEmail
}