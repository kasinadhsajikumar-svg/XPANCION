/* ==========================================================================
   SmartCampus Main Application Controller & Router
   ========================================================================== */

class AppRouter {
  constructor() {
    this.currentRoute = 'dashboard';
    this.routes = {
      dashboard: renderDashboardView,
      'lost-found': renderLostFoundView,
      complaints: renderComplaintsView,
      rooms: renderRoomsView,
      map: renderMapView,
      events: renderEventsView,
      announcements: renderAnnouncementsView,
      attendance: renderAttendanceView,
      cafeteria: renderCafeteriaView,
      analytics: renderAnalyticsView
    };
  }

  navigate(route) {
    if (!this.routes[route]) {
      console.warn(`Route ${route} not found, defaulting to dashboard.`);
      route = 'dashboard';
    }
    this.currentRoute = route;
    this.renderCurrentView();

    // Update active nav-link in sidebar
    document.querySelectorAll('.nav-link').forEach(link => {
      link.classList.toggle('active', link.dataset.route === route);
    });

    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  renderCurrentView() {
    const container = document.getElementById('view-container');
    if (!container) return;
    const viewFn = this.routes[this.currentRoute];
    if (viewFn) {
      container.innerHTML = viewFn();
    }
  }
}

// Global Single Instance
window.appRouter = new AppRouter();

// Toast Engine
window.showToast = function(msg) {
  const container = document.getElementById('toast-container');
  if (!container) return;

  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.innerHTML = `
    <span style="font-size: 1.2rem;">🔔</span>
    <div style="flex: 1; font-weight: 500;">${msg}</div>
  `;
  container.appendChild(toast);

  setTimeout(() => {
    toast.style.transition = 'all 0.3s ease';
    toast.style.opacity = '0';
    toast.style.transform = 'translateX(100%)';
    setTimeout(() => toast.remove(), 300);
  }, 3500);
};

// Modal Manager
window.appendModalToDOM = function(html) {
  const existing = document.getElementById('modal-outlet');
  if (existing) {
    existing.innerHTML = html;
  } else {
    const div = document.createElement('div');
    div.id = 'modal-outlet';
    div.innerHTML = html;
    document.body.appendChild(div);
  }
};

window.closeModal = function(id) {
  const modal = document.getElementById(id);
  if (modal) {
    modal.classList.remove('active');
    setTimeout(() => modal.remove(), 250);
  }
};

// Universal Header Search (README Section 16 & 34)
window.handleUniversalSearch = function(event) {
  if (event.key === 'Enter') {
    const val = event.target.value.trim().toLowerCase();
    if (!val) return;

    if (val.includes('room') || val.includes('lab') || val.includes('class') || val.includes('hall')) {
      window.appRouter.navigate('rooms');
      window.showToast(`Showing room and lab availability for: "${val}"`);
    } else if (val.includes('lost') || val.includes('found') || val.includes('wallet') || val.includes('id') || val.includes('keys')) {
      window.appRouter.navigate('lost-found');
      window.showToast(`Searching Lost & Found records for: "${val}"`);
    } else if (val.includes('complaint') || val.includes('broken') || val.includes('repair') || val.includes('fix')) {
      window.appRouter.navigate('complaints');
      window.showToast(`Opening Maintenance center for: "${val}"`);
    } else if (val.includes('map') || val.includes('where is') || val.includes('locate') || val.includes('library')) {
      window.appRouter.navigate('map');
      window.showToast(`Locating building on Campus Map...`);
    } else if (val.includes('event') || val.includes('hackathon') || val.includes('fest')) {
      window.appRouter.navigate('events');
      window.showToast(`Loading registered events and workshops...`);
    } else if (val.includes('food') || val.includes('canteen') || val.includes('cafeteria') || val.includes('lunch') || val.includes('parcel') || val.includes('otp') || val.includes('snack') || val.includes('coffee')) {
      window.appRouter.navigate('cafeteria');
      window.showToast(`Opening Smart Cafeteria for: "${val}"`);
    } else {
      // Direct query to AI Copilot
      window.toggleAICopilot(true);
      window.sendAICopilotMessage(val);
    }
  }
};

// AI Copilot Toggle & Interaction
window.toggleAICopilot = function(forceOpen = null) {
  const drawer = document.getElementById('ai-drawer');
  if (!drawer) return;
  const isOpen = forceOpen !== null ? forceOpen : !drawer.classList.contains('open');
  drawer.classList.toggle('open', isOpen);
  if (isOpen) {
    setTimeout(() => {
      const input = document.getElementById('ai-copilot-input');
      if (input) input.focus();
    }, 200);
  }
};

window.sendAICopilotMessage = function(overrideText = null) {
  const input = document.getElementById('ai-copilot-input');
  const chatBody = document.getElementById('ai-chat-body');
  const text = overrideText || (input ? input.value.trim() : '');
  if (!text) return;

  if (input) input.value = '';

  // Render User Message
  const userBubble = document.createElement('div');
  userBubble.className = 'chat-bubble user';
  userBubble.textContent = text;
  chatBody.appendChild(userBubble);
  chatBody.scrollTop = chatBody.scrollHeight;

  // Process AI Response
  setTimeout(() => {
    const result = window.campusAI.processQuery(text);
    const aiBubble = document.createElement('div');
    aiBubble.className = 'chat-bubble ai';
    aiBubble.innerHTML = result.text.replace(/\n/g, '<br/>');

    if (result.action) {
      const btn = document.createElement('button');
      btn.className = 'btn btn-sm btn-primary';
      btn.style.marginTop = '0.6rem';
      btn.style.width = '100%';
      btn.textContent = result.action.label;
      btn.onclick = () => {
        if (result.action.isSOS) {
          window.openSOSModal();
        } else if (result.action.view) {
          window.appRouter.navigate(result.action.view);
          window.toggleAICopilot(false);
        }
      };
      aiBubble.appendChild(btn);
    }

    chatBody.appendChild(aiBubble);
    chatBody.scrollTop = chatBody.scrollHeight;
  }, 400);
};

// Notification Dropdown Center
window.toggleNotificationCenter = function() {
  const state = window.campusState.data;
  const notifs = state.notifications;

  const modalHTML = `
    <div class="modal-backdrop active" id="notif-modal">
      <div class="modal-container" style="max-width: 480px;">
        <div class="modal-header">
          <div style="display: flex; align-items: center; gap: 0.5rem;">
            <h3>🔔 Campus Notifications</h3>
            <span class="badge badge-primary">${notifs.filter(n => n.unread).length} New</span>
          </div>
          <button class="modal-close" onclick="window.closeModal('notif-modal')">&times;</button>
        </div>
        <div class="modal-body" style="max-height: 400px; overflow-y: auto;">
          <div style="display: flex; flex-direction: column; gap: 0.75rem;">
            ${notifs.map(n => `
              <div style="background: var(--bg-surface); padding: 0.85rem; border-radius: var(--radius-md); border-left: 3px solid ${n.type === 'sos' ? 'var(--status-sos)' : n.type === 'lost_found' ? '#34d399' : 'var(--primary)'};">
                <div style="display: flex; justify-content: space-between; font-size: 0.75rem; color: var(--text-muted); margin-bottom: 0.25rem;">
                  <b>${n.title}</b>
                  <span>${n.time}</span>
                </div>
                <p style="font-size: 0.82rem; color: var(--text-primary); line-height: 1.4;">${n.message}</p>
              </div>
            `).join('')}
          </div>
        </div>
        <div class="modal-footer" style="justify-content: space-between;">
          <button class="btn btn-sm btn-outline" onclick="window.campusState.markNotificationsRead(); window.closeModal('notif-modal'); window.appRouter.renderCurrentView();">
            Mark All as Read
          </button>
          <button class="btn btn-sm btn-secondary" onclick="window.closeModal('notif-modal')">
            Close
          </button>
        </div>
      </div>
    </div>
  `;
  window.appendModalToDOM(modalHTML);
};

// Role Switcher Handler
window.handleRoleSwitch = function(newRole) {
  window.campusState.switchRole(newRole);
  window.showToast(`Switched view to ${newRole.toUpperCase()} mode.`);
  
  // Update header and sidebar labels
  const user = window.campusState.data.currentUser;
  const userHeaderEl = document.getElementById('header-user-display');
  if (userHeaderEl) {
    userHeaderEl.innerHTML = `
      <span style="font-size: 1.3rem;">${user.avatar}</span>
      <div style="text-align: left; line-height: 1.2;">
        <div style="font-size: 0.85rem; font-weight: 700;">${user.name}</div>
        <div style="font-size: 0.7rem; color: var(--text-muted); text-transform: uppercase;">${user.role}</div>
      </div>
    `;
  }

  window.appRouter.renderCurrentView();
};

// Initialize Application on DOM Ready
document.addEventListener('DOMContentLoaded', () => {
  // Setup reactive state sync
  window.campusState.subscribe(() => {
    // Update unread badges
    const unreadEl = document.getElementById('notif-unread-badge');
    if (unreadEl) {
      const count = window.campusState.data.currentUser.unreadCount || 0;
      unreadEl.style.display = count > 0 ? 'inline-block' : 'none';
      unreadEl.textContent = count;
    }
  });

  // Sync header display and role switcher with current state
  const currentUser = window.campusState.data.currentUser;
  const userHeaderEl = document.getElementById('header-user-display');
  if (userHeaderEl && currentUser) {
    userHeaderEl.innerHTML = `
      <span style="font-size: 1.3rem;">${currentUser.avatar}</span>
      <div style="text-align: left; line-height: 1.2;">
        <div style="font-size: 0.85rem; font-weight: 700;">${currentUser.name}</div>
        <div style="font-size: 0.7rem; color: var(--text-muted); text-transform: uppercase;">${currentUser.role}</div>
      </div>
    `;
  }
  const roleSelectEl = document.getElementById('role-select');
  if (roleSelectEl && currentUser) {
    roleSelectEl.value = currentUser.role;
  }

  // Start with Dashboard
  window.appRouter.navigate('dashboard');
});
