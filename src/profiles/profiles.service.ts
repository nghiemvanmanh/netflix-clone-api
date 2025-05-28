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
  async create(userId: number, createProfileDto: CreateProfileDto) {
    const user = await this.userRepository.findOne({ where: { id: userId } });
    if (!user) {
      throw new NotFoundException(`User with ID ${userId} not found`);
    }
    const profile = this.profileRepository.create({
      ...createProfileDto,
      user: user, // Assuming Profile has a relation with User
    });
    await this.profileRepository.save(profile);
  }

  update(id: number, updateProfileDto: UpdateProfileDto) {
    return this.profileRepository.update(id, updateProfileDto);
  }

  remove(id: number) {
    return this.profileRepository.delete({ id });
  }

  async getProfile(userId: number) {
    const profiles = await this.profileRepository.find({
      where: { user: { id: userId } },
      relations: ['user'],
    });
    if (!profiles || profiles.length === 0) {
      throw new NotFoundException(
        `Profile for user with ID ${userId} not found`,
      );
    }
    return profiles;
  }
}
