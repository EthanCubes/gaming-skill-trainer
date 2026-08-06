# Gaming Skill Trainer
A web app with a variety of pages to help train gamers on various skills needed for effective gaming, including aim, reaction time, click speed, and even timing.

![Black Screen with several squares on it](screenshot/Screenshot_20260729_114653.png)

[Click Here to Try the Program](https://ethancubes.github.io/gaming-skill-trainer/)

## How to run locally
I don't know why you would need to run this locally but whatever I guess. 
1. Clone or download the Git repo from GitHub.
2. You need to have either 1) Visual Studio Code, with the Live Server extension installed OR 2) live server, installed with npm.

If you have Visual Studio Code:
1. Navigate to the extensions page and install Live Server by Ritwick Dey.
2. Open the project folder, right-click index.html, and select run with live server.

If you want to use npm (node package manager) and live server:
1. If you don't have npm, install it. Official website is [here](https://nodejs.org/), or you can use apt or homebrew or pacman or whatever the hell you use.
2. In the terminal, type `npm install -g live-server`
3. Run `live-server --port=5500` to start the server.
4. Navigate to `http://localhost:5500/`, where the pages will be hosted locally.

## How it works
A lot of JavaScript and CSS. Only vanilla JavaScript was used, no frameworks or anything. Majority of the stuff was done either by event listeners or set interval (apparently there's these things called animation frames that I could use but idk how to use them and am too lazy to change anything).

## Credits
- This [Stack Overflow question](https://stackoverflow.com/questions/8454510/open-url-in-same-window-and-in-same-tab) helped with opening the link in the same tab.
- This [Stack Overflow question](https://stackoverflow.com/questions/9419263/how-to-play-audio) helped with playing audio for the timer ringtone.
- [DeepSeek](deepseek.com) helped with debugging, as much as I don't want to admit it.
- The Focus trainer was inspired by [MindCap](https://youtube.com/mindcap./)'s 2.1 Extreme Demon megacollaboration called LIMBO. The name "focus" was inspired by the message that appears right before LIMBO's first drop. The movement of the "keys" is a direct copy of the ending of LIMBO, except that the ending of LIMBO was made in Geometry Dash before the addtion of any true random events and mine was made in JavaScript, which convieniently contains a Math.random() function that I still don't know how it works.
- The scoring system in the timing and precision trainer (not to be confused with the timer) is inspired by the rhythm game [osu!](https://osu.ppy.sh/). That's where the "Great", "Okay", and "Meh" come from. Originally, getting a great would give you 300 points, like in osu!, but since the timing trainer didn't nearly have the amount of changes to gain score, I had to change it to 150 to balance stuff out.
- The song that plays when the timer hits zero is "Sphere" by Creo. It is licensed under CC 4.0, which means that I am free to use it in any way I want as long as I give attribution to Creo and give a link to it's license, which will be [here](https://creativecommons.org/licenses/by/4.0/)
- [w3schools](https://w3schools.com/), [geeksForGeeks](https://geeksforgeeks.org/), and [MDN Web Docs](https://developer.mozilla.org/) all helped a lot with knowing what commands to use and what they do. As much as I've become used to coding in JavaScript, there's still a lot I don't know (or that I tend to forget). I've done 3 projects that are web apps now, and still I tend forget things that I should probably remember. In fact, I used so much w3schools and geeksForGeeks that a list of all the documentation pages I visited would probably be bigger than this README.
- I used the [Zeal Documentation Browser](https://zealdocs.org/) when I was offline and needed to search something up. To be honest, it's not the easiest experience using Zeal and I definitely prefer online documentation more, but it was a great help when offine.
- This program was written in [Visual Studio Code](https://code.visualstudio.com/) and [Vim](https://www.vim.org/). Even inside of VSCode, I was using the Vim extension. This is also my first time coding a project with Vim, and somehow I didn't struggle that much and now I'm addicted and definitely part of the Cult of Vi(M).
- The favicon was made in about 30 seconds in [Krita](https://krita.org/) and converted into an .ico file with [FFmpeg](https://ffmpeg.org/). Maybe just like renaming the file would've worked and maybe FFmpeg did nothing, but whatever. I guess you can call it low effort, but it's not like I can make it much better even if I tried.

