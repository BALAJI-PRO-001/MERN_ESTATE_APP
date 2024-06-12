import Listing from "../models/listing.model.js"
import errorHandler from "../utils/error.js";

export const createListing = async (req, res, next) => {
  try {
    const listing = await Listing.create(req.body);
    return res.status(201).json({
      success: true,
      listing: listing
    });
  } catch (error) {
    next(error);
  }
}



export const deleteListing = async (req, res, next) => {
  try {
    const listing = await Listing.findById(req.params.id);
    if (!listing) {
      return next(errorHandler(404, "Listing not found"));
    }

    if (req.verifiedUserId !== listing.userRef) {
      return next(errorHandler(401, "Unauthorized"));
    }

    await Listing.findByIdAndDelete(req.params.id);
    res.status(204).json({});
  } catch (error) {
    next(error);
  }
}



export const updateListing = async (req, res, next) => {
  const listing = await Listing.findById(req.params.id);
  if (!listing) {
    return next(errorHandler(404, "Listing not found"));  
  }

  if (req.verifiedUserId !== listing.userRef) {
    return next(errorHandler(401, "Unauthorized"));
  }

  try {
    const updatedListing = await Listing.findByIdAndUpdate(
      req.params.id,
      req.body,
      {new: true}
    );
    res.status(200).json({
      status: true,
      listing: updatedListing
    });
  } catch(error) {
    next(error);
  }
}




export const getListing = async (req, res, next) => {
  try {
    const listing = await Listing.findById(req.params.id);
    if (!listing) {
      return next(errorHandler(404, "Listing not found"));  
    }

    res.status(200).json({
      status: true,
      listing: listing
    });
  } catch(error) {
    next(error);
  }
}