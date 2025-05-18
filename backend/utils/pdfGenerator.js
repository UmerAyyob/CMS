import express from "express";
import PDFDocument from "pdfkit";
import Appointment from "../models/appointment.js";

const router = express.Router();

export const pdfGenerator = async (req, res) => {
  try {
    const { id } = req.params;
    const appointment = await Appointment.findById(id)
      .populate("patientId")
      .populate("doctorId");

    if (!appointment) {
      return res.status(404).json({ error: "Appointment not found" });
    }
    const { patientId: patient, doctorId: doctor } = appointment;

    // ── Response headers ─────────────────────────────────────────────────────
    res.setHeader("Content-Type", "application/pdf");
    res.setHeader(
      "Content-Disposition",
      `attachment; filename=Report-${id}.pdf`
    );

    // ── Create PDF ────────────────────────────────────────────────────────────
    const doc = new PDFDocument({
      size: "A4",
      margins: { top: 80, bottom: 80, left: 50, right: 50 },
    });
    doc.pipe(res);

    // ── Header bar ────────────────────────────────────────────────────────────
    const headerHeight = 60;
    doc
      .rect(0, 0, doc.page.width, headerHeight)
      .fill("#003366")
      .fillColor("white")
      .font("Helvetica-Bold")
      .fontSize(20)
      .text("City Care Hospital", 50, 20);

    // ── Move below header ─────────────────────────────────────────────────────
    doc.moveDown(4);

    // ── Report Title ─────────────────────────────────────────────────────────
    doc
      .font("Helvetica-Bold")
      .fontSize(22)
      .fillColor("#003366")
      .text("APPOINTMENT MEDICAL REPORT", { align: "center" })
      .moveDown(1);

    // ── Doctor Section ───────────────────────────────────────────────────────
    doc
      .font("Helvetica-Bold")
      .fontSize(16)
      .fillColor("#003366")
      .text("Doctor Details")
      .moveDown(0.5);

    doc
      .font("Helvetica")
      .fontSize(12)
      .fillColor("black")
      .text(`Name:           ${doctor.name}`)
      .text(`Specialization: ${doctor.specialization}`)
      .text(`Phone:          ${doctor.phone}`)
      .text(`Email:          ${doctor.email}`)
      .text(`Availability:   ${doctor.availability.join(", ")}`)
      .moveDown(1);

    // ── Patient Section ──────────────────────────────────────────────────────
    doc
      .font("Helvetica-Bold")
      .fontSize(16)
      .fillColor("#003366")
      .text("Patient Details")
      .moveDown(0.5);

    doc
      .font("Helvetica")
      .fontSize(12)
      .fillColor("black")
      .text(`Name:        ${patient.firstName} ${patient.lastName}`)
      .text(`Email:       ${patient.email}`)
      .text(`Birth Date:  ${patient.birthDate}`)
      .text(`Conditions:  ${patient.conditions}`)
      .text(`Medications: ${patient.medications}`)
      .moveDown(1);

    // ── Appointment Section ─────────────────────────────────────────────────
    doc
      .font("Helvetica-Bold")
      .fontSize(16)
      .fillColor("#003366")
      .text("Appointment Details")
      .moveDown(0.5);

    doc
      .font("Helvetica")
      .fontSize(12)
      .fillColor("black")
      .text(`Date:           ${appointment.appointmentDate}`)
      .text(
        `Time Slot:      ${appointment.timeSlot.startTime} – ${appointment.timeSlot.endTime}`
      )
      .text(`Status:         ${appointment.status}`)
      .text(`Reason:         ${appointment.reason || "N/A"}`)
      .text(`Payment Status: ${appointment.paymentStatus}`)
      .text(`Follow-Up:      ${appointment.followUpDate || "N/A"}`);

    // ── Footer bar ────────────────────────────────────────────────────────────
    const footerY = doc.page.height - 60;
    doc
      .rect(0, footerY, doc.page.width, 60)
      .fill("#003366")
      .fillColor("white")
      .font("Helvetica")
      .fontSize(10)
      .text("CityCare Hospital – Confidential", 50, footerY + 20, {
        align: "left",
      })
      .text(
        `Generated on ${new Date().toLocaleDateString()}`,
        50,
        footerY + 20,
        { align: "right", width: doc.page.width - 100 }
      );

    // ── Finalize ─────────────────────────────────────────────────────────────
    doc.end();
  } catch (err) {
    console.error("PDF generation error:", err);
    res.status(500).json({ error: "Server error generating PDF" });
  }
};

export default router;
