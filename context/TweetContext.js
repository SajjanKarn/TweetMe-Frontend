import { createContext, useEffect, useState } from "react";
import { useRouter } from "next/router";
import Axios from "axios";
import { API_URL, NEXT_URL } from "../config/index";
import axios from "axios";

const TweetContext = createContext();

export const TweetContextProvider = ({ children }) => {
  const [error, setError] = useState(null);
  const router = useRouter();

  // like and unlike tweet
  const like_unlike_tweet = async (id) => {
    const res = await fetch(`${NEXT_URL}/api/like`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id }),
    });
    const result = await res.json();

    if (res.ok) {
      router.push("/tweets");
    }
  };

  // post tweet
  const post_tweet = async (tweet) => {
    const res = await fetch(`${NEXT_URL}/api/addtweet`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ tweet }),
    });
    const result = await res.json();
    if (!res.ok) {
      return false;
    } else {
      return true;
    }
  };

  // delete tweet.
  const delete_tweet = async (id) => {
    const res = await fetch(`${NEXT_URL}/api/deletetweet`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id }),
    });
    const result = await res.json();
    if (!res.ok) {
      return false;
    } else {
      return true;
    }
  };

  return (
    <TweetContext.Provider
      value={{ like_unlike_tweet, post_tweet, delete_tweet, error }}
    >
      {children}
    </TweetContext.Provider>
  );
};

export default TweetContext;
