const dragElement = (element) => {
    let offsetX = 0,
        offsetY = 0,
        startX = 0,
        startY = 0;

    const mouseDownHandler = (e) => {
        e.preventDefault();
        startX = e.clientX;
        startY = e.clientY;

        document.addEventListener("mousemove", mouseMoveHandler);
        document.addEventListener("mouseup", mouseUpHandler);
    };

    const mouseMoveHandler = (e) => {
        offsetX = e.clientX - startX;
        offsetY = e.clientY - startY;

        element.style.top = element.offsetTop + offsetY + "px";
        element.style.left = element.offsetLeft + offsetX + "px";

        startX = e.clientX;
        startY = e.clientY;
    };

    const mouseUpHandler = () => {
        document.removeEventListener("mousemove", mouseMoveHandler);
        document.removeEventListener("mouseup", mouseUpHandler);
    };

    element.addEventListener("mousedown", mouseDownHandler);
};

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

function parseDuration(durationText) {
    const parts = durationText.split(":").map(Number).reverse();
    let seconds = 0;
    if (parts[0]) seconds += parts[0]; // seconds
    if (parts[1]) seconds += parts[1] * 60; // minutes
    if (parts[2]) seconds += parts[2] * 3600; // hours
    return seconds;
}

function formatDuration(totalSeconds) {
    let hours = Math.floor(totalSeconds / 3600);
    let minutes = Math.floor((totalSeconds % 3600) / 60);
    let seconds = totalSeconds % 60;

    hours = hours < 10 ? "0" + hours : hours;
    minutes = minutes < 10 ? "0" + minutes : minutes;
    seconds = seconds < 10 ? "0" + seconds : seconds;

    return `${hours}:${minutes}:${seconds}`;
}

function calculateTotalDuration() {
    const durationElements = document.querySelectorAll(
        "#text.style-scope.ytd-thumbnail-overlay-time-status-renderer"
    );

    let total = 0;

    durationElements.forEach((el) => {
        const text = el.innerText.trim();
        if (text.match(/\d+:\d+/)) {
            total += parseDuration(text);
        }
    });

    const formatted = formatDuration(total);

    // Use the new function to create and append the banner
    createDurationBanner(formatted, durationElements.length);
}

// Auto scrolls to the bottom to load all videos
async function scrollToLoadAllVideos() {
    return new Promise((resolve) => {
        let lastScrollTop = -1;
        let sameCount = 0;

        const interval = setInterval(() => {
            window.scrollBy(0, 5000);

            const scrollTop =
                document.documentElement.scrollTop || document.body.scrollTop;
            if (scrollTop === lastScrollTop) {
                sameCount++;
            } else {
                sameCount = 0;
                lastScrollTop = scrollTop;
            }

            if (sameCount > 10) {
                clearInterval(interval);
                resolve();
            }
        }, 500);
    });
}

window.addEventListener("load", async () => {
    await scrollToLoadAllVideos();
    setTimeout(calculateTotalDuration, 1000); // Delay for page to fully load
    setTimeout(() => {
        dragElement(document.getElementById("yt-duration-banner"));
    }, 3000); // Delay for page to fully load
});
