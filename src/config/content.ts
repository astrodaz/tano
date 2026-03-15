export const siteConfig = {
  name: "The Alan Norman Observatory",
  title: "The Alan Norman Observatory",
  description: "Exploits and adventures in astronomy from rural Bedfordshire",
  social: {
    github: "",
    twitter: "",
    email: "mailto:darren@darrenjehan.me.uk",
  },
};

export const homeContent = {
  title: "The Alan Norman Observatory",
  buttons: {
    about: {
      text: "The Observatory",
      href: "/about/",
    },
    posts: {
      text: "Read the Blog",
      href: "/posts/",
    },
  },
  images: {
    light: "/assets/images/IC405.png",
    dark: "/assets/images/IC405.png",
  },
};

export const aboutContent = {
  meta: {
    title: "The Observatory - The Alan Norman Observatory",
    description: "About the Alan Norman Observatory and its equipment",
  },
  title: "The Observatory",
  description:
    "Based in rural Bedfordshire, the Alan Norman Observatory is a personal observatory dedicated to amateur astronomy and astrophotography.",
  skills: [
    "Astrophotography",
    "Visual Observing",
    "Image Processing",
    "Public Outreach",
  ],
  image: {
    src: "/assets/images/about/observatory.jpg",
    alt: "The Alan Norman Observatory",
  },
  experience: {
    title: "Memberships & Involvement",
    items: [
      {
        period: "Current",
        position: "Administrator",
        company: "Stargazers Lounge",
        description:
          "One of the admin team on one of the world's largest amateur astronomy forums.",
      },
      {
        period: "Current",
        position: "Active Member",
        company: "Bedford Astronomical Society",
        description:
          "Regular member and participant in outreach events and public observing sessions.",
      },
      {
        period: "Current",
        position: "Active Member",
        company: "Letchworth and District Astronomical Society",
        description:
          "Active member of LDAS, enjoying bringing astronomy to the public.",
      },
    ],
  },
  connect: {
    title: "Get in Touch",
    description:
      "Feel free to reach out if you have any questions about astronomy or astrophotography. You can also find me on Stargazers Lounge or drop me an",
    email: {
      text: "email",
      href: "mailto:darren@darrenjehan.me.uk",
    },
  },
};

export const projectsContent = {
  meta: {
    title: "Images - The Alan Norman Observatory",
    description: "Astrophotography images from the Alan Norman Observatory",
  },
  title: "Astrophotography Images",
  description:
    "A selection of astrophotography images captured from the Alan Norman Observatory in rural Bedfordshire.",
  projects: [
    {
      title: "IC405 - Flaming Star Nebula",
      description:
        "The Flaming Star Nebula in Auriga, captured in RGB.",
      image: "/assets/images/projects/ic405.jpg",
      href: "#",
    },
    {
      title: "M31 - Andromeda Galaxy",
      description:
        "Mosaic project imaging the Andromeda Galaxy.",
      image: "/assets/images/projects/m31.jpg",
      href: "#",
    },
    {
      title: "M33 - Triangulum Galaxy",
      description:
        "The Triangulum Galaxy captured in LRGB.",
      image: "/assets/images/projects/m33.jpg",
      href: "#",
    },
  ],
};