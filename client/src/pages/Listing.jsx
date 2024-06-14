import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';

export default function Listing() {
  const [listing, setListing] = useState(null);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState(false);
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
    } catch(error) {
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
            <Swiper spaceBetween={30} pagination={{clickable: true}} modules={[Pagination]}>
              {
                listing.imageUrls.map((url, index) => {
                  return (
                    <SwiperSlide>
                      <div 
                        key={index} 
                        className="h-[500px]"
                        style={{background: `url(${url}) center no-repeat`, backgroundSize: `cover`}}
                      ></div>
                    </SwiperSlide>
                  );
                })
              }
            </Swiper>
          </React.Fragment>
        )
      }
    </main>
  );
}