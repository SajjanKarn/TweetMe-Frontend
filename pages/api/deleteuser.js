import axios from "axios";
import { API_URL } from "@/config/index";
import { parseCookie } from "@/helpers/index";
import cookie from "cookie";

export default async (req, res) => {
  if (req.method === "DELETE") {
    const { token } = parseCookie(req);
    if (!token) return res.json({ error: "Not Authorized." });

    const deleteRes = await fetch(`${API_URL}/api/user/profile/delete`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const result = await deleteRes.json();

    if (!deleteRes.ok) {
      res.json({ error: "Something went wrong." });
    } else {
      res.setHeader(
        "Set-Cookie",
        cookie.serialize("token", "", {
          httpOnly: true,
          expires: new Date(0),
          sameSite: "strict",
          secure: process.env.NODE_ENV !== "development",
          path: "/",
        })
      );
      res.status(200).json({ result });
      return;
    }
  } else {
    res.setHeader("Allow", ["DELETE"]);
    res.status(405).json({ message: `Method ${req.method} is not allowed.` });
  }
};
