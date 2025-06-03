export default {
  async fetch(request) {
    const url = new URL(request.url);

    // Strip the "/shop" prefix and keep the rest of the path + query
    const redirectPath = url.pathname.replace(/^\/shop/, "") || "/";
    const redirectUrl = `https://shop.mayous.org${redirectPath}${url.search}`;

    return Response.redirect(redirectUrl, 301); // 301 = Permanent redirect
  }
};

