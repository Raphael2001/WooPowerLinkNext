import Test from "components/Test/test";

import styles from "./home.module.scss";

export default async function Home() {
  return (
    <main className={styles.main}>
      <Test />
    </main>
  );
}
