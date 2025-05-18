import PatientRecord from "../models/patientRecord.js";
export const createPatientRecord = async (req, res) => {
  try {
    const phone = JSON.parse(req.body.phone);
    console.log(phone);

    const address = JSON.parse(req.body.address);
    const {
      firstName,
      lastName,
      email,
      birthDate,
      conditions,
      medications,
      allergies,
      tabaccoUse,
      alcoholUse,
      exercise,
    } = req.body;

    const { cell, home } = phone;
    const { street, city, postalCode } = address;
    const report = req.file ? req.file.path : null;
    if (!firstName || !lastName || !email || !birthDate) {
      return res.status(400).json({ message: "Missing required patient info" });
    }
    const existingPatientRecord = await PatientRecord.findOne({
      email,
    });
    if (existingPatientRecord) {
      return res.status(409).json({ message: "Patient Record Already exist" });
    }
    let reportFilePath = null;
    if (req.file) {
      reportFilePath = req.file.path;
    }
    const patientRecord = new PatientRecord({
      firstName,
      lastName,
      email,
      birthDate,
      phone: { cell, home },
      address: { street, city, postalCode },
      conditions,
      medications,
      allergies,
      tabaccoUse,
      alcoholUse,
      exercise,
      report: reportFilePath,
    });

    await patientRecord.save();

    res.status(201).send({
      message: "Patient Register and Saved Successfully",
      PatientRecord: patientRecord,
    });
  } catch (error) {
    console.error("Error Creating Patient Record:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const getAllPatientsRecord = async (req, res) => {
  try {
    const patientsRecord = await PatientRecord.find({});
    if (patientsRecord.length === 0) {
      return res.status(404).json({ message: "There is no Patient Record" });
    }
    return res.status(200).json({
      message: "All Patients Found Successfully",
      PatientsRecord: patientsRecord,
    });
  } catch (error) {
    console.error("Error getting All Patient Record:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const getPatientRecordById = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({ message: "Missing patient ID." });
    }

    const patientRecord = await PatientRecord.findById(id);
    if (!patientRecord) {
      return res.status(404).json({ message: "Patient record not found." });
    }
    return res.status(200).json({
      message: "Patient record found.",
      PatientRecord: patientRecord,
    });
  } catch (error) {
    console.error("Error Getting Patient Record By Id:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const deletePatientRecordById = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(404).json({ message: "ID Not Enter" });
    }

    const patientRecord = await PatientRecord.findByIdAndDelete(id);
    if (!patientRecord) {
      return res.status(404).json({ message: "Patient Record Not Found" });
    }

    return res.json({
      message: "Patient Deleted successfully",
      DeletedPatient: patientRecord,
    });
  } catch (error) {
    console.error("Error delete Patient Record By Id:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const updatePatientRecordById = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(404).json({ message: "ID Not Enter" });
    }
    const {
      firstName,
      lastName,
      email,
      birthDate,
      phone: { cell, home } = {},
      address: { street, city, postalCode } = {},
      conditions,
      medications,
      allergies,
      tabaccoUse,
      alcoholUse,
      exercise,
    } = req.body;
    const patientRecord = await PatientRecord.findByIdAndUpdate(
      id,
      {
        firstName,
        lastName,
        email,
        birthDate,
        phone: { cell, home },
        address: { street, city, postalCode },
        conditions,
        medications,
        allergies,
        tabaccoUse,
        alcoholUse,
        exercise,
      },
      { new: true }
    );
    if (!patientRecord) {
      return res.status(404).json({ message: "Patient Record not Found" });
    }
    return res.json({
      message: "Patient Updated successfully",
      UpdatedPatient: patientRecord,
    });
  } catch (error) {
    console.error("Error update Patient Record By Id", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
