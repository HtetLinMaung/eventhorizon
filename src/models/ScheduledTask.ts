import { Schema, model } from "mongoose";

const ScheduledTaskSchema = new Schema(
  {
    url: {
      type: String,
      required: true,
    },
    method: {
      type: String,
      default: "get",
    },
    body: {
      type: Schema.Types.Mixed,
      default: {},
    },
    headers: {
      type: Schema.Types.Mixed,
      default: {},
    },
    date: {
      type: String,
      default: "",
    },
    cronSchedule: {
      type: String,
      default: "",
    },
    jobId: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const ScheduledTask = model("ScheduledTask", ScheduledTaskSchema);

export default ScheduledTask;
