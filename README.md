# Project 2 | Travelist

<br>

<details>
   <h2>Description</h2>

Travelist is an application that allows travelers around the world not only to explore new destinations, but also to create and share travel guides! Discover new itineraries has never been so easy!

  <br>
  <hr>

</details>

## Main functionalities

First time in https://travelist-lqqc.onrender.com? No worries, it will be very easy and comfortable for you to:

- Sign up / Log in
- Once your profile is created, update your details and upload a profile picture
- Explore all the posts created by other users and access to their details
- Create a new post, including the details of your itinerary
- Delete a post
- Copy/paste the url of a post to share with your friends 🙊

<br>

## Backlog

We were ambitious, and our backlog was... BIG. Luckily enough, we were able to deliver our MVP and some backlog items are ready for future releases...

As nice-to-haves, we can consider:

- Search by Country functionality
- Posts can only be updated by their authors
- Read only user profiles to meet new people
- Ability to comment posts for logged in users
- Redirect users to current page after log in (and not always to the same page)
- ...

<br>

## Project structure

- Models

  - Comment (but we didn't implemented them finally)
  - Country
  - Day
  - Post
  - User

- Views

  - auth
    - login
    - signup
  - days
    - day-edit
  - posts
    - post-create
    - post-edit
    - post-list
    - post-view
  - users
    - user-edit
    - user-profile
  - error
  - index
  - layout
  - not-found

- Routes

  - auth
  - day
  - index
  - post
  - user

- Seeds

  - countries

- Middleware

  - route-guard

- Public

  - images
  - js
  - stylesheets

## The team

- Omayma Elhadari
- Brice Cabioch

## Links

- [Github](https://github.com/Bricebrice/Project-2-Travelist/tree/main)
- [Travelist url](https://travelist-lqqc.onrender.com/)

<br>
