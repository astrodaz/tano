import tanoImage from "../assets/images/new_tano.jpg"

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
    src: tanoImage,
    alt: "The Alan Norman Observatory",
  },
}