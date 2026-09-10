"use client";

import {
  Accordion,
  Avatar,
  Group,
  List,
  Text,
  Timeline,
} from "@mantine/core";
import { IconBriefcase, IconSchool } from "@tabler/icons-react";
import { Work, Education } from "@/interfaces";
import { Section } from "../Section";
import styles from "./Resume.module.css";

type Props = {
  data: {
    work: Work[];
    education: Education[];
  };
};

export default function Resume({ data: { work, education } }: Props) {
  return (
    <Section id="resume" title="Resume">
      <div className={styles.block}>
        <h3 className={styles.sideTitle}>
          <IconBriefcase size={22} />
          Work
        </h3>
        <Accordion variant="contained" defaultValue={work[0]?.company} className={styles.accordion}>
          {work.map((item) => (
            <Accordion.Item key={item.company} value={item.company}>
              <Accordion.Control>
                <Group wrap="nowrap">
                  <Avatar src={item.image} radius="xl" size="lg" alt="" />
                  <Text fw={600}>{item.company}</Text>
                </Group>
              </Accordion.Control>
              <Accordion.Panel>
                <Timeline
                  active={item.positions.length}
                  bulletSize={16}
                  lineWidth={2}
                  color="brand"
                >
                  {item.positions.map((position) => (
                    <Timeline.Item
                      key={`${item.company}-${position.title}`}
                      title={position.title}
                      lineVariant="dashed"
                    >
                      <Text size="xs" mt={4} c="dimmed">
                        {position.startDate} - {position.endDate}
                      </Text>
                      {position.description.length > 0 ? (
                        <List size="sm" withPadding mt="sm">
                          {position.description.map((description) => (
                            <List.Item key={description}>{description}</List.Item>
                          ))}
                        </List>
                      ) : (
                        <Text size="sm" mt="sm" c="dimmed">
                          Ask me about current work.
                        </Text>
                      )}
                    </Timeline.Item>
                  ))}
                </Timeline>
              </Accordion.Panel>
            </Accordion.Item>
          ))}
        </Accordion>
      </div>

      <div className={styles.block}>
        <h3 className={styles.sideTitle}>
          <IconSchool size={22} />
          Education
        </h3>
        <Accordion
          variant="contained"
          defaultValue={education[0]?.school}
        >
          {education.map((item) => (
            <Accordion.Item key={item.school} value={item.school}>
              <Accordion.Control>
                <Group wrap="nowrap">
                  <Avatar src={item.image} radius="xl" size="lg" alt="" />
                  <Text fw={600}>{item.school}</Text>
                </Group>
              </Accordion.Control>
              <Accordion.Panel>
                <Text size="sm" mt={4}>
                  {item.degree}
                </Text>
                <Text size="xs" mt={4} c="dimmed">
                  {item.startDate} - {item.endDate}
                </Text>
                <List size="sm" withPadding mt="sm">
                  {item.description.map((description) => (
                    <List.Item key={description}>{description}</List.Item>
                  ))}
                </List>
              </Accordion.Panel>
            </Accordion.Item>
          ))}
        </Accordion>
      </div>
    </Section>
  );
}
