// lib/membership.ts

/**
 * Generate a membership ID based on year, department, and roll number.
 * Example: year=2028, dept="AI&DS", roll="21cs123"
 * Output: 28AURAAI123
 */

export function generateMembershipId(
  year: string,
  department: string,
  rollNumber: string
): string {
  // Map department names to short codes
  const deptMap: Record<string, string> = {
    "AI&DS": "AI",
    "AI&ML": "ML",
    "CSE": "CS",
    "IT": "IT",
    "CSBS": "CB",
    "MECH": "MC",
    "EEE": "EE",
    "ECE": "EC",
    "MBA": "MBA",
  };

  // Normalize input
  const normalizedDept = (department || "").trim().toUpperCase();

  // Use mapping if found, otherwise fallback to raw normalizedDept
  const departmentCode = deptMap[normalizedDept] || normalizedDept;

  // Extract last digits from roll number
  const rollRaw = (rollNumber || "").trim();
  const rollDigits = rollRaw.match(/(\d+)$/i)?.[1] || "";

  // Take last 2 digits of year
  const yearDigits = (year || "").replace(/[^0-9]/g, "");
  const yearShort = yearDigits.slice(-2);

  return `${yearShort}AURA${departmentCode}${rollDigits}`;
}