---
title: "IC405 - Flaming Star - January 2022"
description: "siteorigin\_widget class='WP\_Widget\_Custom\_HTML'/siteorigin\_widget  siteorigin\_widget class='SiteOrigin\_Widget\_Image\_Widget'/siteorigin\_widge"
date: "2022-01-13"
readTime: "1 min read"
image: "/assets/images/posts/IC405.png"
slug: "ic405-flaming-star-january-2022"
---

## The Flaming Star Nebula, IC405, SH2-229, C31

Captured over the two nights of 5th and 6th Jan, this is IC405 - the Flaming Star nebula.

The bright star AE Aurigae at the centre illuminates the gas cloud, causing it to shine in a variety of wavelengths. Also known as SH2-229 and Cauldwell 31, it is an emmission and reflection nebula and lies approximately 1,500 light years from Earth and spans approximately 5 light years.</p>

### Technical Data:
- Image Centre RA:05h 16m 13.766s (79.05735832148871)
- Image Centre Dec:+34° 33m 15.35s (34.5542626962165)
- Date: 2022-01-04 & 2022-01-06
- Image Scale: 1.40 arcsec/pixel
 
### Hardware:
- Scope:Skywatcher Esprit 100ED
- Focus:SharpSky Pro
- Mount: Skywatcher AZ-EQ6
- Camera: ZWO ASI533MC Pro, Gain: 76, Temperature: -20
- Guiding: ZWO ASI120Mini, ZWO OAG, PHD2 at 2seconds


### Acquisition: SGPro
- 76 x 600 second exposures, 72 in final stack
### Processing:Pixinsight:
- WBPP for calibration, CostemticCorrection, Alignment
- NSG for gradient simplification
- DBE for background flattening
- StarNet for processing the nebula, 
- Blend script for recombining
- Unsharp Mask, TGVDeNoise, Curves


### Notes:

The image was fully calibrated with matching darks, flat-fielded and the flats were calibrated with matching flat-darks. WBPP was set to produce individual colour channels, aligned in each channel, which then allowed me to run the NSG script against each set before finally using ImageIntegration to produce the three colour master light frames.

I'm reasonably happy with this image - I used new-to-me processes for this, notably the StarNet process and Blend Script, but working through the excellent videos from <a href="https://adamblockstudios.com/" target="_blank">Adam Block</a>, I was able to do a pretty good job. More experimentation is needed to really get these two down is definiteky required. The chromatic noise is probably more than I would like and I think I pushed the back point a little too far, so I think this object deserves a revisit.

What I will probably do is shoot some Ha data and add this in, and then work through processing out the noise at that stage, rather than go back and redo the processing now...


<a href="/assets/images/posts/IC405.png" class="glightbox" data-glightbox="title: IC405 - Flaming Star Nebula">
  <img src="/assets/images/posts/IC405.png" alt="IC405 - Flaming Star Nebula" class="w-full rounded-xl cursor-pointer hover:opacity-80 transition-opacity" />
</a>