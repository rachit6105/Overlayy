let userInteractions = [];

function logInteraction(type, details) {
  userInteractions.push({ type, details, timestamp: new Date() });
}

document.addEventListener('click', (e) => logInteraction('click', { x: e.clientX, y: e.clientY }));
document.addEventListener('mousemove', (e) => logInteraction('hover', { x: e.clientX, y: e.clientY }));
document.addEventListener('touchstart', (e) => logInteraction('touch', { x: e.touches[0].clientX, y: e.touches[0].clientY }));
document.addEventListener('keydown', (e) => logInteraction('type', { key: e.key }));
document.addEventListener('scroll', () => logInteraction('scroll', { top: window.scrollY, left: window.scrollX }));

function analyzeInteractions() {
  // Basic analysis to determine user focus (e.g., most frequent interaction points)
  let clickCount = userInteractions.filter(i => i.type === 'click').length;
  let hoverCount = userInteractions.filter(i => i.type === 'hover').length;

  let summary = `User clicked ${clickCount} times and hovered ${hoverCount} times.`;
  return summary;
}

function updateNarrativeSummary() {
  let summary = analyzeInteractions();
  chrome.runtime.sendMessage({ type: 'updateSummary', summary });
}

setInterval(updateNarrativeSummary, 5000);
