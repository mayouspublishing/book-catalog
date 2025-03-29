addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request))
})

async function handleRequest(request) {
  // Create a URL object from the incoming request
  let incomingUrl = new URL(request.url);
  
  // Define your target Apps Script URL (replace YOUR_APPS_SCRIPT_URL with your actual URL)
  const targetBase = "https://script.google.com/macros/s/AKfycbyIcapwCMZq0w9myM1PlNEuT39VAGPaBy277B2ZSkhp6mRgV08Bsa85t3k7NDV8id0a/exec";
  
  // We assume requests to /book-catalog should be proxied to your Apps Script
  // Remove the "/book-catalog" path portion (if needed)
  let modifiedPath = incomingUrl.pathname.replace(/^\/book-catalog/, "");
  
  // Rebuild the target URL with the query string
  let targetUrl = targetBase + modifiedPath + incomingUrl.search;
  
  console.log("Proxying request to:", targetUrl);
  
  // Proxy the request to your target URL
  return fetch(targetUrl, request);
  
}
