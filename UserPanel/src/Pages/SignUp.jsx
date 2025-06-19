import React from 'react';
import Header from '../comA/Header';
import Footer from '../comA/Footer';

const backgroundImage = "https://images.pexels.com/photos/751268/pexels-photo-751268.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2";

export default function SignUp() {
  const handleSubmit = (e) => {
    e.preventDefault();
    const name = e.target.fullName.value;
    const email = e.target.email.value;
    const password = e.target.password.value;

    const newUser = { name, email, password };
    localStorage.setItem('user', JSON.stringify(newUser));
    window.location.href = "/room";
  };

  return (
    <div className="flex flex-col min-h-screen">
      <div className="fixed top-0 left-0 w-full z-50 bg-white bg-opacity-60 backdrop-blur-md shadow-sm">
        <Header />
      </div>

      <div
        className="flex-1 flex items-center justify-center pt-48 pb-32 bg-cover bg-center"
        style={{
          backgroundImage: `url(${backgroundImage})`,
          backgroundSize: '120%',
          backgroundPosition: 'center',
        }}
      >
        <div className="bg-white bg-opacity-90 p-8 rounded-2xl shadow-lg max-w-sm w-full space-y-6">
          <h2 className="text-2xl font-bold mb-8 text-orange-500 text-center">Sign Up</h2>
          <form className="space-y-6" onSubmit={handleSubmit}>
            <input
              name="fullName"
              type="text"
              placeholder="Full Name"
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
            <input
              name="email"
              type="email"
              placeholder="Email"
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
            <input
              name="password"
              type="password"
              placeholder="Password"
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
            <button
              type="submit"
              className="w-full bg-orange-500 text-white py-3 rounded-xl hover:bg-orange-600 transition"
            >
              Sign Up
            </button>
          </form>
          <p className="mt-6 text-center text-sm">
            Already have an account? <a href="/signIn" className="text-orange-500 font-semibold">Sign in</a>
          </p>
        </div>
      </div>

      <footer className="bg-white shadow-inner py-6 mt-auto">
        <Footer />
      </footer>
    </div>
  );
}
