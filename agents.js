@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap');

:root {
  --font-family: 'Inter', system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
  
  /* Light Theme Variables */
  --bg-app: #f3f5f8;
  --bg-sidebar: #ffffff;
  --bg-card: #ffffff;
  --border-color: #e2e8f0;
  --text-primary: #0f172a;
  --text-secondary: #475569;
  --accent-color: #0078d4; /* Microsoft Blue */
  --accent-hover: #106ebe;
  --accent-light: rgba(0, 120, 212, 0.08);
  --hover-bg: #f8fafc;
  
  --success-color: #107c41;
  --success-bg: #dff6dd;
  --warning-color: #d83b01;
  --warning-bg: #fde7e9;
  --danger-color: #a80000;
  --danger-bg: #fde7e9;
  
  --card-shadow: 0 1px 3px rgba(15, 23, 42, 0.03), 0 1px 2px rgba(15, 23, 42, 0.04);
  --panel-shadow: 0 4px 6px -1px rgba(15, 23, 42, 0.05), 0 2px 4px -1px rgba(15, 23, 42, 0.03);
  --transition-speed: 0.2s;
}

body.dark-theme {
  /* Dark Theme Variables */
  --bg-app: #080d16;
  --bg-sidebar: #0e1622;
  --bg-card: #151f30;
  --border-color: #233148;
  --text-primary: #f8fafc;
  --text-secondary: #94a3b8;
  --accent-color: #2f99ff;
  --accent-hover: #58afff;
  --accent-light: rgba(47, 153, 255, 0.15);
  --hover-bg: #1c2a41;
  
  --success-color: #10b981;
  --success-bg: rgba(16, 185, 129, 0.12);
  --warning-color: #fb923c;
  --warning-bg: rgba(251, 146, 60, 0.12);
  --danger-color: #f87171;
  --danger-bg: rgba(248, 113, 113, 0.12);
  
  --card-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
  --panel-shadow: 0 10px 20px rgba(0, 0, 0, 0.4);
}

* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

body {
  font-family: var(--font-family);
  background-color: var(--bg-app);
  color: var(--text-primary);
  height: 100vh;
  overflow: hidden;
  transition: background-color var(--transition-speed), color var(--transition-speed);
}

/* Base App Layout */
.app-container {
  display: flex;
  height: 100vh;
  width: 100vw;
  overflow: hidden;
}

/* Sidebar Styling */
.sidebar {
  width: 270px;
  background-color: var(--bg-sidebar);
  border-right: 1px solid var(--border-color);
  display: flex;
  flex-direction: column;
  height: 100%;
  flex-shrink: 0;
  transition: background-color var(--transition-speed), border-color var(--transition-speed);
  z-index: 10;
}

.sidebar-header {
  padding: 24px 20px;
  display: flex;
  align-items: center;
  gap: 12px;
  border-bottom: 1px solid var(--border-color);
}

.logo-icon {
  width: 32px;
  height: 32px;
  background: linear-gradient(135deg, #0078d4, #8660a9);
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: 800;
  font-size: 18px;
  box-shadow: 0 2px 8px rgba(0, 120, 212, 0.3);
}

.logo-text {
  font-size: 19px;
  font-weight: 700;
  letter-spacing: -0.5px;
  background: linear-gradient(90deg, var(--text-primary), var(--accent-color));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.sidebar-menu {
  flex: 1;
  padding: 16px 12px;
  display: flex;
  flex-direction: column;
  gap: 4px;
  overflow-y: auto;
}

.menu-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 10px 14px;
  border-radius: 8px;
  color: var(--text-secondary);
  font-size: 13.5px;
  font-weight: 550;
  text-decoration: none;
  cursor: pointer;
  transition: background-color 0.15s, color 0.15s;
}

.menu-item:hover {
  background-color: var(--hover-bg);
  color: var(--text-primary);
}

.menu-item.active {
  background-color: var(--accent-light);
  color: var(--accent-color);
}

.menu-item-icon {
  font-size: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 20px;
}

.sidebar-footer {
  padding: 16px 20px;
  border-top: 1px solid var(--border-color);
  font-size: 11px;
  color: var(--text-secondary);
  text-align: center;
  font-weight: 500;
}

/* Main Content Area */
.main-wrapper {
  flex: 1;
  display: flex;
  flex-direction: column;
  height: 100%;
  overflow: hidden;
}

/* Top Bar Styling */
.top-bar {
  height: 64px;
  background-color: var(--bg-sidebar);
  border-bottom: 1px solid var(--border-color);
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 24px;
  transition: background-color var(--transition-speed), border-color var(--transition-speed);
}

.search-container {
  display: flex;
  align-items: center;
  background-color: var(--bg-app);
  border: 1px solid var(--border-color);
  border-radius: 8px;
  padding: 6px 12px;
  width: 260px;
  gap: 8px;
}

.search-input {
  border: none;
  background: transparent;
  color: var(--text-primary);
  font-size: 13px;
  outline: none;
  width: 100%;
}

.top-bar-right {
  display: flex;
  align-items: center;
  gap: 16px;
}

.indicator-badge {
  display: flex;
  align-items: center;
  gap: 8px;
  background-color: var(--hover-bg);
  border: 1px solid var(--border-color);
  padding: 6px 12px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 600;
}

.indicator-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background-color: var(--success-color);
}

