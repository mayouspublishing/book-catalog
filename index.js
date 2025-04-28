const TARGET_BASE = "https://script.google.com/macros/s/AKfycbz9rEQ1Pha8-DEEvjmNjCLZPjHCZdd4NhmtIuj78IQAP6ZKUb3U2BzTAtlKp5Jd262r/exec";
const GTM_ID = "GTM-KDSN97QK"; // <-- your GTM ID here

export default {
  async fetch(request) {
    const html = `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <title>Mayous Book Catalog</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
       
        <!-- 📈 Setup dataLayer and Listen for preview_click before loading GTM -->
<script>
  window.dataLayer = window.dataLayer || [];

  // Listen for postMessage events (for iframe communication)
  window.addEventListener('message', function(event) {
    try {
      // Accept messages ONLY from Google Apps Script iframe
      if (event.origin.includes('googleusercontent.com') || event.origin.includes('script.googleusercontent.com')) {
        if (event.data && event.data.event === 'preview_click') {
          window.dataLayer.push({
            event: 'preview_click',
            book_title: event.data.book_title
          });
          console.log('✅ preview_click event received from iframe and pushed to dataLayer:', event.data);
        }
      } else {
        console.warn('⚠️ Ignored postMessage from unexpected origin:', event.origin);
      }
    } catch (error) {
      console.error('❌ Error handling postMessage:', error);
    }
  });
</script>

<!-- ✅ Load GTM AFTER setting up dataLayer -->
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
        "X-Frame-Options": "ALLOWALL",  // Optional: allows iframe embedding
      },
    });
  },
};

