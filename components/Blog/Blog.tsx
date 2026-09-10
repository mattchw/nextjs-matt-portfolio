"use client";

import { Badge, Card, Grid, Group, Text } from "@mantine/core";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import type BlogPost from "@/interfaces/blogPost";
import { excerptFromHtml } from "@/lib/blog";
import { easeOut } from "@/lib/motion";
import { Section } from "../Section";
import styles from "./Blog.module.css";

type Props = {
  posts: BlogPost[];
};

export default function Blog({ posts }: Props) {
  const reduceMotion = useReducedMotion();
  const visiblePosts = posts.slice(0, 6);

  return (
    <Section id="blog" title="My Latest Blogs">
      {visiblePosts.length === 0 ? (
        <Text className={styles.empty}>
          Latest posts will appear here when the Medium feed is available.
        </Text>
      ) : (
        <Grid gutter="lg">
          {visiblePosts.map((post, index) => (
            <Grid.Col key={post.link} span={{ base: 12, sm: 6, md: 4 }}>
              <motion.div
                initial={reduceMotion ? false : { opacity: 0, y: 16 }}
                whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.08, duration: 0.4, ease: easeOut }}
              >
                <Card shadow="sm" padding="lg" radius="md" withBorder h="100%">
                  <Card.Section
                    component="a"
                    href={post.link}
                    target="_blank"
                    rel="noreferrer"
                  >
                    {post.thumbnail ? (
                      <Image
                        src={post.thumbnail}
                        alt={post.title}
                        width={640}
                        height={200}
                        style={{ width: "100%", height: 180, objectFit: "cover" }}
                      />
                    ) : null}
                  </Card.Section>
                  <Group justify="space-between" mt="md" mb="xs">
                    <Text fw={600} lineClamp={2}>
                      {post.title}
                    </Text>
                  </Group>
                  <Group gap={8} mb="sm">
                    {post.categories.slice(0, 1).map((category) => (
                      <Badge key={category} color="pink" size="sm">
                        {category}
                      </Badge>
                    ))}
                    <Badge size="sm" variant="light">
                      {post.pubDate.slice(0, 10)}
                    </Badge>
                  </Group>
                  <Text size="sm" c="dimmed" lineClamp={3}>
                    {excerptFromHtml(post.description)}
                  </Text>
                </Card>
              </motion.div>
            </Grid.Col>
          ))}
        </Grid>
      )}
    </Section>
  );
}