.icon-btn {
  background: none;
  border: none;
  cursor: pointer;
  color: var(--text-secondary);
  font-size: 16px;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  transition: background-color 0.15s;
}

.icon-btn:hover {
  background-color: var(--hover-bg);
  color: var(--text-primary);
}

.notification-badge-red {
  position: absolute;
  top: 6px;
  right: 6px;
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background-color: #ef4444;
}

.profile-select-wrapper {
  display: flex;
  align-items: center;
  gap: 8px;
  background-color: var(--hover-bg);
  border: 1px solid var(--border-color);
  padding: 4px 10px;
  border-radius: 20px;
  cursor: pointer;
}

.profile-select-wrapper:hover {
  background-color: var(--border-color);
}

.profile-avatar {
  width: 26px;
  height: 26px;
  background-color: var(--accent-color);
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 11px;
  font-weight: 700;
}

.profile-select {
  background: transparent;
  border: none;
  color: var(--text-primary);
  font-weight: 600;
  font-size: 12.5px;
  outline: none;
  cursor: pointer;
  font-family: var(--font-family);
}

/* View Shell Routing Content */
.content-container {
  flex: 1;
  padding: 24px;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.page-view {
  display: none;
  animation: fadeIn 0.25s ease-out;
  flex-direction: column;
  gap: 20px;
}

.page-view.active {
  display: flex;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(4px); }
  to { opacity: 1; transform: translateY(0); }
}

/* Page Header */
.page-header {
  margin-bottom: 4px;
}

.page-title {
  font-size: 24px;
  font-weight: 700;
  letter-spacing: -0.5px;
  color: var(--text-primary);
}

.page-subtitle {
  font-size: 13.5px;
  color: var(--text-secondary);
  margin-top: 4px;
}

/* Premium Card Layout styling */
.grid-layout {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 20px;
}

.grid-span-2 {
  grid-column: span 2;
}

.grid-span-3 {
  grid-column: span 3;
}

@media (max-width: 900px) {
  .grid-span-2, .grid-span-3 {
    grid-column: span 1;
  }
}

.card {
  background-color: var(--bg-card);
  border: 1px solid var(--border-color);
  border-radius: 12px;
  padding: 20px;
  box-shadow: var(--card-shadow);
  display: flex;
  flex-direction: column;
  gap: 16px;
  transition: transform var(--transition-speed), box-shadow var(--transition-speed), background-color var(--transition-speed), border-color var(--transition-speed);
}

