/* ═══════════════════════════════════════════════════════════════
   RampingUp Employee Portal — Refactored Application Logic
   Matches RampingUp.Site.Customer functionality
   ═══════════════════════════════════════════════════════════════ */

// ── Mock Data (matching Customer API models) ────────────────────
const EMPLOYEE = {
  name: 'Zhang Rui', initials: 'ZR', role: 'Software Engineer',
  department: 'Engineering', employeeId: 'EMP-2024-0032',
  email: 'zhang.rui@rampingup.com', phone: '+86 138 8888 0032',
  joinDate: '2024-03-15', manager: 'Li Wei', location: 'Shanghai, China',
  contractType: 'Full-time', gender: 'Male', dob: '1995-06-20',
  bankName: 'China Merchants Bank', bankAccount: '**** **** **** 6789',
  status: 'Active', country: 'China',
};

// Team (employees list matching /api/hrms/emr/employees)
const TEAM_MEMBERS = [
  { id: 'EMP-001', name: 'Zhang Rui', email: 'zhang.rui@rampingup.com', department: 'Engineering', designation: 'Software Engineer', country: 'China', status: 'Active', type: 'Employee', joinDate: '2024-03-15' },
  { id: 'EMP-002', name: 'Li Wei', email: 'li.wei@rampingup.com', department: 'Engineering', designation: 'Engineering Manager', country: 'China', status: 'Active', type: 'Employee', joinDate: '2023-06-01' },
  { id: 'EMP-003', name: 'Wang Chen', email: 'wang.chen@rampingup.com', department: 'Product', designation: 'Product Manager', country: 'China', status: 'Active', type: 'Employee', joinDate: '2023-09-10' },
  { id: 'EMP-004', name: 'Sarah Johnson', email: 'sarah.j@rampingup.com', department: 'Design', designation: 'UI/UX Designer', country: 'United States', status: 'Active', type: 'Employee', joinDate: '2024-01-08' },
  { id: 'EMP-005', name: 'Maria Santos', email: 'maria.s@rampingup.com', department: 'Marketing', designation: 'Marketing Specialist', country: 'Philippines', status: 'Active', type: 'Employee', joinDate: '2024-05-20' },
  { id: 'EMP-006', name: 'Alex Kim', email: 'alex.k@rampingup.com', department: 'Engineering', designation: 'DevOps Engineer', country: 'South Korea', status: 'Inactive', type: 'Contractor', joinDate: '2024-02-12' },
  { id: 'EMP-007', name: 'Tanaka Yuki', email: 'tanaka.y@rampingup.com', department: 'Finance', designation: 'Finance Analyst', country: 'Japan', status: 'Active', type: 'Employee', joinDate: '2023-11-15' },
  { id: 'EMP-008', name: 'David Miller', email: 'david.m@rampingup.com', department: 'Engineering', designation: 'Backend Developer', country: 'United Kingdom', status: 'Draft', type: 'Employee', joinDate: '2025-04-01' },
];

// Service Progress (matching /api/hrms/emr/services)
const SERVICES = [
  { id: 'SRV-001', title: 'Onboard David Miller', type: 'OnboardAnEmployee', employee: 'David Miller', country: 'United Kingdom', status: 'PendingDocuments', stage: 2, totalStages: 5, createdAt: '2025-03-20', progress: 40 },
  { id: 'SRV-002', title: 'Onboard Contractor — Alex Kim', type: 'OnboardAContractor', employee: 'Alex Kim', country: 'South Korea', status: 'ContractApproved', stage: 4, totalStages: 5, createdAt: '2024-01-28', progress: 80 },
  { id: 'SRV-003', title: 'Run Payroll — March 2025', type: 'RunPayroll', employee: '-', country: '-', status: 'Completed', stage: 5, totalStages: 5, createdAt: '2025-03-01', progress: 100 },
  { id: 'SRV-004', title: 'Onboard Maria Santos', type: 'OnboardAnEmployee', employee: 'Maria Santos', country: 'Philippines', status: 'Completed', stage: 5, totalStages: 5, createdAt: '2024-05-10', progress: 100 },
];

const LEAVE_TYPES = [
  { type: 'Annual Leave', total: 15, used: 7, color: '#3b82f6' },
  { type: 'Sick Leave', total: 10, used: 2, color: '#8b5cf6' },
  { type: 'Personal Leave', total: 5, used: 1, color: '#06b6d4' },
  { type: 'Compensatory', total: 3, used: 0, color: '#10b981' },
];

