import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ListingItem from "../components/ListingItem";

export default function Search() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [listings, setListings] = useState();
  const [message, setMessage] = useState("Listing Results");
  const [formData, setFromData] = useState({
    searchTerm: "",
    type: "all",
    parking: false,
    furnished: false,
    offer: false,
    sort: "created_at",
    order: "desc"
  });


  function onChangeHandler(event) {
    if (
      event.target.id === "all" ||
      event.target.id === "rent" ||
      event.target.id === "sale"
    ) {
      setFromData((preFormData) => {
        return { ...preFormData, type: event.target.id };
      });
    }

    if (event.target.id === "searchTerm") {
      setFromData((preFormData) => {
        return { ...preFormData, searchTerm: event.target.value };
      });
    }

    if (
      event.target.id === "offer" ||
      event.target.id === "parking" ||
      event.target.id === "furnished"
    ) {
      setFromData((preFormData) => {
        return { ...preFormData, [event.target.id]: event.target.checked };
      });
    }

    if (event.target.id === "sort_order") {
      const [sort, order] = event.target.value.split("_");
      setFromData((preFormData) => {
        return { ...preFormData, sort, order };
      });
    }
  }


  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const searchTermFromUrl = urlParams.get("searchTerm");
    const typeFromUrl = urlParams.get("type");
    const parkingFromUrl = urlParams.get("parking");
    const furnishedFromUrl = urlParams.get("furnished");
    const offerFromUrl = urlParams.get("offer"); false
    const sortFromUrl = urlParams.get("sort");
    const orderFromUrl = urlParams.get("order");

    if (searchTermFromUrl || furnishedFromUrl || parkingFromUrl || offerFromUrl || sortFromUrl || orderFromUrl || typeFromUrl) {
      setFromData({
        searchTerm: searchTermFromUrl || '',
        type: typeFromUrl || 'all',
        parking: parkingFromUrl === 'true' ? true : false,
        furnished: furnishedFromUrl === 'true' ? true : false,
        offer: offerFromUrl === 'true' ? true : false,
        sort: sortFromUrl || 'createdAt',
        order: orderFromUrl || 'desc',
      });
    }

    const fetchListings = async () => {
      setLoading(true);
      const res = await fetch(`/api/listing/get?${urlParams.toString()}`);
      const data = await res.json();
      
      if (data.listings.length == 0) {
        setLoading(false);
        return setMessage("Message: No listing found . . . .");
      }

      setLoading(false);
      setListings(data.listings);
    }
    fetchListings();
  }, [location.search]);


  function handleSubmit(event) {
    event.preventDefault();
    const urlParams = new URLSearchParams();
    urlParams.set('searchTerm', formData.searchTerm);
    urlParams.set('type', formData.type);
    urlParams.set('parking', formData.parking);
    urlParams.set('furnished', formData.furnished);
    urlParams.set('offer', formData.offer);
    urlParams.set('sort', formData.sort);
    urlParams.set('order', formData.order);
    const searchQuery = urlParams.toString();
    navigate(`/search?${searchQuery}`);
  }


  return (
    <div className="flex flex-col md:flex-row w-full">
      <div className="border border-slate-300 p-7 md:min-h-screen">
        <form className="flex flex-col gap-6">
          <div className="flex items-center gap-2">
            <label className="whitespace-nowrap font-semibold">Search Term </label>
            <input
              type="text"
              id="searchTerm"
              placeholder="Search . . . ."
              className="border border-slate-300 rounded-lg p-3 w-full text-slate-700 font-semibold focus:outline-none focus:border-green-700"
              value={formData.searchTerm}
              onChange={onChangeHandler}
            />
          </div>

          <div className="flex gap-2 flex-wrap">
            <label className="font-semibold">Type: </label>
            <div className="flex gap-2">
              <input
                type="checkbox"
                id="all"
                className="w-5"
                checked={formData.type == "all"}
                onChange={onChangeHandler}
              />
              <span>Rent & Sale</span>
            </div>
            <div className="flex gap-2">
              <input
                type="checkbox"
                id="rent"
                className="w-5"
                checked={formData.type == "rent"}
                onChange={onChangeHandler}
              />
              <span>Rent</span>
            </div>
            <div className="flex gap-2">
              <input
                type="checkbox"
                id="sale"
                className="w-5"
                checked={formData.type == "sale"}
                onChange={onChangeHandler}
              />
              <span>Sale</span>
            </div>
            <div className="flex gap-2">
              <input
                type="checkbox"
                id="offer"
                className="w-5"
                checked={formData.offer}
                onChange={onChangeHandler}
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
                checked={formData.parking}
                onChange={onChangeHandler}
              />
              <span>Parking</span>
            </div>
            <div className="flex gap-2">
              <input
                type="checkbox"
                id="furnished"
                className="w-5"
                checked={formData.furnished}
                onChange={onChangeHandler}
              />
              <span>Furnished</span>
            </div>
          </div>

          <div className="flex gap-2 items-center">
            <span className="font-semibold">Sort: </span>
            <select
              id="sort_order"
              className="p-3 bg-white border border-slate-300 rounded-lg w-full text-center"
              defaultValue={"createdAt_desc"}
              onChange={onChangeHandler}
            >
              <option value='regularPrice_desc'>Price high to low</option>
              <option value='regularPrice_asc'>Price low to hight</option>
              <option value='createdAt_desc'>Latest</option>
              <option value='createdAt_asc'>Oldest</option>
            </select>
          </div>

          <button
            className='bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 font-semibold tracking-wider'
            onClick={handleSubmit}
          >
            Search
          </button>
        </form>
      </div>

      <div className="flex flex-1 flex-col">
        {
          loading ? <p className="text-1xl sm:text-[20px] text-center w-full m-5">Loading . . . .</p> : 
                    <p className="text-1xl sm:text-[20px] font-semibold text-center w-full m-5">{message}</p>
        }

        <div className="px-5 mt-0 flex flex-wrap gap-4">
          {
            !loading && listings && listings.map((listing) => {
              return (
                <ListingItem key={listing._id} listing={listing}/>
              );
            })
          }
        </div>
      </div>
    </div>
  );
}