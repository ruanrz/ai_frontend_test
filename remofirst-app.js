/* ═══════════════════════════════════════════════════════════════
   RampingUp Employee Portal — Remofirst Edition
   Application Logic + Mock Data + Page Renderers
   ═══════════════════════════════════════════════════════════════ */

// ── Mock Data ────────────────────────────────────────────────
const EMPLOYEE = {
  name: 'Zhang Rui',
  initials: 'ZR',
  role: 'Software Engineer',
  department: 'Engineering',
  employeeId: 'EMP-2024-0032',
  email: 'zhang.rui@rampingup.com',
  phone: '+86 138 8888 0032',
  joinDate: '2024-03-15',
  manager: 'Li Wei',
  location: 'Shanghai, China',
  contractType: 'Full-time',
  gender: 'Male',
  dob: '1995-06-20',
  bankName: 'China Merchants Bank',
  bankAccount: '**** **** **** 6789',
  nationality: 'Chinese',
  idType: 'ID Card',
  idNumber: '310***********1234',
};

const LEAVE_TYPES = [
  { type: 'Annual Leave', total: 15, used: 7, color: '#2e90fa' },
  { type: 'Sick Leave', total: 10, used: 2, color: '#7a5af8' },
  { type: 'Personal Leave', total: 5, used: 1, color: '#f79009' },
  { type: 'Compensatory', total: 3, used: 0, color: '#04C53A' },
];

const LEAVE_REQUESTS = [
  { id: 'LV-2401', type: 'Annual Leave', from: '2025-03-10', to: '2025-03-14', days: 5, status: 'Approved', approver: 'Li Wei' },
  { id: 'LV-2402', type: 'Sick Leave', from: '2025-02-20', to: '2025-02-21', days: 2, status: 'Approved', approver: 'Li Wei' },
  { id: 'LV-2403', type: 'Annual Leave', from: '2025-04-05', to: '2025-04-06', days: 2, status: 'Pending', approver: 'Li Wei' },
  { id: 'LV-2404', type: 'Personal Leave', from: '2025-01-15', to: '2025-01-15', days: 1, status: 'Approved', approver: 'Li Wei' },
  { id: 'LV-2405', type: 'Annual Leave', from: '2025-05-01', to: '2025-05-02', days: 2, status: 'Draft', approver: '-' },
  { id: 'LV-2406', type: 'Sick Leave', from: '2024-12-10', to: '2024-12-10', days: 1, status: 'Rejected', approver: 'Li Wei' },
];

const SALARY_SLIPS = [
  { id: 'SS-202503', period: 'March 2025', payDate: '2025-03-25', gross: 32000, deductions: 6820, net: 25180, status: 'Submitted' },
  { id: 'SS-202502', period: 'February 2025', payDate: '2025-02-25', gross: 32000, deductions: 6820, net: 25180, status: 'Submitted' },
  { id: 'SS-202501', period: 'January 2025', payDate: '2025-01-25', gross: 32000, deductions: 6820, net: 25180, status: 'Submitted' },
  { id: 'SS-202412', period: 'December 2024', payDate: '2024-12-25', gross: 30000, deductions: 6380, net: 23620, status: 'Submitted' },
  { id: 'SS-202411', period: 'November 2024', payDate: '2024-11-25', gross: 30000, deductions: 6380, net: 23620, status: 'Submitted' },
  { id: 'SS-202410', period: 'October 2024', payDate: '2024-10-25', gross: 30000, deductions: 6380, net: 23620, status: 'Submitted' },
];

const SALARY_DETAIL = {
  earnings: [
    { component: 'Basic Salary', amount: 20000 },
    { component: 'Housing Allowance', amount: 5000 },
    { component: 'Transport Allowance', amount: 2000 },
    { component: 'Meal Allowance', amount: 1500 },
    { component: 'Performance Bonus', amount: 3500 },
  ],
  deductions: [
    { component: 'Pension Insurance (8%)', amount: 2560 },
    { component: 'Medical Insurance (2%)', amount: 640 },
    { component: 'Unemployment Insurance (0.5%)', amount: 160 },
    { component: 'Housing Fund (12%)', amount: 2400 },
    { component: 'Individual Income Tax', amount: 1060 },
  ],
};

const EXPENSES = [
  { id: 'EC-2401', date: '2025-03-18', category: 'Travel', description: 'Business trip to Beijing', amount: 4580, currency: 'CNY', status: 'Pending', items: 3 },
  { id: 'EC-2402', date: '2025-03-05', category: 'Equipment', description: 'External monitor purchase', amount: 2899, currency: 'CNY', status: 'Approved', items: 1 },
  { id: 'EC-2403', date: '2025-02-20', category: 'Meals', description: 'Client dinner - Project Alpha', amount: 860, currency: 'CNY', status: 'Approved', items: 1 },
  { id: 'EC-2404', date: '2025-02-10', category: 'Transportation', description: 'Monthly taxi reimbursement', amount: 1200, currency: 'CNY', status: 'Rejected', items: 5 },
  { id: 'EC-2405', date: '2025-01-28', category: 'Communication', description: 'Annual phone plan', amount: 1680, currency: 'CNY', status: 'Approved', items: 1 },
  { id: 'EC-2406', date: '2025-03-22', category: 'Travel', description: 'Shenzhen conference travel', amount: 3200, currency: 'CNY', status: 'Draft', items: 4 },
];

const TICKETS = [
  { id: 'TK-0089', subject: 'VPN access not working from home', category: 'IT Support', priority: 'High', status: 'Open', created: '2025-03-20', updated: '2025-03-21' },
  { id: 'TK-0088', subject: 'Request for additional software license', category: 'IT Support', priority: 'Medium', status: 'Pending', created: '2025-03-18', updated: '2025-03-19' },
  { id: 'TK-0085', subject: 'Office desk lamp replacement', category: 'Facilities', priority: 'Low', status: 'Closed', created: '2025-03-10', updated: '2025-03-15' },
  { id: 'TK-0082', subject: 'Payslip discrepancy for February', category: 'HR', priority: 'High', status: 'Closed', created: '2025-03-02', updated: '2025-03-05' },
  { id: 'TK-0079', subject: 'Meeting room booking system error', category: 'IT Support', priority: 'Medium', status: 'Open', created: '2025-02-28', updated: '2025-03-01' },
];

const RECENT_ACTIVITY = [
  { time: '2025-03-21 14:30', text: 'Leave request LV-2403 submitted for approval' },
  { time: '2025-03-20 09:15', text: 'Ticket TK-0089 created: VPN access issue' },
  { time: '2025-03-18 16:45', text: 'Expense claim EC-2401 submitted (¥4,580)' },
  { time: '2025-03-15 10:00', text: 'March salary slip generated' },
  { time: '2025-03-10 11:30', text: 'Leave request LV-2401 approved by Li Wei' },
];

