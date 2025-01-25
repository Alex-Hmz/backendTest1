import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthenticationModule } from './authentication/authentication.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [AuthenticationModule,
    TypeOrmModule.forRoot({
      type: 'mongodb', 
      host: 'localhost', 
      port: 27017, 
      database: 'prueba_tecnica', 
      useUnifiedTopology: true, 
      entities: [__dirname + '/**/*.entity{.ts,.js}'], 
      synchronize: false, 
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
