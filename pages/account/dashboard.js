import { useContext } from "react";

import Layout from "@/components/Layout";
import ProfileCard from "@/components/ProfileCard";
import UserTweets from "@/components/UserTweets";

import { API_URL } from "@/config/index";
import AuthContext from "@/context/AuthContext";

import { parseCookie } from "@/helpers/index";

import styles from "@/styles/Dashboard.module.css";
import CustomButton from "@/components/CustomButton";
import { useRouter } from "next/router";

export default function Dashboard({ userData, tweets }) {
  const { user, deleteAccount } = useContext(AuthContext);
  const router = useRouter();

  if (!user) {
    return null;
  }

  const handleDelete = async () => {
    if (
      confirm(
        "Are you sure you want to delete you account? This will delete all your posted tweets as well."
      )
    ) {
      const result = await deleteAccount();
      if (result) {
        router.push("/account/login");
        return;
      }
    }
  };

  return (
    <Layout>
      <h1>
        Welcome back <strong>{userData.fullname}</strong>
      </h1>
      <CustomButton href="/tweets">View All Tweets</CustomButton>
      <button className="btn btn-danger" onClick={() => handleDelete()}>
        Delete Account
      </button>

      <div className={` mt-3 ${styles.tweets}`}>
        <ProfileCard user={userData} />
        <h2 className="py-3">My Tweets</h2>
        <UserTweets tweets={tweets} user={userData} />
      </div>
    </Layout>
  );
}

export async function getServerSideProps({ req }) {
  const { token } = parseCookie(req);

  if (token) {
    const res = await fetch(`${API_URL}/api/user/profile`, {
      headers: {
        Authorization: `Bearer ${token ? token : ""}`,
      },
    });
    const userData = await res.json();

    const tweetRes = await fetch(`${API_URL}/api/user/profile/tweets`, {
      headers: {
        Authorization: `Bearer ${token ? token : ""}`,
      },
    });
    const tweets = await tweetRes.json();
    tweets.reverse();

    return {
      props: {
        userData,
        tweets,
      },
    };
  } else {
    return { props: {} };
  }
}
