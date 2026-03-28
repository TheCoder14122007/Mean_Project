const Notice = require("../models/Notice.Model");

exports.createNotice = async (req, res) => {
  try {
    const { title, description, date, category } = req.body;

    // Validate required fields
    if (!title || !description || !date || !category) {
      return res.status(400).json({
        status: "N",
        error: "All fields are required"
      });
    }

    const newNotice = new Notice({
      title,
      description,
      date,
      category,
    });

    await newNotice.save();

    return res.status(201).json({
      status: "Y",
      message: "Notice created successfully",
      data: newNotice
    });

  } catch (error) {
    console.log(error);
    return res.status(500).json({
      status: "N",
      error: `Internal Server Error: ${error.message}`
    });
  }
};


exports.getNotice = async (req, res) => {
  try {
    const notices = await Notice.find();

    if (!notices || notices.length === 0) {
      return res.status(404).json({
        status: "N",
        message: "No data found"
      });
    }

    return res.status(200).json({
      status: "Y",
      message: "Success",
      data: notices
    });

  } catch (error) {
    console.log(error);
    return res.status(500).json({
      status: "N",
      error: `Internal Server Error: ${error.message}`
    });
  }
};

exports.deleteNotice = async (req, res) => {
  try {
    const { id } = req.params;

    const notice = await Notice.findByIdAndDelete(id);

    if (!notice) {
      return res.status(404).json({
        status: "N",
        message: "No Notice found"
      });
    }

    return res.status(200).json({
      status: "Y",
      message: "Notice Deleted Successfully"
    });

  } catch (error) {
    console.log(error);
    return res.status(500).json({
      status: "N",
      error: `Internal Server Error: ${error.message}`
    });
  }
};

exports.updateNotice = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, date, category } = req.body;

    // Validate required fields
    if (!title || !description || !date || !category) {
      return res.status(400).json({
        status: "N",
        error: "All fields are required"
      });
    }

    // Check if notice exists
    const notice = await Notice.findById(id);
    if (!notice) {
      return res.status(404).json({
        status: "N",
        message: "No Notice found"
      });
    }

    // Update notice
    const updatedNotice = await Notice.findByIdAndUpdate(
      id,
      { title, description, date, category },
      { new: true } // return updated document
    );

    return res.status(200).json({
      status: "Y",
      message: "Notice Updated Successfully",
      data: updatedNotice
    });

  } catch (error) {
    console.log(error);
    return res.status(500).json({
      status: "N",
      error: `Internal Server Error: ${error.message}`
    });
  }
};