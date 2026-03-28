const Gallery = require("../models/Gallery.Model");

exports.createGallery = async (req, res) => {
  try {
    const { title, imagesUrl, date } = req.body;

    // Validation
    if (!title || !imagesUrl || !date) {
      return res.status(400).json({
        status: "N",
        error: "All fields are required"
      });
    }

    const newGallery = new Gallery({
      title,
      imagesUrl,
      date,
    });

    await newGallery.save();

    return res.status(201).json({
      status: "Y",
      message: "Gallery created successfully"
    });

  } catch (error) {
    console.log(error);
    return res.status(500).json({
      status: "N",
      error: `Internal Server Error: ${error.message}`
    });
  }
};

exports.getGallerys = async (req, res) => {
  try {
    const gallerys = await Gallery.find();

    if (!gallerys || gallerys.length === 0) {
      return res.status(404).json({
        status: "N",
        message: "No data found"
      });
    }

    return res.status(200).json({
      status: "Y",
      message: "Success",
      data: gallerys
    });

  } catch (error) {
    console.log(error);
    return res.status(500).json({
      status: "N",
      error: `Internal Server Error: ${error.message}`
    });
  }
};

exports.deleteGallery = async (req, res) => {
  try {
    const { id } = req.params;

    const gallery = await Gallery.findByIdAndDelete(id);

    if (!gallery) {
      return res.status(404).json({
        status: "N",
        message: "No Gallery found"
      });
    }

    return res.status(200).json({
      status: "Y",
      message: "Gallery Deleted Successfully"
    });

  } catch (error) {
    console.log(error);
    return res.status(500).json({
      status: "N",
      error: `Internal Server Error: ${error.message}`
    });
  }
};

exports.updateGallery = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, imagesUrl, date } = req.body;

    // Validate required fields
    if (!title || !imagesUrl || !date) {
      return res.status(400).json({
        status: "N",
        error: "All fields are required"
      });
    }

    // Check if gallery exists
    const gallery = await Gallery.findById(id);
    if (!gallery) {
      return res.status(404).json({
        status: "N",
        message: "No Gallery found"
      });
    }

    // Update gallery
    const updatedGallery = await Gallery.findByIdAndUpdate(
      id,
      { title, imagesUrl, date },
      { new: true } // returns updated document
    );

    return res.status(200).json({
      status: "Y",
      message: "Gallery Updated Successfully",
      data: updatedGallery
    });

  } catch (error) {
    console.log(error);
    return res.status(500).json({
      status: "N",
      error: `Internal Server Error: ${error.message}`
    });
  }
};