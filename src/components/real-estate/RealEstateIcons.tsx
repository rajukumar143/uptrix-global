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
export function SearchIcon({ className = "w-4 h-4 text-slate-400" }: IconProps) {
  return (
    <SvgIcon className={className}>
      <circle cx="11" cy="11" r="8" />
      <line x1="21" y1="21" x2="16.65" y2="16.65" />
    </SvgIcon>
  );
}

export function BellIcon({ className = "w-4 h-4 text-slate-600" }: IconProps) {
  return (
    <SvgIcon className={className}>
      <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
      <path d="M13.73 21a2 2 0 0 1-3.46 0" />
    </SvgIcon>
  );
}

export function LockIcon({ className = "w-4 h-4 text-slate-400" }: IconProps) {
  return (
    <SvgIcon className={className}>
      <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
    </SvgIcon>
  );
}

export function PlayIcon({ className = "w-5 h-5 text-white" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <polygon points="5 3 19 12 5 21 5 3" />
    </svg>
  );
}

export function VideoIcon({ className = "w-4 h-4 text-blue-500" }: IconProps) {
  return (
    <SvgIcon className={className}>
      <polygon points="23 7 16 12 23 17 23 7" />
      <rect x="1" y="5" width="15" height="14" rx="2" ry="2" />
    </SvgIcon>
  );
}

export function FileTextIcon({ className = "w-4 h-4 text-emerald-600" }: IconProps) {
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

export function MessageSquareIcon({ className = "w-4 h-4 text-emerald-600" }: IconProps) {
  return (
    <SvgIcon className={className}>
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
    </SvgIcon>
  );
}

export function CreditCardIcon({ className = "w-4 h-4 text-indigo-600" }: IconProps) {
  return (
    <SvgIcon className={className}>
      <rect x="1" y="4" width="22" height="16" rx="2" ry="2" />
      <line x1="1" y1="10" x2="23" y2="10" />
    </SvgIcon>
  );
}

export function BuildingOfficeIcon({ className = "w-5 h-5 text-indigo-600" }: IconProps) {
  return (
    <SvgIcon className={className}>
      <rect x="4" y="2" width="16" height="20" rx="2" ry="2" />
      <path d="M9 22v-4h6v4" />
      <line x1="8" y1="6" x2="8.01" y2="6" strokeWidth={3} />
      <line x1="12" y1="6" x2="12.01" y2="6" strokeWidth={3} />
      <line x1="16" y1="6" x2="16.01" y2="6" strokeWidth={3} />
      <line x1="8" y1="10" x2="8.01" y2="10" strokeWidth={3} />
      <line x1="12" y1="10" x2="12.01" y2="10" strokeWidth={3} />
      <line x1="16" y1="10" x2="16.01" y2="10" strokeWidth={3} />
      <line x1="8" y1="14" x2="8.01" y2="14" strokeWidth={3} />
      <line x1="12" y1="14" x2="12.01" y2="14" strokeWidth={3} />
      <line x1="16" y1="14" x2="16.01" y2="14" strokeWidth={3} />
    </SvgIcon>
  );
}

export function KeyIcon({ className = "w-5 h-5 text-amber-600" }: IconProps) {
  return (
    <SvgIcon className={className}>
      <path d="M21 2l-2 2m-1.5 1.5L14 9l-1.5-1.5L11 9l1.5 1.5L9 14l-4.5 4.5a2.121 2.121 0 0 1-3-3L6 11l1.5 1.5L9 11l-1.5-1.5L11 8l3.5 3.5 1.5-1.5 2-2z" />
      <circle cx="7.5" cy="16.5" r="1.5" />
    </SvgIcon>
  );
}

export function MapPinIcon({ className = "w-5 h-5 text-rose-500" }: IconProps) {
  return (
    <SvgIcon className={className}>
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
      <circle cx="12" cy="10" r="3" />
    </SvgIcon>
  );
}

export function ChartBarIcon({ className = "w-4 h-4 text-emerald-600" }: IconProps) {
  return (
    <SvgIcon className={className}>
      <line x1="12" y1="20" x2="12" y2="10" />
      <line x1="18" y1="20" x2="18" y2="4" />
      <line x1="6" y1="20" x2="6" y2="16" />
    </SvgIcon>
  );
}

export function UsersIcon({ className = "w-4 h-4 text-blue-600" }: IconProps) {
  return (
    <SvgIcon className={className}>
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </SvgIcon>
  );
}

export function LayersIcon({ className = "w-4 h-4 text-purple-600" }: IconProps) {
  return (
    <SvgIcon className={className}>
      <polygon points="12 2 2 7 12 12 22 7 12 2" />
      <polyline points="2 17 12 22 22 17" />
      <polyline points="2 12 12 17 22 12" />
    </SvgIcon>
  );
}

export function TrendingUpIcon({ className = "w-4 h-4 text-emerald-600" }: IconProps) {
  return (
    <SvgIcon className={className}>
      <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
      <polyline points="17 6 23 6 23 12" />
    </SvgIcon>
  );
}

export function SettingsIcon({ className = "w-4 h-4 text-slate-500" }: IconProps) {
  return (
    <SvgIcon className={className}>
      <circle cx="12" cy="12" r="3" />
      <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
    </SvgIcon>
  );
}

export function PhoneCallIcon({ className = "w-4 h-4 text-emerald-600" }: IconProps) {
  return (
    <SvgIcon className={className}>
      <path d="M15.05 5A5 5 0 0 1 19 8.95M15.05 1A9 9 0 0 1 23 8.94m-1 7.98v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
    </SvgIcon>
  );
}
