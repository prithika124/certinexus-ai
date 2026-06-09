// CertiNexus AI custom SVG Chart Generator - Enhanced for hackathon
const CertiNexusCharts = {
  // Helper to color-code scores
  getColorForScore: function (score) {
    if (score >= 80) return { name: "Ready", hex: "#107c41", lightHex: "#dff6dd" }; // Green
    if (score >= 60) return { name: "Improving", hex: "#d83b01", lightHex: "#fde7e9" }; // Orange/Yellow
    return { name: "At Risk", hex: "#a80000", lightHex: "#fde7e9" }; // Red
  },

  // 1. Radial Gauge for Readiness Score
  renderReadinessGauge: function (containerId, score) {
    const container = document.getElementById(containerId);
    if (!container) return;

    const info = this.getColorForScore(score);
    const radius = 50;
    const circumference = 2 * Math.PI * radius;
    const strokeDashoffset = circumference - (score / 100) * circumference;

    container.innerHTML = `
      <div class="svg-chart-wrapper" style="position:relative; width:130px; height:130px; margin: 0 auto;">
        <svg width="130" height="130" viewBox="0 0 120 120">
          <circle cx="60" cy="60" r="${radius}" fill="none" stroke="var(--border-color)" stroke-width="10" />
          <circle cx="60" cy="60" r="${radius}" fill="none" stroke="${info.hex}" stroke-width="10"
            stroke-dasharray="${circumference}" stroke-dashoffset="${strokeDashoffset}"
            stroke-linecap="round" transform="rotate(-90 60 60)" style="transition: stroke-dashoffset 1s ease-out;" />
        </svg>
        <div style="position:absolute; top:50%; left:50%; transform:translate(-50%, -50%); text-align:center;">
          <div style="font-size: 26px; font-weight: 700; color: var(--text-primary); font-family:var(--font-family);">${score}%</div>
          <div style="font-size: 11px; font-weight: 600; color: ${info.hex}; font-family:var(--font-family); margin-top:-2px;">${info.name}</div>
        </div>
      </div>
    `;
  },

  // 2. Horizontal Bar Chart for Competencies
  renderCompetencyBars: function (containerId, competencies) {
    const container = document.getElementById(containerId);
    if (!container) return;

    let barsHtml = `<div class="competency-bars-list" style="display:flex; flex-direction:column; gap:12px; font-family:var(--font-family);">`;
    
    for (let skill in competencies) {
      const score = competencies[skill];
      const color = this.getColorForScore(score).hex;
      barsHtml += `
        <div class="competency-bar-row">
          <div style="display:flex; justify-content:space-between; margin-bottom: 4px; font-size: 13px; font-weight: 500;">
            <span style="color:var(--text-primary);">${skill}</span>
            <span style="font-weight: 700; color:${color};">${score}%</span>
          </div>
          <div style="width:100%; height:8px; background:var(--border-color); border-radius:4px; overflow:hidden;">
            <div style="width: ${score}%; height:100%; background:${color}; border-radius:4px; transition: width 1s ease-out;"></div>
          </div>
        </div>
      `;
    }
    barsHtml += `</div>`;
    container.innerHTML = barsHtml;
  },

  // 3. Skill Gap Heatmap (6 Hackathon target skills)
  renderSkillHeatmap: function (containerId, heatmapData) {
    const container = document.getElementById(containerId);
    if (!container) return;

    // Default hackathon 6 skills if no specific heatmapData is passed
    const skillsList = heatmapData || {
      "Storage": 60,
      "Monitoring": 74,
      "Security": 68,
      "DevOps": 55,
      "Azure Functions": 80,
      "API Management": 70
    };

    let gridHtml = `
      <div style="font-family:var(--font-family); display:flex; flex-direction:column; gap:12px;">
        <div style="display:grid; grid-template-columns: repeat(auto-fill, minmax(130px, 1fr)); gap:10px;">
    `;

    for (let skill in skillsList) {
      const score = skillsList[skill];
      let bgColor = "rgba(16, 124, 65, 0.1)"; 
      let textColor = "#107c41";
      let borderColor = "rgba(16, 124, 65, 0.3)";

      if (score < 60) {
        bgColor = "rgba(168, 0, 0, 0.08)"; 
        textColor = "#a80000";
        borderColor = "rgba(168, 0, 0, 0.2)";
      } else if (score < 80) {
        bgColor = "rgba(216, 59, 1, 0.08)"; 
        textColor = "#d83b01";
        borderColor = "rgba(216, 59, 1, 0.2)";
      }

      gridHtml += `
        <div style="background:${bgColor}; border:1px solid ${borderColor}; padding:10px; border-radius:8px; display:flex; flex-direction:column; justify-content:space-between; min-height:65px;" class="heatmap-cell">
          <div style="font-size:11px; font-weight:700; color:var(--text-secondary); text-transform:uppercase; letter-spacing:0.5px; line-height:1.2;">${skill}</div>
          <div style="font-size:18px; font-weight:800; color:${textColor}; margin-top:6px;">${score}%</div>
        </div>
      `;
    }

    gridHtml += `
        </div>
      </div>
    `;

    container.innerHTML = gridHtml;
  },

  // 4. Horizontal Funnel for Pipeline
  renderPipelineFunnel: function (containerId, pipelineData) {
    const container = document.getElementById(containerId);
    if (!container) return;

    const stages = [
      { key: "studying", name: "Studying", color: "#0078d4" },
      { key: "assessment", name: "Assessment", color: "#d83b01" },
      { key: "ready", name: "Exam Ready", color: "#107c41" },
      { key: "certified", name: "Certified 🎉", color: "#68217a" }
    ];

    let funnelHtml = `
      <div style="font-family:var(--font-family); display:flex; flex-direction:column; gap:16px; width:100%;">
        <div style="display:flex; align-items:center; justify-content:space-between; gap:10px; overflow-x:auto; padding-bottom:8px;">
    `;

    stages.forEach((stage, index) => {
      const count = pipelineData[stage.key] || 0;
      funnelHtml += `
        <div style="flex:1; min-width:110px; position:relative; background:var(--bg-primary); border:1px solid var(--border-color); border-radius:8px; padding:12px; text-align:center;">
          <div style="font-size:24px; font-weight:700; color:${stage.color};">${count}</div>
          <div style="font-size:12px; font-weight:600; color:var(--text-primary); margin-top:4px;">${stage.name}</div>
          <div style="font-size:10px; color:var(--text-secondary); margin-top:2px;">Employees</div>
        </div>
      `;
      if (index < stages.length - 1) {
        funnelHtml += `
          <div style="color:var(--text-secondary); font-size:16px; font-weight:bold; flex-shrink:0;">→</div>
        `;
      }
    });

    funnelHtml += `
        </div>
      </div>
    `;

    container.innerHTML = funnelHtml;
  },

  // 5. Pass Rate Radial Doughnut
  renderPassRateDoughnut: function (containerId, passRate) {
    const container = document.getElementById(containerId);
    if (!container) return;

    const radius = 45;
    const circumference = 2 * Math.PI * radius;
    const strokeDashoffset = circumference - (passRate / 100) * circumference;

    container.innerHTML = `
      <div style="position:relative; width:120px; height:120px; margin: 0 auto; font-family:var(--font-family);">
        <svg width="120" height="120" viewBox="0 0 110 110">
          <circle cx="55" cy="55" r="${radius}" fill="none" stroke="var(--border-color)" stroke-width="12" />
          <circle cx="55" cy="55" r="${radius}" fill="none" stroke="#68217a" stroke-width="12"
            stroke-dasharray="${circumference}" stroke-dashoffset="${strokeDashoffset}"
            stroke-linecap="round" transform="rotate(-90 55 55)" style="transition: stroke-dashoffset 1s ease-out;" />
        </svg>
        <div style="position:absolute; top:50%; left:50%; transform:translate(-50%, -50%); text-align:center;">
          <div style="font-size: 20px; font-weight: 700; color: var(--text-primary);">${passRate}%</div>
          <div style="font-size: 9px; font-weight: 600; color: var(--text-secondary); text-transform:uppercase;">Pass Rate</div>
        </div>
      </div>
    `;
  },

  // 6. Bar Chart for Study Hours
  renderStudyHoursChart: function (containerId, hoursData) {
    const container = document.getElementById(containerId);
    if (!container) return;

    const maxHours = Math.max(...hoursData.map(d => d.hours), 1);
    
    let barsHtml = `
      <div style="font-family:var(--font-family); display:flex; align-items:flex-end; justify-content:space-between; height:110px; width:100%; padding-top:10px;">
    `;

    hoursData.forEach(d => {
      const heightPercent = (d.hours / maxHours) * 85; 
      barsHtml += `
        <div style="display:flex; flex-direction:column; align-items:center; flex:1; gap:6px;">
          <div style="font-size:10px; font-weight:700; color:var(--text-primary);">${d.hours}h</div>
          <div style="width:20px; height:${Math.max(heightPercent, 4)}px; background:var(--accent-color); border-radius:4px 4px 0 0; transition: height 0.8s;" title="${d.day}: ${d.hours} hours"></div>
          <div style="font-size:10px; font-weight:600; color:var(--text-secondary);">${d.day.substring(0, 3)}</div>
        </div>
      `;
    });

    barsHtml += `</div>`;
    container.innerHTML = barsHtml;
  },

  // 7. Sparkline/Line Chart for Readiness Trend
  renderReadinessTrend: function (containerId, trendData) {
    const container = document.getElementById(containerId);
    if (!container) return;

    const width = 240;
    const height = 80;
    const pointsCount = trendData.length;
    const maxVal = 100;
    const minVal = 40;
    const range = maxVal - minVal;

    const coordinates = trendData.map((d, index) => {
      const x = (index / (pointsCount - 1)) * (width - 20) + 10;
      const y = height - 10 - ((d.value - minVal) / range) * (height - 25);
      return { x, y, label: d.label, val: d.value };
    });

    let pathString = `M ${coordinates[0].x} ${coordinates[0].y}`;
    for (let i = 1; i < coordinates.length; i++) {
      pathString += ` L ${coordinates[i].x} ${coordinates[i].y}`;
    }

    let dotsHtml = "";
    coordinates.forEach(c => {
      dotsHtml += `
        <circle cx="${c.x}" cy="${c.y}" r="4" fill="#0078d4" stroke="var(--bg-secondary)" stroke-width="2" />
        <text x="${c.x}" y="${c.y - 8}" text-anchor="middle" font-size="9" font-weight="700" fill="var(--text-primary)" font-family="var(--font-family)">${c.val}%</text>
      `;
    });

    let xLabelsHtml = "";
    coordinates.forEach((c, i) => {
      xLabelsHtml += `
        <text x="${c.x}" y="${height - 2}" text-anchor="middle" font-size="8.5" font-weight="600" fill="var(--text-secondary)" font-family="var(--font-family)">${c.label}</text>
      `;
    });

    container.innerHTML = `
      <div style="width:100%; height:100%; display:flex; flex-direction:column; justify-content:center;">
        <svg viewBox="0 0 ${width} ${height}" style="width:100%; height:auto; overflow:visible;">
          <line x1="10" y1="${height - 15}" x2="${width - 10}" y2="${height - 15}" stroke="var(--border-color)" stroke-width="1" stroke-dasharray="3,3" />
          <path d="${pathString}" fill="none" stroke="#0078d4" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round" />
          ${dotsHtml}
          ${xLabelsHtml}
        </svg>
      </div>
    `;
  },

  // 8. Comparative Bar Chart for Team Readiness
  renderTeamComparison: function (containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;

    const teams = [
      { name: "Team Delta", score: 88, color: "#0078d4" },
      { name: "Team Alpha", score: 82, color: "#107c41" },
      { name: "Team Beta", score: 74, color: "#d83b01" },
      { name: "Team Gamma", score: 67, color: "#a80000" }
    ];

    let barsHtml = `
      <div style="font-family:var(--font-family); display:flex; flex-direction:column; gap:16px; width:100%;">
    `;

    teams.forEach(t => {
      barsHtml += `
        <div style="display:flex; flex-direction:column; gap:6px;">
          <div style="display:flex; justify-content:space-between; font-size:12.5px; font-weight:600;">
            <span style="color:var(--text-primary);">${t.name}</span>
            <span style="color:${t.color}; font-weight:800;">${t.score}% Readiness</span>
          </div>
          <div style="width:100%; height:12px; background:var(--border-color); border-radius:6px; overflow:hidden;">
            <div style="width:${t.score}%; height:100%; background:${t.color}; border-radius:6px; transition:width 1s;"></div>
          </div>
        </div>
      `;
    });

    barsHtml += `</div>`;
    container.innerHTML = barsHtml;
  },

  // 9. Dial Gauge for Pass Probability
  renderPassProbabilityGauge: function (containerId, score) {
    const container = document.getElementById(containerId);
    if (!container) return;

    const radius = 45;
    const percentage = score / 100;
    const targetAngle = -180 + percentage * 180;
    
    let color = "#a80000"; 
    let desc = "Low Chance";
    if (score >= 80) {
      color = "#107c41";
      desc = "High Chance";
    } else if (score >= 60) {
      color = "#d83b01";
      desc = "Moderate";
    }

    container.innerHTML = `
      <div style="position:relative; width:140px; height:95px; margin: 0 auto; font-family:var(--font-family); overflow:hidden; text-align:center;">
        <svg width="140" height="90" viewBox="0 0 110 75">
          <path d="M 10 65 A 45 45 0 0 1 100 65" fill="none" stroke="var(--border-color)" stroke-width="10" stroke-linecap="round"/>
          <path d="M 10 65 A 45 45 0 0 1 100 65" fill="none" stroke="${color}" stroke-width="10" stroke-linecap="round"
            stroke-dasharray="${Math.PI * radius}" stroke-dashoffset="${(Math.PI * radius) - (percentage * Math.PI * radius)}"
            style="transition: stroke-dashoffset 1.2s ease-out;"/>
          <line x1="55" y1="65" x2="55" y2="28" stroke="var(--text-primary)" stroke-width="3.5" stroke-linecap="round"
            transform="rotate(${targetAngle} 55 65)" style="transform-origin: 55px 65px; transition: transform 1.2s cubic-bezier(0.175, 0.885, 0.32, 1.275);"/>
          <circle cx="55" cy="65" r="5" fill="var(--text-primary)"/>
        </svg>
        <div style="position:absolute; bottom:5px; left:0; right:0; text-align:center;">
          <div style="font-size:18px; font-weight:800; color:var(--text-primary);">${score}%</div>
          <div style="font-size:9.5px; font-weight:700; color:${color}; text-transform:uppercase; margin-top:-2px;">${desc}</div>
        </div>
      </div>
    `;
  },

  // 10. Horizontal Progression Pipeline Widget
  renderPipelineWidget: function (containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;

    const data = window.CertiNexusData.workforce.pipeline;
    const stages = [
      { name: "Learning", count: data.learning, color: "#0078d4" },
      { name: "Assessment", count: data.assessment, color: "#d83b01" },
      { name: "Exam Ready", count: data.ready, color: "#107c41" },
      { name: "Certified", count: data.certified, color: "#68217a" }
    ];

    let widgetHtml = `
      <div style="font-family:var(--font-family); display:flex; flex-direction:column; gap:10px; width:100%; padding:5px 0;">
        <div style="display:flex; justify-content:space-between; position:relative; width:100%;">
          <!-- Connecting background line -->
          <div style="position:absolute; top:20px; left:10%; right:10%; height:4px; background:var(--border-color); z-index:1;"></div>
    `;

    stages.forEach((s, idx) => {
      widgetHtml += `
        <div style="display:flex; flex-direction:column; align-items:center; z-index:2; position:relative; flex:1;">
          <div style="width:36px; height:36px; border-radius:50%; background:var(--bg-card); border:3px solid ${s.color}; color:${s.color}; display:flex; align-items:center; justify-content:center; font-size:14px; font-weight:800; box-shadow:var(--card-shadow);">
            ${s.count}
          </div>
          <div style="font-size:11.5px; font-weight:700; color:var(--text-primary); margin-top:6px;">${s.name}</div>
        </div>
      `;
    });

    widgetHtml += `
        </div>
      </div>
    `;

    container.innerHTML = widgetHtml;
  },

  // 11. Workforce Risk Analysis segmented visual card
  renderRiskAnalysis: function (containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;

    const data = window.CertiNexusData.workforce.risk;
    const total = data.high + data.medium + data.low;
    const highPct = (data.high / total) * 100;
    const medPct = (data.medium / total) * 100;
    const lowPct = (data.low / total) * 100;

    container.innerHTML = `
      <div style="font-family:var(--font-family); display:flex; flex-direction:column; gap:12px; width:100%;">
        <!-- Segmented bar -->
        <div style="display:flex; width:100%; height:14px; border-radius:7px; overflow:hidden; background:var(--border-color);">
          <div style="width:${highPct}%; height:100%; background:var(--danger-color);" title="High Risk: ${data.high}"></div>
          <div style="width:${medPct}%; height:100%; background:var(--warning-color);" title="Medium Risk: ${data.medium}"></div>
          <div style="width:${lowPct}%; height:100%; background:var(--success-color);" title="Low Risk: ${data.low}"></div>
        </div>
        
        <!-- Legend labels -->
        <div style="display:grid; grid-template-columns: repeat(3, 1fr); gap:10px; margin-top:4px;">
          <div style="background:rgba(168, 0, 0, 0.04); border:1px solid rgba(168, 0, 0, 0.15); border-radius:6px; padding:8px; text-align:center;">
            <div style="font-size:16px; font-weight:800; color:var(--danger-color);">${data.high}</div>
            <div style="font-size:10.5px; font-weight:600; color:var(--text-secondary); margin-top:2px;">High Risk</div>
          </div>
          <div style="background:rgba(216, 59, 1, 0.04); border:1px solid rgba(216, 59, 1, 0.15); border-radius:6px; padding:8px; text-align:center;">
            <div style="font-size:16px; font-weight:800; color:var(--warning-color);">${data.medium}</div>
            <div style="font-size:10.5px; font-weight:600; color:var(--text-secondary); margin-top:2px;">Med Risk</div>
          </div>
          <div style="background:rgba(16, 124, 65, 0.04); border:1px solid rgba(16, 124, 65, 0.15); border-radius:6px; padding:8px; text-align:center;">
            <div style="font-size:16px; font-weight:800; color:var(--success-color);">${data.low}</div>
            <div style="font-size:10.5px; font-weight:600; color:var(--text-secondary); margin-top:2px;">Low Risk</div>
          </div>
        </div>
      </div>
    `;
  }
};

window.CertiNexusCharts = CertiNexusCharts;
