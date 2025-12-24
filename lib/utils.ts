import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


export function generateAvatar(name: string, gender: "MALE" | "FEMALE") {
  const username = name.replace(/\s+/g, '+').toLowerCase();
  const base = "https://avatar.iran.liara.run/public";
  if(gender === "FEMALE") return `${base}/girl?username${username}`;

  return `${base}/boy?username=${username}`;
}

export const formatPhoneNumber = (value: string) => {
  if (!value) return value;

  // Remove all non-digit characters
  const phoneNumber = value.replace(/[^\d]/g, "");
  const len = phoneNumber.length;

  // +91 country code handling
  if (phoneNumber.startsWith("91") && len > 10) {
    const main = phoneNumber.slice(-10);
    return `+91 ${main.slice(0, 5)} ${main.slice(5, 10)}`;
  }

  // Partial typing (before full 10 digits entered)
  if (len <= 5) {
    return phoneNumber;
  }

  if (len <= 10) {
    return `${phoneNumber.slice(0, 5)} ${phoneNumber.slice(5)}`;
  }

  // If user pastes long input or includes +91
  return `+91 ${phoneNumber.slice(-10, -5)} ${phoneNumber.slice(-5)}`;
};


export const getNext5Days = () => {
  const dates = [];
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);

  for (let i = 0; i < 5; i++) {
    const date = new Date(tomorrow);
    date.setDate(date.getDate() + i);
    dates.push(date.toISOString().split("T")[0]);
  }

  return dates;
};

export const getAvailableTimeSlots = () => {
  return [
    "09:00",
    "09:30",
    "10:00",
    "10:30",
    "11:00",
    "11:30",
    "14:00",
    "14:30",
    "15:00",
    "15:30",
    "16:00",
    "16:30",
  ];
};


export const APPOINTMENT_TYPES = [
  { id: "checkup", name: "Regular Checkup", duration: "60 min", price: "$120" },
  { id: "cleaning", name: "Teeth Cleaning", duration: "45 min", price: "$90" },
  { id: "consultation", name: "Consultation", duration: "30 min", price: "$75" },
  { id: "emergency", name: "Emergency Visit", duration: "30 min", price: "$150" },
];