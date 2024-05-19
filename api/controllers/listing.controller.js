import Listing from "../models/listing.model.js";

export const createListing = async (req, res, next) => {
  try {
    console.log(req.body);
    const listing = await Listing.create(req.body);
    return res.status(201).json({
      success: true,
      listing: listing
    });
  } catch (error) {
    next(error);
  }
}