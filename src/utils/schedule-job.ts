import axios from "axios";
import schedule from "node-schedule";
import JobHistory from "../models/JobHistory";

export default function scheduleJob(taskData: any) {
  const { url, method, body, headers, date, cronSchedule, jobId } = taskData;

  const jobFunction = async () => {
    const jobHistory = new JobHistory({
      jobId,
    });
    try {
      await jobHistory.save();
      const result = await axios({ method, url, data: body, headers });
      console.log(result.data);
      jobHistory.response = {
        status: result.status,
        headers: result.headers,
        data: result.data,
      };
      jobHistory.status = result.status >= 400 ? "failure" : "success";
    } catch (err) {
      console.error(err);
      if (err.response) {
        jobHistory.response = {
          status: err.response.status,
          headers: err.response.headers,
          data: err.response.data,
        };
      } else {
        jobHistory.response = {
          status: 500,
          headers: {},
          data: {
            message: err.message,
          },
        };
      }
      jobHistory.status = "failure";
      await jobHistory.save();
    }
  };

  if (date) {
    return schedule.scheduleJob(jobId, new Date(date), jobFunction);
  } else if (cronSchedule) {
    return schedule.scheduleJob(jobId, cronSchedule, jobFunction);
  }
}
