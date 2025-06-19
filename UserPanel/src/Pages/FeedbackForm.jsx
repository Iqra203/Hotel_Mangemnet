import React, { useState } from 'react';

const FeedbackForm = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [rating, setRating] = useState(5);  // Default rating is 5
  const [comments, setComments] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const feedbackData = { name, email, rating, comments };
    console.log('Feedback Submitted:', feedbackData);
    alert('Thank you for your feedback!');

    // Reset form fields
    setName('');
    setEmail('');
    setRating(5);
    setComments('');
  };

  return (
    <div className="feedback-form">
      <h2 className="text-xl font-bold">Submit Your Feedback</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block">Full Name</label>
          <input
            type="text"
            className="input"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div>
          <label className="block">Email</label>
          <input
            type="email"
            className="input"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label className="block">Rating (1 to 5)</label>
          <input
            type="number"
            min="1"
            max="5"
            className="input"
            value={rating}
            onChange={(e) => setRating(Number(e.target.value))}
            required
          />
        </div>
        <div>
          <label className="block">Comments</label>
          <textarea
            className="textarea"
            value={comments}
            onChange={(e) => setComments(e.target.value)}
          />
        </div>
        <button type="submit" className="submit-btn">Submit Feedback</button>
      </form>
    </div>
  );
};

export default FeedbackForm;
