
# MUIDS Homeroom Hub

![huddle-landing-page](https://i.ibb.co/D4y7yJ2/Screen-Shot-2567-08-28-at-01-27-32.png)



## Overview

The School Homeroom Hub is a mobile-friendly web platform designed to replace traditional PowerPoint slides used during homeroom. The website enables students to view daily announcements, schedules, and updates by scrolling through content as if they were on social media platforms like Instagram or Facebook. By offering a seamless and familiar user experience, the Homeroom Hub encourages engagement and ensures that students can stay updated efficiently through their smartphones. This project is built as a capstone project to meet G11's requirements. 


## Inspiration

The inspiration for this project came from the need to modernize how information is presented during homeroom sessions. PowerPoint slides can be outdated and static, often requiring students to focus on a large screen in front of the room. I wanted to create something dynamic and engaging, allowing students to access information on their personal devices, much like scrolling through their favorite social media platforms such as Instagram. This design not only increases accessibility but also enhances the overall experience by making it more interactive and intuitive.
## Tech Stack
- Frontend - NextJS, TypeScript, TailwindCSS
- Backend - NodeJS, NextAuth
- Database - MongoDB
- Hosting - Vercel
- Tools - Figma (Design)
## Challenge
One of the biggest challenges I faced during the development of the School Homeroom Hub was integrating the database with authentication using NextAuth. I aimed to implement role-based access control, ensuring that admins could add, edit, and delete content, while regular users could only view information. However, configuring NextAuth to handle role-based authentication was not as straightforward as expected.

NextAuth, while powerful, lacked the customizability I needed to easily implement these role distinctions. Managing user roles and restricting access to certain features based on permissions became a challenge. I had to find workarounds to customize the behavior and ensure that the right user had the appropriate level of access. This was an important aspect of ensuring the integrity and security of the platform.
## What could be improved

While the current iteration of the School Homeroom Hub successfully replaces PowerPoint slides and offers a user-friendly interface, there are several areas that could be improved in future versions:

- Push Notifications: Implement push notifications to ensure students never miss important updates.
- Admin Panel: Develop a user-friendly admin panel for teachers and staff to easily update announcements and schedules.
- Offline Mode: Create an offline mode for users to access content when they don't have an internet connection.
- Analytics: Add features that track student engagement and viewership to help improve content delivery.
- Mobile Application: Turn the whole website into an application that can be accessed even easier.
- Separate Backend: Implement a customizable system storing the logic of the page and authentication.
- Real-time update (SocketIO): Add features that users can chat with each other making the whole project elevated to a new level.
## Link
[Link](https://muids-homeroom-hub.vercel.app/) 

Test Username: test123

Test Password: test123
