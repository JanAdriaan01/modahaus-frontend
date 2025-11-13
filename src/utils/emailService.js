javascript
const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001';

export const sendOrderEmail = async (orderItem, customerInfo) => {
  try {
    const orderDetails = {
      name: customerInfo.name,
      email: customerInfo.email,
      subject: `New Order: ${orderItem.systemName}`,
      message: `
ORDER DETAILS:
System: ${orderItem.systemName}
Size: ${orderItem.size}
Glazing: ${orderItem.glazing}
Finish: ${orderItem.finish}
Quantity: ${orderItem.quantity}
Price: R ${orderItem.price?.toLocaleString() || '0'}
Subtotal: R ${orderItem.subtotal?.toLocaleString() || '0'}

CUSTOMER INFORMATION:
Name: ${customerInfo.name}
Email: ${customerInfo.email}
Phone: ${customerInfo.phone}
Address: ${customerInfo.address}
Source: ${customerInfo.source || 'Product Details'}
      `.trim()
    };

    const response = await fetch(`${API_URL}/api/send-email`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(orderDetails),
    });

    if (!response.ok) {
      throw new Error('Failed to send order email');
    }

    return await response.json();
  } catch (error) {
    console.error('Email service error:', error);
    throw error;
  }
};

export const sendContactEmail = async (formData) => {
  try {
    const response = await fetch(`${API_URL}/api/send-email`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });

    if (!response.ok) {
      throw new Error('Failed to send contact email');
    }

    return await response.json();
  } catch (error) {
    console.error('Contact email error:', error);
    throw error;
  }
};