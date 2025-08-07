export class DateLocalUtils {
  static getLocalTimeByUtcTime(utcTime: string): string {
    const today = new Date();
    const [hours, minutes] = utcTime.split(":").map(Number);

    const dateUTC = new Date(
      Date.UTC(today.getUTCFullYear(), today.getUTCMonth(), today.getUTCDate(), hours, minutes),
    );

    return dateUTC.toLocaleTimeString(undefined, {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    });
  }
}
