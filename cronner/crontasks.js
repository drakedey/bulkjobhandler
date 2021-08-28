const { getJobsForDate } = require('./controller');
const { publisher } = require('./rabbit');

const readEveryMinute = async (conn) => {
  console.log('ASKING FOR JOBS');
  const jobs = await getJobsForDate();
  console.log(jobs);
}

module.exports = { readEveryMinute };