import type {ReactNode} from 'react';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import styles from './index.module.css';

import Callout from '../components/Callout/Callout';
import Toggle from '../components/Toggle/Toggle';
import Quote from '../components/Quote/Quote';
import Database from '../components/Database/Database';
import ProfileHero from '../components/ProfileHero/ProfileHero';
import SkillBadge from '../components/SkillBadge/SkillBadge';
import SkillGrid from '../components/SkillGrid/SkillGrid';
import Divider from '../components/Divider/Divider';

import homeData from '../data/homeData.json';

function computeStatus(endDate: string): string {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const end = new Date(endDate);
  return end >= today ? 'In Progress' : 'Done';
}

export default function Home(): ReactNode {
  const {siteConfig} = useDocusaurusContext();

  const projects = homeData.projects.map(p => ({
    ...p,
    status: computeStatus(p.endDate),
  }));

  return (
    <Layout
      title="Portfolio"
      description="이하은의 개발 포트폴리오"
    >
      <ProfileHero
        avatarUrl={homeData.profile.avatarUrl}
        name={homeData.profile.name}
        subtitle={homeData.profile.subtitle}
        tagline={homeData.profile.tagline}
      />

      <div className={styles.pageContent}>
        {/* About Me */}
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>👋 About Me</h2>
          <Callout
            icon={homeData.about.callout.icon}
            title={homeData.about.callout.title}
            description={homeData.about.callout.description}
          />
          <Toggle title="더 알아보기">
            <p>{homeData.about.details}</p>
          </Toggle>
        </section>

        <Divider />

        {/* Tech Stack */}
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>🛠️ Tech Stack</h2>
          {homeData.skills.map(group => (
            <SkillGrid key={group.category} title={group.category}>
              {group.items.map(skill => (
                <SkillBadge
                  key={skill.label}
                  icon={skill.icon}
                  label={skill.label}
                  href={skill.href}
                />
              ))}
            </SkillGrid>
          ))}
        </section>

        <Divider />

        {/* Projects */}
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>📂 Projects</h2>
          <Database
            icon="💻"
            title="프로젝트"
            viewOptions={['갤러리', '테이블', '보드', '타임라인', '리스트', '캘린더']}
            initialView="갤러리"
            meetings={projects}
          />
        </section>

        <Divider />

        {/* Quote */}
        <section className={styles.section}>
          <Quote
            text={homeData.quote.text}
            author={homeData.quote.author}
          />
        </section>

        <Divider />

        {/* Contact */}
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>📬 Contact</h2>
          <Callout
            icon={homeData.contact.callout.icon}
            title={homeData.contact.callout.title}
            description={homeData.contact.callout.description}
          />
          <div className={styles.contactLinks}>
            {homeData.contact.links.map(link => (
              <a
                key={link.label}
                href={link.href}
                className={styles.contactLink}
                {...(link.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
              >
                {link.icon} {link.label}
              </a>
            ))}
          </div>
        </section>
      </div>
    </Layout>
  );
}
