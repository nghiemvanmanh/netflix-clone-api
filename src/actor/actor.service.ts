import { Injectable } from '@nestjs/common';
import { CreateActorDto } from './dto/create-actor.dto';
import { UpdateActorDto } from './dto/update-actor.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Actor } from 'database/entities/actor.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ActorService {
  constructor(
    @InjectRepository(Actor)
    private readonly actorRepository: Repository<Actor>,
  ) {}
  create(createActorDto: CreateActorDto[]) {
    const actor = this.actorRepository.create(createActorDto);
    return this.actorRepository.save(actor);
  }

  update(id: number, updateActorDto: UpdateActorDto) {
    return this.actorRepository.update(id, updateActorDto);
  }

  remove(id: number) {
    return this.actorRepository.delete(id);
  }

  findAll() {
    return this.actorRepository.find();
  }
}
