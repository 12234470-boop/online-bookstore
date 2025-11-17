import React, { useState } from 'react';

function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Thank you for your message! We will get back to you soon.');
    setFormData({ name: '', email: '', message: '' });
  };

  return (
    <div className="container mt-4">
      <div className="contact-header text-center">
        <h1>Contact Us</h1>
        <p>We'd love to hear from you! Send us a message.</p>
      </div>

      <div className="contact-content">
        <div className="contact-info">
          <div className="contact-item">
            <h3>📍 Address</h3>
            <p>123 Book Street<br />Reading City, RC 12345</p>
          </div>
          <div className="contact-item">
            <h3>📞 Phone</h3>
            <p>+1 (555) 123-4567</p>
          </div>
          <div className="contact-item">
            <h3>✉️ Email</h3>
            <p>info@bookstore.com</p>
          </div>
          <div className="contact-item">
            <h3>🕒 Hours</h3>
            <p>Monday - Friday: 9AM - 6PM<br />Saturday: 10AM - 4PM</p>
          </div>
        </div>

        <form className="contact-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Full Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="message">Your Message</label>
            <textarea
              id="message"
              name="message"
              rows="5"
              value={formData.message}
              onChange={handleChange}
              required
            ></textarea>
          </div>

          <button type="submit" className="submit-btn">Send Message</button>
        </form>
      </div>
    </div>
  );
}

export default Contact;