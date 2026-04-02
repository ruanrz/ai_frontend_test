/* ═══════════════════════════════════════════════════════════════
   RampingUp Employee Portal — Application Logic
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
};

const LEAVE_TYPES = [
  { type: 'Annual Leave', total: 15, used: 7, color: '#3b82f6' },
  { type: 'Sick Leave', total: 10, used: 2, color: '#8b5cf6' },
  { type: 'Personal Leave', total: 5, used: 1, color: '#06b6d4' },
  { type: 'Compensatory', total: 3, used: 0, color: '#10b981' },
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

function svgIcon(name) {
  const icons = {
    calendar: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" width="16" height="16"><rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/></svg>',
    dollar: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" width="16" height="16"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6"/></svg>',
    receipt: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" width="16" height="16"><path d="M21 4H3v16h18V4z"/><path d="M21 10H3M7 15h4"/></svg>',
    ticket: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" width="16" height="16"><path d="M15 5H9l-1 8h8l-1-8zM9 5L7.6 2h8.8L15 5"/><path d="M8 13v4a3 3 0 003 3h2a3 3 0 003-3v-4"/></svg>',
    plus: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="16" height="16"><path d="M12 5v14M5 12h14"/></svg>',
    eye: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" width="14" height="14"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>',
    arrowUp: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="12" height="12"><path d="M12 19V5M5 12l7-7 7 7"/></svg>',
    arrowDown: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="12" height="12"><path d="M12 5v14M5 12l7 7 7-7"/></svg>',
    clock: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" width="14" height="14"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>',
    tag: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" width="14" height="14"><path d="M20.59 13.41l-7.17 7.17a2 2 0 01-2.83 0L2 12V2h10l8.59 8.59a2 2 0 010 2.82z"/><circle cx="7" cy="7" r="1"/></svg>',
    download: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" width="16" height="16"><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>',
  };
  return icons[name] || '';
}

function balanceRingSVG(used, total, color) {
  const r = 18;
  const circumference = 2 * Math.PI * r;
  const pct = total > 0 ? ((total - used) / total) : 0;
  const offset = circumference * (1 - pct);
  return `
    <svg viewBox="0 0 48 48">
      <circle class="balance-ring__track" cx="24" cy="24" r="${r}"/>
      <circle class="balance-ring__fill" cx="24" cy="24" r="${r}"
        stroke="${color}" stroke-dasharray="${circumference}"
        stroke-dashoffset="${offset}"/>
    </svg>
    <div class="balance-ring__text">${total - used}</div>
  `;
}

// ── Page Renderers ───────────────────────────────────────────

function renderDashboard() {
  const now = new Date();
  const day = now.getDate();
  const monthNames = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  const month = monthNames[now.getMonth()];
  const year = now.getFullYear();
  const hour = now.getHours();
  const greeting = hour < 12 ? 'Good morning' : hour < 18 ? 'Good afternoon' : 'Good evening';

  const totalLeaveRemaining = LEAVE_TYPES.reduce((s, l) => s + (l.total - l.used), 0);
  const pendingRequests = LEAVE_REQUESTS.filter(l => l.status === 'Pending').length +
                          EXPENSES.filter(e => e.status === 'Pending').length;
  const latestSalary = SALARY_SLIPS[0];
  const openTickets = TICKETS.filter(t => t.status === 'Open' || t.status === 'Pending').length;

  // Monthly salary data for chart
  const salaryData = SALARY_SLIPS.slice(0, 6).reverse();

  return `
    <div class="page-enter">
      <!-- Welcome Banner -->
      <div class="welcome-banner animate-in">
        <div class="welcome-banner__greeting">${greeting},</div>
        <div class="welcome-banner__name">${EMPLOYEE.name}</div>
        <div class="welcome-banner__subtitle">${EMPLOYEE.role} · ${EMPLOYEE.department}</div>
        <div class="welcome-banner__date">
          <div class="welcome-banner__date-day">${day}</div>
          <div class="welcome-banner__date-month">${month} ${year}</div>
        </div>
      </div>

      <!-- Stats -->
      <div class="stats-grid">
        <div class="stat-card stat-card--blue animate-in">
          <div class="stat-card__icon">${svgIcon('calendar')}</div>
          <div class="stat-card__label">Leave Balance</div>
          <div class="stat-card__value">${totalLeaveRemaining}</div>
          <div class="stat-card__trend stat-card__trend--up">${svgIcon('arrowUp')} days remaining</div>
        </div>
        <div class="stat-card stat-card--violet animate-in">
          <div class="stat-card__icon">${svgIcon('clock')}</div>
          <div class="stat-card__label">Pending Requests</div>
          <div class="stat-card__value">${pendingRequests}</div>
          <div class="stat-card__trend stat-card__trend--down">${svgIcon('arrowDown')} awaiting approval</div>
        </div>
        <div class="stat-card stat-card--emerald animate-in">
          <div class="stat-card__icon">${svgIcon('dollar')}</div>
          <div class="stat-card__label">Latest Salary</div>
          <div class="stat-card__value">${formatCurrency(latestSalary.net)}</div>
          <div class="stat-card__trend stat-card__trend--up">${svgIcon('arrowUp')} +6.6% vs last year</div>
        </div>
        <div class="stat-card stat-card--amber animate-in">
          <div class="stat-card__icon">${svgIcon('ticket')}</div>
          <div class="stat-card__label">Open Tickets</div>
          <div class="stat-card__value">${openTickets}</div>
          <div class="stat-card__trend stat-card__trend--down">${svgIcon('arrowDown')} need attention</div>
        </div>
      </div>

      <!-- Grid: Chart + Activity -->
      <div class="grid-2">
        <!-- Salary Trend Chart -->
        <div class="card card--glow animate-in">
          <div class="card__header">
            <div class="card__title">Salary Trend</div>
            <span class="text-sm text-muted text-mono">${year}</span>
          </div>
          <div class="chart-bar-group">
            ${salaryData.map(s => {
              const maxNet = Math.max(...salaryData.map(x => x.net));
              const pct = (s.net / maxNet) * 100;
              return `<div class="chart-bar-item">
                <div class="chart-bar" style="height: ${pct}%"></div>
                <div class="chart-bar-label">${s.period.split(' ')[0].slice(0, 3)}</div>
              </div>`;
            }).join('')}
          </div>
        </div>

        <!-- Recent Activity -->
        <div class="card card--glow animate-in">
          <div class="card__header">
            <div class="card__title">Recent Activity</div>
          </div>
          <div class="timeline">
            ${RECENT_ACTIVITY.map(a => `
              <div class="timeline-item">
                <div class="timeline-item__time">${a.time}</div>
                <div class="timeline-item__text">${a.text}</div>
              </div>
            `).join('')}
          </div>
        </div>
      </div>

      <!-- Quick Actions -->
      <div class="mt-6 animate-in">
        <div class="section-title">Quick Actions</div>
        <div class="quick-actions">
          <a href="#/leave" class="quick-action">${svgIcon('calendar')} Apply for Leave</a>
          <a href="#/expenses" class="quick-action">${svgIcon('receipt')} Submit Expense</a>
          <a href="#/tickets" class="quick-action">${svgIcon('ticket')} Create Ticket</a>
          <a href="#/salary" class="quick-action">${svgIcon('dollar')} View Payslip</a>
        </div>
      </div>
    </div>
  `;
}

function renderLeave() {
  return `
    <div class="page-enter">
      <div class="page-header">
        <h1 class="page-title">Leave Management</h1>
        <button class="btn btn--primary" onclick="openLeaveForm()">${svgIcon('plus')} New Request</button>
      </div>

      <!-- Leave Balances -->
      <div class="balance-grid animate-in">
        ${LEAVE_TYPES.map(lt => `
          <div class="balance-card">
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
      <div class="filters animate-in">
        <span class="filter-chip active" onclick="filterLeave(this, 'all')">All</span>
        <span class="filter-chip" onclick="filterLeave(this, 'Approved')">Approved</span>
        <span class="filter-chip" onclick="filterLeave(this, 'Pending')">Pending</span>
        <span class="filter-chip" onclick="filterLeave(this, 'Rejected')">Rejected</span>
        <span class="filter-chip" onclick="filterLeave(this, 'Draft')">Draft</span>
      </div>

      <!-- Table -->
      <div class="card animate-in">
        <div class="data-table-wrap">
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
                  <td class="text-mono text-accent">${lr.id}</td>
                  <td>${lr.type}</td>
                  <td class="text-mono">${lr.from}</td>
                  <td class="text-mono">${lr.to}</td>
                  <td class="text-mono">${lr.days}</td>
                  <td><span class="badge badge--${statusClass(lr.status)}">${lr.status}</span></td>
                  <td>${lr.approver}</td>
                  <td><button class="btn btn--ghost btn--sm" onclick="viewLeaveDetail('${lr.id}')">${svgIcon('eye')} View</button></td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  `;
}

function renderSalary() {
  return `
    <div class="page-enter">
      <div class="page-header">
        <h1 class="page-title">Salary Slips</h1>
        <div class="flex items-center gap-4">
          <select class="form-select" style="width: 140px;" onchange="filterSalaryYear(this.value)">
            <option value="2025">2025</option>
            <option value="2024">2024</option>
          </select>
        </div>
      </div>

      <!-- Summary Cards -->
      <div class="stats-grid animate-in">
        <div class="stat-card stat-card--emerald">
          <div class="stat-card__label">Avg Net Pay</div>
          <div class="stat-card__value">${formatCurrency(24660)}</div>
        </div>
        <div class="stat-card stat-card--blue">
          <div class="stat-card__label">YTD Gross</div>
          <div class="stat-card__value">${formatCurrency(96000)}</div>
        </div>
        <div class="stat-card stat-card--violet">
          <div class="stat-card__label">YTD Deductions</div>
          <div class="stat-card__value">${formatCurrency(20460)}</div>
        </div>
      </div>

      <!-- Salary Table -->
      <div class="card animate-in">
        <div class="data-table-wrap">
          <table class="data-table" id="salaryTable">
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
                <tr class="salary-row-trigger" data-slip-id="${ss.id}" onclick="showSalaryDetail('${ss.id}')" style="cursor:pointer">
                  <td style="font-weight:500; color: var(--text-primary)">${ss.period}</td>
                  <td class="text-mono">${ss.payDate}</td>
                  <td class="text-mono">${formatCurrency(ss.gross)}</td>
                  <td class="text-mono" style="color: var(--accent-red)">${formatCurrency(ss.deductions)}</td>
                  <td class="text-mono" style="color: var(--accent-emerald); font-weight: 600">${formatCurrency(ss.net)}</td>
                  <td><span class="badge badge--${statusClass(ss.status)}">${ss.status}</span></td>
                  <td><button class="btn btn--ghost btn--sm">${svgIcon('eye')} Detail</button></td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  `;
}

function renderExpenses() {
  const totalPending = EXPENSES.filter(e => e.status === 'Pending').reduce((s, e) => s + e.amount, 0);
  const totalApproved = EXPENSES.filter(e => e.status === 'Approved').reduce((s, e) => s + e.amount, 0);

  return `
    <div class="page-enter">
      <div class="page-header">
        <h1 class="page-title">Expenses</h1>
        <button class="btn btn--primary" onclick="openExpenseForm()">${svgIcon('plus')} New Claim</button>
      </div>

      <!-- Summary -->
      <div class="stats-grid animate-in">
        <div class="stat-card stat-card--amber">
          <div class="stat-card__label">Pending Claims</div>
          <div class="stat-card__value">${formatCurrency(totalPending)}</div>
        </div>
        <div class="stat-card stat-card--emerald">
          <div class="stat-card__label">Approved YTD</div>
          <div class="stat-card__value">${formatCurrency(totalApproved)}</div>
        </div>
        <div class="stat-card stat-card--blue">
          <div class="stat-card__label">Total Claims</div>
          <div class="stat-card__value">${EXPENSES.length}</div>
        </div>
      </div>

      <!-- Filters -->
      <div class="filters animate-in">
        <span class="filter-chip active" onclick="filterExpense(this, 'all')">All</span>
        <span class="filter-chip" onclick="filterExpense(this, 'Pending')">Pending</span>
        <span class="filter-chip" onclick="filterExpense(this, 'Approved')">Approved</span>
        <span class="filter-chip" onclick="filterExpense(this, 'Rejected')">Rejected</span>
        <span class="filter-chip" onclick="filterExpense(this, 'Draft')">Draft</span>
      </div>

      <!-- Table -->
      <div class="card animate-in">
        <div class="data-table-wrap">
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
                  <td class="text-mono text-accent">${e.id}</td>
                  <td class="text-mono">${e.date}</td>
                  <td><span class="badge badge--draft">${e.category}</span></td>
                  <td style="max-width: 220px; overflow: hidden; text-overflow: ellipsis;">${e.description}</td>
                  <td class="text-mono">${e.items}</td>
                  <td class="text-mono" style="font-weight: 600; color: var(--text-primary)">${formatCurrency(e.amount)}</td>
                  <td><span class="badge badge--${statusClass(e.status)}">${e.status}</span></td>
                  <td><button class="btn btn--ghost btn--sm" onclick="viewExpenseDetail('${e.id}')">${svgIcon('eye')} View</button></td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  `;
}

function renderTickets() {
  return `
    <div class="page-enter">
      <div class="page-header">
        <h1 class="page-title">Support Tickets</h1>
        <button class="btn btn--primary" onclick="openTicketForm()">${svgIcon('plus')} New Ticket</button>
      </div>

      <!-- Filters -->
      <div class="filters animate-in">
        <span class="filter-chip active" onclick="filterTicket(this, 'all')">All</span>
        <span class="filter-chip" onclick="filterTicket(this, 'Open')">Open</span>
        <span class="filter-chip" onclick="filterTicket(this, 'Pending')">Pending</span>
        <span class="filter-chip" onclick="filterTicket(this, 'Closed')">Closed</span>
      </div>

      <!-- Table -->
      <div class="card animate-in">
        <div class="data-table-wrap">
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
                  <td class="text-mono text-accent">${t.id}</td>
                  <td style="font-weight: 500; color: var(--text-primary); max-width: 260px; overflow: hidden; text-overflow: ellipsis;">${t.subject}</td>
                  <td><span class="badge badge--draft">${t.category}</span></td>
                  <td><span class="priority priority--${t.priority.toLowerCase()}">${priorityDot(t.priority)} ${t.priority}</span></td>
                  <td><span class="badge badge--${statusClass(t.status)}">${t.status}</span></td>
                  <td class="text-mono">${t.created}</td>
                  <td class="text-mono">${t.updated}</td>
                  <td><button class="btn btn--ghost btn--sm" onclick="showTicketDetail('${t.id}')">${svgIcon('eye')} View</button></td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      </div>

      <!-- Ticket Detail Panel -->
      <div id="ticketDetailPanel" class="mt-6" style="display:none;"></div>
    </div>
  `;
}

function priorityDot(priority) {
  const colors = { High: 'var(--accent-red)', Medium: 'var(--accent-amber)', Low: 'var(--accent-emerald)' };
  return `<span style="display:inline-block;width:6px;height:6px;border-radius:50%;background:${colors[priority]};box-shadow:0 0 6px ${colors[priority]};margin-right:2px;"></span>`;
}

function renderProfile() {
  return `
    <div class="page-enter">
      <div class="page-header">
        <h1 class="page-title">My Profile</h1>
        <button class="btn btn--ghost">${svgIcon('eye')} Edit</button>
      </div>

      <!-- Profile Header -->
      <div class="card animate-in" style="margin-bottom: 20px;">
        <div class="profile-header">
          <div class="profile-avatar">${EMPLOYEE.initials}</div>
          <div class="profile-info">
            <div class="profile-info__name">${EMPLOYEE.name}</div>
            <div class="profile-info__role">${EMPLOYEE.role} · ${EMPLOYEE.department}</div>
            <div class="profile-info__id">${EMPLOYEE.employeeId}</div>
          </div>
        </div>
      </div>

      <!-- Tabs -->
      <div class="tabs animate-in">
        <div class="tab active" onclick="switchProfileTab(this, 'personal')">Personal</div>
        <div class="tab" onclick="switchProfileTab(this, 'company')">Company</div>
        <div class="tab" onclick="switchProfileTab(this, 'bank')">Bank Info</div>
      </div>

      <!-- Tab Content -->
      <div id="profileTabContent">
        ${renderProfilePersonal()}
      </div>
    </div>
  `;
}

function renderProfilePersonal() {
  return `
    <div class="card card--glow animate-in">
      <div class="detail-grid">
        <div class="detail-item">
          <div class="detail-item__label">Full Name</div>
          <div class="detail-item__value">${EMPLOYEE.name}</div>
        </div>
        <div class="detail-item">
          <div class="detail-item__label">Gender</div>
          <div class="detail-item__value">${EMPLOYEE.gender}</div>
        </div>
        <div class="detail-item">
          <div class="detail-item__label">Date of Birth</div>
          <div class="detail-item__value">${EMPLOYEE.dob}</div>
        </div>
        <div class="detail-item">
          <div class="detail-item__label">Email</div>
          <div class="detail-item__value detail-item__value--accent">${EMPLOYEE.email}</div>
        </div>
        <div class="detail-item">
          <div class="detail-item__label">Phone</div>
          <div class="detail-item__value">${EMPLOYEE.phone}</div>
        </div>
        <div class="detail-item">
          <div class="detail-item__label">Location</div>
          <div class="detail-item__value">${EMPLOYEE.location}</div>
        </div>
      </div>
    </div>
  `;
}

function renderProfileCompany() {
  return `
    <div class="card card--glow animate-in">
      <div class="detail-grid">
        <div class="detail-item">
          <div class="detail-item__label">Employee ID</div>
          <div class="detail-item__value detail-item__value--accent">${EMPLOYEE.employeeId}</div>
        </div>
        <div class="detail-item">
          <div class="detail-item__label">Department</div>
          <div class="detail-item__value">${EMPLOYEE.department}</div>
        </div>
        <div class="detail-item">
          <div class="detail-item__label">Role</div>
          <div class="detail-item__value">${EMPLOYEE.role}</div>
        </div>
        <div class="detail-item">
          <div class="detail-item__label">Manager</div>
          <div class="detail-item__value">${EMPLOYEE.manager}</div>
        </div>
        <div class="detail-item">
          <div class="detail-item__label">Join Date</div>
          <div class="detail-item__value">${EMPLOYEE.joinDate}</div>
        </div>
        <div class="detail-item">
          <div class="detail-item__label">Contract Type</div>
          <div class="detail-item__value">${EMPLOYEE.contractType}</div>
        </div>
      </div>
    </div>
  `;
}

function renderProfileBank() {
  return `
    <div class="card card--glow animate-in">
      <div class="detail-grid">
        <div class="detail-item">
          <div class="detail-item__label">Bank Name</div>
          <div class="detail-item__value">${EMPLOYEE.bankName}</div>
        </div>
        <div class="detail-item">
          <div class="detail-item__label">Account Number</div>
          <div class="detail-item__value detail-item__value--accent">${EMPLOYEE.bankAccount}</div>
        </div>
      </div>
    </div>
  `;
}

// ── Interactive Functions ─────────────────────────────────────

window.filterLeave = function(el, status) {
  el.parentElement.querySelectorAll('.filter-chip').forEach(c => c.classList.remove('active'));
  el.classList.add('active');
  document.querySelectorAll('#leaveTable tbody tr').forEach(tr => {
    tr.style.display = (status === 'all' || tr.dataset.status === status) ? '' : 'none';
  });
};

window.filterExpense = function(el, status) {
  el.parentElement.querySelectorAll('.filter-chip').forEach(c => c.classList.remove('active'));
  el.classList.add('active');
  document.querySelectorAll('#expenseTable tbody tr').forEach(tr => {
    tr.style.display = (status === 'all' || tr.dataset.status === status) ? '' : 'none';
  });
};

window.filterTicket = function(el, status) {
  el.parentElement.querySelectorAll('.filter-chip').forEach(c => c.classList.remove('active'));
  el.classList.add('active');
  document.querySelectorAll('#ticketTable tbody tr').forEach(tr => {
    tr.style.display = (status === 'all' || tr.dataset.status === status) ? '' : 'none';
  });
};

window.showSalaryDetail = function(id) {
  const slip = SALARY_SLIPS.find(s => s.id === id);
  if (!slip) return;

  // Check if this detail row is already open — if so, close it
  const existing = document.getElementById('salary-detail-' + id);
  if (existing) {
    existing.remove();
    return;
  }

  // Close any other open detail rows first
  document.querySelectorAll('.salary-inline-detail').forEach(el => el.remove());

  // Find the trigger row and insert detail row after it
  const triggerRow = document.querySelector('tr[data-slip-id="' + id + '"]');
  if (!triggerRow) return;

  const totalEarnings = SALARY_DETAIL.earnings.reduce((s, e) => s + e.amount, 0);
  const totalDeductions = SALARY_DETAIL.deductions.reduce((s, d) => s + d.amount, 0);

  const detailRow = document.createElement('tr');
  detailRow.id = 'salary-detail-' + id;
  detailRow.className = 'salary-inline-detail';
  detailRow.innerHTML = `
    <td colspan="7" style="padding: 0; border-bottom: 1px solid var(--border);">
      <div style="padding: 20px 24px; background: var(--bg-page, var(--bg-primary, rgba(255,255,255,0.02))); animation: fadeInUp 0.25s ease forwards;">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px;">
          <div style="font-size: 1rem; font-weight: 600; color: var(--text-primary, var(--text-white, #fff));">Salary Breakdown — ${slip.period}</div>
          <button class="btn btn--ghost btn--sm" onclick="document.getElementById('salary-detail-${id}').remove()">Close</button>
        </div>
        <div class="grid-2">
          <div class="salary-section">
            <div class="salary-section__title">Earnings</div>
            ${SALARY_DETAIL.earnings.map(e => `
              <div class="salary-row">
                <span class="salary-row__label">${e.component}</span>
                <span class="salary-row__value" style="color: var(--accent-emerald)">${formatCurrency(e.amount)}</span>
              </div>
            `).join('')}
            <div class="salary-total">
              <span class="salary-total__label">Total Earnings</span>
              <span class="salary-total__value">${formatCurrency(totalEarnings)}</span>
            </div>
          </div>
          <div class="salary-section">
            <div class="salary-section__title">Deductions</div>
            ${SALARY_DETAIL.deductions.map(d => `
              <div class="salary-row">
                <span class="salary-row__label">${d.component}</span>
                <span class="salary-row__value" style="color: var(--accent-red)">${formatCurrency(d.amount)}</span>
              </div>
            `).join('')}
            <div class="salary-total">
              <span class="salary-total__label">Total Deductions</span>
              <span class="salary-total__value">${formatCurrency(totalDeductions)}</span>
            </div>
          </div>
        </div>
        <div style="margin-top: 16px; padding: 16px; background: rgba(59,130,246,0.06); border-radius: var(--radius); border: 1px solid var(--border-accent, var(--border));">
          <div class="flex justify-between items-center">
            <span style="font-size: 1.1rem; font-weight: 600; color: var(--text-white, var(--text-primary, #fff));">Net Pay</span>
            <span style="font-size: 1.5rem; font-weight: 700; font-family: 'JetBrains Mono', monospace; background: var(--grad-primary, var(--accent-emerald)); -webkit-background-clip: text; -webkit-text-fill-color: transparent;">${formatCurrency(slip.net)}</span>
          </div>
        </div>
      </div>
    </td>
  `;

  triggerRow.insertAdjacentElement('afterend', detailRow);
  detailRow.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
};

window.showTicketDetail = function(id) {
  const ticket = TICKETS.find(t => t.id === id);
  if (!ticket) return;
  const panel = document.getElementById('ticketDetailPanel');
  panel.innerHTML = `
    <div class="card card--glow" style="animation: fadeInUp 0.3s var(--ease) forwards;">
      <div class="card__header">
        <div class="card__title">${ticket.subject}</div>
        <button class="btn btn--ghost btn--sm" onclick="document.getElementById('ticketDetailPanel').style.display='none'">Close</button>
      </div>
      <div class="ticket-meta">
        <div class="ticket-meta-item">${svgIcon('tag')} ${ticket.category}</div>
        <div class="ticket-meta-item">${svgIcon('clock')} Created: ${ticket.created}</div>
        <div class="ticket-meta-item"><span class="badge badge--${statusClass(ticket.status)}">${ticket.status}</span></div>
        <div class="ticket-meta-item"><span class="priority priority--${ticket.priority.toLowerCase()}">${priorityDot(ticket.priority)} ${ticket.priority}</span></div>
      </div>
      <div class="ticket-description">
        <p>This is a sample description for ticket ${ticket.id}. In a real application, this would contain the detailed issue description, steps to reproduce, and any relevant context provided by the employee.</p>
        <p style="margin-top: 12px;">The support team is actively working on resolving this issue. Please check back for updates or add a comment below.</p>
      </div>
      <div class="mt-6">
        <div class="section-title">Activity</div>
        <div class="timeline">
          <div class="timeline-item">
            <div class="timeline-item__time">${ticket.updated} 10:30</div>
            <div class="timeline-item__text">Status updated to ${ticket.status}</div>
          </div>
          <div class="timeline-item">
            <div class="timeline-item__time">${ticket.created} 09:00</div>
            <div class="timeline-item__text">Ticket created by ${EMPLOYEE.name}</div>
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

window.filterSalaryYear = function(year) {
  // In real app, this would filter/reload data
  console.log('Filter salary by year:', year);
};

// ── Contract Page ────────────────────────────────────────────
function renderContract() {
  return `
    <div class="page-enter">
      <div class="page-header">
        <h1 class="page-title">Employment Contract</h1>
        <button class="btn btn--ghost" onclick="alert('Download PDF')">${svgIcon('download')} Download PDF</button>
      </div>

      <div class="contract-meta animate-in">
        <div class="contract-meta-item">
          <div class="contract-meta-item__label">Contract No.</div>
          <div class="contract-meta-item__value" style="color:var(--accent-cyan); font-family:'JetBrains Mono',monospace">CTR-2024-0032</div>
        </div>
        <div class="contract-meta-item">
          <div class="contract-meta-item__label">Contract Type</div>
          <div class="contract-meta-item__value">Fixed-Term Employment</div>
        </div>
        <div class="contract-meta-item">
          <div class="contract-meta-item__label">Effective Date</div>
          <div class="contract-meta-item__value">2024-03-15</div>
        </div>
        <div class="contract-meta-item">
          <div class="contract-meta-item__label">Expiry Date</div>
          <div class="contract-meta-item__value">2027-03-14</div>
        </div>
        <div class="contract-meta-item">
          <div class="contract-meta-item__label">Employer</div>
          <div class="contract-meta-item__value">RampingUp Technology Ltd.</div>
        </div>
        <div class="contract-meta-item">
          <div class="contract-meta-item__label">Status</div>
          <div class="contract-meta-item__value"><span class="badge badge--approved">Active</span></div>
        </div>
        <div class="contract-meta-item">
          <div class="contract-meta-item__label">Probation Period</div>
          <div class="contract-meta-item__value">3 months (completed)</div>
        </div>
        <div class="contract-meta-item">
          <div class="contract-meta-item__label">Notice Period</div>
          <div class="contract-meta-item__value">30 days</div>
        </div>
      </div>

      <div class="contract-doc animate-in">
        <div class="contract-doc__title">Employment Agreement</div>

        <div class="contract-doc__section">
          <div class="contract-doc__section-title">1. Position & Duties</div>
          <div class="contract-doc__text">
            The Employee shall serve as <strong>Software Engineer</strong> in the <strong>Engineering Department</strong>,
            reporting to the Engineering Manager. The Employee shall perform duties as reasonably assigned
            and consistent with the position, including software development, code review, and technical collaboration.
          </div>
        </div>

        <div class="contract-doc__section">
          <div class="contract-doc__section-title">2. Compensation</div>
          <div class="contract-doc__text">
            Base salary of <strong>¥32,000</strong> per month, paid on the 25th of each month.
            Includes housing allowance (¥5,000), transport allowance (¥2,000), and meal allowance (¥1,500).
            Performance bonus evaluated quarterly based on KPI achievement.
          </div>
        </div>

        <div class="contract-doc__section">
          <div class="contract-doc__section-title">3. Working Hours</div>
          <div class="contract-doc__text">
            Standard working hours: Monday to Friday, 09:00 — 18:00, with one hour lunch break.
            Flexible work arrangement available with manager approval. Remote work permitted up to 2 days per week.
          </div>
        </div>

        <div class="contract-doc__section">
          <div class="contract-doc__section-title">4. Benefits & Insurance</div>
          <div class="contract-doc__text">
            Full social insurance and housing fund coverage as required by Shanghai municipal regulations.
            Supplementary commercial medical insurance provided. Annual leave: 15 days. Sick leave: 10 days.
          </div>
        </div>

        <div class="contract-doc__section">
          <div class="contract-doc__section-title">5. Non-Compete & Confidentiality</div>
          <div class="contract-doc__text">
            Employee agrees to a 12-month non-compete clause post-termination within the EOR/HRMS industry.
            All proprietary information, trade secrets, and client data shall remain strictly confidential
            during and after the term of employment.
          </div>
        </div>
      </div>
    </div>
  `;
}

// ── Wallet Page ──────────────────────────────────────────────
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

function renderWallet() {
  const balance = 123899;
  return `
    <div class="page-enter">
      <div class="page-header">
        <h1 class="page-title">Wallet</h1>
      </div>

      <div class="wallet-balance animate-in">
        <div class="wallet-balance__label">Available Balance</div>
        <div class="wallet-balance__amount">${formatCurrency(balance)}</div>
        <div class="wallet-balance__sub">Updated as of March 25, 2025</div>
      </div>

      <div class="wallet-actions animate-in">
        <button class="btn btn--primary">${svgIcon('download')} Withdraw</button>
        <button class="btn btn--ghost">${svgIcon('eye')} Statement</button>
      </div>

      <div class="card animate-in">
        <div class="card__header">
          <div class="card__title">Transaction History</div>
          <select class="form-select" style="width: 130px; padding: 6px 10px; font-size: 0.78rem;">
            <option>All</option>
            <option>Income</option>
            <option>Expense</option>
          </select>
        </div>
        <div class="wallet-tx-list">
          ${TRANSACTIONS.map(tx => `
            <div class="wallet-tx">
              <div class="wallet-tx__icon wallet-tx__icon--${tx.type}">
                ${tx.type === 'in'
                  ? '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="18" height="18"><path d="M12 5v14M5 12l7 7 7-7"/></svg>'
                  : '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="18" height="18"><path d="M12 19V5M5 12l7-7 7 7"/></svg>'}
              </div>
              <div class="wallet-tx__info">
                <div class="wallet-tx__title">${tx.title}</div>
                <div class="wallet-tx__date">${tx.date}</div>
              </div>
              <div class="wallet-tx__amount wallet-tx__amount--${tx.type}">
                ${tx.type === 'in' ? '+' : '-'}${formatCurrency(tx.amount)}
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    </div>
  `;
}

// ── Login Page ───────────────────────────────────────────────
let loginView = 'login'; // login | forgot | reset

function renderLoginScreen() {
  if (loginView === 'forgot') return renderForgotPassword();
  if (loginView === 'reset') return renderResetPassword();
  return `
    <div class="login-screen">
      <div class="bg-mesh">
        <div class="bg-orb bg-orb--1"></div>
        <div class="bg-orb bg-orb--2"></div>
        <div class="bg-orb bg-orb--3"></div>
        <div class="bg-grid"></div>
      </div>
      <div class="login-card" style="animation: modalIn 0.5s var(--ease);">
        <div class="login-logo">
          <svg width="36" height="36" viewBox="0 0 32 32" fill="none">
            <rect width="32" height="32" rx="8" fill="url(#lg2)"/>
            <path d="M8 22L16 10L24 22H8Z" fill="white" fill-opacity="0.9"/>
            <defs><linearGradient id="lg2" x1="0" y1="0" x2="32" y2="32"><stop stop-color="#3b82f6"/><stop offset="1" stop-color="#06b6d4"/></linearGradient></defs>
          </svg>
          <span class="login-logo__text">RampingUp</span>
        </div>
        <div class="login-title">Welcome back</div>
        <div class="login-subtitle">Sign in to your employee portal</div>

        <div class="form-group">
          <label class="form-label">Email</label>
          <input class="form-input" type="email" placeholder="you@company.com" value="zhang.rui@rampingup.com">
        </div>
        <div class="form-group">
          <label class="form-label">Password</label>
          <input class="form-input" type="password" placeholder="Enter your password" value="••••••••">
        </div>
        <div style="display:flex; align-items:center; justify-content:space-between; margin-bottom: 20px;">
          <label class="form-check" style="margin:0"><input type="checkbox" checked> Remember me</label>
          <a style="font-size:0.78rem; color:var(--accent-cyan); cursor:pointer;" onclick="switchLoginView('forgot')">Forgot password?</a>
        </div>
        <button class="btn btn--primary" style="width:100%; padding: 12px;" onclick="doLogin()">Sign In</button>

        <div class="login-divider">or continue with</div>
        <div class="login-social">
          <button class="btn btn--ghost" style="flex:1;">Feishu</button>
          <button class="btn btn--ghost" style="flex:1;">SSO</button>
        </div>

        <div class="login-footer">
          New employee? <a onclick="showOnboarding()">Complete onboarding</a>
        </div>
      </div>
    </div>
  `;
}

function renderForgotPassword() {
  return `
    <div class="login-screen">
      <div class="bg-mesh">
        <div class="bg-orb bg-orb--1"></div>
        <div class="bg-orb bg-orb--2"></div>
        <div class="bg-orb bg-orb--3"></div>
        <div class="bg-grid"></div>
      </div>
      <div class="login-card" style="animation: modalIn 0.5s var(--ease);">
        <div class="login-logo">
          <svg width="36" height="36" viewBox="0 0 32 32" fill="none">
            <rect width="32" height="32" rx="8" fill="url(#lg3)"/>
            <path d="M8 22L16 10L24 22H8Z" fill="white" fill-opacity="0.9"/>
            <defs><linearGradient id="lg3" x1="0" y1="0" x2="32" y2="32"><stop stop-color="#3b82f6"/><stop offset="1" stop-color="#06b6d4"/></linearGradient></defs>
          </svg>
          <span class="login-logo__text">RampingUp</span>
        </div>
        <div class="login-title">Forgot Password</div>
        <div class="login-subtitle">Enter your email and we'll send a reset link</div>

        <div class="form-group">
          <label class="form-label">Email</label>
          <input class="form-input" type="email" placeholder="you@company.com">
        </div>
        <button class="btn btn--primary" style="width:100%; padding: 12px;" onclick="switchLoginView('reset')">Send Reset Link</button>

        <div class="login-footer">
          <a onclick="switchLoginView('login')">Back to Sign In</a>
        </div>
      </div>
    </div>
  `;
}

function renderResetPassword() {
  return `
    <div class="login-screen">
      <div class="bg-mesh">
        <div class="bg-orb bg-orb--1"></div>
        <div class="bg-orb bg-orb--2"></div>
        <div class="bg-orb bg-orb--3"></div>
        <div class="bg-grid"></div>
      </div>
      <div class="login-card" style="animation: modalIn 0.5s var(--ease);">
        <div class="login-logo">
          <svg width="36" height="36" viewBox="0 0 32 32" fill="none">
            <rect width="32" height="32" rx="8" fill="url(#lg4)"/>
            <path d="M8 22L16 10L24 22H8Z" fill="white" fill-opacity="0.9"/>
            <defs><linearGradient id="lg4" x1="0" y1="0" x2="32" y2="32"><stop stop-color="#3b82f6"/><stop offset="1" stop-color="#06b6d4"/></linearGradient></defs>
          </svg>
          <span class="login-logo__text">RampingUp</span>
        </div>
        <div class="login-title">Reset Password</div>
        <div class="login-subtitle">Enter your new password</div>

        <div class="form-group">
          <label class="form-label">New Password</label>
          <input class="form-input" type="password" placeholder="At least 8 characters">
        </div>
        <div class="form-group">
          <label class="form-label">Confirm Password</label>
          <input class="form-input" type="password" placeholder="Re-enter password">
        </div>
        <button class="btn btn--primary" style="width:100%; padding: 12px;" onclick="switchLoginView('login')">Reset Password</button>

        <div class="login-footer">
          <a onclick="switchLoginView('login')">Back to Sign In</a>
        </div>
      </div>
    </div>
  `;
}

window.switchLoginView = function(view) {
  loginView = view;
  const container = document.getElementById('loginContainer');
  if (container) container.innerHTML = renderLoginScreen();
};

window.doLogin = function() {
  const container = document.getElementById('loginContainer');
  if (container) {
    container.style.transition = 'opacity 0.3s ease';
    container.style.opacity = '0';
    setTimeout(() => { container.remove(); }, 300);
  }
};

window.showLoginScreen = function() {
  loginView = 'login';
  const existing = document.getElementById('loginContainer');
  if (existing) existing.remove();
  const div = document.createElement('div');
  div.id = 'loginContainer';
  div.innerHTML = renderLoginScreen();
  document.body.appendChild(div);
};

// ── Onboarding ───────────────────────────────────────────────
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
  return `<div class="ob-progress">
    ${OB_STEPS.map((s, i) => {
      const isDone = obStep > s.num;
      const isActive = obStep === s.num;
      const circleClass = isDone ? 'done' : isActive ? 'active' : '';
      const lineClass = isDone ? 'done' : '';
      const check = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" width="16" height="16"><path d="M20 6L9 17l-5-5"/></svg>';
      return `<div class="ob-step">
        <div class="ob-step__circle ${circleClass}">
          ${isDone ? check : s.num}
          <span class="ob-step__label">${s.label}</span>
        </div>
        ${i < OB_STEPS.length - 1 ? `<div class="ob-step__line ${lineClass}"></div>` : ''}
      </div>`;
    }).join('')}
  </div>`;
}

function renderUploadArea(label, hint) {
  return `
    <div class="upload-area">
      <div class="upload-area__icon">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" width="24" height="24"><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg>
      </div>
      <div class="upload-area__text">${label}</div>
      <div class="upload-area__hint">${hint}</div>
    </div>
  `;
}

function renderObStepContent() {
  if (obStep > OB_TOTAL) {
    return `
      <div class="ob-card">
        <div class="ob-end">
          <div class="ob-end__icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="40" height="40"><path d="M20 6L9 17l-5-5"/></svg>
          </div>
          <div class="ob-end__title">Onboarding Complete!</div>
          <div class="ob-end__desc">
            Thank you for completing your onboarding. Your information has been submitted for review.
            You will receive a confirmation email once your account is fully activated.
          </div>
          <button class="btn btn--primary" onclick="closeOnboarding()">Go to Portal</button>
        </div>
      </div>
    `;
  }

  const step = OB_STEPS[obStep - 1];
  let fields = '';

  switch(obStep) {
    case 1:
      fields = `
        <div class="grid-2 mb-4">
          <div>${renderUploadArea('Upload ID Card (Front)', 'JPG, PNG — max 5MB')}</div>
          <div>${renderUploadArea('Upload ID Card (Back)', 'JPG, PNG — max 5MB')}</div>
        </div>
        <div class="detail-grid">
          <div class="form-group"><label class="form-label">Full Name *</label><input class="form-input" value="${EMPLOYEE.name}"></div>
          <div class="form-group"><label class="form-label">Gender *</label>
            <select class="form-select"><option>Male</option><option>Female</option></select></div>
          <div class="form-group"><label class="form-label">Date of Birth *</label><input class="form-input" type="date" value="1995-06-20"></div>
          <div class="form-group"><label class="form-label">Ethnicity</label>
            <select class="form-select"><option>Han</option><option>Other</option></select></div>
          <div class="form-group"><label class="form-label">ID Number *</label><input class="form-input" placeholder="Identification number"></div>
          <div class="form-group"><label class="form-label">Phone *</label><input class="form-input" value="${EMPLOYEE.phone}"></div>
          <div class="form-group"><label class="form-label">Email *</label><input class="form-input" value="${EMPLOYEE.email}"></div>
          <div class="form-group"><label class="form-label">Address</label><input class="form-input" placeholder="Current residential address"></div>
        </div>
      `;
      break;
    case 2:
      fields = `
        <div class="grid-2 mb-4">
          <div>${renderUploadArea('Upload Graduation Certificate', 'JPG, PNG, PDF — max 10MB')}</div>
          <div>${renderUploadArea('Upload Degree Certificate', 'JPG, PNG, PDF — max 10MB')}</div>
        </div>
        <div class="detail-grid">
          <div class="form-group"><label class="form-label">Highest Education *</label>
            <select class="form-select"><option>Bachelor</option><option>Master</option><option>PhD</option><option>Associate</option></select></div>
          <div class="form-group"><label class="form-label">Institution *</label><input class="form-input" placeholder="University / College name"></div>
          <div class="form-group"><label class="form-label">Major *</label><input class="form-input" placeholder="Field of study"></div>
          <div class="form-group"><label class="form-label">Graduation Date *</label><input class="form-input" type="date"></div>
        </div>
      `;
      break;
    case 3:
      fields = `
        <div class="mb-4">${renderUploadArea('Upload Resignation Letter (if applicable)', 'JPG, PNG, PDF — max 10MB')}</div>
        <div class="section-title" style="margin-top:16px;">Current / Most Recent Employment</div>
        <div class="detail-grid">
          <div class="form-group"><label class="form-label">Company Name</label><input class="form-input" placeholder="Previous employer"></div>
          <div class="form-group"><label class="form-label">Job Title</label><input class="form-input" placeholder="Position held"></div>
          <div class="form-group"><label class="form-label">Start Date</label><input class="form-input" type="date"></div>
          <div class="form-group"><label class="form-label">End Date</label><input class="form-input" type="date"></div>
          <div class="form-group"><label class="form-label">Work Location</label><input class="form-input" placeholder="City"></div>
          <div class="form-group"><label class="form-label">Reason for Leaving</label><input class="form-input" placeholder="Optional"></div>
        </div>
      `;
      break;
    case 4:
      fields = `
        <div class="detail-grid">
          <div class="form-group"><label class="form-label">Bank Name *</label>
            <select class="form-select"><option>China Merchants Bank</option><option>ICBC</option><option>Bank of China</option><option>CCB</option><option>ABC</option><option>Other</option></select></div>
          <div class="form-group"><label class="form-label">Account Number *</label><input class="form-input" placeholder="Bank account number"></div>
          <div class="form-group"><label class="form-label">Branch Name</label><input class="form-input" placeholder="Bank branch"></div>
          <div class="form-group"><label class="form-label">Account Holder *</label><input class="form-input" value="${EMPLOYEE.name}"></div>
        </div>
        <div class="section-title" style="margin-top:20px;">Device Requirements</div>
        <div class="detail-grid">
          <div class="form-group"><label class="form-label">Laptop Requirement</label>
            <select class="form-select"><option>Company Provided</option><option>Own Device</option></select></div>
          <div class="form-group"><label class="form-label">Preferred OS</label>
            <select class="form-select"><option>macOS</option><option>Windows</option><option>Linux</option></select></div>
        </div>
      `;
      break;
    case 5:
      fields = `
        <div class="detail-grid">
          <div class="form-group"><label class="form-label">Household Registration Type *</label>
            <select class="form-select"><option>Urban</option><option>Rural</option></select></div>
          <div class="form-group"><label class="form-label">Household Location *</label><input class="form-input" placeholder="Province / City"></div>
          <div class="form-group"><label class="form-label">Social Insurance Base</label><input class="form-input" placeholder="Monthly base amount (¥)"></div>
          <div class="form-group"><label class="form-label">Housing Fund Base</label><input class="form-input" placeholder="Monthly base amount (¥)"></div>
        </div>
        <div class="section-title" style="margin-top:20px;">Emergency Contact</div>
        <div class="detail-grid">
          <div class="form-group"><label class="form-label">Contact Name *</label><input class="form-input" placeholder="Full name"></div>
          <div class="form-group"><label class="form-label">Relationship *</label>
            <select class="form-select"><option>Spouse</option><option>Parent</option><option>Sibling</option><option>Friend</option><option>Other</option></select></div>
          <div class="form-group"><label class="form-label">Phone *</label><input class="form-input" placeholder="Contact phone"></div>
          <div class="form-group"><label class="form-label">Address</label><input class="form-input" placeholder="Contact address"></div>
        </div>
      `;
      break;
    case 6:
      fields = `
        <div style="padding: 8px 0;">
          <div class="section-title">Personal Information</div>
          <div class="detail-grid mb-4">
            <div class="detail-item"><div class="detail-item__label">Name</div><div class="detail-item__value">${EMPLOYEE.name}</div></div>
            <div class="detail-item"><div class="detail-item__label">Gender</div><div class="detail-item__value">${EMPLOYEE.gender}</div></div>
            <div class="detail-item"><div class="detail-item__label">DOB</div><div class="detail-item__value">${EMPLOYEE.dob}</div></div>
            <div class="detail-item"><div class="detail-item__label">Email</div><div class="detail-item__value detail-item__value--accent">${EMPLOYEE.email}</div></div>
          </div>
          <div class="section-title">Education</div>
          <div class="detail-grid mb-4">
            <div class="detail-item"><div class="detail-item__label">Degree</div><div class="detail-item__value">Bachelor</div></div>
            <div class="detail-item"><div class="detail-item__label">Institution</div><div class="detail-item__value">Shanghai University</div></div>
          </div>
          <div class="section-title">Bank Info</div>
          <div class="detail-grid mb-4">
            <div class="detail-item"><div class="detail-item__label">Bank</div><div class="detail-item__value">${EMPLOYEE.bankName}</div></div>
            <div class="detail-item"><div class="detail-item__label">Account</div><div class="detail-item__value detail-item__value--accent">${EMPLOYEE.bankAccount}</div></div>
          </div>
          <label class="form-check"><input type="checkbox"> I confirm all information above is accurate and complete.</label>
        </div>
      `;
      break;
  }

  return `
    <div class="ob-card" style="animation: fadeInUp 0.4s var(--ease);">
      <div class="ob-card__title">${step.title}</div>
      ${fields}
    </div>
    <div class="ob-nav">
      <div class="ob-nav__step">Step ${obStep} of ${OB_TOTAL}</div>
      <div style="display:flex; gap:10px;">
        ${obStep > 1 ? '<button class="btn btn--ghost" onclick="obPrev()">Previous</button>' : ''}
        <button class="btn btn--primary" onclick="obNext()">
          ${obStep === OB_TOTAL ? 'Submit' : 'Next'}
        </button>
      </div>
    </div>
  `;
}

function renderOnboardingScreen() {
  return `
    <div class="onboarding-screen" id="onboardingScreen">
      <div class="bg-mesh">
        <div class="bg-orb bg-orb--1"></div>
        <div class="bg-orb bg-orb--2"></div>
        <div class="bg-orb bg-orb--3"></div>
        <div class="bg-grid"></div>
      </div>
      <div class="onboarding-container">
        <div class="onboarding-header">
          <div class="onboarding-header__logo">
            <svg width="36" height="36" viewBox="0 0 32 32" fill="none">
              <rect width="32" height="32" rx="8" fill="url(#lg5)"/>
              <path d="M8 22L16 10L24 22H8Z" fill="white" fill-opacity="0.9"/>
              <defs><linearGradient id="lg5" x1="0" y1="0" x2="32" y2="32"><stop stop-color="#3b82f6"/><stop offset="1" stop-color="#06b6d4"/></linearGradient></defs>
            </svg>
            <span class="login-logo__text">RampingUp</span>
          </div>
          <div class="onboarding-header__title">Employee Onboarding</div>
          <div class="onboarding-header__sub">Complete the following steps to set up your account</div>
        </div>
        ${obStep <= OB_TOTAL ? renderObProgress() : ''}
        <div id="obContent">${renderObStepContent()}</div>
      </div>
    </div>
  `;
}

window.obNext = function() {
  obStep++;
  document.getElementById('obContent').innerHTML = renderObStepContent();
  // Update progress
  const progress = document.querySelector('.ob-progress');
  if (progress && obStep <= OB_TOTAL) {
    progress.outerHTML = renderObProgress();
  } else if (progress && obStep > OB_TOTAL) {
    progress.remove();
  }
};

window.obPrev = function() {
  if (obStep > 1) {
    obStep--;
    document.getElementById('obContent').innerHTML = renderObStepContent();
    const progress = document.querySelector('.ob-progress');
    if (progress) progress.outerHTML = renderObProgress();
  }
};

window.showOnboarding = function() {
  obStep = 1;
  // Remove login if present
  const login = document.getElementById('loginContainer');
  if (login) login.remove();
  // Create onboarding overlay
  const div = document.createElement('div');
  div.id = 'onboardingContainer';
  div.style.cssText = 'position:fixed;inset:0;z-index:200;overflow-y:auto;';
  div.innerHTML = renderOnboardingScreen();
  document.body.appendChild(div);
};

window.closeOnboarding = function() {
  const c = document.getElementById('onboardingContainer');
  if (c) { c.style.transition = 'opacity 0.3s ease'; c.style.opacity = '0'; setTimeout(() => c.remove(), 300); }
};

// ── Modal System ─────────────────────────────────────────────
function openModal(html) {
  closeModal();
  const overlay = document.createElement('div');
  overlay.className = 'modal-overlay';
  overlay.id = 'modalOverlay';
  overlay.innerHTML = html;
  overlay.addEventListener('click', (e) => { if (e.target === overlay) closeModal(); });
  document.body.appendChild(overlay);
}

function closeModal() {
  const m = document.getElementById('modalOverlay');
  if (m) m.remove();
}

window.closeModal = closeModal;

// ── Leave Apply Form ─────────────────────────────────────────
window.openLeaveForm = function() {
  openModal(`
    <div class="modal">
      <div class="modal__header">
        <div class="modal__title">New Leave Request</div>
        <button class="modal__close" onclick="closeModal()">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="18" height="18"><path d="M18 6L6 18M6 6l12 12"/></svg>
        </button>
      </div>
      <div class="modal__body">
        <div class="detail-grid">
          <div class="form-group">
            <label class="form-label">Leave Type *</label>
            <select class="form-select">
              <option>Annual Leave</option>
              <option>Sick Leave</option>
              <option>Personal Leave</option>
              <option>Compensatory Leave</option>
            </select>
          </div>
          <div class="form-group">
            <label class="form-label">Half Day</label>
            <select class="form-select">
              <option>No</option>
              <option>Forenoon</option>
              <option>Afternoon</option>
            </select>
          </div>
          <div class="form-group">
            <label class="form-label">From Date *</label>
            <input class="form-input" type="date">
          </div>
          <div class="form-group">
            <label class="form-label">To Date *</label>
            <input class="form-input" type="date">
          </div>
        </div>
        <div class="form-group">
          <label class="form-label">Reason *</label>
          <textarea class="form-textarea" placeholder="Please describe the reason for your leave..."></textarea>
        </div>
        <div class="form-group">
          <label class="form-label">Attachment</label>
          <div class="upload-area" style="padding:18px;">
            <div class="upload-area__text">Click or drag to upload</div>
            <div class="upload-area__hint">JPG, PNG, PDF — max 10MB</div>
          </div>
        </div>
      </div>
      <div class="modal__footer">
        <button class="btn btn--ghost" onclick="closeModal()">Cancel</button>
        <button class="btn btn--ghost" onclick="closeModal()">Save Draft</button>
        <button class="btn btn--primary" onclick="closeModal()">Submit</button>
      </div>
    </div>
  `);
};

// ── Expense Apply Form ───────────────────────────────────────
let expenseItemCount = 1;

function renderExpenseItems(count) {
  let items = '';
  for (let i = 1; i <= count; i++) {
    items += `
      <div class="expense-item">
        <div class="expense-item__header">
          <span class="expense-item__num">Item #${i}</span>
          ${i > 1 ? `<button class="expense-item__remove" onclick="removeExpenseItem(this)">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="14" height="14"><path d="M18 6L6 18M6 6l12 12"/></svg>
          </button>` : ''}
        </div>
        <div class="expense-item__fields">
          <div class="form-group" style="margin:0"><label class="form-label">Date *</label><input class="form-input" type="date"></div>
          <div class="form-group" style="margin:0"><label class="form-label">Amount *</label><input class="form-input" type="number" placeholder="0.00"></div>
          <div class="form-group" style="margin:0"><label class="form-label">Currency</label>
            <select class="form-select"><option>CNY</option><option>USD</option><option>EUR</option></select></div>
          <div class="form-group" style="margin:0"><label class="form-label">Category *</label>
            <select class="form-select"><option>Travel</option><option>Meals</option><option>Equipment</option><option>Communication</option><option>Transportation</option><option>Other</option></select></div>
        </div>
        <div class="form-group" style="margin-top:12px; margin-bottom:0">
          <label class="form-label">Description</label>
          <input class="form-input" placeholder="Brief description of expense">
        </div>
      </div>
    `;
  }
  return items;
}

window.openExpenseForm = function() {
  expenseItemCount = 1;
  openModal(`
    <div class="modal modal--lg">
      <div class="modal__header">
        <div class="modal__title">New Expense Claim</div>
        <button class="modal__close" onclick="closeModal()">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="18" height="18"><path d="M18 6L6 18M6 6l12 12"/></svg>
        </button>
      </div>
      <div class="modal__body">
        <div id="expenseItemsContainer">${renderExpenseItems(1)}</div>
        <button class="add-item-btn" onclick="addExpenseItem()">
          ${svgIcon('plus')} Add Another Item
        </button>
        <div class="form-group" style="margin-top:16px;">
          <label class="form-label">Receipts / Invoices</label>
          <div class="upload-area" style="padding:18px;">
            <div class="upload-area__text">Click or drag to upload receipts</div>
            <div class="upload-area__hint">Multiple files supported — JPG, PNG, PDF — max 10MB each</div>
          </div>
        </div>
      </div>
      <div class="modal__footer">
        <button class="btn btn--ghost" onclick="closeModal()">Cancel</button>
        <button class="btn btn--ghost" onclick="closeModal()">Save Draft</button>
        <button class="btn btn--primary" onclick="closeModal()">Submit</button>
      </div>
    </div>
  `);
};

window.addExpenseItem = function() {
  expenseItemCount++;
  document.getElementById('expenseItemsContainer').innerHTML = renderExpenseItems(expenseItemCount);
};

window.removeExpenseItem = function(btn) {
  const item = btn.closest('.expense-item');
  if (item) { item.remove(); expenseItemCount--; }
  // Re-number remaining items
  document.querySelectorAll('.expense-item__num').forEach((el, i) => el.textContent = `Item #${i + 1}`);
};

// ── Ticket Create Form ───────────────────────────────────────
window.openTicketForm = function() {
  openModal(`
    <div class="modal modal--lg">
      <div class="modal__header">
        <div class="modal__title">New Support Ticket</div>
        <button class="modal__close" onclick="closeModal()">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="18" height="18"><path d="M18 6L6 18M6 6l12 12"/></svg>
        </button>
      </div>
      <div class="modal__body">
        <div class="detail-grid">
          <div class="form-group">
            <label class="form-label">Category *</label>
            <select class="form-select">
              <option>IT Support</option>
              <option>HR</option>
              <option>Facilities</option>
              <option>Finance</option>
              <option>Other</option>
            </select>
          </div>
          <div class="form-group">
            <label class="form-label">Priority *</label>
            <select class="form-select">
              <option>Low</option>
              <option>Medium</option>
              <option>High</option>
            </select>
          </div>
        </div>
        <div class="form-group">
          <label class="form-label">Subject *</label>
          <input class="form-input" placeholder="Brief summary of the issue">
        </div>
        <div class="form-group">
          <label class="form-label">Description *</label>
          <div class="md-editor">
            <div class="md-editor__toolbar">
              <button title="Bold"><b>B</b></button>
              <button title="Italic"><i>I</i></button>
              <button title="Code" style="font-family:'JetBrains Mono',monospace;font-size:0.75rem;">&lt;/&gt;</button>
              <button title="Link">🔗</button>
              <button title="List">☰</button>
            </div>
            <textarea placeholder="Describe the issue in detail. Markdown is supported..."></textarea>
          </div>
        </div>
        <div class="form-group">
          <label class="form-label">Attachments</label>
          <div class="upload-area" style="padding:18px;">
            <div class="upload-area__text">Click or drag to upload</div>
            <div class="upload-area__hint">Screenshots, logs, etc. — max 10MB each</div>
          </div>
        </div>
      </div>
      <div class="modal__footer">
        <button class="btn btn--ghost" onclick="closeModal()">Cancel</button>
        <button class="btn btn--primary" onclick="closeModal()">Create Ticket</button>
      </div>
    </div>
  `);
};

// ── Approval Flow Detail Modals ──────────────────────────────
function getApprovalSteps(status, approver, submitDate) {
  const steps = [];
  if (status === 'Draft') {
    steps.push({ label: 'Draft Created', meta: submitDate || '', state: 'done', icon: '✎' });
    steps.push({ label: 'Submit for Review', meta: 'Not yet submitted', state: 'waiting', icon: '→' });
    steps.push({ label: 'Manager Review', person: approver !== '-' ? approver : '', meta: '', state: 'waiting', icon: '○' });
    steps.push({ label: 'Completed', meta: '', state: 'waiting', icon: '✓' });
  } else if (status === 'Pending') {
    steps.push({ label: 'Submitted', meta: submitDate || '', state: 'done', icon: '✓' });
    steps.push({ label: 'Manager Review', person: approver, meta: 'Awaiting approval', state: 'current', icon: '◷' });
    steps.push({ label: 'HR Confirmation', meta: '', state: 'waiting', icon: '○' });
    steps.push({ label: 'Completed', meta: '', state: 'waiting', icon: '✓' });
  } else if (status === 'Approved') {
    steps.push({ label: 'Submitted', meta: submitDate || '', state: 'done', icon: '✓' });
    steps.push({ label: 'Manager Approved', person: approver, meta: 'Approved', state: 'done', icon: '✓' });
    steps.push({ label: 'HR Confirmed', meta: 'Confirmed', state: 'done', icon: '✓' });
    steps.push({ label: 'Completed', meta: 'All approvals received', state: 'done', icon: '✓' });
  } else if (status === 'Rejected') {
    steps.push({ label: 'Submitted', meta: submitDate || '', state: 'done', icon: '✓' });
    steps.push({ label: 'Manager Rejected', person: approver, meta: 'Request rejected', state: 'rejected', icon: '✕' });
    steps.push({ label: 'HR Confirmation', meta: 'Skipped', state: 'waiting', icon: '○' });
    steps.push({ label: 'Completed', meta: '', state: 'waiting', icon: '✓' });
  } else {
    steps.push({ label: status, meta: '', state: 'done', icon: '✓' });
  }
  return steps;
}

function renderApprovalTimeline(status, approver, submitDate) {
  const steps = getApprovalSteps(status, approver, submitDate);
  return `
    <div class="approval-flow">
      <div class="approval-flow__title">Approval Progress</div>
      <div class="approval-flow__steps">
        ${steps.map(s => `
          <div class="approval-step ${s.state}">
            <div class="approval-step__dot">${s.icon}</div>
            <div class="approval-step__content">
              <div class="approval-step__label">${s.label}</div>
              ${s.person ? `<div class="approval-step__person">${s.person}</div>` : ''}
              ${s.meta ? `<div class="approval-step__meta">${s.meta}</div>` : ''}
            </div>
          </div>
        `).join('')}
      </div>
    </div>
  `;
}

window.viewLeaveDetail = function(id) {
  const lr = LEAVE_REQUESTS.find(l => l.id === id);
  if (!lr) return;
  openModal(`
    <div class="modal">
      <div class="modal__header">
        <div class="modal__title">Leave Request — ${lr.id}</div>
        <button class="modal__close" onclick="closeModal()">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="18" height="18"><path d="M18 6L6 18M6 6l12 12"/></svg>
        </button>
      </div>
      <div class="modal__body">
        <div class="detail-modal__section">
          <div class="detail-modal__row">
            <span class="detail-modal__row-label">Type</span>
            <span class="detail-modal__row-value">${lr.type}</span>
          </div>
          <div class="detail-modal__row">
            <span class="detail-modal__row-label">Period</span>
            <span class="detail-modal__row-value">${lr.from} to ${lr.to}</span>
          </div>
          <div class="detail-modal__row">
            <span class="detail-modal__row-label">Days</span>
            <span class="detail-modal__row-value">${lr.days}</span>
          </div>
          <div class="detail-modal__row">
            <span class="detail-modal__row-label">Status</span>
            <span class="detail-modal__row-value"><span class="badge badge--${statusClass(lr.status)}">${lr.status}</span></span>
          </div>
          <div class="detail-modal__row">
            <span class="detail-modal__row-label">Approver</span>
            <span class="detail-modal__row-value">${lr.approver}</span>
          </div>
        </div>
        ${renderApprovalTimeline(lr.status, lr.approver, lr.from)}
      </div>
      <div class="modal__footer">
        <button class="btn btn--ghost" onclick="closeModal()">Close</button>
      </div>
    </div>
  `);
};

window.viewExpenseDetail = function(id) {
  const ex = EXPENSES.find(e => e.id === id);
  if (!ex) return;
  openModal(`
    <div class="modal">
      <div class="modal__header">
        <div class="modal__title">Expense Claim — ${ex.id}</div>
        <button class="modal__close" onclick="closeModal()">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="18" height="18"><path d="M18 6L6 18M6 6l12 12"/></svg>
        </button>
      </div>
      <div class="modal__body">
        <div class="detail-modal__section">
          <div class="detail-modal__row">
            <span class="detail-modal__row-label">Description</span>
            <span class="detail-modal__row-value">${ex.description}</span>
          </div>
          <div class="detail-modal__row">
            <span class="detail-modal__row-label">Category</span>
            <span class="detail-modal__row-value">${ex.category}</span>
          </div>
          <div class="detail-modal__row">
            <span class="detail-modal__row-label">Amount</span>
            <span class="detail-modal__row-value">${formatCurrency(ex.amount)}</span>
          </div>
          <div class="detail-modal__row">
            <span class="detail-modal__row-label">Date</span>
            <span class="detail-modal__row-value">${ex.date}</span>
          </div>
          <div class="detail-modal__row">
            <span class="detail-modal__row-label">Items</span>
            <span class="detail-modal__row-value">${ex.items} item${ex.items > 1 ? 's' : ''}</span>
          </div>
          <div class="detail-modal__row">
            <span class="detail-modal__row-label">Status</span>
            <span class="detail-modal__row-value"><span class="badge badge--${statusClass(ex.status)}">${ex.status}</span></span>
          </div>
        </div>
        ${renderApprovalTimeline(ex.status, 'Li Wei', ex.date)}
      </div>
      <div class="modal__footer">
        <button class="btn btn--ghost" onclick="closeModal()">Close</button>
      </div>
    </div>
  `);
};

// ── Router ───────────────────────────────────────────────────
const PAGES = {
  dashboard: { title: 'Dashboard', render: renderDashboard },
  leave: { title: 'Leave Management', render: renderLeave },
  salary: { title: 'Salary Slips', render: renderSalary },
  expenses: { title: 'Expenses', render: renderExpenses },
  tickets: { title: 'Support Tickets', render: renderTickets },
  contract: { title: 'Contract', render: renderContract },
  wallet: { title: 'Wallet', render: renderWallet },
  profile: { title: 'My Profile', render: renderProfile },
  login: { title: 'Login', render: () => { showLoginScreen(); return ''; } },
  onboarding: { title: 'Onboarding', render: () => { showOnboarding(); return ''; } },
};

function navigate(page) {
  // Special full-screen pages
  if (page === 'login') { showLoginScreen(); return; }
  if (page === 'onboarding') { showOnboarding(); return; }

  const config = PAGES[page] || PAGES.dashboard;
  const content = document.getElementById('content');
  const breadcrumb = document.getElementById('breadcrumb');

  // Update active nav
  document.querySelectorAll('.nav-item').forEach(item => {
    item.classList.toggle('active', item.dataset.page === page);
  });

  // Update breadcrumb
  breadcrumb.textContent = config.title;

  // Render page with transition
  content.style.opacity = '0';
  content.style.transform = 'translateY(8px)';
  setTimeout(() => {
    content.innerHTML = config.render();
    content.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
    content.style.opacity = '1';
    content.style.transform = 'translateY(0)';
    content.scrollTop = 0;
  }, 150);

  // Close mobile sidebar
  document.getElementById('sidebar').classList.remove('open');
}

function handleRoute() {
  const hash = window.location.hash.replace('#/', '') || 'dashboard';
  const page = hash.split('/')[0] || 'dashboard';
  navigate(page);
}

// ── Init ─────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  // Route handling
  window.addEventListener('hashchange', handleRoute);
  handleRoute();

  // Sidebar toggle for mobile
  document.getElementById('sidebarToggle').addEventListener('click', () => {
    document.getElementById('sidebar').classList.toggle('open');
  });

  // Close sidebar on overlay click (mobile)
  document.addEventListener('click', (e) => {
    const sidebar = document.getElementById('sidebar');
    const toggle = document.getElementById('sidebarToggle');
    if (sidebar.classList.contains('open') && !sidebar.contains(e.target) && !toggle.contains(e.target)) {
      sidebar.classList.remove('open');
    }
  });
});
