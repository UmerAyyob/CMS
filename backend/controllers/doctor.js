import Doctor from "../models/doctor.js";

// ✅ Create Doctor
export const createDoctor = async (req, res) => {
  try {
    const { name, specialization, phone, email, availability } = req.body;

    if (!name || !specialization || !email) {
      return res
        .status(400)
        .json({ message: "Name, specialization, and email are required." });
    }

    const existingDoctor = await Doctor.findOne({ email });
    if (existingDoctor) {
      return res
        .status(409)
        .json({ message: "Doctor with this email already exists." });
    }

    const doctor = await Doctor.create({
      name,
      specialization,
      phone,
      email,
      availability,
    });

    return res
      .status(201)
      .json({ message: "Doctor created successfully", doctor });
  } catch (error) {
    console.error("Error creating doctor:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

// ✅ Get All Doctors
export const getAllDoctors = async (req, res) => {
  try {
    const doctors = await Doctor.find();
    if (doctors.length === 0) {
      return res.status(404).json({ message: "No doctors found." });
    }
    return res
      .status(200)
      .json({ message: "Doctors retrieved successfully", doctors });
  } catch (error) {
    console.error("Error fetching doctors:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

// ✅ Get Doctor by ID
export const getDoctorById = async (req, res) => {
  try {
    const { id } = req.params;
    const doctor = await Doctor.findById(id);
    if (!doctor) {
      return res.status(404).json({ message: "Doctor not found." });
    }
    return res
      .status(200)
      .json({ message: "Doctor retrieved successfully", doctor });
  } catch (error) {
    console.error("Error fetching doctor by ID:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

// ✅ Update Doctor
export const updateDoctor = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, specialization, phone, email, availability } = req.body;

    const doctor = await Doctor.findByIdAndUpdate(
      id,
      { name, specialization, phone, email, availability },
      { new: true }
    );

    if (!doctor) {
      return res.status(404).json({ message: "Doctor not found." });
    }

    return res
      .status(200)
      .json({ message: "Doctor updated successfully", doctor });
  } catch (error) {
    console.error("Error updating doctor:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

// ✅ Delete Doctor
export const deleteDoctor = async (req, res) => {
  try {
    const { id } = req.params;
    const doctor = await Doctor.findByIdAndDelete(id);

    if (!doctor) {
      return res.status(404).json({ message: "Doctor not found." });
    }

    return res
      .status(200)
      .json({ message: "Doctor deleted successfully", doctor });
  } catch (error) {
    console.error("Error deleting doctor:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
