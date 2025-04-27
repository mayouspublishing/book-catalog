const TARGET_BASE = "https://script.google.com/macros/s/AKfycbzODu5KTm-qFFc8BVqoBhzU6J0bDwmYBV2loGJqT2C9bX9zPuVs3glIko2HBuDeuVeU/exec";
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
       
         <!-- Inject GTM Script -->
        <script>
          window.dataLayer = window.dataLayer || [];
          window.dataLayer.push({
            'gtm.start': new Date().getTime(),
            event: 'gtm.js'
          });
          (function(w,d,s,l,i){
            w[l]=w[l]||[];
            w[l].push({'gtm.start': new Date().getTime(),event:'gtm.js'});
            var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';
            j.async=true;
            j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;
            f.parentNode.insertBefore(j,f);
          })(window,document,'script','dataLayer','${GTM_ID}');
        </script>
        
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

