import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import {
  FaBath,
  FaBed,
  FaChair,
  FaMapMarkedAlt,
  FaMapMarkerAlt,
  FaParking,
  FaShare,
} from 'react-icons/fa';
// import Contact from '../components/Contact';

export default function Listing() {
  const [listing, setListing] = useState(null);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState(false);
  const [copied, setCopied] = useState(false);
  const params = useParams();

  useEffect(() => {
    try {
      const fetchListing = async () => {
        const id = params.id;
        setLoading(true);
        const res = await fetch(`/api/listing/get/${id}`, {
          method: "GET"
        });
        const data = await res.json();

        if (data.success === false) {
          setLoading(false);
          setErr(true);
        }
        setListing(data.listing);
        setLoading(false);
      }
      fetchListing();
    } catch (error) {
      setLoading(false);
      setErr(true);
    }
  }, []);

  return (
    <main>
      {
        loading ? <p className="text-2xl font-semibold text-center absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">Loading . . . .</p> : " "
      }
      {
        err ? <p className="text-2xl font-semibold text-red-600 text-center absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">Something went wrong!</p> : " "
      }
      {
        listing && (
          <React.Fragment>
            <Swiper
              spaceBetween={0}
              centeredSlides={true}
              pagination={{ clickable: true }}
              navigation={true}
              modules={[Autoplay, Pagination, Navigation]}
              autoplay={{
                delay: 2500,
                disableOnInteraction: true
              }}
            >
              {
                listing.imageUrls.map((url, index) => {
                  return (
                    <SwiperSlide key={index} >
                      <div
                        className="h-[500px]"
                        style={{ background: `url(${url}) center no-repeat`, backgroundSize: `cover` }}
                      ></div>
                    </SwiperSlide>
                  );
                })
              }
            </Swiper>
            <div className='fixed top-[70%] right-[3%] z-10 border rounded-full border-black-300 w-12 h-12 flex justify-center items-center bg-slate-100 cursor-pointer'>
              <FaShare
                className='text-blue-700'
                onClick={() => {
                  navigator.clipboard.writeText(window.location.href);
                  setCopied(true);
                  setTimeout(() => {
                    setCopied(false);
                  }, 2000);
                }}
              />
            </div>
            {copied && (
              <p className='fixed top-[63%] right-[1%] z-10 rounded-md bg-slate-100 p-2 font-semibold'>
                Link copied!
              </p>
            )}
            <div className="flex flex-col max-w-4xl mx-auto p-3 my-7 gap-4">
              <p className="text-2xl font-semibold">
                {listing.name} - ${" "}
                {
                  listing.offer ? listing.discountPrice.toLocaleString('en-US') : listing.regularPrice.toLocaleString('en-US')
                }
                {listing.type === "rent" && " / month"}
              </p>

              <p className='flex items-center mt-6 gap-2 text-slate-700 font-semibold text-sm'>
                <FaMapMarkerAlt className='text-green-700' />
                {listing.address}
              </p>

              <div className='flex gap-4'>
                <p className='bg-red-900 w-full max-w-[200px] text-white text-center p-1 rounded-md font-semibold'>
                  {listing.type === 'rent' ? 'For Rent' : 'For Sale'}
                </p>
                {listing.offer && (
                  <p className='bg-green-900 w-full max-w-[200px] text-white text-center p-1 rounded-md font-semibold'>
                    ${+listing.regularPrice - +listing.discountPrice} OFF
                  </p>
                )}
              </div>

              <p className='text-slate-800'>
                <span className='font-semibold text-black'>Description - </span>
                {listing.description}
              </p>

              <ul className='text-green-900 font-semibold text-sm flex flex-wrap items-center gap-4 sm:gap-6'>
                <li className='flex items-center gap-1 whitespace-nowrap '>
                  <FaBed className='text-lg' />
                  {listing.bedrooms > 1
                    ? `${listing.bedrooms} beds `
                    : `${listing.bedrooms} bed `}
                </li>
                <li className='flex items-center gap-1 whitespace-nowrap '>
                  <FaBath className='text-lg' />
                  {listing.bathrooms > 1
                    ? `${listing.bathrooms} baths `
                    : `${listing.bathrooms} bath `}
                </li>
                <li className='flex items-center gap-1 whitespace-nowrap '>
                  <FaParking className='text-lg' />
                  {listing.parking ? 'Parking spot' : 'No Parking'}
                </li>
                <li className='flex items-center gap-1 whitespace-nowrap '>
                  <FaChair className='text-lg' />
                  {listing.furnished ? 'Furnished' : 'Unfurnished'}
                </li>
              </ul>

              
            </div>
          </React.Fragment>
        )
      }
    </main>
  );
}