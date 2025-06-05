export const ONE_DAY_IN_MS = 24 * 60 * 60 * 1000;

export const SEVEN_HOURS_IN_MS = 7 * 60 * 60 * 1000;

export const TEN_MINUTES_IN_MS = 10 * 60 * 1000;
export function getCurrentUTC(): Date {
  return new Date(); // Mặc định là UTC
}

export function formatToVietnamTime(date: string | Date): string {
  return new Date(date).toLocaleString('vi-VN', {
    timeZone: 'Asia/Ho_Chi_Minh',
  });
}

export function isExpired(createdAt: string | Date, minutes = 10): boolean {
  const createdDate = new Date(createdAt);
  const expired = new Date(createdDate.getTime() + minutes * 60 * 1000);
  return getCurrentUTC() > expired;
}

export function formatToVietnamTimeWithOffset(
  date: string | Date,
  offset: number,
): string {
  const localDate = new Date(date);
  localDate.setHours(localDate.getHours() + offset);
  return localDate.toLocaleString('vi-VN', {
    timeZone: 'Asia/Ho_Chi_Minh',
  });
}
