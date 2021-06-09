import Layout from "@/components/Layout";
import AuthContext from "@/context/AuthContext";
import TweetContext from "@/context/TweetContext";
import { useContext, useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function TweetAdd() {
  const [tweet, setTweet] = useState("");
  const { user } = useContext(AuthContext);
  const { error, post_tweet } = useContext(TweetContext);

  if (!user) {
    return null;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!tweet) {
      toast.error("Please enter a tweet.");
      return;
    }

    if (tweet.length < 5) {
      toast.error("A tweet must be greater than 5 characters.");
      return;
    }

    if (tweet.length > 400) {
      toast.error("A tweet must be less than 400 characters.");
      return;
    }

    const result = await post_tweet(tweet);
    if (result) {
      toast.success("Posted Tweet. 🐥");
      setTweet("");
    }
  };

  useEffect(() => error && toast.error(error));

  return (
    <Layout>
      <ToastContainer autoClose={3000} />
      <form className="d-flex" onSubmit={handleSubmit}>
        <input
          type="text"
          max={400}
          className="form-control"
          id="tweet"
          value={tweet}
          onChange={(e) => setTweet(e.target.value)}
          placeholder="Your Tweet"
          required
        />
        <button type="submit" className="btn btn-primary ms-2">
          Post
        </button>
      </form>
      <p className="my-3">
        Characters left:{" "}
        <strong>{tweet.length >= 400 ? 0 : 400 - tweet.length}</strong>/
        <strong>400</strong>
      </p>
    </Layout>
  );
}
