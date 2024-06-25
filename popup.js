document.getElementById('capture-content-btn').addEventListener('click', () => {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        chrome.scripting.executeScript({
            target: {tabId: tabs[0].id},
            function: extractVisibleContentAndImages
        }, (results) => {
            if (results && results[0] && results[0].result) {
                sendContentToBackend(results[0].result);
            }
        });
    });
});

function extractVisibleContentAndImages() {
    function isElementInViewport(el) {
        const rect = el.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    }

    const visibleContent = {
        text: [],
        images: []
    };

    const elements = document.body.getElementsByTagName('*');
    for (const element of elements) {
        if (isElementInViewport(element)) {
            if (element.innerText.trim() !== '') {
                visibleContent.text.push(element.innerText.trim());
            }
            if (element.tagName.toLowerCase() === 'img' && element.src) {
                visibleContent.images.push(element.src);
            }
        }
    }
    return visibleContent;
}

function sendContentToBackend(content) {
    fetch('http://localhost:5000/content', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(content)
    }).catch(error => console.error('Error:', error));
}
