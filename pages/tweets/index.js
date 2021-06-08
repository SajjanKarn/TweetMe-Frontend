import Layout from "@/components/Layout";
import Tweet from "@/components/Tweet";

import { API_URL } from "@/config/index";
import { parseCookie } from "@/helpers/index";

export default function Index({ tweets, userData }) {
  return (
    <Layout>
      <h3>Recent User Tweets</h3>

      {tweets && tweets.length === 0 && <h3>No tweets available.</h3>}
      {tweets && tweets.map((tweet) => (
        <Tweet tweet={tweet} key={tweet._id} user={userData} />
      ))}
    </Layout>
  );
}

export async function getServerSideProps({ req }) {
  const { token } = parseCookie(req);

  if (token) {
    const res = await fetch(`${API_URL}/api/user/tweets`, {
      headers: {
        Authorization: `Bearer ${token ? token : ""}`,
      },
    });
    const tweets = await res.json();

    const userRes = await fetch(`${API_URL}/api/user/profile`, {
      headers: {
        Authorization: `Bearer ${token ? token : ""}`,
      },
    });
    const userData = await userRes.json();
    return {
      props: {
        tweets,
        userData,
      },
    };
  }

  return {
    props: {},
  };
}
