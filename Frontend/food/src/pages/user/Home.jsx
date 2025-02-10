import React, { useState } from "react";
import Carousel from "../../components/user/Carousel"; 

function Home() {
  const [user, setUser] = useState("Arnika"); 

  return (
    <div className="px-20">
      
      <section>
        <Carousel />
      </section>

      <section className="min-h-96 flex gap-20 px-20 py-10 w-full">
        <div className="w-8/12 mx-auto"> 
          <p className="text-2xl text-center p-5">
            Welcome to{" "}
            <span className="font-extrabold text-gray-900">Nish Delight</span>, where every bite brings pure joy! We’re here to serve up delicious, crave-worthy meals that make every moment feel special. From bold flavors to fresh ingredients, we bring you the finest dishes designed to satisfy your cravings and lift your spirits. Let us take care of the cooking, while you indulge in the delight of exceptional taste.
          </p>
        </div>
      </section>

      <div className="px-20 py-10">
        <section className="flex items-center justify-between space-x-10">
          
          <div className="w-6/12">
            <img
              className="w-full h-auto rounded-lg shadow-lg"
              src="https://res.cloudinary.com/dbkexrtm3/image/upload/v1738604997/homepage_left_pic_g7wnyl.jpg" 
              alt="Home Image"
            />
          </div>

          
          <div className="w-6/12">
            <h1 className="text-4xl font-bold mb-5 text-center"> 
              Meet the next generation of delivery!
            </h1>
            <p className="text-xl font-normal mb-5 text-center"> 
              Craving something special? At Nish Delight, we’ve got it all – from the aromatic Biriyanis that will transport you to another world, to the juicy, flavorful Burgers that’ll leave you craving more. And don’t forget the Desserts, where every bite is pure indulgence. Freshly made, bursting with flavor, and just a click away. Order now and treat yourself to a feast that’s as delicious as it is unforgettable!
            </p>
            <button className="bg-pink-500 text-white hover:bg-pink-600 py-2 px-6 rounded-full mx-auto block transition duration-300">Read our story</button> {/* Pink Button */}
          </div>
        </section>
      </div>

      
      <div className="px-20 py-10">
        <section className="flex items-center justify-between space-x-10">
          
          <div className="w-6/12">
            <h1 className="text-4xl font-bold mb-5 text-center"> {/* Center the heading */}
              Your favorite meals, delivered fresh!
            </h1>
            <p className="text-xl font-normal mb-5 text-center"> {/* Center the paragraph */}
              Whether it’s a hearty meal or a quick snack, Nish Delight delivers it all with a smile. Enjoy the convenience of doorstep delivery with the flavors you love. It’s time to sit back, relax, and savor your favorite meals from the comfort of your home!
            </p>
            <button className="bg-pink-500 text-white hover:bg-pink-600 py-2 px-6 rounded-full mx-auto block transition duration-300">Explore our menu</button> {/* Pink Button */}
          </div>

        
          <div className="w-6/12">
            <img
              className="w-full h-auto rounded-lg shadow-lg"
              src="https://res.cloudinary.com/dbkexrtm3/image/upload/v1739085924/fotot_edited_homepagr_pic_w91sjz.png" // Replace with your image
              alt="Food Delivery Image"
            />
          </div>
        </section>
      </div>

      
      <div className="px-20 py-10">
        <section className="flex items-center justify-between space-x-10">
          
          <div className="w-6/12">
            <img
              className="w-full h-auto rounded-lg shadow-lg"
              src="https://res.cloudinary.com/dbkexrtm3/image/upload/v1738605727/last_pic_szxi41.jpg" // Replace with your image
              alt="Delivery Image"
            />
          </div>

          
          <div className="w-6/12">
            <h1 className="text-4xl font-bold mb-5 text-center"> 
              Fast and Reliable Delivery!
            </h1>
            <p className="text-xl font-normal mb-5 text-center"> 
              Enjoy your favorite dishes delivered to your doorsteps quickly and reliably. With Nish Delight, you can always count on fast and fresh delivery to satisfy your cravings. We ensure every meal is made with care and delivered with a smile.
            </p>
            <button className="bg-pink-500 text-white hover:bg-pink-600 py-2 px-6 rounded-full mx-auto block transition duration-300">Order Now</button> {/* Pink Button */}
          </div>
        </section>
      </div>
    </div>
  );
}

export default Home;
