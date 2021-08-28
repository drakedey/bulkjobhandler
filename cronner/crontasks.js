const { getJobsForDate, updateStateForJobs } = require('./controller');
const { publisher } = require('./rabbit');

const readEveryMinute = async (conn) => {
  const jobs = await getJobsForDate();
  console.log(jobs);
  if (jobs.length) {
    const message = {
      jobs,
    };
    publisher(conn, JSON.stringify(message), 'tasks', (err, message) => {
      if (err) console.error(err);
      if (message) console.error(err);
      updateStateForJobs(jobs, 'SENT')
    });
  }


}

module.exports = { readEveryMinute };