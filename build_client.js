const browserify = require('browserify');
const watchify = require('watchify');
const fs = require('fs');
const stream = require('stream');



bundle_client();
copy_styles();

function bundle_client() {
  const bundler = browserify({
    debug: true,
    entries: ['./src_client/html_frame.js'],
    cache: {},
    packageCache: {},
    plugin: [watchify]
  });

  function bundle_js() {
    const client_outfile_path = './build_client/stormwatch_client.html';
    fs.unlink(client_outfile_path, () => {
      const to_output_file = fs.createWriteStream(client_outfile_path);
      const from_html_prefix = html_prefix();
      const from_js_bundle = bundler.bundle();
      const from_html_suffix = html_suffix();

      from_html_prefix.pipe(to_output_file, { end: false });
      from_html_prefix.on('end', () => { from_js_bundle.pipe(to_output_file, { end: false }) });
      from_js_bundle.on('end', () => { from_html_suffix.pipe(to_output_file) });
    });
  }

  bundler.on('update', bundle_js);
  bundle_js();
};

function copy_styles() {
  const css_src_path = './src_client/style.css';
  function copy_css_file() {
    const css_dest_path = './build_client/style.css';
    const from_css_file = fs.createReadStream(css_src_path);
    const to_output_file = fs.createWriteStream(css_dest_path);
    from_css_file.pipe(to_output_file);
  }
  fs.watch(css_src_path, copy_css_file);
  copy_css_file();
}







function html_prefix() {
  const html_stream = new stream.Readable();
  html_stream._read = () => {};
  html_stream.push(`<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>Document</title>
</head>
<body>
  <h1>StormWatch</h1>
  <p>This is StormWatch.  This is StormWatch.  This is StormWatch.  This is StormWatch.  This is StormWatch.  This is StormWatch.  This is StormWatch.  This is StormWatch.  This is StormWatch.  This is StormWatch.  This is StormWatch.  This is StormWatch.  This is StormWatch.  This is StormWatch.  This is StormWatch.  </p>
  <script type="text/javascript">`);
  html_stream.push(null);
  return html_stream;
} 

function html_suffix() {
  const html_stream = new stream.Readable();
  html_stream._read = () => {};
  html_stream.push(`
  </script>
</body>
</html>
`);
  html_stream.push(null);
  return html_stream;
}

function stylesheet() {
  const html_stream = new stream.Readable();
  html_stream._read = () => {};
  html_stream.push(`<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>Document</title>
</head>
<body>
  <h1>StormWatch</h1>
  <script type="text/javascript">`);
  html_stream.push(null);
  return html_stream;
} 