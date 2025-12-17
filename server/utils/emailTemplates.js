const getBookingConfirmationTemplate = (booking) => {
    return `
    <!DOCTYPE html>
    <html>
    <head>
        <meta charset="utf-8">
        <style>
            body { font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background-color: #f8f9fa; padding: 20px; text-align: center; border-radius: 8px 8px 0 0; }
            .content { padding: 30px 20px; background-color: #ffffff; border: 1px solid #e9ecef; border-top: none; }
            .footer { text-align: center; padding: 20px; font-size: 12px; color: #888; }
            .button { display: inline-block; padding: 12px 24px; background-color: #7c8e82; color: #ffffff; text-decoration: none; border-radius: 4px; margin-top: 20px; }
            .detail-row { margin-bottom: 10px; border-bottom: 1px solid #eee; padding-bottom: 10px; }
            .detail-label { font-weight: bold; color: #555; }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="header">
                <h2 style="margin:0; color: #2c3e50;">Booking Confirmation</h2>
            </div>
            <div class="content">
                <p>Dear ${booking.name},</p>
                <p>Thank you for booking an appointment with Dr. Nitasha Buldeo. Your request has been received.</p>
                
                <h3 style="color: #2c3e50; margin-top: 25px;">Appointment Details</h3>
                
                <div class="detail-row">
                    <span class="detail-label">Service:</span> ${booking.service || 'General Consultation'}
                </div>
                
                <div class="detail-row">
                    <span class="detail-label">Date:</span> ${new Date(booking.date).toLocaleDateString('en-GB', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                </div>
                
                <div class="detail-row">
                    <span class="detail-label">Time:</span> ${booking.time}
                </div>
                
                <div class="detail-row">
                    <span class="detail-label">Email:</span> ${booking.email}
                </div>
                
                <div class="detail-row">
                    <span class="detail-label">Phone:</span> ${booking.phone}
                </div>

                ${booking.message ? `
                <div class="detail-row">
                    <span class="detail-label">Your Message:</span><br>
                    ${booking.message}
                </div>
                ` : ''}

                <p style="margin-top: 30px;">
                    If you need to reschedule or cancel, please contact us at least 24 hours in advance.
                </p>
                
                <div style="text-align: center;">
                    <a href="http://localhost:5173" class="button">Visit Request Form</a>
                </div>
            </div>
            <div class="footer">
                <p>&copy; ${new Date().getFullYear()} Dr. Nitasha Buldeo. All rights reserved.</p>
                <p>This is an automated message, please do not reply directly to this email.</p>
            </div>
        </div>
    </body>
    </html>
    `;
};

module.exports = { getBookingConfirmationTemplate };
