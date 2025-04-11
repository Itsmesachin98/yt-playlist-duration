# 🎬 YouTube Playlist Duration

A lightweight Chrome Extension that automatically calculates the total duration of a YouTube playlist, so you know exactly how long your binge session is going to last. ⏳

---

## 🚀 Features

-   ✅ Automatically detects when you're on a YouTube playlist page
-   ⏱ Calculates the total duration of all visible videos
-   🔄 Recalculates when you scroll and more videos load
-   🧮 Displays total duration and number of videos in a beautiful floating banner
-   💡 Clean UI with subtle styling using Lato font

---

## 🛠 Installation

1. Download or clone this repository.

```bash
git clone https://github.com/Itsmesachin98/yt-playlist-duration.git
```

2. Open Chrome and navigate to `chrome://extensions/`
3. Enable **Developer mode** (top right corner)
4. Click **Load unpacked**
5. Select the root folder `Yt Playlist Duration`
6. Visit any YouTube playlist and see the magic happen! 🎉

---

## 📁 Folder Structure

```
Yt Playlist Duration/
├── content.js          # Main logic that runs on playlist pages
├── manifest.json       # Chrome extension configuration
├── styles.css          # Banner styling
└── README.md           # This file
```

---

## ⚙️ How It Works

-   The extension activates on YouTube playlist URLs (`*://www.youtube.com/playlist*`)
-   It scans for video duration elements
-   Parses and sums durations using JavaScript
-   Formats total time into HH:MM:SS
-   Appends a floating banner to the page showing:
    -   Total Playlist Duration
    -   Number of Videos Counted
-   Recalculates durations dynamically when user scrolls

---

## 🧠 Technologies Used

-   HTML5, CSS3
-   JavaScript (ES6)
-   Chrome Extension API (Manifest v3)

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 🙌 Acknowledgments

Big thanks to the amazing open-source community that makes building browser extensions so accessible and fun!
