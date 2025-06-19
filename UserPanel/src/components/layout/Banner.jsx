// import React, { useState, useEffect } from 'react';
// import indexImage from '../../assets/images';

// const Banner = () => {
//   const slides = [
//     indexImage,
//     indexImage,
//     indexImage
//   ];

//   const [index, setIndex] = useState(0);

//   useEffect(() => {
//     const timer = setInterval(() => {
//       setIndex((prevIndex) => (prevIndex + 1) % slides.length);
//     }, 5000);
//     return () => clearInterval(timer);
//   }, [slides.length]);

//   return (
//     <section
//       className="h-screen bg-cover bg-center relative flex items-center justify-center transition-all duration-700"
//       style={{ backgroundImage: `url(${slides[index]})` }}
//     >
//       <div className="bg-black bg-opacity-60 w-full h-full absolute top-0 left-0" />
//       <div className="relative text-white text-center z-10">
//         <h1 className="text-6xl font-bold mb-8">A Luxury Stay</h1>
//       </div>
//     </section>
//   );
// };

// export default Banner;
