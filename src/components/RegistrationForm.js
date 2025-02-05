import React, { useState } from 'react';

const RegistrationForm = () => {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false); // State to track form submission

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted with email:', email);
    setIsSubmitted(true); // Update the submission state
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Email Address
        </label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@example.com"
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none"
          required
        />
      </div>
      {isSubmitted ? (
        <div className="w-full bg-green-100 text-green-700 py-3 rounded-lg text-center">
          Thank you for registering!
        </div>
      ) : (
        <button
          type="submit"
          className="w-full bg-purple-600 text-white py-3 rounded-lg hover:bg-purple-700 transition-colors"
        >
          Reserve Your Spot
        </button>
      )}
    </form>
  );
};

export default RegistrationForm;
    