import { brewBlankExpressFunc, throwErrorResponse } from "code-alchemy";
import ScheduledTask from "../../../models/ScheduledTask";
import schedule from "node-schedule";

export default brewBlankExpressFunc(async (req, res) => {
  const { id } = req.query;

  // Find the task in the database
  const task = await ScheduledTask.findOne({ jobId: id });

  if (!task) {
    throwErrorResponse(404, "Job not found.");
  }

  // Get the job and cancel it
  const job = schedule.scheduledJobs[id as string];

  if (job) {
    job.cancel();
  }

  // Delete the task from the database
  await ScheduledTask.findOneAndDelete({ jobId: id });

  res.json({
    code: 200,
    message: "Job cancelled successfully.",
  });
});
