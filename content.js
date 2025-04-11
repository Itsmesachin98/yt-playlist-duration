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
        ".badge-shape-wiz__text"
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

window.addEventListener("load", () => {
    setTimeout(calculateTotalDuration, 3000); // Delay for page to fully load
});
