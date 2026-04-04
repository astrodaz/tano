// src/utils/moon.ts

const proper_ang = (big: number): number => {
  let tmp = 0;
  if (big > 0) {
    tmp = big / 360.0;
    tmp = (tmp - Math.floor(tmp)) * 360.0;
  } else {
    tmp = Math.ceil(Math.abs(big / 360.0));
    tmp = big + tmp * 360.0;
  }
  return tmp;
};

const jdn = (date: Date): number => {
  const month = date.getMonth() + 1; // JS months are 0-11
  const day = date.getDate();
  const year = date.getFullYear();
  const zone = date.getTimezoneOffset() / 1440;

  let yyy = year;
  let mmm = month;
  if (month < 3) {
    yyy = year - 1;
    mmm = month + 12;
  }

  const d = day + zone + 0.5;
  const a = Math.floor(yyy / 100);
  const b = 2 - a + Math.floor(a / 4);
  const jd = Math.floor(365.25 * yyy) + Math.floor(30.6001 * (mmm + 1)) + d + 1720994.5;
  return jd + (jd > 2299160.4999999 ? b : 0);
};

export const getMoonAge = (date: Date = new Date()): number => {
  const jd = jdn(date);
  const dr = Math.PI / 180;
  const rd = 1 / dr;
  const meeDT = Math.pow(jd - 2382148, 2) / (41048480 * 86400);
  const meeT = (jd + meeDT - 2451545.0) / 36525;
  const meeT2 = Math.pow(meeT, 2);
  const meeT3 = Math.pow(meeT, 3);

  let meeD = 297.85 + 445267.1115 * meeT - 0.00163 * meeT2 + meeT3 / 545868;
  meeD = proper_ang(meeD) * dr;
  let meeM1 = 134.96 + 477198.8676 * meeT + 0.008997 * meeT2 + meeT3 / 69699;
  meeM1 = proper_ang(meeM1) * dr;
  let meeM = 357.53 + 35999.0503 * meeT;
  meeM = proper_ang(meeM) * dr;

  let elong = meeD * rd + 6.29 * Math.sin(meeM1);
  elong = elong - 2.1 * Math.sin(meeM);
  elong = elong + 1.27 * Math.sin(2 * meeD - meeM1);
  elong = elong + 0.66 * Math.sin(2 * meeD);
  elong = proper_ang(elong);

  let moonNum = Math.floor(((Math.round(elong) + 6.43) / 360) * 28);
  return moonNum === 28 ? 0 : moonNum;
};

export const getMoonPhaseName = (age: number): string => {
  let phase = "New Moon";
  if (age > 3 && age < 11) phase = "First Quarter";
  if (age > 10 && age < 18) phase = "Full Moon";
  if (age > 17 && age < 25) phase = "Last Quarter";

  // Relative descriptions
  if ([1, 8, 15, 22].includes(age)) return `1 day past ${phase}`;
  if ([2, 9, 16, 23].includes(age)) return `2 days past ${phase}`;
  if ([3, 17, 24].includes(age)) return `3 days past ${phase}`;
  if ([4, 11, 18, 25].includes(age)) return `3 days before ${phase}`;
  if ([5, 12, 19, 26].includes(age)) return `2 days before ${phase}`;
  if ([6, 13, 20, 27].includes(age)) return `1 day before ${phase}`;

  return phase;
};