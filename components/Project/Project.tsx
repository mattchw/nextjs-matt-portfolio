"use client";

import { useRef } from "react";
import {
  Badge,
  Button,
  Card,
  Group,
  Text,
} from "@mantine/core";
import { Carousel } from "@mantine/carousel";
import Autoplay from "embla-carousel-autoplay";
import { IconBrandGithub } from "@tabler/icons-react";
import Image from "next/image";
import Link from "next/link";
import { useReducedMotion } from "framer-motion";
import { Project as ProjectType } from "@/interfaces";
import { Section } from "../Section";
import styles from "./Project.module.css";

type Props = {
  projects: ProjectType[];
};

function ProjectCard({
  image,
  name,
  url,
  github,
  description,
  tags,
}: ProjectType) {
  return (
    <Card shadow="sm" padding="lg" radius="md" h="100%" className={styles.card}>
      <Card.Section>
        <Image
          src={`/projects/${image}`}
          alt={name}
          width={960}
          height={540}
          style={{ width: "100%", height: 280, objectFit: "cover" }}
        />
      </Card.Section>
      <Group justify="space-between" mt="md" mb="xs" wrap="wrap">
        {url ? (
          <Text fw={600} component="a" href={url} target="_blank" rel="noreferrer">
            {name}
          </Text>
        ) : (
          <Text fw={600}>{name}</Text>
        )}
        <Group gap={6}>
          {tags.map((tag) => (
            <Badge key={tag.name} color={tag.color} size="xs">
              {tag.name}
            </Badge>
          ))}
        </Group>
      </Group>
      <Text mt="xs" c="dimmed" size="sm" lineClamp={2}>
        {description}
      </Text>
      <Group mt="md">
        <Button
          component={Link}
          href={github}
          target="_blank"
          rel="noreferrer"
          variant="light"
          leftSection={<IconBrandGithub size={16} />}
        >
          GitHub
        </Button>
      </Group>
    </Card>
  );
}

export default function Project({ projects }: Props) {
  const prefersReduced = useReducedMotion();
  const reduceMotion = prefersReduced === true;
  const autoplay = useRef(
    Autoplay({ delay: 5000, stopOnInteraction: false }),
  );

  return (
    <Section id="project" title="My Works">
      <Carousel
        classNames={{
          root: styles.root,
          controls: styles.controls,
          indicator: styles.indicator,
        }}
        previousControlProps={{ "aria-label": "Previous project" }}
        nextControlProps={{ "aria-label": "Next project" }}
        slideSize={{ base: "100%", sm: "90%", md: "80%" }}
        slideGap="md"
        withIndicators
        emblaOptions={{ loop: true, align: "center" }}
        plugins={reduceMotion ? [] : [autoplay.current]}
        onMouseEnter={autoplay.current.stop}
        onMouseLeave={reduceMotion ? undefined : autoplay.current.reset}
      >
        {projects.map((item) => (
          <Carousel.Slide key={item.name}>
            <ProjectCard {...item} />
          </Carousel.Slide>
        ))}
      </Carousel>
    </Section>
  );
}
