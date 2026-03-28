const Event = require("../models/Event.Model");

exports.createEvent = async (req, res) => {
  try {
    const { title, description, shortDescription, date, location } = req.body;

    if (!title || !description || !shortDescription || !date || !location) {
      return res.status(400).json({
        status: "N",
        error: "All fields are required"
      });
    }

    const newEvent = new Event({
      title,
      description,
      shortDescription,
      date,
      location,
    });

    await newEvent.save();

    return res.status(201).json({
      status: "Y",
      message: "Event created successfully"
    });

  } catch (error) {
    console.log(error);
    return res.status(500).json({
      status: "N",
      error: `Internal Server Error: ${error.message}`
    });
  }
};

exports.getEvents = async (req, res) => {
  try {
    const events = await Event.find();

    if (!events || events.length === 0) {
      return res.status(404).json({
        status: "N",
        message: "No data found"
      });
    }

    return res.status(200).json({
      status: "Y",
      message: "Success",
      data: events
    });

  } catch (error) {
    console.log(error);
    return res.status(500).json({
      status: "N",
      error: `Internal Server Error: ${error.message}`
    });
  }
};

exports.deleteEvent = async (req, res) => {
  try {
    const id = req.params.id;

    const event = await Event.findByIdAndDelete(id);

    if (!event) {
      return res.status(404).json({
        status: "N",
        message: "No Event found"
      });
    }

    return res.status(200).json({
      status: "Y",
      message: "Event Deleted Successfully"
    });

  } catch (error) {
    console.log(error);
    return res.status(500).json({
      status: "N",
      error: `Internal Server Error: ${error.message}`
    });
  }
};

exports.updateEvent = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, shortDescription, date, location } = req.body;

    // Validate fields
    if (!title || !description || !shortDescription || !date || !location) {
      return res.status(400).json({
        status: "N",
        error: "All fields are required"
      });
    }

    // Check if event exists
    const event = await Event.findById(id);

    if (!event) {
      return res.status(404).json({
        status: "N",
        message: "No Event found"
      });
    }

    // Update event
    const updatedEvent = await Event.findByIdAndUpdate(
      id,
      {
        title,
        description,
        shortDescription,
        date,
        location
      },
      { new: true } // returns updated document
    );

    return res.status(200).json({
      status: "Y",
      message: "Event Updated Successfully",
      data: updatedEvent
    });

  } catch (error) {
    console.log(error);
    return res.status(500).json({
      status: "N",
      error: `Internal Server Error: ${error.message}`
    });
  }
};