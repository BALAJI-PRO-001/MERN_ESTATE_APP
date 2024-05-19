export default function CreateListing() {
  return (
    <main className="p-3 max-w-4xl mx-auto">
      <h1 className="text-3xl font-semibold text-center my-7 text-gray-700">Create a Listing</h1>
      <form className="flex flex-col sm:flex-row">
        <div className="flex flex-col gap-4 flex-1">
          <input
            id="name"
            type="text"
            placeholder="Name . . . ."
            className="border p-3 rounded-lg outline-none focus:border-green-600 focus:outline-none"
            maxLength="65"
            minLength="10"
            required
          />
          <textarea
            id="description"
            type="text"
            placeholder="Description . . . ."
            className="border p-3 rounded-lg outline-none focus:border-green-600 focus:outline-none"
            required
          ></textarea>
          <textarea
            id="address"
            type="text"
            placeholder="Address . . . ."
            className="border p-3 rounded-lg outline-none focus:border-green-600 focus:outline-none"
            required
          ></textarea>

          <div className="flex flex-row flex-wrap gap-4">
            <div className="flex gap-1">
              <input type="checkbox" id="sale" className="w-5"/>
              <span>Sell</span>
            </div>
            <div className="flex gap-1">
              <input type="checkbox" id="rent" className="w-5"/>
              <span>Rent</span>
            </div>
            <div className="flex gap-1">
              <input type="checkbox" id="parking" className="w-5"/>
              <span>Parking spot</span>
            </div>
            <div className="flex gap-1">
              <input type="checkbox" id="furnished" className="w-5"/>
              <span>Furnished</span>
            </div>
            <div className="flex gap-1">
              <input type="checkbox" id="offer" className="w-5"/>
              <span>Offer</span>
            </div>
          </div>

          <div className="flex flex-row gap-4 flex-wrap">
            <div className="flex items-center gap-1">
              <input 
                type="number" 
                id="bedrooms" 
                min="1" max="10" required size="8"
                className="p-3 border rounded-lg focus:outline-none focus:border-green-600"
              />
              <p>Beds</p>
            </div>
            <div className="flex items-center gap-1">
              <input 
                type="number" 
                id="bathrooms" 
                min="1" max="10" required size="8"
                className="p-3 border rounded-lg focus:outline-none focus:border-green-600"
              />
              <p>Bathrooms</p>
            </div>
            <div className="flex items-center gap-1">
              <input 
                type="number" 
                id="regular-price" 
                min="50" required size="8"
                className="p-3 border rounded-lg focus:outline-none focus:border-green-600"
              />
              <p>Regular price</p> 
              <span className="text-xs">($ / month)</span>
            </div>
            <div className="flex items-center gap-1">
              <input 
                type="number" 
                id="discounted-price" 
                min="50" required size="8"
                className="p-3 border rounded-lg focus:outline-none focus:border-green-600"
              />
              <p>Discounted price</p>
              <span className="text-xs">($ / month)</span>
            </div>
          </div>

        </div>
      </form>
    </main>
  );
}
