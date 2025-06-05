import {
  Controller,
  Post,
  Body,
  Patch,
  Delete,
  Get,
  Param,
  Query,
} from '@nestjs/common';
import { CreateNotificationDto } from './dto/create-notification.dto';
import { NotificationsService } from './notifications.service';

@Controller('notifications')
export class NotificationsController {
  constructor(private readonly notificationsService: NotificationsService) {}

  @Post()
  create(
    @Body() dto: CreateNotificationDto,
    @Query('profileId') profileId: string,
  ) {
    return this.notificationsService.create(dto, profileId);
  }

  @Patch(':id/read')
  markAsRead(@Param('id') id: string, @Query('profileId') profileId: string) {
    return this.notificationsService.markAsRead(id, profileId);
  }

  @Patch('read-all')
  markAllAsRead(@Query('profileId') profileId: string) {
    return this.notificationsService.markAllAsRead(profileId);
  }

  @Delete(':id')
  delete(@Param('id') id: string, @Query('profileId') profileId: string) {
    return this.notificationsService.delete(id, profileId);
  }

  @Delete()
  deleteAll(@Query('profileId') profileId: string) {
    return this.notificationsService.deleteAll(profileId);
  }

  @Get()
  findAll(@Query('profileId') profileId: string) {
    return this.notificationsService.findAll(profileId);
  }
}
