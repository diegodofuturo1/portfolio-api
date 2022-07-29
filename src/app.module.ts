import 'dotenv/config';
import Entity from './entity';
import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { AppController } from './app.controller';
import { AuthModule } from './endpoint/auth/auth.module';
import { UserModule } from './endpoint/users/user.module';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { PortfolioModule } from './endpoint/portfolio/portfolio.module';
import { RequestModule } from './endpoint/request/request.module';

const typeormConfig: TypeOrmModuleOptions = {
  type: process.env.DB_TYPE as 'mysql' | 'mariadb',
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  entities: [...Entity],
  synchronize: true,
};

@Module({
  imports: [
    TypeOrmModule.forRoot(typeormConfig),
    UserModule,
    AuthModule,
    PortfolioModule,
    RequestModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
