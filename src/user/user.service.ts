import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from 'database/entities/user.entity';
import { DataSource, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private dataSource: DataSource,
  ) {}

  async register(newUser: CreateUserDto): Promise<User> {
    const user = await this.userRepository.findOne({
      where: { email: newUser.email },
    });
    if (user) {
      throw new Error(`User ${newUser.email} already used`);
    }
    const hashPass = await bcrypt.hash(newUser.password, 10);
    const userNew = this.userRepository.create({
      ...newUser,
      password: hashPass,
    });

    return this.userRepository.save(userNew);
  }

  async update(id: number, updatedUser: UpdateUserDto): Promise<User> {
    const user = await this.userRepository.findOne({ where: { id: id } });
    if (!user) {
      throw new UnauthorizedException(`User ${id} not found`);
    }
    await this.userRepository.update(id, updatedUser);
    return user;
  }

  async delete(id: number) {
    const user = await this.userRepository.findOne({ where: { id: id } });
    if (!user) {
      throw new UnauthorizedException(`User ${id} not found`);
    }
    await this.userRepository.delete(id);
    return 'Deleted successfully';
  }
}
