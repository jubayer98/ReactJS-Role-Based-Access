import { useState } from 'react';
import Swal from 'sweetalert2';

function NewsletterSection() {
  const [email, setEmail] = useState('');

  const handleInputChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSubscribe = async () => {
    try {
      const response = await fetch('https://fitness-tracker-server-tawny.vercel.app/subscribers', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email: email })
      });

      if (!response.ok) {
        throw new Error('Failed to subscribe. Please try again.');
      }

      // Display success message using SweetAlert2
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "You have been added to the subscription list.",
        showConfirmButton: false,
        timer: 1500
      }).then(() => {
        // Reset email state to clear the input field
        setEmail('');
      });
      
    } catch (error) {
      Swal.fire({
        position: "top-end",
        icon: 'error',
        title: 'Oops...',
        text: 'Something went wrong. Please try again.',
        showConfirmButton: false,
        timer: 1500
      });
    }
  };

  return (
    <section className="bg-gradient-to-l mt-5 from-emerald-200 to-emerald-500 py-16 px-6 text-white text-center">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-extrabold sm:text-4xl">
          Stay Updated with Our Latest News
        </h2>
        <p className="mt-4 text-lg">
          Subscribe to our newsletter and get the latest updates, news, and special offers straight to your inbox!
        </p>

        <div className="mt-8 flex justify-center items-center space-x-4">
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={handleInputChange}
            className="w-72 p-3 rounded-lg text-black"
          />
          <button
            onClick={handleSubscribe}
            className="bg-emerald-500 hover:bg-emerald-600 text-white py-3 px-6 rounded-lg"
          >
            Subscribe
          </button>
        </div>
      </div>
    </section>
  );
}

export default NewsletterSection;
