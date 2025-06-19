import React from 'react';
import Header from '../comA/Header';
import Footer from '../comA/Footer';

const backgroundImage = "https://images.pexels.com/photos/751268/pexels-photo-751268.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2";

export default function SignIn() {
  const handleSubmit = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;

    const savedUser = JSON.parse(localStorage.getItem('user'));

    if (savedUser && savedUser.email === email && savedUser.password === password) {
      localStorage.setItem('user', JSON.stringify(savedUser)); // Optional, can skip
      window.location.href = "/room";
    } else {
      alert("Invalid email or password");
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <div className="fixed top-0 left-0 w-full z-50 bg-white bg-opacity-60 backdrop-blur-md shadow-sm">
        <Header />
      </div>

      <div
        className="flex-1 flex items-center justify-center min-h-[100vh] bg-cover bg-center"
        style={{ backgroundImage: `url(${backgroundImage})`, backgroundSize: 'cover' }}
      >
        <div className="bg-white bg-opacity-90 p-8 rounded-2xl shadow-lg max-w-sm w-full space-y-6">
          <h2 className="text-2xl font-bold mb-8 text-orange-500 text-center">Sign In</h2>
          <form className="space-y-6" onSubmit={handleSubmit}>
            <input name="email" type="email" placeholder="Email" className="w-full px-4 py-3 border border-gray-300 rounded-xl" />
            <input name="password" type="password" placeholder="Password" className="w-full px-4 py-3 border border-gray-300 rounded-xl" />
            <button type="submit" className="w-full bg-orange-500 text-white py-3 rounded-xl hover:bg-orange-600 transition">Sign In</button>
          </form>
          <p className="mt-6 text-center text-sm">
            Don’t have an account? <a href="/signUp" className="text-orange-500 font-semibold">Sign up</a>
          </p>
        </div>
      </div>

      <footer className="bg-white shadow-inner py-6 mt-auto">
        <Footer />
      </footer>
    </div>
  );
}
