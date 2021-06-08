import cookie from "cookie";

export function parseCookie(req) {
  return cookie.parse(req ? req.headers.cookie || "" : "");
}
