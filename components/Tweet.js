import TweetContext from "@/context/TweetContext";
import moment from "moment";
import { useContext } from "react";

import styles from "@/styles/Tweet.module.css";
import { useRouter } from "next/router";
import { toast } from "react-toastify";

export default function Tweet({ tweet, user }) {
  const router = useRouter();
  const { like_unlike_tweet, delete_tweet } = useContext(TweetContext);

  const handleDelete = async (id) => {
    if (confirm("Are you sure you want to delete tweet ?")) {
      const result = await delete_tweet(id);

      if (result) {
        router.push("/account/dashboard");
      }
    }
  };
  return (
    <div className={`card mt-2 mb-5 ${styles.extra_stuffs}`}>
      <div className="card-header d-flex">
        tweeted: {moment(tweet.postedAt).fromNow()}
        {router.pathname === "/account/dashboard" && (
          <button
            className="btn btn-danger btn-sm ms-3"
            onClick={() => handleDelete(tweet._id)}
          >
            <i class="fa fa-trash" aria-hidden="true"></i>
          </button>
        )}
      </div>
      <div className="card-body">
        <h5 className="card-title">
          <strong>{tweet.postedBy.username}</strong>
        </h5>
        <p className="card-text">{tweet.tweet}</p>
        <button
          className="btn btn-primary"
          onClick={() => like_unlike_tweet(tweet._id)}
        >
          {`${tweet.likes.length}  `}
          <i
            className={`fa ${
              tweet.likes.includes(user._id) ? "fa-thumbs-down" : "fa-thumbs-up"
            } ms-1`}
            aria-hidden="true"
          ></i>
        </button>
        <button className="btn btn-secondary">
          {`${tweet.comments.length}  `}
          <i className="fa fa-commenting-o ms-1" aria-hidden="true"></i>
        </button>
      </div>
    </div>
  );
}
