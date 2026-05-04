import nodemailer from 'nodemailer'

async function enviarEmail(from, to, subject, html) {
    try {
        const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_SEND, 
            pass: process.env.EMAIL_PASSWORD
        }
        });

        const info = await transporter.sendMail({
        from: `"${from}" <${process.env.EMAIL_SEND}>`, 
        to,        
        subject,
        html
        });

        return true
        
    } catch (error) {
        return false
    }
}
export default enviarEmail;