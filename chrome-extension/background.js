// background.js - The Silent Observer
// This runs in the background to coordinate data without interfering with the user.

console.log("Perdix Brain: Neural Link Established.");

// Listen for messages from content scripts (the eyes on the page)
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "LOG_ACTIVITY") {
    console.log("Activity Detected:", request.data);
    
    // Here we would send data to our server (Perdix Platform)
    // For now, we save to local storage to demonstrate the concept
    chrome.storage.local.get(['totalTokens', 'toolUsage'], (result) => {
      const currentTokens = result.totalTokens || 0;
      const currentUsage = result.toolUsage || {};
      
      const newTokens = currentTokens + request.data.tokens;
      const platform = request.data.platform;
      
      currentUsage[platform] = (currentUsage[platform] || 0) + 1;

      chrome.storage.local.set({
        totalTokens: newTokens,
        toolUsage: currentUsage,
        lastActive: new Date().toISOString()
      });

      console.log(`Updated Stats: ${newTokens} tokens on ${platform}`);
    });
  }
});
