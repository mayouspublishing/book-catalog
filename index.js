addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request));
});

class BaseTagInjector {
  element(element) {
    // Inject a <base> tag at the start of the <head> element.
    // Adjust the href value so that relative URLs resolve to your Apps Script.
    element.prepend('<base href="https://script.google.com/macros/s/AKfycbyIcapwCMZq0w9myM1PlNEuT39VAGPaBy277B2ZSkhp6mRgV08Bsa85t3k7NDV8id0a/exec/" />', { html: true });
  }
}

async function handleRequest(request) {
  // Create a URL object from the incoming request.
  let incomingUrl = new URL(request.url);
  
  // Define your target Apps Script URL (base URL).
  const targetBase = "https://script.google.com/macros/s/AKfycbyIcapwCMZq0w9myM1PlNEuT39VAGPaBy277B2ZSkhp6mRgV08Bsa85t3k7NDV8id0a/exec";
  
  // Remove the "/shop" prefix from the incoming path.
  let modifiedPath = incomingUrl.pathname.replace(/^\/shop/, "");
  
  // Rebuild the target URL with the query string.
  let targetUrl = targetBase + modifiedPath + incomingUrl.search;
  
  console.log("Proxying request to:", targetUrl);
  
  // Create a new Request for the target URL, preserving the original request's settings.
  let modifiedRequest = new Request(targetUrl, request);
  
  // Fetch the response from your Apps Script.
  const response = await fetch(modifiedRequest);
  
  // If the response is HTML, inject the <base> tag.
  const contentType = response.headers.get("content-type") || "";
  if (contentType.includes("text/html")) {
    return new HTMLRewriter()
      .on('head', new BaseTagInjector())
      .transform(response);
  }
  
  // For non-HTML responses, just return the response as is.
  return response;
}
