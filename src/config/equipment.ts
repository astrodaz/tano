export const equipmentContent = {
  meta: {
    title: "The Observatory - Equipment",
    description: "About the Alan Norman Observatory and its equipment",
  },
  title: "The Alan Norman Observatory (TANO)",
  description:
    "Based in rural Bedfordshire, the Alan Norman Observatory is a personal observatory dedicated to amateur astronomy and astrophotography.",
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
  hardware: {
    title: "Hardware",
    items: [
      {
        name: "ASI Air Plus",
        author: "ZWO",
        description: "Acquisition, guiding, focusing",
        link: "https://www.firstlightoptics.com/zwo-accessories/zwo-asiair-plus-256g-wireless-astrophotography-controller.html"        
      }
    ]
  },
  software: {
    title: "Software",
    items: [
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