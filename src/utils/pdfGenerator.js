import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

export const generateDonorPDF = (donors, criteria) => {
  const doc = new jsPDF();

  doc.setFontSize(20);
  doc.setTextColor(220, 38, 38);
  doc.text("BloodLine - Donor Search Results", 14, 20);

  doc.setFontSize(10);
  doc.setTextColor(100);
  doc.text(
    `Generated on: ${new Date().toLocaleDateString()} at ${new Date().toLocaleTimeString()}`,
    14,
    28
  );

  doc.setFontSize(12);
  doc.setTextColor(0);
  const criteriaText = `Search Criteria: Blood Group: ${
    criteria.bloodGroup || "All"
  }, District: ${criteria.district || "All"}, Upazila: ${
    criteria.upazila || "All"
  }`;

  const splitTitle = doc.splitTextToSize(criteriaText, 180);
  doc.text(splitTitle, 14, 38);

  const tableData = donors.map((donor) => [
    donor.name,
    donor.bloodGroup,
    donor.status === "active" ? "Available" : "Unavailable",
    `${donor.district}, ${donor.upazila}`,
    donor.phone || "N/A",
    donor.email || "N/A",
    donor.lastDonation
      ? new Date(donor.lastDonation).toLocaleDateString()
      : "First Time",
  ]);

  autoTable(doc, {
    startY: 45,
    head: [
      [
        "Name",
        "Blood Group",
        "Status",
        "Location",
        "Phone",
        "Email",
        "Last Donation",
      ],
    ],
    body: tableData,
    theme: "grid",
    headStyles: { fillColor: [220, 38, 38], textColor: 255 },
    styles: { fontSize: 8 },
  });

  doc.save("bloodline-donor-results.pdf");
};
