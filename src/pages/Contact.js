// pages/Contact.js - UPDATED WITH WORKING EMAIL
import React, { useState } from 'react';
import { sendContactEmail } from '../utils/emailService';

function Contact() {
  const [formData, setFormData] = useState({ 
    name: "", 
    email: "", 
    phone: "", 
    message: "" 
  });
  const [isSending, setIsSending] = useState(false);
  const [sendStatus, setSendStatus] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSending(true);
    setSendStatus('Sending...');

    try {
      await sendContactEmail({
        name: formData.name,
        email: formData.email,
        subject: `Contact Form: ${formData.name}`,
        message: `
Name: ${formData.name}
Email: ${formData.email}
Phone: ${formData.phone}

Message:
${formData.message}
        `.trim()
      });

      setSendStatus('Message sent successfully!');
      setFormData({ name: "", email: "", phone: "", message: "" });
    } catch (error) {
      setSendStatus('Error sending message: ' + error.message);
    } finally {
      setIsSending(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="grid md:grid-cols-2 gap-8">
      <div>
        <h1 className="text-3xl font-bold">Contact</h1>
        <p className="text-zinc-600 mt-1">Send a message or call us to discuss your project.</p>
        <div className="mt-6 space-y-2 text-zinc-700">
          <div><span className="font-medium">Phone:</span> +27 (0) 61 193 3931</div>
          <div><span className="font-medium">Email:</span> info@modahaus.co.za</div>
          <div><span className="font-medium">Hours:</span> Mon–Sun 08:00–17:00</div>
        </div>
      </div>
      
      <form onSubmit={handleSubmit} className="rounded-2xl border border-zinc-200 p-5 bg-white">
        <div className="grid sm:grid-cols-2 gap-3">
          <Input 
            label="Full name" 
            name="name"
            value={formData.name} 
            onChange={handleChange} 
            required 
          />
          <Input 
            label="Email" 
            name="email"
            type="email"
            value={formData.email} 
            onChange={handleChange} 
            required 
          />
          <Input 
            label="Phone" 
            name="phone"
            value={formData.phone} 
            onChange={handleChange} 
          />
        </div>
        
        <label className="flex flex-col gap-1 mt-3">
          <span className="text-sm text-zinc-600">Message</span>
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            className="px-4 py-2 rounded-xl border border-zinc-300 min-h-[120px]"
            required
          />
        </label>
        
        <div className="mt-4 flex items-center gap-3">
          <button 
            type="submit" 
            disabled={isSending}
            className="px-5 py-3 rounded-2xl bg-zinc-900 text-white disabled:opacity-50"
          >
            {isSending ? 'Sending...' : 'Send Message'}
          </button>
          
          {sendStatus && (
            <span className={`text-sm ${
              sendStatus.includes('successfully') ? 'text-green-600' : 'text-red-600'
            }`}>
              {sendStatus}
            </span>
          )}
        </div>
      </form>
    </div>
  );
}

// Reusable Input component
function Input({ label, name, value, onChange, type = "text", required = false }) {
  return (
    <label className="flex flex-col gap-1">
      <span className="text-sm text-zinc-600">
        {label} {required && <span className="text-red-500">*</span>}
      </span>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        required={required}
        className="px-4 py-2 rounded-xl border border-zinc-300"
      />
    </label>
  );
}

export default Contact;