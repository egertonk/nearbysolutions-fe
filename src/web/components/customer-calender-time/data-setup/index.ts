import { DateParts, WeeksData } from "../types/CalenderTypes";

export const solutionDate = new Date().toLocaleDateString("en-US", {
  month: "2-digit",
  day: "2-digit",
  year: "numeric",
});

export const solutionFormattedDate = new Date().toLocaleDateString("en-US", {
  weekday: "long",
  day: "2-digit",
  month: "long",
  year: "numeric",
});

export type DayKeys = "Mo" | "Tu" | "We" | "Th" | "Fr" | "Sa" | "Su";

export const dayWithShortNames: Record<DayKeys, string> = {
  Mo: "Monday",
  Tu: "Tuesday",
  We: "Wednesday",
  Th: "Thursday",
  Fr: "Friday",
  Sa: "Saturday",
  Su: "Sunday",
};

export const extractDateParts = (dateStr: string): DateParts | null => {
  const parts = dateStr.split("/");
  if (parts.length === 3) {
    return {
      month: parts[0] || "",
      day: Number(parts[1]) || 0,
      year: Number(parts[2]) || 0,
    };
  }
  return null;
};

export const defaultWeeksData: WeeksData = {
  weeksArray: Array(4).fill(Array(7).fill({ day: 0, dayTitle: "" })),
  month: "",
  year: 0,
};