.card:hover {
  box-shadow: var(--panel-shadow);
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.card-title {
  font-size: 15px;
  font-weight: 700;
  color: var(--text-primary);
  display: flex;
  align-items: center;
  gap: 8px;
}

.card-actions {
  display: flex;
  gap: 8px;
}

/* Dashboard Widget details */
.stat-display {
  display: flex;
  align-items: baseline;
  gap: 6px;
}

.stat-value {
  font-size: 32px;
  font-weight: 800;
  color: var(--text-primary);
  letter-spacing: -0.5px;
}

.stat-unit {
  font-size: 13px;
  color: var(--text-secondary);
  font-weight: 550;
}

.progress-bar-container {
  width: 100%;
  height: 8px;
  background-color: var(--border-color);
  border-radius: 4px;
  overflow: hidden;
}

.progress-bar-fill {
  height: 100%;
  background: linear-gradient(90deg, var(--accent-color), #8660a9);
  border-radius: 4px;
  transition: width 0.5s ease-out;
}

/* Lists and Lists items */
.item-list {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.list-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 12px;
  background-color: var(--hover-bg);
  border: 1px solid var(--border-color);
  border-radius: 8px;
  font-size: 13px;
}

.list-item-left {
  display: flex;
  align-items: center;
  gap: 10px;
}

.badge {
  padding: 3px 8px;
  border-radius: 20px;
  font-size: 11px;
  font-weight: 600;
}

.badge-success { background-color: var(--success-bg); color: var(--success-color); }
.badge-warning { background-color: var(--warning-bg); color: var(--warning-color); }
.badge-danger { background-color: var(--danger-bg); color: var(--danger-color); }
.badge-info { background-color: var(--accent-light); color: var(--accent-color); }

/* AI Recommendation Alert Card */
.ai-card {
  background: linear-gradient(135deg, var(--accent-light), rgba(134, 96, 169, 0.05));
  border: 1px dashed var(--accent-color);
  position: relative;
  overflow: hidden;
}

.ai-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 4px;
  height: 100%;
  background: linear-gradient(180deg, var(--accent-color), #8660a9);
}

.ai-header {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 13.5px;
  font-weight: 700;
  color: var(--accent-color);
}

.ai-reasoning {
  font-size: 13px;
  color: var(--text-secondary);
  line-height: 1.5;
  margin-top: 4px;
}

/* Forms and Inputs */
.form-group {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.form-label {
  font-size: 11px;
  font-weight: 700;
  color: var(--text-secondary);
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.form-select, .form-input {
  width: 100%;
  padding: 10px 12px;
  border-radius: 8px;
  border: 1px solid var(--border-color);
  background-color: var(--bg-card);
  color: var(--text-primary);
  font-family: var(--font-family);
  font-size: 13.5px;
  outline: none;
  transition: border-color 0.15s;
}

.form-select:focus, .form-input:focus {
  border-color: var(--accent-color);
}

.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 10px 16px;
  border-radius: 8px;
  font-size: 13.5px;
  font-weight: 600;
  cursor: pointer;
  border: none;
  transition: background-color 0.15s, transform 0.1s;
  font-family: var(--font-family);
}

.btn:active {
  transform: scale(0.98);
}

.btn-primary {
  background-color: var(--accent-color);
  color: white;
}

.btn-primary:hover {
  background-color: var(--accent-hover);
}

.btn-secondary {
  background-color: var(--bg-app);
  border: 1px solid var(--border-color);
  color: var(--text-primary);
}

.btn-secondary:hover {
  background-color: var(--hover-bg);
}

/* Agent Output Styling styles */
.agent-shell {
  border: 1px solid var(--border-color);
  background-color: var(--bg-card);
  border-radius: 12px;
  overflow: hidden;
}

.agent-shell-header {
  background-color: var(--hover-bg);
  border-bottom: 1px solid var(--border-color);
  padding: 12px 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.agent-name-tag {
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 14px;
  font-weight: 700;
}

.agent-role-pill {
  font-size: 11px;
  color: var(--text-secondary);
  border: 1px solid var(--border-color);
  padding: 2px 8px;
  border-radius: 12px;
  background-color: var(--bg-card);
}

.agent-body {
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.agent-reasoning-console {
  background-color: #0d1117;
  border-radius: 8px;
  padding: 14px;
  font-family: monospace;
  font-size: 12.5px;
  color: #39ff14; 
  max-height: 150px;
  overflow-y: auto;
  border: 1px solid #1f2937;
}

.agent-console-line {
  margin-bottom: 6px;
  opacity: 0;
  animation: consoleLineFade 0.3s forwards;
}

@keyframes consoleLineFade {
  to { opacity: 1; }
}

/* Calendar View CSS elements */
.calendar-grid {
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: 10px;
  overflow-x: auto;
}

@media (max-width: 768px) {
  .calendar-grid {
    grid-template-columns: 1fr;
  }
}

.calendar-day-card {
  background-color: var(--hover-bg);
  border: 1px solid var(--border-color);
  border-radius: 8px;
  padding: 12px;
  min-height: 120px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.calendar-day-name {
  font-size: 11px;
  font-weight: 700;
  color: var(--text-secondary);
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.calendar-day-task {
  font-size: 12px;
  font-weight: 600;
  color: var(--text-primary);
  margin: 10px 0;
  line-height: 1.4;
}

.calendar-day-time {
  font-size: 10px;
  color: var(--text-secondary);
  display: flex;
  align-items: center;
  gap: 4px;
}

/* Timeline/Roadmap styling */
.roadmap-timeline {
  display: flex;
  flex-direction: column;
  position: relative;
  padding-left: 20px;
  margin-left: 10px;
  border-left: 2px solid var(--border-color);
  gap: 20px;
}

.roadmap-node {
  position: relative;
}

.roadmap-node::before {
  content: '';
  position: absolute;
  left: -27px;
  top: 4px;
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background-color: var(--accent-color);
  border: 2px solid var(--bg-card);
}

.roadmap-node-week {
  font-size: 11px;
  font-weight: 700;
  color: var(--accent-color);
}

.roadmap-node-topic {
  font-size: 14px;
  font-weight: 650;
  color: var(--text-primary);
  margin: 2px 0 4px 0;
}

.roadmap-node-details {
  font-size: 12.5px;
  color: var(--text-secondary);
}

/* Multi-Agent Flow Diagram styles */
.flow-diagram-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  padding: 10px 0;
  position: relative;
  overflow: visible;
  width: 100%;
}

.flow-step-node {
  width: 100%;
  max-width: 600px;
  background-color: var(--bg-card);
  border: 2px solid var(--border-color);
  border-radius: 12px;
  padding: 16px;
  position: relative;
  z-index: 2;
  box-shadow: var(--card-shadow);
  transition: border-color 0.3s, box-shadow 0.3s, transform 0.2s;
}

.flow-step-node.active {
  border-color: var(--accent-color);
  box-shadow: 0 0 15px var(--accent-light);
  transform: translateY(-2px);
  animation: glowPulse 2s infinite alternate;
}

@keyframes glowPulse {
  0% { box-shadow: 0 0 5px var(--accent-light); }
  100% { box-shadow: 0 0 20px rgba(0, 120, 212, 0.4); }
}

.flow-step-node.completed {
  border-color: var(--success-color);
}

.flow-step-node-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.flow-step-info {
  display: flex;
  align-items: center;
  gap: 12px;
}

.flow-step-icon {
  font-size: 20px;
  width: 40px;
  height: 40px;
  background-color: var(--hover-bg);
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid var(--border-color);
}

.flow-step-title {
  font-size: 14px;
  font-weight: 700;
}

.flow-step-role {
  font-size: 11px;
  color: var(--text-secondary);
  margin-top: 1px;
}

.flow-step-status {
  font-size: 11px;
  font-weight: 700;
  padding: 3px 8px;
  border-radius: 12px;
}

.flow-step-log {
  margin-top: 12px;
  background-color: #0b0f19;
  border: 1px solid #1e293b;
  border-radius: 6px;
  padding: 10px;
  font-family: monospace;
  font-size: 11.5px;
  color: #a5f3fc;
  max-height: 100px;
  overflow-y: auto;
}

/* Animated SVG connectors */
.flow-connector {
  width: 2px;
  height: 25px;
  background-color: var(--border-color);
  position: relative;
  z-index: 1;
}

.flow-connector.active::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(180deg, var(--accent-color), transparent);
  animation: flowingSignal 1.2s infinite linear;
}

@keyframes flowingSignal {
  0% { transform: translateY(-100%); }
  100% { transform: translateY(100%); }
}

/* Assessment Questions widgets */
.question-container {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.question-text {
  font-size: 14.5px;
  font-weight: 600;
  line-height: 1.5;
  color: var(--text-primary);
}

.options-list {
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-top: 10px;
}

.option-item {
  border: 1px solid var(--border-color);
  background-color: var(--bg-card);
  padding: 12px 16px;
  border-radius: 8px;
  font-size: 13px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 12px;
  transition: background-color 0.15s, border-color 0.15s;
}

.option-item:hover {
  background-color: var(--hover-bg);
}

.option-item.selected {
  border-color: var(--accent-color);
  background-color: var(--accent-light);
}

.option-item.correct {
  border-color: var(--success-color);
  background-color: var(--success-bg);
}

.option-item.incorrect {
  border-color: var(--danger-color);
  background-color: var(--danger-bg);
}

.option-radio {
  width: 16px;
  height: 16px;
  border: 2px solid var(--border-color);
  border-radius: 50%;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
}

.option-item.selected .option-radio {
  border-color: var(--accent-color);
}

.option-item.selected .option-radio::after {
  content: '';
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background-color: var(--accent-color);
}

/* Toast System styling */
.toast-container {
  position: fixed;
  bottom: 24px;
  right: 24px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  z-index: 1000;
}

.toast {
  background-color: var(--bg-sidebar);
  border-left: 4px solid var(--accent-color);
  border-radius: 8px;
  padding: 16px;
  box-shadow: var(--panel-shadow);
  display: flex;
  align-items: flex-start;
  gap: 12px;
  width: 340px;
  animation: slideIn 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}

@keyframes slideIn {
  from { transform: translateX(100%); opacity: 0; }
  to { transform: translateX(0); opacity: 1; }
}

.toast-content {
  flex: 1;
}

.toast-title {
  font-size: 13px;
  font-weight: 700;
  color: var(--text-primary);
}

.toast-message {
  font-size: 12px;
  color: var(--text-secondary);
  margin-top: 4px;
  line-height: 1.4;
}

.toast-close {
  background: none;
  border: none;
  cursor: pointer;
  color: var(--text-secondary);
  font-size: 12px;
}

/* Standard Agent Reasoning Panel styling */
.reasoning-panel {
  border: 1px solid var(--border-color);
  border-radius: 12px;
  background-color: var(--bg-card);
  overflow: hidden;
  box-shadow: var(--card-shadow);
  margin-bottom: 20px;
}

.reasoning-header {
  background: linear-gradient(90deg, var(--hover-bg), rgba(134, 96, 169, 0.04));
  border-bottom: 1px solid var(--border-color);
  padding: 12px 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.reasoning-title {
  font-size: 14px;
  font-weight: 700;
  color: var(--accent-color);
  display: flex;
  align-items: center;
  gap: 8px;
}

.reasoning-content-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
  padding: 20px;
}

@media (max-width: 768px) {
  .reasoning-content-grid {
    grid-template-columns: 1fr;
  }
}

.reasoning-block {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.reasoning-label {
  font-size: 11px;
  font-weight: 700;
  color: var(--text-secondary);
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.reasoning-value {
  font-size: 13px;
  color: var(--text-primary);
  line-height: 1.5;
}

/* Agent Activity Timeline component */
.activity-timeline {
  display: flex;
  flex-direction: column;
  position: relative;
  padding-left: 24px;
  margin-left: 8px;
  border-left: 2px solid var(--border-color);
  gap: 16px;
}

.timeline-event {
  position: relative;
}

.timeline-event::before {
  content: '';
  position: absolute;
  left: -31px;
  top: 4px;
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background-color: var(--accent-color);
  border: 3px solid var(--bg-card);
  transition: background-color 0.3s;
}

.timeline-event.completed::before {
  background-color: var(--success-color);
}

.timeline-event-time {
  font-size: 10px;
  font-weight: 700;
  color: var(--text-secondary);
}

.timeline-event-title {
  font-size: 13px;
  font-weight: 700;
  color: var(--text-primary);
  margin: 2px 0;
}

.timeline-event-desc {
  font-size: 11.5px;
  color: var(--text-secondary);
  line-height: 1.4;
}

/* Microsoft IQ Intelligence Layers layouts */
.iq-layers-container {
  display: flex;
  flex-direction: column;
  gap: 30px;
  position: relative;
}

.iq-row-layer {
  display: grid;
  grid-template-columns: 280px 1fr;
  gap: 24px;
  align-items: center;
  border: 1px solid var(--border-color);
  border-radius: 12px;
  background: var(--bg-card);
  padding: 20px;
  box-shadow: var(--card-shadow);
  position: relative;
}

@media (max-width: 900px) {
  .iq-row-layer {
    grid-template-columns: 1fr;
  }
}

.iq-info-card {
  border-right: 1px solid var(--border-color);
  padding-right: 20px;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

@media (max-width: 900px) {
  .iq-info-card {
    border-right: none;
    border-bottom: 1px solid var(--border-color);
    padding-right: 0;
    padding-bottom: 20px;
  }
}

.iq-title-tag {
  font-size: 16px;
  font-weight: 800;
  letter-spacing: -0.5px;
  display: flex;
  align-items: center;
  gap: 8px;
}

.foundry-color { color: #8660a9; }
.fabric-color { color: #0078d4; }
.work-color { color: #107c41; }

.iq-targets-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 16px;
}

.iq-agent-connector-box {
  background: var(--hover-bg);
  border: 1px solid var(--border-color);
  border-radius: 8px;
  padding: 12px;
  display: flex;
  align-items: center;
  gap: 12px;
  font-size: 12.5px;
  font-weight: 600;
}

.iq-agent-connector-box span:first-child {
  font-size: 18px;
}

/* Certification Journey Map Page styling */
.journey-horizontal-timeline {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  position: relative;
  padding: 20px 0;
  overflow-x: auto;
  gap: 16px;
}

.journey-step-block {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  position: relative;
  flex: 1;
  min-width: 100px;
}

.journey-step-circle {
  width: 44px;
  height: 44px;
  border-radius: 50%;
  background-color: var(--bg-card);
  border: 2px solid var(--border-color);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
  z-index: 2;
  box-shadow: var(--card-shadow);
  transition: all 0.3s;
}

.journey-step-block.completed .journey-step-circle {
  background-color: var(--success-bg);
  border-color: var(--success-color);
  color: var(--success-color);
}

.journey-step-block.current .journey-step-circle {
  background-color: var(--accent-light);
  border-color: var(--accent-color);
  color: var(--accent-color);
  box-shadow: 0 0 12px rgba(0, 120, 212, 0.4);
  animation: pulseIndicator 2.2s infinite;
}

@keyframes pulseIndicator {
  0% { transform: scale(1); box-shadow: 0 0 0 0 rgba(0, 120, 212, 0.4); }
  70% { transform: scale(1.05); box-shadow: 0 0 0 8px rgba(0, 120, 212, 0); }
  100% { transform: scale(1); box-shadow: 0 0 0 0 rgba(0, 120, 212, 0); }
}

.journey-step-title {
  font-size: 12.5px;
  font-weight: 700;
  margin-top: 10px;
  color: var(--text-primary);
}

.journey-step-pct {
  font-size: 11px;
  color: var(--text-secondary);
  font-weight: 600;
  margin-top: 2px;
}

.journey-connector-line {
  position: absolute;
  top: 42px;
  left: 50px;
  right: -50px;
  height: 4px;
  background-color: var(--border-color);
  z-index: 1;
}

.journey-step-block.completed .journey-connector-line {
  background-color: var(--success-color);
}

/* Profiles detail components */
.profile-hero {
  display: flex;
  align-items: center;
  gap: 24px;
  border-bottom: 1px solid var(--border-color);
  padding-bottom: 24px;
  margin-bottom: 10px;
}

@media (max-width: 600px) {
  .profile-hero {
    flex-direction: column;
    text-align: center;
  }
}

.profile-hero-avatar {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background: linear-gradient(135deg, var(--accent-color), #8660a9);
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 32px;
  font-weight: 800;
  box-shadow: 0 4px 15px rgba(0, 120, 212, 0.3);
}

.profile-meta-info {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.profile-name {
  font-size: 22px;
  font-weight: 800;
  letter-spacing: -0.5px;
}

.profile-title-tag {
  font-size: 13.5px;
  color: var(--text-secondary);
  font-weight: 650;
}

.profile-badges-list {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 10px;
}

.profile-badge-item {
  background-color: var(--hover-bg);
  border: 1px solid var(--border-color);
  border-radius: 20px;
  padding: 4px 12px;
  font-size: 11.5px;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 6px;
}

/* ====================================================
   PHASE 2 HACKATHON STYLES ADDED BELOW (DO NOT REDESIGN PREVIOUS)
   ==================================================== */

/* Premium Copilot-Style AI Executive Summary briefing */
.exec-summary-card {
  position: relative;
  background: linear-gradient(135deg, rgba(0, 120, 212, 0.05), rgba(134, 96, 169, 0.04), rgba(16, 124, 65, 0.03));
  border: 1px solid var(--border-color);
  border-top: 4px solid;
  border-image: linear-gradient(90deg, #0078d4, #8660a9, #107c41) 1;
  border-radius: 12px;
  box-shadow: var(--panel-shadow);
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.exec-summary-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.exec-summary-title {
  font-size: 15px;
  font-weight: 800;
  letter-spacing: -0.3px;
  color: var(--accent-color);
  display: flex;
  align-items: center;
  gap: 8px;
}

.exec-summary-meta {
  font-size: 10.5px;
  color: var(--text-secondary);
  font-weight: 600;
  font-style: italic;
}

.exec-summary-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 15px;
}

@media (max-width: 768px) {
  .exec-summary-grid {
    grid-template-columns: 1fr;
  }
}

.exec-summary-stat-box {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.exec-summary-stat-label {
  font-size: 10.5px;
  font-weight: 750;
  color: var(--text-secondary);
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.exec-summary-stat-val {
  font-size: 18px;
  font-weight: 800;
  color: var(--text-primary);
}

.exec-summary-action {
  font-size: 12.5px;
  color: var(--text-primary);
  line-height: 1.4;
  background: var(--bg-card);
  border: 1.5px solid var(--border-color);
  padding: 10px 14px;
  border-radius: 8px;
}

/* AI Insight Alert Cards */
.ai-insight-card {
  background-color: var(--hover-bg);
  border: 1px dashed var(--border-color);
  border-radius: 8px;
  padding: 10px 14px;
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 12px;
  color: var(--text-secondary);
  line-height: 1.4;
  margin-top: 5px;
}

.ai-insight-icon {
  font-size: 14px;
  color: #fb923c; /* glowing yellow bulb */
  animation: bulbGlow 2s infinite alternate;
}

@keyframes bulbGlow {
  0% { transform: scale(1); filter: drop-shadow(0 0 1px #fb923c); }
  100% { transform: scale(1.1); filter: drop-shadow(0 0 5px #fb923c); }
}

/* Status Indicator icons for agents */
.status-indicator-spinner {
  display: inline-block;
  width: 14px;
  height: 14px;
  border: 2px solid rgba(0, 120, 212, 0.2);
  border-top-color: var(--accent-color);
  border-radius: 50%;
  animation: spin 1s infinite linear;
}

@keyframes spin {
  100% { transform: rotate(360deg); }
}

/* Traveling Message Envelope Tooltip */
.message-envelope-tooltip {
  background: linear-gradient(135deg, var(--accent-color), #8660a9);
  color: white;
  padding: 4px 10px;
  border-radius: 20px;
  font-size: 10px;
  font-weight: 750;
  position: absolute;
  z-index: 10;
  pointer-events: none;
  box-shadow: 0 4px 10px rgba(134, 96, 169, 0.4);
  opacity: 0;
  animation: tooltipEnter 0.5s forwards cubic-bezier(0.175, 0.885, 0.32, 1.275);
}

@keyframes tooltipEnter {
  to { opacity: 1; transform: translateY(-5px); }
}

/* Custom layout scrollbars */
::-webkit-scrollbar {
  width: 6px;
  height: 6px;
}

::-webkit-scrollbar-track {
  background: transparent;
}

::-webkit-scrollbar-thumb {
  background: var(--border-color);
  border-radius: 10px;
}

::-webkit-scrollbar-thumb:hover {
  background: var(--text-secondary);
}

/* ====================================================
   PHASE 3 HACKATHON STYLES ADDED BELOW
   ==================================================== */

/* "Why this Recommendation?" Diagnostic Panel */
.why-rec-card {
  background: linear-gradient(135deg, rgba(0, 120, 212, 0.03), rgba(16, 124, 65, 0.03));
  border: 1px solid var(--border-color);
  border-left: 4px solid var(--accent-color);
  border-radius: 10px;
  padding: 16px;
  margin-top: 10px;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.why-rec-title {
  font-size: 12px;
  font-weight: 750;
  color: var(--text-primary);
  text-transform: uppercase;
  letter-spacing: 0.5px;
  display: flex;
  align-items: center;
  gap: 6px;
}

.why-rec-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 12px;
  margin: 6px 0;
}

@media (max-width: 600px) {
  .why-rec-grid {
    grid-template-columns: 1fr;
  }
}

.why-rec-item {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.why-rec-val {
  font-size: 15px;
  font-weight: 800;
  color: var(--accent-color);
}

.why-rec-tip {
  font-size: 12px;
  color: var(--text-secondary);
  line-height: 1.4;
  background: var(--hover-bg);
  padding: 8px 12px;
  border-radius: 6px;
  border: 1px solid var(--border-color);
}

/* Executive Mission Control Timeline & Details */
.journey-timeline-vertical {
  display: flex;
  flex-direction: column;
  position: relative;
  padding-left: 32px;
  margin-left: 10px;
  border-left: 2.5px solid var(--border-color);
  gap: 24px;
  margin-top: 15px;
}

.journey-timeline-item {
  position: relative;
}

.journey-timeline-item::before {
  content: '';
  position: absolute;
  left: -40px;
  top: 2px;
  width: 14px;
  height: 14px;
  border-radius: 50%;
  background-color: var(--border-color);
  border: 3.5px solid var(--bg-card);
  z-index: 2;
  transition: background-color 0.3s, box-shadow 0.3s;
}

.journey-timeline-item.active::before {
  background-color: var(--accent-color);
  box-shadow: 0 0 8px var(--accent-color);
}

.journey-timeline-item.completed::before {
  background-color: var(--success-color);
}

.journey-node-title {
  font-size: 13px;
  font-weight: 750;
  color: var(--text-primary);
  display: flex;
  align-items: center;
  gap: 8px;
}

.journey-node-body {
  margin-top: 6px;
  background: var(--hover-bg);
  border: 1px solid var(--border-color);
  border-radius: 8px;
  padding: 12px;
  font-size: 12px;
  color: var(--text-secondary);
  line-height: 1.4;
}

.comm-log-packet {
  font-family: monospace;
  font-size: 11.5px;
  background-color: #0b0f19;
  color: #38bdf8;
  padding: 8px 12px;
  border-radius: 6px;
  border: 1px solid #1e293b;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
}

.comm-log-packet .arrow {
  color: #f472b6;
  font-weight: 900;
  margin: 0 6px;
}

/* Foundry IQ Power tag */
.foundry-iq-powered-badge {
  background: linear-gradient(135deg, rgba(134, 96, 169, 0.06), rgba(0, 120, 212, 0.04));
  border: 1px solid rgba(134, 96, 169, 0.2);
  border-radius: 8px;
  padding: 12px 16px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 15px;
}

.foundry-iq-powered-badge-text {
  font-size: 12px;
  font-weight: 700;
  color: #8660a9;
  display: flex;
  align-items: center;
  gap: 6px;
}

/* Settings Form & Config blocks */
.settings-grid {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.settings-section-title {
  font-size: 13px;
  font-weight: 750;
  color: var(--text-primary);
  border-bottom: 1.5px solid var(--border-color);
  padding-bottom: 6px;
  margin-bottom: 10px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.settings-option {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 14px;
  background: var(--hover-bg);
  border: 1px solid var(--border-color);
  border-radius: 8px;
  gap: 12px;
}

.settings-option-info {
  display: flex;
  flex-direction: column;
  gap: 2px;
  max-width: 80%;
}

.settings-option-title {
  font-size: 12.5px;
  font-weight: 650;
  color: var(--text-primary);
}

.settings-option-desc {
  font-size: 11px;
  color: var(--text-secondary);
}

