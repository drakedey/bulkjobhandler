const { startConnection } = require('./rabbit');
const { listenToTasksQueue } = require('./listeners/tasklistener');

startConnection()
  .then(conn => listenToTasksQueue(conn))
  .catch(err => console.error(err))
