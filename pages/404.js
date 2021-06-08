import Layout from "@/components/Layout";
import CustomButton from "@/components/CustomButton";

import styles from "@/styles/404.module.css";

export default function NotFound() {
  return (
    <Layout title="Not Found">
      <div className={styles.notfound}>
        <h2>The page which you are trying to request doesn't exist.</h2>
        <CustomButton href="/" theme="dark" extra="mt-2">Go Back Home</CustomButton>
      </div>
    </Layout>
  );
}
