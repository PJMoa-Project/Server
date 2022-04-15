import * as dateFns from 'date-fns';

export class DateFns {
  static now(date?: Date) {
    return date ? new Date(date) : new Date();
  }

  static convertDateToISO(date: Date) {
    return dateFns.formatISO(date);
  }
}
