"use client";

import { useEffect, useState } from "react";
import { Blockquote, Grid, Text, useComputedColorScheme } from "@mantine/core";
import { CodeHighlight } from "@mantine/code-highlight";
import { IconCode } from "@tabler/icons-react";
import Image from "next/image";
import { quotes } from "@/constants/quotes";
import { Section } from "../Section";
import Skill from "./Skill/Skill";
import styles from "./About.module.css";

type Props = {
  data: {
    title: string;
    location: string;
    description: string;
    skills: string[];
    hobbies: string[];
  };
};

export default function About({ data }: Props) {
  const { title, location, description, skills, hobbies } = data;
  const colorScheme = useComputedColorScheme("dark");
  const [quote, setQuote] = useState(quotes[0]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    setQuote(quotes[Math.floor(Math.random() * quotes.length)]);
  }, []);

  const demoCode = JSON.stringify(
    { title, location, description, hobbies },
    null,
    2,
  );

  return (
    <Section id="about" title="About Me">
      <Grid gutter="xl" className={styles.aboutGrid}>
        <Grid.Col span={{ base: 12, md: 4 }}>
          <div className={styles.photoWrap}>
            <Image
              src="/profilepic.jpg"
              alt="Matt Wong"
              width={220}
              height={220}
              className={styles.photo}
            />
          </div>
        </Grid.Col>
        <Grid.Col span={{ base: 12, md: 8 }}>
          <Blockquote
            className={styles.quote}
            cite={`— ${quote.cite}`}
            color="brand"
          >
            {quote.quote}
          </Blockquote>
          <CodeHighlight
            className={styles.code}
            code={demoCode}
            language="json"
            withCopyButton={false}
          />
          <div className={styles.skillsHeading}>
            <IconCode size={22} />
            <span>Code Skills</span>
          </div>
          <Grid gutter="lg">
            {skills.map((skill) => (
              <Grid.Col key={skill} span={4} className={styles.skill}>
                <Skill
                  name={skill}
                  color={
                    !mounted || colorScheme === "dark" ? "#ffffff" : "#111111"
                  }
                />
                <Text size="sm" mt={6}>
                  {skill}
                </Text>
              </Grid.Col>
            ))}
          </Grid>
        </Grid.Col>
      </Grid>
    </Section>
  );
}
