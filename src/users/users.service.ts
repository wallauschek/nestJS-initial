import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  private users: User[] = [
    {
      id: 1,
      name: 'Paulo Salvatore',
      email: 'profpaulo.salvatore@gmail.com',
    },
  ];

  create(createUserDto: CreateUserDto) {
    const id = this.users[this.users.length - 1].id + 1;

    const user: User = {
      id: id,
      ...createUserDto,
    };

    this.users.push(user);

    return user;
  }

  findAll() {
    return this.users;
  }

  findOne(id: number) {
    return this.users.find((user) => user.id === id);
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
