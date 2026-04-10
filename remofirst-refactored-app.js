/* ═══════════════════════════════════════════════════════════════
   RampingUp Employee Portal — Remofirst Edition (Refactored)
   Complete application logic adapted from Customer site with
   remofirst CSS conventions (DM Sans, white sidebar, green brand)
   ═══════════════════════════════════════════════════════════════ */

// ── SVG Icons (Lucide-style) ────────────────────────────────
const ICONS = {
  home: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>',
  calendar: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/></svg>',
  dollar: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6"/></svg>',
  receipt: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M4 2v20l2-1 2 1 2-1 2 1 2-1 2 1 2-1 2 1V2l-2 1-2-1-2 1-2-1-2 1-2-1-2 1z"/><path d="M8 10h8M8 14h4"/></svg>',
  ticket: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M2 9a3 3 0 013-3h14a3 3 0 013 3v0a3 3 0 00-3 3v0a3 3 0 003 3v0a3 3 0 01-3 3H5a3 3 0 01-3-3v0a3 3 0 003-3v0a3 3 0 00-3-3z"/></svg>',
  user: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>',
  users: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="9" cy="7" r="3"/><path d="M13 21v-2a4 4 0 00-8 0v2"/><circle cx="17" cy="10" r="2"/><path d="M21 21v-1.5a3 3 0 00-4-2.8"/></svg>',
  fileText: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>',
  bell: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 01-3.46 0"/></svg>',
  search: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/></svg>',
  settings: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-2 2 2 2 0 01-2-2v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83 0 2 2 0 010-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 01-2-2 2 2 0 012-2h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 010-2.83 2 2 0 012.83 0l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 012-2 2 2 0 012 2v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 0 2 2 0 010 2.83l-.06.06a1.65 1.65 0 00-.33 1.82V9a1.65 1.65 0 001.51 1H21a2 2 0 012 2 2 2 0 01-2 2h-.09a1.65 1.65 0 00-1.51 1z"/></svg>',
  plus: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>',
  eye: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>',
  download: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>',
  upload: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg>',
  arrowUp: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="19" x2="12" y2="5"/><polyline points="5 12 12 5 19 12"/></svg>',
  arrowDown: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="5" x2="12" y2="19"/><polyline points="5 12 12 19 19 12"/></svg>',
  clock: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>',
  tag: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M20.59 13.41l-7.17 7.17a2 2 0 01-2.83 0L2 12V2h10l8.59 8.59a2 2 0 010 2.82z"/><line x1="7" y1="7" x2="7.01" y2="7"/></svg>',
  menu: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="18" x2="21" y2="18"/></svg>',
  x: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>',
  check: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>',
  chevronRight: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"/></svg>',
  wallet: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12V7H5a2 2 0 010-4h14v4"/><path d="M3 5v14a2 2 0 002 2h16v-5"/><path d="M18 12a2 2 0 100 4h4v-4z"/></svg>',
  layers: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 17 12 22 22 17"/><polyline points="2 12 12 17 22 12"/></svg>',
  edit: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M17 3a2.83 2.83 0 114 4L7.5 20.5 2 22l1.5-5.5z"/></svg>',
  messageSquare: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/></svg>',
  building: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="4" y="2" width="16" height="20" rx="2"/><path d="M9 22v-4h6v4"/><path d="M8 6h.01M16 6h.01M12 6h.01M8 10h.01M16 10h.01M12 10h.01M8 14h.01M16 14h.01M12 14h.01"/></svg>',
  gitBranch: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><line x1="6" y1="3" x2="6" y2="15"/><circle cx="18" cy="6" r="3"/><circle cx="6" cy="18" r="3"/><path d="M18 9a9 9 0 01-9 9"/></svg>',
  userPlus: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M16 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="8.5" cy="7" r="4"/><line x1="20" y1="8" x2="20" y2="14"/><line x1="23" y1="11" x2="17" y2="11"/></svg>',
  clipboard: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M16 4h2a2 2 0 012 2v14a2 2 0 01-2 2H6a2 2 0 01-2-2V6a2 2 0 012-2h2"/><rect x="8" y="2" width="8" height="4" rx="1"/></svg>',
  checkSquare: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 11 12 14 22 4"/><path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11"/></svg>',
  mail: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22 6 12 13 2 6"/></svg>',
  logout: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>',
  copy: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1"/></svg>',
};

function icon(name, size) {
  const s = size || 20;
  return `<span style="display:inline-flex;width:${s}px;height:${s}px;">${ICONS[name] || ''}</span>`;
}

// ── Mock Data (matching Customer API models) ────────────────
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
  status: 'Active',
  country: 'China',
  nationality: 'Chinese',
  idType: 'ID Card',
  idNumber: '310***********1234',
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
  { type: 'Annual Leave', total: 15, used: 7, color: '#2e90fa' },
  { type: 'Sick Leave', total: 10, used: 2, color: '#7a5af8' },
  { type: 'Personal Leave', total: 5, used: 1, color: '#f79009' },
  { type: 'Compensatory', total: 3, used: 0, color: '#04C53A' },
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

// Tickets (matching /api/hrms/emr/tickets — Customer categories + P0-P3)
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

// ── Mock Data: Leave Config, Org, Messages ─────────────────

const LEAVE_TYPE_LIST = [
  { id: 'LT-001', name: 'Annual Leave', maxDays: 15, isCarryForward: true, maxCarryForward: 5, isWithoutPay: false, allowNegative: false, includeHolidays: false, isCompensatory: false },
  { id: 'LT-002', name: 'Sick Leave', maxDays: 10, isCarryForward: false, maxCarryForward: 0, isWithoutPay: false, allowNegative: false, includeHolidays: false, isCompensatory: false },
  { id: 'LT-003', name: 'Personal Leave', maxDays: 5, isCarryForward: false, maxCarryForward: 0, isWithoutPay: false, allowNegative: false, includeHolidays: false, isCompensatory: false },
  { id: 'LT-004', name: 'Compensatory Leave', maxDays: 3, isCarryForward: false, maxCarryForward: 0, isWithoutPay: false, allowNegative: false, includeHolidays: false, isCompensatory: true },
  { id: 'LT-005', name: 'Maternity Leave', maxDays: 98, isCarryForward: false, maxCarryForward: 0, isWithoutPay: false, allowNegative: false, includeHolidays: true, isCompensatory: false },
  { id: 'LT-006', name: 'Unpaid Leave', maxDays: 30, isCarryForward: false, maxCarryForward: 0, isWithoutPay: true, allowNegative: true, includeHolidays: false, isCompensatory: false },
];

const LEAVE_POLICIES = [
  { id: 'LP-001', name: 'Standard Employee Policy', description: 'Default policy for full-time employees', leaveTypes: [{type:'Annual Leave',days:15},{type:'Sick Leave',days:10},{type:'Personal Leave',days:5}], status: 'Active' },
  { id: 'LP-002', name: 'Contractor Policy', description: 'Limited leave for contractors', leaveTypes: [{type:'Annual Leave',days:10},{type:'Sick Leave',days:5}], status: 'Active' },
  { id: 'LP-003', name: 'Senior Employee Policy', description: 'Enhanced leave for senior staff', leaveTypes: [{type:'Annual Leave',days:20},{type:'Sick Leave',days:15},{type:'Personal Leave',days:7}], status: 'Active' },
];

const LEAVE_PERIODS = [
  { id: 'PD-001', name: '2025 Leave Year', from: '2025-01-01', to: '2025-12-31', isActive: true, company: 'RampingUp Technology Ltd.' },
  { id: 'PD-002', name: '2024 Leave Year', from: '2024-01-01', to: '2024-12-31', isActive: false, company: 'RampingUp Technology Ltd.' },
];

const LEAVE_ALLOCATIONS = [
  { id: 'LA-001', employee: 'Zhang Rui', leaveType: 'Annual Leave', period: '2025', totalDays: 15, usedDays: 7, newAllocation: 15, carryForward: 0, status: 'Active' },
  { id: 'LA-002', employee: 'Zhang Rui', leaveType: 'Sick Leave', period: '2025', totalDays: 10, usedDays: 2, newAllocation: 10, carryForward: 0, status: 'Active' },
  { id: 'LA-003', employee: 'Li Wei', leaveType: 'Annual Leave', period: '2025', totalDays: 20, usedDays: 3, newAllocation: 20, carryForward: 0, status: 'Active' },
  { id: 'LA-004', employee: 'Wang Chen', leaveType: 'Annual Leave', period: '2025', totalDays: 15, usedDays: 5, newAllocation: 12, carryForward: 3, status: 'Active' },
  { id: 'LA-005', employee: 'Sarah Johnson', leaveType: 'Annual Leave', period: '2025', totalDays: 15, usedDays: 0, newAllocation: 15, carryForward: 0, status: 'Active' },
];

const LEAVE_POLICY_ASSIGNMENTS = [
  { id: 'PA-001', employee: 'Zhang Rui', policy: 'Standard Employee Policy', period: '2025 Leave Year', assignedDate: '2025-01-01', status: 'Active' },
  { id: 'PA-002', employee: 'Li Wei', policy: 'Senior Employee Policy', period: '2025 Leave Year', assignedDate: '2025-01-01', status: 'Active' },
  { id: 'PA-003', employee: 'Wang Chen', policy: 'Standard Employee Policy', period: '2025 Leave Year', assignedDate: '2025-01-01', status: 'Active' },
  { id: 'PA-004', employee: 'Sarah Johnson', policy: 'Standard Employee Policy', period: '2025 Leave Year', assignedDate: '2025-01-01', status: 'Active' },
  { id: 'PA-005', employee: 'Alex Kim', policy: 'Contractor Policy', period: '2025 Leave Year', assignedDate: '2025-01-01', status: 'Active' },
];

const LEAVE_APPROVAL_FLOW_CONFIGS = [
  { id: 'AF-001', name: 'Standard Leave Approval', leaveType: 'Annual Leave', steps: [{level:1,role:'Direct Manager',approver:'Li Wei'},{level:2,role:'HR Manager',approver:'HR Team'}], status: 'Active' },
  { id: 'AF-002', name: 'Sick Leave Approval', leaveType: 'Sick Leave', steps: [{level:1,role:'Direct Manager',approver:'Li Wei'}], status: 'Active' },
  { id: 'AF-003', name: 'Extended Leave Approval', leaveType: 'Annual Leave', steps: [{level:1,role:'Direct Manager',approver:'Li Wei'},{level:2,role:'Department Head',approver:'Wang Chen'},{level:3,role:'HR Director',approver:'HR Team'}], status: 'Active', condition: '> 5 days' },
];

const EXPENSE_FLOW_CONFIGS = [
  { id: 'EAF-001', name: 'Standard Expense Approval', condition: '< \u00a55,000', steps: [{level:1,role:'Direct Manager',approver:'Li Wei'}], status: 'Active' },
  { id: 'EAF-002', name: 'Large Expense Approval', condition: '\u2265 \u00a55,000', steps: [{level:1,role:'Direct Manager',approver:'Li Wei'},{level:2,role:'Finance Manager',approver:'Tanaka Yuki'},{level:3,role:'CFO',approver:'CFO Office'}], status: 'Active' },
];

const ORG_UNITS = [
  { id: 'OU-001', name: 'RampingUp Technology Ltd.', type: 'Company', head: 'CEO', members: 8, children: [
    { id: 'OU-002', name: 'Engineering', type: 'Department', head: 'Li Wei', members: 4 },
    { id: 'OU-003', name: 'Product', type: 'Department', head: 'Wang Chen', members: 1 },
    { id: 'OU-004', name: 'Design', type: 'Department', head: 'Sarah Johnson', members: 1 },
    { id: 'OU-005', name: 'Marketing', type: 'Department', head: 'Maria Santos', members: 1 },
    { id: 'OU-006', name: 'Finance', type: 'Department', head: 'Tanaka Yuki', members: 1 },
  ]},
];

const MESSAGES = [
  { id: 'MSG-001', subject: 'Leave Request LV-2403 Approved', from: 'System', date: '2025-03-21', read: false, type: 'notification', body: 'Your annual leave request from Apr 5 to Apr 6 has been approved by Li Wei.' },
  { id: 'MSG-002', subject: 'March Salary Slip Available', from: 'Payroll', date: '2025-03-25', read: false, type: 'notification', body: 'Your salary slip for March 2025 is now available. Net pay: \u00a525,180.' },
  { id: 'MSG-003', subject: 'Expense EC-2402 Reimbursed', from: 'Finance', date: '2025-03-10', read: true, type: 'notification', body: 'Your expense claim EC-2402 (\u00a52,899) has been reimbursed to your bank account.' },
  { id: 'MSG-004', subject: 'Welcome to RampingUp', from: 'HR', date: '2025-03-15', read: true, type: 'announcement', body: 'Welcome aboard! Please complete your onboarding checklist.' },
  { id: 'MSG-005', subject: 'Company Holiday Notice \u2014 Qingming', from: 'HR', date: '2025-03-28', read: false, type: 'announcement', body: 'Please note that April 4 (Qingming Festival) is a company holiday.' },
];

