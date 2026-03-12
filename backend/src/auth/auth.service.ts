import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt';
import { User } from 'src/user/user.entity';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, pass: string) {
    const user = await this.userService.findOne({ email });
    if (user && (await bcrypt.compare(pass, user.passwordHash))) {
      const { salt, passwordHash, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: User) {
    const payload = {
      username: user.name,
      sub: user.id,
      isAdmin: user.isAdmin,
      email: user.email,
    };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
