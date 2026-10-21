import React from "react";

interface IconProps {
  className?: string;
  size?: number;
}

export function SvgIcon({
  className = "w-5 h-5",
  size = 20,
  children,
  fill = "none",
  stroke = "currentColor",
  strokeWidth = 2,
}: IconProps & { children: React.ReactNode; fill?: string; stroke?: string; strokeWidth?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill={fill}
      stroke={stroke}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
    >
      {children}
    </svg>
  );
}

// Check and Cross
export function CheckIcon({ className = "w-4 h-4 text-emerald-600" }: IconProps) {
  return (
    <SvgIcon className={className} strokeWidth={2.5}>
      <polyline points="20 6 9 17 4 12" />
    </SvgIcon>
  );
}

export function CrossIcon({ className = "w-4 h-4 text-rose-500" }: IconProps) {
  return (
    <SvgIcon className={className} strokeWidth={2.5}>
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </SvgIcon>
  );
}

export function StarIcon({ className = "w-4 h-4 text-amber-400 fill-amber-400" }: IconProps) {
  return (
    <svg width={16} height={16} viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  );
}

// Navigation / UI
export function SearchIcon({ className = "w-4 h-4" }: IconProps) {
  return (
    <SvgIcon className={className}>
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.3-4.3" />
    </SvgIcon>
  );
}

export function BellIcon({ className = "w-4 h-4" }: IconProps) {
  return (
    <SvgIcon className={className}>
      <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" />
      <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" />
    </SvgIcon>
  );
}

export function SettingsIcon({ className = "w-4 h-4" }: IconProps) {
  return (
    <SvgIcon className={className}>
      <circle cx="12" cy="12" r="3" />
      <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
    </SvgIcon>
  );
}

// Education & Analytics Icons
export function ChartBarIcon({ className = "w-5 h-5" }: IconProps) {
  return (
    <SvgIcon className={className}>
      <line x1="18" y1="20" x2="18" y2="10" />
      <line x1="12" y1="20" x2="12" y2="4" />
      <line x1="6" y1="20" x2="6" y2="14" />
    </SvgIcon>
  );
}

export function TrendingUpIcon({ className = "w-5 h-5" }: IconProps) {
  return (
    <SvgIcon className={className}>
      <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
      <polyline points="17 6 23 6 23 12" />
    </SvgIcon>
  );
}

export function GraduationCapIcon({ className = "w-5 h-5" }: IconProps) {
  return (
    <SvgIcon className={className}>
      <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
      <path d="M6 12v5c3 3 9 3 12 0v-5" />
    </SvgIcon>
  );
}

export function UsersIcon({ className = "w-5 h-5" }: IconProps) {
  return (
    <SvgIcon className={className}>
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </SvgIcon>
  );
}

export function BookOpenIcon({ className = "w-5 h-5" }: IconProps) {
  return (
    <SvgIcon className={className}>
      <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
      <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
    </SvgIcon>
  );
}

export function CreditCardIcon({ className = "w-5 h-5" }: IconProps) {
  return (
    <SvgIcon className={className}>
      <rect width="20" height="14" x="2" y="5" rx="2" />
      <line x1="2" y1="10" x2="22" y2="10" />
    </SvgIcon>
  );
}

export function MessageSquareIcon({ className = "w-5 h-5" }: IconProps) {
  return (
    <SvgIcon className={className}>
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
    </SvgIcon>
  );
}

export function BriefcaseIcon({ className = "w-5 h-5" }: IconProps) {
  return (
    <SvgIcon className={className}>
      <rect width="20" height="14" x="2" y="7" rx="2" />
      <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
    </SvgIcon>
  );
}

export function TargetIcon({ className = "w-5 h-5" }: IconProps) {
  return (
    <SvgIcon className={className}>
      <circle cx="12" cy="12" r="10" />
      <circle cx="12" cy="12" r="6" />
      <circle cx="12" cy="12" r="2" />
    </SvgIcon>
  );
}

