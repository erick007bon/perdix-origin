// content.js - The Sensor
// This runs inside the web page to detect AI interactions silently.

const PLATFORMS = {
  'chatgpt.com': 'ChatGPT',
  'claude.ai': 'Claude',
  'gemini.google.com': 'Gemini',
  'grok.x.ai': 'Grok',
  'github.com': 'Copilot'
};

const currentDomain = window.location.hostname.replace('www.', '');
const platformName = PLATFORMS[currentDomain] || 'Unknown AI';

console.log(`Perdix Brain: Tracking active on ${platformName}`);

// Function to estimate tokens (rough approximation: 1 word ~ 1.3 tokens)
function estimateTokens(text) {
  if (!text) return 0;
  return Math.ceil(text.split(/\s+/).length * 1.3);
}

// Observes the DOM for new messages (Output)
const observer = new MutationObserver((mutations) => {
  for (const mutation of mutations) {
    if (mutation.addedNodes.length) {
      // Logic to detect new message bubbles would go here
      // This is a simplified "Pulse" detection to simulate activity tracking
      
      // We send a "heartbeat" of activity instead of scraping exact text for privacy in this demo
      chrome.runtime.sendMessage({
        action: "LOG_ACTIVITY",
        data: {
          platform: platformName,
          tokens: Math.floor(Math.random() * 50) + 10, // Simulated token stream for demo
          timestamp: new Date().toISOString()
        }
      });
    }
  }
});

// Start observing the body for changes (Silent Mode)
observer.observe(document.body, {
  childList: true,
  subtree: true
});

// Detect Input Typing (Input)
document.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') {
     // User sent a prompt
     chrome.runtime.sendMessage({
        action: "LOG_ACTIVITY",
        data: {
          platform: platformName,
          type: "PROMPT_SENT",
          tokens: 15, // Mock value
          timestamp: new Date().toISOString()
        }
      });
  }
});
