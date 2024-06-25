async function getNarrativeSummary(summary) {
  const response = await fetch('https://api.openai.com/v1/engines/gemini/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer AIzaSyB4umQ0GjxfOM1aYYcwlpub34hPqh8nVp0`
    },
    body: JSON.stringify({
      prompt: `Summarize the user's needs based on this interaction data: ${summary}`,
      max_tokens: 100
    })
  });

  const data = await response.json();
  return data.choices[0].text.trim();
}

chrome.runtime.onMessage.addListener(async (request, sender, sendResponse) => {
  if (request.type === 'updateSummary') {
    const narrativeSummary = await getNarrativeSummary(request.summary);
    chrome.storage.local.set({ narrativeSummary });
  }
});
