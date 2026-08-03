import { useEffect, useState } from 'react';
import { apiUrl } from '../utils/api.js';

export default function Contact({ isVisible }) {
  const [toast, setToast] = useState(null);

  useEffect(() => {
    if (!toast) return undefined;
    const timeout = window.setTimeout(() => setToast(null), 3500);
    return () => window.clearTimeout(timeout);
  }, [toast]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formElement = event.currentTarget;
    const form = new FormData(event.currentTarget);
    const payload = {
      name: form.get('name'),
      email: form.get('email'),
      mobile: form.get('mobile'),
      subject: form.get('subject'),
      message: form.get('message')
    };

    try {
      const response = await fetch(apiUrl('/api/contact'), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (!response.ok) {
  let message = "Could not submit your message.";

  try {
    const data = await response.json();
    message = data.message || message;
  } catch {}

  throw new Error(message);
}

      formElement.reset();
      setToast({ type: 'success', text: 'Thank you! Your message has been submitted.' });
    } catch (error) {
      setToast({ type: 'error', text: error.message || 'Something went wrong. Please try again.' });
    }
  };

  return (
    <section className={`contact ${isVisible ? 'show-animate' : ''}`} id="contact">
      <h2 className="heading">Contact <span>Me!</span><span className="animate scroll" style={{ '--i': 1 }} /></h2>

      <form onSubmit={handleSubmit}>
        <div className="input-box">
          <div className="input-field">
            <input name="name" type="text" placeholder="Full Name" required />
            <span className="focus" />
          </div>
          <div className="input-field">
            <input name="email" type="email" placeholder="Email Address" required />
            <span className="focus" />
          </div>
          <span className="animate scroll" style={{ '--i': 3 }} />
        </div>
        <div className="input-box">
          <div className="input-field">
            <input name="mobile" type="number" placeholder="Mobile Number" required />
            <span className="focus" />
          </div>
          <div className="input-field">
            <input name="subject" type="text" placeholder="Email Subject" required />
            <span className="focus" />
          </div>
          <span className="animate scroll" style={{ '--i': 5 }} />
        </div>
        <div className="textarea-field">
          <textarea name="message" cols="30" rows="10" placeholder="Your Message" required />
          <span className="focus" />
          <span className="animate scroll" style={{ '--i': 7 }} />
        </div>
        <div className="btn-box btns">
          <button type="submit" className="btn">Submit</button>
          <span className="animate scroll" style={{ '--i': 9 }} />
        </div>
      </form>

      {toast ? (
        <div className={`toast-notification ${toast.type}`} role="status" aria-live="polite">
          <i className={`bx ${toast.type === 'success' ? 'bx-check-circle' : 'bx-error-circle'}`} />
          <span>{toast.text}</span>
        </div>
      ) : null}
    </section>
  );
}
