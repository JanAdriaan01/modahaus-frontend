import React, { useState } from 'react';
import './EmailForm.css';

const EmailForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSending, setIsSending] = useState(false);
  const [sendStatus, setSendStatus] = useState('');

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSending(true);
    setSendStatus('Sending...');

    try {
      // Use environment variable for API URL, fallback to localhost for development
      const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001';
      const response = await fetch(`${API_URL}/api/send-email`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (response.ok) {
        setSendStatus('Email sent successfully!');
        // Reset form
        setFormData({
          name: '',
          email: '',
          subject: '',
          message: ''
        });
      } else {
        setSendStatus(`Failed to send: ${result.error}`);
      }
    } catch (error) {
      setSendStatus('Error sending email: ' + error.message);
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div className="email-form-container">
      <h2>Send Us a Message</h2>
      <form onSubmit={handleSubmit} className="email-form">
        <div className="form-group">
          <label htmlFor="name">Your Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            disabled={isSending}
          />
        </div>

        <div className="form-group">
          <label htmlFor="email">Your Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            disabled={isSending}
          />
        </div>

        <div className="form-group">
          <label htmlFor="subject">Subject:</label>
          <input
            type="text"
            id="subject"
            name="subject"
            value={formData.subject}
            onChange={handleChange}
            required
            disabled={isSending}
          />
        </div>

        <div className="form-group">
          <label htmlFor="message">Message:</label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            rows="5"
            required
            disabled={isSending}
          ></textarea>
        </div>

        <button 
          type="submit" 
          disabled={isSending}
          className="submit-button"
        >
          {isSending ? 'Sending...' : 'Send Message'}
        </button>

        {sendStatus && (
          <div className={`status-message ${sendStatus.includes('successfully') ? 'success' : 'error'}`}>
            {sendStatus}
          </div>
        )}
      </form>
    </div>
  );
};

export default EmailForm;