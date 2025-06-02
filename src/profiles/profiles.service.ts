import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProfileDto } from './dto/create-profile.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { Profile } from 'database/entities/profile.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'database/entities/user.entity';

@Injectable()
export class ProfilesService {
  constructor(
    @InjectRepository(Profile)
    private profileRepository: Repository<Profile>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}
  async create(userId: string, createProfileDto: CreateProfileDto) {
    const user = await this.userRepository.findOne({ where: { id: userId } });
    if (!user) {
      throw new NotFoundException(`Người dùng ${user.email} không tìm thấy`);
    }
    const profile = this.profileRepository.create({
      ...createProfileDto,
      user: user, // Assuming Profile has a relation with User
    });
    await this.profileRepository.save(profile);
  }

  update(id: string, updateProfileDto: UpdateProfileDto) {
    return this.profileRepository.update(id, updateProfileDto);
  }

  remove(id: string) {
    return this.profileRepository.delete({ id });
  }

  async getProfile(userId: string) {
    const profiles = await this.profileRepository.find({
      where: { user: { id: userId } },
      relations: ['user'],
    });
    if (!profiles || profiles.length === 0) {
      throw new NotFoundException(
        `Hồ sơ với người dùng ${userId} không tìm thấy`,
      );
    }
    return profiles;
  }
}
