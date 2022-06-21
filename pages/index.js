import Head from "next/head";
import dynamic from "next/dynamic";

import styles from "../styles/Home.module.css";
const Canvas = dynamic(() => import("../components/Canvas"), {
  ssr: false,
});

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <Canvas />
      </main>
    </div>
  );
}
