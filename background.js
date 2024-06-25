chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.type === 'updateSummary') {
      // Use an LLM API (like OpenAI) to generate a more comprehensive narrative summary
      fetch('https://api.openai.com/v1/engines/davinci-codex/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer YOUR_OPENAI_API_KEY`
        },
        body: JSON.stringify({
          prompt: `Summarize the user's needs based on this interaction data: ${request.summary}`,
          max_tokens: 100
        })
      })
      .then(response => response.json())
      .then(data => {
        let narrativeSummary = data.choices[0].text.trim();
        chrome.storage.local.set({ narrativeSummary });
      });
    }
  });
  