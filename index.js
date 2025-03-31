const TARGET_BASE = "https://script.google.com/macros/s/AKfycbyIcapwCMZq0w9myM1PlNEuT39VAGPaBy277B2ZSkhp6mRgV08Bsa85t3k7NDV8id0a/exec";

class LinkRewriter {
  element(element) {
    const attrMap = {
      a: "href",
      form: "action",
      img: "src",
      link: "href",
    };

    const tag = element.tagName.toLowerCase();
    const attr = attrMap[tag];

    if (attr) {
      const value = element.getAttribute(attr);
      if (value && value.startsWith("/")) {
        element.setAttribute(attr, TARGET_BASE + value);
      }
    }
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
      cookie: null,
    },
    body: request.body,
    redirect: "manual",
  });

  const contentType = response.headers.get("content-type") || "";

  if (contentType.includes("text/html")) {
    return new HTMLRewriter()
      .on("a", new LinkRewriter())
      .on("form", new LinkRewriter())
      .on("img", new LinkRewriter())
      .on("link", new LinkRewriter())
      .transform(response);
  }

  return response;
}

export default {
  fetch(request, env, ctx) {
    return handleRequest(request);
  },
};
