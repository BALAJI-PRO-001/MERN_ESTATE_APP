import React, { useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { FaSearch } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";

export default function Listings() {
  const { currentUser } = useSelector((state) => state.user);
  const [deleteListingMessage, setDeleteListingMessage] = useState({});
  const [userListings, setUserListings] = useState([]);
  const [listings, setListings] = useState([]);
  const navigate = useNavigate();


  useEffect(() => {
    const fetchListings = async () => {
      try {
        const res = await fetch(`/api/user/listings/${currentUser._id}`, { method: "GET" });
        const data = await res.json();

        if (data.success === false) {
          console.warn(success);
        }

        setUserListings(data.listings);
        setListings(data.listings);
      } catch (error) {
        console.warn(error.message);
      }
    }
    fetchListings();
  }, []);


  async function handleDeleteListing(listingId) {
    try {
      const res = await fetch(`/api/listing/delete/${listingId}`, {
        method: "DELETE"
      });

      let data = null;
      if (res.status != 204) {
        data = await res.json();
      }

      if (data && data.success === false) {
        setDeleteListingMessage({ message: "Error: " + data.message, listingId: listingId });
        return;
      }

      setUserListings((preUserListings) => {
        setListings((preListings) => {
          return preListings.filter((listing) => listing._id !== listingId);
        });
        return preUserListings.filter((listing) => listing._id !== listingId);
      });


    } catch (error) {
      setDeleteListingMessage({ message: "Error: " + data.message, listingId: listingId });
    }
  }


  function sortListings(searchString) {
    searchString = searchString.toLowerCase().trim();
    setListings(userListings);
    if (searchString.length > 0) {
      setListings((preListing) => {
        return preListing.filter((listing) => listing.name.toLowerCase().includes(searchString))
      });
    }
  }

  return (
    <React.Fragment>
      {
        userListings.length > 0 && (
          <div className="flex flex-col gap-3 mt-6 mb-4 w-full items-center">
            <p className=" font-semibold text-center text-2xl">Your Listings</p>
            <div className="bg-white w-[50%] c-s-w h-12 rounded-lg flex item-center border border-slate-300">
              <input
                placeholder="Search . . ."
                className="focus:outline-none font-semibold w-full h-ful rounded-lg ml-5 text-slate-600"
                onChange={(event) => sortListings(event.target.value)}
                style={{ textIndent: "5px" }}
                onFocus={(event) => {
                  event.target.parentElement.classList.add("border-green-600");
                }}
                onBlur={(event) => {
                  event.target.parentElement.classList.remove("border-green-600");
                  event.target.parentElement.classList.add("border-slate-300");
                }}
              />
              <FaSearch className="text-slate-600 h-full mr-6 w-5"></FaSearch>
            </div>
            {listings.length <= 0 && <p className="text-center font-semibold text-red-600">No listings are available . . . .</p>}
          </div>
        )
      }
      <div className="flex flex-wrap justify-center">
        {
          listings.map((listing, index) => {
            return (
              <div key={index} className="border border-slate-300 rounded-lg m-5 p-3 c-w">
                <Link to={`/listing/${listing._id}`}>
                  <p className="text-center mb-3 text-slate-700 font-semibold hover:text-blue-600">Listing: {index + 1}</p>
                </Link>
                <Link to={`/listing/${listing._id}`}>
                  <img
                    src={listing.imageUrls[0]}
                    alt="loading"
                    className="w-full h-[300px] rounded-lg mb-2 object-fill"
                    style={{
                      display: "block"
                    }}
                  />
                </Link>
                <div className="flex flex-wrap gap-2 justify-start mb-2 border border-slate-300 rounded-lg p-3">
                  {
                    listing.imageUrls.map((url, index) => {
                      return <img
                        key={index}
                        src={url}
                        alt="loading"
                        className="w-[60px] h-[55px] rounded-lg hover:cursor-pointer hover:opacity-85"
                        onClick={(event) => {
                          const imgElement = event.target.parentElement.previousElementSibling.children[0];
                          imgElement.src = event.target.src;
                        }}
                      />
                    })
                  }
                </div>
                <div className="p-3 border border-slate-300 mt-2 mb-2 rounded-lg">
                  <p className="font-semibold text-center mb-1 text-slate-700">Listing Details</p>
                  <p className="font-semibold mt-1 text-gray-700">Name: <span className="font-normal text-black">{listing.name}</span></p>
                  <p className="font-semibold mt-1 text-gray-700">Type: <span className="font-normal text-black">{listing.type}</span></p>
                  <p className="font-semibold mt-1 text-gray-700">Offer: <span className="font-normal text-black">{listing.offer ? "true" : "false"}</span></p>
                  <p className="font-semibold mt-1 text-gray-700">Parking: <span className="font-normal text-black">{listing.parking ? "true" : "false"}</span></p>
                  <p className="font-semibold mt-1 text-gray-700">Furnished: <span className="font-normal text-black">{listing.furnished ? "true" : "false"}</span></p>
                  <p className="font-semibold mt-1 text-gray-700">Bedrooms: <span className="font-normal text-black">{listing.bedrooms}</span></p>
                  <p className="font-semibold mt-1 text-gray-700">Bathrooms: <span className="font-normal text-black">{listing.bathrooms}</span></p>
                  <p className="font-semibold mt-1 text-gray-700">Regular Price: <span className="font-normal text-black"> $  {listing.regularPrice}</span></p>
                  <p className="font-semibold mt-1 text-gray-700">Discount Price: <span className="font-normal text-black"> $  {listing.discountPrice}</span></p>
                  <p className="font-semibold mt-1 text-gray-700">Address: <span className="font-normal text-black">{listing.address}</span></p>
                  <p className="font-semibold mt-1 mb-2 text-gray-700">Description: <span className="font-normal text-black">{listing.description}</span></p>
                </div>
                <div className="flex flex-col gap-2">
                  <button
                    className="bg-green-700 text-white w-full py-3 rounded-lg font-semibold hover:opacity-85"
                    onClick={() => navigate(`/update-listing/${listing._id}`)}
                  >
                    Edit Listing
                  </button>
                  <button
                    type="button"
                    className="bg-red-600 text-white w-full py-3 rounded-lg font-semibold hover:opacity-85"
                    onClick={() => handleDeleteListing(listing._id)}
                  >
                    Delete Listing
                  </button>
                </div>  
                {
                  listing._id === deleteListingMessage.listingId && <span className="text-red-600 font-semibold text-1xl block mt-1 text-center">{deleteListingMessage.message}</span>
                }
              </div>
            );
          })
        }
      </div>
    </React.Fragment>
  );
}