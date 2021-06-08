import Axios from "axios";
import { API_URL } from "@/config/index";
import { parseCookie } from "@/helpers/index";

export default async (req, res) => {
  if (req.method === "GET") {
    if (!req.headers.cookie) {
      res.status(403).json({ message: "Not Authorized." });
      return;
    }
    const { token } = parseCookie(req);

    const userRes = await fetch(`${API_URL}/api/user/profile`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await userRes.json();

    if (!userRes.ok) {
      res.status(403).json({ message: "Not Authorized" });
    } else {
      res.status(200).json({ user: data });
    }

  } else {
    res.setHeader("Allow", ["GET"]);
    res.status(405).json({ message: `Method ${req.method} is not allowed.` });
  }
};
