const Teacher = require("../models/Teacher.Model");

// Create a Teacher
exports.createTeacher = async (req, res) => {
  try {
    const { name, subject, designation, bio, image } = req.body;

    // Validate fields
    if (!name || !subject || !designation || !bio || !image) {
      return res.status(400).json({
        status: "N",
        error: "All fields are required"
      });
    }

    const newTeacher = new Teacher({
      name,
      subject,
      designation,
      bio,
      image
    });

    await newTeacher.save();

    return res.status(201).json({
      status: "Y",
      message: "Teacher created successfully",
      data: newTeacher
    });

  } catch (error) {
    console.log(error);
    return res.status(500).json({
      status: "N",
      error: `Internal Server Error: ${error.message}`
    });
  }
};

// Get all Teachers
exports.getTeachers = async (req, res) => {
  try {
    const teachers = await Teacher.find();

    if (!teachers || teachers.length === 0) {
      return res.status(404).json({
        status: "N",
        message: "No data found"
      });
    }

    return res.status(200).json({
      status: "Y",
      message: "Success",
      data: teachers
    });

  } catch (error) {
    console.log(error);
    return res.status(500).json({
      status: "N",
      error: `Internal Server Error: ${error.message}`
    });
  }
};

// Delete a Teacher
exports.deleteTeacher = async (req, res) => {
  try {
    const { id } = req.params;

    const teacher = await Teacher.findByIdAndDelete(id);

    if (!teacher) {
      return res.status(404).json({
        status: "N",
        message: "No Teacher found"
      });
    }

    return res.status(200).json({
      status: "Y",
      message: "Teacher Deleted Successfully"
    });

  } catch (error) {
    console.log(error);
    return res.status(500).json({
      status: "N",
      error: `Internal Server Error: ${error.message}`
    });
  }
};

// Update a Teacher
exports.updateTeacher = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, subject, designation, bio, image } = req.body;

    // Validate fields
    if (!name || !subject || !designation || !bio || !image) {
      return res.status(400).json({
        status: "N",
        error: "All fields are required"
      });
    }

    // Check if teacher exists
    const teacher = await Teacher.findById(id);
    if (!teacher) {
      return res.status(404).json({
        status: "N",
        message: "No Teacher found"
      });
    }

    // Update teacher
    const updatedTeacher = await Teacher.findByIdAndUpdate(
      id,
      { name, subject, designation, bio, image },
      { new: true } // return updated document
    );

    return res.status(200).json({
      status: "Y",
      message: "Teacher Updated Successfully",
      data: updatedTeacher
    });

  } catch (error) {
    console.log(error);
    return res.status(500).json({
      status: "N",
      error: `Internal Server Error: ${error.message}`
    });
  }
};