import cookie from "cookie";

export default async (req, res) => {
  if (req.method === "POST") {
    if (!req.headers.cookie) {
      res.json({ error: "Already logged out." });
      return;
    }

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
    res.status(200).json({ message: "logged out." });
    return;
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).json({ message: `Method ${req.method} is not allowed.` });
  }
};
