import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateNotificationDto } from './dto/create-notification.dto';
import { Notification } from 'database/entities/notification.entity';

@Injectable()
export class NotificationsService {
  constructor(
    @InjectRepository(Notification)
    private readonly notificationRepo: Repository<Notification>,
  ) {}

  async create(
    dto: CreateNotificationDto,
    profileId: string,
  ): Promise<Notification> {
    const notification = this.notificationRepo.create({
      ...dto,
      profile: { id: profileId },
    });
    return await this.notificationRepo.save(notification);
  }

  async markAsRead(id: string, profileId: string): Promise<void> {
    const notifications = await this.notificationRepo.find({
      where: {
        id,
        isRead: false,
        profile: { id: profileId },
      },
    });

    for (const notification of notifications) {
      notification.isRead = true;
    }
    await this.notificationRepo.save(notifications);
  }

  async markAllAsRead(profileId: string): Promise<void> {
    await this.notificationRepo
      .createQueryBuilder()
      .update('notifications')
      .set({ isRead: true })
      .where('isRead = false AND profileId = :profileId', { profileId })
      .execute();
  }

  async delete(id: string, profileId: string): Promise<void> {
    await this.notificationRepo
      .createQueryBuilder()
      .delete()
      .from('notifications') // hoặc .from(NotificationEntity)
      .where('id = :id AND profileId = :profileId', { id, profileId })
      .execute();
  }

  async deleteAll(profileId: string): Promise<void> {
    await this.notificationRepo
      .createQueryBuilder()
      .delete()
      .where('profileId = :profileId', { profileId })
      .execute();
  }

  async findAll(profileId?: string): Promise<Notification[]> {
    return this.notificationRepo.find({
      where: { profile: { id: profileId } },
      order: { createdAt: 'DESC' },
    });
  }
}
