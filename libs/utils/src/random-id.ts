import { nanoid } from 'nanoid';

export class RandomId {
  public static generateRandomId(str?: string) {
    return str ? `${nanoid()}${str}` : nanoid();
  }
}
