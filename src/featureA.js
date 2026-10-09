/* ==========================================================================
   Feature A: MeetGo Dynamic Grouping System Integration
   ========================================================================== */

import { getLang, t } from './i18n.js';

export function renderFeatureA(container) {
  const lang = getLang();

  container.innerHTML = `
    <div style="margin-bottom: 24px;">
      <span class="hero-badge" style="background:var(--primary-light);color:var(--primary);border-color:rgba(99,102,241,0.3)">
        ⚡ Option A · MeetGo Grouping System
      </span>
      <h1 style="font-size:32px;font-weight:800;margin-top:8px">
        ${lang === 'zh' ? '动态玩家分组配对系统' : 'Dynamic Player Grouping System'}
      </h1>
      <p style="color:var(--text-muted);font-size:15px;margin-top:6px">
        ${lang === 'zh' ? '支持组长候选、希望/不想遇见集合约束、重复遇见热图矩阵与动态重算。' : 'Supports leader candidates, prefer/avoid set constraints, heatmaps, and dynamic recalculation.'}
      </p>
    </div>

    <!-- Embedded MeetGo iFrame or Dynamic Shell -->
    <div class="glass-panel" style="padding:12px;overflow:hidden">
      <iframe id="meetgoFrame" src="./meetgo/meetgo.html" style="width:100%;height:820px;border:none;border-radius:14px;background:#fff"></iframe>
    </div>
  `;
}
