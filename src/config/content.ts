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
    light: "../assets/images/gallery/ic405.png",
    dark: "../assets/images/gallery/ic405.png",
  },
  skills: [
    "Astrophotography",
    "Visual Observing",
    "Image Processing",
    "Public Outreach",
  ]
};

export const constructContent = {
  meta: {
    title: "The Observatory - Construction Gallery",
    description: "About the Alan Norman Observatory and its equipment",
  },
  title: "Construction Gallery",
  description:
    "Based in rural Bedfordshire, the Alan Norman Observatory is a personal observatory dedicated to amateur astronomy and astrophotography.",
};

export const aboutContent = {
  meta: {
    title: "The Observatory - The Alan Norman Observatory",
    description: "About the Alan Norman Observatory and its equipment",
  },
  title: "The Alan Norman Observatory (TANO)",
  description:
    "Based in rural Bedfordshire, the Alan Norman Observatory is a personal observatory dedicated to amateur astronomy and astrophotography.",
  skills: [
    "Astrophotography",
    "Visual Observing",
    "Image Processing",
    "Public Outreach",
  ],
  image: {
    src: "../../assets/images/about/new_tano.jpg",
    alt: "The Alan Norman Observatory",
  },
}

export const equipmentContent = {
  meta: {
    title: "The Observatory - Equipment",
    description: "About the Alan Norman Observatory and its equipment",
  },
  title: "The Alan Norman Observatory (TANO)",
  description:
    "Based in rural Bedfordshire, the Alan Norman Observatory is a personal observatory dedicated to amateur astronomy and astrophotography.",
  experience1: {
    title: "Telescopes & Mounts",
    items: [
      {
        type: "Telescope",
        make: "Sky-Watcher Esprit ED Triplet",
        fratio: "f/5.5",
        aperture: "100mm",
        description:
          "The imaging workhorse in my set up. A triplet APO giving a mid0-range wide-field of view. Paired with the HEQ5, is great for travellig round the UK to dark sites and star-parties.",
      }
    ]    
  },
  experience: {
    title: "Telescopes & Mounts",
    items: [
      {
        type: "Telescope",
        make: "Sky-Watcher Esprit ED Triplet",
        fratio: "f/5.5",
        aperture: "100mm",
        description:
          "The imaging workhorse in my set up. A triplet APO giving a mid0-range wide-field of view. Paired with the HEQ5, is great for travellig round the UK to dark sites and star-parties.",
      },
      {
        type: "Telescope",
        make: "GSO Ritchey Cretien",
        fratio: "f/8",
        aperture: "200mm",
        description:
          "This is based in the observatory, and despite being owned for close to 3 years, has not had much to do! It's paired with a ZWO ASI533MC Pro on an AZ-EQ6, and gives a great field of view for smaller targets.",
      },
      {
        type: "Telescope",
        make: "Revelation Dobsonian",
        fratio: "f/5",
        aperture: "350mm",
        description:
          "The latest addition, so I can do some observing while the camera's do their bit!",
      },
      {
        type: "Mount",
        make: "Sky-Watcher",
        fratio: "GEM",
        aperture: "AZ-AQ6",
        description:
          "The observatory mount, currently working with thge RC8",
      },      
      {
        type: "Mount",
        make: "Sky-Watcher",
        fratio: "GEM",
        aperture: "HEQ5 Pro ",
        description:
          "This a great workhorse for going to star-parties and local dark sites. Upgraded with the Rowan belt-mod.",
      },       
    ],
  },
  software: {
    title: "Software",
    items: [
      {
        name: "ASI Air Plus",
        author: "ZWO",
        description: "Acquisition, guiding, focusing",
        link: "https://www.firstlightoptics.com/zwo-accessories/zwo-asiair-plus-256g-wireless-astrophotography-controller.html"
      },
      {
        name: "Pixinsight",
        author: "Pleiades Astrophoto S.L.",
        description: "Stacking, calibration, processing",
        link: "https://pixinsight.com/"
      },
    ]
  },
  camera: {
    title: "Cameras",
    items: [
      {
        make: "ZWO",
        model: "ASI 533MC Pro",
        description: "OSC paired with the RC",
        link: "https://www.firstlightoptics.com/zwo-cameras/zwo-asi-533mc-pro-usb-30-cooled-colour-camera.html",
        image: "/assets/images/equipment/asi533mcpro.jpg"
      },
      {
        make: "ZWO",
        model: "ASI 2600MM",
        description: "Mono version, used with filters on the Esprit",
        link: "https://www.firstlightoptics.com/zwo-cameras/zwo-asi-2600mm-p25-usb-30-cooled-mono-camera.html",
        image: "/assets/images/equipment/asi2600mm.jpg"
      },
    ],
  },
};

export const Automation2022Content = {
  meta: {
    title: "2022 Automation Project",
    description: "About the original project to automate the observatory",
  },
  title: "The 2022 Automation Project",
  description:
    "",
  skills: [
    "Dragonfly Controller",
    "Gate Motor",
    "Automation",
    "Mains Power",
  ],
  image: {
    src: "/assets/images/observatory/df.jpeg",
    alt: "Dragonfly controller",
  },
  experience: {
    title: "Telescopes & Mounts",
    items: [
      {
        type: "Telescope",
        make: "Sky-Watcher Esprit ED Triplet",
        fratio: "f/5.5",
        aperture: "100mm",
        description:
          "The imaging workhorse in my set up. A triplet APO giving a mid0-range wide-field of view. Paired with the HEQ5, is great for travellig round the UK to dark sites and star-parties.",
      },
      {
        type: "Telescope",
        make: "GSO Ritchey Cretien",
        fratio: "f/8",
        aperture: "200mm",
        description:
          "This is based in the observatory, and despite being owned for close to 3 years, has not had much to do! It's paired with a ZWO ASI533MC Pro on an AZ-EQ6, and gives a great field of view for smaller targets.",
      },
      {
        type: "Telescope",
        make: "Revelation Dobsonian",
        fratio: "f/5",
        aperture: "350mm",
        description:
          "The latest addition, so I can do some observing while the camera's do their bit!",
      },
      {
        type: "Mount",
        make: "Sky-Watcher",
        fratio: "AZ-EQ6",
        aperture: "",
        description:
          "The observatory mount, currently working with thge RC8",
      },      
      {
        type: "Mount",
        make: "Sky-Watcher",
        fratio: "HEQ5 Pro",
        aperture: "",
        description:
          "This a great workhorse for going to star-parties and local dark sites. Upgraded with the Rowan belt-mod.",
      },       
    ],
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