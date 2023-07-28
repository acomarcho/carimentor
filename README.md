# Promotional banner

<img width="1842" alt="carimentor-banner" src="https://github.com/acomarcho/carimentor/assets/29671825/0a84545b-6896-4ac1-867c-46a0587607af">

Garudahacks 4.0 runner up of the youth track. Visit our devpost at [here!](https://devpost.com/software/carimentor)

You can visit our application via [this link](https://carimentor.marchotridyo.com)

# CariMentor

This project is based on a challenge a lot of us face in this very rapid, developing world: how to cope with the sheer pressure of having to keep up with things. As an example, if you’re a web developer, it’s becoming quite a meme where every day, a new JavaScript framework is born. If you position yourself as a new web developer, being faced with this will obviously put you off in learning as you’ll be overwhelmed before you even start.

Continuing the web developer example, in this case, there are many resources available on the internet that can guide you to learn web development so you don’t get too overwhelmed. But this lacks real-time human interaction: you don’t get to ask questions and get feedback instantaneously, and it’s easy for you to get sidetracked when you learn all by yourself.

This project aims to help people who are in need of mentors (mentees) in the goals that they are pursuing. By providing them with a community where they can connect with mentors, we hope that even in this fast-paced world, people can still find peace and ease to learn and pursue everything they’ve dreamt of before.

Alongside all of that, we too want to provide a community where professionals can fulfill their needs of self-actualization by sharing what they have learned over the years in the hope to be able to help the younger generation become a better version of themselves. We believe that our solution is a good solution to fulfill both needs: a need for guidance from mentees, and a need for self-actualization from mentors.

# How it's made

We built this application with a separate backend and frontend. The backend itself is written in Express with a PostgreSQL database. For speed development purposes, we chose to use Prisma as our ORM to simplify things like migration and seedings as in hackathons we find that we might change our requirements/technical designs very frequently. We also use Swagger as an API documentation tool so there won’t be too many communications between the frontend team and the backend team.

The frontend of this application is made using Next due to several reasons, particularly due to the built-in routing and built-in optimizations such as for images and loading fonts from Google Fonts. When building the styles, we use both Tailwind for creating our custom components and Mantine for premade components. Having Mantine as a part of our design system also helps our designer when using Figma as there already exists a UI kit based on Mantine. We also tried to use better ways of fetching data such as using useSWR (stale-while-revalidate) where you can cache requests instead of fetching everything inside useEffect.

We don’t have an object storage service to use, so for storing images (user profiles), we chose to use a third-party image hosting site, that is ImgBB.

For stricter development rules and better efficiency in teamwork, as both the backend and frontend are made in JavaScript, we decided to use TypeScript as the main language for both of them. We also use strict and separated folder directories convention to reduce the possibility of a merge conflict.

**This is the frontend repository. I did not participate in creating the backend**
