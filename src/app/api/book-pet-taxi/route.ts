import { NextRequest } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    const {
      name,
      email,
      phone,
      pickupAddress,
      dropoffAddress,
      pickupDate,
      pickupTime,
      petType,
      petName,
      specialInstructions
    } = body;

    // Validate required fields
    if (!name || !email || !phone || !pickupAddress || !dropoffAddress || !pickupDate || !pickupTime || !petType || !petName) {
      return new Response(
        JSON.stringify({ 
          error: 'Missing required fields',
          message: 'Please fill in all required fields'
        }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Create transporter using Gmail SMTP
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_APP_PASSWORD
      }
    });
    // Email to business
    const businessMailOptions = {
      from: process.env.GMAIL_USER,
      to: 'micabspune@gmail.com',
      subject: `New Pet Taxi Booking Request from ${name}`,
      html: `
        <h2>New Pet Taxi Booking Request</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone}</p>
        <p><strong>Pickup Address:</strong> ${pickupAddress}</p>
        <p><strong>Drop-off Address:</strong> ${dropoffAddress}</p>
        <p><strong>Pickup Date:</strong> ${pickupDate}</p>
        <p><strong>Pickup Time:</strong> ${pickupTime}</p>
        <p><strong>Pet Type:</strong> ${petType}</p>
        <p><strong>Pet Name:</strong> ${petName}</p>
        <p><strong>Special Instructions:</strong> ${specialInstructions || 'None'}</p>
      `
    };

    // Email to user
    const userMailOptions = {
      from: process.env.GMAIL_USER,
      to: email,
      subject: 'Pet Taxi Booking Confirmation',
      html: `
        <h2>Booking Confirmation</h2>
        <p>Dear ${name},</p>
        <p>Thank you for booking our Pet Taxi service. Here are your booking details:</p>
        
        <h3>Booking Details</h3>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone}</p>
        <p><strong>Pickup Address:</strong> ${pickupAddress}</p>
        <p><strong>Drop-off Address:</strong> ${dropoffAddress}</p>
        <p><strong>Pickup Date:</strong> ${pickupDate}</p>
        <p><strong>Pickup Time:</strong> ${pickupTime}</p>
        <p><strong>Pet Type:</strong> ${petType}</p>
        <p><strong>Pet Name:</strong> ${petName}</p>
        <p><strong>Special Instructions:</strong> ${specialInstructions || 'None'}</p>
        
        <p>We will contact you shortly to confirm your booking.</p>
        <p>Best regards,<br/>MI Cabs Team</p>
      `
    };

    // Send emails
    await transporter.sendMail(businessMailOptions);
    await transporter.sendMail(userMailOptions);

    return new Response(
      JSON.stringify({ 
        message: 'Booking request sent successfully! We will contact you shortly to confirm.' 
      }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Error processing booking request:', error);
    return new Response(
      JSON.stringify({ 
        error: 'Failed to process booking request',
        message: 'Something went wrong. Please try again later.'
      }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}