export function AlertTriangleIcon({ className = "w-5 h-5" }: IconProps) {
  return (
    <SvgIcon className={className}>
      <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z" />
      <line x1="12" y1="9" x2="12" y2="13" />
      <line x1="12" y1="17" x2="12.01" y2="17" />
    </SvgIcon>
  );
}

export function CrownIcon({ className = "w-5 h-5" }: IconProps) {
  return (
    <SvgIcon className={className}>
      <path d="m2 4 3 12h14l3-12-6 7-4-7-4 7-6-7zm3 16h14" />
    </SvgIcon>
  );
}

export function PhoneCallIcon({ className = "w-5 h-5" }: IconProps) {
  return (
    <SvgIcon className={className}>
      <path d="M15.05 5A5 5 0 0 1 19 8.95M15.05 1A9 9 0 0 1 23 8.94m-1 7.98v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
    </SvgIcon>
  );
}

export function ZapIcon({ className = "w-5 h-5" }: IconProps) {
  return (
    <SvgIcon className={className}>
      <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
    </SvgIcon>
  );
}

export function ShieldAlertIcon({ className = "w-5 h-5" }: IconProps) {
  return (
    <SvgIcon className={className}>
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10" />
      <line x1="12" y1="8" x2="12" y2="12" />
      <line x1="12" y1="16" x2="12.01" y2="16" />
    </SvgIcon>
  );
}

export function FlameIcon({ className = "w-5 h-5" }: IconProps) {
  return (
    <SvgIcon className={className}>
      <path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z" />
    </SvgIcon>
  );
}

export function ScaleIcon({ className = "w-5 h-5" }: IconProps) {
  return (
    <SvgIcon className={className}>
      <path d="m16 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z" />
      <path d="m2 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z" />
      <path d="M7 21h10" />
      <path d="M12 3v18" />
      <path d="M3 7h2c2 0 5-1 7-2 2 1 5 2 7 2h2" />
    </SvgIcon>
  );
}

export function DiamondIcon({ className = "w-5 h-5" }: IconProps) {
  return (
    <SvgIcon className={className}>
      <path d="M6 3h12l4 6-10 13L2 9Z" />
      <path d="M11 3 8 9l4 13 4-13-3-6" />
      <path d="M2 9h20" />
    </SvgIcon>
  );
}

export function SmartphoneIcon({ className = "w-5 h-5" }: IconProps) {
  return (
    <SvgIcon className={className}>
      <rect width="14" height="20" x="5" y="2" rx="2" ry="2" />
      <line x1="12" y1="18" x2="12.01" y2="18" />
    </SvgIcon>
  );
}

export function CalendarIcon({ className = "w-5 h-5" }: IconProps) {
  return (
    <SvgIcon className={className}>
      <rect width="18" height="18" x="3" y="4" rx="2" />
      <line x1="16" y1="2" x2="16" y2="6" />
      <line x1="8" y1="2" x2="8" y2="6" />
      <line x1="3" y1="10" x2="21" y2="10" />
    </SvgIcon>
  );
}

export function FileTextIcon({ className = "w-5 h-5" }: IconProps) {
  return (
    <SvgIcon className={className}>
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <polyline points="14 2 14 8 20 8" />
      <line x1="16" y1="13" x2="8" y2="13" />
      <line x1="16" y1="17" x2="8" y2="17" />
      <polyline points="10 9 9 9 8 9" />
    </SvgIcon>
  );
}

export function UserCheckIcon({ className = "w-5 h-5" }: IconProps) {
  return (
    <SvgIcon className={className}>
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <polyline points="16 11 18 13 22 9" />
    </SvgIcon>
  );
}

export function SendIcon({ className = "w-5 h-5" }: IconProps) {
  return (
    <SvgIcon className={className}>
      <line x1="22" y1="2" x2="11" y2="13" />
      <polygon points="22 2 15 22 11 13 2 9 22 2" />
    </SvgIcon>
  );
}

export function AwardIcon({ className = "w-5 h-5" }: IconProps) {
  return (
    <SvgIcon className={className}>
      <circle cx="12" cy="8" r="7" />
      <polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88" />
    </SvgIcon>
  );
}

