const cronn = require('node-cron');
const { startConnection } = require('./rabbit');
const { readEveryMinute } = require('./crontasks')

startConnection().then(conn => {
cronn.schedule('* * * * *', () => {
  readEveryMinute(conn);
  console.log('hanging')
});

})

// cronn.schedule('* * * * *', () => {
//   // readEveryMinute(conn);
//   console.log('hanging');
// });
