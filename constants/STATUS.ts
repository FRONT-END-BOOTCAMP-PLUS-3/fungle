export const SERIAL_STATUS = [
  { value: "ongoing", label: "연재중" },
  { value: "completed", label: "완결" },
  { value: "paused", label: "휴재" },
];

export const STATUS_TRANSITIONS: Record<string, string[]> = {
  ongoing: ["paused", "completed"],
  paused: ["ongoing", "completed"],
  completed: [],
};
