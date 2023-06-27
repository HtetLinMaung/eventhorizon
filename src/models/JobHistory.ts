import { Schema, model } from "mongoose";

const jobHistorySchema = new Schema(
  {
    jobId: {
      type: String,
      required: true,
    },
    response: {
      type: Schema.Types.Mixed,
      default: {},
    },
    status: {
      type: String,
      enum: ["pending", "success", "failure"],
      default: "pending",
    },
  },
  { timestamps: true }
);

export default model("JobHistory", jobHistorySchema);
