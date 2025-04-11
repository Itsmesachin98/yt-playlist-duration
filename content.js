function parseDuration(durationText) {
    const parts = durationText.split(":").map(Number).reverse();
    let seconds = 0;
    if (parts[0]) seconds += parts[0]; // seconds
    if (parts[1]) seconds += parts[1] * 60; // minutes
    if (parts[2]) seconds += parts[2] * 3600; // hours
    return seconds;
}

function formatDuration(totalSeconds) {
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    return `${hours}h ${minutes}m ${seconds}s`;
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

    if (document.getElementById("yt-duration-banner")) {
        document.getElementById("yt-duration-banner").remove();
    }

    const display = document.createElement("div");
    display.id = "yt-duration-banner";
    display.innerText = `Total Playlist Duration: ${formatted}`;
    document.body.appendChild(display);
}

window.addEventListener("load", () => {
    setTimeout(calculateTotalDuration, 3000); // Delay for page to fully load
});
