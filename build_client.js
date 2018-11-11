const browserify = require('browserify');
const watchify = require('watchify');

function bundle_client() {
  const bundler = browserify({
    debug: true,
    entries: ['./src_client/html_frame.js'],
    cache: {},
    packageCache: {},
    plugin: [watchify]
  });

  function log_bundle() {
    bundler.bundle().pipe(process.stdout);
  }

  bundler.on('update', log_bundle);
  log_bundle();
};

bundle_client();