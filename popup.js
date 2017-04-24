function renderStatus(statusText) {
    document.getElementById('status').textContent = statusText;
}

document.addEventListener('DOMContentLoaded', function () {
    chrome.runtime.sendMessage('', 'popup-open');
});
