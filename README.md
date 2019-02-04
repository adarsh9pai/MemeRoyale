# MemeRoyale: The Battle Royale of Memes - Winner 🏆, 1st Prize 🥇 and Best Mobile Project 📱 - HackSMU 2019

# Inspiration

The fact that there are no popular meme games out there was very heartbreaking for us meme-lovers. Hence, that acted as an inspiration for this project to serve all the meme lords out there!

# What it does

The app allows you to either create a new room or join an existing one created by someone else. The creator of the room gets to choose the meme template for the first round. After a template has been selected, the player gets to put the wittiest, punniest caption they can come up with for the given meme. Next, all the memes except their own are displayed on a voting screen. The meme with the highest vote wins the round and gets the opportunity to select the next template. The player with the highest vote points at the end of all rounds wins the game!

# Stack

Backend: Express + NodeJS, Socket.io - Amazon Lightsail (Backend has a separate repository)

Frontend: JavaScript + React Native, Expo toolchain

Database: MongoDB, MLab + AWS


# Completion Status

This was built during under 24 hours at HackSMU 2019, held at the Southern Methodist University. Although functional and fun, there are certainly improvements that can be made and bugs that can be fixed.

# How to run the code in this repository

To run this code, you'll need to sign the app up with Google and get an iOS and Android client ID. Then create a secret.js file in the src/ folder and enter the following code:
<pre><code>
export default clientID = {
    "ios":'Your iOS client ID',
    "android":'Your android client ID'
 }
</pre></code>