// ── Helpers ──────────────────────────────────────────────────

function formatCurrency(n) {
  return '\u00a5' + n.toLocaleString('zh-CN');
}

function statusClass(s) {
  const map = {
    Approved: 'approved', Pending: 'pending', Rejected: 'rejected', Draft: 'draft',
    Cancelled: 'cancelled', Submitted: 'submitted', Open: 'open', Closed: 'closed',
    Active: 'active', Inactive: 'draft', PendingDocuments: 'pending',
    ContractApproved: 'approved', OfferLetterApproved: 'approved',
    Completed: 'approved', Processing: 'processing',
  };
  return map[s] || 'draft';
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

function priorityBadgeClass(p) {
  return { P0: 'badge-plain--red', P1: 'badge-plain--red', P2: 'badge-plain--amber', P3: 'badge-plain--blue' }[p] || 'badge-plain--gray';
}

function categoryLabel(c) {
  return { CONSULTATION: 'Consultation', IT_SUPPORT: 'IT Support', COMPLAINT: 'Complaint',
    REPAIR: 'Repair', SUGGESTION: 'Suggestion' }[c] || c;
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

// ── Approval Flow Renderer ──────────────────────────────────

function renderApprovalFlow(steps) {
  if (!steps || !steps.length) {
    return `<div style="padding:12px 0;font-size:13px;color:var(--gray-400);">No approval flow available.</div>`;
  }
  const stepIcons = {
    done: '\u2713',
    current: '\u23f3',
    rejected: '\u2715',
    pending: '\u00b7',
  };
  return `
    <div class="approval-flow">
      ${steps.map(s => `
        <div class="approval-step step--${s.status}">
          <div class="approval-step__icon">${stepIcons[s.status] || '\u00b7'}</div>
          <div class="approval-step__content">
            <div class="approval-step__title">${s.step}</div>
            <div class="approval-step__meta">
              <span>${s.actor}</span>
              <span style="color:var(--gray-300)">\u00b7</span>
              <span>${s.role}</span>
              ${s.time ? `<span style="color:var(--gray-300)">\u00b7</span><span>${s.time}</span>` : ''}
              ${s.status === 'current' ? '<span class="badge--ghost badge--ghost-amber">Awaiting</span>' : ''}
              ${s.status === 'rejected' ? '<span class="badge--ghost badge--ghost-red">Rejected</span>' : ''}
              ${s.status === 'done' ? '<span class="badge--ghost badge--ghost-green">Approved</span>' : ''}
              ${s.status === 'pending' ? '<span class="badge--ghost badge--ghost-gray">Pending</span>' : ''}
            </div>
            ${s.comment ? `<div class="approval-step__comment">${s.comment}</div>` : ''}
          </div>
        </div>
      `).join('')}
    </div>
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
        <div class="welcome-card__meta">${EMPLOYEE.role} \u00b7 ${EMPLOYEE.department} \u00b7 ${EMPLOYEE.location}</div>
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

// ── Team / Employees ────────────────────────────────────────

function renderTeam() {
  const active = TEAM_MEMBERS.filter(m => m.status === 'Active').length;
  const countries = new Set(TEAM_MEMBERS.map(m => m.country)).size;

  return `
    <div class="page-header">
      <div>
        <div class="page-title">Employees</div>
        <div class="page-subtitle">Manage your team members and onboard new hires</div>
      </div>
      <button class="btn btn--primary" onclick="openOnboardSelect()">${icon('plus', 16)} Onboard Employee</button>
    </div>

    <div class="stats-row" style="grid-template-columns:repeat(3,1fr);">
      <div class="stat-card animate-in">
        <div class="stat-card__header">
          <div class="stat-card__icon stat-card__icon--blue">${icon('users')}</div>
        </div>
        <div class="stat-card__value">${TEAM_MEMBERS.length}</div>
        <div class="stat-card__label">Total Employees</div>
      </div>
      <div class="stat-card animate-in">
        <div class="stat-card__header">
          <div class="stat-card__icon stat-card__icon--green">${icon('check')}</div>
        </div>
        <div class="stat-card__value">${active}</div>
        <div class="stat-card__label">Active</div>
      </div>
      <div class="stat-card animate-in">
        <div class="stat-card__header">
          <div class="stat-card__icon stat-card__icon--amber">${icon('layers')}</div>
        </div>
        <div class="stat-card__value">${countries}</div>
        <div class="stat-card__label">Countries</div>
      </div>
    </div>

    <div class="filters">
      <span class="filter-chip active" onclick="filterTable(this,'teamTable','all')">All</span>
      <span class="filter-chip" onclick="filterTable(this,'teamTable','Active')">Active</span>
      <span class="filter-chip" onclick="filterTable(this,'teamTable','Inactive')">Inactive</span>
      <span class="filter-chip" onclick="filterTable(this,'teamTable','Draft')">Draft</span>
    </div>

    <div class="card animate-in">
      <div class="table-wrap">
        <table class="data-table" id="teamTable">
          <thead>
            <tr>
              <th>ID</th><th>Name</th><th>Department</th><th>Designation</th><th>Country</th><th>Type</th><th>Status</th><th></th>
            </tr>
          </thead>
          <tbody>
            ${TEAM_MEMBERS.map(m => `
              <tr data-status="${m.status}">
                <td class="td-mono" style="color:var(--green-600)">${m.id}</td>
                <td class="td-primary">${m.name}</td>
                <td>${m.department}</td>
                <td>${m.designation}</td>
                <td>${m.country}</td>
                <td><span class="badge-plain badge-plain--gray">${m.type}</span></td>
                <td><span class="badge badge--${statusClass(m.status)}">${m.status}</span></td>
                <td><button class="btn btn--ghost btn--sm" onclick="showEmployeeDetail('${m.id}')">${icon('eye', 14)} View</button></td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>
    </div>
  `;
}

// ── Service Progress ────────────────────────────────────────

function renderServices() {
  return `
    <div class="page-header">
      <div>
        <div class="page-title">Service Progress</div>
        <div class="page-subtitle">Track onboarding, payroll, and other service requests</div>
      </div>
    </div>

    <div class="filters">
      <span class="filter-chip active" onclick="filterTable(this,'svcTable','all')">All</span>
      <span class="filter-chip" onclick="filterTable(this,'svcTable','PendingDocuments')">Pending</span>
      <span class="filter-chip" onclick="filterTable(this,'svcTable','Completed')">Completed</span>
    </div>

    <div class="card animate-in">
      <div class="table-wrap">
        <table class="data-table" id="svcTable">
          <thead>
            <tr>
              <th>ID</th><th>Title</th><th>Type</th><th>Employee</th><th>Progress</th><th>Status</th><th></th>
            </tr>
          </thead>
          <tbody>
            ${SERVICES.map(s => `
              <tr data-status="${s.status}">
                <td class="td-mono" style="color:var(--green-600)">${s.id}</td>
                <td class="td-primary">${s.title}</td>
                <td>${serviceTypeLabel(s.type)}</td>
                <td>${s.employee}</td>
                <td>
                  <div style="display:flex;align-items:center;gap:8px;min-width:120px">
                    <div class="progress-bar" style="flex:1"><div class="progress-bar__fill" style="width:${s.progress}%"></div></div>
                    <span class="td-mono" style="font-size:12px">${s.progress}%</span>
                  </div>
                </td>
                <td><span class="badge badge--${statusClass(s.status)}">${serviceStatusLabel(s.status)}</span></td>
                <td><button class="btn btn--ghost btn--sm" onclick="showServiceDetail('${s.id}')">${icon('eye', 14)} View</button></td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>
    </div>
  `;
}

// ── Leave Applications ──────────────────────────────────────

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
              <th style="width:32px"></th>
              <th>ID</th>
              <th>Type</th>
              <th>From</th>
              <th>To</th>
              <th>Days</th>
              <th>Half Day</th>
              <th>Status</th>
              <th>Approver</th>
            </tr>
          </thead>
          <tbody>
            ${LEAVE_REQUESTS.map(lr => `
              <tr class="expandable-trigger" data-status="${lr.status}" data-id="${lr.id}" onclick="toggleLeaveDetail('${lr.id}', this)">
                <td><span class="expand-icon">${ICONS.chevronRight}</span></td>
                <td class="td-mono" style="color:var(--green-600)">${lr.id}</td>
                <td class="td-primary">${lr.type}</td>
                <td class="td-mono">${lr.from}</td>
                <td class="td-mono">${lr.to}</td>
                <td class="td-mono">${lr.days}</td>
                <td>${lr.halfDay}</td>
                <td><span class="badge badge--${statusClass(lr.status)}">${lr.status}</span></td>
                <td>${lr.approver}</td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>
    </div>
  `;
}

// ── Holiday List ────────────────────────────────────────────

function renderHolidays() {
  return `
    <div class="page-header">
      <div>
        <div class="page-title">Holiday List</div>
        <div class="page-subtitle">Public holidays and company-observed days off</div>
      </div>
      <select class="form-select" style="width:120px">
        <option>2025</option>
        <option>2024</option>
      </select>
    </div>

    <div class="card animate-in">
      <div class="table-wrap">
        <table class="data-table">
          <thead>
            <tr>
              <th>Holiday</th>
              <th>Date</th>
              <th>Day</th>
            </tr>
          </thead>
          <tbody>
            ${HOLIDAYS.map(h => `
              <tr>
                <td class="td-primary">${h.name}</td>
                <td class="td-mono">${h.date}</td>
                <td>${h.day}</td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>
    </div>
  `;
}

// ── Salary ──────────────────────────────────────────────────

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
    <div class="balance-grid">
      <div class="metric-card animate-in">
        <div class="metric-card__icon metric-card__icon--green">${icon('dollar')}</div>
        <div class="metric-card__info">
          <div class="metric-card__value">${formatCurrency(24660)}</div>
          <div class="metric-card__label">Avg Net Pay</div>
        </div>
      </div>
      <div class="metric-card animate-in">
        <div class="metric-card__icon metric-card__icon--blue">${icon('arrowUp')}</div>
        <div class="metric-card__info">
          <div class="metric-card__value">${formatCurrency(96000)}</div>
          <div class="metric-card__label">YTD Gross</div>
        </div>
      </div>
      <div class="metric-card animate-in">
        <div class="metric-card__icon metric-card__icon--amber">${icon('arrowDown')}</div>
        <div class="metric-card__info">
          <div class="metric-card__value">${formatCurrency(20460)}</div>
          <div class="metric-card__label">YTD Deductions</div>
        </div>
      </div>
      <div class="metric-card animate-in">
        <div class="metric-card__icon metric-card__icon--purple">${icon('wallet')}</div>
        <div class="metric-card__info">
          <div class="metric-card__value">${formatCurrency(SALARY_SLIPS[0].net)}</div>
          <div class="metric-card__label">Latest Net Pay</div>
        </div>
      </div>
    </div>

    <!-- Salary Table -->
    <div class="card animate-in">
      <div class="table-wrap">
        <table class="data-table" id="salaryTable">
          <thead>
            <tr>
              <th style="width:32px"></th>
              <th>Period</th>
              <th>Pay Date</th>
              <th>Gross</th>
              <th>Deductions</th>
              <th>Net Pay</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            ${SALARY_SLIPS.map(ss => `
              <tr class="expandable-trigger" data-slip-id="${ss.id}" data-id="${ss.id}" onclick="toggleSalaryDetail('${ss.id}', this)">
                <td><span class="expand-icon">${ICONS.chevronRight}</span></td>
                <td class="td-primary">${ss.period}</td>
                <td class="td-mono">${ss.payDate}</td>
                <td class="td-mono">${formatCurrency(ss.gross)}</td>
                <td class="td-mono td-red">${formatCurrency(ss.deductions)}</td>
                <td class="td-mono td-green" style="font-weight:600">${formatCurrency(ss.net)}</td>
                <td><span class="badge badge--${statusClass(ss.status)}">${ss.status}</span></td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>
    </div>
  `;
}

// ── Expenses ────────────────────────────────────────────────

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
    <div class="balance-grid">
      <div class="metric-card animate-in">
        <div class="metric-card__icon metric-card__icon--amber">${icon('clock')}</div>
        <div class="metric-card__info">
          <div class="metric-card__value">${formatCurrency(totalPending)}</div>
          <div class="metric-card__label">Pending Claims</div>
        </div>
      </div>
      <div class="metric-card animate-in">
        <div class="metric-card__icon metric-card__icon--green">${icon('dollar')}</div>
        <div class="metric-card__info">
          <div class="metric-card__value">${formatCurrency(totalApproved)}</div>
          <div class="metric-card__label">Approved YTD</div>
        </div>
      </div>
      <div class="metric-card animate-in">
        <div class="metric-card__icon metric-card__icon--blue">${icon('receipt')}</div>
        <div class="metric-card__info">
          <div class="metric-card__value">${EXPENSES.length}</div>
          <div class="metric-card__label">Total Claims</div>
        </div>
      </div>
      <div class="metric-card animate-in">
        <div class="metric-card__icon metric-card__icon--purple">${icon('wallet')}</div>
        <div class="metric-card__info">
          <div class="metric-card__value">${formatCurrency(5000 - totalApproved)}</div>
          <div class="metric-card__label">Monthly Budget Left</div>
        </div>
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
              <th style="width:32px"></th>
              <th>ID</th>
              <th>Date</th>
              <th>Category</th>
              <th>Description</th>
              <th>Items</th>
              <th>Amount</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            ${EXPENSES.map(e => `
              <tr class="expandable-trigger" data-status="${e.status}" data-id="${e.id}" onclick="toggleExpenseDetail('${e.id}', this)">
                <td><span class="expand-icon">${ICONS.chevronRight}</span></td>
                <td class="td-mono" style="color:var(--green-600)">${e.id}</td>
                <td class="td-mono">${e.date}</td>
                <td><span class="badge-plain badge-plain--gray">${e.category}</span></td>
                <td class="td-primary" style="max-width:220px;overflow:hidden;text-overflow:ellipsis;">${e.description}</td>
                <td class="td-mono">${e.items}</td>
                <td class="td-mono" style="font-weight:600;color:var(--gray-900)">${formatCurrency(e.amount)}</td>
                <td><span class="badge badge--${statusClass(e.status)}">${e.status}</span></td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>
    </div>
  `;
}

// ── Tickets ─────────────────────────────────────────────────

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
                <td><span class="badge-plain badge-plain--gray">${categoryLabel(t.category)}</span></td>
                <td><span class="badge-plain ${priorityBadgeClass(t.priority)}">${priorityLabel(t.priority)}</span></td>
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

// ── Contract ────────────────────────────────────────────────

function renderContract() {
  return `
    <div class="page-header">
      <div>
        <div class="page-title">Employment Contract</div>
        <div class="page-subtitle">View your contract details and terms</div>
      </div>
      <button class="btn btn--secondary" onclick="alert('Download PDF')">${icon('download', 16)} Download PDF</button>
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
        <div class="contract-item"><div class="contract-item__label">Probation</div><div class="contract-item__value">3 months (completed)</div></div>
        <div class="contract-item"><div class="contract-item__label">Notice Period</div><div class="contract-item__value">30 days</div></div>
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

    <div class="card animate-in mt-6">
      <div class="card__header">
        <div class="card__title">Employment Agreement</div>
      </div>
      <div class="card__body">
        <div class="contract-doc__section">
          <div class="contract-doc__section-title">1. Position & Duties</div>
          <div class="contract-doc__text">The Employee shall serve as <strong>Software Engineer</strong> in the <strong>Engineering Department</strong>, reporting to the Engineering Manager.</div>
        </div>
        <div class="contract-doc__section">
          <div class="contract-doc__section-title">2. Compensation</div>
          <div class="contract-doc__text">Base salary of <strong>${formatCurrency(32000)}</strong> per month, paid on the 25th. Includes housing (${formatCurrency(5000)}), transport (${formatCurrency(2000)}), and meal (${formatCurrency(1500)}) allowances.</div>
        </div>
        <div class="contract-doc__section">
          <div class="contract-doc__section-title">3. Working Hours</div>
          <div class="contract-doc__text">Monday to Friday, 09:00 \u2014 18:00. Remote work permitted up to 2 days per week with manager approval.</div>
        </div>
        <div class="contract-doc__section">
          <div class="contract-doc__section-title">4. Benefits</div>
          <div class="contract-doc__text">Full social insurance and housing fund. Supplementary commercial medical insurance. Annual leave: 15 days. Sick leave: 10 days.</div>
        </div>
      </div>
    </div>
  `;
}

// ── Wallet ──────────────────────────────────────────────────

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
        <div class="stat-card__value">${formatCurrency(123899)}</div>
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

    <div class="wallet-actions animate-in">
      <button class="btn btn--primary">${icon('download', 16)} Withdraw</button>
      <button class="btn btn--secondary">${icon('eye', 16)} Statement</button>
    </div>

    <div class="card animate-in">
      <div class="card__header">
        <div class="card__title">Transaction History</div>
        <select class="form-select" style="width:110px;padding:5px 8px;font-size:0.75rem">
          <option>All</option>
          <option>Income</option>
          <option>Expense</option>
        </select>
      </div>
      <div class="table-wrap">
        <table class="data-table">
          <thead>
            <tr><th>Date</th><th>Description</th><th>Amount</th><th>Type</th></tr>
          </thead>
          <tbody>
            ${TRANSACTIONS.map(tx => `
              <tr>
                <td class="td-mono">${tx.date}</td>
                <td class="td-primary">${tx.title}</td>
                <td class="td-mono ${tx.type === 'in' ? 'td-green' : 'td-red'}">${tx.type === 'in' ? '+' : '-'}${formatCurrency(tx.amount)}</td>
                <td><span class="badge-plain ${tx.type === 'in' ? 'badge-plain--green' : 'badge-plain--red'}">${tx.type === 'in' ? 'Credit' : 'Debit'}</span></td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>
    </div>
  `;
}

// ── Profile ─────────────────────────────────────────────────

function renderProfile() {
  return `
    <div class="page-header">
      <div>
        <div class="page-title">My Profile</div>
        <div class="page-subtitle">View and manage your personal information</div>
      </div>
      <button class="btn btn--secondary" onclick="openEditProfileModal()">${icon('settings', 16)} Edit Profile</button>
    </div>

    <!-- Profile Header -->
    <div class="card animate-in mb-6">
      <div class="profile-header">
        <div class="profile-avatar">${EMPLOYEE.initials}</div>
        <div>
          <div class="profile-info__name">${EMPLOYEE.name}</div>
          <div class="profile-info__role">${EMPLOYEE.role} \u00b7 ${EMPLOYEE.department}</div>
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
        <div class="detail-item detail-item--copyable" onclick="copyToClipboard('${EMPLOYEE.email}', this)" title="Click to copy"><div class="detail-item__label">Email</div><div class="detail-item__value" style="color:var(--green-600)">${EMPLOYEE.email} <span class="copy-icon">${icon('copy', 14)}</span></div></div>
        <div class="detail-item detail-item--copyable" onclick="copyToClipboard('${EMPLOYEE.phone}', this)" title="Click to copy"><div class="detail-item__label">Phone</div><div class="detail-item__value">${EMPLOYEE.phone} <span class="copy-icon">${icon('copy', 14)}</span></div></div>
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

// ── Time Off (Summary) ─────────────────────────────────────

function renderTimeOff() {
  const approvedLeaves = LEAVE_REQUESTS.filter(l => l.status === 'Approved');
  const now = new Date();
  const thisMonth = approvedLeaves.filter(l => {
    const d = new Date(l.from);
    return d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear();
  });
  const upcoming = approvedLeaves.filter(l => new Date(l.from) > now);
  const daysThisMonth = thisMonth.reduce((s, l) => s + l.days, 0);

  return `
    <div class="page-header">
      <div>
        <div class="page-title">Time Off</div>
        <div class="page-subtitle">Overview of approved time off across the team</div>
      </div>
    </div>

    <div class="stats-row" style="grid-template-columns:repeat(3,1fr);">
      <div class="stat-card animate-in">
        <div class="stat-card__header">
          <div class="stat-card__icon stat-card__icon--blue">${icon('calendar')}</div>
        </div>
        <div class="stat-card__value">${daysThisMonth}</div>
        <div class="stat-card__label">Days Off This Month</div>
      </div>
      <div class="stat-card animate-in">
        <div class="stat-card__header">
          <div class="stat-card__icon stat-card__icon--amber">${icon('clock')}</div>
        </div>
        <div class="stat-card__value">${upcoming.length}</div>
        <div class="stat-card__label">Upcoming Leaves</div>
      </div>
      <div class="stat-card animate-in">
        <div class="stat-card__header">
          <div class="stat-card__icon stat-card__icon--green">${icon('check')}</div>
        </div>
        <div class="stat-card__value">${approvedLeaves.length}</div>
        <div class="stat-card__label">Approved Total</div>
      </div>
    </div>

    <div class="card animate-in">
      <div class="card__header">
        <div class="card__title">Approved Leaves</div>
      </div>
      <div class="table-wrap">
        <table class="data-table">
          <thead>
            <tr>
              <th>ID</th><th>Employee</th><th>Type</th><th>From</th><th>To</th><th>Days</th><th>Status</th>
            </tr>
          </thead>
          <tbody>
            ${approvedLeaves.map(l => `
              <tr>
                <td class="td-mono" style="color:var(--green-600)">${l.id}</td>
                <td class="td-primary">${EMPLOYEE.name}</td>
                <td>${l.type}</td>
                <td class="td-mono">${l.from}</td>
                <td class="td-mono">${l.to}</td>
                <td class="td-mono">${l.days}</td>
                <td><span class="badge badge--approved">Approved</span></td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>
    </div>
  `;
}

// ── Leave Type ─────────────────────────────────────────────

function renderLeaveType() {
  return `
    <div class="page-header">
      <div>
        <div class="page-title">Leave Types</div>
        <div class="page-subtitle">Configure leave categories and their rules</div>
      </div>
      <button class="btn btn--primary" onclick="openLeaveTypeForm()">${icon('plus', 16)} New Leave Type</button>
    </div>

    <div class="card animate-in">
      <div class="table-wrap">
        <table class="data-table">
          <thead>
            <tr>
              <th>ID</th><th>Name</th><th>Max Days</th><th>Carry Forward</th><th>Without Pay</th><th>Compensatory</th><th>Status</th>
            </tr>
          </thead>
          <tbody>
            ${LEAVE_TYPE_LIST.map(lt => `
              <tr>
                <td class="td-mono" style="color:var(--green-600)">${lt.id}</td>
                <td class="td-primary">${lt.name}</td>
                <td class="td-mono">${lt.maxDays}</td>
                <td>${lt.isCarryForward ? 'Yes (max ' + lt.maxCarryForward + ')' : 'No'}</td>
                <td>${lt.isWithoutPay ? 'Yes' : 'No'}</td>
                <td>${lt.isCompensatory ? 'Yes' : 'No'}</td>
                <td><span class="badge badge--approved">Active</span></td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>
    </div>
  `;
}

window.openLeaveTypeForm = function() {
  const body = `
    <div class="form-group">
      <label class="form-label">Leave Type Name</label>
      <input type="text" class="form-input" placeholder="e.g. Annual Leave"/>
    </div>
    <div class="form-row">
      <div class="form-group">
        <label class="form-label">Max Days Allowed</label>
        <input type="number" class="form-input" placeholder="0"/>
      </div>
      <div class="form-group">
        <label class="form-label">Max Carry Forward Days</label>
        <input type="number" class="form-input" placeholder="0"/>
      </div>
    </div>
    <div class="form-group">
      <label class="form-checkbox"><input type="checkbox"/> Allow Carry Forward</label>
    </div>
    <div class="form-group">
      <label class="form-checkbox"><input type="checkbox"/> Is Without Pay</label>
    </div>
    <div class="form-group">
      <label class="form-checkbox"><input type="checkbox"/> Is Compensatory</label>
    </div>
    <div class="form-group">
      <label class="form-checkbox"><input type="checkbox"/> Include Holidays in Leave Count</label>
    </div>
    <div class="form-group">
      <label class="form-checkbox"><input type="checkbox"/> Allow Negative Balance</label>
    </div>
  `;
  const footer = `
    <button class="btn btn--secondary" onclick="closeModal()">Cancel</button>
    <button class="btn btn--primary" onclick="closeModal()">Create Leave Type</button>
  `;
  openModal('New Leave Type', body, footer);
};

// ── Leave Policy ───────────────────────────────────────────

function renderLeavePolicy() {
  return `
    <div class="page-header">
      <div>
        <div class="page-title">Leave Policies</div>
        <div class="page-subtitle">Define leave entitlement packages for different employee groups</div>
      </div>
      <button class="btn btn--primary" onclick="openLeavePolicyForm()">${icon('plus', 16)} New Policy</button>
    </div>

    <div class="card animate-in">
      <div class="table-wrap">
        <table class="data-table">
          <thead>
            <tr>
              <th>ID</th><th>Name</th><th>Description</th><th>Leave Types</th><th>Status</th><th></th>
            </tr>
          </thead>
          <tbody>
            ${LEAVE_POLICIES.map(lp => `
              <tr>
                <td class="td-mono" style="color:var(--green-600)">${lp.id}</td>
                <td class="td-primary">${lp.name}</td>
                <td style="max-width:220px;overflow:hidden;text-overflow:ellipsis;">${lp.description}</td>
                <td class="td-mono">${lp.leaveTypes.length}</td>
                <td><span class="badge badge--${statusClass(lp.status)}">${lp.status}</span></td>
                <td><button class="btn btn--ghost btn--sm" onclick="viewLeavePolicyDetail('${lp.id}')">${icon('eye', 14)} View</button></td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>
    </div>

    <div id="leavePolicyDetailPanel" style="display:none;"></div>
  `;
}

window.viewLeavePolicyDetail = function(id) {
  const policy = LEAVE_POLICIES.find(p => p.id === id);
  if (!policy) return;
  const panel = document.getElementById('leavePolicyDetailPanel');
  panel.innerHTML = `
    <div class="detail-panel">
      <div class="card">
        <div class="card__header">
          <div class="card__title">${icon('fileText', 18)} &nbsp;Policy \u2014 <span style="color:var(--green-600);font-family:'JetBrains Mono',monospace;">${policy.id}</span></div>
          <button class="btn btn--ghost btn--sm" onclick="document.getElementById('leavePolicyDetailPanel').style.display='none'">${icon('x', 14)} Close</button>
        </div>
        <div class="detail-section">
          <div class="detail-section__title">Policy Details</div>
          <div class="detail-info-grid">
            <div class="detail-info-item">
              <div class="detail-info-item__label">Name</div>
              <div class="detail-info-item__value">${policy.name}</div>
            </div>
            <div class="detail-info-item">
              <div class="detail-info-item__label">Description</div>
              <div class="detail-info-item__value">${policy.description}</div>
            </div>
            <div class="detail-info-item">
              <div class="detail-info-item__label">Status</div>
              <div class="detail-info-item__value"><span class="badge badge--${statusClass(policy.status)}">${policy.status}</span></div>
            </div>
          </div>
        </div>
        <div class="detail-section">
          <div class="detail-section__title">Leave Type Allocations</div>
          <div class="table-wrap">
            <table class="data-table">
              <thead><tr><th>Leave Type</th><th>Days Per Year</th></tr></thead>
              <tbody>
                ${policy.leaveTypes.map(lt => `
                  <tr>
                    <td class="td-primary">${lt.type}</td>
                    <td class="td-mono">${lt.days}</td>
                  </tr>
                `).join('')}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  `;
  panel.style.display = 'block';
  panel.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
};

window.openLeavePolicyForm = function() {
  const body = `
    <div class="form-group">
      <label class="form-label">Policy Name</label>
      <input type="text" class="form-input" placeholder="e.g. Standard Employee Policy"/>
    </div>
    <div class="form-group">
      <label class="form-label">Description</label>
      <textarea class="form-textarea" placeholder="Describe the policy..." rows="2"></textarea>
    </div>
    <div class="section-title" style="margin-top:12px;margin-bottom:8px">Leave Type Allocations</div>
    ${LEAVE_TYPE_LIST.map(lt => `
      <div class="form-row" style="align-items:center">
        <div class="form-group" style="flex:2">
          <label class="form-checkbox"><input type="checkbox"/> ${lt.name}</label>
        </div>
        <div class="form-group" style="flex:1">
          <input type="number" class="form-input" placeholder="Days" value="${lt.maxDays}"/>
        </div>
      </div>
    `).join('')}
  `;
  const footer = `
    <button class="btn btn--secondary" onclick="closeModal()">Cancel</button>
    <button class="btn btn--primary" onclick="closeModal()">Create Policy</button>
  `;
  openModal('New Leave Policy', body, footer);
};

// ── Leave Period ───────────────────────────────────────────

function renderLeavePeriod() {
  return `
    <div class="page-header">
      <div>
        <div class="page-title">Leave Periods</div>
        <div class="page-subtitle">Define the annual leave accrual periods</div>
      </div>
      <button class="btn btn--primary" onclick="openLeavePeriodForm()">${icon('plus', 16)} New Period</button>
    </div>

    <div class="card animate-in">
      <div class="table-wrap">
        <table class="data-table">
          <thead>
            <tr>
              <th>ID</th><th>Name</th><th>From</th><th>To</th><th>Active</th><th>Company</th>
            </tr>
          </thead>
          <tbody>
            ${LEAVE_PERIODS.map(p => `
              <tr>
                <td class="td-mono" style="color:var(--green-600)">${p.id}</td>
                <td class="td-primary">${p.name}</td>
                <td class="td-mono">${p.from}</td>
                <td class="td-mono">${p.to}</td>
                <td>${p.isActive ? '<span class="badge badge--approved">Yes</span>' : '<span class="badge badge--draft">No</span>'}</td>
                <td>${p.company}</td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>
    </div>
  `;
}

window.openLeavePeriodForm = function() {
  const body = `
    <div class="form-group">
      <label class="form-label">Period Name</label>
      <input type="text" class="form-input" placeholder="e.g. 2025 Leave Year"/>
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
      <label class="form-label">Company</label>
      <select class="form-select">
        <option>RampingUp Technology Ltd.</option>
      </select>
    </div>
    <div class="form-group">
      <label class="form-checkbox"><input type="checkbox" checked/> Is Active</label>
    </div>
  `;
  const footer = `
    <button class="btn btn--secondary" onclick="closeModal()">Cancel</button>
    <button class="btn btn--primary" onclick="closeModal()">Create Period</button>
  `;
  openModal('New Leave Period', body, footer);
};

// ── Leave Allocation ───────────────────────────────────────

function renderLeaveAllocation() {
  return `
    <div class="page-header">
      <div>
        <div class="page-title">Leave Allocations</div>
        <div class="page-subtitle">Track leave days allocated to each employee</div>
      </div>
      <button class="btn btn--primary" onclick="openLeaveAllocationForm()">${icon('plus', 16)} New Allocation</button>
    </div>

    <div class="filters">
      <span class="filter-chip active" onclick="filterTable(this,'allocTable','all')">All</span>
      <span class="filter-chip" onclick="filterTable(this,'allocTable','Active')">Active</span>
    </div>

    <div class="card animate-in">
      <div class="table-wrap">
        <table class="data-table" id="allocTable">
          <thead>
            <tr>
              <th>ID</th><th>Employee</th><th>Leave Type</th><th>Period</th><th>New Alloc</th><th>Carry Fwd</th><th>Total</th><th>Used</th><th>Balance</th><th>Status</th>
            </tr>
          </thead>
          <tbody>
            ${LEAVE_ALLOCATIONS.map(a => `
              <tr data-status="${a.status}">
                <td class="td-mono" style="color:var(--green-600)">${a.id}</td>
                <td class="td-primary">${a.employee}</td>
                <td>${a.leaveType}</td>
                <td class="td-mono">${a.period}</td>
                <td class="td-mono">${a.newAllocation}</td>
                <td class="td-mono">${a.carryForward}</td>
                <td class="td-mono" style="font-weight:600">${a.totalDays}</td>
                <td class="td-mono">${a.usedDays}</td>
                <td class="td-mono" style="font-weight:600;color:var(--green-600)">${a.totalDays - a.usedDays}</td>
                <td><span class="badge badge--${statusClass(a.status)}">${a.status}</span></td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>
    </div>
  `;
}

window.openLeaveAllocationForm = function() {
  const body = `
    <div class="form-row">
      <div class="form-group">
        <label class="form-label">Employee</label>
        <select class="form-select">
          <option value="">Select employee...</option>
          ${TEAM_MEMBERS.map(m => `<option value="${m.id}">${m.name}</option>`).join('')}
        </select>
      </div>
      <div class="form-group">
        <label class="form-label">Leave Type</label>
        <select class="form-select">
          <option value="">Select type...</option>
          ${LEAVE_TYPE_LIST.map(lt => `<option value="${lt.id}">${lt.name}</option>`).join('')}
        </select>
      </div>
    </div>
    <div class="form-row">
      <div class="form-group">
        <label class="form-label">Period</label>
        <select class="form-select">
          ${LEAVE_PERIODS.map(p => `<option value="${p.id}">${p.name}</option>`).join('')}
        </select>
      </div>
      <div class="form-group">
        <label class="form-label">New Allocation (Days)</label>
        <input type="number" class="form-input" placeholder="0"/>
      </div>
    </div>
    <div class="form-group">
      <label class="form-label">Carry Forward (Days)</label>
      <input type="number" class="form-input" placeholder="0"/>
    </div>
  `;
  const footer = `
    <button class="btn btn--secondary" onclick="closeModal()">Cancel</button>
    <button class="btn btn--primary" onclick="closeModal()">Create Allocation</button>
  `;
  openModal('New Leave Allocation', body, footer);
};

// ── Leave Policy Assignment ────────────────────────────────

function renderLeavePolicyAssignment() {
  return `
    <div class="page-header">
      <div>
        <div class="page-title">Leave Policy Assignments</div>
        <div class="page-subtitle">Assign leave policies to employees for specific periods</div>
      </div>
      <button class="btn btn--primary" onclick="openLeavePolicyAssignmentForm()">${icon('plus', 16)} New Assignment</button>
    </div>

    <div class="filters">
      <span class="filter-chip active" onclick="filterTable(this,'paTable','all')">All</span>
      <span class="filter-chip" onclick="filterTable(this,'paTable','Active')">Active</span>
    </div>

    <div class="card animate-in">
      <div class="table-wrap">
        <table class="data-table" id="paTable">
          <thead>
            <tr>
              <th>ID</th><th>Employee</th><th>Policy</th><th>Period</th><th>Assigned Date</th><th>Status</th>
            </tr>
          </thead>
          <tbody>
            ${LEAVE_POLICY_ASSIGNMENTS.map(pa => `
              <tr data-status="${pa.status}">
                <td class="td-mono" style="color:var(--green-600)">${pa.id}</td>
                <td class="td-primary">${pa.employee}</td>
                <td>${pa.policy}</td>
                <td>${pa.period}</td>
                <td class="td-mono">${pa.assignedDate}</td>
                <td><span class="badge badge--${statusClass(pa.status)}">${pa.status}</span></td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>
    </div>
  `;
}

window.openLeavePolicyAssignmentForm = function() {
  const body = `
    <div class="form-group">
      <label class="form-label">Employee</label>
      <select class="form-select">
        <option value="">Select employee...</option>
        ${TEAM_MEMBERS.map(m => `<option value="${m.id}">${m.name}</option>`).join('')}
      </select>
    </div>
    <div class="form-group">
      <label class="form-label">Leave Policy</label>
      <select class="form-select">
        <option value="">Select policy...</option>
        ${LEAVE_POLICIES.map(p => `<option value="${p.id}">${p.name}</option>`).join('')}
      </select>
    </div>
    <div class="form-group">
      <label class="form-label">Leave Period</label>
      <select class="form-select">
        ${LEAVE_PERIODS.map(p => `<option value="${p.id}">${p.name}</option>`).join('')}
      </select>
    </div>
    <div class="form-group">
      <label class="form-label">Effective Date</label>
      <input type="date" class="form-input"/>
    </div>
  `;
  const footer = `
    <button class="btn btn--secondary" onclick="closeModal()">Cancel</button>
    <button class="btn btn--primary" onclick="closeModal()">Create Assignment</button>
  `;
  openModal('New Leave Policy Assignment', body, footer);
};

// ── Leave Approval Flow ────────────────────────────────────

function renderLeaveApprovalFlow() {
  return `
    <div class="page-header">
      <div>
        <div class="page-title">Leave Approval Flows</div>
        <div class="page-subtitle">Configure multi-level approval chains for leave requests</div>
      </div>
      <button class="btn btn--primary" onclick="openLeaveApprovalFlowForm()">${icon('plus', 16)} New Flow</button>
    </div>

    <div class="card animate-in">
      <div class="table-wrap">
        <table class="data-table">
          <thead>
            <tr>
              <th>ID</th><th>Name</th><th>Leave Type</th><th>Condition</th><th>Steps</th><th>Status</th><th></th>
            </tr>
          </thead>
          <tbody>
            ${LEAVE_APPROVAL_FLOW_CONFIGS.map(af => `
              <tr>
                <td class="td-mono" style="color:var(--green-600)">${af.id}</td>
                <td class="td-primary">${af.name}</td>
                <td>${af.leaveType}</td>
                <td>${af.condition || '\u2014'}</td>
                <td class="td-mono">${af.steps.length}</td>
                <td><span class="badge badge--${statusClass(af.status)}">${af.status}</span></td>
                <td><button class="btn btn--ghost btn--sm" onclick="viewLeaveApprovalFlowDetail('${af.id}')">${icon('eye', 14)} View</button></td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>
    </div>

    <div id="leaveApprovalFlowDetailPanel" style="display:none;"></div>
  `;
}

window.viewLeaveApprovalFlowDetail = function(id) {
  const af = LEAVE_APPROVAL_FLOW_CONFIGS.find(f => f.id === id);
  if (!af) return;
  const panel = document.getElementById('leaveApprovalFlowDetailPanel');
  panel.innerHTML = `
    <div class="detail-panel">
      <div class="card">
        <div class="card__header">
          <div class="card__title">${icon('checkSquare', 18)} &nbsp;Approval Flow \u2014 <span style="color:var(--green-600);font-family:'JetBrains Mono',monospace;">${af.id}</span></div>
          <button class="btn btn--ghost btn--sm" onclick="document.getElementById('leaveApprovalFlowDetailPanel').style.display='none'">${icon('x', 14)} Close</button>
        </div>
        <div class="detail-section">
          <div class="detail-section__title">Flow Details</div>
          <div class="detail-info-grid">
            <div class="detail-info-item">
              <div class="detail-info-item__label">Name</div>
              <div class="detail-info-item__value">${af.name}</div>
            </div>
            <div class="detail-info-item">
              <div class="detail-info-item__label">Leave Type</div>
              <div class="detail-info-item__value">${af.leaveType}</div>
            </div>
            <div class="detail-info-item">
              <div class="detail-info-item__label">Condition</div>
              <div class="detail-info-item__value">${af.condition || 'None (default)'}</div>
            </div>
            <div class="detail-info-item">
              <div class="detail-info-item__label">Status</div>
              <div class="detail-info-item__value"><span class="badge badge--${statusClass(af.status)}">${af.status}</span></div>
            </div>
          </div>
        </div>
        <div class="detail-section">
          <div class="detail-section__title">Approval Chain</div>
          <div class="approval-flow">
            ${af.steps.map(s => `
              <div class="approval-step step--done">
                <div class="approval-step__icon">L${s.level}</div>
                <div class="approval-step__content">
                  <div class="approval-step__title">${s.role}</div>
                  <div class="approval-step__meta">
                    <span>Approver: ${s.approver}</span>
                    <span style="color:var(--gray-300)">\u00b7</span>
                    <span>Level ${s.level}</span>
                  </div>
                </div>
              </div>
            `).join('')}
          </div>
        </div>
      </div>
    </div>
  `;
  panel.style.display = 'block';
  panel.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
};

window.openLeaveApprovalFlowForm = function() {
  const body = `
    <div class="form-group">
      <label class="form-label">Flow Name</label>
      <input type="text" class="form-input" placeholder="e.g. Standard Leave Approval"/>
    </div>
    <div class="form-row">
      <div class="form-group">
        <label class="form-label">Leave Type</label>
        <select class="form-select">
          <option value="">Select type...</option>
          ${LEAVE_TYPE_LIST.map(lt => `<option value="${lt.id}">${lt.name}</option>`).join('')}
        </select>
      </div>
      <div class="form-group">
        <label class="form-label">Condition (optional)</label>
        <input type="text" class="form-input" placeholder="e.g. > 5 days"/>
      </div>
    </div>
    <div class="section-title" style="margin-top:12px;margin-bottom:8px">Approval Steps</div>
    <div class="form-row">
      <div class="form-group" style="flex:0 0 60px">
        <label class="form-label">Level</label>
        <input type="text" class="form-input" value="1" disabled/>
      </div>
      <div class="form-group" style="flex:1">
        <label class="form-label">Role</label>
        <input type="text" class="form-input" placeholder="e.g. Direct Manager"/>
      </div>
      <div class="form-group" style="flex:1">
        <label class="form-label">Approver</label>
        <select class="form-select">
          <option value="">Select...</option>
          ${TEAM_MEMBERS.map(m => `<option value="${m.id}">${m.name}</option>`).join('')}
        </select>
      </div>
    </div>
    <div class="form-row">
      <div class="form-group" style="flex:0 0 60px">
        <label class="form-label">Level</label>
        <input type="text" class="form-input" value="2" disabled/>
      </div>
      <div class="form-group" style="flex:1">
        <label class="form-label">Role</label>
        <input type="text" class="form-input" placeholder="e.g. HR Manager"/>
      </div>
      <div class="form-group" style="flex:1">
        <label class="form-label">Approver</label>
        <select class="form-select">
          <option value="">Select...</option>
          ${TEAM_MEMBERS.map(m => `<option value="${m.id}">${m.name}</option>`).join('')}
        </select>
      </div>
    </div>
    <div style="font-size:12px;color:var(--gray-400);margin-top:4px">Add more levels after creation.</div>
  `;
  const footer = `
    <button class="btn btn--secondary" onclick="closeModal()">Cancel</button>
    <button class="btn btn--primary" onclick="closeModal()">Create Flow</button>
  `;
  openModal('New Leave Approval Flow', body, footer, true);
};

// ── Expense Approval Flow ──────────────────────────────────

function renderExpenseApprovalFlow() {
  return `
    <div class="page-header">
      <div>
        <div class="page-title">Expense Approval Flows</div>
        <div class="page-subtitle">Configure multi-level approval chains for expense claims</div>
      </div>
      <button class="btn btn--primary" onclick="openExpenseApprovalFlowForm()">${icon('plus', 16)} New Flow</button>
    </div>

    <div class="card animate-in">
      <div class="table-wrap">
        <table class="data-table">
          <thead>
            <tr>
              <th>ID</th><th>Name</th><th>Condition</th><th>Steps</th><th>Status</th><th></th>
            </tr>
          </thead>
          <tbody>
            ${EXPENSE_FLOW_CONFIGS.map(ef => `
              <tr>
                <td class="td-mono" style="color:var(--green-600)">${ef.id}</td>
                <td class="td-primary">${ef.name}</td>
                <td>${ef.condition}</td>
                <td class="td-mono">${ef.steps.length}</td>
                <td><span class="badge badge--${statusClass(ef.status)}">${ef.status}</span></td>
                <td><button class="btn btn--ghost btn--sm" onclick="viewExpenseApprovalFlowDetail('${ef.id}')">${icon('eye', 14)} View</button></td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>
    </div>

    <div id="expenseApprovalFlowDetailPanel" style="display:none;"></div>
  `;
}

window.viewExpenseApprovalFlowDetail = function(id) {
  const ef = EXPENSE_FLOW_CONFIGS.find(f => f.id === id);
  if (!ef) return;
  const panel = document.getElementById('expenseApprovalFlowDetailPanel');
  panel.innerHTML = `
    <div class="detail-panel">
      <div class="card">
        <div class="card__header">
          <div class="card__title">${icon('checkSquare', 18)} &nbsp;Expense Flow \u2014 <span style="color:var(--green-600);font-family:'JetBrains Mono',monospace;">${ef.id}</span></div>
          <button class="btn btn--ghost btn--sm" onclick="document.getElementById('expenseApprovalFlowDetailPanel').style.display='none'">${icon('x', 14)} Close</button>
        </div>
        <div class="detail-section">
          <div class="detail-section__title">Flow Details</div>
          <div class="detail-info-grid">
            <div class="detail-info-item">
              <div class="detail-info-item__label">Name</div>
              <div class="detail-info-item__value">${ef.name}</div>
            </div>
            <div class="detail-info-item">
              <div class="detail-info-item__label">Condition</div>
              <div class="detail-info-item__value">${ef.condition}</div>
            </div>
            <div class="detail-info-item">
              <div class="detail-info-item__label">Status</div>
              <div class="detail-info-item__value"><span class="badge badge--${statusClass(ef.status)}">${ef.status}</span></div>
            </div>
          </div>
        </div>
        <div class="detail-section">
          <div class="detail-section__title">Approval Chain</div>
          <div class="approval-flow">
            ${ef.steps.map(s => `
              <div class="approval-step step--done">
                <div class="approval-step__icon">L${s.level}</div>
                <div class="approval-step__content">
                  <div class="approval-step__title">${s.role}</div>
                  <div class="approval-step__meta">
                    <span>Approver: ${s.approver}</span>
                    <span style="color:var(--gray-300)">\u00b7</span>
                    <span>Level ${s.level}</span>
                  </div>
                </div>
              </div>
            `).join('')}
          </div>
        </div>
      </div>
    </div>
  `;
  panel.style.display = 'block';
  panel.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
};

window.openExpenseApprovalFlowForm = function() {
  const body = `
    <div class="form-group">
      <label class="form-label">Flow Name</label>
      <input type="text" class="form-input" placeholder="e.g. Standard Expense Approval"/>
    </div>
    <div class="form-group">
      <label class="form-label">Condition</label>
      <input type="text" class="form-input" placeholder="e.g. < \u00a55,000"/>
    </div>
    <div class="section-title" style="margin-top:12px;margin-bottom:8px">Approval Steps</div>
    <div class="form-row">
      <div class="form-group" style="flex:0 0 60px">
        <label class="form-label">Level</label>
        <input type="text" class="form-input" value="1" disabled/>
      </div>
      <div class="form-group" style="flex:1">
        <label class="form-label">Role</label>
        <input type="text" class="form-input" placeholder="e.g. Direct Manager"/>
      </div>
      <div class="form-group" style="flex:1">
        <label class="form-label">Approver</label>
        <select class="form-select">
          <option value="">Select...</option>
          ${TEAM_MEMBERS.map(m => `<option value="${m.id}">${m.name}</option>`).join('')}
        </select>
      </div>
    </div>
    <div class="form-row">
      <div class="form-group" style="flex:0 0 60px">
        <label class="form-label">Level</label>
        <input type="text" class="form-input" value="2" disabled/>
      </div>
      <div class="form-group" style="flex:1">
        <label class="form-label">Role</label>
        <input type="text" class="form-input" placeholder="e.g. Finance Manager"/>
      </div>
      <div class="form-group" style="flex:1">
        <label class="form-label">Approver</label>
        <select class="form-select">
          <option value="">Select...</option>
          ${TEAM_MEMBERS.map(m => `<option value="${m.id}">${m.name}</option>`).join('')}
        </select>
      </div>
    </div>
    <div style="font-size:12px;color:var(--gray-400);margin-top:4px">Add more levels after creation.</div>
  `;
  const footer = `
    <button class="btn btn--secondary" onclick="closeModal()">Cancel</button>
    <button class="btn btn--primary" onclick="closeModal()">Create Flow</button>
  `;
  openModal('New Expense Approval Flow', body, footer, true);
};

// ── Organization ───────────────────────────────────────────

function renderOrganization() {
  const company = ORG_UNITS[0];
  return `
    <div class="page-header">
      <div>
        <div class="page-title">Organization</div>
        <div class="page-subtitle">Company structure and department overview</div>
      </div>
    </div>

    <!-- Company Card -->
    <div class="card animate-in mb-6" style="border-left:3px solid var(--green-500);">
      <div class="card__body" style="display:flex;align-items:center;gap:16px;padding:20px 24px;">
        <div style="width:48px;height:48px;border-radius:12px;background:var(--green-50);display:flex;align-items:center;justify-content:center;color:var(--green-600);">
          ${icon('building', 24)}
        </div>
        <div style="flex:1">
          <div style="font-weight:600;font-size:1.05rem;color:var(--gray-900)">${company.name}</div>
          <div style="font-size:0.8rem;color:var(--gray-400);margin-top:2px;">
            <span class="badge-plain badge-plain--green">${company.type}</span>
            <span style="margin-left:8px">Head: ${company.head}</span>
            <span style="margin-left:8px">\u00b7</span>
            <span style="margin-left:8px">${company.members} members</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Department Grid -->
    <div class="section-title animate-in" style="margin-bottom:12px">Departments</div>
    <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(280px,1fr));gap:16px;">
      ${company.children.map(dept => `
        <div class="card animate-in" style="cursor:default;">
          <div class="card__body" style="padding:20px;">
            <div style="display:flex;align-items:center;gap:12px;margin-bottom:12px;">
              <div style="width:40px;height:40px;border-radius:10px;background:var(--gray-50);display:flex;align-items:center;justify-content:center;color:var(--gray-500);">
                ${icon('users', 20)}
              </div>
              <div>
                <div style="font-weight:600;color:var(--gray-900)">${dept.name}</div>
                <span class="badge-plain badge-plain--gray" style="font-size:11px">${dept.type}</span>
              </div>
            </div>
            <div style="display:flex;justify-content:space-between;font-size:0.8rem;color:var(--gray-400);">
              <span>Head: <strong style="color:var(--gray-700)">${dept.head}</strong></span>
              <span>${dept.members} member${dept.members !== 1 ? 's' : ''}</span>
            </div>
          </div>
        </div>
      `).join('')}
    </div>
  `;
}

// ── Messages ───────────────────────────────────────────────

let messagesFilter = 'all';

function renderMessages() {
  const unreadCount = MESSAGES.filter(m => !m.read).length;

  return `
    <div class="page-header">
      <div>
        <div class="page-title">Messages</div>
        <div class="page-subtitle">Notifications and announcements</div>
      </div>
    </div>

    <div class="stats-row" style="grid-template-columns:repeat(3,1fr);">
      <div class="stat-card animate-in">
        <div class="stat-card__header">
          <div class="stat-card__icon stat-card__icon--amber">${icon('mail')}</div>
        </div>
        <div class="stat-card__value">${unreadCount}</div>
        <div class="stat-card__label">Unread</div>
      </div>
      <div class="stat-card animate-in">
        <div class="stat-card__header">
          <div class="stat-card__icon stat-card__icon--blue">${icon('bell')}</div>
        </div>
        <div class="stat-card__value">${MESSAGES.filter(m => m.type === 'notification').length}</div>
        <div class="stat-card__label">Notifications</div>
      </div>
      <div class="stat-card animate-in">
        <div class="stat-card__header">
          <div class="stat-card__icon stat-card__icon--green">${icon('messageSquare')}</div>
        </div>
        <div class="stat-card__value">${MESSAGES.filter(m => m.type === 'announcement').length}</div>
        <div class="stat-card__label">Announcements</div>
      </div>
    </div>

    <div class="filters">
      <span class="filter-chip active" onclick="filterMessages(this,'all')">All</span>
      <span class="filter-chip" onclick="filterMessages(this,'unread')">Unread</span>
      <span class="filter-chip" onclick="filterMessages(this,'notification')">Notifications</span>
      <span class="filter-chip" onclick="filterMessages(this,'announcement')">Announcements</span>
    </div>

    <div class="card animate-in">
      <div id="messagesList">
        ${MESSAGES.map(msg => `
          <div class="message-item" data-msg-id="${msg.id}" data-msg-type="${msg.type}" data-msg-read="${msg.read}" onclick="toggleMessage('${msg.id}')" style="padding:16px 20px;border-bottom:1px solid var(--gray-100);cursor:pointer;transition:background 0.15s;">
            <div style="display:flex;align-items:flex-start;gap:12px;">
              ${!msg.read ? '<div style="width:8px;height:8px;border-radius:50%;background:var(--green-500);margin-top:6px;flex-shrink:0;"></div>' : '<div style="width:8px;height:8px;margin-top:6px;flex-shrink:0;"></div>'}
              <div style="flex:1;min-width:0;">
                <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:4px;">
                  <div style="font-weight:${msg.read ? '400' : '600'};color:var(--gray-900);overflow:hidden;text-overflow:ellipsis;white-space:nowrap;">${msg.subject}</div>
                  <div style="font-size:0.72rem;color:var(--gray-400);flex-shrink:0;margin-left:12px;font-family:'JetBrains Mono',monospace;">${msg.date}</div>
                </div>
                <div style="display:flex;align-items:center;gap:8px;font-size:0.8rem;color:var(--gray-400);">
                  <span>${msg.from}</span>
                  <span class="badge-plain badge-plain--${msg.type === 'notification' ? 'blue' : 'green'}" style="font-size:11px">${msg.type === 'notification' ? 'Notification' : 'Announcement'}</span>
                </div>
                <div class="message-body" id="msgBody-${msg.id}" style="display:none;margin-top:10px;padding:12px;background:var(--gray-25);border-radius:8px;font-size:0.82rem;color:var(--gray-600);line-height:1.6;">
                  ${msg.body}
                </div>
              </div>
            </div>
          </div>
        `).join('')}
      </div>
    </div>
  `;
}

window.toggleMessage = function(id) {
  const body = document.getElementById('msgBody-' + id);
  if (body) {
    body.style.display = body.style.display === 'none' ? 'block' : 'none';
  }
};

window.filterMessages = function(el, filter) {
  el.parentElement.querySelectorAll('.filter-chip').forEach(c => c.classList.remove('active'));
  el.classList.add('active');
  document.querySelectorAll('.message-item').forEach(item => {
    const type = item.dataset.msgType;
    const read = item.dataset.msgRead === 'true';
    let show = true;
    if (filter === 'unread') show = !read;
    else if (filter === 'notification') show = type === 'notification';
    else if (filter === 'announcement') show = type === 'announcement';
    item.style.display = show ? '' : 'none';
  });
};

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

// ── Employee Detail Modal ───────────────────────────────────

window.showEmployeeDetail = function(id) {
  const m = TEAM_MEMBERS.find(e => e.id === id);
  if (!m) return;
  const initials = m.name.split(' ').map(n => n[0]).join('');
  const body = `
    <div class="profile-header" style="margin-bottom:16px">
      <div class="profile-avatar">${initials}</div>
      <div>
        <div class="profile-info__name">${m.name}</div>
        <div class="profile-info__role">${m.designation} \u00b7 ${m.department}</div>
        <div class="profile-info__id">${m.id}</div>
      </div>
    </div>
    <div class="detail-info-grid">
      <div class="detail-info-item">
        <div class="detail-info-item__label">Email</div>
        <div class="detail-info-item__value" style="color:var(--green-600)">${m.email}</div>
      </div>
      <div class="detail-info-item">
        <div class="detail-info-item__label">Country</div>
        <div class="detail-info-item__value">${m.country}</div>
      </div>
      <div class="detail-info-item">
        <div class="detail-info-item__label">Type</div>
        <div class="detail-info-item__value">${m.type}</div>
      </div>
      <div class="detail-info-item">
        <div class="detail-info-item__label">Join Date</div>
        <div class="detail-info-item__value" style="font-family:'JetBrains Mono',monospace">${m.joinDate}</div>
      </div>
      <div class="detail-info-item">
        <div class="detail-info-item__label">Status</div>
        <div class="detail-info-item__value"><span class="badge badge--${statusClass(m.status)}">${m.status}</span></div>
      </div>
    </div>
  `;
  const footer = `<button class="btn btn--secondary" onclick="closeModal()">Close</button>`;
  openModal('Employee \u2014 ' + m.name, body, footer);
};

// ── Service Detail Modal ────────────────────────────────────

window.showServiceDetail = function(id) {
  const s = SERVICES.find(x => x.id === id);
  if (!s) return;
  const stages = ['Eligibility', 'Documents', 'Contract Review', 'Offer Letter', 'Completed'];
  const body = `
    <div class="detail-info-grid" style="margin-bottom:16px">
      <div class="detail-info-item">
        <div class="detail-info-item__label">Title</div>
        <div class="detail-info-item__value">${s.title}</div>
      </div>
      <div class="detail-info-item">
        <div class="detail-info-item__label">Type</div>
        <div class="detail-info-item__value">${serviceTypeLabel(s.type)}</div>
      </div>
      <div class="detail-info-item">
        <div class="detail-info-item__label">Employee</div>
        <div class="detail-info-item__value">${s.employee}</div>
      </div>
      <div class="detail-info-item">
        <div class="detail-info-item__label">Country</div>
        <div class="detail-info-item__value">${s.country}</div>
      </div>
      <div class="detail-info-item">
        <div class="detail-info-item__label">Status</div>
        <div class="detail-info-item__value"><span class="badge badge--${statusClass(s.status)}">${serviceStatusLabel(s.status)}</span></div>
      </div>
      <div class="detail-info-item">
        <div class="detail-info-item__label">Created</div>
        <div class="detail-info-item__value" style="font-family:'JetBrains Mono',monospace">${s.createdAt}</div>
      </div>
    </div>

    <div class="section-title" style="margin-bottom:8px">Progress</div>
    <div style="margin-bottom:16px">
      <div class="progress-bar"><div class="progress-bar__fill" style="width:${s.progress}%"></div></div>
      <div style="text-align:right;font-size:0.72rem;color:var(--gray-400);margin-top:4px">Stage ${s.stage} of ${s.totalStages}</div>
    </div>

    <div class="section-title" style="margin-bottom:8px">Stage Tracking</div>
    <div class="approval-flow">
      ${stages.map((st, i) => {
        const state = i < s.stage - 1 ? 'done' : i === s.stage - 1 ? (s.status === 'Completed' ? 'done' : 'current') : 'pending';
        const stepIcons = { done: '\u2713', current: '\u23f3', pending: '\u00b7' };
        return `
          <div class="approval-step step--${state}">
            <div class="approval-step__icon">${stepIcons[state]}</div>
            <div class="approval-step__content">
              <div class="approval-step__title">${st}</div>
            </div>
          </div>`;
      }).join('')}
    </div>
  `;
  const footer = `
    ${s.status !== 'Completed' ? '<button class="btn btn--secondary" style="color:var(--red-500);border-color:var(--red-500);" onclick="closeModal()">Cancel Service</button>' : ''}
    <button class="btn btn--secondary" onclick="closeModal()">Close</button>
  `;
  openModal('Service \u2014 ' + s.id, body, footer, true);
};

// ── Expandable Row Toggle Helper ────────────────────────────

function toggleExpandRow(triggerRow, id, colSpan, contentHtml) {
  const existing = triggerRow.nextElementSibling;
  if (existing && existing.classList.contains('expand-detail-row') && existing.dataset.detailId === id) {
    existing.remove();
    triggerRow.classList.remove('expanded');
    return;
  }
  triggerRow.classList.add('expanded');
  const detailRow = document.createElement('tr');
  detailRow.className = 'expand-detail-row';
  detailRow.dataset.detailId = id;
  detailRow.dataset.status = triggerRow.dataset.status || '';
  detailRow.innerHTML = `<td colspan="${colSpan}"><div class="expand-detail-content">${contentHtml}</div></td>`;
  triggerRow.after(detailRow);
}

// ── Leave Detail (inline expand) ────────────────────────────

window.toggleLeaveDetail = function(id, triggerRow) {
  const lr = LEAVE_REQUESTS.find(l => l.id === id);
  if (!lr) return;
  if (triggerRow.classList.contains('expanded')) {
    const next = triggerRow.nextElementSibling;
    if (next && next.classList.contains('expand-detail-row')) next.remove();
    triggerRow.classList.remove('expanded');
    return;
  }
  const flow = APPROVAL_FLOWS[id] || [
    { step: 'Submitted', actor: EMPLOYEE.name, role: 'Employee', time: lr.from, status: 'done', comment: '' },
    { step: 'Manager Approval', actor: lr.approver, role: 'Direct Manager', time: '', status: lr.status === 'Approved' ? 'done' : (lr.status === 'Pending' ? 'current' : 'pending'), comment: '' },
  ];
  const canRevoke = lr.status === 'Pending';
  const canCancel = lr.status === 'Draft';

  const content = `
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
          <div class="detail-info-item__label">Half Day</div>
          <div class="detail-info-item__value">${lr.halfDay}</div>
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
    <div class="detail-section">
      <div class="detail-section__title">Approval Flow</div>
      ${renderApprovalFlow(flow)}
    </div>
    ${(canRevoke || canCancel) ? `
    <div class="action-bar">
      <div class="action-bar__spacer"></div>
      ${canCancel ? `<button class="btn btn--secondary">Delete Draft</button>
      <button class="btn btn--primary">Submit for Approval</button>` : ''}
      ${canRevoke ? `<button class="btn btn--secondary" style="color:var(--red-500);border-color:var(--red-500);">Revoke Request</button>` : ''}
    </div>` : ''}
  `;
  toggleExpandRow(triggerRow, id, 9, content);
};

// ── Salary Detail (inline expand) ───────────────────────────

window.toggleSalaryDetail = function(id, triggerRow) {
  const slip = SALARY_SLIPS.find(s => s.id === id);
  if (!slip) return;
  if (triggerRow.classList.contains('expanded')) {
    const next = triggerRow.nextElementSibling;
    if (next && next.classList.contains('expand-detail-row')) next.remove();
    triggerRow.classList.remove('expanded');
    return;
  }

  const content = `
    <div class="detail-section">
      <div class="detail-section__title">Salary Breakdown — ${slip.period}</div>
      <div class="grid-2">
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
            <span class="salary-total__value" style="color:var(--green-600)">${formatCurrency(SALARY_DETAIL.earnings.reduce((s, e) => s + e.amount, 0))}</span>
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
            <span class="salary-total__value" style="color:var(--red-500)">${formatCurrency(SALARY_DETAIL.deductions.reduce((s, d) => s + d.amount, 0))}</span>
          </div>
        </div>
      </div>
      <div class="net-pay-bar">
        <div class="net-pay-bar__label">Net Pay</div>
        <div class="net-pay-bar__value">${formatCurrency(slip.net)}</div>
      </div>
    </div>
  `;
  toggleExpandRow(triggerRow, id, 7, content);
};

// ── Expense Detail (inline expand) ──────────────────────────

window.toggleExpenseDetail = function(id, triggerRow) {
  const ex = EXPENSES.find(e => e.id === id);
  if (!ex) return;
  if (triggerRow.classList.contains('expanded')) {
    const next = triggerRow.nextElementSibling;
    if (next && next.classList.contains('expand-detail-row')) next.remove();
    triggerRow.classList.remove('expanded');
    return;
  }
  const flow = EXPENSE_APPROVAL_FLOWS[id] || [
    { step: 'Submitted', actor: EMPLOYEE.name, role: 'Employee', time: ex.date, status: 'done', comment: '' },
    { step: 'Manager Approval', actor: 'Li Wei', role: 'Direct Manager', time: '', status: ex.status === 'Approved' ? 'done' : (ex.status === 'Pending' ? 'current' : 'pending'), comment: '' },
    { step: 'Finance Review', actor: 'Chen Fang', role: 'Finance', time: '', status: 'pending', comment: '' },
  ];
  const canCancel = ex.status === 'Draft';

  const content = `
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
    <div class="detail-section">
      <div class="detail-section__title">Approval Flow</div>
      ${renderApprovalFlow(flow)}
    </div>
    ${canCancel ? `
    <div class="action-bar">
      <div class="action-bar__spacer"></div>
      <button class="btn btn--secondary">Delete Draft</button>
      <button class="btn btn--primary">Submit for Approval</button>
    </div>` : ''}
  `;
  toggleExpandRow(triggerRow, id, 8, content);
};

// ── Ticket Detail View ──────────────────────────────────────

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
              <div class="detail-info-item__value">${categoryLabel(ticket.category)}</div>
            </div>
            <div class="detail-info-item">
              <div class="detail-info-item__label">Priority</div>
              <div class="detail-info-item__value"><span class="badge-plain ${priorityBadgeClass(ticket.priority)}">${priorityLabel(ticket.priority)}</span></div>
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
          <div class="detail-section__title">Comments</div>
          ${TICKET_COMMENTS.map(c => `
            <div class="comment-item">
              <div class="comment-item__header">
                <span class="comment-item__author">${c.author}</span>
                <span class="comment-item__time">${c.time}</span>
              </div>
              <div class="comment-item__body">${c.body}</div>
            </div>
          `).join('')}
          <div style="margin-top:12px">
            <textarea class="form-textarea" style="min-height:60px" placeholder="Add a comment..."></textarea>
            <div style="margin-top:8px;text-align:right">
              <button class="btn btn--primary btn--sm">Post Comment</button>
            </div>
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

// ── Interactive Functions ────────────────────────────────────

window.filterTable = function(el, tableId, status) {
  el.parentElement.querySelectorAll('.filter-chip').forEach(c => c.classList.remove('active'));
  el.classList.add('active');
  document.querySelectorAll(`#${tableId} tbody tr`).forEach(tr => {
    if (tr.classList.contains('expand-detail-row')) {
      // Detail rows follow their parent trigger row's visibility
      tr.style.display = (status === 'all' || tr.dataset.status === status) ? '' : 'none';
    } else {
      const show = status === 'all' || tr.dataset.status === status;
      tr.style.display = show ? '' : 'none';
      // Collapse hidden rows' expanded details
      if (!show && tr.classList.contains('expanded')) {
        tr.classList.remove('expanded');
        const next = tr.nextElementSibling;
        if (next && next.classList.contains('expand-detail-row')) next.remove();
      }
    }
  });
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

// ── Edit Profile Modal ─────────────────────────────────────

window.openEditProfileModal = function() {
  const body = `
    <div class="form-row">
      <div class="form-group">
        <label class="form-label">Full Name</label>
        <input class="form-input" id="editName" value="${EMPLOYEE.name}" />
      </div>
      <div class="form-group">
        <label class="form-label">Gender</label>
        <select class="form-select" id="editGender">
          <option ${EMPLOYEE.gender === 'Male' ? 'selected' : ''}>Male</option>
          <option ${EMPLOYEE.gender === 'Female' ? 'selected' : ''}>Female</option>
          <option ${EMPLOYEE.gender === 'Other' ? 'selected' : ''}>Other</option>
        </select>
      </div>
    </div>
    <div class="form-row">
      <div class="form-group">
        <label class="form-label">Date of Birth</label>
        <input class="form-input" type="date" id="editDob" value="${EMPLOYEE.dob}" />
      </div>
      <div class="form-group">
        <label class="form-label">Nationality</label>
        <input class="form-input" id="editNationality" value="${EMPLOYEE.nationality}" />
      </div>
    </div>
    <div class="form-row">
      <div class="form-group">
        <label class="form-label">Email</label>
        <input class="form-input" type="email" id="editEmail" value="${EMPLOYEE.email}" />
      </div>
      <div class="form-group">
        <label class="form-label">Phone</label>
        <input class="form-input" id="editPhone" value="${EMPLOYEE.phone}" />
      </div>
    </div>
    <div class="form-row">
      <div class="form-group">
        <label class="form-label">Location</label>
        <input class="form-input" id="editLocation" value="${EMPLOYEE.location}" />
      </div>
      <div class="form-group">
        <label class="form-label">ID Type</label>
        <input class="form-input" id="editIdType" value="${EMPLOYEE.idType}" />
      </div>
    </div>
  `;
  const footer = `
    <button class="btn btn--secondary" onclick="closeModal()">Cancel</button>
    <button class="btn btn--primary" onclick="saveProfileEdits()">Save Changes</button>
  `;
  openModal('Edit Profile', body, footer);
};

window.saveProfileEdits = function() {
  EMPLOYEE.name = document.getElementById('editName').value.trim() || EMPLOYEE.name;
  EMPLOYEE.gender = document.getElementById('editGender').value;
  EMPLOYEE.dob = document.getElementById('editDob').value || EMPLOYEE.dob;
  EMPLOYEE.nationality = document.getElementById('editNationality').value.trim() || EMPLOYEE.nationality;
  EMPLOYEE.email = document.getElementById('editEmail').value.trim() || EMPLOYEE.email;
  EMPLOYEE.phone = document.getElementById('editPhone').value.trim() || EMPLOYEE.phone;
  EMPLOYEE.location = document.getElementById('editLocation').value.trim() || EMPLOYEE.location;
  EMPLOYEE.idType = document.getElementById('editIdType').value.trim() || EMPLOYEE.idType;

  // Update initials from name
  const parts = EMPLOYEE.name.split(' ');
  EMPLOYEE.initials = parts.map(function(p) { return p[0]; }).join('').toUpperCase().slice(0, 2);

  closeModal();

  // Re-render profile page
  var content = document.getElementById('appContent');
  if (content) {
    content.innerHTML = renderProfile();
  }

  showToast('Profile updated successfully');
};

// ── Copy to Clipboard ──────────────────────────────────────

window.copyToClipboard = function(text, el) {
  navigator.clipboard.writeText(text).then(function() {
    showToast('Copied to clipboard');
    if (el) {
      el.classList.add('copied');
      setTimeout(function() { el.classList.remove('copied'); }, 1500);
    }
  });
};

// ── Toast Notification ─────────────────────────────────────

function showToast(message) {
  var existing = document.getElementById('appToast');
  if (existing) existing.remove();

  var toast = document.createElement('div');
  toast.id = 'appToast';
  toast.className = 'toast';
  toast.textContent = message;
  document.body.appendChild(toast);

  // Trigger reflow then show
  toast.offsetHeight;
  toast.classList.add('show');

  setTimeout(function() {
    toast.classList.remove('show');
    setTimeout(function() { toast.remove(); }, 300);
  }, 2000);
}

// ── Onboard Type Select ─────────────────────────────────────

window.openOnboardSelect = function() {
  const body = `
    <div style="display:flex;gap:16px">
      <div style="flex:1;padding:24px;border:1px solid var(--gray-200);border-radius:12px;cursor:pointer;text-align:center;transition:border-color 0.2s" onmouseover="this.style.borderColor='var(--green-500)'" onmouseout="this.style.borderColor='var(--gray-200)'" onclick="closeModal()">
        <div style="margin-bottom:10px">${icon('users', 32)}</div>
        <div style="font-weight:600;color:var(--gray-900);margin-bottom:4px">Employee</div>
        <div style="font-size:13px;color:var(--gray-400)">Full-time or part-time employee</div>
      </div>
      <div style="flex:1;padding:24px;border:1px solid var(--gray-200);border-radius:12px;cursor:pointer;text-align:center;transition:border-color 0.2s" onmouseover="this.style.borderColor='var(--green-500)'" onmouseout="this.style.borderColor='var(--gray-200)'" onclick="closeModal()">
        <div style="margin-bottom:10px">${icon('receipt', 32)}</div>
        <div style="font-weight:600;color:var(--gray-900);margin-bottom:4px">Contractor</div>
        <div style="font-size:13px;color:var(--gray-400)">Independent contractor</div>
      </div>
    </div>
  `;
  openModal('Select Employee Type', body, null);
};

// ── Leave Apply Form ────────────────────────────────────────

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

// ── Expense Apply Form ──────────────────────────────────────

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

// ── Ticket Create Form (Customer categories/priorities: P0-P3) ─

window.openTicketForm = function() {
  const body = `
    <div class="form-row">
      <div class="form-group">
        <label class="form-label">Category</label>
        <select class="form-select">
          <option value="">Select category...</option>
          <option value="CONSULTATION">Consultation</option>
          <option value="IT_SUPPORT">IT Support</option>
          <option value="COMPLAINT">Complaint</option>
          <option value="REPAIR">Repair</option>
          <option value="SUGGESTION">Suggestion</option>
        </select>
      </div>
      <div class="form-group">
        <label class="form-label">Priority</label>
        <select class="form-select">
          <option value="P3">P3 \u2014 Low</option>
          <option value="P2">P2 \u2014 Medium</option>
          <option value="P1">P1 \u2014 High</option>
          <option value="P0">P0 \u2014 Urgent</option>
        </select>
      </div>
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

// ── Login / Forgot / Reset Password ─────────────────────────

let loginView = 'login';

const RAMPINGUP_LOGO_SVG = '<svg width="32" height="32" viewBox="80 46 82 82" fill="none"><rect x="80" y="46" width="82" height="82" rx="10" fill="#1a1d23"/><path d="M110.39,71.82c.85,0,1.42.88,1.06,1.66l-4.55,9.9-.06.13-.67,1.46-6.4,13.93c-.19.42-.61.68-1.06.68h-10.58c-.85,0-1.42-.88-1.06-1.66l5.95-12.96.67-1.46,5.06-11.01c.19-.41.61-.68,1.06-.68h10.58Z" fill="#fff"/><path d="M151.2,83.51h-10.58c-.46,0-.87-.27-1.06-.68l-4.3-9.35c-.36-.77.21-1.66,1.06-1.66h10.58c.46,0,.87.27,1.06.68l4.3,9.35c.36.77-.21,1.66-1.06,1.66Z" fill="#47fa22"/><path d="M126.07,73.48l-4.3,9.35c-.19.41-.61.68-1.06.68h-10.58c-.85,0-1.42-.88-1.06-1.66l4.3-9.35c.19-.41.61-.68,1.06-.68h10.58c.85,0,1.42.88,1.06,1.66Z" fill="#fff"/><path d="M125.69,99.59h-10.59c-.46,0-.87-.27-1.06-.68l-5.64-12.28c-.36-.77.21-1.66,1.06-1.66h10.59c.46,0,.87.27,1.06.68l5.64,12.28c.36.77-.21,1.66-1.06,1.66Z" fill="#fff"/><path d="M152.93,86.63l-5.64,12.28c-.19.42-.61.68-1.06.68h-10.58c-.85,0-1.42-.88-1.06-1.66l5.64-12.28c.19-.42.61-.68,1.06-.68h10.58c.85,0,1.42.88,1.06,1.66Z" fill="#47fa22"/></svg>';

function renderLoginScreen() {
  if (loginView === 'forgot') return renderForgotPassword();
  if (loginView === 'reset') return renderResetPassword();
  return `
    <div class="login-screen">
      <div class="login-card">
        <div class="login-logo">
          ${RAMPINGUP_LOGO_SVG}
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
          <input class="form-input" type="password" value="\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022">
        </div>
        <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:18px">
          <label class="form-check" style="margin:0"><input type="checkbox" checked> Remember me</label>
          <a style="font-size:0.75rem;color:var(--green-600);cursor:pointer" onclick="switchLoginView('forgot')">Forgot password?</a>
        </div>
        <button class="btn btn--primary btn--block btn--lg" onclick="doLogin()">Sign In</button>
        <div class="login-divider">or continue with</div>
        <div style="display:flex;gap:8px">
          <button class="btn btn--secondary" style="flex:1">Feishu</button>
          <button class="btn btn--secondary" style="flex:1">SSO</button>
        </div>
        <div class="login-footer">New employee? <a onclick="showOnboarding()">Complete onboarding</a></div>
      </div>
    </div>
  `;
}

function renderForgotPassword() {
  return `
    <div class="login-screen">
      <div class="login-card">
        <div class="login-logo">
          ${RAMPINGUP_LOGO_SVG}
          <span class="login-logo__text">RampingUp</span>
        </div>
        <div class="login-title">Forgot Password</div>
        <div class="login-subtitle">Enter your email and we'll send a reset link</div>
        <div class="form-group">
          <label class="form-label">Email</label>
          <input class="form-input" type="email" placeholder="you@company.com">
        </div>
        <button class="btn btn--primary btn--block btn--lg" onclick="switchLoginView('reset')">Send Reset Link</button>
        <div class="login-footer"><a onclick="switchLoginView('login')">Back to Sign In</a></div>
      </div>
    </div>
  `;
}

function renderResetPassword() {
  return `
    <div class="login-screen">
      <div class="login-card">
        <div class="login-logo">
          ${RAMPINGUP_LOGO_SVG}
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
        <button class="btn btn--primary btn--block btn--lg" onclick="switchLoginView('login')">Reset Password</button>
        <div class="login-footer"><a onclick="switchLoginView('login')">Back to Sign In</a></div>
      </div>
    </div>
  `;
}

window.switchLoginView = function(v) {
  loginView = v;
  const c = document.getElementById('loginContainer');
  if (c) c.innerHTML = renderLoginScreen();
};

window.doLogin = function() {
  const c = document.getElementById('loginContainer');
  if (c) {
    c.style.transition = 'opacity 0.3s ease';
    c.style.opacity = '0';
    setTimeout(() => c.remove(), 300);
  }
};

window.showLoginScreen = function() {
  loginView = 'login';
  const existing = document.getElementById('loginContainer');
  if (existing) existing.remove();
  const d = document.createElement('div');
  d.id = 'loginContainer';
  d.style.cssText = 'position:fixed;inset:0;z-index:200;';
  d.innerHTML = renderLoginScreen();
  document.body.appendChild(d);
};

// ── Onboarding (6-step wizard matching Customer) ────────────

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
  return `
    <div class="ob-progress">
      ${OB_STEPS.map((s, i) => {
        const done = obStep > s.num;
        const active = obStep === s.num;
        const cls = done ? 'done' : active ? 'active' : '';
        const chk = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" width="14" height="14"><path d="M20 6L9 17l-5-5"/></svg>';
        return `
          <div class="ob-step">
            <div class="ob-step__circle ${cls}">
              ${done ? chk : s.num}
              <span class="ob-step__label">${s.label}</span>
            </div>
            ${i < OB_STEPS.length - 1 ? `<div class="ob-step__line ${done ? 'done' : ''}"></div>` : ''}
          </div>`;
      }).join('')}
    </div>
  `;
}

function uploadArea(label, hint) {
  return `
    <div class="upload-area">
      <div class="upload-area__icon">${icon('upload', 28)}</div>
      <div class="upload-area__text">${label}</div>
      <div class="upload-area__hint">${hint}</div>
    </div>
  `;
}

function renderObStepContent() {
  if (obStep > OB_TOTAL) return `
    <div class="ob-card">
      <div class="ob-end">
        <div class="ob-end__icon">${icon('check', 48)}</div>
        <div class="ob-end__title">Onboarding Complete!</div>
        <div class="ob-end__desc">Your information has been submitted for review. You will receive a confirmation email once your account is fully activated.</div>
        <button class="btn btn--primary" onclick="closeOnboarding()">Go to Portal</button>
      </div>
    </div>
  `;

  const step = OB_STEPS[obStep - 1];
  let fields = '';

  switch (obStep) {
    case 1:
      fields = `
        <div class="grid-2 mb-4">
          <div>${uploadArea('Upload ID Card (Front)', 'JPG, PNG \u2014 max 5MB')}</div>
          <div>${uploadArea('Upload ID Card (Back)', 'JPG, PNG \u2014 max 5MB')}</div>
        </div>
        <div class="detail-grid">
          <div class="form-group"><label class="form-label">Full Name *</label><input class="form-input" value="${EMPLOYEE.name}"></div>
          <div class="form-group"><label class="form-label">Gender *</label><select class="form-select"><option>Male</option><option>Female</option></select></div>
          <div class="form-group"><label class="form-label">Date of Birth *</label><input class="form-input" type="date" value="1995-06-20"></div>
          <div class="form-group"><label class="form-label">ID Number *</label><input class="form-input" placeholder="Identification number"></div>
          <div class="form-group"><label class="form-label">Phone *</label><input class="form-input" value="${EMPLOYEE.phone}"></div>
          <div class="form-group"><label class="form-label">Email *</label><input class="form-input" value="${EMPLOYEE.email}"></div>
        </div>
      `;
      break;
    case 2:
      fields = `
        <div class="grid-2 mb-4">
          <div>${uploadArea('Graduation Certificate', 'JPG, PNG, PDF')}</div>
          <div>${uploadArea('Degree Certificate', 'JPG, PNG, PDF')}</div>
        </div>
        <div class="detail-grid">
          <div class="form-group"><label class="form-label">Highest Education *</label><select class="form-select"><option>Bachelor</option><option>Master</option><option>PhD</option></select></div>
          <div class="form-group"><label class="form-label">Institution *</label><input class="form-input" placeholder="University name"></div>
          <div class="form-group"><label class="form-label">Major *</label><input class="form-input" placeholder="Field of study"></div>
          <div class="form-group"><label class="form-label">Graduation Date *</label><input class="form-input" type="date"></div>
        </div>
      `;
      break;
    case 3:
      fields = `
        <div class="mb-4">${uploadArea('Resignation Letter (if applicable)', 'JPG, PNG, PDF')}</div>
        <div class="section-title" style="margin-top:14px">Most Recent Employment</div>
        <div class="detail-grid">
          <div class="form-group"><label class="form-label">Company</label><input class="form-input" placeholder="Previous employer"></div>
          <div class="form-group"><label class="form-label">Job Title</label><input class="form-input" placeholder="Position"></div>
          <div class="form-group"><label class="form-label">Start Date</label><input class="form-input" type="date"></div>
          <div class="form-group"><label class="form-label">End Date</label><input class="form-input" type="date"></div>
        </div>
      `;
      break;
    case 4:
      fields = `
        <div class="detail-grid">
          <div class="form-group"><label class="form-label">Bank Name *</label><select class="form-select"><option>China Merchants Bank</option><option>ICBC</option><option>Bank of China</option></select></div>
          <div class="form-group"><label class="form-label">Account Number *</label><input class="form-input" placeholder="Bank account"></div>
          <div class="form-group"><label class="form-label">Branch</label><input class="form-input" placeholder="Branch name"></div>
          <div class="form-group"><label class="form-label">Account Holder *</label><input class="form-input" value="${EMPLOYEE.name}"></div>
        </div>
      `;
      break;
    case 5:
      fields = `
        <div class="detail-grid">
          <div class="form-group"><label class="form-label">Household Type *</label><select class="form-select"><option>Urban</option><option>Rural</option></select></div>
          <div class="form-group"><label class="form-label">Household Location *</label><input class="form-input" placeholder="Province / City"></div>
          <div class="form-group"><label class="form-label">Social Insurance Base</label><input class="form-input" placeholder="Monthly amount (\u00a5)"></div>
          <div class="form-group"><label class="form-label">Housing Fund Base</label><input class="form-input" placeholder="Monthly amount (\u00a5)"></div>
        </div>
        <div class="section-title" style="margin-top:16px">Emergency Contact</div>
        <div class="detail-grid">
          <div class="form-group"><label class="form-label">Name *</label><input class="form-input" placeholder="Full name"></div>
          <div class="form-group"><label class="form-label">Relationship *</label><select class="form-select"><option>Spouse</option><option>Parent</option><option>Sibling</option></select></div>
          <div class="form-group"><label class="form-label">Phone *</label><input class="form-input" placeholder="Phone number"></div>
        </div>
      `;
      break;
    case 6:
      fields = `
        <div style="padding:8px 0">
          <div class="section-title">Personal</div>
          <div class="detail-grid mb-4">
            <div class="detail-item"><div class="detail-item__label">Name</div><div class="detail-item__value">${EMPLOYEE.name}</div></div>
            <div class="detail-item"><div class="detail-item__label">Email</div><div class="detail-item__value" style="color:var(--green-600)">${EMPLOYEE.email}</div></div>
          </div>
          <div class="section-title">Bank Info</div>
          <div class="detail-grid mb-4">
            <div class="detail-item"><div class="detail-item__label">Bank</div><div class="detail-item__value">${EMPLOYEE.bankName}</div></div>
            <div class="detail-item"><div class="detail-item__label">Account</div><div class="detail-item__value" style="color:var(--green-600);font-family:'JetBrains Mono',monospace">${EMPLOYEE.bankAccount}</div></div>
          </div>
          <label class="form-check"><input type="checkbox"> I confirm all information is accurate and complete.</label>
        </div>
      `;
      break;
  }

  return `
    <div class="ob-card" style="animation:fadeInUp 0.3s ease">
      <div class="ob-card__title">${step.title}</div>
      ${fields}
    </div>
    <div class="ob-nav">
      <div class="ob-nav__step">Step ${obStep} of ${OB_TOTAL}</div>
      <div style="display:flex;gap:8px">
        ${obStep > 1 ? '<button class="btn btn--secondary" onclick="obPrev()">Previous</button>' : ''}
        <button class="btn btn--primary" onclick="obNext()">${obStep === OB_TOTAL ? 'Submit' : 'Next'}</button>
      </div>
    </div>
  `;
}

function renderOnboardingScreen() {
  return `
    <div class="onboarding-screen" id="onboardingScreen">
      <div class="onboarding-container">
        <div class="onboarding-header">
          <div class="login-logo" style="justify-content:center;margin-bottom:16px">
            ${RAMPINGUP_LOGO_SVG}
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
  const p = document.querySelector('.ob-progress');
  if (p && obStep <= OB_TOTAL) p.outerHTML = renderObProgress();
  else if (p && obStep > OB_TOTAL) p.remove();
};

window.obPrev = function() {
  if (obStep > 1) {
    obStep--;
    document.getElementById('obContent').innerHTML = renderObStepContent();
    const p = document.querySelector('.ob-progress');
    if (p) p.outerHTML = renderObProgress();
  }
};

window.showOnboarding = function() {
  obStep = 1;
  const l = document.getElementById('loginContainer');
  if (l) l.remove();
  const d = document.createElement('div');
  d.id = 'onboardingContainer';
  d.style.cssText = 'position:fixed;inset:0;z-index:200;overflow-y:auto;';
  d.innerHTML = renderOnboardingScreen();
  document.body.appendChild(d);
};

window.closeOnboarding = function() {
  const c = document.getElementById('onboardingContainer');
  if (c) {
    c.style.transition = 'opacity 0.3s ease';
    c.style.opacity = '0';
    setTimeout(() => c.remove(), 300);
  }
};

// ── Router ──────────────────────────────────────────────────

const ROUTES = {
  '/': { render: renderDashboard, title: 'Dashboard', crumb: 'Dashboard' },
  '/team': { render: renderTeam, title: 'Employees', crumb: 'Employees' },
  '/services': { render: renderServices, title: 'Service Progress', crumb: 'Service Progress' },
  '/leave': { render: renderLeave, title: 'Leave', crumb: 'Leave Management' },
  '/holidays': { render: renderHolidays, title: 'Holidays', crumb: 'Holiday List' },
  '/time-off': { render: renderTimeOff, title: 'Time Off', crumb: 'Time Off' },
  '/leave-type': { render: renderLeaveType, title: 'Leave Types', crumb: 'Leave Types' },
  '/leave-policy': { render: renderLeavePolicy, title: 'Leave Policies', crumb: 'Leave Policies' },
  '/leave-period': { render: renderLeavePeriod, title: 'Leave Periods', crumb: 'Leave Periods' },
  '/leave-allocation': { render: renderLeaveAllocation, title: 'Leave Allocations', crumb: 'Leave Allocations' },
  '/leave-policy-assignment': { render: renderLeavePolicyAssignment, title: 'Policy Assignments', crumb: 'Leave Policy Assignments' },
  '/leave-approval-flow': { render: renderLeaveApprovalFlow, title: 'Leave Approval', crumb: 'Leave Approval Flows' },
  '/salary': { render: renderSalary, title: 'Salary', crumb: 'Salary Slips' },
  '/expenses': { render: renderExpenses, title: 'Expenses', crumb: 'Expenses' },
  '/expense-approval-flow': { render: renderExpenseApprovalFlow, title: 'Expense Approval', crumb: 'Expense Approval Flows' },
  '/tickets': { render: renderTickets, title: 'Tickets', crumb: 'Support Tickets' },
  '/messages': { render: renderMessages, title: 'Messages', crumb: 'Messages' },
  '/organization': { render: renderOrganization, title: 'Organization', crumb: 'Organization' },
  '/contract': { render: renderContract, title: 'Contract', crumb: 'Contract' },
  '/wallet': { render: renderWallet, title: 'Wallet', crumb: 'E-Wallet' },
  '/profile': { render: renderProfile, title: 'Profile', crumb: 'My Profile' },
  '/login': { render: function() { showLoginScreen(); return ''; }, title: 'Login', crumb: 'Login' },
  '/onboarding': { render: function() { showOnboarding(); return ''; }, title: 'Onboarding', crumb: 'Onboarding' },
};

function navigate() {
  const hash = window.location.hash.slice(1) || '/';
  const route = ROUTES[hash] || ROUTES['/'];

  // Special routes that overlay the app
  if (hash === '/login') { showLoginScreen(); return; }
  if (hash === '/onboarding') { showOnboarding(); return; }

  const content = document.getElementById('appContent');
  if (content) {
    content.innerHTML = route.render();
    content.scrollTop = 0;
  }

  // Update active nav item
  document.querySelectorAll('.nav-item').forEach(item => {
    item.classList.toggle('active', item.dataset.route === hash);
  });

  // Update breadcrumb
  const crumb = document.getElementById('breadcrumb');
  if (crumb) {
    crumb.innerHTML = `
      <span>Employee Portal</span>
      <span style="color:var(--gray-300)">${icon('chevronRight', 14)}</span>
      <span class="breadcrumb__current">${route.crumb}</span>
    `;
  }

  // Close mobile sidebar
  const sidebar = document.querySelector('.sidebar');
  const overlay = document.querySelector('.overlay');
  if (sidebar) sidebar.classList.remove('open');
  if (overlay) overlay.classList.remove('show');
}

// ── Sidebar Toggle ──────────────────────────────────────────

window.toggleSidebar = function() {
  const sidebar = document.querySelector('.sidebar');
  const overlay = document.querySelector('.overlay');
  if (sidebar) sidebar.classList.toggle('open');
  if (overlay) overlay.classList.toggle('show');
};

// ── Keyboard Shortcuts ──────────────────────────────────────

document.addEventListener('keydown', function(e) {
  if (e.key === 'Escape') closeModal();
});

// ── Init ────────────────────────────────────────────────────

window.addEventListener('hashchange', navigate);
window.addEventListener('DOMContentLoaded', navigate);
