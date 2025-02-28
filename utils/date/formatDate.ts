import { format } from "date-fns";

export const formatDate = (dateString: Date) => {
  return format(dateString, "yyyy-MM-dd HH:mm");
};