// Leave applications (matching /api/hrms/emr/leave-applications)
const LEAVE_REQUESTS = [
  { id: 'LV-2401', type: 'Annual Leave', from: '2025-03-10', to: '2025-03-14', days: 5, status: 'Approved', approver: 'Li Wei', halfDay: 'Full' },
  { id: 'LV-2402', type: 'Sick Leave', from: '2025-02-20', to: '2025-02-21', days: 2, status: 'Approved', approver: 'Li Wei', halfDay: 'Full' },
  { id: 'LV-2403', type: 'Annual Leave', from: '2025-04-05', to: '2025-04-06', days: 2, status: 'Pending', approver: 'Li Wei', halfDay: 'Full' },
  { id: 'LV-2404', type: 'Personal Leave', from: '2025-01-15', to: '2025-01-15', days: 1, status: 'Approved', approver: 'Li Wei', halfDay: 'FirstHalf' },
  { id: 'LV-2405', type: 'Annual Leave', from: '2025-05-01', to: '2025-05-02', days: 2, status: 'Draft', approver: '-', halfDay: 'Full' },
  { id: 'LV-2406', type: 'Sick Leave', from: '2024-12-10', to: '2024-12-10', days: 1, status: 'Rejected', approver: 'Li Wei', halfDay: 'Full' },
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

// Expense claims (matching /api/hrms/emr/expense-claim)
const EXPENSES = [
  { id: 'EC-2401', date: '2025-03-18', category: 'Travel', description: 'Business trip to Beijing', amount: 4580, currency: 'CNY', status: 'Pending', items: 3 },
  { id: 'EC-2402', date: '2025-03-05', category: 'Equipment', description: 'External monitor purchase', amount: 2899, currency: 'CNY', status: 'Approved', items: 1 },
  { id: 'EC-2403', date: '2025-02-20', category: 'Meals', description: 'Client dinner - Project Alpha', amount: 860, currency: 'CNY', status: 'Approved', items: 1 },
  { id: 'EC-2404', date: '2025-02-10', category: 'Transportation', description: 'Monthly taxi reimbursement', amount: 1200, currency: 'CNY', status: 'Rejected', items: 5 },
  { id: 'EC-2405', date: '2025-01-28', category: 'Communication', description: 'Annual phone plan', amount: 1680, currency: 'CNY', status: 'Approved', items: 1 },
  { id: 'EC-2406', date: '2025-03-22', category: 'Travel', description: 'Shenzhen conference travel', amount: 3200, currency: 'CNY', status: 'Draft', items: 4 },
];

// Tickets (matching /api/hrms/emr/tickets)
const TICKETS = [
  { id: 'TK-0089', subject: 'VPN access not working from home', category: 'IT_SUPPORT', priority: 'P1', status: 'Open', created: '2025-03-20', updated: '2025-03-21' },
  { id: 'TK-0088', subject: 'Request for additional software license', category: 'IT_SUPPORT', priority: 'P2', status: 'Pending', created: '2025-03-18', updated: '2025-03-19' },
  { id: 'TK-0085', subject: 'Office desk lamp replacement', category: 'REPAIR', priority: 'P3', status: 'Closed', created: '2025-03-10', updated: '2025-03-15' },
  { id: 'TK-0082', subject: 'Payslip discrepancy for February', category: 'CONSULTATION', priority: 'P1', status: 'Closed', created: '2025-03-02', updated: '2025-03-05' },
  { id: 'TK-0079', subject: 'Meeting room booking system error', category: 'IT_SUPPORT', priority: 'P2', status: 'Open', created: '2025-02-28', updated: '2025-03-01' },
];

const TICKET_COMMENTS = [
  { author: 'Zhang Rui', time: '2025-03-21 10:30', body: 'I tried reconnecting but still getting timeout errors. The VPN client version is 4.2.1.' },
  { author: 'IT Support', time: '2025-03-21 14:15', body: 'Please try clearing your DNS cache and reconnecting. If the issue persists, we will schedule a remote session.' },
];

// Holidays (matching /api/hrms/emr/holiday-list)
const HOLIDAYS = [
  { name: "New Year's Day", date: '2025-01-01', day: 'Wednesday' },
  { name: 'Chinese New Year', date: '2025-01-29', day: 'Wednesday' },
  { name: 'Chinese New Year', date: '2025-01-30', day: 'Thursday' },
  { name: 'Chinese New Year', date: '2025-01-31', day: 'Friday' },
  { name: "Qingming Festival", date: '2025-04-04', day: 'Friday' },
  { name: 'Labour Day', date: '2025-05-01', day: 'Thursday' },
  { name: 'Dragon Boat Festival', date: '2025-05-31', day: 'Saturday' },
  { name: 'Mid-Autumn Festival', date: '2025-10-06', day: 'Monday' },
  { name: 'National Day', date: '2025-10-01', day: 'Wednesday' },
  { name: 'National Day', date: '2025-10-02', day: 'Thursday' },
  { name: 'National Day', date: '2025-10-03', day: 'Friday' },
];

const RECENT_ACTIVITY = [
  { time: '2025-03-21 14:30', text: 'Leave request LV-2403 submitted for approval' },
  { time: '2025-03-20 09:15', text: 'Ticket TK-0089 created: VPN access issue' },
  { time: '2025-03-18 16:45', text: 'Expense claim EC-2401 submitted (¥4,580)' },
  { time: '2025-03-15 10:00', text: 'March salary slip generated' },
  { time: '2025-03-10 11:30', text: 'Leave request LV-2401 approved by Li Wei' },
];

const TRANSACTIONS = [
  { type: 'in', title: 'Salary — March 2025', date: '2025-03-25', amount: 25180 },
  { type: 'in', title: 'Expense Reimbursement', date: '2025-03-20', amount: 2899 },
  { type: 'out', title: 'Insurance Deduction', date: '2025-03-15', amount: 3360 },
  { type: 'in', title: 'Salary — February 2025', date: '2025-02-25', amount: 25180 },
  { type: 'in', title: 'Expense Reimbursement', date: '2025-02-18', amount: 860 },
  { type: 'out', title: 'Insurance Deduction', date: '2025-02-15', amount: 3360 },
  { type: 'in', title: 'Salary — January 2025', date: '2025-01-25', amount: 25180 },
  { type: 'in', title: 'Year-End Bonus', date: '2025-01-20', amount: 48000 },
];

// ── Helpers ──────────────────────────────────────────────────
function fmt(n) { return '¥' + n.toLocaleString('zh-CN'); }

function statusClass(s) {
  return { Approved: 'approved', Pending: 'pending', Rejected: 'rejected', Draft: 'draft',
    Cancelled: 'cancelled', Submitted: 'submitted', Open: 'open', Closed: 'closed',
    Active: 'active', Inactive: 'draft', PendingDocuments: 'pending',
    ContractApproved: 'approved', OfferLetterApproved: 'approved',
    Completed: 'approved', Processing: 'processing' }[s] || 'draft';
}

function serviceTypeLabel(t) {
  return { OnboardAnEmployee: 'Employee Onboarding', OnboardAContractor: 'Contractor Onboarding', RunPayroll: 'Payroll' }[t] || t;
}

function serviceStatusLabel(s) {
  return { PendingDocuments: 'Pending Documents', ContractApproved: 'Contract Approved',
    OfferLetterApproved: 'Offer Letter Approved', Completed: 'Completed',
    VendorCompleted: 'Vendor Completed' }[s] || s;
}

function priorityLabel(p) {
  return { P0: 'Urgent', P1: 'High', P2: 'Medium', P3: 'Low' }[p] || p;
}

function categoryLabel(c) {
  return { CONSULTATION: 'Consultation', IT_SUPPORT: 'IT Support', COMPLAINT: 'Complaint',
    REPAIR: 'Repair', SUGGESTION: 'Suggestion' }[c] || c;
}

function icon(name) {
  const m = {
    calendar: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" width="15" height="15"><rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/></svg>',
    dollar: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" width="15" height="15"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6"/></svg>',
    receipt: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" width="15" height="15"><path d="M21 4H3v16h18V4z"/><path d="M21 10H3M7 15h4"/></svg>',
    ticket: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" width="15" height="15"><path d="M15 5H9l-1 8h8l-1-8zM9 5L7.6 2h8.8L15 5"/><path d="M8 13v4a3 3 0 003 3h2a3 3 0 003-3v-4"/></svg>',
    plus: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="15" height="15"><path d="M12 5v14M5 12h14"/></svg>',
    eye: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" width="14" height="14"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>',
    up: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="11" height="11"><path d="M12 19V5M5 12l7-7 7 7"/></svg>',
    down: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="11" height="11"><path d="M12 5v14M5 12l7 7 7-7"/></svg>',
    clock: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" width="14" height="14"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>',
    tag: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" width="14" height="14"><path d="M20.59 13.41l-7.17 7.17a2 2 0 01-2.83 0L2 12V2h10l8.59 8.59a2 2 0 010 2.82z"/><circle cx="7" cy="7" r="1"/></svg>',
    download: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" width="15" height="15"><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>',
    upload: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" width="22" height="22"><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg>',
    close: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="16" height="16"><path d="M18 6L6 18M6 6l12 12"/></svg>',
    check: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" width="14" height="14"><path d="M20 6L9 17l-5-5"/></svg>',
    users: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" width="15" height="15"><circle cx="9" cy="7" r="3"/><path d="M13 21v-2a4 4 0 00-8 0v2"/><circle cx="17" cy="10" r="2"/><path d="M21 21v-1.5a3 3 0 00-4-2.8"/></svg>',
    search: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" width="14" height="14"><circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/></svg>',
  };
  return m[name] || '';
}

function balanceRing(used, total, color) {
  const r = 16, c = 2 * Math.PI * r, pct = total > 0 ? (total - used) / total : 0;
  return `<svg viewBox="0 0 44 44"><circle class="balance-ring__track" cx="22" cy="22" r="${r}"/>
    <circle class="balance-ring__fill" cx="22" cy="22" r="${r}" stroke="${color}" stroke-dasharray="${c}" stroke-dashoffset="${c * (1 - pct)}"/></svg>
    <div class="balance-ring__text">${total - used}</div>`;
}

// ── Page Renderers ───────────────────────────────────────────

function renderDashboard() {
  const now = new Date(), day = now.getDate();
  const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  const month = months[now.getMonth()], year = now.getFullYear();
  const hour = now.getHours();
  const greeting = hour < 12 ? 'Good morning' : hour < 18 ? 'Good afternoon' : 'Good evening';
  const leaveLeft = LEAVE_TYPES.reduce((s, l) => s + (l.total - l.used), 0);
  const pendingCount = LEAVE_REQUESTS.filter(l => l.status === 'Pending').length + EXPENSES.filter(e => e.status === 'Pending').length;
  const openTickets = TICKETS.filter(t => t.status === 'Open' || t.status === 'Pending').length;
  const salaryData = SALARY_SLIPS.slice(0, 6).reverse();

  return `<div class="page-enter">
    <div class="welcome-banner animate-in">
      <div class="welcome-banner__greeting">${greeting},</div>
      <div class="welcome-banner__name">${EMPLOYEE.name}</div>
      <div class="welcome-banner__subtitle">${EMPLOYEE.role} · ${EMPLOYEE.department}</div>
      <div class="welcome-banner__date">
        <div class="welcome-banner__date-day">${day}</div>
        <div class="welcome-banner__date-month">${month} ${year}</div>
      </div>
    </div>

    <div class="stats-grid">
      <div class="stat-card stat-card--blue animate-in">
        <div class="stat-card__icon">${icon('calendar')}</div>
        <div class="stat-card__label">Leave Balance</div>
        <div class="stat-card__value">${leaveLeft}</div>
        <div class="stat-card__trend stat-card__trend--up">${icon('up')} days remaining</div>
      </div>
      <div class="stat-card stat-card--purple animate-in">
        <div class="stat-card__icon">${icon('clock')}</div>
        <div class="stat-card__label">Pending Requests</div>
        <div class="stat-card__value">${pendingCount}</div>
        <div class="stat-card__trend stat-card__trend--down">${icon('down')} awaiting</div>
      </div>
      <div class="stat-card stat-card--green animate-in">
        <div class="stat-card__icon">${icon('dollar')}</div>
        <div class="stat-card__label">Latest Net Pay</div>
        <div class="stat-card__value">${fmt(SALARY_SLIPS[0].net)}</div>
        <div class="stat-card__trend stat-card__trend--up">${icon('up')} +6.6%</div>
      </div>
      <div class="stat-card stat-card--amber animate-in">
        <div class="stat-card__icon">${icon('ticket')}</div>
        <div class="stat-card__label">Open Tickets</div>
        <div class="stat-card__value">${openTickets}</div>
      </div>
    </div>

    <div class="grid-2">
      <div class="card animate-in">
        <div class="card__header"><div class="card__title">Salary Trend</div><span class="text-sm text-muted text-mono">${year}</span></div>
        <div class="chart-bar-group">${salaryData.map(s => {
          const max = Math.max(...salaryData.map(x => x.net));
          return `<div class="chart-bar-item"><div class="chart-bar" style="height:${(s.net/max)*100}%"></div><div class="chart-bar-label">${s.period.split(' ')[0].slice(0,3)}</div></div>`;
        }).join('')}</div>
      </div>
      <div class="card animate-in">
        <div class="card__header"><div class="card__title">Recent Activity</div></div>
        <div class="timeline">${RECENT_ACTIVITY.map(a => `
          <div class="timeline-item"><div class="timeline-item__time">${a.time}</div><div class="timeline-item__text">${a.text}</div></div>
        `).join('')}</div>
      </div>
    </div>

    <div class="mt-6 animate-in">
      <div class="section-title">Quick Actions</div>
      <div class="quick-actions">
        <a href="#/leave" class="quick-action">${icon('calendar')} Apply for Leave</a>
        <a href="#/expenses" class="quick-action">${icon('receipt')} Submit Expense</a>
        <a href="#/tickets" class="quick-action">${icon('ticket')} Create Ticket</a>
        <a href="#/salary" class="quick-action">${icon('dollar')} View Payslip</a>
      </div>
    </div>
  </div>`;
}

function renderTeam() {
  const active = TEAM_MEMBERS.filter(m => m.status === 'Active').length;
  return `<div class="page-enter">
    <div class="page-header">
      <h1 class="page-title">Employees</h1>
      <button class="btn btn--primary" onclick="openOnboardSelect()">${icon('plus')} Onboard Employee</button>
    </div>

    <div class="stats-grid animate-in">
      <div class="stat-card stat-card--blue"><div class="stat-card__label">Total</div><div class="stat-card__value">${TEAM_MEMBERS.length}</div></div>
      <div class="stat-card stat-card--green"><div class="stat-card__label">Active</div><div class="stat-card__value">${active}</div></div>
      <div class="stat-card stat-card--amber"><div class="stat-card__label">Countries</div><div class="stat-card__value">${new Set(TEAM_MEMBERS.map(m=>m.country)).size}</div></div>
    </div>

    <div class="filters animate-in">
      <span class="filter-chip active" onclick="filterTable(this,'teamTable','all')">All</span>
      <span class="filter-chip" onclick="filterTable(this,'teamTable','Active')">Active</span>
      <span class="filter-chip" onclick="filterTable(this,'teamTable','Inactive')">Inactive</span>
      <span class="filter-chip" onclick="filterTable(this,'teamTable','Draft')">Draft</span>
    </div>

    <div class="card animate-in">
      <div class="data-table-wrap"><table class="data-table" id="teamTable"><thead><tr>
        <th>ID</th><th>Name</th><th>Department</th><th>Designation</th><th>Country</th><th>Type</th><th>Status</th><th></th>
      </tr></thead><tbody>
      ${TEAM_MEMBERS.map(m => `<tr data-status="${m.status}">
        <td class="text-mono text-accent">${m.id}</td>
        <td style="font-weight:500;color:var(--text-primary)">${m.name}</td>
        <td>${m.department}</td><td>${m.designation}</td><td>${m.country}</td>
        <td><span class="badge badge--draft">${m.type}</span></td>
        <td><span class="badge badge--${statusClass(m.status)}">${m.status}</span></td>
        <td><button class="btn btn--ghost btn--sm" onclick="showEmployeeDetail('${m.id}')">${icon('eye')} View</button></td>
      </tr>`).join('')}
      </tbody></table></div>
    </div>
  </div>`;
}

function renderServices() {
  return `<div class="page-enter">
    <div class="page-header"><h1 class="page-title">Service Progress</h1></div>

    <div class="filters animate-in">
      <span class="filter-chip active" onclick="filterTable(this,'svcTable','all')">All</span>
      <span class="filter-chip" onclick="filterTable(this,'svcTable','PendingDocuments')">Pending</span>
      <span class="filter-chip" onclick="filterTable(this,'svcTable','Completed')">Completed</span>
    </div>

    <div class="card animate-in">
      <div class="data-table-wrap"><table class="data-table" id="svcTable"><thead><tr>
        <th>ID</th><th>Title</th><th>Type</th><th>Employee</th><th>Progress</th><th>Status</th><th></th>
      </tr></thead><tbody>
      ${SERVICES.map(s => `<tr data-status="${s.status}">
        <td class="text-mono text-accent">${s.id}</td>
        <td style="font-weight:500;color:var(--text-primary)">${s.title}</td>
        <td>${serviceTypeLabel(s.type)}</td>
        <td>${s.employee}</td>
        <td><div style="display:flex;align-items:center;gap:8px;min-width:120px">
          <div class="progress-bar" style="flex:1"><div class="progress-bar__fill" style="width:${s.progress}%"></div></div>
          <span class="text-mono text-sm">${s.progress}%</span>
        </div></td>
        <td><span class="badge badge--${statusClass(s.status)}">${serviceStatusLabel(s.status)}</span></td>
        <td><button class="btn btn--ghost btn--sm" onclick="showServiceDetail('${s.id}')">${icon('eye')} View</button></td>
      </tr>`).join('')}
      </tbody></table></div>
    </div>
  </div>`;
}

function renderLeave() {
  return `<div class="page-enter">
    <div class="page-header">
      <h1 class="page-title">Leave Applications</h1>
      <button class="btn btn--primary" onclick="openLeaveForm()">${icon('plus')} New Request</button>
    </div>

    <div class="balance-grid animate-in">
      ${LEAVE_TYPES.map(lt => `<div class="balance-card">
        <div class="balance-ring">${balanceRing(lt.used, lt.total, lt.color)}</div>
        <div class="balance-info"><div class="balance-info__type">${lt.type}</div>
        <div class="balance-info__detail">${lt.used} used of ${lt.total}</div></div>
      </div>`).join('')}
    </div>

    <div class="filters animate-in">
      <span class="filter-chip active" onclick="filterTable(this,'leaveTable','all')">All</span>
      <span class="filter-chip" onclick="filterTable(this,'leaveTable','Approved')">Approved</span>
      <span class="filter-chip" onclick="filterTable(this,'leaveTable','Pending')">Pending</span>
      <span class="filter-chip" onclick="filterTable(this,'leaveTable','Rejected')">Rejected</span>
      <span class="filter-chip" onclick="filterTable(this,'leaveTable','Draft')">Draft</span>
    </div>

    <div class="card animate-in">
      <div class="data-table-wrap"><table class="data-table" id="leaveTable"><thead><tr>
        <th>ID</th><th>Type</th><th>From</th><th>To</th><th>Days</th><th>Half Day</th><th>Status</th><th>Approver</th><th></th>
      </tr></thead><tbody>
      ${LEAVE_REQUESTS.map(lr => `<tr data-status="${lr.status}">
        <td class="text-mono text-accent">${lr.id}</td><td>${lr.type}</td>
        <td class="text-mono">${lr.from}</td><td class="text-mono">${lr.to}</td>
        <td class="text-mono">${lr.days}</td><td>${lr.halfDay}</td>
        <td><span class="badge badge--${statusClass(lr.status)}">${lr.status}</span></td>
        <td>${lr.approver}</td>
        <td><button class="btn btn--ghost btn--sm" onclick="viewLeaveDetail('${lr.id}')">${icon('eye')} View</button></td>
      </tr>`).join('')}
      </tbody></table></div>
    </div>
  </div>`;
}

function renderHolidays() {
  return `<div class="page-enter">
    <div class="page-header"><h1 class="page-title">Holiday List</h1>
      <div class="flex items-center gap-4">
        <select class="form-select" style="width:120px"><option>2025</option><option>2024</option></select>
      </div>
    </div>
    <div class="card animate-in">
      <div class="data-table-wrap"><table class="data-table"><thead><tr>
        <th>Holiday</th><th>Date</th><th>Day</th>
      </tr></thead><tbody>
      ${HOLIDAYS.map(h => `<tr>
        <td style="font-weight:500;color:var(--text-primary)">${h.name}</td>
        <td class="text-mono">${h.date}</td><td>${h.day}</td>
      </tr>`).join('')}
      </tbody></table></div>
    </div>
  </div>`;
}

function renderSalary() {
  return `<div class="page-enter">
    <div class="page-header"><h1 class="page-title">Salary Slips</h1>
      <select class="form-select" style="width:120px" onchange="filterSalaryYear(this.value)"><option>2025</option><option>2024</option></select>
    </div>

    <div class="stats-grid animate-in">
      <div class="stat-card stat-card--green"><div class="stat-card__label">Avg Net Pay</div><div class="stat-card__value">${fmt(24660)}</div></div>
      <div class="stat-card stat-card--blue"><div class="stat-card__label">YTD Gross</div><div class="stat-card__value">${fmt(96000)}</div></div>
      <div class="stat-card stat-card--purple"><div class="stat-card__label">YTD Deductions</div><div class="stat-card__value">${fmt(20460)}</div></div>
    </div>

    <div class="card animate-in">
      <div class="data-table-wrap"><table class="data-table" id="salaryTable"><thead><tr>
        <th>Period</th><th>Pay Date</th><th>Gross</th><th>Deductions</th><th>Net Pay</th><th>Status</th><th></th>
      </tr></thead><tbody>
      ${SALARY_SLIPS.map(ss => `<tr class="salary-row-trigger" data-slip-id="${ss.id}" onclick="showSalaryDetail('${ss.id}')" style="cursor:pointer">
        <td style="font-weight:500;color:var(--text-primary)">${ss.period}</td>
        <td class="text-mono">${ss.payDate}</td>
        <td class="text-mono">${fmt(ss.gross)}</td>
        <td class="text-mono" style="color:var(--red)">${fmt(ss.deductions)}</td>
        <td class="text-mono" style="color:var(--accent);font-weight:600">${fmt(ss.net)}</td>
        <td><span class="badge badge--${statusClass(ss.status)}">${ss.status}</span></td>
        <td><button class="btn btn--ghost btn--sm">${icon('eye')} Detail</button></td>
      </tr>`).join('')}
      </tbody></table></div>
    </div>
  </div>`;
}

function renderExpenses() {
  const pending = EXPENSES.filter(e => e.status === 'Pending').reduce((s, e) => s + e.amount, 0);
  const approved = EXPENSES.filter(e => e.status === 'Approved').reduce((s, e) => s + e.amount, 0);
  return `<div class="page-enter">
    <div class="page-header"><h1 class="page-title">Expense Claims</h1>
      <button class="btn btn--primary" onclick="openExpenseForm()">${icon('plus')} New Claim</button>
    </div>

    <div class="stats-grid animate-in">
      <div class="stat-card stat-card--amber"><div class="stat-card__label">Pending</div><div class="stat-card__value">${fmt(pending)}</div></div>
      <div class="stat-card stat-card--green"><div class="stat-card__label">Approved YTD</div><div class="stat-card__value">${fmt(approved)}</div></div>
      <div class="stat-card stat-card--blue"><div class="stat-card__label">Total Claims</div><div class="stat-card__value">${EXPENSES.length}</div></div>
    </div>

    <div class="filters animate-in">
      <span class="filter-chip active" onclick="filterTable(this,'expenseTable','all')">All</span>
      <span class="filter-chip" onclick="filterTable(this,'expenseTable','Pending')">Pending</span>
      <span class="filter-chip" onclick="filterTable(this,'expenseTable','Approved')">Approved</span>
      <span class="filter-chip" onclick="filterTable(this,'expenseTable','Rejected')">Rejected</span>
      <span class="filter-chip" onclick="filterTable(this,'expenseTable','Draft')">Draft</span>
    </div>

    <div class="card animate-in">
      <div class="data-table-wrap"><table class="data-table" id="expenseTable"><thead><tr>
        <th>ID</th><th>Date</th><th>Category</th><th>Description</th><th>Items</th><th>Amount</th><th>Status</th><th></th>
      </tr></thead><tbody>
      ${EXPENSES.map(e => `<tr data-status="${e.status}">
        <td class="text-mono text-accent">${e.id}</td>
        <td class="text-mono">${e.date}</td>
        <td><span class="badge badge--draft">${e.category}</span></td>
        <td style="max-width:200px;overflow:hidden;text-overflow:ellipsis">${e.description}</td>
        <td class="text-mono">${e.items}</td>
        <td class="text-mono" style="font-weight:600;color:var(--text-primary)">${fmt(e.amount)}</td>
        <td><span class="badge badge--${statusClass(e.status)}">${e.status}</span></td>
        <td><button class="btn btn--ghost btn--sm" onclick="viewExpenseDetail('${e.id}')">${icon('eye')} View</button></td>
      </tr>`).join('')}
      </tbody></table></div>
    </div>
  </div>`;
}

function renderTickets() {
  return `<div class="page-enter">
    <div class="page-header"><h1 class="page-title">Support Tickets</h1>
      <button class="btn btn--primary" onclick="openTicketForm()">${icon('plus')} New Ticket</button>
    </div>

    <div class="filters animate-in">
      <span class="filter-chip active" onclick="filterTable(this,'ticketTable','all')">All</span>
      <span class="filter-chip" onclick="filterTable(this,'ticketTable','Open')">Open</span>
      <span class="filter-chip" onclick="filterTable(this,'ticketTable','Pending')">Pending</span>
      <span class="filter-chip" onclick="filterTable(this,'ticketTable','Closed')">Closed</span>
    </div>

    <div class="card animate-in">
      <div class="data-table-wrap"><table class="data-table" id="ticketTable"><thead><tr>
        <th>ID</th><th>Subject</th><th>Category</th><th>Priority</th><th>Status</th><th>Created</th><th></th>
      </tr></thead><tbody>
      ${TICKETS.map(t => `<tr data-status="${t.status}">
        <td class="text-mono text-accent">${t.id}</td>
        <td style="font-weight:500;color:var(--text-primary);max-width:240px;overflow:hidden;text-overflow:ellipsis">${t.subject}</td>
        <td>${categoryLabel(t.category)}</td>
        <td><span class="priority priority--${t.priority.toLowerCase()}"><span class="priority-dot"></span> ${priorityLabel(t.priority)}</span></td>
        <td><span class="badge badge--${statusClass(t.status)}">${t.status}</span></td>
        <td class="text-mono">${t.created}</td>
        <td><button class="btn btn--ghost btn--sm" onclick="showTicketDetail('${t.id}')">${icon('eye')} View</button></td>
      </tr>`).join('')}
      </tbody></table></div>
    </div>
    <div id="ticketDetailPanel" class="mt-6" style="display:none"></div>
  </div>`;
}

function renderContract() {
  return `<div class="page-enter">
    <div class="page-header"><h1 class="page-title">Employment Contract</h1>
      <button class="btn btn--secondary" onclick="alert('Download PDF')">${icon('download')} Download PDF</button>
    </div>
    <div class="contract-meta animate-in">
      <div class="contract-meta-item"><div class="contract-meta-item__label">Contract No.</div><div class="contract-meta-item__value text-mono text-accent">CTR-2024-0032</div></div>
      <div class="contract-meta-item"><div class="contract-meta-item__label">Contract Type</div><div class="contract-meta-item__value">Fixed-Term Employment</div></div>
      <div class="contract-meta-item"><div class="contract-meta-item__label">Effective Date</div><div class="contract-meta-item__value">2024-03-15</div></div>
      <div class="contract-meta-item"><div class="contract-meta-item__label">Expiry Date</div><div class="contract-meta-item__value">2027-03-14</div></div>
      <div class="contract-meta-item"><div class="contract-meta-item__label">Employer</div><div class="contract-meta-item__value">RampingUp Technology Ltd.</div></div>
      <div class="contract-meta-item"><div class="contract-meta-item__label">Status</div><div class="contract-meta-item__value"><span class="badge badge--approved">Active</span></div></div>
      <div class="contract-meta-item"><div class="contract-meta-item__label">Probation</div><div class="contract-meta-item__value">3 months (completed)</div></div>
      <div class="contract-meta-item"><div class="contract-meta-item__label">Notice Period</div><div class="contract-meta-item__value">30 days</div></div>
    </div>
    <div class="contract-doc animate-in">
      <div class="contract-doc__title">Employment Agreement</div>
      <div class="contract-doc__section"><div class="contract-doc__section-title">1. Position & Duties</div><div class="contract-doc__text">The Employee shall serve as <strong>Software Engineer</strong> in the <strong>Engineering Department</strong>, reporting to the Engineering Manager.</div></div>
      <div class="contract-doc__section"><div class="contract-doc__section-title">2. Compensation</div><div class="contract-doc__text">Base salary of <strong>¥32,000</strong> per month, paid on the 25th. Includes housing (¥5,000), transport (¥2,000), and meal (¥1,500) allowances.</div></div>
      <div class="contract-doc__section"><div class="contract-doc__section-title">3. Working Hours</div><div class="contract-doc__text">Monday to Friday, 09:00 — 18:00. Remote work permitted up to 2 days per week with manager approval.</div></div>
      <div class="contract-doc__section"><div class="contract-doc__section-title">4. Benefits</div><div class="contract-doc__text">Full social insurance and housing fund. Supplementary commercial medical insurance. Annual leave: 15 days. Sick leave: 10 days.</div></div>
    </div>
  </div>`;
}

function renderWallet() {
  return `<div class="page-enter">
    <div class="page-header"><h1 class="page-title">Wallet</h1></div>
    <div class="wallet-balance animate-in">
      <div class="wallet-balance__label">Available Balance</div>
      <div class="wallet-balance__amount">${fmt(123899)}</div>
      <div class="wallet-balance__sub">Updated as of March 25, 2025</div>
    </div>
    <div class="wallet-actions animate-in">
      <button class="btn btn--primary">${icon('download')} Withdraw</button>
      <button class="btn btn--secondary">${icon('eye')} Statement</button>
    </div>
    <div class="card animate-in">
      <div class="card__header"><div class="card__title">Transaction History</div>
        <select class="form-select" style="width:110px;padding:5px 8px;font-size:0.75rem"><option>All</option><option>Income</option><option>Expense</option></select>
      </div>
      <div class="wallet-tx-list">${TRANSACTIONS.map(tx => `
        <div class="wallet-tx">
          <div class="wallet-tx__icon wallet-tx__icon--${tx.type}">
            ${tx.type === 'in' ? '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="16" height="16"><path d="M12 5v14M5 12l7 7 7-7"/></svg>'
              : '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="16" height="16"><path d="M12 19V5M5 12l7-7 7 7"/></svg>'}
          </div>
          <div class="wallet-tx__info"><div class="wallet-tx__title">${tx.title}</div><div class="wallet-tx__date">${tx.date}</div></div>
          <div class="wallet-tx__amount wallet-tx__amount--${tx.type}">${tx.type === 'in' ? '+' : '-'}${fmt(tx.amount)}</div>
        </div>`).join('')}
      </div>
    </div>
  </div>`;
}

function renderProfile() {
  return `<div class="page-enter">
    <div class="page-header"><h1 class="page-title">My Profile</h1>
      <button class="btn btn--secondary">${icon('eye')} Edit</button>
    </div>
    <div class="card animate-in" style="margin-bottom:16px">
      <div class="profile-header">
        <div class="avatar avatar--lg">${EMPLOYEE.initials}</div>
        <div class="profile-info">
          <div class="profile-info__name">${EMPLOYEE.name}</div>
          <div class="profile-info__role">${EMPLOYEE.role} · ${EMPLOYEE.department}</div>
          <div class="profile-info__id">${EMPLOYEE.employeeId}</div>
        </div>
      </div>
    </div>
    <div class="tabs animate-in">
      <div class="tab active" onclick="switchProfileTab(this,'personal')">Personal</div>
      <div class="tab" onclick="switchProfileTab(this,'company')">Company</div>
      <div class="tab" onclick="switchProfileTab(this,'bank')">Bank Info</div>
    </div>
    <div id="profileTabContent">${renderProfilePersonal()}</div>
  </div>`;
}

function renderProfilePersonal() {
  return `<div class="card animate-in"><div class="detail-grid">
    <div class="detail-item"><div class="detail-item__label">Full Name</div><div class="detail-item__value">${EMPLOYEE.name}</div></div>
    <div class="detail-item"><div class="detail-item__label">Gender</div><div class="detail-item__value">${EMPLOYEE.gender}</div></div>
    <div class="detail-item"><div class="detail-item__label">Date of Birth</div><div class="detail-item__value">${EMPLOYEE.dob}</div></div>
    <div class="detail-item"><div class="detail-item__label">Email</div><div class="detail-item__value detail-item__value--accent">${EMPLOYEE.email}</div></div>
    <div class="detail-item"><div class="detail-item__label">Phone</div><div class="detail-item__value">${EMPLOYEE.phone}</div></div>
    <div class="detail-item"><div class="detail-item__label">Location</div><div class="detail-item__value">${EMPLOYEE.location}</div></div>
  </div></div>`;
}
function renderProfileCompany() {
  return `<div class="card animate-in"><div class="detail-grid">
    <div class="detail-item"><div class="detail-item__label">Employee ID</div><div class="detail-item__value detail-item__value--accent">${EMPLOYEE.employeeId}</div></div>
    <div class="detail-item"><div class="detail-item__label">Department</div><div class="detail-item__value">${EMPLOYEE.department}</div></div>
    <div class="detail-item"><div class="detail-item__label">Role</div><div class="detail-item__value">${EMPLOYEE.role}</div></div>
    <div class="detail-item"><div class="detail-item__label">Manager</div><div class="detail-item__value">${EMPLOYEE.manager}</div></div>
    <div class="detail-item"><div class="detail-item__label">Join Date</div><div class="detail-item__value">${EMPLOYEE.joinDate}</div></div>
    <div class="detail-item"><div class="detail-item__label">Contract Type</div><div class="detail-item__value">${EMPLOYEE.contractType}</div></div>
  </div></div>`;
}
function renderProfileBank() {
  return `<div class="card animate-in"><div class="detail-grid">
    <div class="detail-item"><div class="detail-item__label">Bank Name</div><div class="detail-item__value">${EMPLOYEE.bankName}</div></div>
    <div class="detail-item"><div class="detail-item__label">Account Number</div><div class="detail-item__value detail-item__value--accent">${EMPLOYEE.bankAccount}</div></div>
  </div></div>`;
}

// ── Interactive Functions ─────────────────────────────────────

// Unified filter function
window.filterTable = function(el, tableId, status) {
  el.parentElement.querySelectorAll('.filter-chip').forEach(c => c.classList.remove('active'));
  el.classList.add('active');
  document.querySelectorAll(`#${tableId} tbody tr`).forEach(tr => {
    tr.style.display = (status === 'all' || tr.dataset.status === status) ? '' : 'none';
  });
};

window.switchProfileTab = function(el, tab) {
  el.parentElement.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
  el.classList.add('active');
  const c = document.getElementById('profileTabContent');
  if (tab === 'personal') c.innerHTML = renderProfilePersonal();
  else if (tab === 'company') c.innerHTML = renderProfileCompany();
  else if (tab === 'bank') c.innerHTML = renderProfileBank();
};

window.filterSalaryYear = function() {};

// ── Employee Detail Modal ───────────────────────────────────
window.showEmployeeDetail = function(id) {
  const m = TEAM_MEMBERS.find(e => e.id === id);
  if (!m) return;
  openModal(`<div class="modal">
    <div class="modal__header"><div class="modal__title">Employee — ${m.name}</div>
      <button class="modal__close" onclick="closeModal()">${icon('close')}</button></div>
    <div class="modal__body">
      <div class="profile-header" style="margin-bottom:16px">
        <div class="avatar avatar--md">${m.name.split(' ').map(n=>n[0]).join('')}</div>
        <div class="profile-info"><div class="profile-info__name">${m.name}</div>
          <div class="profile-info__role">${m.designation} · ${m.department}</div>
          <div class="profile-info__id">${m.id}</div></div>
      </div>
      <div class="detail-modal__section">
        <div class="detail-modal__row"><span class="detail-modal__row-label">Email</span><span class="detail-modal__row-value">${m.email}</span></div>
        <div class="detail-modal__row"><span class="detail-modal__row-label">Country</span><span class="detail-modal__row-value">${m.country}</span></div>
        <div class="detail-modal__row"><span class="detail-modal__row-label">Type</span><span class="detail-modal__row-value">${m.type}</span></div>
        <div class="detail-modal__row"><span class="detail-modal__row-label">Join Date</span><span class="detail-modal__row-value">${m.joinDate}</span></div>
        <div class="detail-modal__row"><span class="detail-modal__row-label">Status</span><span class="detail-modal__row-value"><span class="badge badge--${statusClass(m.status)}">${m.status}</span></span></div>
      </div>
    </div>
    <div class="modal__footer"><button class="btn btn--secondary" onclick="closeModal()">Close</button></div>
  </div>`);
};

// ── Service Detail Modal ────────────────────────────────────
window.showServiceDetail = function(id) {
  const s = SERVICES.find(x => x.id === id);
  if (!s) return;
  const stages = ['Eligibility', 'Documents', 'Contract Review', 'Offer Letter', 'Completed'];
  openModal(`<div class="modal modal--lg">
    <div class="modal__header"><div class="modal__title">Service — ${s.id}</div>
      <button class="modal__close" onclick="closeModal()">${icon('close')}</button></div>
    <div class="modal__body">
      <div class="detail-modal__section">
        <div class="detail-modal__row"><span class="detail-modal__row-label">Title</span><span class="detail-modal__row-value">${s.title}</span></div>
        <div class="detail-modal__row"><span class="detail-modal__row-label">Type</span><span class="detail-modal__row-value">${serviceTypeLabel(s.type)}</span></div>
        <div class="detail-modal__row"><span class="detail-modal__row-label">Employee</span><span class="detail-modal__row-value">${s.employee}</span></div>
        <div class="detail-modal__row"><span class="detail-modal__row-label">Status</span><span class="detail-modal__row-value"><span class="badge badge--${statusClass(s.status)}">${serviceStatusLabel(s.status)}</span></span></div>
      </div>
      <div class="section-title" style="margin-top:16px">Progress</div>
      <div style="margin-bottom:12px"><div class="progress-bar"><div class="progress-bar__fill" style="width:${s.progress}%"></div></div>
        <div style="text-align:right;font-size:0.72rem;color:var(--text-muted);margin-top:4px">Stage ${s.stage} of ${s.totalStages}</div></div>
      <div class="approval-flow"><div class="approval-flow__steps">
        ${stages.map((st, i) => {
          const state = i < s.stage - 1 ? 'done' : i === s.stage - 1 ? (s.status === 'Completed' ? 'done' : 'current') : 'waiting';
          const ic = state === 'done' ? '✓' : state === 'current' ? '◷' : (i + 1);
          return `<div class="approval-step ${state}"><div class="approval-step__dot">${ic}</div>
            <div class="approval-step__content"><div class="approval-step__label">${st}</div></div></div>`;
        }).join('')}
      </div></div>
    </div>
    <div class="modal__footer">
      ${s.status !== 'Completed' ? '<button class="btn btn--danger btn--sm" onclick="closeModal()">Cancel Service</button>' : ''}
      <button class="btn btn--secondary" onclick="closeModal()">Close</button>
    </div>
  </div>`);
};

// ── Salary Detail (inline expand) ───────────────────────────
window.showSalaryDetail = function(id) {
  const slip = SALARY_SLIPS.find(s => s.id === id);
  if (!slip) return;
  const existing = document.getElementById('salary-detail-' + id);
  if (existing) { existing.remove(); return; }
  document.querySelectorAll('.salary-inline-detail').forEach(el => el.remove());
  const row = document.querySelector(`tr[data-slip-id="${id}"]`);
  if (!row) return;
  const tE = SALARY_DETAIL.earnings.reduce((s, e) => s + e.amount, 0);
  const tD = SALARY_DETAIL.deductions.reduce((s, d) => s + d.amount, 0);
  const dr = document.createElement('tr');
  dr.id = 'salary-detail-' + id; dr.className = 'salary-inline-detail';
  dr.innerHTML = `<td colspan="7" style="padding:0;border-bottom:1px solid var(--border)">
    <div style="padding:18px 20px;background:var(--bg-muted);animation:fadeInUp 0.2s ease forwards">
      <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:14px">
        <div style="font-size:0.95rem;font-weight:600;color:var(--text-primary)">Salary Breakdown — ${slip.period}</div>
        <button class="btn btn--ghost btn--sm" onclick="document.getElementById('salary-detail-${id}').remove()">Close</button>
      </div>
      <div class="grid-2">
        <div class="salary-section"><div class="salary-section__title">Earnings</div>
          ${SALARY_DETAIL.earnings.map(e => `<div class="salary-row"><span class="salary-row__label">${e.component}</span><span class="salary-row__value" style="color:var(--accent)">${fmt(e.amount)}</span></div>`).join('')}
          <div class="salary-total"><span class="salary-total__label">Total Earnings</span><span class="salary-total__value">${fmt(tE)}</span></div>
        </div>
        <div class="salary-section"><div class="salary-section__title">Deductions</div>
          ${SALARY_DETAIL.deductions.map(d => `<div class="salary-row"><span class="salary-row__label">${d.component}</span><span class="salary-row__value" style="color:var(--red)">${fmt(d.amount)}</span></div>`).join('')}
          <div class="salary-total"><span class="salary-total__label">Total Deductions</span><span class="salary-total__value" style="color:var(--red)">${fmt(tD)}</span></div>
        </div>
      </div>
      <div style="margin-top:14px;padding:14px;background:var(--accent-bg);border-radius:var(--radius);border:1px solid var(--border)">
        <div style="display:flex;justify-content:space-between;align-items:center">
          <span style="font-size:1rem;font-weight:600;color:var(--text-primary)">Net Pay</span>
          <span style="font-size:1.3rem;font-weight:700;font-family:'JetBrains Mono',monospace;color:var(--accent)">${fmt(slip.net)}</span>
        </div>
      </div>
    </div></td>`;
  row.insertAdjacentElement('afterend', dr);
  dr.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
};

// ── Ticket Detail (inline panel) ────────────────────────────
window.showTicketDetail = function(id) {
  const t = TICKETS.find(x => x.id === id);
  if (!t) return;
  const panel = document.getElementById('ticketDetailPanel');
  panel.innerHTML = `<div class="card" style="animation:fadeInUp 0.3s var(--ease) forwards">
    <div class="card__header"><div class="card__title">${t.subject}</div>
      <button class="btn btn--ghost btn--sm" onclick="document.getElementById('ticketDetailPanel').style.display='none'">Close</button></div>
    <div class="ticket-meta">
      <div class="ticket-meta-item">${icon('tag')} ${categoryLabel(t.category)}</div>
      <div class="ticket-meta-item">${icon('clock')} ${t.created}</div>
      <div class="ticket-meta-item"><span class="badge badge--${statusClass(t.status)}">${t.status}</span></div>
      <div class="ticket-meta-item"><span class="priority priority--${t.priority.toLowerCase()}"><span class="priority-dot"></span> ${priorityLabel(t.priority)}</span></div>
    </div>
    <div class="ticket-description"><p>This is a sample description for ticket ${t.id}. The support team is actively working on resolving this issue.</p></div>
    <div class="mt-6">
      <div class="section-title">Comments</div>
      ${TICKET_COMMENTS.map(c => `<div class="comment-item">
        <div class="comment-item__header"><span class="comment-item__author">${c.author}</span><span class="comment-item__time">${c.time}</span></div>
        <div class="comment-item__body">${c.body}</div>
      </div>`).join('')}
      <div class="mt-4"><textarea class="form-textarea" style="min-height:60px" placeholder="Add a comment..."></textarea>
        <div style="margin-top:8px;text-align:right"><button class="btn btn--primary btn--sm">Post Comment</button></div></div>
    </div>
  </div>`;
  panel.style.display = 'block';
  panel.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
};

// ── Approval Timeline ───────────────────────────────────────
function getApprovalSteps(status, approver, date) {
  if (status === 'Draft') return [
    { label: 'Draft Created', meta: date, state: 'done', icon: '✎' },
    { label: 'Submit for Review', meta: 'Not yet submitted', state: 'waiting', icon: '→' },
    { label: 'Manager Review', person: approver !== '-' ? approver : '', state: 'waiting', icon: '○' },
    { label: 'Completed', state: 'waiting', icon: '✓' },
  ];
  if (status === 'Pending') return [
    { label: 'Submitted', meta: date, state: 'done', icon: '✓' },
    { label: 'Manager Review', person: approver, meta: 'Awaiting approval', state: 'current', icon: '◷' },
    { label: 'HR Confirmation', state: 'waiting', icon: '○' },
    { label: 'Completed', state: 'waiting', icon: '✓' },
  ];
  if (status === 'Approved') return [
    { label: 'Submitted', meta: date, state: 'done', icon: '✓' },
    { label: 'Manager Approved', person: approver, state: 'done', icon: '✓' },
    { label: 'HR Confirmed', state: 'done', icon: '✓' },
    { label: 'Completed', meta: 'All approvals received', state: 'done', icon: '✓' },
  ];
  if (status === 'Rejected') return [
    { label: 'Submitted', meta: date, state: 'done', icon: '✓' },
    { label: 'Manager Rejected', person: approver, meta: 'Rejected', state: 'rejected', icon: '✕' },
    { label: 'HR Confirmation', meta: 'Skipped', state: 'waiting', icon: '○' },
    { label: 'Completed', state: 'waiting', icon: '✓' },
  ];
  return [{ label: status, state: 'done', icon: '✓' }];
}

function renderApprovalTimeline(status, approver, date) {
  return `<div class="approval-flow"><div class="approval-flow__title">Approval Progress</div>
    <div class="approval-flow__steps">${getApprovalSteps(status, approver, date).map(s => `
      <div class="approval-step ${s.state}"><div class="approval-step__dot">${s.icon}</div>
        <div class="approval-step__content"><div class="approval-step__label">${s.label}</div>
          ${s.person ? `<div class="approval-step__person">${s.person}</div>` : ''}
          ${s.meta ? `<div class="approval-step__meta">${s.meta}</div>` : ''}
        </div></div>`).join('')}
    </div></div>`;
}

// ── Leave Detail Modal ──────────────────────────────────────
window.viewLeaveDetail = function(id) {
  const lr = LEAVE_REQUESTS.find(l => l.id === id);
  if (!lr) return;
  openModal(`<div class="modal">
    <div class="modal__header"><div class="modal__title">Leave Request — ${lr.id}</div>
      <button class="modal__close" onclick="closeModal()">${icon('close')}</button></div>
    <div class="modal__body">
      <div class="detail-modal__section">
        <div class="detail-modal__row"><span class="detail-modal__row-label">Type</span><span class="detail-modal__row-value">${lr.type}</span></div>
        <div class="detail-modal__row"><span class="detail-modal__row-label">Period</span><span class="detail-modal__row-value">${lr.from} to ${lr.to}</span></div>
        <div class="detail-modal__row"><span class="detail-modal__row-label">Days</span><span class="detail-modal__row-value">${lr.days}</span></div>
        <div class="detail-modal__row"><span class="detail-modal__row-label">Half Day</span><span class="detail-modal__row-value">${lr.halfDay}</span></div>
        <div class="detail-modal__row"><span class="detail-modal__row-label">Status</span><span class="detail-modal__row-value"><span class="badge badge--${statusClass(lr.status)}">${lr.status}</span></span></div>
        <div class="detail-modal__row"><span class="detail-modal__row-label">Approver</span><span class="detail-modal__row-value">${lr.approver}</span></div>
      </div>
      ${renderApprovalTimeline(lr.status, lr.approver, lr.from)}
    </div>
    <div class="modal__footer">
      ${lr.status === 'Draft' ? '<button class="btn btn--primary btn--sm" onclick="closeModal()">Submit</button>' : ''}
      ${lr.status === 'Pending' ? '<button class="btn btn--danger btn--sm" onclick="closeModal()">Cancel</button>' : ''}
      <button class="btn btn--secondary" onclick="closeModal()">Close</button>
    </div>
  </div>`);
};

// ── Expense Detail Modal ────────────────────────────────────
window.viewExpenseDetail = function(id) {
  const ex = EXPENSES.find(e => e.id === id);
  if (!ex) return;
  openModal(`<div class="modal">
    <div class="modal__header"><div class="modal__title">Expense Claim — ${ex.id}</div>
      <button class="modal__close" onclick="closeModal()">${icon('close')}</button></div>
    <div class="modal__body">
      <div class="detail-modal__section">
        <div class="detail-modal__row"><span class="detail-modal__row-label">Description</span><span class="detail-modal__row-value">${ex.description}</span></div>
        <div class="detail-modal__row"><span class="detail-modal__row-label">Category</span><span class="detail-modal__row-value">${ex.category}</span></div>
        <div class="detail-modal__row"><span class="detail-modal__row-label">Amount</span><span class="detail-modal__row-value">${fmt(ex.amount)}</span></div>
        <div class="detail-modal__row"><span class="detail-modal__row-label">Date</span><span class="detail-modal__row-value">${ex.date}</span></div>
        <div class="detail-modal__row"><span class="detail-modal__row-label">Items</span><span class="detail-modal__row-value">${ex.items}</span></div>
        <div class="detail-modal__row"><span class="detail-modal__row-label">Status</span><span class="detail-modal__row-value"><span class="badge badge--${statusClass(ex.status)}">${ex.status}</span></span></div>
      </div>
      ${renderApprovalTimeline(ex.status, 'Li Wei', ex.date)}
    </div>
    <div class="modal__footer">
      ${ex.status === 'Draft' ? '<button class="btn btn--primary btn--sm" onclick="closeModal()">Submit</button>' : ''}
      ${ex.status === 'Pending' ? '<button class="btn btn--danger btn--sm" onclick="closeModal()">Cancel</button>' : ''}
      <button class="btn btn--secondary" onclick="closeModal()">Close</button>
    </div>
  </div>`);
};

// ── Modal System ────────────────────────────────────────────
function openModal(html) {
  closeModal();
  const overlay = document.createElement('div');
  overlay.className = 'modal-overlay'; overlay.id = 'modalOverlay';
  overlay.innerHTML = html;
  overlay.addEventListener('click', e => { if (e.target === overlay) closeModal(); });
  document.body.appendChild(overlay);
}
function closeModal() { const m = document.getElementById('modalOverlay'); if (m) m.remove(); }
window.closeModal = closeModal;

// ── Onboard Type Select ─────────────────────────────────────
window.openOnboardSelect = function() {
  openModal(`<div class="modal">
    <div class="modal__header"><div class="modal__title">Select Employee Type</div>
      <button class="modal__close" onclick="closeModal()">${icon('close')}</button></div>
    <div class="modal__body">
      <div style="display:flex;gap:12px">
        <div style="flex:1;padding:20px;border:1px solid var(--border);border-radius:var(--radius-lg);cursor:pointer;text-align:center;transition:0.2s" onmouseover="this.style.borderColor='var(--accent)'" onmouseout="this.style.borderColor='var(--border)'" onclick="closeModal()">
          <div style="font-size:1.5rem;margin-bottom:8px">${icon('users')}</div>
          <div style="font-weight:600;color:var(--text-dark);margin-bottom:4px">Employee</div>
          <div style="font-size:0.78rem;color:var(--text-muted)">Full-time or part-time employee</div>
        </div>
        <div style="flex:1;padding:20px;border:1px solid var(--border);border-radius:var(--radius-lg);cursor:pointer;text-align:center;transition:0.2s" onmouseover="this.style.borderColor='var(--accent)'" onmouseout="this.style.borderColor='var(--border)'" onclick="closeModal()">
          <div style="font-size:1.5rem;margin-bottom:8px">${icon('receipt')}</div>
          <div style="font-weight:600;color:var(--text-dark);margin-bottom:4px">Contractor</div>
          <div style="font-size:0.78rem;color:var(--text-muted)">Independent contractor</div>
        </div>
      </div>
    </div>
  </div>`);
};

// ── Leave Apply Form ────────────────────────────────────────
window.openLeaveForm = function() {
  openModal(`<div class="modal">
    <div class="modal__header"><div class="modal__title">New Leave Request</div>
      <button class="modal__close" onclick="closeModal()">${icon('close')}</button></div>
    <div class="modal__body">
      <div class="detail-grid">
        <div class="form-group"><label class="form-label">Leave Type *</label>
          <select class="form-select"><option>Annual Leave</option><option>Sick Leave</option><option>Personal Leave</option><option>Compensatory Leave</option></select></div>
        <div class="form-group"><label class="form-label">Half Day</label>
          <select class="form-select"><option>Full</option><option>First Half</option><option>Second Half</option></select></div>
        <div class="form-group"><label class="form-label">From Date *</label><input class="form-input" type="date"></div>
        <div class="form-group"><label class="form-label">To Date *</label><input class="form-input" type="date"></div>
      </div>
      <div class="form-group"><label class="form-label">Reason *</label>
        <textarea class="form-textarea" placeholder="Please describe the reason for your leave..."></textarea></div>
      <div class="form-group"><label class="form-label">Attachment</label>
        <div class="upload-area" style="padding:16px"><div class="upload-area__text">Click or drag to upload</div><div class="upload-area__hint">JPG, PNG, PDF — max 10MB</div></div></div>
    </div>
    <div class="modal__footer">
      <button class="btn btn--ghost" onclick="closeModal()">Cancel</button>
      <button class="btn btn--secondary" onclick="closeModal()">Save Draft</button>
      <button class="btn btn--primary" onclick="closeModal()">Submit</button>
    </div>
  </div>`);
};

// ── Expense Apply Form ──────────────────────────────────────
let expItemCount = 1;

function renderExpItems(count) {
  let items = '';
  for (let i = 1; i <= count; i++) {
    items += `<div class="expense-item">
      <div class="expense-item__header"><span class="expense-item__num">Item #${i}</span>
        ${i > 1 ? `<button class="expense-item__remove" onclick="removeExpItem(this)">${icon('close')}</button>` : ''}</div>
      <div class="expense-item__fields">
        <div class="form-group" style="margin:0"><label class="form-label">Date *</label><input class="form-input" type="date"></div>
        <div class="form-group" style="margin:0"><label class="form-label">Amount *</label><input class="form-input" type="number" placeholder="0.00"></div>
        <div class="form-group" style="margin:0"><label class="form-label">Currency</label><select class="form-select"><option>CNY</option><option>USD</option><option>EUR</option></select></div>
        <div class="form-group" style="margin:0"><label class="form-label">Category *</label><select class="form-select"><option>Travel</option><option>Meals</option><option>Equipment</option><option>Communication</option><option>Transportation</option><option>Other</option></select></div>
      </div>
      <div class="form-group" style="margin-top:10px;margin-bottom:0"><label class="form-label">Description</label><input class="form-input" placeholder="Brief description"></div>
    </div>`;
  }
  return items;
}

window.openExpenseForm = function() {
  expItemCount = 1;
  openModal(`<div class="modal modal--lg">
    <div class="modal__header"><div class="modal__title">New Expense Claim</div>
      <button class="modal__close" onclick="closeModal()">${icon('close')}</button></div>
    <div class="modal__body">
      <div id="expItemsContainer">${renderExpItems(1)}</div>
      <button class="add-item-btn" onclick="addExpItem()">${icon('plus')} Add Another Item</button>
      <div class="form-group" style="margin-top:14px"><label class="form-label">Receipts / Invoices</label>
        <div class="upload-area" style="padding:16px"><div class="upload-area__text">Click or drag to upload receipts</div><div class="upload-area__hint">Multiple files — JPG, PNG, PDF — max 10MB each</div></div></div>
    </div>
    <div class="modal__footer">
      <button class="btn btn--ghost" onclick="closeModal()">Cancel</button>
      <button class="btn btn--secondary" onclick="closeModal()">Save Draft</button>
      <button class="btn btn--primary" onclick="closeModal()">Submit</button>
    </div>
  </div>`);
};

window.addExpItem = function() {
  expItemCount++;
  document.getElementById('expItemsContainer').innerHTML = renderExpItems(expItemCount);
};
window.removeExpItem = function(btn) {
  btn.closest('.expense-item').remove(); expItemCount--;
  document.querySelectorAll('.expense-item__num').forEach((el, i) => el.textContent = `Item #${i + 1}`);
};

// ── Ticket Create Form (matching Customer categories/priorities) ─
window.openTicketForm = function() {
  openModal(`<div class="modal modal--lg">
    <div class="modal__header"><div class="modal__title">New Support Ticket</div>
      <button class="modal__close" onclick="closeModal()">${icon('close')}</button></div>
    <div class="modal__body">
      <div class="detail-grid">
        <div class="form-group"><label class="form-label">Category *</label>
          <select class="form-select"><option value="CONSULTATION">Consultation</option><option value="IT_SUPPORT">IT Support</option><option value="COMPLAINT">Complaint</option><option value="REPAIR">Repair</option><option value="SUGGESTION">Suggestion</option></select></div>
        <div class="form-group"><label class="form-label">Priority *</label>
          <select class="form-select"><option value="P3">P3 — Low</option><option value="P2">P2 — Medium</option><option value="P1">P1 — High</option><option value="P0">P0 — Urgent</option></select></div>
      </div>
      <div class="form-group"><label class="form-label">Subject *</label><input class="form-input" placeholder="Brief summary of the issue"></div>
      <div class="form-group"><label class="form-label">Description *</label>
        <div class="md-editor">
          <div class="md-editor__toolbar">
            <button title="Bold"><b>B</b></button><button title="Italic"><i>I</i></button>
            <button title="Code" style="font-family:'JetBrains Mono',monospace;font-size:0.72rem">&lt;/&gt;</button>
          </div>
          <textarea placeholder="Describe the issue in detail. Markdown supported..."></textarea>
        </div></div>
      <div class="form-group"><label class="form-label">Attachments</label>
        <div class="upload-area" style="padding:16px"><div class="upload-area__text">Click or drag to upload</div><div class="upload-area__hint">Screenshots, logs — max 10MB each</div></div></div>
    </div>
    <div class="modal__footer">
      <button class="btn btn--ghost" onclick="closeModal()">Cancel</button>
      <button class="btn btn--primary" onclick="closeModal()">Create Ticket</button>
    </div>
  </div>`);
};

// ── Login / Onboarding ──────────────────────────────────────
let loginView = 'login';

function renderLoginScreen() {
  if (loginView === 'forgot') return renderForgotPassword();
  if (loginView === 'reset') return renderResetPassword();
  return `<div class="login-screen"><div class="login-card">
    <div class="login-logo">
      <svg width="32" height="32" viewBox="80 46 82 82" fill="none"><rect x="80" y="46" width="82" height="82" rx="10" fill="#1a1d23"/><path d="M110.39,71.82c.85,0,1.42.88,1.06,1.66l-4.55,9.9-.06.13-.67,1.46-6.4,13.93c-.19.42-.61.68-1.06.68h-10.58c-.85,0-1.42-.88-1.06-1.66l5.95-12.96.67-1.46,5.06-11.01c.19-.41.61-.68,1.06-.68h10.58Z" fill="#fff"/><path d="M151.2,83.51h-10.58c-.46,0-.87-.27-1.06-.68l-4.3-9.35c-.36-.77.21-1.66,1.06-1.66h10.58c.46,0,.87.27,1.06.68l4.3,9.35c.36.77-.21,1.66-1.06,1.66Z" fill="#47fa22"/><path d="M126.07,73.48l-4.3,9.35c-.19.41-.61.68-1.06.68h-10.58c-.85,0-1.42-.88-1.06-1.66l4.3-9.35c.19-.41.61-.68,1.06-.68h10.58c.85,0,1.42.88,1.06,1.66Z" fill="#fff"/><path d="M125.69,99.59h-10.59c-.46,0-.87-.27-1.06-.68l-5.64-12.28c-.36-.77.21-1.66,1.06-1.66h10.59c.46,0,.87.27,1.06.68l5.64,12.28c.36.77-.21,1.66-1.06,1.66Z" fill="#fff"/><path d="M152.93,86.63l-5.64,12.28c-.19.42-.61.68-1.06.68h-10.58c-.85,0-1.42-.88-1.06-1.66l5.64-12.28c.19-.42.61-.68,1.06-.68h10.58c.85,0,1.42.88,1.06,1.66Z" fill="#47fa22"/></svg>
      <span class="login-logo__text">RampingUp</span>
    </div>
    <div class="login-title">Welcome back</div>
    <div class="login-subtitle">Sign in to your employee portal</div>
    <div class="form-group"><label class="form-label">Email</label><input class="form-input" type="email" placeholder="you@company.com" value="zhang.rui@rampingup.com"></div>
    <div class="form-group"><label class="form-label">Password</label><input class="form-input" type="password" value="••••••••"></div>
    <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:18px">
      <label class="form-check" style="margin:0"><input type="checkbox" checked> Remember me</label>
      <a style="font-size:0.75rem;color:var(--accent);cursor:pointer" onclick="switchLoginView('forgot')">Forgot password?</a>
    </div>
    <button class="btn btn--primary btn--block btn--lg" onclick="doLogin()">Sign In</button>
    <div class="login-divider">or continue with</div>
    <div style="display:flex;gap:8px">
      <button class="btn btn--secondary" style="flex:1">Feishu</button>
      <button class="btn btn--secondary" style="flex:1">SSO</button>
    </div>
    <div class="login-footer">New employee? <a onclick="showOnboarding()">Complete onboarding</a></div>
  </div></div>`;
}

function renderForgotPassword() {
  return `<div class="login-screen"><div class="login-card">
    <div class="login-logo"><svg width="32" height="32" viewBox="80 46 82 82" fill="none"><rect x="80" y="46" width="82" height="82" rx="10" fill="#1a1d23"/><path d="M110.39,71.82c.85,0,1.42.88,1.06,1.66l-4.55,9.9-.06.13-.67,1.46-6.4,13.93c-.19.42-.61.68-1.06.68h-10.58c-.85,0-1.42-.88-1.06-1.66l5.95-12.96.67-1.46,5.06-11.01c.19-.41.61-.68,1.06-.68h10.58Z" fill="#fff"/><path d="M151.2,83.51h-10.58c-.46,0-.87-.27-1.06-.68l-4.3-9.35c-.36-.77.21-1.66,1.06-1.66h10.58c.46,0,.87.27,1.06.68l4.3,9.35c.36.77-.21,1.66-1.06,1.66Z" fill="#47fa22"/><path d="M126.07,73.48l-4.3,9.35c-.19.41-.61.68-1.06.68h-10.58c-.85,0-1.42-.88-1.06-1.66l4.3-9.35c.19-.41.61-.68,1.06-.68h10.58c.85,0,1.42.88,1.06,1.66Z" fill="#fff"/><path d="M125.69,99.59h-10.59c-.46,0-.87-.27-1.06-.68l-5.64-12.28c-.36-.77.21-1.66,1.06-1.66h10.59c.46,0,.87.27,1.06.68l5.64,12.28c.36.77-.21,1.66-1.06,1.66Z" fill="#fff"/><path d="M152.93,86.63l-5.64,12.28c-.19.42-.61.68-1.06.68h-10.58c-.85,0-1.42-.88-1.06-1.66l5.64-12.28c.19-.42.61-.68,1.06-.68h10.58c.85,0,1.42.88,1.06,1.66Z" fill="#47fa22"/></svg><span class="login-logo__text">RampingUp</span></div>
    <div class="login-title">Forgot Password</div>
    <div class="login-subtitle">Enter your email and we'll send a reset link</div>
    <div class="form-group"><label class="form-label">Email</label><input class="form-input" type="email" placeholder="you@company.com"></div>
    <button class="btn btn--primary btn--block btn--lg" onclick="switchLoginView('reset')">Send Reset Link</button>
    <div class="login-footer"><a onclick="switchLoginView('login')">Back to Sign In</a></div>
  </div></div>`;
}

function renderResetPassword() {
  return `<div class="login-screen"><div class="login-card">
    <div class="login-logo"><svg width="32" height="32" viewBox="80 46 82 82" fill="none"><rect x="80" y="46" width="82" height="82" rx="10" fill="#1a1d23"/><path d="M110.39,71.82c.85,0,1.42.88,1.06,1.66l-4.55,9.9-.06.13-.67,1.46-6.4,13.93c-.19.42-.61.68-1.06.68h-10.58c-.85,0-1.42-.88-1.06-1.66l5.95-12.96.67-1.46,5.06-11.01c.19-.41.61-.68,1.06-.68h10.58Z" fill="#fff"/><path d="M151.2,83.51h-10.58c-.46,0-.87-.27-1.06-.68l-4.3-9.35c-.36-.77.21-1.66,1.06-1.66h10.58c.46,0,.87.27,1.06.68l4.3,9.35c.36.77-.21,1.66-1.06,1.66Z" fill="#47fa22"/><path d="M126.07,73.48l-4.3,9.35c-.19.41-.61.68-1.06.68h-10.58c-.85,0-1.42-.88-1.06-1.66l4.3-9.35c.19-.41.61-.68,1.06-.68h10.58c.85,0,1.42.88,1.06,1.66Z" fill="#fff"/><path d="M125.69,99.59h-10.59c-.46,0-.87-.27-1.06-.68l-5.64-12.28c-.36-.77.21-1.66,1.06-1.66h10.59c.46,0,.87.27,1.06.68l5.64,12.28c.36.77-.21,1.66-1.06,1.66Z" fill="#fff"/><path d="M152.93,86.63l-5.64,12.28c-.19.42-.61.68-1.06.68h-10.58c-.85,0-1.42-.88-1.06-1.66l5.64-12.28c.19-.42.61-.68,1.06-.68h10.58c.85,0,1.42.88,1.06,1.66Z" fill="#47fa22"/></svg><span class="login-logo__text">RampingUp</span></div>
    <div class="login-title">Reset Password</div>
    <div class="login-subtitle">Enter your new password</div>
    <div class="form-group"><label class="form-label">New Password</label><input class="form-input" type="password" placeholder="At least 8 characters"></div>
    <div class="form-group"><label class="form-label">Confirm Password</label><input class="form-input" type="password" placeholder="Re-enter password"></div>
    <button class="btn btn--primary btn--block btn--lg" onclick="switchLoginView('login')">Reset Password</button>
    <div class="login-footer"><a onclick="switchLoginView('login')">Back to Sign In</a></div>
  </div></div>`;
}

window.switchLoginView = function(v) { loginView = v; const c = document.getElementById('loginContainer'); if (c) c.innerHTML = renderLoginScreen(); };
window.doLogin = function() { const c = document.getElementById('loginContainer'); if (c) { c.style.transition = 'opacity 0.3s ease'; c.style.opacity = '0'; setTimeout(() => c.remove(), 300); } };
window.showLoginScreen = function() { loginView = 'login'; const e = document.getElementById('loginContainer'); if (e) e.remove(); const d = document.createElement('div'); d.id = 'loginContainer'; d.innerHTML = renderLoginScreen(); document.body.appendChild(d); };

// ── Onboarding (multi-step wizard matching Customer) ────────
let obStep = 1;
const OB_TOTAL = 6;
const OB_STEPS = [
  { num: 1, label: 'Personal', title: 'Personal Information' },
  { num: 2, label: 'Education', title: 'Education Credentials' },
  { num: 3, label: 'Employment', title: 'Employment History' },
  { num: 4, label: 'Bank', title: 'Bank & Compensation' },
  { num: 5, label: 'Compliance', title: 'Insurance & Compliance' },
  { num: 6, label: 'Confirm', title: 'Review & Confirm' },
];

function renderObProgress() {
  return `<div class="ob-progress">${OB_STEPS.map((s, i) => {
    const done = obStep > s.num, active = obStep === s.num;
    const cls = done ? 'done' : active ? 'active' : '';
    const chk = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" width="14" height="14"><path d="M20 6L9 17l-5-5"/></svg>';
    return `<div class="ob-step"><div class="ob-step__circle ${cls}">${done ? chk : s.num}<span class="ob-step__label">${s.label}</span></div>
      ${i < OB_STEPS.length - 1 ? `<div class="ob-step__line ${done ? 'done' : ''}"></div>` : ''}</div>`;
  }).join('')}</div>`;
}

function uploadArea(label, hint) {
  return `<div class="upload-area"><div class="upload-area__icon">${icon('upload')}</div>
    <div class="upload-area__text">${label}</div><div class="upload-area__hint">${hint}</div></div>`;
}

function renderObStepContent() {
  if (obStep > OB_TOTAL) return `<div class="ob-card"><div class="ob-end">
    <div class="ob-end__icon">${icon('check')}</div>
    <div class="ob-end__title">Onboarding Complete!</div>
    <div class="ob-end__desc">Your information has been submitted for review. You will receive a confirmation email once your account is fully activated.</div>
    <button class="btn btn--primary" onclick="closeOnboarding()">Go to Portal</button>
  </div></div>`;

  const step = OB_STEPS[obStep - 1];
  let fields = '';
  switch (obStep) {
    case 1: fields = `<div class="grid-2 mb-4"><div>${uploadArea('Upload ID Card (Front)', 'JPG, PNG — max 5MB')}</div><div>${uploadArea('Upload ID Card (Back)', 'JPG, PNG — max 5MB')}</div></div>
      <div class="detail-grid">
        <div class="form-group"><label class="form-label">Full Name *</label><input class="form-input" value="${EMPLOYEE.name}"></div>
        <div class="form-group"><label class="form-label">Gender *</label><select class="form-select"><option>Male</option><option>Female</option></select></div>
        <div class="form-group"><label class="form-label">Date of Birth *</label><input class="form-input" type="date" value="1995-06-20"></div>
        <div class="form-group"><label class="form-label">ID Number *</label><input class="form-input" placeholder="Identification number"></div>
        <div class="form-group"><label class="form-label">Phone *</label><input class="form-input" value="${EMPLOYEE.phone}"></div>
        <div class="form-group"><label class="form-label">Email *</label><input class="form-input" value="${EMPLOYEE.email}"></div>
      </div>`; break;
    case 2: fields = `<div class="grid-2 mb-4"><div>${uploadArea('Graduation Certificate', 'JPG, PNG, PDF')}</div><div>${uploadArea('Degree Certificate', 'JPG, PNG, PDF')}</div></div>
      <div class="detail-grid">
        <div class="form-group"><label class="form-label">Highest Education *</label><select class="form-select"><option>Bachelor</option><option>Master</option><option>PhD</option></select></div>
        <div class="form-group"><label class="form-label">Institution *</label><input class="form-input" placeholder="University name"></div>
        <div class="form-group"><label class="form-label">Major *</label><input class="form-input" placeholder="Field of study"></div>
        <div class="form-group"><label class="form-label">Graduation Date *</label><input class="form-input" type="date"></div>
      </div>`; break;
    case 3: fields = `<div class="mb-4">${uploadArea('Resignation Letter (if applicable)', 'JPG, PNG, PDF')}</div>
      <div class="section-title" style="margin-top:14px">Most Recent Employment</div>
      <div class="detail-grid">
        <div class="form-group"><label class="form-label">Company</label><input class="form-input" placeholder="Previous employer"></div>
        <div class="form-group"><label class="form-label">Job Title</label><input class="form-input" placeholder="Position"></div>
        <div class="form-group"><label class="form-label">Start Date</label><input class="form-input" type="date"></div>
        <div class="form-group"><label class="form-label">End Date</label><input class="form-input" type="date"></div>
      </div>`; break;
    case 4: fields = `<div class="detail-grid">
        <div class="form-group"><label class="form-label">Bank Name *</label><select class="form-select"><option>China Merchants Bank</option><option>ICBC</option><option>Bank of China</option></select></div>
        <div class="form-group"><label class="form-label">Account Number *</label><input class="form-input" placeholder="Bank account"></div>
        <div class="form-group"><label class="form-label">Branch</label><input class="form-input" placeholder="Branch name"></div>
        <div class="form-group"><label class="form-label">Account Holder *</label><input class="form-input" value="${EMPLOYEE.name}"></div>
      </div>`; break;
    case 5: fields = `<div class="detail-grid">
        <div class="form-group"><label class="form-label">Household Type *</label><select class="form-select"><option>Urban</option><option>Rural</option></select></div>
        <div class="form-group"><label class="form-label">Household Location *</label><input class="form-input" placeholder="Province / City"></div>
        <div class="form-group"><label class="form-label">Social Insurance Base</label><input class="form-input" placeholder="Monthly amount (¥)"></div>
        <div class="form-group"><label class="form-label">Housing Fund Base</label><input class="form-input" placeholder="Monthly amount (¥)"></div>
      </div>
      <div class="section-title" style="margin-top:16px">Emergency Contact</div>
      <div class="detail-grid">
        <div class="form-group"><label class="form-label">Name *</label><input class="form-input" placeholder="Full name"></div>
        <div class="form-group"><label class="form-label">Relationship *</label><select class="form-select"><option>Spouse</option><option>Parent</option><option>Sibling</option></select></div>
        <div class="form-group"><label class="form-label">Phone *</label><input class="form-input" placeholder="Phone number"></div>
      </div>`; break;
    case 6: fields = `<div style="padding:8px 0">
      <div class="section-title">Personal</div>
      <div class="detail-grid mb-4">
        <div class="detail-item"><div class="detail-item__label">Name</div><div class="detail-item__value">${EMPLOYEE.name}</div></div>
        <div class="detail-item"><div class="detail-item__label">Email</div><div class="detail-item__value detail-item__value--accent">${EMPLOYEE.email}</div></div>
      </div>
      <div class="section-title">Bank Info</div>
      <div class="detail-grid mb-4">
        <div class="detail-item"><div class="detail-item__label">Bank</div><div class="detail-item__value">${EMPLOYEE.bankName}</div></div>
        <div class="detail-item"><div class="detail-item__label">Account</div><div class="detail-item__value detail-item__value--accent">${EMPLOYEE.bankAccount}</div></div>
      </div>
      <label class="form-check"><input type="checkbox"> I confirm all information is accurate and complete.</label>
    </div>`; break;
  }

  return `<div class="ob-card" style="animation:fadeInUp 0.3s var(--ease)"><div class="ob-card__title">${step.title}</div>${fields}</div>
    <div class="ob-nav"><div class="ob-nav__step">Step ${obStep} of ${OB_TOTAL}</div>
      <div style="display:flex;gap:8px">
        ${obStep > 1 ? '<button class="btn btn--secondary" onclick="obPrev()">Previous</button>' : ''}
        <button class="btn btn--primary" onclick="obNext()">${obStep === OB_TOTAL ? 'Submit' : 'Next'}</button>
      </div></div>`;
}

function renderOnboardingScreen() {
  return `<div class="onboarding-screen" id="onboardingScreen">
    <div class="onboarding-container">
      <div class="onboarding-header">
        <div class="login-logo" style="justify-content:center;margin-bottom:16px">
          <svg width="32" height="32" viewBox="80 46 82 82" fill="none"><rect x="80" y="46" width="82" height="82" rx="10" fill="#1a1d23"/><path d="M110.39,71.82c.85,0,1.42.88,1.06,1.66l-4.55,9.9-.06.13-.67,1.46-6.4,13.93c-.19.42-.61.68-1.06.68h-10.58c-.85,0-1.42-.88-1.06-1.66l5.95-12.96.67-1.46,5.06-11.01c.19-.41.61-.68,1.06-.68h10.58Z" fill="#fff"/><path d="M151.2,83.51h-10.58c-.46,0-.87-.27-1.06-.68l-4.3-9.35c-.36-.77.21-1.66,1.06-1.66h10.58c.46,0,.87.27,1.06.68l4.3,9.35c.36.77-.21,1.66-1.06,1.66Z" fill="#47fa22"/><path d="M126.07,73.48l-4.3,9.35c-.19.41-.61.68-1.06.68h-10.58c-.85,0-1.42-.88-1.06-1.66l4.3-9.35c.19-.41.61-.68,1.06-.68h10.58c.85,0,1.42.88,1.06,1.66Z" fill="#fff"/><path d="M125.69,99.59h-10.59c-.46,0-.87-.27-1.06-.68l-5.64-12.28c-.36-.77.21-1.66,1.06-1.66h10.59c.46,0,.87.27,1.06.68l5.64,12.28c.36.77-.21,1.66-1.06,1.66Z" fill="#fff"/><path d="M152.93,86.63l-5.64,12.28c-.19.42-.61.68-1.06.68h-10.58c-.85,0-1.42-.88-1.06-1.66l5.64-12.28c.19-.42.61-.68,1.06-.68h10.58c.85,0,1.42.88,1.06,1.66Z" fill="#47fa22"/></svg>
          <span class="login-logo__text">RampingUp</span>
        </div>
        <div class="onboarding-header__title">Employee Onboarding</div>
        <div class="onboarding-header__sub">Complete the following steps to set up your account</div>
      </div>
      ${obStep <= OB_TOTAL ? renderObProgress() : ''}
      <div id="obContent">${renderObStepContent()}</div>
    </div>
  </div>`;
}

window.obNext = function() {
  obStep++;
  document.getElementById('obContent').innerHTML = renderObStepContent();
  const p = document.querySelector('.ob-progress');
  if (p && obStep <= OB_TOTAL) p.outerHTML = renderObProgress();
  else if (p && obStep > OB_TOTAL) p.remove();
};
window.obPrev = function() {
  if (obStep > 1) { obStep--; document.getElementById('obContent').innerHTML = renderObStepContent();
    const p = document.querySelector('.ob-progress'); if (p) p.outerHTML = renderObProgress(); }
};
window.showOnboarding = function() {
  obStep = 1;
  const l = document.getElementById('loginContainer'); if (l) l.remove();
  const d = document.createElement('div'); d.id = 'onboardingContainer';
  d.style.cssText = 'position:fixed;inset:0;z-index:200;overflow-y:auto;';
  d.innerHTML = renderOnboardingScreen(); document.body.appendChild(d);
};
window.closeOnboarding = function() {
  const c = document.getElementById('onboardingContainer');
  if (c) { c.style.transition = 'opacity 0.3s ease'; c.style.opacity = '0'; setTimeout(() => c.remove(), 300); }
};

// ── Router ───────────────────────────────────────────────────
const PAGES = {
  dashboard: { title: 'Dashboard', render: renderDashboard },
  team: { title: 'Employees', render: renderTeam },
  services: { title: 'Service Progress', render: renderServices },
  leave: { title: 'Leave Applications', render: renderLeave },
  holidays: { title: 'Holiday List', render: renderHolidays },
  salary: { title: 'Salary Slips', render: renderSalary },
  expenses: { title: 'Expense Claims', render: renderExpenses },
  contract: { title: 'Contract', render: renderContract },
  wallet: { title: 'Wallet', render: renderWallet },
  tickets: { title: 'Support Tickets', render: renderTickets },
  profile: { title: 'My Profile', render: renderProfile },
  login: { title: 'Login', render: () => { showLoginScreen(); return ''; } },
  onboarding: { title: 'Onboarding', render: () => { showOnboarding(); return ''; } },
};

function navigate(page) {
  if (page === 'login') { showLoginScreen(); return; }
  if (page === 'onboarding') { showOnboarding(); return; }
  const config = PAGES[page] || PAGES.dashboard;
  const content = document.getElementById('content');
  const breadcrumb = document.getElementById('breadcrumb');

  document.querySelectorAll('.nav-item').forEach(item => {
    item.classList.toggle('active', item.dataset.page === page);
  });
  breadcrumb.textContent = config.title;

  content.style.opacity = '0'; content.style.transform = 'translateY(6px)';
  setTimeout(() => {
    content.innerHTML = config.render();
    content.style.transition = 'opacity 0.25s ease, transform 0.25s ease';
    content.style.opacity = '1'; content.style.transform = 'translateY(0)';
    content.scrollTop = 0;
  }, 120);

  document.getElementById('sidebar').classList.remove('open');
}

function handleRoute() {
  const hash = window.location.hash.replace('#/', '') || 'dashboard';
  navigate(hash.split('/')[0] || 'dashboard');
}

// ── Init ─────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  window.addEventListener('hashchange', handleRoute);
  handleRoute();
  document.getElementById('sidebarToggle').addEventListener('click', () => {
    document.getElementById('sidebar').classList.toggle('open');
  });
  document.addEventListener('click', e => {
    const sb = document.getElementById('sidebar'), tg = document.getElementById('sidebarToggle');
    if (sb.classList.contains('open') && !sb.contains(e.target) && !tg.contains(e.target)) sb.classList.remove('open');
  });
});
