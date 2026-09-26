export interface UserPersona {
  id: string;
  name: string;
  email: string;
  role: string;
  roleLabel: string;
  badgeColor: string;
  initials: string;
}

export const USER_PERSONAS: UserPersona[] = [
  {
    id: 'admin',
    name: 'Demo Merchant (Admin)',
    email: 'admin@demo.buimbpay.com',
    role: 'MERCHANT_ADMIN',
    roleLabel: 'Admin · Full Access',
    badgeColor: 'bg-[#4B8BFF]/15 text-[#6EA8FF] border-[#4B8BFF]/30',
    initials: 'DM',
  },
  {
    id: 'developer',
    name: 'Priya Sharma (Tech Lead)',
    email: 'dev@techcorp.in',
    role: 'MERCHANT_DEVELOPER',
    roleLabel: 'Developer · API & Keys',
    badgeColor: 'bg-[#35D49A]/15 text-[#35D49A] border-[#35D49A]/30',
    initials: 'PS',
  },
  {
    id: 'finance',
    name: 'Vikram Mehta (Finance)',
    email: 'finance@enterprise.co',
    role: 'MERCHANT_VIEWER',
    roleLabel: 'Finance · Settlements',
    badgeColor: 'bg-[#F4B740]/15 text-[#F4B740] border-[#F4B740]/30',
    initials: 'VM',
  },
  {
    id: 'compliance',
    name: 'Rohan Deshmukh (Risk)',
    email: 'risk@buimbpay.sandbox',
    role: 'COMPLIANCE_OFFICER',
    roleLabel: 'Compliance & Disputes',
    badgeColor: 'bg-[#B388FF]/15 text-[#B388FF] border-[#B388FF]/30',
    initials: 'RD',
  },
];
