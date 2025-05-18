import Appointment from "../models/appointment.js";

export const bookAppointment = async (req, res) => {
  try {
    const {
      patientId,
      doctorId,
      appointmentDate,
      timeSlot,
      status,
      reason,
      paymentStatus,
      followUpDate,
    } = req.body;

    if (!patientId || !doctorId || !appointmentDate || !timeSlot) {
      return res.status(400).json({
        message:
          "patientId, doctorId, appointmentDate and timeSlot are required.",
      });
    }

    const { startTime, endTime } = timeSlot;

    const exists = await Appointment.findOne({
      patientId,
      doctorId,
      appointmentDate,
      "timeSlot.startTime": startTime,
    });

    if (exists) {
      return res.status(409).json({
        message: "This patient already has an appointment at that date.",
      });
    }

    const appointment = await Appointment.create({
      patientId,
      doctorId,
      appointmentDate,
      timeSlot: { startTime, endTime },
      status,
      reason,
      paymentStatus,
      followUpDate,
    });

    return res.status(201).json({ message: "Appointment Booked", appointment });
  } catch (error) {
    console.error("Error booking appointment:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const getAllAppointmentsRecord = async (req, res) => {
  try {
    const appointmentsRecord = await Appointment.find();
    if (appointmentsRecord.length === 0) {
      return res
        .status(404)
        .json({ message: "Appointments record not found." });
    }
    return res.status(200).json({
      message: "Appointments record found.",
      AppointmentsRecord: appointmentsRecord,
    });
  } catch (error) {
    console.error("Error Getting All Appointments Record:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const getAppointmentRecordById = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({ message: "Missing Appointment Record." });
    }
    const appointmentRecord = await Appointment.findById(id);
    if (!appointmentRecord) {
      return res.status(404).json({ message: "Appointment record not found." });
    }
    return res.status(200).json({
      message: "Appointment record found.",
      PatientRecord: appointmentRecord,
    });
  } catch (error) {
    console.error("Error Getting Appointment Record By Id:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const deleteAppointmentRecordById = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({ message: "Missing Appointment Record." });
    }
    const appointmentRecordDeleted = await Appointment.findByIdAndDelete(id);
    if (!appointmentRecordDeleted) {
      return res.status(404).json({ message: "Appointment record not found." });
    }
    return res.status(200).json({
      message: "Appointment record Deleted.",
      PatientRecordDeleted: appointmentRecordDeleted,
    });
  } catch (error) {
    console.error("Error Deleting Appointment Record By Id:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const UpdatebookedAppointment = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(404).json({ message: "ID Not Enter" });
    }

    const {
      patientId,
      doctorId,
      appointmentDate,
      timeSlot,
      status,
      reason,
      paymentStatus,
      followUpDate,
    } = req.body;

    const { startTime, endTime } = timeSlot;

    const updateAppointment = await Appointment.findByIdAndUpdate(
      id,
      {
        patientId,
        doctorId,
        appointmentDate,
        timeSlot: { startTime, endTime },
        status,
        reason,
        paymentStatus,
        followUpDate,
      },
      { new: true }
    );

    if (!updateAppointment) {
      return res.status(404).json({ message: "Appointment not found" });
    }

    return res.status(200).json({
      message: "Updated Booked Appointment",
      UpdatedAppointment: updateAppointment,
    });
  } catch (error) {
    console.error("Error in Updating booked appointment:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
