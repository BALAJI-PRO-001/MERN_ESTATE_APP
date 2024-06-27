import { Link } from "react-router-dom";
import { MdLocationOn } from "react-icons/md";

export default function ListingItem(props) {
  const listing = props.listing;
  return (
    <div className="bg-white rounded-md shadow-md hover:shadow-lg transition-shadow overflow-hidden w-full sm:w-[340px] md:flex-grow-[1]">
      <Link to={`/listing/${listing._id}`}>
        <img 
          src={listing.imageUrls[0]} 
          alt="     loading" 
          className="h-[240px] w-full object-cover hover:scale-105 transition-scale duration-300"
        />
        <div className="p-3 flex flex-col gap-2 mt-3">
          <p className="truncate text-lg font-semibold text-slate-700">{listing.name}</p>

          <div className="flex items-center gap-1">
            <MdLocationOn className="h-4 w-4 text-green-700"/>
            <p className=" text-sm truncate text-gray-600 w-full">{listing.address}</p>
          </div>

          <p className="text-sm text-gray-600 line-clamp-2">{listing.description}</p>

          <p 
            className="font-semibold text-slate-500 mt-2"
          >
            ${ listing.offer ? listing.discountPrice.toLocaleString('en-US') : listing.regularPrice.toLocaleString('en-US') }
            { listing.type == "rent" && "/month"}
          </p>  

          <div className="text-slate-700 flex flex-wrap gap-3" >
            <div className="font-bold text-xs">{ listing.bedrooms > 1 ? `${listing.bedrooms} Beds` : `${listing.bedrooms} bed`}</div>
            <div className="font-bold text-xs">{ listing.bathrooms > 1 ? `${listing.bathrooms} Baths` : `${listing.bathrooms} bath`}</div>
          </div>
        </div>
      </Link>

      {
        props.children && (
          <div className="flex gap-4 font-semibold p-3"> 
            {props.children}
          </div>
        )
      }
    </div>
  );
}