// ── SVG Icons (Lucide-style) ────────────────────────────────
const ICONS = {
  home: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>',
  calendar: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/></svg>',
  dollar: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6"/></svg>',
  receipt: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M4 2v20l2-1 2 1 2-1 2 1 2-1 2 1 2-1 2 1V2l-2 1-2-1-2 1-2-1-2 1-2-1-2 1z"/><path d="M8 10h8M8 14h4"/></svg>',
  ticket: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M2 9a3 3 0 013-3h14a3 3 0 013 3v0a3 3 0 00-3 3v0a3 3 0 003 3v0a3 3 0 01-3 3H5a3 3 0 01-3-3v0a3 3 0 003-3v0a3 3 0 00-3-3z"/></svg>',
  user: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>',
  fileText: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>',
  bell: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 01-3.46 0"/></svg>',
  search: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/></svg>',
  settings: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-2 2 2 2 0 01-2-2v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83 0 2 2 0 010-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 01-2-2 2 2 0 012-2h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 010-2.83 2 2 0 012.83 0l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 012-2 2 2 0 012 2v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 0 2 2 0 010 2.83l-.06.06a1.65 1.65 0 00-.33 1.82V9a1.65 1.65 0 001.51 1H21a2 2 0 012 2 2 2 0 01-2 2h-.09a1.65 1.65 0 00-1.51 1z"/></svg>',
  plus: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>',
  eye: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>',
  download: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>',
  arrowUp: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="19" x2="12" y2="5"/><polyline points="5 12 12 5 19 12"/></svg>',
  arrowDown: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="5" x2="12" y2="19"/><polyline points="5 12 12 19 19 12"/></svg>',
  clock: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>',
  tag: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M20.59 13.41l-7.17 7.17a2 2 0 01-2.83 0L2 12V2h10l8.59 8.59a2 2 0 010 2.82z"/><line x1="7" y1="7" x2="7.01" y2="7"/></svg>',
  menu: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="18" x2="21" y2="18"/></svg>',
  x: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>',
  chevronRight: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"/></svg>',
  wallet: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12V7H5a2 2 0 010-4h14v4"/><path d="M3 5v14a2 2 0 002 2h16v-5"/><path d="M18 12a2 2 0 100 4h4v-4z"/></svg>',
};

function icon(name, size) {
  const s = size || 20;
  return `<span style="display:inline-flex;width:${s}px;height:${s}px;">${ICONS[name] || ''}</span>`;
}

// ── Helpers ──────────────────────────────────────────────────
function formatCurrency(n) {
  return '¥' + n.toLocaleString('zh-CN');
}

function statusClass(status) {
  const map = {
    'Approved': 'approved', 'Pending': 'pending', 'Rejected': 'rejected',
    'Draft': 'draft', 'Cancelled': 'cancelled', 'Submitted': 'submitted',
    'Open': 'open', 'Closed': 'closed',
  };
  return map[status] || 'draft';
}

function balanceRingSVG(used, total, color) {
  const r = 22;
  const circumference = 2 * Math.PI * r;
  const pct = total > 0 ? ((total - used) / total) : 0;
  const offset = circumference * (1 - pct);
  return `
    <svg viewBox="0 0 56 56">
      <circle class="balance-ring__track" cx="28" cy="28" r="${r}"/>
      <circle class="balance-ring__fill" cx="28" cy="28" r="${r}"
        stroke="${color}" stroke-dasharray="${circumference}"
        stroke-dashoffset="${offset}"/>
    </svg>
    <div class="balance-ring__value">${total - used}</div>
  `;
}

// ── Page Renderers ───────────────────────────────────────────

function renderDashboard() {
  const now = new Date();
  const day = now.getDate();
  const months = ['January','February','March','April','May','June','July','August','September','October','November','December'];
  const month = months[now.getMonth()];
  const year = now.getFullYear();
  const hour = now.getHours();
  const greeting = hour < 12 ? 'Good morning' : hour < 18 ? 'Good afternoon' : 'Good evening';

  const totalLeave = LEAVE_TYPES.reduce((s, l) => s + (l.total - l.used), 0);
  const pendingCount = LEAVE_REQUESTS.filter(l => l.status === 'Pending').length + EXPENSES.filter(e => e.status === 'Pending').length;
  const latestSalary = SALARY_SLIPS[0];
  const openTickets = TICKETS.filter(t => t.status === 'Open' || t.status === 'Pending').length;
  const salaryData = SALARY_SLIPS.slice(0, 6).reverse();

  return `
    <!-- Welcome -->
    <div class="welcome-card animate-in">
      <div class="welcome-card__left">
        <div class="welcome-card__greeting">${greeting},</div>
        <div class="welcome-card__name">${EMPLOYEE.name}</div>
        <div class="welcome-card__meta">${EMPLOYEE.role} · ${EMPLOYEE.department} · ${EMPLOYEE.location}</div>
      </div>
      <div class="welcome-card__right">
        <div class="welcome-card__date-day">${day}</div>
        <div class="welcome-card__date-sub">${month} ${year}</div>
      </div>
    </div>

    <!-- Stats -->
    <div class="stats-row">
      <div class="stat-card animate-in">
        <div class="stat-card__header">
          <div class="stat-card__icon stat-card__icon--green">${icon('calendar')}</div>
          <div class="stat-card__trend stat-card__trend--up">${icon('arrowUp', 12)} days left</div>
        </div>
        <div class="stat-card__value">${totalLeave}</div>
        <div class="stat-card__label">Leave Balance</div>
      </div>
      <div class="stat-card animate-in">
        <div class="stat-card__header">
          <div class="stat-card__icon stat-card__icon--amber">${icon('clock')}</div>
          <div class="stat-card__trend stat-card__trend--down">${icon('arrowDown', 12)} awaiting</div>
        </div>
        <div class="stat-card__value">${pendingCount}</div>
        <div class="stat-card__label">Pending Requests</div>
      </div>
      <div class="stat-card animate-in">
        <div class="stat-card__header">
          <div class="stat-card__icon stat-card__icon--blue">${icon('dollar')}</div>
          <div class="stat-card__trend stat-card__trend--up">${icon('arrowUp', 12)} +6.6%</div>
        </div>
        <div class="stat-card__value">${formatCurrency(latestSalary.net)}</div>
        <div class="stat-card__label">Latest Net Pay</div>
      </div>
      <div class="stat-card animate-in">
        <div class="stat-card__header">
          <div class="stat-card__icon stat-card__icon--purple">${icon('ticket')}</div>
        </div>
        <div class="stat-card__value">${openTickets}</div>
        <div class="stat-card__label">Open Tickets</div>
      </div>
    </div>

    <!-- Grid: Chart + Activity -->
    <div class="grid-2">
      <div class="card animate-in">
        <div class="card__header">
          <div class="card__title">Salary Trend</div>
          <span style="font-size:12px;color:var(--gray-400);font-family:'JetBrains Mono',monospace;">${year}</span>
        </div>
        <div class="card__body">
          <div class="chart-bars">
            ${salaryData.map(s => {
              const maxNet = Math.max(...salaryData.map(x => x.net));
              const pct = (s.net / maxNet) * 100;
              return `<div class="chart-bar-col">
                <div class="chart-bar-value">${(s.net / 1000).toFixed(0)}k</div>
                <div class="chart-bar" style="height:${pct}%"></div>
                <div class="chart-bar-label">${s.period.split(' ')[0].slice(0, 3)}</div>
              </div>`;
            }).join('')}
          </div>
        </div>
      </div>
      <div class="card animate-in">
        <div class="card__header">
          <div class="card__title">Recent Activity</div>
        </div>
        <div class="card__body">
          <div class="timeline">
            ${RECENT_ACTIVITY.map(a => `
              <div class="timeline-item">
                <div class="timeline-dot"></div>
                <div class="timeline-content">
                  <div class="timeline-text">${a.text}</div>
                  <div class="timeline-time">${a.time}</div>
                </div>
              </div>
            `).join('')}
          </div>
        </div>
      </div>
    </div>

    <!-- Quick Actions -->
    <div class="section-title animate-in">Quick Actions</div>
    <div class="quick-actions animate-in">
      <a href="#/leave" class="quick-action">${icon('calendar')} Apply for Leave</a>
      <a href="#/expenses" class="quick-action">${icon('receipt')} Submit Expense</a>
      <a href="#/tickets" class="quick-action">${icon('ticket')} Create Ticket</a>
      <a href="#/salary" class="quick-action">${icon('dollar')} View Payslip</a>
    </div>
  `;
}

