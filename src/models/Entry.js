import mongoose from "mongoose";

const MediaSchema = new mongoose.Schema(
  {
    type: {
      type: String,
      enum: ["image", "youtube", "video", "document"],
      required: true,
    },
    url: { type: String, required: true },
    title: { type: String, default: "" },
  },
  { _id: false }
);

const EntrySchema = new mongoose.Schema(
  {
    date: { type: Date, required: true, index: true },
    title: { type: String, default: "" },
    content: { type: String, default: "" },
    categories: { type: [String], default: [] },
    tags: { type: [String], default: [] },
    media: { type: [MediaSchema], default: [] },
    externalLinks: { type: [String], default: [] },
  },
  { timestamps: true }
);

/**
 * Prevent model overwrite upon hot reload in dev
 */
export default mongoose?.models?.Entry || mongoose.model("Entry", EntrySchema);
