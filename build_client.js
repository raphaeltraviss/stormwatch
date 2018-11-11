const browserify = require('browserify');
const watchify = require('watchify');
const fs = require('fs');

const client_outfile_path = './build_client/stormwatch_client.html';


function bundle_client() {
  const bundler = browserify({
    debug: true,
    entries: ['./src_client/html_frame.js'],
    cache: {},
    packageCache: {},
    plugin: [watchify]
  });

  function bundle_to_file() {
    fs.unlink(client_outfile_path, () => {
      const outfile = fs.createWriteStream(client_outfile_path);
      outfile.write(html_begin(), () => {
        bundler.bundle().pipe(outfile);
        outfile.on('finish', () => {
          fs.appendFileSync(client_outfile_path, html_end());
        });
      });
    })
  }

  bundler.on('update', bundle_to_file);
  bundle_to_file();
};
bundle_client();







function html_begin() {
  return `<!DOCTYPE html></script>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>Document</title>
</head>
<body>
  <h1>StormWatch</h1>
  <script type="text/javascript">`;
} 

function html_end() {
  return `
    </script>
  </body>
  </html>
`;
}