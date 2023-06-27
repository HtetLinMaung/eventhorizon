import ScheduledTask from "./models/ScheduledTask";
import connectMongoose from "./utils/connect-mongoose";
import scheduleJob from "./utils/schedule-job";

export const afterWorkerStart = async () => {
  await connectMongoose();
  const tasks = await ScheduledTask.find();
  for (const task of tasks) {
    console.log(task);
    scheduleJob(task);
  }
};
