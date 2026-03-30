import React, { useState } from "react";

const documentCategories = [
  {
    title: "MOU Documents",
    description: "Upload and manage Memorandum of Understanding files",
  },
  {
    title: "Business Documents",
    description: "GST, Registration, Legal & Compliance documents",
  },
  {
    title: "Project Documents",
    description: "Quotations, BOQs, Agreements & Work Orders",
  },
];

const Documentation = () => {
  const [documents, setDocuments] = useState([
    {
      id: 1,
      name: "Vendor Agreement MOU.pdf",
      type: "PDF",
      size: "2.4 MB",
      date: "12 Feb 2026",
      fileUrl: "#",
    },
    {
      id: 2,
      name: "GST Certificate.pdf",
      type: "PDF",
      size: "1.2 MB",
      date: "05 Jan 2026",
      fileUrl: "#",
    },
    {
      id: 3,
      name: "Project Quotation.xlsx",
      type: "Excel",
      size: "860 KB",
      date: "20 Feb 2026",
      fileUrl: "#",
    },
  ]);

  const [documentName, setDocumentName] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Select Category");
  const [selectedFile, setSelectedFile] = useState(null);

  const formatFileSize = (bytes) => {
    if (!bytes || bytes === 0) return "0 Bytes";
    const kb = bytes / 1024;
    const mb = kb / 1024;

    if (mb >= 1) {
      return `${mb.toFixed(1)} MB`;
    }
    return `${kb.toFixed(0)} KB`;
  };

  const getFileType = (fileName) => {
    const extension = fileName.split(".").pop()?.toLowerCase();

    if (["pdf"].includes(extension)) return "PDF";
    if (["xls", "xlsx", "csv"].includes(extension)) return "Excel";
    if (["doc", "docx"].includes(extension)) return "Word";
    if (["jpg", "jpeg", "png", "webp"].includes(extension)) return "Image";
    return extension ? extension.toUpperCase() : "File";
  };

  const getFormattedDate = () => {
    const today = new Date();
    return today.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      if (!documentName.trim()) {
        setDocumentName(file.name);
      }
    }
  };

  const handleUpload = () => {
    if (!selectedFile || !documentName.trim() || selectedCategory === "Select Category") {
      alert("Please enter document name, select category, and choose a file.");
      return;
    }

    const newDocument = {
      id: Date.now(),
      name: documentName,
      type: getFileType(selectedFile.name),
      size: formatFileSize(selectedFile.size),
      date: getFormattedDate(),
      category: selectedCategory,
      fileUrl: URL.createObjectURL(selectedFile),
    };

    setDocuments((prev) => [newDocument, ...prev]);

    setDocumentName("");
    setSelectedCategory("Select Category");
    setSelectedFile(null);

    const fileInput = document.getElementById("document-upload-input");
    if (fileInput) {
      fileInput.value = "";
    }
  };

  const handleDelete = (id) => {
    setDocuments((prev) => prev.filter((doc) => doc.id !== id));
  };

  return (
    <>

      <section className="w-full bg-linear-to-br from-[#f7fff5] via-[#fffaf0] to-[#ffffff] p-4 sm:p-6 lg:p-8 overflow-x-hidden">
        <div className="mx-auto max-w-7xl space-y-8">
          {/* Header */}
          <div className="rounded-[30px] border border-white/60 bg-white/60 p-6 backdrop-blur-xl shadow-[0_20px_60px_rgba(167,224,167,0.12)] sm:p-8">
            <h1 className="text-2xl sm:text-3xl font-bold text-[#1f2937]">
              Documentation Center
            </h1>
            <p className="mt-2 text-sm sm:text-base text-[#6b7280]">
              Manage all vendor-related documents including MOU agreements, business records, and project files in one place.
            </p>
          </div>

          {/* Categories */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {documentCategories.map((item, index) => (
              <div
                key={index}
                className="rounded-[26px] border border-white/70 bg-white/70 p-5 backdrop-blur-lg shadow-[0_10px_30px_rgba(0,0,0,0.05)]"
              >
                <h3 className="text-lg font-semibold text-[#1f2937]">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm text-[#6b7280]">
                  {item.description}
                </p>

                <button
                  type="button"
                  className="mt-4 w-full rounded-xl bg-[#a7e0a7]/70 py-2 text-sm font-semibold text-[#1f3d1f] hover:bg-[#a7e0a7] transition"
                >
                  Upload Document
                </button>
              </div>
            ))}
          </div>

          {/* Upload Section */}
          <div className="rounded-[30px] border border-white/60 bg-white/60 p-6 backdrop-blur-xl shadow-[0_20px_60px_rgba(255,247,232,0.6)] sm:p-8">
            <h2 className="text-xl font-semibold text-[#1f2937]">
              Upload New Document
            </h2>

            <div className="mt-5 grid grid-cols-1 md:grid-cols-2 gap-5">
              <input
                type="text"
                placeholder="Document Name"
                value={documentName}
                onChange={(e) => setDocumentName(e.target.value)}
                className="w-full rounded-xl border border-[#e5e7eb] bg-white/80 p-3 text-sm outline-none focus:ring-2 focus:ring-[#a7e0a7]"
              />

              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full rounded-xl border border-[#e5e7eb] bg-white/80 p-3 text-sm outline-none focus:ring-2 focus:ring-[#a7e0a7]"
              >
                <option>Select Category</option>
                <option>MOU Documents</option>
                <option>Business Documents</option>
                <option>Project Documents</option>
              </select>

              <input
                id="document-upload-input"
                type="file"
                onChange={handleFileChange}
                className="col-span-1 md:col-span-2 w-full rounded-xl border border-dashed border-[#a7e0a7]/60 bg-[#f7fff5] p-4 text-sm"
              />
            </div>

            {selectedFile && (
              <p className="mt-3 text-sm text-[#6b7280]">
                Selected file: <span className="font-medium text-[#1f2937]">{selectedFile.name}</span>
              </p>
            )}

            <button
              type="button"
              onClick={handleUpload}
              className="mt-5 rounded-xl bg-[#1f2937] px-6 py-2 text-white text-sm font-semibold hover:bg-black transition"
            >
              Upload File
            </button>
          </div>

          {/* Documents Table */}
          <div className="rounded-[30px] border border-white/60 bg-white/60 p-6 backdrop-blur-xl shadow-[0_20px_60px_rgba(167,224,167,0.12)] sm:p-8 overflow-x-auto">
            <h2 className="text-xl font-semibold text-[#1f2937] mb-5">
              Uploaded Documents
            </h2>

            <table className="w-full min-w-150 text-left text-sm">
              <thead>
                <tr className="text-[#6b7280] border-b">
                  <th className="py-3">Document</th>
                  <th>Type</th>
                  <th>Size</th>
                  <th>Date</th>
                  <th className="text-right">Actions</th>
                </tr>
              </thead>

              <tbody>
                {documents.map((doc) => (
                  <tr
                    key={doc.id}
                    className="border-b hover:bg-[#f7fff5]/60 transition"
                  >
                    <td className="py-3 font-medium text-[#1f2937] wrap-break-word">
                      {doc.name}
                    </td>
                    <td>{doc.type}</td>
                    <td>{doc.size}</td>
                    <td>{doc.date}</td>
                    <td className="text-right space-x-3">
                      <a
                        href={doc.fileUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="text-[#355b35] hover:underline"
                      >
                        View
                      </a>
                      <a
                        href={doc.fileUrl}
                        download={doc.name}
                        className="text-[#7a5c2e] hover:underline"
                      >
                        Download
                      </a>
                      <button
                        type="button"
                        onClick={() => handleDelete(doc.id)}
                        className="text-red-500 hover:underline"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}

                {documents.length === 0 && (
                  <tr>
                    <td
                      colSpan="5"
                      className="py-6 text-center text-[#6b7280]"
                    >
                      No documents uploaded yet.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </>

  );
};

export default Documentation;