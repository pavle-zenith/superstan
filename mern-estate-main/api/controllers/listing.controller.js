import Listing from '../models/listing.model.js';
import { errorHandler } from '../utils/error.js';

export const createListing = async (req, res, next) => {
  try {
    const listing = await Listing.create(req.body);
    return res.status(201).json(listing);
  } catch (error) {
    next(error);
  }
};

export const deleteListing = async (req, res, next) => {
  const listing = await Listing.findById(req.params.id);

  if (!listing) {
    return next(errorHandler(404, 'Listing not found!'));
  }

  if (req.user.id !== listing.userRef) {
    return next(errorHandler(401, 'You can only delete your own listings!'));
  }

  try {
    await Listing.findByIdAndDelete(req.params.id);
    res.status(200).json('Listing has been deleted!');
  } catch (error) {
    next(error);
  }
};

export const updateListing = async (req, res, next) => {
  const listing = await Listing.findById(req.params.id);
  if (!listing) {
    return next(errorHandler(404, 'Listing not found!'));
  }
  if (req.user.id !== listing.userRef) {
    return next(errorHandler(401, 'You can only update your own listings!'));
  }

  try {
    const updatedListing = await Listing.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.status(200).json(updatedListing);
  } catch (error) {
    next(error);
  }
};

export const getListing = async (req, res, next) => {
  try {
    const listing = await Listing.findById(req.params.id);
    if (!listing) {
      return next(errorHandler(404, 'Listing not found!'));
    }
    res.status(200).json(listing);
  } catch (error) {
    next(error);
  }
};

// export const getListings = async (req, res, next) => {
//   try {
//     const startIndex = parseInt(req.query.startIndex) || 0;
//     let offer = req.query.offer;

//     if (offer === undefined || offer === 'false') {
//       offer = { $in: [false, true] };
//     }

//     let furnished = req.query.furnished;

//     if (furnished === undefined || furnished === 'false') {
//       furnished = { $in: [false, true] };
//     }

//     let opstina = req.query.opstina;

//     if (opstina === undefined || opstina === 'all') {
//       opstina = { $in: ['Voždovac', 'Sopot', 'Banjica', 'Surčin', 'Obrenovac','Lazarevac','Mladenovac','Novi Beograd','Palilula','Čukarica', 'Grocka','Zvezdara','Zemun','Vračar','Stari Grad','Savski Venac','Rakovica'] };
//     }
    
//     let propertyType = req.query.tipNekretnine;

//     if (propertyType === undefined || propertyType === 'all') {
//       propertyType = { $in: ['Stan','Kuća'] };
//     }

//     let parking = req.query.parking;

//     if (parking === undefined || parking === 'false') {
//       parking = { $in: [false, true] };
//     }

//     let type = req.query.type;

//     if (type === undefined || type === 'all') {
//       type = { $in: ['Prodaja', 'Iznajmljivanje','sale','rent'] };
//     }

//     const searchTerm = req.query.searchTerm || '';
//     const sort = req.query.sort || 'createdAt';
//     const order = req.query.order || 'desc';
//     const min_kvadratura = req.query.min_kvadratura || 0;
//     const max_kvadratura = req.query.max_kvadratura || 0;
//     const min_cena = req.query.min_cena || 0;
//     const max_cena = req.query.max_cena || 0;

//     let sortOptions = { [sort]: order === 'desc' ? -1 : 1 };

//     // Handling custom sorting based on 'kvadratura'
//     if (sort === 'kvadratura_asc') {
//       sortOptions = { kvadratura: 1 };
//     } else if (sort === 'kvadratura_desc') {
//       sortOptions = { kvadratura: -1 };
//     }

//     const listings = await Listing.find({
//       name: { $regex: searchTerm, $options: 'i' },
//       offer,
//       furnished,
//       parking,
//       type,
//       opstina,
//       propertyType,
//     })
//     .sort(sortOptions);

//     return res.status(200).json(listings);
//   } catch (error) {
//     next(error);
//   }
// };

export const getListings = async (req, res, next) => {
  try {
    const startIndex = parseInt(req.query.startIndex) || 0;

    let offer = req.query.offer;
    if (offer === undefined || offer === 'false') {
      offer = { $in: [false, true] };
    }

    let furnished = req.query.furnished;
    if (furnished === undefined || furnished === 'false') {
      furnished = { $in: [false, true] };
    }

    let opstina = req.query.opstina;
    if (opstina === undefined || opstina === 'all') {
      opstina = {
        $in: [
          'Voždovac', 'Sopot', 'Banjica', 'Surčin', 'Obrenovac', 'Lazarevac',
          'Mladenovac', 'Novi Beograd', 'Palilula', 'Čukarica', 'Grocka',
          'Zvezdara', 'Zemun', 'Vračar', 'Stari Grad', 'Savski Venac', 'Rakovica'
        ]
      };
    }

    let propertyType = req.query.propertyType;
    if (propertyType === undefined || propertyType === 'all') {
      propertyType = { $in: ['Stan', 'Kuća'] };
    }

    let parking = req.query.parking;
    if (parking === undefined || parking === 'false') {
      parking = { $in: [false, true] };
    }

    let type = req.query.type;
    if (type === undefined || type === 'all') {
      type = { $in: ['Prodaja', 'Iznajmljivanje', 'sale', 'rent'] };
    }

    const searchTerm = req.query.searchTerm || '';
    const sort = req.query.sort || 'createdAt';
    const order = req.query.order || 'desc';

    let min_kvadratura = 0;
    try {
      let val = parseInt(req.query.min_kvadratura);
      if (!isNaN(val)) {
        min_kvadratura = val;
      }
    } catch (error) {
      min_kvadratura = 0;
    }

    let max_kvadratura = 0;
    try {
      let val = parseInt(req.query.max_kvadratura);
      if (!isNaN(val)) {
        max_kvadratura = val;
      }
    } catch (error) {
      max_kvadratura = 0;
    }

    let min_cena = 0;
    try {
      let val = parseInt(req.query.min_cena);
      if (!isNaN(val)) {
        min_cena = val;
      }
    }
    catch (error) {
      min_cena = 0;
    }

    let max_cena = 0;
    try {
      let val = parseInt(req.query.max_cena);
      if (!isNaN(val)) {
        max_cena = val;
      }
    }
    catch (error) {
      max_cena = 0;
    }

    let filter = {
      name: { $regex: searchTerm, $options: 'i' },
      offer,
      furnished,
      parking,
      type,
      opstina,
      propertyType
    };


    if (min_cena !== 0 || max_cena !== 0) {
      filter.regularPrice = {};
      if (min_cena !== 0) filter.regularPrice.$gte = min_cena;
      if (max_cena !== 0) filter.regularPrice.$lte = max_cena;
    }

    if (min_kvadratura !== 0 || max_kvadratura !== 0) {
      filter.kvadratura = {};
      if (min_kvadratura !== 0) filter.kvadratura.$gte = min_kvadratura;
      if (max_kvadratura !== 0) filter.kvadratura.$lte = max_kvadratura;
    }

    let sortOptions = { [sort]: order === 'desc' ? -1 : 1 };

    // Handling custom sorting based on 'kvadratura'
    if (sort === 'kvadratura_asc') {
      sortOptions = { kvadratura: 1 };
    } else if (sort === 'kvadratura_desc') {
      sortOptions = { kvadratura: -1 };
    }

    const listings = await Listing.find(filter).sort(sortOptions);

    return res.status(200).json(listings);
  } catch (error) {
    console.log(error);
    next(error);
  }
};
