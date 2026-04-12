import nodemailer from 'nodemailer';
import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const data = await request.json();
    const { name, email, phone, destination, message, method } = data;

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_APP_PASSWORD, 
      },
    });

    // Email sent to YOU (The Admin)
    const adminMailOptions = {
      from: process.env.GMAIL_USER,
      to: process.env.GMAIL_USER, 
      subject: `New Inquiry from ${name} [${method === 'whatsapp' ? 'WhatsApp' : 'Email'}]`,
      html: `
        <h2>New Travel Inquiry</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone}</p>
        <p><strong>Destination:</strong> ${destination || 'General Inquiry'}</p>
        <p><strong>User Action:</strong> ${method === 'whatsapp' ? '🟢 They clicked WhatsApp (check your phone)' : '✉️ They clicked Email Only'}</p>
        <p><strong>Message:</strong><br/> ${message}</p>
      `,
    };

    // Auto-Reply sent to the USER
    const userMailOptions = {
      from: process.env.GMAIL_USER,
      to: email,
      subject: `We received your request, ${name}! - GlobeTrails`,
      html: `
        <h3>Hi ${name},</h3>
        <p>Thanks for reaching out to GlobeTrails! We have received your inquiry regarding <strong>${destination || 'your upcoming trip'}</strong>.</p>
        <p>One of our travel experts will review your request and get back to you shortly.</p>
        <p>Best regards,<br/>The GlobeTrails Team</p>
      `,
    };

    await transporter.sendMail(adminMailOptions);
    await transporter.sendMail(userMailOptions);

    return NextResponse.json({ success: true, message: 'Emails sent successfully!' });
  } catch (error) {
    console.error('Email error:', error);
    return NextResponse.json({ success: false, error: 'Failed to send email' }, { status: 500 });
  }
}