// CertiNexus AI Core Application Controller - Enhanced for hackathon Phase 2
document.addEventListener("DOMContentLoaded", () => {
  // Application State
  const state = {
    currentEmployeeId: "EMP-001",
    activeTab: "dashboard",
    theme: localStorage.getItem("certinexus-theme") || "light",
    quiz: {
      activeQuestionIndex: 0,
      selectedOptionIndex: null,
      isSubmitted: false
    },
    searchQuery: "",
    simulationRunning: false,
    simulationStep: -1,
    simulationStates: {} // map of index -> 'waiting'|'running'|'processing'|'completed'|'message_passing'
  };

  // Cache DOM elements
  const el = {
    body: document.body,
    profileSelector: document.getElementById("profileSelector"),
    profileAvatar: document.getElementById("profileAvatar"),
    topCertIndicator: document.getElementById("topCertIndicator"),
    themeToggle: document.getElementById("themeToggle"),
    searchInput: document.getElementById("searchInput"),
    menuItems: document.querySelectorAll(".menu-item"),
    views: document.querySelectorAll(".page-view"),
    toastContainer: document.getElementById("toastContainer"),
    notificationBtn: document.getElementById("notificationBtn")
  };

  // Initial Sync
  function init() {
    // Sync Theme
    if (state.theme === "dark") {
      el.body.classList.add("dark-theme");
      el.themeToggle.innerText = "☀️";
    } else {
      el.themeToggle.innerText = "🌙";
    }

    // Bind Event Listeners
    setupEventListeners();

    // Initial Render
    renderActiveEmployee();
  }

  // Event Listeners
  function setupEventListeners() {
    // Profile Switcher
    if (el.profileSelector) {
      el.profileSelector.addEventListener("change", (e) => {
        state.currentEmployeeId = e.target.value;
        state.quiz.activeQuestionIndex = 0;
        state.quiz.selectedOptionIndex = null;
        state.quiz.isSubmitted = false;
        
        const emp = window.CertiNexusData.employees[state.currentEmployeeId];
        showToast("Profile Switched", `Active context changed to ${emp.name}`);
        renderActiveEmployee();
      });
    }

    // Theme Toggle
    if (el.themeToggle) {
      el.themeToggle.addEventListener("click", () => {
        if (el.body.classList.contains("dark-theme")) {
          el.body.classList.remove("dark-theme");
          state.theme = "light";
          el.themeToggle.innerText = "🌙";
        } else {
          el.body.classList.add("dark-theme");
          state.theme = "dark";
          el.themeToggle.innerText = "☀️";
        }
        localStorage.setItem("certinexus-theme", state.theme);
        showToast("Theme Updated", `Switched to ${state.theme} mode.`);
        renderActiveEmployee(); 
      });
    }

    // Sidebar Tab Routing
    el.menuItems.forEach(item => {
      item.addEventListener("click", () => {
        const tab = item.getAttribute("data-tab");
        switchTab(tab);
      });
    });

    // Search bar keyup
    if (el.searchInput) {
      el.searchInput.addEventListener("keyup", (e) => {
        state.searchQuery = e.target.value.toLowerCase();
        if (state.activeTab !== "knowledge") {
          switchTab("knowledge");
        }
        renderKnowledgeCenter();
      });
    }

    // Notifications Button Click
    if (el.notificationBtn) {
      el.notificationBtn.addEventListener("click", () => {
        const employee = window.CertiNexusData.employees[state.currentEmployeeId];
        showToast("AI Recommendations Summary", employee.aiRecommendations.join(" | "));
      });
    }
  }

  // Switch tabs
  function switchTab(tabId) {
    state.activeTab = tabId;
    
    // Update active class on sidebar
    el.menuItems.forEach(item => {
      if (item.getAttribute("data-tab") === tabId) {
        item.classList.add("active");
      } else {
        item.classList.remove("active");
      }
    });

    // Toggle view elements
    el.views.forEach(view => {
      if (view.id === `${tabId}View`) {
        view.classList.add("active");
      } else {
        view.classList.remove("active");
      }
    });

    renderTab(tabId);
  }

  // Render current employee data across components
  function renderActiveEmployee() {
    const employee = window.CertiNexusData.employees[state.currentEmployeeId];
    if (!employee) return;

    // Update Avatar icon
    if (el.profileAvatar) {
      el.profileAvatar.innerText = employee.avatar;
    }

    // Update Top Bar Cert progress indicator
    if (el.topCertIndicator) {
      el.topCertIndicator.innerHTML = `
        <div style="display:flex; flex-direction:column; align-items:flex-end; gap:2px; font-family:var(--font-family);">
          <div style="font-size:11px; font-weight:750; color:var(--text-primary);">${employee.certification} Target: ${employee.progress}%</div>
          <div style="width:100px; height:6px; background:var(--border-color); border-radius:3px; overflow:hidden;">
            <div style="width:${employee.progress}%; height:100%; background:var(--accent-color); border-radius:3px;"></div>
          </div>
        </div>
      `;
    }

    // Sync Profile Select Input
    if (el.profileSelector) {
      el.profileSelector.value = employee.id;
    }

    renderTab(state.activeTab);
  }

  // Router dispatcher
  function renderTab(tabId) {
    switch (tabId) {
      case "mission":
        renderExecutiveMissionControl();
        break;
      case "dashboard":
        renderDashboard();
        break;
      case "collaboration":
        renderCollaborationCenter();
        break;
      case "demo":
        renderDemoMode();
        break;
      case "learning":
        renderLearningPath();
        break;
      case "planner":
        renderStudyPlanner();
        break;
      case "assessment":
        renderAssessment();
        break;
      case "command":
        renderTeamCommandCenter();
        break;
      case "manager":
        renderManagerInsights();
        break;
      case "iq":
        renderMicrosoftIQLayers();
        break;
      case "journey":
        renderJourneyMap();
        break;
      case "knowledge":
        renderKnowledgeCenter();
        break;
      case "profile":
        renderUserProfile();
        break;
      case "settings":
        renderSettings();
        break;
    }
  }

  // Helper to generate Agent Reasoning Panel HTML (Strictly Input, Analysis, Decision, Output)
  function getReasoningPanelHtml(agentName, reasoning) {
    if (!reasoning) return "";
    return `
      <div class="reasoning-panel">
        <div class="reasoning-header">
          <div class="reasoning-title">🤖 ${agentName} Reasoning Panel</div>
          <span class="badge badge-info" style="font-size:9.5px;">Live Logic Trace</span>
        </div>
        <div class="reasoning-content-grid">
          <div class="reasoning-block">
            <span class="reasoning-label">Input</span>
            <span class="reasoning-value">${reasoning.input}</span>
          </div>
          <div class="reasoning-block">
            <span class="reasoning-label">Analysis</span>
            <span class="reasoning-value">${reasoning.analysis}</span>
          </div>
          <div class="reasoning-block">
            <span class="reasoning-label">Decision</span>
            <span class="reasoning-value" style="font-weight:700; color:var(--accent-color);">${reasoning.decision}</span>
          </div>
          <div class="reasoning-block">
            <span class="reasoning-label">Output</span>
            <span class="reasoning-value">${reasoning.output}</span>
          </div>
        </div>
      </div>
    `;
  }

  // Helper to generate AI Insight alert cards
  function getAIInsightHtml(insightText) {
    return `
      <div class="ai-insight-card">
        <span class="ai-insight-icon">💡</span>
        <span><strong>AI Insight:</strong> ${insightText}</span>
      </div>
    `;
  }

  // Helper to generate "Why this Recommendation?" diagnostics panel HTML
  function getWhyRecommendationHtml(whyRec) {
    if (!whyRec) return "";
    return `
      <div class="why-rec-card">
        <div class="why-rec-title">🎯 Why this Recommendation?</div>
        <div class="why-rec-grid">
          <div class="why-rec-item">
            <span class="reasoning-label">Diagnostic Metric</span>
            <span class="why-rec-val" style="color:var(--accent-color);">${whyRec.competency}</span>
          </div>
          <div class="why-rec-item">
            <span class="reasoning-label">Current / Target</span>
            <span class="why-rec-val" style="color:var(--text-primary); font-weight:750;">${whyRec.score}% / ${whyRec.target}%</span>
          </div>
          <div class="why-rec-item">
            <span class="reasoning-label">System Confidence</span>
            <span class="why-rec-val" style="color:var(--success-color);">${whyRec.confidence}</span>
          </div>
        </div>
        <div class="why-rec-tip">
          <strong>Agent Guidance:</strong> ${whyRec.recommends}
        </div>
      </div>
    `;
  }

  // VIEW 0: Executive Mission Control View
  function renderExecutiveMissionControl() {
    const employee = window.CertiNexusData.employees[state.currentEmployeeId];
    const container = document.getElementById("missionControlContent");
    if (!container || !employee) return;

    // Check if employee is Prithi J (EMP-001) for exact prompt values, or fallback dynamically
    const isPrithi = employee.id === "EMP-001";
    const name = isPrithi ? "Prithi J" : employee.name;
    const role = employee.role;
    const goal = employee.certification;
    const readiness = isPrithi ? 78 : employee.readinessScore;
    const team = isPrithi ? "Alpha" : (employee.team ? employee.team.replace("Team ", "") : "Alpha");

    const skillGaps = isPrithi ? ["Storage", "Monitoring", "Azure Functions"] : employee.skillGaps.map(s => s.replace(" Azure ", "").replace(" Optimization", ""));
    const studyHours = isPrithi ? 24 : employee.weeklyStudyHours * 2;
    const studyPlan = isPrithi ? "4 Week Study Plan" : "4 Week Adaptive Planner";
    
    const recAction = isPrithi ? "Complete Storage Learning Path" : `Complete ${skillGaps[0] || 'Core'} Learning Path`;
    const recDays = isPrithi ? 7 : Math.round(employee.targetExamDays / 4);
    const passProb = isPrithi ? 84 : employee.passProbability;

    container.innerHTML = `
      <div style="display:flex; flex-direction:column; gap:20px;">
        
        <!-- Top Summary Cards -->
        <div class="grid-layout" style="grid-template-columns: 1fr 1.5fr; gap:20px; align-items:stretch;">
          
          <!-- Employee Profile Widget -->
          <div class="card" style="border-left: 4px solid var(--accent-color);">
            <div class="card-title">👤 Employee Profile</div>
            <div style="display:flex; align-items:center; gap:16px; margin-top:5px;">
              <div class="profile-hero-avatar" style="width:55px; height:55px; font-size:22px; box-shadow:none;">
                ${employee.avatar}
              </div>
              <div style="display:flex; flex-direction:column; gap:3px;">
                <span style="font-size:16px; font-weight:800; color:var(--text-primary);">${name}</span>
                <span style="font-size:12.5px; color:var(--text-secondary); font-weight:600;">${role}</span>
                <span style="font-size:12px; color:var(--accent-color); font-weight:700; margin-top:2px;">Goal: ${goal} | Team ${team}</span>
              </div>
            </div>
            <div style="border-top:1px solid var(--border-color); padding-top:12px; margin-top:5px; display:flex; justify-content:space-between; align-items:center;">
              <span style="font-size:12.5px; font-weight:600; color:var(--text-secondary);">Current Readiness:</span>
              <span style="font-size:20px; font-weight:800; color:var(--warning-color);">${readiness}%</span>
            </div>
          </div>

          <!-- Executive Recommendation Widget -->
          <div class="card" style="background: linear-gradient(135deg, rgba(16, 124, 65, 0.03), rgba(0, 120, 212, 0.02)); border-left: 4px solid var(--success-color);">
            <div class="card-title" style="color:var(--success-color);">👑 Executive Recommendation</div>
            <div class="grid-layout" style="grid-template-columns: repeat(3, 1fr); gap:12px; margin-top:5px;">
              <div class="why-rec-item">
                <span class="reasoning-label">Recommended Action</span>
                <span style="font-size:13.5px; font-weight:750; color:var(--text-primary); line-height:1.3;">${recAction}</span>
              </div>
              <div class="why-rec-item">
                <span class="reasoning-label">Timeline Threshold</span>
                <span style="font-size:13.5px; font-weight:750; color:var(--accent-color);">Attempt Assessment in ${recDays} Days</span>
              </div>
              <div class="why-rec-item">
                <span class="reasoning-label">Predicted Success</span>
                <span style="font-size:13.5px; font-weight:800; color:var(--success-color);">${passProb}% Success Rate</span>
              </div>
            </div>
            <div style="font-size:11.5px; color:var(--text-secondary); border-top:1px solid var(--border-color); padding-top:8px; line-height:1.4;">
              Generated dynamically by comparing competencies against historic pass indicators in Team Alpha.
            </div>
          </div>

        </div>

        <!-- Main Timeline & Log Grid -->
        <div class="grid-layout" style="grid-template-columns: 1.6fr 1.2fr; gap:24px; align-items:stretch;">
          
          <!-- Agent Journey Timeline Tree -->
          <div class="card">
            <div class="card-title">🛣️ Agent Journey Timeline</div>
            
            <div class="journey-timeline-vertical">
              
              <!-- Stage 1 -->
              <div class="journey-timeline-item completed">
                <div class="journey-node-title">🏁 Goal Received</div>
                <div class="journey-node-body">
                  Target certification path set to <strong>${goal} (${employee.certName})</strong>. Standard readiness baseline set to 40%.
                </div>
              </div>

              <!-- Stage 2 -->
              <div class="journey-timeline-item active">
                <div class="journey-node-title">🗺️ Learning Path Agent</div>
                <div class="journey-node-body">
                  <strong>Identified Skill Gaps:</strong>
                  <div style="display:flex; gap:6px; margin-top:6px;">
                    ${skillGaps.map(g => `<span class="badge badge-danger" style="font-size:10px;">${g}</span>`).join("")}
                  </div>
                </div>
              </div>

              <!-- Stage 3 -->
              <div class="journey-timeline-item active">
                <div class="journey-node-title">📅 Study Planner Agent</div>
                <div class="journey-node-body">
                  <strong>Generated Schedule Output:</strong>
                  <ul style="margin:4px 0 0 16px; padding:0; list-style-type:disc; font-size:12px; display:flex; flex-direction:column; gap:3px;">
                    <li>${studyPlan} compiled</li>
                    <li>${studyHours} Study Hours allocated per week</li>
                    <li>Weekly milestones synchronized with calendar</li>
                  </ul>
                </div>
              </div>

              <!-- Stage 4 -->
              <div class="journey-timeline-item active">
                <div class="journey-node-title">✍️ Assessment Agent</div>
                <div class="journey-node-body">
                  <strong>Diagnostic Evaluation:</strong>
                  <ul style="margin:4px 0 0 16px; padding:0; list-style-type:disc; font-size:12px; display:flex; flex-direction:column; gap:3px;">
                    <li>Calculated Readiness Score: <strong>${readiness}%</strong></li>
                    <li>Identified Weak Areas: <strong>${skillGaps[0] || 'None'}</strong></li>
                    <li>Confidence Level: <strong>${employee.confidenceLevel}</strong></li>
                  </ul>
                </div>
              </div>

              <!-- Stage 5 -->
              <div class="journey-timeline-item active">
                <div class="journey-node-title">📈 Manager Insights Agent</div>
                <div class="journey-node-body">
                  <strong>Workforce Optimization Output:</strong>
                  <ul style="margin:4px 0 0 16px; padding:0; list-style-type:disc; font-size:12px; display:flex; flex-direction:column; gap:3px;">
                    <li>Risk Level set to: <span class="badge ${readiness >= 75 ? 'badge-success' : 'badge-warning'}" style="font-size:9.5px; padding:1px 4px;">Low Risk</span></li>
                    <li>Certification Forecast: <strong>${employee.expectedDays} Days</strong></li>
                    <li>Team Impact rating: <strong>High operational velocity contribution</strong></li>
                  </ul>
                </div>
              </div>

            </div>

          </div>

          <!-- Agent Communication Log -->
          <div class="card" style="justify-content:space-between;">
            <div>
              <div class="card-title">✉️ Agent Communication Log</div>
              <p style="font-size:12px; color:var(--text-secondary); margin-top:4.5px; margin-bottom:15px; line-height:1.4;">
                Real-time messaging log capturing JSON packets passing between collaborating agent nodes.
              </p>
              
              <div style="display:flex; flex-direction:column; gap:10px;">
                
                <div class="comm-log-packet">
                  <div>
                    <strong style="color:var(--accent-color);">Learning Path Agent</strong>
                    <span class="arrow">→</span>
                    <span>Study Planner</span>
                  </div>
                  <div style="font-size:10px; color:var(--text-secondary); margin-top:2px;">Sent skill gaps checklist</div>
                </div>

                <div class="comm-log-packet">
                  <div>
                    <strong style="color:var(--accent-color);">Study Planner Agent</strong>
                    <span class="arrow">→</span>
                    <span>Assessment Agent</span>
                  </div>
                  <div style="font-size:10px; color:var(--text-secondary); margin-top:2px;">Sent study schedule calendar</div>
                </div>

                <div class="comm-log-packet">
                  <div>
                    <strong style="color:var(--accent-color);">Assessment Agent</strong>
                    <span class="arrow">→</span>
                    <span>Manager Insights</span>
                  </div>
                  <div style="font-size:10px; color:var(--text-secondary); margin-top:2px;">Sent readiness index: ${readiness}%</div>
                </div>

                <div class="comm-log-packet">
                  <div>
                    <strong style="color:var(--accent-color);">Manager Insights Agent</strong>
                    <span class="arrow">→</span>
                    <span>Workforce DB</span>
                  </div>
                  <div style="font-size:10px; color:var(--text-secondary); margin-top:2px;">Updated workforce analytics dashboard</div>
                </div>

              </div>
            </div>

            <!-- Dynamic simulation quick trigger -->
            <div style="border-top:1px solid var(--border-color); padding-top:15px; margin-top:15px; display:flex; flex-direction:column; gap:10px;">
              <span style="font-size:11.5px; color:var(--text-secondary); line-height:1.4;">
                To trace this lifecycle step-by-step with console logging, run the orchestrator.
              </span>
              <button class="btn btn-secondary" onclick="window.CertiNexusApp.switchTab('demo')" style="width:100%;">
                Launch Demo orchestrator
              </button>
            </div>

          </div>

        </div>

      </div>
    `;
  }

  // VIEW 1: Dashboard View (Summary, Pipelines, Risks)
  function renderDashboard() {
    const employee = window.CertiNexusData.employees[state.currentEmployeeId];
    const view = document.getElementById("dashboardView");
    if (!view || !employee) return;

    // 1. Render AI Executive Summary Card at the top of the dashboard
    const summaryCardContainer = document.getElementById("dashExecutiveSummaryContainer");
    if (summaryCardContainer) {
      summaryCardContainer.innerHTML = `
        <div class="exec-summary-card">
          <div class="exec-summary-header">
            <span class="exec-summary-title">🧠 AI Executive Briefing Summary</span>
            <span class="exec-summary-meta">Generated by CertiNexus Multi-Agent Intelligence System</span>
          </div>
          <div class="exec-summary-grid">
            <div class="exec-summary-stat-box">
              <span class="exec-summary-stat-label">Current Readiness Rating</span>
              <span class="exec-summary-stat-val" style="color:var(--warning-color);">${employee.readinessScore}%</span>
            </div>
            <div class="exec-summary-stat-box">
              <span class="exec-summary-stat-label">Primary Skill Risk</span>
              <span class="exec-summary-stat-val" style="color:var(--danger-color);">Storage Optimization</span>
            </div>
            <div class="exec-summary-stat-box">
              <span class="exec-summary-stat-label">Est. Readiness Complete</span>
              <span class="exec-summary-stat-val">${employee.expectedDays} Days</span>
            </div>
            <div class="exec-summary-stat-box">
              <span class="exec-summary-stat-label">Pass Probability</span>
              <span class="exec-summary-stat-val" style="color:var(--success-color);">${employee.passProbability}%</span>
            </div>
          </div>
          <div class="exec-summary-action">
            <strong>Recommended Action:</strong> Complete the designated Azure Storage Optimization study path in your schedule before attempting your final practice assessment triggers.
          </div>
        </div>
      `;
    }

    // Progress percentage
    const progressFill = document.getElementById("dashProgressFill");
    const progressText = document.getElementById("dashProgressText");
    if (progressFill) progressFill.style.width = `${employee.progress}%`;
    if (progressText) progressText.innerText = `${employee.progress}%`;

    // Study Hours
    const studyHoursValue = document.getElementById("dashStudyHoursValue");
    if (studyHoursValue) studyHoursValue.innerText = employee.weeklyStudyHours;

    // Upcoming Milestones
    const milestoneList = document.getElementById("dashMilestonesList");
    if (milestoneList) {
      milestoneList.innerHTML = employee.milestones.map(m => `
        <div class="list-item">
          <div class="list-item-left">
            <span style="font-size:14px;">${m.status === 'completed' ? '✅' : m.status === 'in-progress' ? '⚡' : '📅'}</span>
            <span style="font-weight:600; color:var(--text-primary);">${m.name}</span>
          </div>
          <span class="badge ${m.status === 'completed' ? 'badge-success' : m.status === 'in-progress' ? 'badge-warning' : 'badge-info'}">${m.status}</span>
        </div>
      `).join("");
    }

    // AI Insight on Dashboard
    const dashboardInsight = document.getElementById("dashAIInsightBox");
    if (dashboardInsight) {
      dashboardInsight.innerHTML = getAIInsightHtml("Team Alpha is projected to achieve 90% certification readiness within two weeks.");
    }

    // Skill Gap Heatmap summary on Dashboard
    window.CertiNexusCharts.renderSkillHeatmap("dashSkillGapList");

    // Render Pipeline progression Widget
    window.CertiNexusCharts.renderPipelineWidget("dashPipelineWidget");

    // Render workforce Risk analysis segments
    window.CertiNexusCharts.renderRiskAnalysis("dashRiskAnalysisWidget");

    // Render Timeline in Dashboard Panel
    const timelineContainer = document.getElementById("dashTimelineContainer");
    if (timelineContainer) {
      timelineContainer.innerHTML = `
        <div class="activity-timeline">
          <div class="timeline-event completed">
            <span class="timeline-event-time">09:01 AM</span>
            <div class="timeline-event-title">🗺️ Learning Path Agent</div>
            <div class="timeline-event-desc">Scanned syllabus. Gaps identified: ${employee.skillGaps.slice(0,2).join(", ")}.</div>
          </div>
          <div class="timeline-event completed">
            <span class="timeline-event-time">09:02 AM</span>
            <div class="timeline-event-title">📅 Study Planner Agent</div>
            <div class="timeline-event-desc">Constructed 4-week calendar slots around ${employee.meetingHours}h meetings.</div>
          </div>
          <div class="timeline-event completed">
            <span class="timeline-event-time">09:03 AM</span>
            <div class="timeline-event-title">✍️ Assessment Agent</div>
            <div class="timeline-event-desc">Computed composite Readiness Rating at ${employee.readinessScore}%.</div>
          </div>
          <div class="timeline-event">
            <span class="timeline-event-time">09:04 AM</span>
            <div class="timeline-event-title">📈 Manager Insights Agent</div>
            <div class="timeline-event-desc">Aggregated team metrics. Pass probability set to ${employee.passProbability || 80}%.</div>
          </div>
        </div>
      `;
    }

    // Draw SVG Gauge for Readiness Score
    window.CertiNexusCharts.renderReadinessGauge("dashReadinessGauge", employee.readinessScore);
  }

  // VIEW 2: Agent Collaboration Center
  function renderCollaborationCenter() {
    const employee = window.CertiNexusData.employees[state.currentEmployeeId];
    const container = document.getElementById("collaborationContent");
    if (!container || !employee) return;

    const lp = window.CertiNexusAgents.learningPathAgent.run({
      role: employee.role,
      certification: employee.certification,
      experience: employee.experience
    });

    const sp = window.CertiNexusAgents.studyPlannerAgent.run({
      meetingHours: employee.meetingHours,
      focusHours: employee.focusHours,
      targetExamDays: employee.targetExamDays
    }, lp.roadmap);

    const as = window.CertiNexusAgents.assessmentAgent.run({
      certification: employee.certification,
      competencies: employee.competencies
    });

    const mi = window.CertiNexusAgents.managerInsightsAgent.run(
      employee.team || "Team Alpha",
      window.CertiNexusData.teams,
      window.CertiNexusData.employees
    );

    container.innerHTML = `
      <div style="display:flex; flex-direction:column; gap:20px;">
        <!-- AI Insight Card -->
        ${getAIInsightHtml("Multi-agent pipelines synchronize output datasets dynamically across task triggers.")}

        <div class="grid-layout" style="grid-template-columns: 1.2fr 1.8fr; gap:24px; align-items:stretch;">
          <!-- Left Panel: Executing Activity Timeline -->
          <div class="card">
            <div class="card-title">🕒 Real-Time Agent Execution History</div>
            <div class="activity-timeline" style="margin-top:10px;">
              <div class="timeline-event completed">
                <span class="timeline-event-time">10:15 AM</span>
                <div class="timeline-event-title">🗺️ Learning Path curator</div>
                <div class="timeline-event-desc">Identified required skill gaps: ${employee.skillGaps.slice(0, 2).join(", ")}.</div>
              </div>
              <div class="timeline-event completed">
                <span class="timeline-event-time">10:16 AM</span>
                <div class="timeline-event-title">📅 Study Planner Agent</div>
                <div class="timeline-event-desc">Completed weekly optimization. Shifting review hours to morning focus windows.</div>
              </div>
              <div class="timeline-event completed">
                <span class="timeline-event-time">10:18 AM</span>
                <div class="timeline-event-title">✍️ Assessment Agent</div>
                <div class="timeline-event-desc">Assembled practice set. Compiling scoring breakdown.</div>
              </div>
              <div class="timeline-event">
                <span class="timeline-event-time">10:20 AM</span>
                <div class="timeline-event-title">📈 Manager Insights Agent</div>
                <div class="timeline-event-desc">Synchronized workforce statistics database. average team readiness set to ${mi.avgReadiness}%.</div>
              </div>
            </div>
          </div>

          <!-- Right Panel: Visual Orchestration Flow Map -->
          <div class="card" style="align-items:center; position:relative;">
            <div class="card-title" style="align-self:flex-start;">🤖 Orchestration Visualizer Centerpiece</div>
            <div class="flow-diagram-container" style="width:100%; margin-top:10px;">
              
              <!-- Curator -->
              <div class="list-item" style="width:100%; border: 1.5px solid var(--border-color); background:var(--bg-card); position:relative;">
                <div style="display:flex; justify-content:space-between; align-items:center; width:100%;">
                  <span style="font-weight:700;">🗺️ Learning Path Curator</span>
                  <span class="badge badge-success">Completed ✅</span>
                </div>
              </div>
              
              <div class="flow-connector active" style="height:35px; display:flex; align-items:center; justify-content:center;">
                <span class="message-envelope-tooltip" style="opacity:1;">Send: AZ-204 Gaps ✉️</span>
              </div>

              <!-- Planner -->
              <div class="list-item" style="width:100%; border: 1.5px solid var(--border-color); background:var(--bg-card); position:relative;">
                <div style="display:flex; justify-content:space-between; align-items:center; width:100%;">
                  <span style="font-weight:700;">📅 Study Planner Agent</span>
                  <span class="badge badge-success">Completed ✅</span>
                </div>
              </div>

              <div class="flow-connector active" style="height:35px; display:flex; align-items:center; justify-content:center;">
                <span class="message-envelope-tooltip" style="opacity:1;">Send: 4-Wk Schedule ✉️</span>
              </div>

              <!-- Assessment -->
              <div class="list-item" style="width:100%; border: 1.5px solid var(--border-color); background:var(--bg-card); position:relative;">
                <div style="display:flex; justify-content:space-between; align-items:center; width:100%;">
                  <span style="font-weight:700;">✍️ Assessment Agent</span>
                  <span class="badge badge-success">Completed ✅</span>
                </div>
              </div>

              <div class="flow-connector active" style="height:35px; display:flex; align-items:center; justify-content:center;">
                <span class="message-envelope-tooltip" style="opacity:1;">Send: Readiness 78% ✉️</span>
              </div>

              <!-- Manager -->
              <div class="list-item" style="width:100%; border: 1.5px solid var(--border-color); background:var(--bg-card); position:relative;">
                <div style="display:flex; justify-content:space-between; align-items:center; width:100%;">
                  <span style="font-weight:700;">📈 Manager Insights Agent</span>
                  <span class="badge badge-info">Monitoring 🔄</span>
                </div>
              </div>

            </div>
          </div>
        </div>

        <!-- Joint Reasoning Panels Output list -->
        <div class="card">
          <div class="card-title">🔬 Collaborative Agent Diagnostics Matrix</div>
          <div style="display:flex; flex-direction:column; gap:16px;">
            ${getReasoningPanelHtml("Learning Path Curator Agent", lp.reasoning)}
            ${getReasoningPanelHtml("Study Planner Agent", sp.reasoning)}
            ${getReasoningPanelHtml("Assessment Agent", as.reasoning)}
            ${getReasoningPanelHtml("Manager Insights Agent", mi.reasoning)}
          </div>
        </div>
      </div>
    `;
  }

  // VIEW 3: Dedicated Demo Mode (Multi-state animation orchestrator)
  function renderDemoMode() {
    const container = document.getElementById("demoContent");
    if (!container) return;

    const employee = window.CertiNexusData.employees[state.currentEmployeeId];

    container.innerHTML = `
      <div style="display:flex; flex-direction:column; gap:20px;">
        <!-- Control Card -->
        <div class="card" style="background: linear-gradient(90deg, var(--accent-light), rgba(134, 96, 169, 0.08)); border-color: var(--accent-color); flex-direction:row; align-items:center; justify-content:space-between; padding:20px;">
          <div style="display:flex; flex-direction:column; gap:4px; max-width:600px;">
            <h2 style="font-size:16px; font-weight:800;">🚀 Full Multi-Agent Simulation Command</h2>
            <p style="font-size:13px; color:var(--text-secondary); margin-top:2px;">
              Initiate the orchestrator. Watch agents execute sequentially through Waiting, Running, Processing, and Completed states. Glowing envelopes carry outputs along lines.
            </p>
          </div>
          <button id="btnStartDemoSimulation" class="btn btn-primary" ${state.simulationRunning ? 'disabled' : ''}>
            ${state.simulationRunning ? 'Simulation Running...' : 'Run Full Multi-Agent Simulation'}
          </button>
        </div>

        <div style="display:flex; gap:24px; align-items:stretch;">
          <!-- Node Grid Map (WOW animation container) -->
          <div class="card" style="flex:1.6; align-items:center; padding:30px; position:relative;">
            <div class="flow-diagram-container" style="width:100%;">
              
              <!-- Input Payload -->
              <div class="list-item" style="border: 2px solid var(--border-color); width:100%; max-width:380px; background:var(--hover-bg); justify-content:center; text-align:center;">
                <div>
                  <div style="font-size:10px; font-weight:700; color:var(--text-secondary); text-transform:uppercase;">Simulation Target Profile</div>
                  <div style="font-size:13.5px; font-weight:700; color:var(--text-primary); margin-top:2px;">
                    ${employee.name} (${employee.role}) &gt; Target: ${employee.certification}
                  </div>
                </div>
              </div>
              
              <!-- Connector Line 1 -->
              <div class="flow-connector ${state.simulationStep >= 0 ? 'active' : ''}" style="height:35px; display:flex; align-items:center; justify-content:center; position:relative;">
                ${state.simulationStates[0] === 'message_passing' 
                  ? `<span class="message-envelope-tooltip">Pass: Cloud Role Gaps ✉️</span>` 
                  : ''
                }
              </div>

              <!-- Node 2: Curator -->
              <div class="flow-step-node ${state.simulationStep === 0 ? 'active' : ''} ${state.simulationStep > 0 ? 'completed' : ''}" style="width:100%; max-width:380px;">
                <div class="flow-step-node-header">
                  <div class="flow-step-info">
                    <div class="flow-step-icon">🗺️</div>
                    <div>
                      <div class="flow-step-title">Learning Path curator</div>
                      <div class="flow-step-role">Foundry IQ grounded Syllabus</div>
                    </div>
                  </div>
                  <span class="badge ${state.simulationStep === 0 ? 'badge-warning' : state.simulationStep > 0 ? 'badge-success' : 'badge-info'}" style="display:flex; align-items:center; gap:5px;">
                    ${state.simulationStates[0] === 'running' ? '<span class="status-indicator-spinner"></span> Running' :
                      state.simulationStates[0] === 'processing' ? '⚡ Processing' :
                      state.simulationStep > 0 ? 'Completed ✅' : 'Waiting'
                    }
                  </span>
                </div>
                ${state.simulationStep === 0 ? `<div class="flow-step-log" id="demo-curator-log"></div>` : ""}
              </div>
              
              <!-- Connector Line 2 -->
              <div class="flow-connector ${state.simulationStep >= 1 ? 'active' : ''}" style="height:35px; display:flex; align-items:center; justify-content:center; position:relative;">
                ${state.simulationStates[1] === 'message_passing' 
                  ? `<span class="message-envelope-tooltip">Pass: Functions, Storage, Monitoring ✉️</span>` 
                  : ''
                }
              </div>

              <!-- Node 3: Planner -->
              <div class="flow-step-node ${state.simulationStep === 1 ? 'active' : ''} ${state.simulationStep > 1 ? 'completed' : ''}" style="width:100%; max-width:380px;">
                <div class="flow-step-node-header">
                  <div class="flow-step-info">
                    <div class="flow-step-icon">📅</div>
                    <div>
                      <div class="flow-step-title">Study Planner Agent</div>
                      <div class="flow-step-role">Work IQ Outlook optimization</div>
                    </div>
                  </div>
                  <span class="badge ${state.simulationStep === 1 ? 'badge-warning' : state.simulationStep > 1 ? 'badge-success' : 'badge-info'}" style="display:flex; align-items:center; gap:5px;">
                    ${state.simulationStates[1] === 'running' ? '<span class="status-indicator-spinner"></span> Running' :
                      state.simulationStates[1] === 'processing' ? '⚡ Processing' :
                      state.simulationStep > 1 ? 'Completed ✅' : 'Waiting'
                    }
                  </span>
                </div>
                ${state.simulationStep === 1 ? `<div class="flow-step-log" id="demo-planner-log"></div>` : ""}
              </div>
              
              <!-- Connector Line 3 -->
              <div class="flow-connector ${state.simulationStep >= 2 ? 'active' : ''}" style="height:35px; display:flex; align-items:center; justify-content:center; position:relative;">
                ${state.simulationStates[2] === 'message_passing' 
                  ? `<span class="message-envelope-tooltip">Pass: 4-Week Study Schedule ✉️</span>` 
                  : ''
                }
              </div>

              <!-- Node 4: Assessment -->
              <div class="flow-step-node ${state.simulationStep === 2 ? 'active' : ''} ${state.simulationStep > 2 ? 'completed' : ''}" style="width:100%; max-width:380px;">
                <div class="flow-step-node-header">
                  <div class="flow-step-info">
                    <div class="flow-step-icon">✍️</div>
                    <div>
                      <div class="flow-step-title">Assessment Agent</div>
                      <div class="flow-step-role">Competency diagnostics</div>
                    </div>
                  </div>
                  <span class="badge ${state.simulationStep === 2 ? 'badge-warning' : state.simulationStep > 2 ? 'badge-success' : 'badge-info'}" style="display:flex; align-items:center; gap:5px;">
                    ${state.simulationStates[2] === 'running' ? '<span class="status-indicator-spinner"></span> Running' :
                      state.simulationStates[2] === 'processing' ? '⚡ Processing' :
                      state.simulationStep > 2 ? 'Completed ✅' : 'Waiting'
                    }
                  </span>
                </div>
                ${state.simulationStep === 2 ? `<div class="flow-step-log" id="demo-assessment-log"></div>` : ""}
              </div>
              
              <!-- Connector Line 4 -->
              <div class="flow-connector ${state.simulationStep >= 3 ? 'active' : ''}" style="height:35px; display:flex; align-items:center; justify-content:center; position:relative;">
                ${state.simulationStates[3] === 'message_passing' 
                  ? `<span class="message-envelope-tooltip">Pass: Readiness Score 78% ✉️</span>` 
                  : ''
                }
              </div>

              <!-- Node 5: Manager -->
              <div class="flow-step-node ${state.simulationStep === 3 ? 'active' : ''} ${state.simulationStep > 3 ? 'completed' : ''}" style="width:100%; max-width:380px;">
                <div class="flow-step-node-header">
                  <div class="flow-step-info">
                    <div class="flow-step-icon">📈</div>
                    <div>
                      <div class="flow-step-title">Manager Insights Agent</div>
                      <div class="flow-step-role">Fabric IQ Business report</div>
                    </div>
                  </div>
                  <span class="badge ${state.simulationStep === 3 ? 'badge-warning' : state.simulationStep > 3 ? 'badge-success' : 'badge-info'}" style="display:flex; align-items:center; gap:5px;">
                    ${state.simulationStates[3] === 'running' ? '<span class="status-indicator-spinner"></span> Running' :
                      state.simulationStates[3] === 'processing' ? '⚡ Processing' :
                      state.simulationStep > 3 ? 'Completed ✅' : 'Waiting'
                    }
                  </span>
                </div>
                ${state.simulationStep === 3 ? `<div class="flow-step-log" id="demo-manager-log"></div>` : ""}
              </div>

            </div>
          </div>

          <!-- Console monitor -->
          <div class="card" style="flex:1;">
            <div class="card-title">⚡ Live Pipeline Data Streams</div>
            <div style="font-family:monospace; background-color:#0d1117; color:#39ff14; padding:16px; border-radius:8px; flex:1; overflow-y:auto; min-height:400px; font-size:12px;" id="demoConsoleMonitor">
              <div style="color:#8b949e;">[Monitor offline. Start Demo above to record multi-agent transactions.]</div>
            </div>
            <div id="demoResultsButtonPanel" style="display:none; margin-top:10px;">
              <button id="btnDemoViewResults" class="btn btn-primary" style="width:100%;">View Results on Dashboard</button>
            </div>
          </div>
        </div>
      </div>
    `;

    // Start simulation action
    const startSimBtn = document.getElementById("btnStartDemoSimulation");
    if (startSimBtn) {
      startSimBtn.addEventListener("click", () => {
        runWorkflowDemoSimulationEnhanced(employee);
      });
    }
  }

  // Enhanced Demo simulator flow with specific Running -> Processing -> Completed lifecycle updates
  function runWorkflowDemoSimulationEnhanced(employee) {
    state.simulationRunning = true;
    state.simulationStep = 0;
    state.simulationStates = {};
    renderDemoMode();

    const monitor = document.getElementById("demoConsoleMonitor");
    if (monitor) {
      monitor.innerHTML = `<div style="color:#39ff14;">[HANDSHAKE] Contacting Foundry, Fabric, and Work IQ layers... Connected.</div>`;
    }

    // Call dynamic orchestrator simulation
    window.CertiNexusAgents.runSimulation({
      name: employee.name,
      role: employee.role,
      certification: employee.certification,
      experience: employee.experience,
      meetingHours: employee.meetingHours,
      focusHours: employee.focusHours,
      targetExamDays: employee.targetExamDays,
      competencies: employee.competencies
    }, (stepIdx, stateName, stepInfo, stateLabel) => {
      // State Update Callback
      state.simulationStep = stepIdx;
      state.simulationStates[stepIdx] = stateName;
      renderDemoMode(); 

      const mon = document.getElementById("demoConsoleMonitor");
      const subLog = document.getElementById(`demo-${stepInfo.id}-log`);

      if (mon) {
        const wrap = document.createElement("div");
        wrap.style.marginBottom = "4px";
        wrap.style.color = stateName === "completed" ? "#34d399" : stateName === "message_passing" ? "#f472b6" : "#39ff14";
        wrap.innerText = `[${stepInfo.title}] [${stateLabel}] ${stateName === 'message_passing' ? 'Data transmitted: ' + stepInfo.outputPayload : 'Initializing step...'}`;
        mon.appendChild(wrap);
        mon.scrollTop = mon.scrollHeight;
      }

      // If processing, print logs inside the node
      if (stateName === "processing" && subLog) {
        stepInfo.logLines.forEach((lineText, lIdx) => {
          setTimeout(() => {
            const l = document.createElement("div");
            l.className = "agent-console-line";
            l.innerText = `> ${lineText}`;
            subLog.appendChild(l);
            subLog.scrollTop = subLog.scrollHeight;
          }, lIdx * 200);
        });
      }

    }, (finalOutputs) => {
      // Simulation Complete Callback
      state.simulationRunning = false;
      state.simulationStep = 4;
      renderDemoMode();

      const mon = document.getElementById("demoConsoleMonitor");
      if (mon) {
        const wrap = document.createElement("div");
        wrap.style.marginTop = "10px";
        wrap.style.color = "#a7f3d0";
        wrap.style.fontWeight = "bold";
        wrap.innerText = "[SUCCESS] Coordinated multi-agent execution finished. Global analytics refreshed.";
        mon.appendChild(wrap);
        mon.scrollTop = mon.scrollHeight;
      }

      const btnPanel = document.getElementById("demoResultsButtonPanel");
      if (btnPanel) {
        btnPanel.style.display = "block";
        const viewResBtn = document.getElementById("btnDemoViewResults");
        if (viewResBtn) {
          viewResBtn.addEventListener("click", () => {
            switchTab("dashboard");
          });
        }
      }

      showToast("Simulation Finished!", "Workforce dashboard data matrices updated.");
    });
  }

  // VIEW 4: Learning Path Curator Agent View (with Reasoning & Insight)
  function renderLearningPath() {
    const employee = window.CertiNexusData.employees[state.currentEmployeeId];
    const container = document.getElementById("learningPathContent");
    if (!container || !employee) return;

    const outputs = window.CertiNexusAgents.learningPathAgent.run({
      role: employee.role,
      certification: employee.certification,
      experience: employee.experience
    });

    container.innerHTML = `
      <div style="display:flex; flex-direction:column; gap:20px;">
        <!-- Strictly structured Agent Reasoning Panel -->
        ${getReasoningPanelHtml("Learning Path Curator Agent", outputs.reasoning)}

        <!-- AI Insight Alert Card -->
        ${getAIInsightHtml("Storage competency remains the strongest predictor of AZ-204 success.")}

        <!-- Why this Recommendation Diagnostics Panel -->
        ${getWhyRecommendationHtml(outputs.whyRecommendation)}

        <!-- Form configurator -->
        <div class="card">
          <div class="card-title">🗺️ Learning Path Curator Configurator</div>
          <div class="grid-layout" style="grid-template-columns: repeat(3, 1fr); gap:15px;">
            <div class="form-group">
              <label class="form-label">Job Role</label>
              <input type="text" class="form-input" id="lpRole" value="${employee.role}" readonly>
            </div>
            <div class="form-group">
              <label class="form-label">Certification Goal</label>
              <input type="text" class="form-input" id="lpCert" value="${employee.certification}" readonly>
            </div>
            <div class="form-group">
              <label class="form-label">Experience Level</label>
              <input type="text" class="form-input" id="lpExp" value="${employee.experience}" readonly>
            </div>
          </div>
        </div>

        <div class="grid-layout" style="grid-template-columns: 1.2fr 1fr; gap:24px;">
          <!-- Timeline Roadmap -->
          <div class="card">
            <div class="card-title">📅 Week-by-Week Study Roadmap</div>
            <div class="roadmap-timeline">
              ${outputs.roadmap.map(node => `
                <div class="roadmap-node">
                  <div class="roadmap-node-week">${node.week}</div>
                  <div class="roadmap-node-topic">${node.topic}</div>
                  <div class="roadmap-node-details">${node.details}</div>
                </div>
              `).join("")}
            </div>
          </div>

          <!-- Skills & Strengths/Weaknesses -->
          <div style="display:flex; flex-direction:column; gap:20px;">
            <div class="card">
              <div class="card-title">⚡ Skill Diagnostic</div>
              <div style="display:flex; flex-direction:column; gap:12px;">
                <div>
                  <div class="form-label" style="margin-bottom:6px;">Required Skills</div>
                  <div style="display:flex; flex-wrap:wrap; gap:6px;">
                    ${outputs.skills.map(s => `<span class="badge badge-info">${s}</span>`).join("")}
                  </div>
                </div>
                <div>
                  <div class="form-label" style="margin-bottom:4px;">Core Strengths</div>
                  <div style="font-size:12.5px; color:var(--text-secondary); line-height:1.4;">${outputs.strengths}</div>
                </div>
                <div>
                  <div class="form-label" style="margin-bottom:4px;">Identified Deficiencies</div>
                  <div style="font-size:12.5px; color:var(--text-secondary); line-height:1.4;">${outputs.weaknesses}</div>
                </div>
              </div>
            </div>

            <div class="card">
              <div class="card-title">📚 Recommended Resource Cards</div>
              <div class="item-list">
                ${outputs.resources.map(res => `
                  <div class="list-item" style="flex-direction:column; align-items:flex-start; gap:4px; padding:12px;">
                    <div style="display:flex; width:100%; justify-content:space-between; align-items:center;">
                      <span style="font-weight:700; font-size:13px; color:var(--accent-color);">${res.title}</span>
                      <span class="badge badge-info" style="font-size:9.5px;">${res.duration}</span>
                    </div>
                    <span style="font-size:11.5px; color:var(--text-secondary);">${res.type}</span>
                  </div>
                `).join("")}
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  // VIEW 5: Study Planner Agent View (with Reasoning & Insight)
  function renderStudyPlanner() {
    const employee = window.CertiNexusData.employees[state.currentEmployeeId];
    const container = document.getElementById("studyPlannerContent");
    if (!container || !employee) return;

    const roadmap = window.CertiNexusAgents.learningPathAgent.run({
      role: employee.role,
      certification: employee.certification,
      experience: employee.experience
    }).roadmap;

    const outputs = window.CertiNexusAgents.studyPlannerAgent.run({
      meetingHours: employee.meetingHours,
      focusHours: employee.focusHours,
      targetExamDays: employee.targetExamDays
    }, roadmap);

    container.innerHTML = `
      <div style="display:flex; flex-direction:column; gap:20px;">
        <!-- Strictly structured Agent Reasoning Panel -->
        ${getReasoningPanelHtml("Study Planner Agent", outputs.reasoning)}

        <!-- AI Insight Alert Card -->
        ${getAIInsightHtml("Learners completing more than 20 study hours show significantly higher certification success.")}

        <!-- Why this Recommendation Diagnostics Panel -->
        ${getWhyRecommendationHtml(outputs.whyRecommendation)}

        <!-- Configurator Controls -->
        <div class="card">
          <div class="card-title">📅 Adaptive Study Planner Configurations</div>
          <form id="studyPlannerForm" class="grid-layout" style="grid-template-columns: repeat(4, 1fr); gap:15px; align-items:flex-end;">
            <div class="form-group">
              <label class="form-label">Meeting Hours / Week</label>
              <input type="number" class="form-input" id="spMeetings" value="${employee.meetingHours}" min="0" max="40">
            </div>
            <div class="form-group">
              <label class="form-label">Focus Hours / Week</label>
              <input type="number" class="form-input" id="spFocus" value="${employee.focusHours}" min="0" max="40">
            </div>
            <div class="form-group">
              <label class="form-label">Target Exam (Days)</label>
              <input type="number" class="form-input" id="spDays" value="${employee.targetExamDays}" min="1">
            </div>
            <div>
              <button type="submit" class="btn btn-primary" style="width:100%;">Optimize Calendar</button>
            </div>
          </form>
        </div>

        <!-- Adaptive warning notice -->
        ${outputs.adaptiveWarning ? `
          <div class="ai-card card" style="padding:16px;">
            <div class="ai-header">🤖 Adaptive Planning Notification</div>
            <div class="ai-reasoning">${outputs.adaptiveWarning}</div>
          </div>
        ` : `
          <div class="card" style="padding:14px; border-color:var(--success-color); background:rgba(16, 124, 65, 0.04); display:flex; flex-direction:row; align-items:center; gap:10px;">
            <span style="font-size:16px;">✅</span>
            <span style="font-size:12.5px; font-weight:600; color:var(--success-color);">Calendar optimized! Meeting load is below thresholds. No focus shifts required.</span>
          </div>
        `}

        <!-- Calendar Grid -->
        <div class="card">
          <div class="card-title">📅 Weekly Study Schedule (Optimized)</div>
          <div class="calendar-grid">
            ${outputs.calendarEvents.map(event => `
              <div class="calendar-day-card" style="${event.tag === 'Shifted Focus' ? 'border: 1px dashed var(--warning-color); background: rgba(216, 59, 1, 0.04)' : ''}">
                <div>
                  <div style="display:flex; justify-content:space-between; align-items:center; width:100%;">
                    <span class="calendar-day-name">${event.day}</span>
                    <span class="badge ${event.tag === 'Shifted Focus' ? 'badge-warning' : 'badge-info'}" style="font-size:8px; padding:2px 4px;">${event.tag}</span>
                  </div>
                  <div class="calendar-day-task">${event.title}</div>
                </div>
                <div class="calendar-day-time">
                  <span>⏰</span>
                  <span>${event.time}</span>
                </div>
              </div>
            `).join("")}
          </div>
        </div>
      </div>
    `;

    // Setup form submit listener
    const form = document.getElementById("studyPlannerForm");
    if (form) {
      form.addEventListener("submit", (e) => {
        e.preventDefault();
        const meetings = parseInt(document.getElementById("spMeetings").value);
        const focus = parseInt(document.getElementById("spFocus").value);
        const days = parseInt(document.getElementById("spDays").value);

        employee.meetingHours = meetings;
        employee.focusHours = focus;
        employee.targetExamDays = days;

        if (meetings > 18) {
          employee.aiRecommendations = [
            "Schedule adjusted because your meeting load (" + meetings + " hours) exceeded recommended focus thresholds.",
            "Focus on Azure Storage this week. It is currently your lowest-scoring competency (60%)."
          ];
        } else {
          employee.aiRecommendations = [
            "Focus on Azure Storage this week. It is currently your lowest-scoring competency (60%).",
            "Maintain current high study pace to secure target exam date."
          ];
        }

        showToast("Calendar Updated", "Study Planner optimized your schedule.");
        renderStudyPlanner();
      });
    }
  }

  // VIEW 6: Assessment Agent View (with Reasoning & Insight)
  function renderAssessment() {
    const employee = window.CertiNexusData.employees[state.currentEmployeeId];
    const container = document.getElementById("assessmentContent");
    if (!container || !employee) return;

    const questions = window.CertiNexusData.questionBank[employee.certification] || [];
    const activeQuestion = questions[state.quiz.activeQuestionIndex];

    const outcome = window.CertiNexusAgents.assessmentAgent.run({
      certification: employee.certification,
      competencies: employee.competencies
    });

    let quizHtml = "";
    if (activeQuestion) {
      const optionsHtml = activeQuestion.options.map((opt, optIdx) => {
        let optionClass = "";
        if (state.quiz.isSubmitted) {
          if (optIdx === activeQuestion.correctIndex) {
            optionClass = "correct";
          } else if (state.quiz.selectedOptionIndex === optIdx) {
            optionClass = "incorrect";
          }
        } else if (state.quiz.selectedOptionIndex === optIdx) {
          optionClass = "selected";
        }

        return `
          <div class="option-item ${optionClass}" data-index="${optIdx}">
            <span class="option-radio"></span>
            <span>${opt}</span>
          </div>
        `;
      }).join("");

      quizHtml = `
        <div class="card" style="flex:1;">
          <div class="card-title">✍️ Practice Question (${state.quiz.activeQuestionIndex + 1} of ${questions.length})</div>
          <div class="question-container">
            <div class="badge badge-info" style="align-self: flex-start; margin-bottom:4px;">Competency: ${activeQuestion.competency}</div>
            <div class="question-text">${activeQuestion.question}</div>
            <div class="options-list">
              ${optionsHtml}
            </div>
            
            <div style="margin-top:16px; display:flex; justify-content:space-between; align-items:center;">
              <div>
                ${state.quiz.isSubmitted 
                  ? `<span style="font-weight:700; color:${state.quiz.selectedOptionIndex === activeQuestion.correctIndex ? 'var(--success-color)' : 'var(--danger-color)'}">
                      ${state.quiz.selectedOptionIndex === activeQuestion.correctIndex ? 'Correct! Well Done.' : 'Incorrect answer.'}
                     </span>` 
                  : '<span style="font-size:12.5px; color:var(--text-secondary);">Select an option and submit.</span>'
                }
              </div>
              <div style="display:flex; gap:10px;">
                ${state.quiz.isSubmitted
                  ? `<button id="btnNextQuiz" class="btn btn-secondary">Next Question</button>`
                  : `<button id="btnSubmitQuiz" class="btn btn-primary" ${state.quiz.selectedOptionIndex === null ? 'disabled' : ''}>Submit Answer</button>`
                }
              </div>
            </div>

            ${state.quiz.isSubmitted ? `
              <div class="ai-card card" style="margin-top:16px; padding:14px; border-color:var(--success-color);">
                <div class="ai-header" style="color:var(--success-color)">📚 Explanation Details</div>
                <div class="ai-reasoning">${activeQuestion.explanation}</div>
              </div>
            ` : ""}
          </div>
        </div>
      `;
    } else {
      quizHtml = `
        <div class="card" style="flex:1; justify-content:center; align-items:center; padding:40px; text-align:center;">
          <div style="font-size:48px;">🎉</div>
          <div style="font-size:18px; font-weight:700; color:var(--text-primary); margin-top:16px;">Practice Set Complete!</div>
          <button id="btnRestartQuiz" class="btn btn-primary" style="margin-top:16px;">Restart Assessment</button>
        </div>
      `;
    }

    container.innerHTML = `
      <div style="display:flex; flex-direction:column; gap:20px;">
        <!-- Strictly structured Agent Reasoning Panel -->
        ${getReasoningPanelHtml("Assessment Agent", outcome.reasoning)}

        <!-- AI Insight Alert Card -->
        ${getAIInsightHtml("Answering practice questions correctly increases estimated pass probability dials.")}

        <!-- Why this Recommendation Diagnostics Panel -->
        ${getWhyRecommendationHtml(outcome.whyRecommendation)}

        <div class="grid-layout" style="grid-template-columns: 1.2fr 1fr; gap:24px; align-items:stretch;">
          <!-- Quiz Container -->
          ${quizHtml}

          <!-- Diagnostic Metrics -->
          <div style="display:flex; flex-direction:column; gap:20px;">
            <div class="card" style="flex:1;">
              <div class="card-title">📊 Competency Diagnostics</div>
              <div id="assessCompetencyBars" style="margin-top:10px;"></div>
            </div>

            <div class="card">
              <div class="card-title">🔍 Certification Readiness Rating</div>
              <div style="display:flex; align-items:center; gap:20px;">
                <div id="assessReadinessGauge"></div>
                <div style="flex:1;">
                  <div style="font-size:13.5px; font-weight:700; color:var(--text-primary);">${outcome.recommendation}</div>
                  <div style="font-size:12px; color:var(--text-secondary); margin-top:4px; line-height:1.4;">
                    Voucher released when Readiness rating exceeds 85% score targets. Current Pass Probability is ${outcome.passPrediction}.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Weak Areas suggestions -->
        <div class="card">
          <div class="card-title">🚨 Focus Areas & Improvement Tips</div>
          <div class="grid-layout" style="grid-template-columns: repeat(3, 1fr); gap:15px;">
            ${outcome.weakAreas.map(wa => `
              <div class="list-item" style="flex-direction:column; align-items:flex-start; gap:6px; padding:14px; background:rgba(216, 59, 1, 0.03);">
                <div style="display:flex; width:100%; justify-content:space-between; align-items:center;">
                  <span style="font-weight:700; font-size:13.5px; color:var(--text-primary);">${wa.skill}</span>
                  <span class="badge badge-danger" style="font-size:10px;">${wa.score}%</span>
                </div>
                <div style="font-size:12px; color:var(--text-secondary); line-height:1.4;">${wa.tip}</div>
                <span class="badge badge-warning" style="font-size:9.5px; margin-top:4px; padding:2px 6px;">Confidence: Low</span>
              </div>
            `).join("") || `<div style="font-size:13px; color:var(--text-secondary); padding:10px;">Excellent work! No competencies are below the 75% target threshold.</div>`}
          </div>
        </div>
      </div>
    `;

    // Render SVG Sub-charts
    window.CertiNexusCharts.renderReadinessGauge("assessReadinessGauge", outcome.readinessScore);
    window.CertiNexusCharts.renderCompetencyBars("assessCompetencyBars", outcome.competencies);

    // Event listeners inside dynamic HTML
    const options = container.querySelectorAll(".option-item");
    options.forEach(opt => {
      opt.addEventListener("click", () => {
        if (state.quiz.isSubmitted) return;
        const index = parseInt(opt.getAttribute("data-index"));
        state.quiz.selectedOptionIndex = index;
        renderAssessment();
      });
    });

    const submitBtn = document.getElementById("btnSubmitQuiz");
    if (submitBtn) {
      submitBtn.addEventListener("click", () => {
        if (state.quiz.selectedOptionIndex === null) return;
        state.quiz.isSubmitted = true;

        const correctIndex = activeQuestion.correctIndex;
        const scoreDelta = state.quiz.selectedOptionIndex === correctIndex ? 4 : -1;
        const compName = activeQuestion.competency;

        if (employee.competencies[compName] !== undefined) {
          employee.competencies[compName] = Math.min(Math.max(employee.competencies[compName] + scoreDelta, 0), 100);
          
          let sum = 0;
          let cnt = 0;
          for (let k in employee.competencies) {
            sum += employee.competencies[k];
            cnt++;
          }
          employee.readinessScore = Math.round(sum / cnt);
          
          // Re-calculate pass rate prediction
          employee.passProbability = Math.min(Math.max(Math.round(employee.readinessScore + 5), 0), 100);
        }

        renderAssessment();
      });
    }

    const nextBtn = document.getElementById("btnNextQuiz");
    if (nextBtn) {
      nextBtn.addEventListener("click", () => {
        state.quiz.activeQuestionIndex++;
        state.quiz.selectedOptionIndex = null;
        state.quiz.isSubmitted = false;
        renderAssessment();
      });
    }

    const restartBtn = document.getElementById("btnRestartQuiz");
    if (restartBtn) {
      restartBtn.addEventListener("click", () => {
        state.quiz.activeQuestionIndex = 0;
        state.quiz.selectedOptionIndex = null;
        state.quiz.isSubmitted = false;
        renderAssessment();
      });
    }
  }

  // VIEW 7: Manager Insights View (with Reasoning & Insight)
  function renderManagerInsights() {
    const employee = window.CertiNexusData.employees[state.currentEmployeeId];
    const container = document.getElementById("managerInsightsContent");
    if (!container || !employee) return;

    const teamKey = employee.team || "Team Alpha";
    const teamData = window.CertiNexusData.teams;
    const allEmployees = window.CertiNexusData.employees;

    const report = window.CertiNexusAgents.managerInsightsAgent.run(teamKey, teamData, allEmployees);
    if (!report) return;

    container.innerHTML = `
      <div style="display:flex; flex-direction:column; gap:20px;">
        <!-- Strictly structured Agent Reasoning Panel -->
        ${getReasoningPanelHtml("Manager Insights Agent", report.reasoning)}

        <!-- AI Insight Alert Card -->
        ${getAIInsightHtml("Workforce optimization algorithms predict Sync hours reduction raises learning pace.")}

        <!-- Why this Recommendation Diagnostics Panel -->
        ${getWhyRecommendationHtml(report.whyRecommendation)}

        <div class="card">
          <div class="card-title">📈 Select Inspected Team Hierarchy</div>
          <div style="display:flex; gap:12px; align-items:center;">
            <span style="font-size:13px; font-weight:600; color:var(--text-secondary);">Currently Inspecting:</span>
            <span class="badge badge-info" style="font-size:13px; border-radius:6px; padding:6px 14px;">${report.teamName} (${teamKey})</span>
          </div>
        </div>

        <div class="grid-layout" style="grid-template-columns: 1.2fr 1fr; gap:24px; align-items:stretch;">
          <!-- Risk analysis -->
          <div class="card" style="justify-content:space-between;">
            <div>
              <div class="card-title">🚨 Employee Readiness Risk Analysis</div>
              <div class="item-list" style="margin-top:15px;">
                ${report.atRisk.map(e => `
                  <div class="list-item" style="border-left: 4px solid var(--danger-color); padding-left:14px; background:rgba(168, 0, 0, 0.03);">
                    <div>
                      <div style="font-weight:700; font-size:13.5px; color:var(--text-primary);">${e.name}</div>
                      <div style="font-size:11px; color:var(--text-secondary); margin-top:2px;">Target Certification: ${e.cert}</div>
                    </div>
                    <div style="text-align:right;">
                      <span class="badge badge-danger">${e.score}% Readiness</span>
                      <div style="font-size:9.5px; color:var(--text-secondary); margin-top:3px;">Pass Prob: ${e.prob}%</div>
                    </div>
                  </div>
                `).join("")}

                ${report.improving.map(e => `
                  <div class="list-item" style="border-left: 4px solid var(--warning-color); padding-left:14px; background:rgba(216, 59, 1, 0.03);">
                    <div>
                      <div style="font-weight:700; font-size:13.5px; color:var(--text-primary);">${e.name}</div>
                      <div style="font-size:11px; color:var(--text-secondary); margin-top:2px;">Target Certification: ${e.cert}</div>
                    </div>
                    <div style="text-align:right;">
                      <span class="badge badge-warning">${e.score}% Readiness</span>
                      <div style="font-size:9.5px; color:var(--text-secondary); margin-top:3px;">Pass Prob: ${e.prob}%</div>
                    </div>
                  </div>
                `).join("")}

                ${report.ready.map(e => `
                  <div class="list-item" style="border-left: 4px solid var(--success-color); padding-left:14px; background:rgba(16, 124, 65, 0.03);">
                    <div>
                      <div style="font-weight:700; font-size:13.5px; color:var(--text-primary);">${e.name}</div>
                      <div style="font-size:11px; color:var(--text-secondary); margin-top:2px;">Target Certification: ${e.cert}</div>
                    </div>
                    <div style="text-align:right;">
                      <span class="badge badge-success">${e.score}% Readiness</span>
                      <div style="font-size:9.5px; color:var(--text-secondary); margin-top:3px;">Pass Prob: ${e.prob}%</div>
                    </div>
                  </div>
                `).join("")}
              </div>
            </div>
            
            <div style="display:flex; justify-content:space-between; align-items:center; border-top:1px solid var(--border-color); padding-top:16px; margin-top:10px;">
              <span style="font-size:12.5px; font-weight:600; color:var(--text-secondary);">Average Team Readiness Score</span>
              <span style="font-size:20px; font-weight:800; color:var(--accent-color);">${report.avgReadiness}%</span>
            </div>
          </div>

          <!-- Pipeline funnel -->
          <div class="card">
            <div class="card-title">💼 Team Certification Pipeline Funnel</div>
            <div id="pipelineFunnelChart" style="margin-top:10px;"></div>
          </div>
        </div>

        <!-- Skill heatmap -->
        <div class="card">
          <div class="card-title">🗺️ Team Skill Gap Heatmap</div>
          <div id="skillGapHeatmapChart" style="margin-top:10px;"></div>
        </div>
      </div>
    `;

    // Render SVG Charts
    window.CertiNexusCharts.renderPipelineFunnel("pipelineFunnelChart", report.pipeline);
    window.CertiNexusCharts.renderSkillHeatmap("skillGapHeatmapChart", report.heatmap);
  }

  // VIEW 8: Team Readiness Command Center
  // VIEW 8: Team Readiness Command Center Completion
  function renderTeamCommandCenter() {
    const container = document.getElementById("commandContent");
    if (!container) return;

    const employee = window.CertiNexusData.employees[state.currentEmployeeId];
    const report = window.CertiNexusAgents.managerInsightsAgent.run(
      employee.team || "Team Alpha",
      window.CertiNexusData.teams,
      window.CertiNexusData.employees
    );

    container.innerHTML = `
      <div style="display:flex; flex-direction:column; gap:20px;">
        
        <!-- AI Insight Card -->
        ${getAIInsightHtml("Workforce intelligence models indicate Team Delta is currently leading certification pipelines.")}

        <!-- 1. Workforce Overview -->
        <div class="card">
          <div class="card-title">💼 Workforce Overview</div>
          <div class="grid-layout" style="grid-template-columns: repeat(4, 1fr); gap:15px; margin-top:5px;">
            <div style="background:var(--hover-bg); border:1px solid var(--border-color); border-radius:8px; padding:12px; text-align:center;">
              <div style="font-size:24px; font-weight:800; color:var(--text-primary);">48</div>
              <div style="font-size:11px; font-weight:700; color:var(--text-secondary); text-transform:uppercase; margin-top:2px;">Employees</div>
            </div>
            <div style="background:var(--hover-bg); border:1px solid var(--border-color); border-radius:8px; padding:12px; text-align:center;">
              <div style="font-size:24px; font-weight:800; color:#0078d4;">31</div>
              <div style="font-size:11px; font-weight:700; color:var(--text-secondary); text-transform:uppercase; margin-top:2px;">Active Learners</div>
            </div>
            <div style="background:var(--hover-bg); border:1px solid var(--border-color); border-radius:8px; padding:12px; text-align:center;">
              <div style="font-size:24px; font-weight:800; color:#107c41;">14</div>
              <div style="font-size:11px; font-weight:700; color:var(--text-secondary); text-transform:uppercase; margin-top:2px;">Exam Ready</div>
            </div>
            <div style="background:var(--hover-bg); border:1px solid var(--border-color); border-radius:8px; padding:12px; text-align:center;">
              <div style="font-size:24px; font-weight:800; color:#68217a;">9</div>
              <div style="font-size:11px; font-weight:700; color:var(--text-secondary); text-transform:uppercase; margin-top:2px;">Certified</div>
            </div>
          </div>
        </div>

        <!-- 2. Team Readiness Averages -->
        <div class="grid-layout" style="grid-template-columns: repeat(4, 1fr); gap:20px;">
          <div class="card" style="border-left:4px solid #0078d4; padding:16px;">
            <div style="font-size:11px; font-weight:700; color:var(--text-secondary); text-transform:uppercase;">Team Delta</div>
            <div style="font-size:22px; font-weight:800; color:var(--text-primary); margin-top:4px;">88% Avg</div>
            <div style="font-size:11px; color:#0078d4; font-weight:600; margin-top:4px;">Exam Ready: 5/8</div>
          </div>
          <div class="card" style="border-left:4px solid var(--success-color); padding:16px;">
            <div style="font-size:11px; font-weight:700; color:var(--text-secondary); text-transform:uppercase;">Team Alpha</div>
            <div style="font-size:22px; font-weight:800; color:var(--text-primary); margin-top:4px;">82% Avg</div>
            <div style="font-size:11px; color:var(--success-color); font-weight:600; margin-top:4px;">Exam Ready: 5/6</div>
          </div>
          <div class="card" style="border-left:4px solid var(--warning-color); padding:16px;">
            <div style="font-size:11px; font-weight:700; color:var(--text-secondary); text-transform:uppercase;">Team Beta</div>
            <div style="font-size:22px; font-weight:800; color:var(--text-primary); margin-top:4px;">74% Avg</div>
            <div style="font-size:11px; color:var(--warning-color); font-weight:600; margin-top:4px;">Exam Ready: 2/4</div>
          </div>
          <div class="card" style="border-left:4px solid var(--danger-color); padding:16px;">
            <div style="font-size:11px; font-weight:700; color:var(--text-secondary); text-transform:uppercase;">Team Gamma</div>
            <div style="font-size:22px; font-weight:800; color:var(--text-primary); margin-top:4px;">67% Avg</div>
            <div style="font-size:11px; color:var(--danger-color); font-weight:600; margin-top:4px;">Exam Ready: 1/3</div>
          </div>
        </div>

        <div class="grid-layout" style="grid-template-columns: 1.2fr 1.8fr; gap:24px; align-items:stretch;">
          
          <div style="display:flex; flex-direction:column; gap:20px;">
            
            <!-- Certification Pipeline -->
            <div class="card">
              <div class="card-title">💼 Certification Pipeline</div>
              <div style="display:grid; grid-template-columns: repeat(4, 1fr); gap:10px; text-align:center; margin-top:5px;">
                <div style="background:var(--hover-bg); border-radius:6px; padding:8px 4px; border:1px solid var(--border-color);">
                  <div style="font-size:18px; font-weight:800; color:#0078d4;">18</div>
                  <div style="font-size:9.5px; color:var(--text-secondary); font-weight:600; margin-top:2px;">Learning</div>
                </div>
                <div style="background:var(--hover-bg); border-radius:6px; padding:8px 4px; border:1px solid var(--border-color);">
                  <div style="font-size:18px; font-weight:800; color:#d83b01;">10</div>
                  <div style="font-size:9.5px; color:var(--text-secondary); font-weight:600; margin-top:2px;">Assessment</div>
                </div>
                <div style="background:var(--hover-bg); border-radius:6px; padding:8px 4px; border:1px solid var(--border-color);">
                  <div style="font-size:18px; font-weight:800; color:#107c41;">8</div>
                  <div style="font-size:9.5px; color:var(--text-secondary); font-weight:600; margin-top:2px;">Exam Ready</div>
                </div>
                <div style="background:var(--hover-bg); border-radius:6px; padding:8px 4px; border:1px solid var(--border-color);">
                  <div style="font-size:18px; font-weight:800; color:#68217a;">5</div>
                  <div style="font-size:9.5px; color:var(--text-secondary); font-weight:600; margin-top:2px;">Certified</div>
                </div>
              </div>
            </div>

            <!-- Risk Analysis segmented layout -->
            <div class="card">
              <div class="card-title">🚨 Risk Analysis Segment</div>
              <div style="display:flex; width:100%; height:12px; border-radius:6px; overflow:hidden; background:var(--border-color); margin-top:5px;">
                <div style="width:10.4%; height:100%; background:var(--danger-color);" title="High Risk: 5"></div>
                <div style="width:25%; height:100%; background:var(--warning-color);" title="Medium Risk: 12"></div>
                <div style="width:64.6%; height:100%; background:var(--success-color);" title="Low Risk: 31"></div>
              </div>
              <div style="display:grid; grid-template-columns: repeat(3, 1fr); gap:10px; margin-top:4px; text-align:center;">
                <div>
                  <div style="font-size:15px; font-weight:800; color:var(--danger-color);">5</div>
                  <div style="font-size:9.5px; color:var(--text-secondary);">High Risk</div>
                </div>
                <div>
                  <div style="font-size:15px; font-weight:800; color:var(--warning-color);">12</div>
                  <div style="font-size:9.5px; color:var(--text-secondary);">Medium Risk</div>
                </div>
                <div>
                  <div style="font-size:15px; font-weight:800; color:var(--success-color);">31</div>
                  <div style="font-size:9.5px; color:var(--text-secondary);">Low Risk</div>
                </div>
              </div>
            </div>

            <!-- Pass Prediction Analytics -->
            <div class="card">
              <div class="card-title">📈 Pass Prediction Analytics (Success Likelihood)</div>
              <div class="item-list" style="margin-top:5px;">
                <div class="list-item">
                  <span style="font-weight:600;">Team Delta</span>
                  <span style="font-weight:800; color:#0078d4;">94% success likelihood</span>
                </div>
                <div class="list-item">
                  <span style="font-weight:600;">Team Alpha</span>
                  <span style="font-weight:800; color:#107c41;">88% success likelihood</span>
                </div>
                <div class="list-item">
                  <span style="font-weight:600;">Team Beta</span>
                  <span style="font-weight:800; color:#d83b01;">78% success likelihood</span>
                </div>
                <div class="list-item">
                  <span style="font-weight:600;">Team Gamma</span>
                  <span style="font-weight:800; color:#a80000;">70% success likelihood</span>
                </div>
              </div>
            </div>

          </div>

          <div style="display:flex; flex-direction:column; gap:20px; flex:1;">
            
            <!-- Pass Probability gauge -->
            <div class="card" style="align-items:center;">
              <div class="card-title" style="align-self:flex-start;">🎯 Composite Pass Probability Dial</div>
              <div id="commandPassGauge" style="margin-top:10px;"></div>
            </div>

            <!-- Team comparisons bar chart -->
            <div class="card">
              <div class="card-title">📊 Team Readiness Comparison Index</div>
              <div id="commandComparisonChart" style="margin-top:10px;"></div>
            </div>

          </div>

        </div>

        <!-- Heatmap Section -->
        <div class="card">
          <div class="card-title">🗺️ Skill Gap Heatmap</div>
          <div id="commandHeatmapChart" style="margin-top:10px;"></div>
        </div>

      </div>
    `;

    // Render SVG elements
    window.CertiNexusCharts.renderPassProbabilityGauge("commandPassGauge", employee.passProbability || 78);
    window.CertiNexusCharts.renderTeamComparison("commandComparisonChart");
    window.CertiNexusCharts.renderSkillHeatmap("commandHeatmapChart", report.heatmap);
  }

  // VIEW 9: Microsoft IQ Layers (with premium animated architecture diagram)
  function renderMicrosoftIQLayers() {
    const container = document.getElementById("iqContent");
    if (!container) return;

    container.innerHTML = `
      <div style="display:flex; flex-direction:column; gap:20px;">
        
        <!-- Premium Architecture Diagram Card -->
        <div class="card" style="align-items:center; overflow-x:auto;">
          <div class="card-title" style="align-self:flex-start;">🧠 Microsoft IQ Multi-Agent Architecture Diagram</div>
          <p style="font-size:12px; color:var(--text-secondary); align-self:flex-start; margin-top:-5px; margin-bottom:15px;">
            The diagram below illustrates how grounded knowledge (Foundry IQ), skill metrics (Fabric IQ), and calendar context (Work IQ) coordinate flows between active agent nodes. Dashed lines indicate animated data transmission routes.
          </p>
          
          <svg viewBox="0 0 760 300" style="width:100%; min-width:650px; max-width:760px; height:auto; overflow:visible; font-family:var(--font-family);">
            <!-- Definitions for markers and filters -->
            <defs>
              <linearGradient id="grad-foundry" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stop-color="#8660a9" />
                <stop offset="100%" stop-color="#a78bfa" />
              </linearGradient>
              <linearGradient id="grad-fabric" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stop-color="#0078d4" />
                <stop offset="100%" stop-color="#60a5fa" />
              </linearGradient>
              <linearGradient id="grad-work" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stop-color="#107c41" />
                <stop offset="100%" stop-color="#34d399" />
              </linearGradient>
              <linearGradient id="grad-agent" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stop-color="var(--bg-card)" />
                <stop offset="100%" stop-color="var(--hover-bg)" />
              </linearGradient>
              
              <!-- Filter for card shadow -->
              <filter id="drop-shadow" x="-10%" y="-10%" width="120%" height="120%">
                <feDropShadow dx="0" dy="2" stdDeviation="3" flood-color="#000" flood-opacity="0.1" />
              </filter>
            </defs>

            <!-- CONNECTIONS (Dashed Lines with flow animation) -->
            <!-- Foundry IQ Connectors -->
            <path d="M 120 75 Q 80 115 80 180" fill="none" stroke="#8660a9" stroke-width="2.5" stroke-dasharray="6,6" style="animation: flowingSignal 20s infinite linear;" />
            <path d="M 170 75 Q 400 115 420 180" fill="none" stroke="#8660a9" stroke-width="2.5" stroke-dasharray="6,6" style="animation: flowingSignal 20s infinite linear;" />
            
            <!-- Fabric IQ Connectors -->
            <path d="M 380 75 Q 260 115 250 180" fill="none" stroke="#0078d4" stroke-width="2.5" stroke-dasharray="6,6" style="animation: flowingSignal 20s infinite linear;" />
            <path d="M 430 75 Q 560 115 590 180" fill="none" stroke="#0078d4" stroke-width="2.5" stroke-dasharray="6,6" style="animation: flowingSignal 20s infinite linear;" />

            <!-- Work IQ Connectors -->
            <path d="M 600 75 Q 320 115 260 180" fill="none" stroke="#107c41" stroke-width="2.5" stroke-dasharray="6,6" style="animation: flowingSignal 20s infinite linear;" />
            <path d="M 650 75 Q 640 115 600 180" fill="none" stroke="#107c41" stroke-width="2.5" stroke-dasharray="6,6" style="animation: flowingSignal 20s infinite linear;" />

            <!-- IQ LAYERS CARDS (Top Row) -->
            <!-- Foundry IQ -->
            <g transform="translate(40, 20)" filter="url(#drop-shadow)">
              <rect x="0" y="0" width="180" height="55" rx="8" fill="url(#grad-foundry)" />
              <text x="90" y="24" fill="#fff" font-weight="800" font-size="12" text-anchor="middle">🧠 Foundry IQ</text>
              <text x="90" y="42" fill="rgba(255,255,255,0.85)" font-weight="600" font-size="9.5" text-anchor="middle">Knowledge Retrieval Index</text>
            </g>

            <!-- Fabric IQ -->
            <g transform="translate(290, 20)" filter="url(#drop-shadow)">
              <rect x="0" y="0" width="180" height="55" rx="8" fill="url(#grad-fabric)" />
              <text x="90" y="24" fill="#fff" font-weight="800" font-size="12" text-anchor="middle">📊 Fabric IQ</text>
              <text x="90" y="42" fill="rgba(255,255,255,0.85)" font-weight="600" font-size="9.5" text-anchor="middle">Skill Intelligence & BI</text>
            </g>

            <!-- Work IQ -->
            <g transform="translate(540, 20)" filter="url(#drop-shadow)">
              <rect x="0" y="0" width="180" height="55" rx="8" fill="url(#grad-work)" />
              <text x="90" y="24" fill="#fff" font-weight="800" font-size="12" text-anchor="middle">💼 Work IQ</text>
              <text x="90" y="42" fill="rgba(255,255,255,0.85)" font-weight="600" font-size="9.5" text-anchor="middle">Calendar & Workload Context</text>
            </g>

            <!-- AGENT NODES CARDS (Bottom Row) -->
            <!-- Learning Path Agent -->
            <g transform="translate(10, 180)" filter="url(#drop-shadow)">
              <rect x="0" y="0" width="150" height="75" rx="10" fill="url(#grad-agent)" stroke="var(--border-color)" stroke-width="1.5" />
              <text x="75" y="22" fill="var(--text-primary)" font-weight="800" font-size="11.5" text-anchor="middle">🗺️ Learning Path</text>
              <text x="75" y="38" fill="var(--text-primary)" font-weight="800" font-size="11.5" text-anchor="middle">Curator Agent</text>
              <rect x="25" y="48" width="100" height="18" rx="9" fill="rgba(134, 96, 169, 0.1)" />
              <text x="75" y="60" fill="#8660a9" font-weight="700" font-size="9.5" text-anchor="middle">Curriculum Design</text>
            </g>

            <!-- Study Planner Agent -->
            <g transform="translate(190, 180)" filter="url(#drop-shadow)">
              <rect x="0" y="0" width="150" height="75" rx="10" fill="url(#grad-agent)" stroke="var(--border-color)" stroke-width="1.5" />
              <text x="75" y="22" fill="var(--text-primary)" font-weight="800" font-size="11.5" text-anchor="middle">📅 Study Planner</text>
              <text x="75" y="38" fill="var(--text-primary)" font-weight="800" font-size="11.5" text-anchor="middle">Agent</text>
              <rect x="25" y="48" width="100" height="18" rx="9" fill="rgba(0, 120, 212, 0.1)" />
              <text x="75" y="60" fill="#0078d4" font-weight="700" font-size="9.5" text-anchor="middle">Adaptive Planner</text>
            </g>

            <!-- Assessment Agent -->
            <g transform="translate(370, 180)" filter="url(#drop-shadow)">
              <rect x="0" y="0" width="150" height="75" rx="10" fill="url(#grad-agent)" stroke="var(--border-color)" stroke-width="1.5" />
              <text x="75" y="22" fill="var(--text-primary)" font-weight="800" font-size="11.5" text-anchor="middle">✍️ Assessment</text>
              <text x="75" y="38" fill="var(--text-primary)" font-weight="800" font-size="11.5" text-anchor="middle">Agent</text>
              <rect x="25" y="48" width="100" height="18" rx="9" fill="rgba(16, 124, 65, 0.1)" />
              <text x="75" y="60" fill="#107c41" font-weight="700" font-size="9.5" text-anchor="middle">Readiness Assessor</text>
            </g>

            <!-- Manager Insights Agent -->
            <g transform="translate(550, 180)" filter="url(#drop-shadow)">
              <rect x="0" y="0" width="150" height="75" rx="10" fill="url(#grad-agent)" stroke="var(--border-color)" stroke-width="1.5" />
              <text x="75" y="22" fill="var(--text-primary)" font-weight="800" font-size="11.5" text-anchor="middle">📈 Manager Insights</text>
              <text x="75" y="38" fill="var(--text-primary)" font-weight="800" font-size="11.5" text-anchor="middle">Agent</text>
              <rect x="25" y="48" width="100" height="18" rx="9" fill="rgba(104, 33, 122, 0.1)" />
              <text x="75" y="60" fill="#68217a" font-weight="700" font-size="9.5" text-anchor="middle">Workforce BI Sync</text>
            </g>
          </svg>
        </div>

        <div class="iq-layers-container">
          
          <!-- 1. Foundry IQ Details Card -->
          <div class="iq-row-layer">
            <div class="iq-info-card">
              <span class="iq-title-tag foundry-color">🧠 Foundry IQ Layer</span>
              <span class="badge badge-success" style="align-self:flex-start; font-size:9.5px;">Knowledge Retrieval</span>
              <p style="font-size:12.5px; color:var(--text-secondary); line-height:1.45;">
                Grounded Knowledge Index storing official exam syllabus specifications, study guides, and database articles.
              </p>
            </div>
            <div class="iq-targets-grid">
              <div class="iq-agent-connector-box">
                <span style="color:#8660a9;">🗺️</span>
                <div>
                  <div style="font-size:11px; color:var(--text-secondary);">Query Target</div>
                  <span>Learning Path curator</span>
                </div>
              </div>
              <div class="iq-agent-connector-box">
                <span style="color:#8660a9;">✍️</span>
                <div>
                  <div style="font-size:11px; color:var(--text-secondary);">Query Target</div>
                  <span>Assessment Agent</span>
                </div>
              </div>
            </div>
          </div>

          <!-- 2. Fabric IQ Details Card -->
          <div class="iq-row-layer">
            <div class="iq-info-card">
              <span class="iq-title-tag fabric-color">📊 Fabric IQ Layer</span>
              <span class="badge badge-info" style="align-self:flex-start; font-size:9.5px;">BI & Skill Taxonomy</span>
              <p style="font-size:12.5px; color:var(--text-secondary); line-height:1.45;">
                Orchestrates BI pipeline updates, maps dependency matrices between skills, and pushes data to executive summaries.
              </p>
            </div>
            <div class="iq-targets-grid">
              <div class="iq-agent-connector-box">
                <span style="color:#0078d4;">📅</span>
                <div>
                  <div style="font-size:11px; color:var(--text-secondary);">Dependency map</div>
                  <span>Study Planner Agent</span>
                </div>
              </div>
              <div class="iq-agent-connector-box">
                <span style="color:#0078d4;">📈</span>
                <div>
                  <div style="font-size:11px; color:var(--text-secondary);">Sync Target</div>
                  <span>Manager Insights Agent</span>
                </div>
              </div>
            </div>
          </div>

          <!-- 3. Work IQ Details Card -->
          <div class="iq-row-layer">
            <div class="iq-info-card">
              <span class="iq-title-tag work-color">💼 Work IQ Layer</span>
              <span class="badge badge-warning" style="align-self:flex-start; font-size:9.5px; color:#d83b01; background:rgba(216, 59, 1, 0.06);">Workload Awareness</span>
              <p style="font-size:12.5px; color:var(--text-secondary); line-height:1.45;">
                Interfaces directly with email, calendar logs, and meeting timelines to analyze employee capacity limits.
              </p>
            </div>
            <div class="iq-targets-grid">
              <div class="iq-agent-connector-box">
                <span style="color:#107c41;">📅</span>
                <div>
                  <div style="font-size:11px; color:var(--text-secondary);">Calendar Sync</div>
                  <span>Study Planner Agent</span>
                </div>
              </div>
              <div class="iq-agent-connector-box">
                <span style="color:#107c41;">📈</span>
                <div>
                  <div style="font-size:11px; color:var(--text-secondary);">Capacity Alert</div>
                  <span>Manager Insights Agent</span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    `;
  }

  // VIEW 10: Certification Journey Map
  function renderJourneyMap() {
    const employee = window.CertiNexusData.employees[state.currentEmployeeId];
    const container = document.getElementById("journeyContent");
    if (!container || !employee) return;

    container.innerHTML = `
      <div style="display:flex; flex-direction:column; gap:20px;">
        <div class="card" style="padding:30px;">
          <div class="card-title">🛡️ Certification Journey: ${employee.certification} Track</div>
          
          <div class="journey-horizontal-timeline">
            <div class="journey-step-block completed">
              <div class="journey-step-circle">📝</div>
              <div class="journey-step-title">Enrollment</div>
              <div class="journey-step-pct">100% Complete</div>
              <div class="journey-connector-line"></div>
            </div>
            
            <div class="journey-step-block completed">
              <div class="journey-step-circle">📖</div>
              <div class="journey-step-title">Learning</div>
              <div class="journey-step-pct">100% Complete</div>
              <div class="journey-connector-line"></div>
            </div>
            
            <div class="journey-step-block completed">
              <div class="journey-step-circle">💻</div>
              <div class="journey-step-title">Practice</div>
              <div class="journey-step-pct">100% Complete</div>
              <div class="journey-connector-line"></div>
            </div>

            <div class="journey-step-block current">
              <div class="journey-step-circle">✍️</div>
              <div class="journey-step-title">Assessment</div>
              <div class="journey-step-pct">${employee.progress}% done</div>
              <div class="journey-connector-line"></div>
            </div>

            <div class="journey-step-block">
              <div class="journey-step-circle">🎯</div>
              <div class="journey-step-title">Exam Ready</div>
              <div class="journey-step-pct">Target: 85%</div>
              <div class="journey-connector-line"></div>
            </div>

            <div class="journey-step-block" style="flex:none; min-width:100px;">
              <div class="journey-step-circle">🎓</div>
              <div class="journey-step-title">Certified</div>
              <div class="journey-step-pct">Official</div>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  // VIEW 13: User Profile View (Enhanced Hackathon Profile Completion)
  function renderUserProfile() {
    const employee = window.CertiNexusData.employees[state.currentEmployeeId];
    const container = document.getElementById("profileContent");
    if (!container || !employee) return;

    container.innerHTML = `
      <div style="display:flex; flex-direction:column; gap:20px;">
        
        <!-- Hero Details Card -->
        <div class="card">
          <div class="profile-hero">
            <div class="profile-hero-avatar">${employee.avatar}</div>
            <div class="profile-meta-info">
              <span class="profile-name">${employee.name}</span>
              <span class="profile-title-tag">${employee.role} | Team: ${employee.team}</span>
              <span class="profile-title-tag" style="font-weight:700; color:var(--accent-color);">Certification Goal: ${employee.certification} (${employee.certName})</span>
              
              <div class="profile-badges-list">
                ${employee.achievements && employee.achievements.length > 0 
                  ? employee.achievements.map(a => `<span class="profile-badge-item" title="${a.desc}">${a.icon} ${a.name}</span>`).join("")
                  : `<span style="font-size:11.5px; color:var(--text-secondary);">No achievements unlocked yet.</span>`
                }
              </div>
            </div>
          </div>
        </div>

        <!-- Learning Progress Card -->
        <div class="card">
          <div class="card-title">📖 Curriculum Learning Progress</div>
          <div style="display:flex; flex-direction:column; gap:8px;">
            <div style="display:flex; justify-content:space-between; font-size:13px; font-weight:600;">
              <span style="color:var(--text-secondary);">Syllabus Modules Completed</span>
              <span style="color:var(--accent-color);">${employee.progress}%</span>
            </div>
            <div class="progress-bar-container">
              <div class="progress-bar-fill" style="width: ${employee.progress}%;"></div>
            </div>
            <div style="display:flex; flex-wrap:wrap; gap:6px; margin-top:8px;">
              ${employee.completedModules.map(m => `<span class="badge badge-success" style="font-size:10px;">✓ ${m}</span>`).join("")}
            </div>
          </div>
        </div>

        <div class="grid-layout" style="grid-template-columns: repeat(2, 1fr); gap:20px; align-items:stretch;">
          
          <!-- Profile Analytics -->
          <div class="card">
            <div class="card-title">📊 Profile Analytics</div>
            <div class="item-list">
              <div class="list-item">
                <span style="font-weight:600;">Current Readiness Score</span>
                <span class="badge badge-warning" style="font-size:12px;">${employee.readinessScore}%</span>
              </div>
              <div class="list-item">
                <span style="font-weight:600;">Weekly Study Hours</span>
                <span>${employee.weeklyStudyHours} Hours / Week</span>
              </div>
              <div class="list-item">
                <span style="font-weight:600;">Total Study Hours Blocked</span>
                <span>${employee.totalStudyHours} Hours</span>
              </div>
              <div class="list-item">
                <span style="font-weight:600;">Completed Learning Paths</span>
                <span>${employee.completedPaths} Paths</span>
              </div>
              <div class="list-item">
                <span style="font-weight:600;">Pass Probability</span>
                <span style="font-weight:800; color:var(--success-color);">${employee.passProbability}%</span>
              </div>
              <div class="list-item">
                <span style="font-weight:600;">System Confidence</span>
                <span class="badge badge-success">${employee.confidenceLevel}</span>
              </div>
            </div>
          </div>

          <!-- Completed Certifications -->
          <div class="card" style="justify-content:space-between;">
            <div>
              <div class="card-title">🎓 Completed Certifications</div>
              <p style="font-size:11.5px; color:var(--text-secondary); margin-top:-5px; margin-bottom:12px;">
                Official certifications already achieved by this employee.
              </p>
              <div class="item-list">
                <div class="list-item" style="border-left: 3.5px solid var(--success-color);">
                  <div>
                    <span style="font-weight:700;">AZ-900: Microsoft Azure Fundamentals</span>
                    <div style="font-size:10.5px; color:var(--text-secondary); margin-top:2px;">Scored 910/1000 | Achieved May 2026</div>
                  </div>
                  <span class="badge badge-success">Active ✅</span>
                </div>
                <div class="list-item" style="border-left: 3.5px solid var(--success-color);">
                  <div>
                    <span style="font-weight:700;">AI-900: Microsoft Azure AI Fundamentals</span>
                    <div style="font-size:10.5px; color:var(--text-secondary); margin-top:2px;">Scored 880/1000 | Achieved Dec 2025</div>
                  </div>
                  <span class="badge badge-success">Active ✅</span>
                </div>
              </div>
            </div>
            <div style="font-size:11px; color:var(--text-secondary); border-top:1px solid var(--border-color); padding-top:10px; margin-top:10px;">
              Vouchers and credentials verified directly via Credly APIs.
            </div>
          </div>

        </div>

        <div class="grid-layout" style="grid-template-columns: repeat(2, 1fr); gap:20px; align-items:stretch;">
          
          <!-- Readiness History Chart -->
          <div class="card">
            <div class="card-title">📈 Readiness Score Trend</div>
            <div id="profileReadinessTrend" style="height:90px; margin-top:10px; display:flex; justify-content:center;"></div>
          </div>

          <!-- Study Hours Bar Chart -->
          <div class="card">
            <div class="card-title">⏰ Study Hours per Week</div>
            <div id="profileStudyHoursChart" style="height:110px; margin-top:10px; display:flex; justify-content:center;"></div>
          </div>

        </div>

      </div>
    `;

    // Render SVG Sub-charts
    const trendData = employee.history.map(h => ({ label: h.week, value: h.score }));
    window.CertiNexusCharts.renderReadinessTrend("profileReadinessTrend", trendData);

    const hoursData = employee.history.map(h => ({ day: h.week, hours: h.hours }));
    window.CertiNexusCharts.renderStudyHoursChart("profileStudyHoursChart", hoursData);
  }

  // VIEW 14: Settings Configuration Center (Full Completion)
  function renderSettings() {
    const container = document.getElementById("settingsContent");
    if (!container) return;

    // Load configurations from state or localStorage
    const demoSpeed = localStorage.getItem("certinexus-demo-speed") || "Normal";
    const syntheticMode = localStorage.getItem("certinexus-synth-mode") === "true";
    const agentLp = localStorage.getItem("certinexus-agent-lp") !== "false";
    const agentPlanner = localStorage.getItem("certinexus-agent-planner") !== "false";
    const agentAssess = localStorage.getItem("certinexus-agent-assess") !== "false";
    const agentManager = localStorage.getItem("certinexus-agent-manager") !== "false";
    
    const iqFoundry = localStorage.getItem("certinexus-iq-foundry") !== "false";
    const iqFabric = localStorage.getItem("certinexus-iq-fabric") !== "false";
    const iqWork = localStorage.getItem("certinexus-iq-work") !== "false";

    container.innerHTML = `
      <div class="settings-grid" style="max-width:750px;">
        
        <!-- AI Insight Card -->
        ${getAIInsightHtml("Configuration settings adapt multi-agent workloads and data generation seeds.")}

        <!-- 1. Visual Preferences -->
        <div class="card">
          <div class="settings-section-title">🎨 Appearance & Visual Theme</div>
          <div class="settings-option">
            <div class="settings-option-info">
              <span class="settings-option-title">Theme Visual Mode</span>
              <span class="settings-option-desc">Toggle between light and dark backgrounds for high contrast.</span>
            </div>
            <button id="settingsThemeToggle" class="btn btn-secondary" style="font-size:12.5px;">
              ${state.theme === 'dark' ? '☀️ Switch to Light Mode' : '🌙 Switch to Dark Mode'}
            </button>
          </div>
        </div>

        <!-- 2. Notifications -->
        <div class="card">
          <div class="settings-section-title">🔔 Workforce Notification Alerts</div>
          <div style="display:flex; flex-direction:column; gap:10px;">
            <div class="settings-option">
              <div class="settings-option-info">
                <span class="settings-option-title">Study Reminders</span>
                <span class="settings-option-desc">Notify employees when study time overlaps focus blocks.</span>
              </div>
              <input type="checkbox" checked style="width:18px; height:18px; cursor:pointer;">
            </div>
            <div class="settings-option">
              <div class="settings-option-info">
                <span class="settings-option-title">Assessment Alerts</span>
                <span class="settings-option-desc">Notify candidates when readiness scores drop below targets.</span>
              </div>
              <input type="checkbox" checked style="width:18px; height:18px; cursor:pointer;">
            </div>
            <div class="settings-option">
              <div class="settings-option-info">
                <span class="settings-option-title">Certification Deadlines</span>
                <span class="settings-option-desc">Alert users 14 days before exam voucher registration thresholds.</span>
              </div>
              <input type="checkbox" checked style="width:18px; height:18px; cursor:pointer;">
            </div>
            <div class="settings-option">
              <div class="settings-option-info">
                <span class="settings-option-title">Weekly Manager Reports</span>
                <span class="settings-option-desc">Compile and email workforce readiness metrics to team leads.</span>
              </div>
              <input type="checkbox" checked style="width:18px; height:18px; cursor:pointer;">
            </div>
          </div>
        </div>

        <!-- 3. Active Agent Nodes -->
        <div class="card">
          <div class="settings-section-title">🤖 Active Agent Nodes</div>
          <div style="display:flex; flex-direction:column; gap:10px;">
            <div class="settings-option">
              <div class="settings-option-info">
                <span class="settings-option-title">Learning Path Agent</span>
                <span class="settings-option-desc">Identifies gaps and compiles roadmap tracks.</span>
              </div>
              <input type="checkbox" id="settingsAgentLp" ${agentLp ? 'checked' : ''} style="width:18px; height:18px; cursor:pointer;">
            </div>
            <div class="settings-option">
              <div class="settings-option-info">
                <span class="settings-option-title">Study Planner Agent</span>
                <span class="settings-option-desc">Optimizes and shifts study blocks dynamically.</span>
              </div>
              <input type="checkbox" id="settingsAgentPlanner" ${agentPlanner ? 'checked' : ''} style="width:18px; height:18px; cursor:pointer;">
            </div>
            <div class="settings-option">
              <div class="settings-option-info">
                <span class="settings-option-title">Assessment Agent</span>
                <span class="settings-option-desc">Runs diagnostics and calculates readiness metrics.</span>
              </div>
              <input type="checkbox" id="settingsAgentAssess" ${agentAssess ? 'checked' : ''} style="width:18px; height:18px; cursor:pointer;">
            </div>
            <div class="settings-option">
              <div class="settings-option-info">
                <span class="settings-option-title">Manager Insights Agent</span>
                <span class="settings-option-desc">Aggregates workforce pipelines and risk analysis.</span>
              </div>
              <input type="checkbox" id="settingsAgentManager" ${agentManager ? 'checked' : ''} style="width:18px; height:18px; cursor:pointer;">
            </div>
          </div>
        </div>

        <!-- 4. Intelligence Layers -->
        <div class="card">
          <div class="settings-section-title">🧠 Microsoft IQ Intelligence Layers</div>
          <div style="display:flex; flex-direction:column; gap:10px;">
            <div class="settings-option">
              <div class="settings-option-info">
                <span class="settings-option-title">Foundry IQ Layer</span>
                <span class="settings-option-desc">Grounded knowledge index for curriculum guidelines.</span>
              </div>
              <input type="checkbox" id="settingsIqFoundry" ${iqFoundry ? 'checked' : ''} style="width:18px; height:18px; cursor:pointer;">
            </div>
            <div class="settings-option">
              <div class="settings-option-info">
                <span class="settings-option-title">Fabric IQ Layer</span>
                <span class="settings-option-desc">BI pipelines mapping skill relationships and dashboard analytics.</span>
              </div>
              <input type="checkbox" id="settingsIqFabric" ${iqFabric ? 'checked' : ''} style="width:18px; height:18px; cursor:pointer;">
            </div>
            <div class="settings-option">
              <div class="settings-option-info">
                <span class="settings-option-title">Work IQ Layer</span>
                <span class="settings-option-desc">Workload parameters and calendar availability context.</span>
              </div>
              <input type="checkbox" id="settingsIqWork" ${iqWork ? 'checked' : ''} style="width:18px; height:18px; cursor:pointer;">
            </div>
          </div>
        </div>

        <!-- 5. Demo Settings -->
        <div class="card">
          <div class="settings-section-title">🚀 Pitch / Demo Command Center</div>
          <div style="display:flex; flex-direction:column; gap:14px;">
            <div class="settings-option">
              <div class="settings-option-info">
                <span class="settings-option-title">Simulation Speed</span>
                <span class="settings-option-desc">Adjust the animation latency of the Demo Simulation pipeline.</span>
              </div>
              <select id="settingsDemoSpeed" class="profile-select" style="border: 1px solid var(--border-color); border-radius:6px; padding:4px 8px; background:var(--bg-card);">
                <option value="Fast" ${demoSpeed === 'Fast' ? 'selected' : ''}>Fast (1.0s latency)</option>
                <option value="Normal" ${demoSpeed === 'Normal' ? 'selected' : ''}>Normal (2.5s latency)</option>
                <option value="Slow" ${demoSpeed === 'Slow' ? 'selected' : ''}>Slow (5.0s latency)</option>
              </select>
            </div>
            <div class="settings-option">
              <div class="settings-option-info">
                <span class="settings-option-title">Animation Level</span>
                <span class="settings-option-desc">Visual rendering detail for moving message envelopes.</span>
              </div>
              <select class="profile-select" style="border: 1px solid var(--border-color); border-radius:6px; padding:4px 8px; background:var(--bg-card);">
                <option value="full">Full Premium (Transitions & Glows)</option>
                <option value="basic">Minimalist (No keyframes)</option>
              </select>
            </div>
            <div class="settings-option">
              <div class="settings-option-info">
                <span class="settings-option-title">Synthetic Data Mode</span>
                <span class="settings-option-desc">Generate randomized values for assessments and study hours.</span>
              </div>
              <input type="checkbox" id="settingsSynthMode" ${syntheticMode ? 'checked' : ''} style="width:18px; height:18px; cursor:pointer;">
            </div>
          </div>
        </div>

        <button id="btnSaveSettings" class="btn btn-primary" style="margin-top:10px;">Save Configurations</button>

      </div>
    `;

    // Bind event listeners for Settings page
    const themeBtn = document.getElementById("settingsThemeToggle");
    if (themeBtn) {
      themeBtn.addEventListener("click", () => {
        el.themeToggle.click(); 
        renderSettings();
      });
    }

    const saveBtn = document.getElementById("btnSaveSettings");
    if (saveBtn) {
      saveBtn.addEventListener("click", () => {
        // Retrieve checked inputs and store
        const speed = document.getElementById("settingsDemoSpeed").value;
        const synth = document.getElementById("settingsSynthMode").checked;
        
        localStorage.setItem("certinexus-demo-speed", speed);
        localStorage.setItem("certinexus-synth-mode", synth);

        localStorage.setItem("certinexus-agent-lp", document.getElementById("settingsAgentLp").checked);
        localStorage.setItem("certinexus-agent-planner", document.getElementById("settingsAgentPlanner").checked);
        localStorage.setItem("certinexus-agent-assess", document.getElementById("settingsAgentAssess").checked);
        localStorage.setItem("certinexus-agent-manager", document.getElementById("settingsAgentManager").checked);

        localStorage.setItem("certinexus-iq-foundry", document.getElementById("settingsIqFoundry").checked);
        localStorage.setItem("certinexus-iq-fabric", document.getElementById("settingsIqFabric").checked);
        localStorage.setItem("certinexus-iq-work", document.getElementById("settingsIqWork").checked);

        showToast("Configurations Saved", "All active preferences and demo velocities updated.");
      });
    }
  }

  // VIEW 12: Enterprise Knowledge Center (Search, Library, Analytics, Foundry IQ powered)
  function renderKnowledgeCenter() {
    const container = document.getElementById("knowledgeContent");
    if (!container) return;

    // Filter documents based on query or show library if empty
    const query = state.searchQuery || "";
    const filteredDocs = window.CertiNexusData.knowledgeBase.filter(doc => {
      if (!query) return doc.category !== "AI Knowledge Search"; // Hide QA questions by default from regular list
      return doc.title.toLowerCase().includes(query) || 
             doc.content.toLowerCase().includes(query) || 
             doc.tags.some(t => t.toLowerCase().includes(query));
    });

    // Certifications for the library
    const certs = [
      { code: "AZ-204", name: "Developing Solutions for Microsoft Azure" },
      { code: "AZ-400", name: "Designing DevOps Solutions" },
      { code: "DP-203", name: "Data Engineering on Microsoft Azure" },
      { code: "AI-102", name: "Azure AI Engineer Associate" },
      { code: "AZ-305", name: "Azure Solutions Architect Expert" }
    ];

    // Resources list
    const resourcesByCert = {
      "AZ-204": {
        guides: "Azure Functions Core, Blob SDK, Key Vault References",
        topics: "Managed Identities, App Service scaling, Cosmos DB consistency, API Gateway policies",
        assessments: "Cosmos DB API partition quiz, Azure App Service Web Apps practice set",
        paths: "Build Azure App Services (12h), Configure Azure Storage encryption (4h)"
      },
      "AZ-400": {
        guides: "YAML pipelines schema, GitHub Actions custom runners, Terraform locking",
        topics: "CI/CD multi-stage deployments, remote backends, SonarQube gates, vulnerability scans",
        assessments: "GitOps deployment locking review, CI/CD pipeline variables practice set",
        paths: "Designing DevOps workflows (18h), Advanced Terraform backend configurations (8h)"
      },
      "DP-203": {
        guides: "Synapse dedicated SQL pool schemas, Spark configuration parameters, Delta Lake formats",
        topics: "Hash & replicated tables, auto-scaling cluster sizing, Delta partition optimization",
        assessments: "Data Lake partitioning structures quiz, Synapse Analytics ETL pipelines test",
        paths: "Data Engineering on Microsoft Azure (20h), Synapse Analytics Spark optimization (7h)"
      },
      "AI-102": {
        guides: "Cognitive Services private endpoints guide, OpenAI deployment parameters",
        topics: "Vector database integration, custom speech model training, Form Recognizer pipelines",
        assessments: "Azure OpenAI semantic search test, Cognitive Services API key rotation quiz",
        paths: "Designing Azure AI Solutions (15h), Implementing Custom Speech & Vision Labs (6h)"
      },
      "AZ-305": {
        guides: "Enterprise Landing Zones blueprint, SQL Database elastic pools throughput",
        topics: "GRES vs ZRES replication design, Active Directory multi-tenant sync, backup recovery plans",
        assessments: "Azure SQL database high-availability test, Landing Zones networking design quiz",
        paths: "Designing Azure Infrastructure Solutions (22h), Hybrid Networking and Security design (8h)"
      }
    };

    let searchHeaderHtml = "";
    if (query) {
      // Find if we have a direct hit for "What skills are required for AZ-204?" or "What is the recommended study path for DP-203?"
      const isAZ204Query = query.includes("az-204") && (query.includes("skills") || query.includes("required"));
      const isDP203Query = query.includes("dp-203") && (query.includes("path") || query.includes("study"));

      let aiResponseText = "";
      if (isAZ204Query) {
        aiResponseText = "<strong>Grounded Response (AZ-204 Skills):</strong> For AZ-204, you must master: 1. Compute solutions (App Service, Azure Functions) 2. Storage solutions (Blob Storage, Cosmos DB indexing) 3. Security configurations (OAuth2, Key Vault integrations) 4. Monitoring & performance optimization (App Insights telemetry).";
      } else if (isDP203Query) {
        aiResponseText = "<strong>Grounded Response (DP-203 Study Path):</strong> The recommended study path is: Week 1: Batch & Lakehouse processing (Delta Lake partition designs) | Week 2: Synapse SQL pools schema distribution (Hash vs Replicated layouts) | Week 3: Spark Cluster tuning & autoscale | Week 4: Row-level security & key rotation policies.";
      }

      if (aiResponseText) {
        searchHeaderHtml = `
          <div class="ai-card card" style="border-color:var(--accent-color); padding:16px; margin-bottom:15px;">
            <div class="ai-header">🤖 Foundry IQ Grounded Search Result</div>
            <div class="ai-reasoning" style="color:var(--text-primary); font-size:13px; font-weight:550; line-height:1.45; margin-top:6px;">
              ${aiResponseText}
            </div>
            <div style="font-size:10px; color:var(--text-secondary); margin-top:8px;">
              Answer extracted dynamically from official Microsoft syllabus documents matching query criteria.
            </div>
          </div>
        `;
      }
    }

    container.innerHTML = `
      <div style="display:flex; flex-direction:column; gap:20px;">
        
        <!-- Foundry IQ Powered Badge -->
        <div class="foundry-iq-powered-badge">
          <div class="foundry-iq-powered-badge-text">
            <span>🧠</span> Powered by Microsoft Foundry IQ grounded semantic retrieval
          </div>
          <span class="badge badge-success" style="font-size:9.5px;">Grounded Context Active</span>
        </div>

        <!-- AI Insight Card -->
        ${getAIInsightHtml("Knowledge database synchronizes syllabus criteria across practice assessments.")}

        <!-- Top Analytics Indicators -->
        <div class="grid-layout" style="grid-template-columns: repeat(4, 1fr); gap:15px;">
          <div class="card" style="padding:14px; text-align:center;">
            <span style="font-size:20px; font-weight:800; color:#8660a9;">125</span>
            <span style="font-size:11px; font-weight:700; color:var(--text-secondary); text-transform:uppercase; margin-top:2px;">Documents Indexed</span>
          </div>
          <div class="card" style="padding:14px; text-align:center;">
            <span style="font-size:20px; font-weight:800; color:#0078d4;">18</span>
            <span style="font-size:11px; font-weight:700; color:var(--text-secondary); text-transform:uppercase; margin-top:2px;">Certifications Supported</span>
          </div>
          <div class="card" style="padding:14px; text-align:center;">
            <span style="font-size:20px; font-weight:800; color:#107c41;">42</span>
            <span style="font-size:11px; font-weight:700; color:var(--text-secondary); text-transform:uppercase; margin-top:2px;">Skill Categories</span>
          </div>
          <div class="card" style="padding:14px; text-align:center;">
            <span style="font-size:20px; font-weight:800; color:#68217a;">63</span>
            <span style="font-size:11px; font-weight:700; color:var(--text-secondary); text-transform:uppercase; margin-top:2px;">Learning Paths</span>
          </div>
        </div>

        <!-- Dynamic Search Results Header -->
        ${searchHeaderHtml}

        <div class="grid-layout" style="grid-template-columns: 1.2fr 1.8fr; gap:24px; align-items:stretch;">
          
          <!-- Left: Certification Library -->
          <div class="card">
            <div class="card-title">📚 Certification Library</div>
            <p style="font-size:11.5px; color:var(--text-secondary); margin-top:-5px; line-height:1.4;">
              Select a target certification to display customized study assets, topics, and practice syllabi.
            </p>
            <div class="item-list">
              ${certs.map(c => `
                <div class="list-item" style="cursor:pointer; flex-direction:column; align-items:flex-start; gap:4px; padding:12px;" onclick="document.getElementById('knowledgeCertFilter').value = '${c.code}'; document.getElementById('knowledgeCertFilter').dispatchEvent(new Event('change'));">
                  <div style="display:flex; justify-content:space-between; width:100%; align-items:center;">
                    <span style="font-weight:700; color:var(--accent-color); font-size:13.5px;">${c.code}</span>
                    <span class="badge badge-info" style="font-size:9.5px;">Grounded</span>
                  </div>
                  <span style="font-size:11.5px; color:var(--text-primary);">${c.name}</span>
                </div>
              `).join("")}
            </div>
          </div>

          <!-- Right: Learning Resources Explorer -->
          <div class="card">
            <div class="card-header">
              <span class="card-title">🗺️ Learning Resources Explorer</span>
              <select id="knowledgeCertFilter" class="profile-select" style="border: 1px solid var(--border-color); border-radius:6px; padding:4px 10px; background:var(--bg-card); font-size:12.5px;">
                <option value="AZ-204">AZ-204</option>
                <option value="AZ-400">AZ-400</option>
                <option value="DP-203">DP-203</option>
                <option value="AI-102">AI-102</option>
                <option value="AZ-305">AZ-305</option>
              </select>
            </div>
            
            <div id="knowledgeResourcesDetails" style="display:flex; flex-direction:column; gap:16px;">
              <!-- Populated dynamically via selection listener -->
            </div>
          </div>

        </div>

        <!-- Indexed Knowledge Documents -->
        <div class="card">
          <div class="card-title">🔍 Indexed Knowledge Documents (${filteredDocs.length})</div>
          ${query ? `<div style="font-size:12px; color:var(--text-secondary); margin-top:-5px;">Showing search results for: "<strong>${query}</strong>"</div>` : ""}
          <div class="grid-layout" style="grid-template-columns: repeat(2, 1fr); gap:15px; margin-top:5px;">
            ${filteredDocs.map(doc => `
              <div class="list-item" style="flex-direction:column; align-items:flex-start; gap:8px; padding:14px;">
                <div style="display:flex; justify-content:space-between; width:100%; align-items:center;">
                  <span style="font-weight:700; font-size:13.5px; color:var(--text-primary);">${doc.title}</span>
                  <span class="badge badge-info" style="font-size:9.5px;">${doc.category}</span>
                </div>
                <div style="font-size:12.5px; color:var(--text-secondary); line-height:1.45;">${doc.content}</div>
                <div style="display:flex; gap:6px; margin-top:4px;">
                  ${doc.tags.map(t => `<span class="badge badge-success" style="font-size:8.5px; padding:2px 6px;">${t}</span>`).join("")}
                </div>
              </div>
            `).join("")}
          </div>
        </div>

      </div>
    `;

    // Bind resources display to select box
    const filter = document.getElementById("knowledgeCertFilter");
    const detailsContainer = document.getElementById("knowledgeResourcesDetails");

    function updateExplorer(certCode) {
      if (!detailsContainer) return;
      const res = resourcesByCert[certCode] || resourcesByCert["AZ-204"];
      detailsContainer.innerHTML = `
        <div class="list-item" style="flex-direction:column; align-items:flex-start; gap:4px; padding:12px; background:rgba(0, 120, 212, 0.02); border-left: 4px solid #0078d4;">
          <strong style="font-size:12px; color:var(--text-secondary); text-transform:uppercase;">Study Guides</strong>
          <span style="font-size:13px; color:var(--text-primary); font-weight:600; margin-top:2px;">${res.guides}</span>
        </div>
        <div class="list-item" style="flex-direction:column; align-items:flex-start; gap:4px; padding:12px; background:rgba(134, 96, 169, 0.02); border-left: 4px solid #8660a9;">
          <strong style="font-size:12px; color:var(--text-secondary); text-transform:uppercase;">Recommended Topics</strong>
          <span style="font-size:13px; color:var(--text-primary); font-weight:600; margin-top:2px;">${res.topics}</span>
        </div>
        <div class="list-item" style="flex-direction:column; align-items:flex-start; gap:4px; padding:12px; background:rgba(16, 124, 65, 0.02); border-left: 4px solid #107c41;">
          <strong style="font-size:12px; color:var(--text-secondary); text-transform:uppercase;">Practice Assessments</strong>
          <span style="font-size:13px; color:var(--text-primary); font-weight:600; margin-top:2px;">${res.assessments}</span>
        </div>
        <div class="list-item" style="flex-direction:column; align-items:flex-start; gap:4px; padding:12px; background:rgba(104, 33, 122, 0.02); border-left: 4px solid #68217a;">
          <strong style="font-size:12px; color:var(--text-secondary); text-transform:uppercase;">Learning Paths</strong>
          <span style="font-size:13px; color:var(--text-primary); font-weight:600; margin-top:2px;">${res.paths}</span>
        </div>
      `;
    }

    if (filter) {
      filter.addEventListener("change", (e) => {
        updateExplorer(e.target.value);
      });
      // Set default
      updateExplorer(filter.value);
    }
  }

  // Toast alert system
  function showToast(title, message) {
    if (!el.toastContainer) return;

    const toast = document.createElement("div");
    toast.className = "toast";
    toast.innerHTML = `
      <div class="toast-content">
        <div class="toast-title">🤖 ${title}</div>
        <div class="toast-message">${message}</div>
      </div>
      <button class="toast-close">✕</button>
    `;

    el.toastContainer.appendChild(toast);

    const timeout = setTimeout(() => {
      toast.style.animation = "slideIn 0.3s reverse";
      toast.addEventListener("animationend", () => {
        toast.remove();
      });
    }, 5000);

    const closeBtn = toast.querySelector(".toast-close");
    if (closeBtn) {
      closeBtn.addEventListener("click", () => {
        clearTimeout(timeout);
        toast.remove();
      });
    }
  }

  // Run initial processes
  init();
  
  // Expose toast and routing globally
  window.CertiNexusApp = {
    switchTab,
    showToast
  };
});
