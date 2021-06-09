import CustomButton from "@/components/CustomButton";
import Layout from "@/components/Layout";

export default function Home() {
  return (
    <Layout title="Home Page">
      <div className="jumbotron">
        <h2>Welcome to TweetME(Sasta Twitter Ultra pro max lite.)!</h2>
        <p className="lead">
          The best place for you to share your thoughts and words without
          getting banned😅.
        </p>
        <hr className="my-4" />
        <p>
          Yeah..... The platform doesn't have many features but yeah i can
          definetely assure that it's more safe than facebook in privacy
          concerns.😂
        </p>
        <p className="lead">
          <CustomButton href="/about" >
            Learn more
          </CustomButton>
        </p>
      </div>
    </Layout>
  );
}
