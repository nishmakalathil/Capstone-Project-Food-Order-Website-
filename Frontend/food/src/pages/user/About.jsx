
import React from "react";

function About() {
  return (
    <div className="px-6 py-8 bg-gray-50"> 
      
      
      <section className="max-w-none mx-auto mb-12 px-0">
        <img
          src="https://res.cloudinary.com/dbkexrtm3/image/upload/v1738655219/pngtree-delivery-man-with-boxes-and-clipboard-on-pink-background-christmas-concept-image_15277281_tchinc.jpg" // Replace with your image URL
          alt="Delicious Food"
          className="w-full h-screen object-cover rounded-none shadow-none" // Full width, full screen height, cover the area, no rounding
        />
      </section>

      
      <section className="max-w-7xl mx-auto flex items-center justify-between px-4">
        <div className="w-full lg:w-1/2">
          
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold text-black mb-4 tracking-wide leading-tight transform transition duration-300 ease-in-out hover:scale-105 hover:tracking-wider">
            From food delivery <br /> to your daily convenience companion.
          </h2>

          <p className="text-base sm:text-lg lg:text-xl text-black mb-6 font-medium">
            A newly launched platform in Bangalore in 2024,{" "}
            <strong className="text-black">Nish Delight Place</strong> started as
            a food delivery service. Dedicated to helping customers get their tasty
            favorites fast, it quickly won the hearts and minds of customers in the city.
          </p>
          <p className="text-base sm:text-lg lg:text-xl text-black mb-8 font-medium">
            Powered by tech and operational excellence,{" "}
            <strong className="text-black">Nish Delight Place</strong> is growing
            its quick-commerce footprint in Bangalore and plans to expand across other
            cities. With the support of dedicated partners, riders, and a team united by
            shared values,{" "}
            <strong className="text-black">Nish Delight Place</strong> is now
            providing millions with a convenient way to get food and groceries in just a
            few taps.
          </p>
        </div>
      </section>







      

    
      <section className="bg-indigo-100 py-16">
        <div className="max-w-7xl mx-auto text-center px-4">
          <h2 className="text-4xl font-extrabold text-black mb-6">Our Mission</h2>
          <p className="text-lg sm:text-xl text-black mb-10 leading-relaxed font-semibold">
            At <strong className="text-black">Nish Delight</strong>, we aim to
            redefine food delivery. We’re all about making your experience faster,
            easier, and more delicious – with every meal bringing a little more joy to
            your day. Whether it’s a cozy dinner at home, a busy workday, or a quick
            snack break, our mission is to deliver what you crave with convenience,
            speed, and quality. With every order, we strive to offer more than just food— 
            we bring a moment of delight right to your doorstep!
          </p>
        </div>
      </section>

      
      <section className="max-w-7xl mx-auto text-center my-20 px-4">
        <h2 className="text-4xl font-extrabold text-black mb-6">
          Why Choose Nish Delight?
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="card w-full bg-white shadow-2xl p-8 rounded-xl hover:shadow-2xl transform transition duration-300 hover:scale-105">
            <h3 className="text-2xl font-bold text-black mb-4">Fresh & Tasty</h3>
            <p className="text-black leading-relaxed">
              Made with the finest ingredients and the most flavorful recipes, every
              dish is a delight!
            </p>
          </div>
          <div className="card w-full bg-white shadow-2xl p-8 rounded-xl hover:shadow-2l transform transition duration-300 hover:scale-105">
            <h3 className="text-2xl font-bold text-black mb-4">Fast Delivery</h3>
            <p className="text-black leading-relaxed">
              We make sure your food is hot, fresh, and at your doorstep in no time.
            </p>
          </div>
          <div className="card w-full bg-white shadow-2xl p-8 rounded-xl hover:shadow-2l transform transition duration-300 hover:scale-105">
            <h3 className="text-2xl font-bold text-black mb-4">
              Customer Satisfaction
            </h3>
            <p className="text-black leading-relaxed">
              Your happiness is our priority, from the first bite to the last.
            </p>
          </div>
        </div>
      </section>

      
      <section className="max-w-7xl mx-auto text-center my-20 px-4">
        <h2 className="text-4xl font-extrabold text-black mb-6">
          Our Values
        </h2>
        <div className="flex flex-wrap justify-center gap-6">
          <div className="bg-indigo-100 py-4 px-8 rounded-full shadow-2xl transform transition duration-300 hover:scale-105">
            <p className="text-xl text-black font-medium">Start with customer, end with customer</p>
          </div>
          <div className="bg-indigo-100 py-4 px-8 rounded-full shadow-2xl transform transition duration-300 hover:scale-105">
            <p className="text-xl text-black font-medium">Prioritize, decide, deliver</p>
          </div>
          <div className="bg-indigo-100 py-4 px-8 rounded-full shadow-2xl transform transition duration-300 hover:scale-105">
            <p className="text-xl text-black font-medium">Own it end-to-end</p>
          </div>
          <div className="bg-indigo-100 py-4 px-8 rounded-full shadow-2xl transform transition duration-300 hover:scale-105">
            <p className="text-xl text-black font-medium">Challenge the status quo before me</p>
          </div>
          <div className="bg-indigo-100 py-4 px-8 rounded-full shadow-2xl transform transition duration-300 hover:scale-105">
            <p className="text-xl text-black font-medium">Plan for tomorrow, focus on today</p>
          </div>
        </div>
      </section>

    </div>
  );
}

export default About;
