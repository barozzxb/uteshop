import {
  BadRequestException,
  Injectable,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { AdminsService } from '../admins/admins.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly adminsService: AdminsService,
    private readonly jwtService: JwtService,
  ) {}

  async register(dto: any) {
    const existed = await this.adminsService.findByEmail(dto.email);
    if (existed) {
      throw new BadRequestException('Email already exists');
    }

    const hashedPassword = await bcrypt.hash(dto.password, 10);

    await this.adminsService.create({
      email: dto.email,
      password: hashedPassword,
      fullName: dto.fullName,
      isVerified: true,
    });

    return {
      message: 'Admin registered successfully',
      data: null,
    };
  }

  async login(dto: any) {
    const admin = await this.adminsService.findByEmail(dto.email);
    if (!admin) {
      throw new BadRequestException('Invalid email or password');
    }

    const isMatch = await bcrypt.compare(dto.password, admin.password);
    if (!isMatch) {
      throw new BadRequestException('Invalid email or password');
    }

    const payload = {
      sub: admin._id,
      role: 'ADMIN',
    };

    const accessToken = this.jwtService.sign(payload);

    return {
      message: 'Login successfully',
      data: {
        accessToken,
      },
    };
  }

  async me(adminId: string) {
    return {
      message: 'Get profile successfully',
      data: {
        adminId,
      },
    };
  }
}
