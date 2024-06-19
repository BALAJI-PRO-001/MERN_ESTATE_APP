
export default function Search() {
  return (
    <div className="flex flex-col md:flex-row">
      <div className="border border-slate-300 p-7 md:min-h-screen">
        <form className="flex flex-col gap-6">
          <div className="flex items-center gap-2">
            <label className="whitespace-nowrap font-semibold">Search Term: </label>
            <input
              type="text"
              id="searchTerm"
              placeholder="Search . . . ."
              className="border border-slate-300 rounded-lg p-3 w-full text-slate-700 font-semibold focus:outline-none focus:border-green-700"
            />
          </div>

          <div className="flex gap-2 flex-wrap">
            <label className="font-semibold">Type: </label>
            <div className="flex gap-2">
              <input
                type="checkbox"
                id="all"
                className="w-5"
              />
              <span>Rent & Sale</span>
            </div>
            <div className="flex gap-2">
              <input
                type="checkbox"
                id="rent"
                className="w-5"
              />
              <span>Rent</span>
            </div>
            <div className="flex gap-2">
              <input
                type="checkbox"
                id="sale"
                className="w-5"
              />
              <span>Sale</span>
            </div>
            <div className="flex gap-2">
              <input
                type="checkbox"
                id="sale"
                className="w-5"
              />
              <span>Offer</span>
            </div>
          </div>

          <div className="flex gap-2 flex-wrap">
            <label className="font-semibold">Amenities: </label>
            <div className="flex gap-2">
              <input
                type="checkbox"
                id="parking"
                className="w-5"
              />
              <span>Parking</span>
            </div>
            <div className="flex gap-2">
              <input
                type="checkbox"
                id="furnished"
                className="w-5"
              />
              <span>Furnished</span>
            </div>
          </div>

          <div className="flex gap-2 items-center">
            <span className="font-semibold">Sort: </span>
            <select id="sort_order" className="p-3 bg-white border border-slate-300 rounded-lg w-full text-center">
              <option value='regularPrice_desc'>Price high to low</option>
              <option value='regularPrice_asc'>Price low to hight</option>
              <option value='createdAt_desc'>Latest</option>
              <option value='createdAt_asc'>Oldest</option>
            </select>
          </div>

          <button className='bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95'>
            Search
          </button>
        </form>
      </div>

      <div className="flex">
        <h1 className="text-3xl text-slate-600 font-semibold justify-center items-center">Listings</h1>
      </div>
    </div>
  ); 
}