export function LockIcon({ className = "w-4 h-4" }: IconProps) {
  return (
    <SvgIcon className={className}>
      <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
    </SvgIcon>
  );
}

export function PlayIcon({ className = "w-4 h-4" }: IconProps) {
  return (
    <svg width={20} height={20} viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <polygon points="6 3 20 12 6 21 6 3" />
    </svg>
  );
}

export function VideoIcon({ className = "w-4 h-4" }: IconProps) {
  return (
    <SvgIcon className={className}>
      <polygon points="23 7 16 12 23 17 23 7" />
      <rect width="14" height="12" x="1" y="6" rx="2" ry="2" />
    </SvgIcon>
  );
}

export function BotIcon({ className = "w-4 h-4" }: IconProps) {
  return (
    <SvgIcon className={className}>
      <rect width="18" height="12" x="3" y="6" rx="2" />
      <circle cx="9" cy="12" r="1" />
      <circle cx="15" cy="12" r="1" />
      <path d="M12 2v4" />
      <path d="M2 12h1" />
      <path d="M21 12h1" />
    </SvgIcon>
  );
}

export function MailIcon({ className = "w-4 h-4" }: IconProps) {
  return (
    <SvgIcon className={className}>
      <rect width="20" height="16" x="2" y="4" rx="2" />
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
    </SvgIcon>
  );
}

export function LayersIcon({ className = "w-5 h-5" }: IconProps) {
  return (
    <SvgIcon className={className}>
      <polygon points="12 2 2 7 12 12 22 7 12 2" />
      <polyline points="2 17 12 22 22 17" />
      <polyline points="2 12 12 17 22 12" />
    </SvgIcon>
  );
}

export function ClockIcon({ className = "w-5 h-5" }: IconProps) {
  return (
    <SvgIcon className={className}>
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </SvgIcon>
  );
}

export function FolderArchiveIcon({ className = "w-5 h-5" }: IconProps) {
  return (
    <SvgIcon className={className}>
      <polyline points="21 8 21 21 3 21 3 8" />
      <rect width="22" height="5" x="1" y="3" rx="1" />
      <line x1="10" y1="12" x2="14" y2="12" />
    </SvgIcon>
  );
}

export function SlidersIcon({ className = "w-5 h-5" }: IconProps) {
  return (
    <SvgIcon className={className}>
      <line x1="4" y1="21" x2="4" y2="14" />
      <line x1="4" y1="10" x2="4" y2="3" />
      <line x1="12" y1="21" x2="12" y2="12" />
      <line x1="12" y1="8" x2="12" y2="3" />
      <line x1="20" y1="21" x2="20" y2="16" />
      <line x1="20" y1="12" x2="20" y2="3" />
      <line x1="1" y1="14" x2="7" y2="14" />
      <line x1="9" y1="8" x2="15" y2="8" />
      <line x1="17" y1="16" x2="23" y2="16" />
    </SvgIcon>
  );
}

export function EyeOffIcon({ className = "w-5 h-5" }: IconProps) {
  return (
    <SvgIcon className={className}>
      <path d="M9.88 9.88a3 3 0 1 0 4.24 4.24" />
      <path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68" />
      <path d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61" />
      <line x1="2" y1="2" x2="22" y2="22" />
    </SvgIcon>
  );
}

export function ShieldXIcon({ className = "w-5 h-5" }: IconProps) {
  return (
    <SvgIcon className={className}>
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10" />
      <line x1="15" y1="9" x2="9" y2="15" />
      <line x1="9" y1="9" x2="15" y2="15" />
    </SvgIcon>
  );
}

export function FileCheckIcon({ className = "w-4 h-4" }: IconProps) {
  return (
    <SvgIcon className={className}>
      <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
      <polyline points="14 2 14 8 20 8" />
      <path d="m9 15 2 2 4-4" />
    </SvgIcon>
  );
}

export function SparklesIcon({ className = "w-4 h-4" }: IconProps) {
  return (
    <SvgIcon className={className}>
      <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z" />
      <path d="M5 3v4" />
      <path d="M19 17v4" />
      <path d="M3 5h4" />
      <path d="M17 19h4" />
    </SvgIcon>
  );
}
