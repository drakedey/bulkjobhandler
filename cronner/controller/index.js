const client = require('../bd');

const getJobsForDate = async () => {
  const query = `SELECT j.id, j.scheduled_date, jt.title, j.script
    FROM job j INNER JOIN job_type jt ON j.job_type_id = jt.id
    WHERE EXTRACT(EPOCH FROM (j.scheduled_date - now())) >= -60 AND EXTRACT(EPOCH FROM (j.scheduled_date - now())) < 0
    AND j.state = 'SCHEDULED'`;
  const result = await client.query(query);
  return result.rows;
}

module.exports = { getJobsForDate };