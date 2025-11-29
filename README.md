# EventBridge

EventBridge is a small full stack web app that connects event planners with people who want to attend their events. Planners can create and manage events, and seekers can browse, register, and talk to hosts.

The repo contains both the Laravel backend API and the React frontend built with Vite.

## Features

- User registration and login with hashed passwords and server side sessions
- Role based accounts  
  - Event planners create, edit, and delete events  
  - Event seekers browse and register for events
- Event management for planners  
  - Title, description, location, start and end time  
  - Option to mark events as private with a password  
  - View a list of attendees for each event
- Event discovery for seekers  
  - Events index with search by date, text query, and creator  
  - Event detail page with all metadata and registration button
- Social features  
  - Public comment thread on each event  
  - One to one private messaging between users
- Basic session awareness on the frontend so the UI changes depending on whether the user is logged in as a planner or seeker

## Tech stack

- Frontend  
  - React with Vite  
  - React Router for navigation  
  - Fetch based client for talking to the API (`src/api.js`)
- Backend  
  - Laravel (PHP)  
  - Session based authentication  
  - CSRF protection on state changing endpoints  
  - Eloquent models for users, events, registrations, event messages, and private messages
- Data  
  - Relational database configured through the Laravel `.env` file

## Project structure

```text
backend/   Laravel app and REST style API
frontend/  React single page app (Vite)

