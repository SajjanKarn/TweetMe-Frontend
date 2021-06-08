import Tweet from "@/components/Tweet";

export default function UserTweets({ tweets, user: userData }) {
  return (
    <>
      {tweets.length === 0 && <h3>No tweets posted yet.</h3>}
      {tweets.map((tweet) => (
        <Tweet tweet={tweet} key={tweet._id} user={userData} />
      ))}
    </>
  );
}