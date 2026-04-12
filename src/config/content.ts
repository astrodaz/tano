import homeImage from "../assets/images/ic405.png";

export const siteConfig = {
  name: "The Alan Norman Observatory",
  title: "The Alan Norman Observatory",
  description: "Exploits and adventures in astronomy from rural Bedfordshire",
  social: {
    github: "",
    twitter: "",
    email: "",
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
    dark: homeImage
  },
  skills: [
    "Astrophotography",
    "Visual Observing",
    "Image Processing",
    "Public Outreach",
  ]
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
      image: "/assets/images/projects/project1.jpg",
      href: "#",
    },
    {
      title: "M31 - Andromeda Galaxy",
      description:
        "Mosaic project imaging the Andromeda Galaxy.",
      image: "/assets/images/projects/project2.jpg",
      href: "#",
    },
    {
      title: "M33 - Triangulum Galaxy",
      description:
        "The Triangulum Galaxy captured in LRGB.",
      image: "/assets/images/projects/project3.png",
      href: "#",
    },
  ],
};

export const imagerLinks = {
  meta: {
    title: "Imager Links",
    description: "Links to fellow imagers",
  },
  title: "Astro Imagers",
  imagers: [
    {
      name: "Pete Lawrence",
      link: "https://digitalsky.org.uk/"
    },
    {
      name: "Dave Eagle",
      link: "https://www.star-gazing.co.uk/WebPage/"
    },
    {
      name: "Tim Jardine",
      link: "https://app.astrobin.com/u/timjardine"
    },
  ],
};