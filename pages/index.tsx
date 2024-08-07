import { ActionIcon, useMantineColorScheme } from "@mantine/core";
import { IconSun, IconMoonStars } from "@tabler/icons";
import type { NextPage } from "next";
import React, { useCallback, useEffect, useRef, useState } from "react";
import Banner from "../components/Banner/Banner";
import About from "../components/About/About";
import Resume from "../components/Resume/Resume";
import Project from "../components/Project/Project";
import Blog from "../components/Blog/Blog";
import Contact from "../components/Contact/Contact";
import Footer from "../components/Footer/Footer";

const Home: NextPage = () => {
  const [data, setData] = useState([]);
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();
  const dark = colorScheme === "dark";

  const [visibleSection, setVisibleSection] = useState<string>();
  const [sectionRefs, setSectionRefs] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      await fetch(
        "https://api.rss2json.com/v1/api.json?rss_url=https://medium.com/feed/@mattchw"
      )
        .then((res) => res.json())
        .then((data) => {
          const res = data.items;
          const posts = res.filter(
            (item: { categories: string | any[] }) => item.categories.length > 0
          );
          setData(posts);
        });
    };

    fetchData();
  }, []);

  const handleVisibilityChange = useCallback(
    (sectionId: string, isVisible: boolean) => {
      // check if scrolling stops

      if (isVisible) {
        setVisibleSection(sectionId);
      } else if (visibleSection === sectionId) {
        setVisibleSection(undefined);
      }
    },
    [visibleSection]
  );

  const addSectionRef = useCallback(
    (id: string, ref: React.MutableRefObject<any>) => {
      setSectionRefs((prevRefs: any) => {
        // Ensure the ref is not already in the array
        if (!prevRefs.some((r: any) => r.id === id)) {
          return [...prevRefs, { id, ref }];
        }
        return prevRefs;
      });
    },
    []
  );

  const scrollTo = (ele: any) => {
    ele.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  return (
    <>
      <div className={`sticky ${visibleSection ? "show" : "hide"}`}>
        {sectionRefs.map((sectionRef: any, index) => (
          <button
            key={index}
            type="button"
            className={`headerLink
            ${visibleSection === sectionRef.id ? "active" : ""}
          `}
            onClick={() => scrollTo(sectionRef.ref.current)}
          >
            {sectionRef.id}
          </button>
        ))}
      </div>
      <ActionIcon
        variant="light"
        color={dark ? "yellow" : "blue"}
        onClick={() => {
          if (dark) {
            localStorage.setItem("theme", "light");
          } else {
            localStorage.setItem("theme", "dark");
          }
          toggleColorScheme();
        }}
        className="themeButton"
      >
        {dark ? <IconSun size={24} /> : <IconMoonStars size={24} />}
      </ActionIcon>
      <Banner />
      <About
        id="About"
        data={{
          title: "Software Engineer 🧑‍💻",
          location: "United Kingdom 🇬🇧 / Hong Kong 🇭🇰",
          description:
            "Having worked at both frontend and backend positions for 4+ years, I am a self-driven fast learner with in-depth skills and expertise in designing, planning, developing and maintenance of software.",
          skills: [
            "Html",
            "Css",
            "Javascript",
            "Typescript",
            "Nodejs",
            "Golang",
          ],
          hobbies: ["Drawing 🎨", "Guitar 🎸", "Reading 📚", "Gaming 🎮"],
        }}
        addSectionRef={addSectionRef}
        onVisibilityChange={handleVisibilityChange}
      />
      <Resume
        id="Resume"
        data={{
          work: [
            {
              company: "Roku",
              image: "/resume/work/roku.png",
              positions: [
                {
                  title: "Software Engineer",
                  startDate: "July 2023",
                  endDate: "Present",
                  description: [],
                },
              ],
            },
            {
              company: "SHOPLINE",
              image: "/resume/work/shopline.jpeg",
              positions: [
                {
                  title: "Software Engineer",
                  startDate: "June 2022",
                  endDate: "Janurary 2023",
                  description: [
                    "Implemented cart microservice using Go and gRPC focusing on filtering and applying merchants' promotions with Hong Kong and Taiwan teams",
                    "Boosted the speed and performance of retrieving and filtering promotions of merchants by 90%, from 11s to 1s, and rolled out filtering feature to over 5,000 merchants",
                    "Wrote implementation plans and flowcharts on filtering and applying different types of bundle promotions",
                    "Wrote unit tests and designed integration tests on applying promotions and achieved over 70% code coverage with Go Testify",
                    "Assisted on updating existing Helm deployment files and deployed using development features to AWS EKS cluster",
                    "Monitored development and production logs and tracked issues using NewRelic and AWS CloudWatch",
                  ],
                },
              ],
            },
            {
              company: "AppicIDEA IT Solutions Limited",
              image: "/resume/work/appicidea.jpeg",
              positions: [
                {
                  title: "Software Engineer",
                  startDate: "June 2021",
                  endDate: "June 2022",
                  description: [
                    "Architected and designed highly available and scalable solutions using AWS including EC2, VPC, S3, RDS for clients",
                    "Collaborated with frontend developers and provided assistance and guidance on the integration of server-side APIs",
                    "Developed 5 server-side applications using Ts.ED, Node.js framework with Typescript, integrating with MySQL, PostgreSQL, Redis, RabbitMQ and Elasticsearch",
                    "Assisted on frequent code merges, builds, deployments with CI/CD pipeline using Jenkins, Docker and Kubernetes and setting up of the deployment environments including internal UAT and production on AWS",
                    "Maintained and monitored production applications with Kibana APM system on Elastic Cloud and provided technical support to clients",
                  ],
                },
                {
                  title: "Frontend Developer",
                  startDate: "December 2020",
                  endDate: "June 2021",
                  description: [
                    "Designed and documented common practices to standardize coding and git commit styles for internal developers",
                    "Developed and implemented 4 mobile applications with React Native, Redux, Typescript",
                    "Integrated mobile applications with internal Node.js REST API applications and Firebase",
                    "Configured CI/CD pipelines for mobile applications with App Center to increase delivery speed to clients for UAT and production purposes by 30%",
                  ],
                },
              ],
            },
          ],
          education: [
            {
              school: "The Chinese University of Hong Kong",
              image: "/resume/education/cuhk.png",
              degree: "B.Sc. in Computer Science",
              startDate: "September 2015",
              endDate: "July 2019",
              description: [
                "Specialized in cloud, networks, database, web and mobile applications development",
                "Developed a set of 2 educational applications for assignment marking and grade analysis in final year project with Spring.io, Swift, React Native, Javascript",
              ],
            },
          ],
        }}
        addSectionRef={addSectionRef}
        onVisibilityChange={handleVisibilityChange}
      />
      <Project
        id="Project"
        projects={[
          {
            name: "Youtube AI",
            description:
              "API for downloading, transcribing, and summarizing YouTube videos using NestJS, OpenAI Whisper, and GPT-4",
            url: "",
            github: "https://github.com/mattchw/nestjs-youtube-ai",
            image: "YoutubeAI.png",
            tags: [
              {
                name: "Typescript",
                color: "blue",
              },
              {
                name: "NestJS",
                color: "red",
              },
              {
                name: "OpenAI",
                color: "teal",
              },
            ],
          },
          {
            name: "M.A.D. Matt",
            description:
              "A chatbot version of myself, with all of my Notion knowledge",
            url: "https://mad-matt-ai.vercel.app/",
            github: "https://github.com/mattchw/mad-matt-ai",
            image: "MadMatt.png",
            tags: [
              {
                name: "Next.js",
                color: "gray",
              },
              {
                name: "OpenAI",
                color: "teal",
              },
              {
                name: "Pinecone",
                color: "blue",
              },
            ],
          },
          {
            name: "Smart Bank",
            description: "Backend web service for banking system using Go",
            url: "",
            github: "https://github.com/mattchw/smart-bank",
            image: "SmartBank.png",
            tags: [
              {
                name: "Go",
                color: "blue",
              },
              {
                name: "PostgreSQL",
                color: "blue",
              },
            ],
          },
          {
            name: "UKChat",
            description:
              "Slack-like React application with Firebase for Hongkongers to talk about UK topics in an organized way",
            image: "UKChat.png",
            url: "https://uk-chatroom.web.app/",
            github: "https://github.com/mattchw/UKChat",
            tags: [
              {
                name: "React",
                color: "blue",
              },
              {
                name: "Firebase",
                color: "orange",
              },
            ],
          },
          {
            name: "Killer Queue",
            description:
              "MERN stack application for shop/restaurant to organise queueing effectively",
            image: "KillerQueue.png",
            github: "https://github.com/mattchw/Killer-Queue",
            tags: [
              {
                name: "React",
                color: "blue",
              },
              {
                name: "MongoDB",
                color: "teal",
              },
            ],
          },
          {
            name: "Polipedia",
            description:
              "React/Redux web application with Spring Boot server showing political stances and background of celebrities in HK and US",
            image: "Polipedia.png",
            github: "https://github.com/mattchw/Polipedia",
            tags: [
              {
                name: "React",
                color: "blue",
              },
              {
                name: "Spring",
                color: "green",
              },
              {
                name: "PostgreSQL",
                color: "blue",
              },
            ],
          },
        ]}
        addSectionRef={addSectionRef}
        onVisibilityChange={handleVisibilityChange}
      />
      <Blog
        id="Blog"
        posts={data}
        addSectionRef={addSectionRef}
        onVisibilityChange={handleVisibilityChange}
      />
      <Contact
        id="Contact"
        info={{
          name: "Matt Wong",
          location: "United Kingdom",
          image: "/profilepic-about.svg",
          email: "matthew.chohin@gmail.com",
        }}
        socials={[
          {
            name: "GitHub",
            url: "https://github.com/mattchw",
          },
          {
            name: "LinkedIn",
            url: "https://linkedin.com/in/mattchw",
          },
        ]}
        addSectionRef={addSectionRef}
        onVisibilityChange={handleVisibilityChange}
      />
      <Footer />
    </>
  );
};

export default Home;
