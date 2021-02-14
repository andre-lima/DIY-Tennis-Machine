# DIY TENNIS MACHINE

This is the code for the controls of my DIY Tennis Machine POC.

These folders are mostly POCs for the steps I'll need for the machine.

## Summary and Goals

I want to create an access point on the Raspberry Pi, so that will be able to connect to it from my phone and access a page served by a **Node.js** server inside  Rpi.

From the page, I'll be able to setup and control the tennis machine remotely.

Another goal is being able to control the speed of the machine's motors from the Rpi.

## Setting up access point so i can connect from a phone

https://www.raspberrypi.org/documentation/configuration/wireless/access-point-routed.md

Launch express server, connect to SSID from your phone and on the browser try this:
192.168.4.1:3000

## Game controller demo

Based on this: https://xaviergeerinck.com/post/coding/javascript/xbox-controller/
