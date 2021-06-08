import Head from "next/head";
import Header from "./Header";

export default function Layout({ title, children, description, keywords }) {
  return (
    <div>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="keywords" content={keywords} />
      </Head>

      <Header />
      <div className="container mt-3 py-3">{children}</div>
    </div>
  );
}

Layout.defaultProps = {
  title: "TweetMe - Share your thoughts together",
  description:
    "TweetMe is the best social media platform where you can share your thoughts and tweet about your life experiences with others.",
  keywords: "Twitter, TweetMe",
};
