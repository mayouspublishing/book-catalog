const TARGET_BASE = "https://script.google.com/macros/s/AKfycbxFlU0PWFOHofPv5jpHMdXct8qpDe46Hut8T3r1qT-av8JwPuRlUstoZ_QHUcOstHk_/exec";
const GTM_ID = "GTM-KDSN97QK";

export default {
  async fetch(request) {
    const html = `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <title>Mayous Book Catalog</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0">

        <!-- Set up dataLayer early -->
        <script>
          window.dataLayer = window.dataLayer || [];
        </script>

        <!-- 📈 Listen for postMessage preview_click events from iframe -->
        <script>
          window.addEventListener('message', function(event) {
            try {
              if (event.origin.includes('googleusercontent.com') || event.origin.includes('script.googleusercontent.com')) {
                if (event.data && event.data.event === 'preview_click') {
                  window.dataLayer.push({
                    event: 'preview_click',
                    book_title: event.data.book_title
                  });
                  console.log('✅ preview_click event received from iframe and pushed to dataLayer:', event.data);
                }
              } else {
                console.warn('⚠️ Ignored postMessage from unknown origin:', event.origin);
              }
            } catch (error) {
              console.error('❌ Error handling postMessage:', error);
            }
          });
        </script>

        <!-- ✅ Load GTM script after setting up -->
        <script async src="https://www.googletagmanager.com/gtm.js?id=${GTM_ID}"></script>

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
        "X-Frame-Options": "ALLOWALL",
      },
    });
  },
};


