// gitprofile.config.js

const config = {
  github: {
    username: 'babbaranish', // Your GitHub org/user name. (Required)
    sortBy: 'stars', // stars | updated
    limit: 20, // How many projects to display.
    exclude: {
      forks: false, // Forked projects will not be displayed if set to true.
      projects: ['babbaranish', 'test', 'protfolio_new'], // These projects will not be displayed. example: ['my-project1', 'my-project2']
    },
  },
  social: {
    linkedin: 'babbaranish',
    twitter: 'anish_____b',
    facebook: '',
    instagram: 'babbar_anish',
    dribbble: 'babbaranish',
    behance: '',
    medium: '',
    dev: 'babbaranish',
    stackoverflow: '11876783/babbaranish', // format: userid/username
    website: 'https://babbaranish.github.io',
    phone: '+91-95699-22968',
    email: 'anishbabbar1@gmail.com',
  },
  resume: {
    fileUrl: 'resume.pdf', // Empty fileUrl will hide the `Download Resume` button.
  },
  skills: [
    'HTML5',
    'CSS3',
    'JavaScript',
    'React.js',
    'Node.js',
    'React Native',
    'MySQL',
    'MongoDB',
    'Git',
    'Github',
    'Styled Components',
    'Redux',
    'Express.js',
    'Bootstrap',
  ],
  experiences: [
    {
      company: 'Infosys',
      position: 'Operation Executive',
      from: 'May 2021',
      to: 'Present',
      companyLink: 'https://infosys.com',
    },
  ],
  education: [
    {
      institution: 'DAV College',
      degree: 'Bachelor of Computer Applications',
      from: '2017',
      to: '2020',
    },
    {
      institution: 'Gov. Sen. Sec. School (Boys)',
      degree: 'Senior Secondary',
      from: '2016',
      to: '2017',
    },
    {
      institution: 'Swami Keshwanand Senior Secondary School',
      degree: 'Matriculation',
      from: '2014',
      to: '2015',
    },
  ],
  // Display blog posts from your medium or dev account. (Optional)
  blog: {
    source: '', // medium | dev
    username: '', // to hide blog section, keep it empty
    limit: 3, // How many posts to display. Max is 10.
  },
  googleAnalytics: {
    id: '', // GA3 tracking id/GA4 tag id UA-XXXXXXXXX-X | G-XXXXXXXXXX
  },
  // Track visitor interaction and behavior. https://www.hotjar.com
  hotjar: {
    id: '',
    snippetVersion: 6,
  },
  themeConfig: {
    defaultTheme: 'dracula',

    // Hides the switch in the navbar
    // Useful if you want to support a single color mode
    disableSwitch: false,

    // Should use the prefers-color-scheme media-query,
    // using user system preferences, instead of the hardcoded defaultTheme
    respectPrefersColorScheme: false,

    // Hide the ring in Profile picture
    hideAvatarRing: false,

    // Available themes. To remove any theme, exclude from here.
    themes: [
      'light',
      'dark',
      'cupcake',
      'bumblebee',
      'emerald',
      'corporate',
      'synthwave',
      'retro',
      'cyberpunk',
      'valentine',
      'halloween',
      'garden',
      'forest',
      'aqua',
      'lofi',
      'pastel',
      'fantasy',
      'wireframe',
      'black',
      'luxury',
      'dracula',
      'cmyk',
      'autumn',
      'business',
      'acid',
      'lemonade',
      'night',
      'coffee',
      'winter',
      'procyon',
    ],

    // Custom theme
    customTheme: {
      primary: '#fc055b',
      secondary: '#219aaf',
      accent: '#e8d03a',
      neutral: '#2A2730',
      'base-100': '#E3E3ED',
      '--rounded-box': '3rem',
      '--rounded-btn': '3rem',
    },
  },
};

export default config;
