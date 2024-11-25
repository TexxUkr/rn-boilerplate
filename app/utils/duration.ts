import { format } from 'date-fns';

export function secondsToDuration(seconds: number): string {
  const totalMilliseconds = seconds * 1000;

  // Convert seconds into a Date object starting at epoch time (0ms).
  const durationDate = new Date(totalMilliseconds);

  // If the duration is less than 1 hour, format as MM:SS
  if (seconds < 3600) {
    return format(durationDate, 'mm:ss');
  }

  // Otherwise, format as HH:MM:SS
  return format(durationDate, 'HH:mm:ss');
}
