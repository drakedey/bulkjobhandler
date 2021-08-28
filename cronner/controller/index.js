const client = require('../bd');

const getJobsForDate = async () => {
  const query = `SELECT j.id, j.scheduled_date, jt.title, j.script
    FROM job j INNER JOIN job_type jt ON j.job_type_id = jt.id
    WHERE EXTRACT(EPOCH FROM (j.scheduled_date - now())) >= -61 AND EXTRACT(EPOCH FROM (j.scheduled_date - now())) < 1
    AND j.state = 'SCHEDULED'`;
  const result = await client.query(query);
  const result2 = await client.query('SELECT now()');
  console.log(result2.rows);
  return result.rows;
}

const updateStateForJobs = async (jobs, state) => {
  const jobsIds = jobs.map(job => job.id).join(', ');
  const query = `UPDATE job SET state = $1 WHERE id IN (${jobsIds})`;
  const result = await client.query(query, [state]);
  return result;
}

module.exports = { getJobsForDate, updateStateForJobs };