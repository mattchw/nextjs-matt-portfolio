import { Container, Divider } from "@mantine/core";
import styles from "./Footer.module.css";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <Container>
        <Divider w="50%" mx="auto" />
        <ul className={styles.copy}>
          <li>Copyright © Matthew Wong {new Date().getFullYear()}</li>
        </ul>
      </Container>
    </footer>
  );
}
