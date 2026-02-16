import React from "react";

const NewArrival = () => {
  return (
    <section className="container mx-auto px-4 my-20">
      <div className="flex gap-x-4 items-center mb-9">
        <span className="bg-red-600 w-4.5 h-9 rounded"></span>{" "}
        <h4 className="font-semibold text-red-600 text-lg">Featured</h4>
      </div>

      <h4 className="text-4xl tracking-wider mb-12 font-semibold">
        New Arrival
      </h4>

      <nav className="flex gap-6 flex-wrap justify-center">
        <div className="relative">
          <img src="PlayStation.jpeg" className="max-w-150" alt="" />
          <div className="absolute bottom-6 left-6">
            <h5 className="text-xl mb-4 font-bold text-white">PlayStation 5</h5>
            <p className="text-white text-sm mb-4 max-w-62.5">
              Black and White version of the PS5 coming out on sale.
            </p>
            <a href="/products" className="text-white text-lg underline">
              Shop Now
            </a>
          </div>
        </div>

        <div className="space-y-6">
          <div className="relative">
            <img src="Womens-Collection.jpeg" className="max-w-150" alt="" />
            <div className="absolute bottom-6 left-6">
              <h5 className="text-xl mb-4 font-bold text-white">
                Women’s collection style
              </h5>
              <p className="text-white text-sm mb-4 max-w-62.5">
                Featured woman collections that give you another vibe.
              </p>
              <a href="/products" className="text-white text-lg underline">
                Shop Now
              </a>
            </div>
          </div>

          <div className="flex gap-6">

             <div className="relative">
            <img src="Speakers.jpeg" className="max-w-72.5 " alt="" />
            <div className="absolute bottom-6 left-6">
              <h5 className="text-xl mb-4 font-bold text-white">
                Speaker
              </h5>
              <p className="text-white text-sm mb-4 max-w-62.5">
                Amazon wireless speakers.
              </p>
              <a href="/products" className="text-white text-lg underline">
                Shop Now
              </a>
            </div>
          </div>


           <div className="relative">
            <img src="Perfume.jpeg" className="max-w-72.5" alt="" />
            <div className="absolute bottom-6 left-6">
              <h5 className="text-xl mb-4 font-bold text-white">
                Perfume
              </h5>
              <p className="text-white text-sm mb-4 max-w-62.5">
                GUCCI INTENSE OUD EDP.
              </p>
              <a href="/products" className="text-white text-lg underline">
                Shop Now
              </a>
            </div>
          </div>


          </div>
        </div>
      </nav>
    </section>
  );
};

export default NewArrival;
