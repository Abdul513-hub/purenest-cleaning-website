import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Only POST requests allowed' });
  }

  try {
    const { name, email, message } = req.body;

    await resend.emails.send({
      from: 'onboarding@resend.dev',
      to: 'YOUR_CLIENT_EMAIL@example.com', // abdul91451@gmail.com
      subject: 'New Inquiry from Cleaning Website',
      html: `<p><strong>Name:</strong> ${name}</p>
             <p><strong>Email:</strong> ${email}</p>
             <p><strong>Message:</strong> ${message}</p>`,
    });

    return res.status(200).json({ message: 'Email sent successfully!' });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}
