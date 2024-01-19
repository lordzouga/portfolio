---
title: ALC Manager
description: A tool to manage ALC settings on Apex Legends
layout: article
---

::project
ALC Manager

#mainimage
![my image](/img/new_alcmanager.png)

#label
Introduction

#description
Due to the complexity of creating ALC (Advanced Look Controller) Settings in Apex Legends, it became necessary to have a tool that helps organize and manage the settings in a way that is accessible and intuitive for the user.
::

::project

#superlabel
Design

#label
Settings List

#subimage
![alc list](/img/alc_list.png)

#description
The web app was designed for mobile phone displays and desktops. The core focus on mobile was to promote one-handed usage so that users can easily swipe through their settings in-between matches.\
\
To achieve this, we decided to show the summary of each ALC setting in a “card” component and show only the most important parts of an ALC setting so that the user can get an overview of the content of the setting. The fonts sizes are  larger than default font size to promote readability while quickly scrolling through the different settings.\
\
The cards are shown vertically on mobile and displayed as a grid on desktop displays.
::

::project
#label
Setting Details

#description
On this page we show the full details of the settings being viewed. We show the setting values in form of a progress bar so that the user can easily see which option has higher values.\
\
On desktop displays we show the extra details of the settings in a column next to the settings in order to maximize usage of the bigger display.\
\
On mobile displays, the extra details are shown below the settings in a vertical layout. Settings are prioritized.
::