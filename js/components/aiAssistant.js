/* ============================================================
   SkyRoute AI Assistant Widget
   Floating organic-shaped chat widget
   ============================================================ */

function renderAIAssistant() {
  return `
    <div class="ai-widget" id="ai-widget">
      <div class="ai-chat" id="ai-chat">
        <div class="ai-chat-header">
          <div class="ai-chat-avatar">🤖</div>
          <div>
            <div class="ai-chat-name">SkyRoute AI</div>
            <div class="ai-chat-status">Online</div>
          </div>
        </div>
        <div class="ai-chat-body" id="ai-chat-body">
          <div class="ai-message ai-message--bot">
            Hello SkyRoute! ✈️ Where are we flying today? I can help you find the best flights, check layover info, or answer any travel questions.
          </div>
        </div>
        <div class="ai-chat-quick-replies" id="ai-quick-replies">
          <button class="ai-quick-reply" onclick="aiQuickReply('Find cheap flights')">✈️ Cheap flights</button>
          <button class="ai-quick-reply" onclick="aiQuickReply('Best time to book')">⏰ Best time to book</button>
          <button class="ai-quick-reply" onclick="aiQuickReply('Layover tips')">🏨 Layover tips</button>
          <button class="ai-quick-reply" onclick="aiQuickReply('Baggage rules')">🧳 Baggage rules</button>
        </div>
        <div class="ai-chat-input">
          <input type="text" id="ai-input" placeholder="Type a message..." onkeypress="if(event.key==='Enter')sendAIMessage()">
          <button class="ai-chat-send" onclick="sendAIMessage()">➤</button>
        </div>
      </div>
      <button class="ai-widget-btn" id="ai-widget-btn" onclick="toggleAIChat()" aria-label="Open AI Assistant">
        🛫
      </button>
    </div>
  `;
}

function toggleAIChat() {
  const chat = document.getElementById('ai-chat');
  const btn = document.getElementById('ai-widget-btn');
  
  if (chat && btn) {
    chat.classList.toggle('open');
    btn.classList.toggle('active');
    
    if (btn.classList.contains('active')) {
      btn.innerHTML = '✕';
      // Focus input
      setTimeout(() => {
        document.getElementById('ai-input')?.focus();
      }, 300);
    } else {
      btn.innerHTML = '🛫';
    }
  }
}

function sendAIMessage() {
  const input = document.getElementById('ai-input');
  const body = document.getElementById('ai-chat-body');
  
  if (!input || !body || !input.value.trim()) return;
  
  const message = input.value.trim();
  input.value = '';
  
  // Add user message
  body.innerHTML += `<div class="ai-message ai-message--user">${escapeHtml(message)}</div>`;
  
  // Scroll to bottom
  body.scrollTop = body.scrollHeight;
  
  // Simulate AI response
  setTimeout(() => {
    const response = getAIResponse(message);
    body.innerHTML += `<div class="ai-message ai-message--bot">${response}</div>`;
    body.scrollTop = body.scrollHeight;
  }, 800);
}

function aiQuickReply(text) {
  const input = document.getElementById('ai-input');
  if (input) {
    input.value = text;
    sendAIMessage();
  }
  // Hide quick replies after first use
  const replies = document.getElementById('ai-quick-replies');
  if (replies) replies.style.display = 'none';
}

function getAIResponse(message) {
  const lower = message.toLowerCase();
  
  if (lower.includes('cheap') || lower.includes('budget') || lower.includes('affordable')) {
    return '💰 For the best deals, I recommend checking our <b>DEL → GOI</b> route starting at ₹2,899! Try searching with flexible dates for even better prices. Early morning flights tend to be cheaper! 🌅';
  }
  
  if (lower.includes('time to book') || lower.includes('when')) {
    return '⏰ The best time to book domestic flights is <b>6-8 weeks</b> before departure. For international flights, try <b>3-4 months</b> ahead. Tuesday and Wednesday usually have the lowest fares! 📅';
  }
  
  if (lower.includes('layover') || lower.includes('hotel') || lower.includes('wait')) {
    return '🏨 Great question! SkyRoute automatically detects long layovers (4+ hours) and recommends nearby hotels. Check any connecting flight\'s details page to see personalized hotel suggestions right in the timeline! ✨';
  }
  
  if (lower.includes('baggage') || lower.includes('luggage') || lower.includes('bag')) {
    return '🧳 Baggage allowances vary by airline:<br>• <b>Economy:</b> 15-25kg check-in + 7-15kg cabin<br>• <b>Premium/Business:</b> 30-35kg check-in<br>Check specific flight details for exact limits!';
  }
  
  if (lower.includes('cancel') || lower.includes('refund')) {
    return '🔄 Most tickets can be cancelled up to <b>24 hours</b> before departure with a partial refund. Check your booking in the Dashboard for specific cancellation terms. Premium bookings usually have more flexible policies! 💎';
  }
  
  if (lower.includes('hello') || lower.includes('hi') || lower.includes('hey')) {
    return '👋 Hey there, traveler! Ready to explore the skies? Tell me your dream destination and I\'ll help you find the perfect flight! ✈️🌍';
  }
  
  if (lower.includes('dubai') || lower.includes('dxb')) {
    return '🌆 Dubai is amazing! We have direct flights from DEL and BOM starting at ₹12,800. Emirates flights offer premium experiences with A380 aircraft! The best season to visit is Nov-Mar. ☀️';
  }
  
  if (lower.includes('goa')) {
    return '🏖️ Goa vibes! Flights from Mumbai start at just ₹2,899 (70 min flight!). From Delhi, you can fly for ₹3,750. Perfect for a weekend getaway! 🌴';
  }
  
  return '✨ Thanks for your question! I\'m here to help with flight searches, pricing info, layover guidance, and travel tips. Try asking about specific routes, baggage policies, or booking tips! 🌟';
}

function escapeHtml(text) {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}
