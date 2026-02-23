import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

const config: Config = {
  title: '이하은',
  tagline: '컴퓨터공학과 정보보안을 공부하는 학생',
  favicon: 'img/favicon.svg',
  future: {
    v4: true,
  },
  url: 'https://izzru.github.io',
  baseUrl: '/',

  organizationName: 'izzru',
  projectName: 'haeun',

  onBrokenLinks: 'warn',
  onBrokenMarkdownLinks: 'warn',

  i18n: {
    defaultLocale: 'ko',
    locales: ['ko', 'en'],
  },

  stylesheets: [
    'https://cdn.jsdelivr.net/gh/orioncactus/pretendard/dist/web/static/pretendard.css',
  ],

  presets: [
    [
      'classic',
      {
        docs: {
          path: 'project',
          sidebarPath: './sidebars.ts',
          routeBasePath: 'project',
        },
        blog: {
          showReadingTime: true,
          feedOptions: {
            type: ['rss', 'atom'],
            xslt: true,
          },
          onInlineTags: 'warn',
          onInlineAuthors: 'warn',
          onUntruncatedBlogPosts: 'warn',
        },
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    image: 'img/favicon.svg',
    colorMode: {
      defaultMode: 'light',
      disableSwitch: false,
      respectPrefersColorScheme: true,
    },
    navbar: {
      title: '이하은',
      logo: {
        alt: '이하은 포트폴리오',
        src: 'img/favicon.svg',
      },
      items: [
        {
          type: 'docSidebar',
          sidebarId: 'tutorialSidebar',
          position: 'left',
          label: 'Project',
        },
        {to: '/blog', label: 'Blog', position: 'left'},
        {
          href: 'https://github.com/izzru',
          label: 'GitHub',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'light',
      links: [
        {
          title: 'Navigate',
          items: [
            {label: 'Home', to: '/'},
            {label: 'Blog', to: '/blog'},
            {label: 'Project', to: '/project/done/portfolio-website'},
          ],
        },
        {
          title: 'Connect',
          items: [
            {label: 'GitHub', href: 'https://github.com/izzru'},
            {label: 'Email', href: 'mailto:haeun@example.com'},
          ],
        },
      ],
      copyright: `Copyright \u00A9 ${new Date().getFullYear()} 이하은. Built with Docusaurus.`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
