const TARGET_BASE = "https://script.google.com/macros/s/AKfycbyIcapwCMZq0w9myM1PlNEuT39VAGPaBy277B2ZSkhp6mRgV08Bsa85t3k7NDV8id0a/exec";

class BaseTagInjector {
  element(element) {
    element.prepend(`<base href="${TARGET_BASE}/">`, { html: true });
  }
}

async function handleRequest(request) {
  const url = new URL(request.url);
  const path = url.pathname.replace(/^\/shop/, "") + url.search;

  const targetUrl = TARGET_BASE + path;

  const response = await fetch(targetUrl, {
    method: request.method,
    headers: {
      ...Object.fromEntries(request.headers),
      // Strip cookies
      cookie: null,
    },
    body: request.body,
    redirect: "manual",
  });

  const contentType = response.headers.get("content-type") || "";

  if (contentType.includes("text/html")) {
    return new HTMLRewriter()
      .on("head", new BaseTagInjector())
      .transform(response);
  }

  return response;
}

export default {
  fetch(request, env, ctx) {
    return handleRequest(request);
  },
};
