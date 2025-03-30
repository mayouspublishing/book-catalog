const TARGET_BASE = "https://script.google.com/macros/s/AKfycbyIcapwCMZq0w9myM1PlNEuT39VAGPaBy277B2ZSkhp6mRgV08Bsa85t3k7NDV8id0a/exec";

// HTMLRewriter class to inject the <base> tag into the <head>
class BaseTagInjector {
  element(element) {
    // Insert the <base> tag so that relative URLs resolve against your Apps Script URL.
    element.prepend(
      `<base href="${TARGET_BASE}/" />`,
      { html: true }
    );
  }
}

async function forwardRequest(request, pathWithSearch) {
  // Remove cookies so that your origin doesn’t get confused by headers.
  const originRequest = new Request(request);
  originRequest.headers.delete("cookie");

  // Build the target URL by appending the path and search parameters.
  const targetUrl = TARGET_BASE + pathWithSearch;
  const response = await fetch(targetUrl, originRequest);

  // Check if the response is HTML and, if so, inject the <base> tag.
  const contentType = response.headers.get("content-type") || "";
  if (contentType.includes("text/html")) {
    return new HTMLRewriter()
      .on("head", new BaseTagInjector())
      .transform(response);
  }
  
  // Return non-HTML responses as-is.
  return response;
}

async function handleRequest(request, ctx) {
  const url = new URL(request.url);
  // Optionally, if you're using a path prefix like "/shop", strip it:
  let modifiedPath = url.pathname.replace(/^\/shop/, "");
  const pathWithSearch = modifiedPath + url.search;
  
  return forwardRequest(request, pathWithSearch);
}

export default {
  async fetch(request, env, ctx) {
    return handleRequest(request, ctx);
  }
};
