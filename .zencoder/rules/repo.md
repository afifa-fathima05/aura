# Repository Overview

- **Name**: aura-main
- **Framework**: Next.js (App Router) with TypeScript
- **Styling**: Tailwind CSS
- **Auth/DB**: Firebase (Auth, Firestore)
- **Build Output**: .next/

## Key Paths
- **UI**: components/ui/
- **Admin UI**: components/admin/
- **App routes**: app/
- **Membership modal**: components/ui/MembershipModal.tsx
- **Membership ID logic**: lib/membership.ts
- **Firebase services**: lib/firebaseServices.ts
- **API (Google Sheets)**: app/api/addToSheet/route.ts

## Membership Registration Flow
1. User opens `MembershipModal` to fill the form (name, email, roll, register no., year, section, department, participation)
2. Membership ID is generated using `generateMembershipId()` in `lib/membership.ts`
3. Application is stored via `addMembershipApplication()` in `lib/firebaseServices.ts`
4. A copy is sent to Google Sheets via `/api/addToSheet` route

## Department Options
- Defined in `components/ui/MembershipModal.tsx` as a radio group.
- Codes for Membership ID are mapped in `lib/membership.ts` (`deptMap`).

## Notable Defaults/Fallbacks
- Department fallback in reads: `lib/firebaseServices.ts` uses `AI&DS` if missing
- Admin panel filters pull departments dynamically from stored applications

## How to Add/Change Departments
- Update the department list inside `MembershipModal.tsx` (radio options)
- Update `deptMap` in `lib/membership.ts` to ensure consistent ID codes
- Optional: adjust any fallbacks in `lib/firebaseServices.ts`

## Scripts
- `scripts/migrate-membership-ids.ts`: One-off script to recompute membership IDs for existing data

## Notes
- Anonymous auth may be used to satisfy Firestore rules for write access in the modal.
- Ensure Google Sheets creds are configured for `/api/addToSheet` in environment.