const { spawn } = require('child_process');

const { consumer } = require('../rabbit');


const listenToTasksQueue = conn => {
  consumer(conn, 'tasks', handleIncomingTasks);
}

const handleIncomingTasks = (err, message) => {
  const formattedMessage = JSON.parse(message);
  const { jobs } = formattedMessage;

  console.log(jobs);
  jobs.forEach(performInLineScript);
}

const performInLineScript = job => {
  const process = spawn(job.script, []);

  process.stdout.on('data', (data) => {
    console.log(`stdout: ${data}`);
  });

  process.stderr.on('data', (data) => {
    console.log(`stderr: ${data}`);
  });

  process.on('error', (error) => {
    console.log(`error: ${error.message}`);
  });

  process.on('close', (code) => {
    console.log(`child process exited with code ${code}`);
  });
}

module.exports = { listenToTasksQueue };