const TARGET_BASE = "https://script.google.com/macros/s/AKfycbx0qoJvPu3lP7AyIUDC8kIGLKPCJmG6r2qI-XUFeL2UmYJddVDU70Z4p9NBK8_9N4k1/exec";

export default {
  async fetch(request) {
    const html = `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <title>Mayous Book Catalog</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <style>
          html, body {
            margin: 0;
            padding: 0;
            height: 100%;
            width: 100%;
          }
          iframe {
            border: none;
            width: 100%;
            height: 100%;
          }
        </style>
      </head>
      <body>
        <iframe src="${TARGET_BASE}" allow="fullscreen"></iframe>
      </body>
      </html>
    `;

    return new Response(html, {
      headers: {
        "Content-Type": "text/html; charset=utf-8",
        "X-Frame-Options": "ALLOWALL",  // Optional: allows iframe embedding
      },
    });
  },
};