function renderLeave() {
  return `
    <div class="page-header">
      <div>
        <div class="page-title">Leave Management</div>
        <div class="page-subtitle">Manage your leave requests and view balances</div>
      </div>
      <button class="btn btn--primary" onclick="openLeaveForm()">${icon('plus', 16)} New Request</button>
    </div>

    <!-- Leave Balances -->
    <div class="balance-grid">
      ${LEAVE_TYPES.map(lt => `
        <div class="balance-card animate-in">
          <div class="balance-ring">
            ${balanceRingSVG(lt.used, lt.total, lt.color)}
          </div>
          <div class="balance-info">
            <div class="balance-info__type">${lt.type}</div>
            <div class="balance-info__detail">${lt.used} used of ${lt.total} days</div>
          </div>
        </div>
      `).join('')}
    </div>

    <!-- Filters -->
    <div class="filters">
      <span class="filter-chip active" onclick="filterTable(this,'leaveTable','all')">All</span>
      <span class="filter-chip" onclick="filterTable(this,'leaveTable','Approved')">Approved</span>
      <span class="filter-chip" onclick="filterTable(this,'leaveTable','Pending')">Pending</span>
      <span class="filter-chip" onclick="filterTable(this,'leaveTable','Rejected')">Rejected</span>
      <span class="filter-chip" onclick="filterTable(this,'leaveTable','Draft')">Draft</span>
    </div>

    <!-- Table -->
    <div class="card animate-in">
      <div class="table-wrap">
        <table class="data-table" id="leaveTable">
          <thead>
            <tr>
              <th>ID</th>
              <th>Type</th>
              <th>From</th>
              <th>To</th>
              <th>Days</th>
              <th>Status</th>
              <th>Approver</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            ${LEAVE_REQUESTS.map(lr => `
              <tr data-status="${lr.status}">
                <td class="td-mono" style="color:var(--green-600)">${lr.id}</td>
                <td class="td-primary">${lr.type}</td>
                <td class="td-mono">${lr.from}</td>
                <td class="td-mono">${lr.to}</td>
                <td class="td-mono">${lr.days}</td>
                <td><span class="badge badge--${statusClass(lr.status)}">${lr.status}</span></td>
                <td>${lr.approver}</td>
                <td><button class="btn btn--ghost btn--sm" onclick="viewLeaveDetail('${lr.id}')">${icon('eye', 14)} View</button></td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>
    </div>

    <!-- Leave Detail Panel -->
    <div id="leaveDetailPanel" style="display:none;"></div>
  `;
}

function renderSalary() {
  return `
    <div class="page-header">
      <div>
        <div class="page-title">Salary Slips</div>
        <div class="page-subtitle">View your compensation details and payslips</div>
      </div>
      <select class="form-select" onchange="filterSalaryYear(this.value)">
        <option value="2025">2025</option>
        <option value="2024">2024</option>
      </select>
    </div>

    <!-- Summary Cards -->
    <div class="stats-row" style="grid-template-columns:repeat(3,1fr);">
      <div class="stat-card animate-in">
        <div class="stat-card__header">
          <div class="stat-card__icon stat-card__icon--green">${icon('dollar')}</div>
        </div>
        <div class="stat-card__value">${formatCurrency(24660)}</div>
        <div class="stat-card__label">Avg Net Pay</div>
      </div>
      <div class="stat-card animate-in">
        <div class="stat-card__header">
          <div class="stat-card__icon stat-card__icon--blue">${icon('arrowUp')}</div>
        </div>
        <div class="stat-card__value">${formatCurrency(96000)}</div>
        <div class="stat-card__label">YTD Gross</div>
      </div>
      <div class="stat-card animate-in">
        <div class="stat-card__header">
          <div class="stat-card__icon stat-card__icon--amber">${icon('arrowDown')}</div>
        </div>
        <div class="stat-card__value">${formatCurrency(20460)}</div>
        <div class="stat-card__label">YTD Deductions</div>
      </div>
    </div>

    <!-- Salary Table -->
    <div class="card animate-in">
      <div class="table-wrap">
        <table class="data-table">
          <thead>
            <tr>
              <th>Period</th>
              <th>Pay Date</th>
              <th>Gross</th>
              <th>Deductions</th>
              <th>Net Pay</th>
              <th>Status</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            ${SALARY_SLIPS.map(ss => `
              <tr>
                <td class="td-primary">${ss.period}</td>
                <td class="td-mono">${ss.payDate}</td>
                <td class="td-mono">${formatCurrency(ss.gross)}</td>
                <td class="td-mono td-red">${formatCurrency(ss.deductions)}</td>
                <td class="td-mono td-green">${formatCurrency(ss.net)}</td>
                <td><span class="badge badge--${statusClass(ss.status)}">${ss.status}</span></td>
                <td><button class="btn btn--ghost btn--sm" onclick="showSalaryDetail('${ss.id}')">${icon('eye', 14)} Detail</button></td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>
    </div>

    <!-- Salary Detail Panel -->
    <div id="salaryDetailPanel" style="display:none;" class="mt-6">
      <div class="card">
        <div class="card__header">
          <div class="card__title">Salary Breakdown — <span id="salaryDetailPeriod" style="color:var(--green-600)"></span></div>
          <button class="btn btn--ghost btn--sm" onclick="document.getElementById('salaryDetailPanel').style.display='none'">${icon('x', 14)} Close</button>
        </div>
        <div class="card__body">
          <div class="grid-2" style="margin-bottom:0;">
            <div class="salary-section">
              <div class="salary-section__title">Earnings</div>
              ${SALARY_DETAIL.earnings.map(e => `
                <div class="salary-row">
                  <span class="salary-row__label">${e.component}</span>
                  <span class="salary-row__value" style="color:var(--green-600)">${formatCurrency(e.amount)}</span>
                </div>
              `).join('')}
              <div class="salary-total">
                <span class="salary-total__label">Total Earnings</span>
                <span class="salary-total__value" style="color:var(--green-600)">${formatCurrency(SALARY_DETAIL.earnings.reduce((s,e) => s + e.amount, 0))}</span>
              </div>
            </div>
            <div class="salary-section">
              <div class="salary-section__title">Deductions</div>
              ${SALARY_DETAIL.deductions.map(d => `
                <div class="salary-row">
                  <span class="salary-row__label">${d.component}</span>
                  <span class="salary-row__value" style="color:var(--red-500)">${formatCurrency(d.amount)}</span>
                </div>
              `).join('')}
              <div class="salary-total">
                <span class="salary-total__label">Total Deductions</span>
                <span class="salary-total__value" style="color:var(--red-500)">${formatCurrency(SALARY_DETAIL.deductions.reduce((s,d) => s + d.amount, 0))}</span>
              </div>
            </div>
          </div>
          <div class="net-pay-bar">
            <div class="net-pay-bar__label">Net Pay</div>
            <div class="net-pay-bar__value">${formatCurrency(25180)}</div>
          </div>
        </div>
      </div>
    </div>
  `;
}

function renderExpenses() {
  const totalPending = EXPENSES.filter(e => e.status === 'Pending').reduce((s, e) => s + e.amount, 0);
  const totalApproved = EXPENSES.filter(e => e.status === 'Approved').reduce((s, e) => s + e.amount, 0);

  return `
    <div class="page-header">
      <div>
        <div class="page-title">Expenses</div>
        <div class="page-subtitle">Track and submit expense claims</div>
      </div>
      <button class="btn btn--primary" onclick="openExpenseForm()">${icon('plus', 16)} New Claim</button>
    </div>

    <!-- Summary -->
    <div class="stats-row" style="grid-template-columns:repeat(3,1fr);">
      <div class="stat-card animate-in">
        <div class="stat-card__header">
          <div class="stat-card__icon stat-card__icon--amber">${icon('clock')}</div>
        </div>
        <div class="stat-card__value">${formatCurrency(totalPending)}</div>
        <div class="stat-card__label">Pending Claims</div>
      </div>
      <div class="stat-card animate-in">
        <div class="stat-card__header">
          <div class="stat-card__icon stat-card__icon--green">${icon('dollar')}</div>
        </div>
        <div class="stat-card__value">${formatCurrency(totalApproved)}</div>
        <div class="stat-card__label">Approved YTD</div>
      </div>
      <div class="stat-card animate-in">
        <div class="stat-card__header">
          <div class="stat-card__icon stat-card__icon--blue">${icon('receipt')}</div>
        </div>
        <div class="stat-card__value">${EXPENSES.length}</div>
        <div class="stat-card__label">Total Claims</div>
      </div>
    </div>

    <!-- Filters -->
    <div class="filters">
      <span class="filter-chip active" onclick="filterTable(this,'expenseTable','all')">All</span>
      <span class="filter-chip" onclick="filterTable(this,'expenseTable','Pending')">Pending</span>
      <span class="filter-chip" onclick="filterTable(this,'expenseTable','Approved')">Approved</span>
      <span class="filter-chip" onclick="filterTable(this,'expenseTable','Rejected')">Rejected</span>
      <span class="filter-chip" onclick="filterTable(this,'expenseTable','Draft')">Draft</span>
    </div>

    <!-- Table -->
    <div class="card animate-in">
      <div class="table-wrap">
        <table class="data-table" id="expenseTable">
          <thead>
            <tr>
              <th>ID</th>
              <th>Date</th>
              <th>Category</th>
              <th>Description</th>
              <th>Items</th>
              <th>Amount</th>
              <th>Status</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            ${EXPENSES.map(e => `
              <tr data-status="${e.status}">
                <td class="td-mono" style="color:var(--green-600)">${e.id}</td>
                <td class="td-mono">${e.date}</td>
                <td><span class="badge-plain badge-plain--gray">${e.category}</span></td>
                <td class="td-primary" style="max-width:220px;overflow:hidden;text-overflow:ellipsis;">${e.description}</td>
                <td class="td-mono">${e.items}</td>
                <td class="td-mono" style="font-weight:600;color:var(--gray-900)">${formatCurrency(e.amount)}</td>
                <td><span class="badge badge--${statusClass(e.status)}">${e.status}</span></td>
                <td><button class="btn btn--ghost btn--sm" onclick="viewExpenseDetail('${e.id}')">${icon('eye', 14)} View</button></td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>
    </div>

    <!-- Expense Detail Panel -->
    <div id="expenseDetailPanel" style="display:none;"></div>
  `;
}

function renderTickets() {
  return `
    <div class="page-header">
      <div>
        <div class="page-title">Support Tickets</div>
        <div class="page-subtitle">Get help from your team and track issues</div>
      </div>
      <button class="btn btn--primary" onclick="openTicketForm()">${icon('plus', 16)} New Ticket</button>
    </div>

    <!-- Filters -->
    <div class="filters">
      <span class="filter-chip active" onclick="filterTable(this,'ticketTable','all')">All</span>
      <span class="filter-chip" onclick="filterTable(this,'ticketTable','Open')">Open</span>
      <span class="filter-chip" onclick="filterTable(this,'ticketTable','Pending')">Pending</span>
      <span class="filter-chip" onclick="filterTable(this,'ticketTable','Closed')">Closed</span>
    </div>

    <!-- Table -->
    <div class="card animate-in">
      <div class="table-wrap">
        <table class="data-table" id="ticketTable">
          <thead>
            <tr>
              <th>ID</th>
              <th>Subject</th>
              <th>Category</th>
              <th>Priority</th>
              <th>Status</th>
              <th>Created</th>
              <th>Updated</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            ${TICKETS.map(t => `
              <tr data-status="${t.status}">
                <td class="td-mono" style="color:var(--green-600)">${t.id}</td>
                <td class="td-primary" style="max-width:260px;overflow:hidden;text-overflow:ellipsis;">${t.subject}</td>
                <td><span class="badge-plain badge-plain--gray">${t.category}</span></td>
                <td>
                  <span class="priority">
                    <span class="priority-dot priority-dot--${t.priority.toLowerCase()}"></span>
                    ${t.priority}
                  </span>
                </td>
                <td><span class="badge badge--${statusClass(t.status)}">${t.status}</span></td>
                <td class="td-mono">${t.created}</td>
                <td class="td-mono">${t.updated}</td>
                <td><button class="btn btn--ghost btn--sm" onclick="showTicketDetail('${t.id}')">${icon('eye', 14)} View</button></td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>
    </div>

    <!-- Ticket Detail Panel -->
    <div id="ticketDetailPanel" class="mt-6" style="display:none;"></div>
  `;
}

function renderProfile() {
  return `
    <div class="page-header">
      <div>
        <div class="page-title">My Profile</div>
        <div class="page-subtitle">View and manage your personal information</div>
      </div>
      <button class="btn btn--secondary">${icon('settings', 16)} Edit Profile</button>
    </div>

    <!-- Profile Header -->
    <div class="card animate-in mb-6">
      <div class="profile-header">
        <div class="profile-avatar">${EMPLOYEE.initials}</div>
        <div>
          <div class="profile-info__name">${EMPLOYEE.name}</div>
          <div class="profile-info__role">${EMPLOYEE.role} · ${EMPLOYEE.department}</div>
          <div class="profile-info__id">${EMPLOYEE.employeeId}</div>
        </div>
      </div>
    </div>

    <!-- Tabs -->
    <div class="tabs">
      <div class="tab active" onclick="switchProfileTab(this,'personal')">Personal</div>
      <div class="tab" onclick="switchProfileTab(this,'company')">Company</div>
      <div class="tab" onclick="switchProfileTab(this,'bank')">Bank Info</div>
    </div>

    <div id="profileTabContent">
      ${renderProfilePersonal()}
    </div>
  `;
}

function renderProfilePersonal() {
  return `
    <div class="card animate-in">
      <div class="detail-grid">
        <div class="detail-item"><div class="detail-item__label">Full Name</div><div class="detail-item__value">${EMPLOYEE.name}</div></div>
        <div class="detail-item"><div class="detail-item__label">Gender</div><div class="detail-item__value">${EMPLOYEE.gender}</div></div>
        <div class="detail-item"><div class="detail-item__label">Date of Birth</div><div class="detail-item__value">${EMPLOYEE.dob}</div></div>
        <div class="detail-item"><div class="detail-item__label">Nationality</div><div class="detail-item__value">${EMPLOYEE.nationality}</div></div>
        <div class="detail-item"><div class="detail-item__label">Email</div><div class="detail-item__value" style="color:var(--green-600)">${EMPLOYEE.email}</div></div>
        <div class="detail-item"><div class="detail-item__label">Phone</div><div class="detail-item__value">${EMPLOYEE.phone}</div></div>
        <div class="detail-item"><div class="detail-item__label">Location</div><div class="detail-item__value">${EMPLOYEE.location}</div></div>
        <div class="detail-item"><div class="detail-item__label">ID Type</div><div class="detail-item__value">${EMPLOYEE.idType}</div></div>
      </div>
    </div>
  `;
}

function renderProfileCompany() {
  return `
    <div class="card animate-in">
      <div class="detail-grid">
        <div class="detail-item"><div class="detail-item__label">Employee ID</div><div class="detail-item__value" style="color:var(--green-600);font-family:'JetBrains Mono',monospace;">${EMPLOYEE.employeeId}</div></div>
        <div class="detail-item"><div class="detail-item__label">Department</div><div class="detail-item__value">${EMPLOYEE.department}</div></div>
        <div class="detail-item"><div class="detail-item__label">Role</div><div class="detail-item__value">${EMPLOYEE.role}</div></div>
        <div class="detail-item"><div class="detail-item__label">Manager</div><div class="detail-item__value">${EMPLOYEE.manager}</div></div>
        <div class="detail-item"><div class="detail-item__label">Join Date</div><div class="detail-item__value">${EMPLOYEE.joinDate}</div></div>
        <div class="detail-item"><div class="detail-item__label">Contract Type</div><div class="detail-item__value">${EMPLOYEE.contractType}</div></div>
      </div>
    </div>
  `;
}

function renderProfileBank() {
  return `
    <div class="card animate-in">
      <div class="detail-grid">
        <div class="detail-item"><div class="detail-item__label">Bank Name</div><div class="detail-item__value">${EMPLOYEE.bankName}</div></div>
        <div class="detail-item"><div class="detail-item__label">Account Number</div><div class="detail-item__value" style="color:var(--green-600);font-family:'JetBrains Mono',monospace;">${EMPLOYEE.bankAccount}</div></div>
      </div>
    </div>
  `;
}

function renderContract() {
  return `
    <div class="page-header">
      <div>
        <div class="page-title">Employment Contract</div>
        <div class="page-subtitle">View your contract details and terms</div>
      </div>
      <button class="btn btn--secondary">${icon('download', 16)} Download PDF</button>
    </div>

    <div class="card animate-in mb-6">
      <div class="contract-grid">
        <div class="contract-item"><div class="contract-item__label">Contract No.</div><div class="contract-item__value" style="color:var(--green-600);font-family:'JetBrains Mono',monospace;">CTR-2024-0032</div></div>
        <div class="contract-item"><div class="contract-item__label">Contract Type</div><div class="contract-item__value">Fixed-Term Employment</div></div>
        <div class="contract-item"><div class="contract-item__label">Status</div><div class="contract-item__value"><span class="badge badge--approved">Active</span></div></div>
        <div class="contract-item"><div class="contract-item__label">Effective Date</div><div class="contract-item__value">2024-03-15</div></div>
        <div class="contract-item"><div class="contract-item__label">Expiry Date</div><div class="contract-item__value">2027-03-14</div></div>
        <div class="contract-item"><div class="contract-item__label">Employer</div><div class="contract-item__value">RampingUp Technology Ltd.</div></div>
        <div class="contract-item"><div class="contract-item__label">Employee</div><div class="contract-item__value">${EMPLOYEE.name}</div></div>
        <div class="contract-item"><div class="contract-item__label">Position</div><div class="contract-item__value">${EMPLOYEE.role}</div></div>
        <div class="contract-item"><div class="contract-item__label">Work Location</div><div class="contract-item__value">${EMPLOYEE.location}</div></div>
      </div>
    </div>

    <div class="card animate-in">
      <div class="card__header">
        <div class="card__title">Compensation Summary</div>
      </div>
      <div class="card__body">
        <div class="salary-section">
          ${SALARY_DETAIL.earnings.map(e => `
            <div class="salary-row">
              <span class="salary-row__label">${e.component}</span>
              <span class="salary-row__value" style="color:var(--green-600)">${formatCurrency(e.amount)}</span>
            </div>
          `).join('')}
          <div class="salary-total">
            <span class="salary-total__label">Monthly Gross</span>
            <span class="salary-total__value" style="color:var(--green-600)">${formatCurrency(32000)}</span>
          </div>
        </div>
      </div>
    </div>
  `;
}

function renderWallet() {
  return `
    <div class="page-header">
      <div>
        <div class="page-title">E-Wallet</div>
        <div class="page-subtitle">Manage your digital wallet and transactions</div>
      </div>
    </div>

    <div class="stats-row" style="grid-template-columns:repeat(3,1fr);">
      <div class="stat-card animate-in">
        <div class="stat-card__header">
          <div class="stat-card__icon stat-card__icon--green">${icon('wallet')}</div>
        </div>
        <div class="stat-card__value">${formatCurrency(8520)}</div>
        <div class="stat-card__label">Available Balance</div>
      </div>
      <div class="stat-card animate-in">
        <div class="stat-card__header">
          <div class="stat-card__icon stat-card__icon--blue">${icon('arrowUp')}</div>
        </div>
        <div class="stat-card__value">${formatCurrency(25180)}</div>
        <div class="stat-card__label">Last Deposit</div>
      </div>
      <div class="stat-card animate-in">
        <div class="stat-card__header">
          <div class="stat-card__icon stat-card__icon--amber">${icon('arrowDown')}</div>
        </div>
        <div class="stat-card__value">${formatCurrency(16660)}</div>
        <div class="stat-card__label">Monthly Spending</div>
      </div>
    </div>

    <div class="card animate-in">
      <div class="card__header">
        <div class="card__title">Recent Transactions</div>
      </div>
      <div class="table-wrap">
        <table class="data-table">
          <thead>
            <tr><th>Date</th><th>Description</th><th>Amount</th><th>Type</th></tr>
          </thead>
          <tbody>
            <tr><td class="td-mono">2025-03-25</td><td class="td-primary">March Salary</td><td class="td-mono td-green">+${formatCurrency(25180)}</td><td><span class="badge-plain badge-plain--green">Credit</span></td></tr>
            <tr><td class="td-mono">2025-03-20</td><td class="td-primary">Transfer to Bank</td><td class="td-mono td-red">-${formatCurrency(15000)}</td><td><span class="badge-plain badge-plain--red">Debit</span></td></tr>
            <tr><td class="td-mono">2025-03-18</td><td class="td-primary">Expense Reimbursement</td><td class="td-mono td-green">+${formatCurrency(2899)}</td><td><span class="badge-plain badge-plain--green">Credit</span></td></tr>
            <tr><td class="td-mono">2025-03-15</td><td class="td-primary">Insurance Premium</td><td class="td-mono td-red">-${formatCurrency(1200)}</td><td><span class="badge-plain badge-plain--red">Debit</span></td></tr>
            <tr><td class="td-mono">2025-02-25</td><td class="td-primary">February Salary</td><td class="td-mono td-green">+${formatCurrency(25180)}</td><td><span class="badge-plain badge-plain--green">Credit</span></td></tr>
          </tbody>
        </table>
      </div>
    </div>
  `;
}

// ── Mock Approval Data ──────────────────────────────────────

const APPROVAL_FLOWS = {
  'LV-2401': [
    { step: 'Submitted', actor: 'Zhang Rui', role: 'Employee', time: '2025-03-08 09:15', status: 'done', comment: '' },
    { step: 'Manager Approval', actor: 'Li Wei', role: 'Direct Manager', time: '2025-03-08 14:30', status: 'done', comment: 'Approved. Enjoy your vacation!' },
    { step: 'HR Review', actor: 'Wang Mei', role: 'HR Manager', time: '2025-03-09 10:00', status: 'done', comment: '' },
  ],
  'LV-2402': [
    { step: 'Submitted', actor: 'Zhang Rui', role: 'Employee', time: '2025-02-20 08:30', status: 'done', comment: '' },
    { step: 'Manager Approval', actor: 'Li Wei', role: 'Direct Manager', time: '2025-02-20 09:45', status: 'done', comment: 'Get well soon.' },
    { step: 'HR Review', actor: 'Wang Mei', role: 'HR Manager', time: '2025-02-20 11:00', status: 'done', comment: '' },
  ],
  'LV-2403': [
    { step: 'Submitted', actor: 'Zhang Rui', role: 'Employee', time: '2025-04-03 10:00', status: 'done', comment: '' },
    { step: 'Manager Approval', actor: 'Li Wei', role: 'Direct Manager', time: '', status: 'current', comment: '' },
    { step: 'HR Review', actor: 'Wang Mei', role: 'HR Manager', time: '', status: 'pending', comment: '' },
  ],
  'LV-2406': [
    { step: 'Submitted', actor: 'Zhang Rui', role: 'Employee', time: '2024-12-09 16:00', status: 'done', comment: '' },
    { step: 'Manager Approval', actor: 'Li Wei', role: 'Direct Manager', time: '2024-12-10 09:00', status: 'rejected', comment: 'Team is at full capacity that day. Please choose another date.' },
  ],
};

const EXPENSE_APPROVAL_FLOWS = {
  'EC-2401': [
    { step: 'Submitted', actor: 'Zhang Rui', role: 'Employee', time: '2025-03-18 17:00', status: 'done', comment: '' },
    { step: 'Manager Approval', actor: 'Li Wei', role: 'Direct Manager', time: '', status: 'current', comment: '' },
    { step: 'Finance Review', actor: 'Chen Fang', role: 'Finance', time: '', status: 'pending', comment: '' },
  ],
  'EC-2402': [
    { step: 'Submitted', actor: 'Zhang Rui', role: 'Employee', time: '2025-03-05 10:30', status: 'done', comment: '' },
    { step: 'Manager Approval', actor: 'Li Wei', role: 'Direct Manager', time: '2025-03-05 15:00', status: 'done', comment: '' },
    { step: 'Finance Review', actor: 'Chen Fang', role: 'Finance', time: '2025-03-06 11:00', status: 'done', comment: 'Reimbursement processed.' },
  ],
  'EC-2404': [
    { step: 'Submitted', actor: 'Zhang Rui', role: 'Employee', time: '2025-02-10 09:00', status: 'done', comment: '' },
    { step: 'Manager Approval', actor: 'Li Wei', role: 'Direct Manager', time: '2025-02-11 10:00', status: 'rejected', comment: 'Monthly taxi exceeds policy limit of ¥800. Please resubmit partial amount.' },
  ],
};

// ── Approval Flow Renderer ──────────────────────────────────

function renderApprovalFlow(steps) {
  if (!steps || !steps.length) {
    return `<div style="padding:12px 0;font-size:13px;color:var(--gray-400);">No approval flow available.</div>`;
  }
  const stepIcons = {
    done: '✓',
    current: '⏳',
    rejected: '✕',
    pending: '·',
  };
  return `
    <div class="approval-flow">
      ${steps.map(s => `
        <div class="approval-step step--${s.status}">
          <div class="approval-step__icon">${stepIcons[s.status] || '·'}</div>
          <div class="approval-step__content">
            <div class="approval-step__title">${s.step}</div>
            <div class="approval-step__meta">
              <span>${s.actor}</span>
              <span style="color:var(--gray-300)">·</span>
              <span>${s.role}</span>
              ${s.time ? `<span style="color:var(--gray-300)">·</span><span>${s.time}</span>` : ''}
              ${s.status === 'current' ? '<span class="badge badge--pending">Awaiting</span>' : ''}
              ${s.status === 'rejected' ? '<span class="badge badge--rejected">Rejected</span>' : ''}
              ${s.status === 'done' ? '<span class="badge badge--approved">Done</span>' : ''}
              ${s.status === 'pending' ? '<span class="badge badge--draft">Pending</span>' : ''}
            </div>
            ${s.comment ? `<div class="approval-step__comment">${s.comment}</div>` : ''}
          </div>
        </div>
      `).join('')}
    </div>
  `;
}

// ── Modal System ────────────────────────────────────────────

function openModal(title, bodyHTML, footerHTML, wide) {
  let backdrop = document.getElementById('appModal');
  if (!backdrop) {
    backdrop = document.createElement('div');
    backdrop.id = 'appModal';
    backdrop.className = 'modal-backdrop';
    backdrop.addEventListener('click', function(e) {
      if (e.target === backdrop) closeModal();
    });
    document.body.appendChild(backdrop);
  }
  backdrop.innerHTML = `
    <div class="modal${wide ? ' modal--wide' : ''}">
      <div class="modal__header">
        <div class="modal__title">${title}</div>
        <button class="modal__close" onclick="closeModal()">${icon('x', 18)}</button>
      </div>
      <div class="modal__body">${bodyHTML}</div>
      ${footerHTML ? `<div class="modal__footer">${footerHTML}</div>` : ''}
    </div>
  `;
  backdrop.classList.add('open');
  document.body.style.overflow = 'hidden';
}

window.closeModal = function() {
  const backdrop = document.getElementById('appModal');
  if (backdrop) {
    backdrop.classList.remove('open');
    document.body.style.overflow = '';
  }
};

// ── Leave Form ──────────────────────────────────────────────

window.openLeaveForm = function() {
  const body = `
    <div class="form-group">
      <label class="form-label">Leave Type</label>
      <select class="form-select">
        <option value="">Select leave type...</option>
        ${LEAVE_TYPES.map(lt => `<option value="${lt.type}">${lt.type} (${lt.total - lt.used} days left)</option>`).join('')}
      </select>
    </div>
    <div class="form-row">
      <div class="form-group">
        <label class="form-label">From Date</label>
        <input type="date" class="form-input"/>
      </div>
      <div class="form-group">
        <label class="form-label">To Date</label>
        <input type="date" class="form-input"/>
      </div>
    </div>
    <div class="form-row">
      <div class="form-group">
        <label class="form-checkbox">
          <input type="checkbox"/> From half-day (afternoon only)
        </label>
      </div>
      <div class="form-group">
        <label class="form-checkbox">
          <input type="checkbox"/> To half-day (morning only)
        </label>
      </div>
    </div>
    <div class="form-group">
      <label class="form-label">Reason</label>
      <textarea class="form-textarea" placeholder="Please describe the reason for your leave request..." rows="3"></textarea>
    </div>
    <div class="form-group">
      <label class="form-label">Attachment</label>
      <input type="file" class="form-input" style="padding:7px 12px;"/>
      <div class="form-hint">Upload supporting documents if needed (e.g. medical certificate)</div>
    </div>
  `;
  const footer = `
    <button class="btn btn--secondary" onclick="closeModal()">Cancel</button>
    <button class="btn btn--secondary" onclick="closeModal()">Save Draft</button>
    <button class="btn btn--primary" onclick="closeModal()">Submit for Approval</button>
  `;
  openModal('New Leave Request', body, footer);
};

// ── Expense Form ────────────────────────────────────────────

window.openExpenseForm = function() {
  const body = `
    <div class="form-row">
      <div class="form-group">
        <label class="form-label">Expense Category</label>
        <select class="form-select">
          <option value="">Select category...</option>
          <option>Travel</option>
          <option>Equipment</option>
          <option>Meals</option>
          <option>Transportation</option>
          <option>Communication</option>
          <option>Office Supplies</option>
          <option>Other</option>
        </select>
      </div>
      <div class="form-group">
        <label class="form-label">Currency</label>
        <select class="form-select">
          <option>CNY</option>
          <option>USD</option>
          <option>EUR</option>
        </select>
      </div>
    </div>
    <div class="form-row">
      <div class="form-group">
        <label class="form-label">From Date</label>
        <input type="date" class="form-input"/>
      </div>
      <div class="form-group">
        <label class="form-label">To Date</label>
        <input type="date" class="form-input"/>
      </div>
    </div>
    <div class="form-group">
      <label class="form-label">Description</label>
      <textarea class="form-textarea" placeholder="Describe the expense purpose..." rows="2"></textarea>
    </div>
    <div class="form-group">
      <label class="form-label">Total Amount</label>
      <input type="number" class="form-input" placeholder="0.00"/>
    </div>
    <div class="form-group">
      <label class="form-label">Receipts / Attachments</label>
      <input type="file" class="form-input" multiple style="padding:7px 12px;"/>
      <div class="form-hint">Upload receipts or invoices. Multiple files allowed.</div>
    </div>
  `;
  const footer = `
    <button class="btn btn--secondary" onclick="closeModal()">Cancel</button>
    <button class="btn btn--secondary" onclick="closeModal()">Save Draft</button>
    <button class="btn btn--primary" onclick="closeModal()">Submit for Approval</button>
  `;
  openModal('New Expense Claim', body, footer);
};

// ── Ticket Form ─────────────────────────────────────────────

window.openTicketForm = function() {
  const body = `
    <div class="form-group">
      <label class="form-label">Category</label>
      <select class="form-select">
        <option value="">Select category...</option>
        <option>IT Support</option>
        <option>Facilities</option>
        <option>HR</option>
        <option>Finance</option>
        <option>Other</option>
      </select>
    </div>
    <div class="form-group">
      <label class="form-label">Priority</label>
      <select class="form-select">
        <option value="Medium">Medium</option>
        <option value="High">High</option>
        <option value="Low">Low</option>
      </select>
    </div>
    <div class="form-group">
      <label class="form-label">Subject</label>
      <input type="text" class="form-input" placeholder="Brief description of the issue..."/>
    </div>
    <div class="form-group">
      <label class="form-label">Description</label>
      <textarea class="form-textarea" placeholder="Provide details about the issue, steps to reproduce, and any relevant context..." rows="5"></textarea>
    </div>
    <div class="form-group">
      <label class="form-label">Attachments</label>
      <input type="file" class="form-input" multiple style="padding:7px 12px;"/>
      <div class="form-hint">Upload screenshots or supporting files</div>
    </div>
  `;
  const footer = `
    <button class="btn btn--secondary" onclick="closeModal()">Cancel</button>
    <button class="btn btn--primary" onclick="closeModal()">Create Ticket</button>
  `;
  openModal('New Support Ticket', body, footer);
};

// ── Leave Detail View with Approval Flow ────────────────────

window.viewLeaveDetail = function(id) {
  const lr = LEAVE_REQUESTS.find(l => l.id === id);
  if (!lr) return;
  const flow = APPROVAL_FLOWS[id] || [
    { step: 'Submitted', actor: EMPLOYEE.name, role: 'Employee', time: lr.from, status: 'done', comment: '' },
    { step: 'Manager Approval', actor: lr.approver, role: 'Direct Manager', time: '', status: lr.status === 'Approved' ? 'done' : (lr.status === 'Pending' ? 'current' : 'pending'), comment: '' },
  ];

  const canRevoke = lr.status === 'Pending';
  const canCancel = lr.status === 'Draft';

  const panel = document.getElementById('leaveDetailPanel');
  panel.innerHTML = `
    <div class="detail-panel">
      <div class="card">
        <div class="card__header">
          <div class="card__title">${icon('calendar', 18)} &nbsp;Leave Request — <span style="color:var(--green-600);font-family:'JetBrains Mono',monospace;">${lr.id}</span></div>
          <button class="btn btn--ghost btn--sm" onclick="document.getElementById('leaveDetailPanel').style.display='none'">${icon('x', 14)} Close</button>
        </div>

        <!-- Info Grid -->
        <div class="detail-section">
          <div class="detail-section__title">Request Details</div>
          <div class="detail-info-grid">
            <div class="detail-info-item">
              <div class="detail-info-item__label">Leave Type</div>
              <div class="detail-info-item__value">${lr.type}</div>
            </div>
            <div class="detail-info-item">
              <div class="detail-info-item__label">From</div>
              <div class="detail-info-item__value" style="font-family:'JetBrains Mono',monospace;">${lr.from}</div>
            </div>
            <div class="detail-info-item">
              <div class="detail-info-item__label">To</div>
              <div class="detail-info-item__value" style="font-family:'JetBrains Mono',monospace;">${lr.to}</div>
            </div>
            <div class="detail-info-item">
              <div class="detail-info-item__label">Duration</div>
              <div class="detail-info-item__value">${lr.days} day${lr.days > 1 ? 's' : ''}</div>
            </div>
            <div class="detail-info-item">
              <div class="detail-info-item__label">Status</div>
              <div class="detail-info-item__value"><span class="badge badge--${statusClass(lr.status)}">${lr.status}</span></div>
            </div>
            <div class="detail-info-item">
              <div class="detail-info-item__label">Approver</div>
              <div class="detail-info-item__value">${lr.approver}</div>
            </div>
          </div>
        </div>

        <!-- Approval Flow -->
        <div class="detail-section">
          <div class="detail-section__title">Approval Flow</div>
          ${renderApprovalFlow(flow)}
        </div>

        <!-- Actions -->
        ${(canRevoke || canCancel) ? `
        <div class="action-bar">
          <div class="action-bar__spacer"></div>
          ${canCancel ? `<button class="btn btn--secondary" onclick="document.getElementById('leaveDetailPanel').style.display='none'">Delete Draft</button>
          <button class="btn btn--primary">Submit for Approval</button>` : ''}
          ${canRevoke ? `<button class="btn btn--secondary" style="color:var(--red-500);border-color:var(--red-500);">Revoke Request</button>` : ''}
        </div>` : ''}
      </div>
    </div>
  `;
  panel.style.display = 'block';
  panel.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
};

// ── Expense Detail View with Approval Flow ──────────────────

window.viewExpenseDetail = function(id) {
  const ex = EXPENSES.find(e => e.id === id);
  if (!ex) return;
  const flow = EXPENSE_APPROVAL_FLOWS[id] || [
    { step: 'Submitted', actor: EMPLOYEE.name, role: 'Employee', time: ex.date, status: 'done', comment: '' },
    { step: 'Manager Approval', actor: 'Li Wei', role: 'Direct Manager', time: '', status: ex.status === 'Approved' ? 'done' : (ex.status === 'Pending' ? 'current' : 'pending'), comment: '' },
    { step: 'Finance Review', actor: 'Chen Fang', role: 'Finance', time: '', status: 'pending', comment: '' },
  ];

  const canCancel = ex.status === 'Draft';

  const panel = document.getElementById('expenseDetailPanel');
  panel.innerHTML = `
    <div class="detail-panel">
      <div class="card">
        <div class="card__header">
          <div class="card__title">${icon('receipt', 18)} &nbsp;Expense Claim — <span style="color:var(--green-600);font-family:'JetBrains Mono',monospace;">${ex.id}</span></div>
          <button class="btn btn--ghost btn--sm" onclick="document.getElementById('expenseDetailPanel').style.display='none'">${icon('x', 14)} Close</button>
        </div>

        <!-- Info Grid -->
        <div class="detail-section">
          <div class="detail-section__title">Claim Details</div>
          <div class="detail-info-grid">
            <div class="detail-info-item">
              <div class="detail-info-item__label">Category</div>
              <div class="detail-info-item__value">${ex.category}</div>
            </div>
            <div class="detail-info-item">
              <div class="detail-info-item__label">Date</div>
              <div class="detail-info-item__value" style="font-family:'JetBrains Mono',monospace;">${ex.date}</div>
            </div>
            <div class="detail-info-item">
              <div class="detail-info-item__label">Items</div>
              <div class="detail-info-item__value">${ex.items} item${ex.items > 1 ? 's' : ''}</div>
            </div>
            <div class="detail-info-item">
              <div class="detail-info-item__label">Amount</div>
              <div class="detail-info-item__value" style="font-weight:700;color:var(--gray-900);font-family:'JetBrains Mono',monospace;">${formatCurrency(ex.amount)}</div>
            </div>
            <div class="detail-info-item">
              <div class="detail-info-item__label">Status</div>
              <div class="detail-info-item__value"><span class="badge badge--${statusClass(ex.status)}">${ex.status}</span></div>
            </div>
            <div class="detail-info-item">
              <div class="detail-info-item__label">Description</div>
              <div class="detail-info-item__value">${ex.description}</div>
            </div>
          </div>
        </div>

        <!-- Approval Flow -->
        <div class="detail-section">
          <div class="detail-section__title">Approval Flow</div>
          ${renderApprovalFlow(flow)}
        </div>

        <!-- Actions -->
        ${canCancel ? `
        <div class="action-bar">
          <div class="action-bar__spacer"></div>
          <button class="btn btn--secondary" onclick="document.getElementById('expenseDetailPanel').style.display='none'">Delete Draft</button>
          <button class="btn btn--primary">Submit for Approval</button>
        </div>` : ''}
      </div>
    </div>
  `;
  panel.style.display = 'block';
  panel.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
};

// ── Other Interactive Functions ──────────────────────────────

window.filterTable = function(el, tableId, status) {
  el.parentElement.querySelectorAll('.filter-chip').forEach(c => c.classList.remove('active'));
  el.classList.add('active');
  document.querySelectorAll(`#${tableId} tbody tr`).forEach(tr => {
    tr.style.display = (status === 'all' || tr.dataset.status === status) ? '' : 'none';
  });
};

window.showSalaryDetail = function(id) {
  const slip = SALARY_SLIPS.find(s => s.id === id);
  if (!slip) return;
  document.getElementById('salaryDetailPeriod').textContent = slip.period;
  const panel = document.getElementById('salaryDetailPanel');
  panel.style.display = 'block';
  panel.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
};

window.showTicketDetail = function(id) {
  const ticket = TICKETS.find(t => t.id === id);
  if (!ticket) return;
  const panel = document.getElementById('ticketDetailPanel');
  panel.innerHTML = `
    <div class="detail-panel">
      <div class="card">
        <div class="card__header">
          <div class="card__title">${icon('ticket', 18)} &nbsp;${ticket.subject}</div>
          <button class="btn btn--ghost btn--sm" onclick="document.getElementById('ticketDetailPanel').style.display='none'">${icon('x', 14)} Close</button>
        </div>
        <div class="detail-section">
          <div class="detail-section__title">Ticket Details</div>
          <div class="detail-info-grid">
            <div class="detail-info-item">
              <div class="detail-info-item__label">Ticket ID</div>
              <div class="detail-info-item__value" style="font-family:'JetBrains Mono',monospace;color:var(--green-600)">${ticket.id}</div>
            </div>
            <div class="detail-info-item">
              <div class="detail-info-item__label">Category</div>
              <div class="detail-info-item__value">${ticket.category}</div>
            </div>
            <div class="detail-info-item">
              <div class="detail-info-item__label">Priority</div>
              <div class="detail-info-item__value"><span class="priority"><span class="priority-dot priority-dot--${ticket.priority.toLowerCase()}"></span>${ticket.priority}</span></div>
            </div>
            <div class="detail-info-item">
              <div class="detail-info-item__label">Status</div>
              <div class="detail-info-item__value"><span class="badge badge--${statusClass(ticket.status)}">${ticket.status}</span></div>
            </div>
            <div class="detail-info-item">
              <div class="detail-info-item__label">Created</div>
              <div class="detail-info-item__value" style="font-family:'JetBrains Mono',monospace;">${ticket.created}</div>
            </div>
            <div class="detail-info-item">
              <div class="detail-info-item__label">Updated</div>
              <div class="detail-info-item__value" style="font-family:'JetBrains Mono',monospace;">${ticket.updated}</div>
            </div>
          </div>
        </div>
        <div class="detail-section">
          <div class="detail-section__title">Description</div>
          <div class="ticket-description">
            <p>This is a sample description for ticket ${ticket.id}. In a real application, this would contain the detailed issue description, steps to reproduce, and any relevant context.</p>
          </div>
        </div>
        <div class="detail-section">
          <div class="detail-section__title">Activity</div>
          <div class="timeline">
            <div class="timeline-item">
              <div class="timeline-dot"></div>
              <div class="timeline-content">
                <div class="timeline-text">Status updated to ${ticket.status}</div>
                <div class="timeline-time">${ticket.updated} 10:30</div>
              </div>
            </div>
            <div class="timeline-item">
              <div class="timeline-dot"></div>
              <div class="timeline-content">
                <div class="timeline-text">Ticket created by ${EMPLOYEE.name}</div>
                <div class="timeline-time">${ticket.created} 09:00</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;
  panel.style.display = 'block';
  panel.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
};

window.switchProfileTab = function(el, tab) {
  el.parentElement.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
  el.classList.add('active');
  const content = document.getElementById('profileTabContent');
  if (tab === 'personal') content.innerHTML = renderProfilePersonal();
  else if (tab === 'company') content.innerHTML = renderProfileCompany();
  else if (tab === 'bank') content.innerHTML = renderProfileBank();
};

window.filterSalaryYear = function() {};

// ── Router ──────────────────────────────────────────────────

const ROUTES = {
  '/': { render: renderDashboard, title: 'Dashboard', crumb: 'Dashboard' },
  '/leave': { render: renderLeave, title: 'Leave', crumb: 'Leave Management' },
  '/salary': { render: renderSalary, title: 'Salary', crumb: 'Salary Slips' },
  '/expenses': { render: renderExpenses, title: 'Expenses', crumb: 'Expenses' },
  '/tickets': { render: renderTickets, title: 'Tickets', crumb: 'Support Tickets' },
  '/profile': { render: renderProfile, title: 'Profile', crumb: 'My Profile' },
  '/contract': { render: renderContract, title: 'Contract', crumb: 'Contract' },
  '/wallet': { render: renderWallet, title: 'Wallet', crumb: 'E-Wallet' },
};

function navigate() {
  const hash = window.location.hash.slice(1) || '/';
  const route = ROUTES[hash] || ROUTES['/'];

  const content = document.getElementById('appContent');
  content.innerHTML = route.render();
  content.scrollTop = 0;

  document.querySelectorAll('.nav-item').forEach(item => {
    item.classList.toggle('active', item.dataset.route === hash);
  });

  const crumb = document.getElementById('breadcrumb');
  if (crumb) {
    crumb.innerHTML = `
      <span>Employee Portal</span>
      <span style="color:var(--gray-300)">${icon('chevronRight', 14)}</span>
      <span class="breadcrumb__current">${route.crumb}</span>
    `;
  }

  document.querySelector('.sidebar')?.classList.remove('open');
  document.querySelector('.overlay')?.classList.remove('show');
}

// ── Sidebar Toggle ──────────────────────────────────────────
window.toggleSidebar = function() {
  document.querySelector('.sidebar').classList.toggle('open');
  document.querySelector('.overlay').classList.toggle('show');
};

// ── Keyboard shortcuts ──────────────────────────────────────
document.addEventListener('keydown', function(e) {
  if (e.key === 'Escape') closeModal();
});

// ── Init ────────────────────────────────────────────────────
window.addEventListener('hashchange', navigate);
window.addEventListener('DOMContentLoaded', navigate);
