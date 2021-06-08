import Layout from "@/components/Layout";

export default function About() {
  return (
    <Layout title="About - TweetME">
      <p>
        Project name: <strong>TweetME</strong>
      </p>
      <p>Version: 1.0.0</p>
      <p>
        Developed by:{" "}
        <a className="btn btn-dark" href="https://instagram.com/sajjan_404">
          <i class="fa fa-instagram me-2" aria-hidden="true"></i>
          Sajjan
        </a>
      </p>
    </Layout>
  );
}
