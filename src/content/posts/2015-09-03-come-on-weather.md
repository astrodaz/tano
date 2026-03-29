---
title: "Come on weather...."
description: "Still not managed to get out and complete the polar alignment in the observatory - the weather has been it's usual August pants! More cloud and rain t"
date: "2015-09-03"
readTime: "2 min read"
image: "/assets/images/posts/default.jpg"
slug: "come-on-weather"
---

Still not managed to get out and complete the polar alignment in the observatory - the weather has been it's usual August pants! More cloud and rain than you could shake a stick at for the last few weeks, and the coming week shows a partial potential for Sunday 6th.

#### AAG Cloudwatcher

So, in the meantime I have been trying to set up my [AAG Cloudwatcher](http://tienda.lunatico.es/AAG-CloudWatcher-cloud-detector-1) - with limited success. The device monitors cloud coverage, rain, brightness and with an optional anemometer, the windspeed, and determines if the conditions are safe or unsafe. It has a relay built-in so (for example) unsafe conditions could cause the observatory roof to close and park the mount etc.
The limited success is down to the USB-Serial connection on the observatory computer. I have a Lindy cable which has a Prolific ship-set in it, but despite all attempts, the device does not respond to the software. I tested this with an older computer that has a built-in serial port and the device responds perfectly, so it's definitely an issue with the cable, or the driver.  I have tried updating the driver and also reverting to an older version (3.2.0.0) but no joy.
I am still testing, but I am sure I had this working before I installed the device to it's final location - hope my memory is not playing tricks on me - but hopefully it will be a simple solution to use a different USB to Serial cable.
Steve Richards from [The Chanctonbury Observatory](http://www.nightskyimages.co.uk/) made an observation that it could be the voltage swing difference between a USB cable and a 'real' serial port. Rigging up a test harness is easy enough - but I think I'd need an oscilloscope to measure the waves. Could be a fun thing to do...!

#### Image Analysis

One of the clever guys at [SGL](http://stargazerslounge.com/topic/249010-new-software-astrophotography-lab/) has written a piece of software to measure images and report all sorts of useful information. The software is called [Astrophotography Lab](http://oaltais.github.io/aplab/index.html) and looks to be very useful.
As all imagers know, the quality of the data is paramount - the better the data, the less you have to do to it! So it strikes me as sensible to use a tool that tells me things like:

* Ideal exposure time
* Skyglow readings
* Gain and read-noise

Then I can adjust the imaging train, or camera settings, to get the best possible data.
I'll keep a record of how this goes and will update accordingly