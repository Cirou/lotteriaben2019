const app = require('./app');

/**
 * Start Express server.
 */
export const server = app.listen(app.get('port'), () => {

  console.log('\x1b[36m%s\x1b[0m', 'App is running at http://localhost:' + app.get('port') + ' in ' + app.get('env') + ' mode');
  console.log('\x1b[36m%s\x1b[0m', 'Press CTRL-C to stop\n');

});
