import {
  Button,
  Container,
  Divider,
  Grid,
  Text,
  Textarea,
  TextInput,
} from "@mantine/core";
import { useState } from "react";
import styles from "./Contact.module.css";
import { showNotification } from "@mantine/notifications";

// componenets
import BusinessCard from "./BusinessCard/BusinessCard";
import { IconAt, IconCheck, IconX } from "@tabler/icons";

export interface Props {
  socials: {
    name: string;
    url: string;
  }[];
}

const Contact: React.FC<Props> = ({ socials }) => {
  const [values, setValues] = useState({
    "form-name": "mattwong.info",
    name: "",
    email: "",
    message: "",
  });
  const handleChange =
    (prop: string) => (event: { target: { value: string } }) => {
      setValues({ ...values, [prop]: event.target.value });
    };
  const validateEmail = (email: string) => {
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
  };
  const handleSubmit = (e: { preventDefault: () => void }) => {
    const sendForm = async () => {
      try {
        const res = await fetch("https://formspree.io/xwkranjz", {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify(values),
        });
        if (res.ok) {
          console.log("Form submission successful");
          setValues({
            "form-name": "mattwong.info",
            name: "",
            email: "",
            message: "",
          });
          showNotification({
            title: "Thanks for your message 📩",
            message: "I'll get back to you soon 🤓",
            color: "teal",
            icon: <IconCheck size={16} />,
            autoClose: 5000,
          });
        }
      } catch (error) {
        console.log("Form submission failed");
        showNotification({
          title: "Oops, something went wrong 🤔",
          message: "Please try again later",
          color: "red",
          icon: <IconX size={16} />,
          autoClose: 5000,
        });
      }
    };
    if (validateEmail(values.email)) {
      sendForm();
    } else {
      showNotification({
        title: "Invalid email address",
        message: "Please enter a valid email address",
        color: "red",
        icon: <IconX size={16} />,
        autoClose: 5000,
      });
    }
    e.preventDefault();
  };
  return (
    <Container className={styles.contact}>
      <Grid justify="center" align="center" className={styles.contactHeading}>
        <h2>Contact</h2>
      </Grid>
      <Grid justify="center" align="center">
        <BusinessCard
          name={"Matt Wong"}
          location={"Hong Kong"}
          image={"/profilepic-about.svg"}
          email="matthew.chohin@gmail.com"
          networks={socials}
        />
      </Grid>
      <Grid justify="center" align="center" style={{ paddingTop: 20 }}>
        <h4>Have a question or want to work together?</h4>
      </Grid>
      <Grid justify="center" align="center" style={{ margin: 0 }}>
        <form onSubmit={handleSubmit} style={{ width: "100%" }}>
          <TextInput
            required
            label="Name"
            value={values.name}
            onChange={handleChange("name")}
            placeholder="Your name"
          />
          <TextInput
            required
            label="Email"
            value={values.email}
            onChange={handleChange("email")}
            placeholder="Your email"
            icon={<IconAt size={14} />}
          />
          <Textarea
            label="Message"
            minRows={4}
            value={values.message}
            onChange={handleChange("message")}
            placeholder="Anything you want to say to me 😊"
          />
          <Grid
            justify="center"
            align="center"
            style={{ margin: 0, paddingTop: 20 }}
          >
            <Button
              type="submit"
              style={{ color: "#e2e2e2", fontWeight: "bold" }}
            >
              Send
            </Button>
          </Grid>
        </form>
      </Grid>

      <div
        style={{ paddingTop: 40, display: "flex", justifyContent: "center" }}
      >
        <Divider style={{ width: "50%" }} />
      </div>
      <Grid
        justify="center"
        align="center"
        style={{ marginTop: 40, marginBottom: 40 }}
      >
        <ul className={styles.copyright}>
          <li>Copyright &copy; Matthew Wong {new Date().getFullYear()}</li>
        </ul>
      </Grid>
    </Container>
  );
};

export default Contact;
