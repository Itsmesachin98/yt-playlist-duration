// // Enables dragging functionality on a given HTML element
// const dragElement = (element) => {
//     // Variables to store mouse offset and initial positions
//     let offsetX = 0,
//         offsetY = 0,
//         startX = 0,
//         startY = 0;

//     // Called when mouse is pressed down on the element
//     const mouseDownHandler = (e) => {
//         e.preventDefault(); // Prevent default behavior like text selection
//         // Record the initial mouse position
//         startX = e.clientX;
//         startY = e.clientY;

//         // Listen for mouse movement and release
//         document.addEventListener("mousemove", mouseMoveHandler);
//         document.addEventListener("mouseup", mouseUpHandler);
//     };

//     // Called when mouse is moved after clicking
//     const mouseMoveHandler = (e) => {
//         // Calculate the distance moved from the initial position
//         offsetX = e.clientX - startX;
//         offsetY = e.clientY - startY;

//         // Update the element's position based on movement
//         element.style.top = element.offsetTop + offsetY + "px";
//         element.style.left = element.offsetLeft + offsetX + "px";

//         // Update starting point for next move event
//         startX = e.clientX;
//         startY = e.clientY;
//     };

//     // Called when mouse button is released
//     const mouseUpHandler = () => {
//         // Remove event listeners when drag ends
//         document.removeEventListener("mousemove", mouseMoveHandler);
//         document.removeEventListener("mouseup", mouseUpHandler);
//     };

//     // Start listening for mouse down on the element to initiate drag
//     element.addEventListener("mousedown", mouseDownHandler);
// };

let lastCountedVideos = 0;

// Creates and displays a banner on the page showing the total playlist duration and the number of videos.
// If a banner already exists, it removes the old one before creating a new one.
function createDurationBanner(formatted, videoCount) {
    if (document.getElementById("yt-duration-banner")) {
        document.getElementById("yt-duration-banner").remove();
    }

    const ytDurationBanner = document.createElement("div");
    ytDurationBanner.id = "yt-duration-banner";

    const totalDuration = document.createElement("p");
    totalDuration.id = "total-duration";
    totalDuration.innerHTML = `Total Playlist Duration: <span id="duration-value">${formatted}</span>`;

    const videosCounted = document.createElement("p");
    videosCounted.id = "videos-counted";
    videosCounted.innerHTML = `Videos Counted: <span id="videos-counted-value">${videoCount}</span>`;

    ytDurationBanner.appendChild(totalDuration);
    ytDurationBanner.appendChild(videosCounted);
    document.body.appendChild(ytDurationBanner);
}

// Converts a duration string (e.g., "1:23:45" or "12:34") into total seconds.
// The string is split into parts (hours, minutes, seconds), reversed for easier indexing,
// and then converted into seconds by multiplying appropriately.
function parseDuration(durationText) {
    const parts = durationText.split(":").map(Number).reverse(); // Split and reverse the duration string
    let seconds = 0;
    if (parts[0]) seconds += parts[0]; // Add seconds
    if (parts[1]) seconds += parts[1] * 60; // Add minutes converted to seconds
    if (parts[2]) seconds += parts[2] * 3600; // Add hours converted to seconds
    return seconds; // Return the total duration in seconds
}

// Converts a total duration in seconds into a formatted string (HH:MM:SS).
// Ensures that hours, minutes, and seconds are always two digits by padding with leading zeros.
function formatDuration(totalSeconds) {
    let hours = Math.floor(totalSeconds / 3600); // Calculate total hours
    let minutes = Math.floor((totalSeconds % 3600) / 60); // Calculate remaining minutes
    let seconds = totalSeconds % 60; // Calculate remaining seconds

    // Pad hours, minutes, and seconds with leading zeros if they are less than 10
    hours = hours < 10 ? "0" + hours : hours;
    minutes = minutes < 10 ? "0" + minutes : minutes;
    seconds = seconds < 10 ? "0" + seconds : seconds;

    // Return the formatted duration string
    return `${hours}:${minutes}:${seconds}`;
}

// Calculates the total duration of all videos in the playlist and updates the banner.
// It retrieves all video duration elements from the page, parses their durations,
// sums them up, formats the total duration, and displays it in a banner.
// If the number of videos hasn't changed since the last calculation, it skips recalculating.
function calculateTotalDuration() {
    const durationElements = document.querySelectorAll(
        "#text.style-scope.ytd-thumbnail-overlay-time-status-renderer"
    ); // Select all elements containing video durations

    if (durationElements.length === lastCountedVideos) return; // Skip if no new videos are loaded

    let total = 0;

    durationElements.forEach((el) => {
        const text = el.innerText.trim(); // Get the duration text and trim whitespace
        if (text.match(/\d+:\d+/)) {
            // Check if the text matches a valid duration format
            total += parseDuration(text); // Convert the duration to seconds and add to the total
        }
    });

    const formatted = formatDuration(total); // Format the total duration into HH:MM:SS
    lastCountedVideos = durationElements.length; // Update the count of videos processed
    createDurationBanner(formatted, durationElements.length); // Display the total duration and video count in a banner
}

// Monitors the user's scrolling activity and updates the total playlist duration.
// A timeout is used to detect when the user stops scrolling, and then the duration is recalculated.
// This prevents excessive calculations during continuous scrolling.
function monitorScrollAndUpdate() {
    let timeoutId = null;

    window.addEventListener("scroll", () => {
        if (timeoutId) clearTimeout(timeoutId); // Clear the previous timeout if scrolling continues
        timeoutId = setTimeout(() => {
            calculateTotalDuration(); // Recalculate the total duration after scrolling stops
        }, 1000); // Wait 1 second after scrolling stops before recalculating
    });
}

// Auto scrolls to the bottom to load all videos
// async function scrollToLoadAllVideos() {
//     return new Promise((resolve) => {
//         let lastScrollTop = -1;
//         let sameCount = 0;

//         const interval = setInterval(() => {
//             window.scrollBy(0, 5000);

//             const scrollTop =
//                 document.documentElement.scrollTop || document.body.scrollTop;
//             if (scrollTop === lastScrollTop) {
//                 sameCount++;
//             } else {
//                 sameCount = 0;
//                 lastScrollTop = scrollTop;
//             }

//             if (sameCount > 10) {
//                 clearInterval(interval);
//                 resolve();
//             }
//         }, 500);
//     });
// }

// Waits for the page to fully load, then calculates the total playlist duration and sets up scroll monitoring.
// A delay of 3 seconds is added to ensure all elements are loaded before calculations begin.
window.addEventListener("load", async () => {
    setTimeout(() => {
        calculateTotalDuration(); // Calculate the total duration of the playlist
        monitorScrollAndUpdate(); // Monitor scrolling to update the duration dynamically
    }, 3000); // Delay execution by 3 seconds to allow the page to load completely

    // await scrollToLoadAllVideos();
    // setTimeout(calculateTotalDuration, 1000); // Delay for page to fully load

    // setTimeout(() => {
    //     dragElement(document.getElementById("yt-duration-banner"));
    // }, 5000);
});
