// popup.js
document.addEventListener('DOMContentLoaded', () => {
    chrome.storage.local.get('narrativeSummary', (data) => {
      document.getElementById('summary').textContent = data.narrativeSummary || 'No data yet';
    });
  
    setInterval(() => {
      chrome.storage.local.get('narrativeSummary', (data) => {
        document.getElementById('summary').textContent = data.narrativeSummary || 'No data yet';
      });
    }, 5000);
  });
  