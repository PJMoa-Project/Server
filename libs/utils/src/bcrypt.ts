import * as bcrypt from 'bcrypt';

import { SALT_OR_ROUNDS } from '@app/constants';

export class Bcrypt {
  static async generateHash(password: string): Promise<string> {
    const salt = await bcrypt.genSalt(SALT_OR_ROUNDS);
    return bcrypt.hash(password, salt);
  }

  static isMatch(password: string, hash: string): Promise<boolean> {
    return bcrypt.compare(password, hash);
  }
}
