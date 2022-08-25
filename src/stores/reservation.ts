import dayjs from "dayjs";
import { atom } from "jotai";

export const selectedOptionIdAtom = atom<number | null>(null);

export const selectedDateAtom = atom<{
  year: number;
  month: number;
  day: number;
} | null>(null);
export const selectedTimeAtom = atom<{
  hour: number;
  minute: number;
} | null>(null);
export const selectedDateTimeAtom = atom<dayjs.Dayjs | null>((get) => {
  const date = get(selectedDateAtom);
  const time = get(selectedTimeAtom);
  if (date && time) {
    return dayjs(
      new Date(date.year, date.month - 1, date.day, time.hour, time.minute)
    );
  }
  return null;
});

export const selectedPeopleAtom = atom<number>(1);

export const requestAtom = atom<string | null>(null);
