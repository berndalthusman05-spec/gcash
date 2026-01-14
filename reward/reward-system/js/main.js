document.addEventListener('DOMContentLoaded', () => {
    // Set timer for 5 minutes
    let time = 5 * 60; 

    const minutesEl = document.getElementById('minutes');
    const secondsEl = document.getElementById('seconds');

    // Only run if elements exist (in case script is included elsewhere)
    if (!minutesEl || !secondsEl) return;

    const updateTimer = () => {
        const minutes = Math.floor(time / 60);
        const seconds = time % 60;

        minutesEl.textContent = minutes < 10 ? '0' + minutes : minutes;
        secondsEl.textContent = seconds < 10 ? '0' + seconds : seconds;

        if (time > 0) {
            time--;
        } else {
            // Reset or stop
            time = 5 * 60;
        }
    };

    // Update immediately then every second
    updateTimer();
    setInterval(updateTimer, 1000);
});
