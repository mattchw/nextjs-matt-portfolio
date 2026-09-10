import Image from "next/image";
import styles from "./BusinessCard.module.css";
import SocialNetwork from "./SocialNetwork/SocialNetwork";
import { IconMapPin, IconMail, IconUser } from "@tabler/icons-react";

export interface Props {
  name: string;
  image?: string;
  location: string;
  email: string;
  networks?: {
    name: string;
    url: string;
  }[];
}

const BusinessCard: React.FC<Props> = ({
  name,
  image,
  location,
  email,
  networks,
}) => {
  return (
    <div className={styles.card}>
      <div className={styles.additional}>
        <div className={styles.cardContainer}>
          {image ? (
            <div className={styles.circle}>
              <Image
                src={image}
                alt={name}
                width={120}
                height={120}
                className={styles.circleImage}
              />
            </div>
          ) : null}
          <div className={styles.cardName}>
            <IconUser size={20} />
            <span>{name}</span>
          </div>
        </div>
      </div>
      <div className={styles.general}>
        <div className={styles.cardContainer}>
          <div className={styles.location}>
            <IconMapPin size={20} />
            <p>{location}</p>
          </div>
          <a className={styles.email} href={`mailto:${email}`}>
            <IconMail size={20} />
            <span>{email}</span>
          </a>
        </div>
        <ul className={styles.socialLinks}>
          {networks?.map((network) => (
            <li key={network.name}>
              <a
                href={network.url}
                target="_blank"
                rel="noreferrer"
                aria-label={network.name}
              >
                <SocialNetwork name={network.name} size={24} />
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default BusinessCard;
