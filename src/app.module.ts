import { Module } from '@nestjs/common';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './endpoint/users/user.module';
import Entity from './entity';
import 'dotenv/config';

const typeormConfig: TypeOrmModuleOptions = {
  type: process.env.DB_TYPE,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  entities: [...Entity],
  synchronize: true,
};

console.table(typeormConfig);

@Module({
  imports: [TypeOrmModule.forRoot(typeormConfig), UserModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
