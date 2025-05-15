import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { UserRepository } from './repository/user-repository.interface';
import { DatabaseModule } from 'src/database/database.module';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [DatabaseModule, UserModule],
  controllers: [UserController],
  providers: [{
    provide: UserService,
    useFactory: (userRepository: UserRepository, jwtService: JwtService) => {
      return new UserService(userRepository, jwtService)
    },
    inject: [UserRepository, JwtService],
  }],
})
export class UserModule { }
