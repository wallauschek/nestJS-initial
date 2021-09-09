import { Injectable } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { Post } from './entities/post.entity';

@Injectable()
export class PostsService {
  async findOne(id: number): Promise<Post | null> {
    return undefined;
  }

  async findAll(): Promise<Post[]> {
    return undefined;
  }

  async getPublishedPosts(): Promise<Post[]> {
    return undefined;
  }

  async create(dto: CreatePostDto): Promise<Post> {
    return undefined;
  }

  async update(id: number, dto: UpdatePostDto): Promise<Post> {
    return undefined;
  }

  async remove(id: number): Promise<Post> {
    return undefined;
  }
}
