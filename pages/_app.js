import { AuthContextProvider } from "@/context/AuthContext";
import { TweetContextProvider } from "@/context/TweetContext";

function MyApp({ Component, pageProps }) {
  return (
    <AuthContextProvider>
      <TweetContextProvider>
        <Component {...pageProps} />
      </TweetContextProvider>
    </AuthContextProvider>
  );
}

export default MyApp;
