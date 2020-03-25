# Music Sniper

Collaborate on music projects with your friends.

This repo is for the frontend, here's the [backend repo](https://github.com/mickmister/music-sniper-rails). You will need to run the backend to be able to use the app.

# Setup

1. Clone/fork this repo

2. Install node
https://nodejs.org/en

3. In the directory of this project, run `npm install`

4. Run `npm start`

5. Visit http://localhost:1234 to access the UI.

You can create a `.env` file to configure some values. Copy `.env.sample` to `.env` and change:
- base URL for the backend
- asset host for serving frontend files (for CDN)
- Google Auth Client ID to enable logging in with Google

# Features

- Signup with email or Google. You can enter whatever you want for the email, even "Hoopity Boo".
- Upload audio file
- Upload profile picture
- Comment on files

Playback:
- Play using HTML5 audio player
- Play using Howler.js:
    - Create a clip with the clip editor. Press the play button next to the clip name to play the clip.
    - Or enter a timestamp like `3:04` within a comment, submit the comment, then click the timestamp to create an adhoc clip that seeks to that point in the file.
