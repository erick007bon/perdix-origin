// popup.js
document.addEventListener('DOMContentLoaded', () => {
    chrome.storage.local.get(['totalTokens'], (result) => {
        document.getElementById('tokens').textContent = result.totalTokens || 0;
    });
});
