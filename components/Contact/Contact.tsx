"use client";

import { FormEvent, useState } from "react";
import { Button, Text, Textarea, TextInput } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { IconAt, IconCheck, IconX } from "@tabler/icons-react";
import { motion, useReducedMotion } from "framer-motion";
import { Section } from "../Section";
import BusinessCard from "./BusinessCard/BusinessCard";
import styles from "./Contact.module.css";

type Props = {
  info: {
    name: string;
    email: string;
    location: string;
    image: string;
  };
  socials: {
    name: string;
    url: string;
  }[];
};

const emptyForm = {
  "form-name": "mattwong.info",
  name: "",
  email: "",
  message: "",
};

export default function Contact({ info, socials }: Props) {
  const reduceMotion = useReducedMotion();
  const [values, setValues] = useState(emptyForm);

  const handleChange =
    (prop: "name" | "email" | "message") =>
    (event: { target: { value: string } }) => {
      setValues({ ...values, [prop]: event.target.value });
    };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    if (!/\S+@\S+\.\S+/.test(values.email)) {
      notifications.show({
        title: "Invalid email address",
        message: "Please enter a valid email address",
        color: "red",
        icon: <IconX size={16} />,
      });
      return;
    }

    try {
      const res = await fetch("https://formspree.io/xwkranjz", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });
      if (!res.ok) {
        throw new Error("Form submission failed");
      }
      setValues(emptyForm);
      notifications.show({
        title: "Thanks for your message",
        message: "I'll get back to you soon.",
        color: "teal",
        icon: <IconCheck size={16} />,
      });
    } catch {
      notifications.show({
        title: "Something went wrong",
        message: "Please try again later",
        color: "red",
        icon: <IconX size={16} />,
      });
    }
  };

  return (
    <Section id="contact" title="Contact">
      <motion.div
        initial={reduceMotion ? false : { opacity: 0, rotateY: 18 }}
        whileInView={reduceMotion ? undefined : { opacity: 1, rotateY: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
        style={{ transformOrigin: "center" }}
      >
        <BusinessCard
          name={info.name}
          location={info.location}
          image={info.image}
          email={info.email}
          networks={socials}
        />
      </motion.div>
      <Text className={styles.heading}>
        Have a question or want to work together?
      </Text>
      <form className={styles.form} onSubmit={handleSubmit}>
        <TextInput
          required
          label="Name"
          value={values.name}
          onChange={handleChange("name")}
          placeholder="Your name"
          mb="sm"
        />
        <TextInput
          required
          label="Email"
          value={values.email}
          onChange={handleChange("email")}
          placeholder="Your email"
          leftSection={<IconAt size={14} />}
          mb="sm"
        />
        <Textarea
          label="Message"
          minRows={4}
          value={values.message}
          onChange={handleChange("message")}
          placeholder="Anything you want to say"
        />
        <div className={styles.submit}>
          <Button type="submit" fw={700}>
            Send
          </Button>
        </div>
      </form>
    </Section>
  );
}
