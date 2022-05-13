import * as dateFns from 'date-fns';

export class DateFns {
  static now() {
    return dateFns.formatISO(new Date());
  }

  static getDate(date: Date) {
    return dateFns.formatISO(new Date(date));
  }
}
