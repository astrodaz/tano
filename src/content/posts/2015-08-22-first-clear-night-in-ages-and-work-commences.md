---
title: "First clear night in ages, and work commences!"
description: "Finally the calendar and clouds came together to give a clear night on a weekend to allow me to get some of the set up in the observatory done... I up"
date: "2015-08-22"
readTime: "6 min read"
image: "/assets/images/posts/default.jpg"
slug: "first-clear-night-in-ages-and-work-commences"
---

Finally the calendar and clouds came together to give a clear night on a weekend to allow me to get some of the set up in the observatory done...
I updated SGP, but PHD and the rest were OK, although a new version of [EQASCOM](http://eq-mod.sourceforge.net/) is available so I will do that at some point.
Next on the list was collimation of the RC. This is different process from other telescopes because of the two parabolic mirrors. I invested in the [Howie Glatter](http://www.firstlightoptics.com/howie-glatter-collimation-tools.html) tools some time ago and have been impressed by the level of engineering and accuracy! I also have the focuser collimating ring on my telescope to ensure that all the elements are as aligned as possible.
The basic process is this - assuming that the mirrors are located centrally in the tube:

1. Using the 1mm reticule, aim the laser at the do-nut on the secondary and aim to get as centered as possible, using the focuser collimater. The beam needs to fold back on itself, so it is possible that the do-nut is perfectly centered, or that the secondary is not perfectly centered. Use the do-nut as a guide and then tweak the collimating ring
2. Switch the reticule for the concentric circles one
3. Adjust the secondary so that the reflected rings are centered equally on the primary mirror
4. Adjust the primary so that the projected rings are centered around the secondary shadow

I will add some pictures to show these steps, but with a little practice, the process is quite easy.
As the scope had been sat for some time, I went back to the beginning and did the whole thing from scratch. The laser appeared to be off the center of the do-nut more than I remembered, so I will need to re-check this - but it was warm here last night (21st Aug), so it's entirely possible that the position will change as temperature drops off towards Autumn.
[caption id="attachment\_426" align="alignnone" width="300"][![Collimation of RC](https://darrenjehan.me.uk/astro/wp-content/uploads/2015/08/collimation_150821-300x188.png)](https://darrenjehan.me.uk/astro/wp-content/uploads/2015/08/collimation_150821.png) Collimation of RC[/caption]
This is the result! The red rings are a produced by a great utility called [Mire de Collimation](http://sweiller.free.fr/collimation.html) which super-imposing a configurable set of rings over your image. Genius!! You can see the de-focused star is concentric, and lines up very well with the red rings. The secondary shadow is pretty much dead-centre of the image as well. This is what we're looking for!
Next up is polar-alignment...

#### Polar Alignment with PHD2

This is something I have been meaning to do for ages, so having decided that I would give up a clear night to do all these sorts of tasks, I got on with it!
[PHD2](http://openphdguiding.org/) is another one of those tools that is astounding not only for it's functionality and usefulness, but it's free-ness as well! If they ever decided to charge for it, I'll among the first hitting the PayPal button!!
So, a read of the how-to shows it to be quite straightforward:

1. Slew to the right part of the sky
2. Hit the Drift button
3. Watch the trend line
4. Hit the Adjust button
5. Adjust the mount
6. Repeat 2 - 5 until the trend lines are horizontal

In practice, it wasn't much more difficult! So, here is what I did:

1. Run the tool and click SLEW to move the scope to the Western part of the sky, for Azimuth adjustment
2. I needed to calibrate PHD, so did that first
3. Clicked DRIFT and let it run for a few minutes to give the trend line a chance to stabilise
4. Moved the mount using the azimuth screws while watching the trend line
5. Looks OK, move to Altitude

Spot the difference? Yes, I didn't follow the instructions properly for Azimuth. The trouble is I didn't realise this until AFTER I had finished and was testing the guiding... :(
This image shows the trend lines after I had wrongly followed the process:
[caption id="attachment\_430" align="alignnone" width="300"][![Drift Align Result](https://darrenjehan.me.uk/astro/wp-content/uploads/2015/08/drift_align-300x228.png)](https://darrenjehan.me.uk/astro/wp-content/uploads/2015/08/drift_align.png) Drift Align Result[/caption]
You'll see that they both look pretty flat with a low RMS in guiding errors. However, when I started guiding with a 30 second test image, the DEC was not so good!
So, something is definitely out! Now I know what to do, it should not take long to do this next time out!

#### Finally, train the focuser in Sequence Generator Pro

Last task of the night was to get the auto-focuser working in SGP. This again was not as arduous a task as I was expecting, and after reading the manual, watching some useful YouTube vids from [The AstroImaging Channel](https://www.youtube.com/watch?v=bB84JS5Uefo) I set about the process.
First task was to pick a good bright star for using the Bahnitov mask on - I was close to Gamma Cass, so I used that. With the luminance filter in, I used the mask to achieve spot on focus. In the Control Panel of SGP, I selected the Focus tab, and Set Focus for Lum. This inserts the focus position in the database for that filter.
You then get the option to use this value for all the other filters - DO IT!!
Here's why... If you say no, the focus point value for the other filters stays at 0. Then, when you change filter, the focuser will zoom off back to zero! By setting all the filters to the same value as LUM, the focuser will just move a bit when you change filter...
So, the process is this:

1. Focus with LUM using a Bhatinov mask - or you chosen method to achieve a good focus
2. In Control Panel, select the Focus tab, and use the Set Focus For button
3. Say YES when asked if you want to set the other filters focus point values!
4. Move to the next filter
5. Focus with your mask
6. In Control Panel, use Set Focus for this new filter
7. Repeat 4-6 for your other filters

It took 10 minutes or so to get the values in, and now I have a set of values for the focuser for each filter.
Now, the clever part of SGP is that if the next time out the temperature is very different and the focus point is very different - SGP will use the values stored in an off-set from the starting point.
So, let's assume the original set of focus points are:

* LUM - 9400
* RED - 9420
* BLUE - 9380
* GREEN - 9440

But on this night, it's a bit colder, so now the LUM position is 9100, SGP will adjust the other values down by 300 so the off-set remains constant. Clever, eh?
OK, so this is theory - it's in the manual and in the vid above, so I will be very interested to see how this works!
 
So, a lot of the set up is now done, OK, I need to redo the drift alignment and really nail the guide settings for PHD, but other than that - we're good to go!
Now to find time to do some of the external work still needed!!