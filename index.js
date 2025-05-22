const CATALOG_ORIGIN = "https://catalog-shop.pages.dev";

export default {
  async fetch(request) {
    const url = new URL(request.url);

    // Strip "/shop" prefix to forward to the real origin
    const pathname = url.pathname.replace(/^\/shop/, "") || "/";
    const targetUrl = `${CATALOG_ORIGIN}${pathname}${url.search}`;

    return fetch(targetUrl, {
      method: request.method,
      headers: request.headers,
      body: request.body,
      redirect: "follow"
    });
  }
};

