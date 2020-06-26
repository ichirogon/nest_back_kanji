import {
  Injectable,
  ConflictException,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcryptjs';
import { User } from '../user/user.model';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { JwtPayload } from './jwt-payload.interface';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel('User')
    private readonly userModel: Model<User>,
    private readonly jwtService: JwtService,
  ) {}

  async singUp(userData: AuthCredentialsDto): Promise<void> {
    const { email, password } = userData;
    const salt = await bcrypt.genSalt();
    const user = new this.userModel({
      email,
      password: await this.hashPassword(password, salt),
      salt,
    });

    try {
      await user.save();
    } catch (err) {
      if (err && err.code === 11000) {
        //Duplicate email
        throw new ConflictException('Email already exists');
      } else {
        throw new InternalServerErrorException();
      }
    }
  }

  async signIn(
    authCredentialsDto: AuthCredentialsDto,
  ): Promise<{
    accessToken: string;
  }> {
    const { email, password } = authCredentialsDto;
    const user = await this.userModel.findOne({ email: email });

    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const isValidPassword = await user.validatePassword(
      user.password,
      password,
      user.salt,
    );

    if (!isValidPassword) {
      throw new UnauthorizedException('Invalid credentials');
    }
    const payload: JwtPayload = { email: user.email };

    return {
      accessToken: this.jwtService.sign(payload),
    };
  }

  private async hashPassword(password: string, salt: string): Promise<string> {
    return bcrypt.hash(password, salt);
  }
}
