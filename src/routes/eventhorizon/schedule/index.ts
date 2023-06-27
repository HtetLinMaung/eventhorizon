import { brewBlankExpressFunc } from "code-alchemy";
import ScheduledTask from "../../../models/ScheduledTask";
import scheduleJob from "../../../utils/schedule-job";
import mongoose from "mongoose";
import { log } from "starless-logger";

export default brewBlankExpressFunc(async (req, res) => {
  const { url, method, date, headers, cronSchedule, body } = req.body;

  const taskData = { url, method, body, date, cronSchedule, headers };

  // Create a unique ID for this job
  const jobId = new mongoose.Types.ObjectId().toString();

  // Pass the jobId to scheduleJob function
  const job = scheduleJob({ ...taskData, jobId });

  // Save the jobId to the database
  const newTask = new ScheduledTask({ ...taskData, jobId });
  await newTask.save();

  res.json({
    code: 200,
    message: "API call scheduled successfully.",
    jobId,
  });
});
