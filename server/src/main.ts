import { ValidationPipe } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { NestFactory } from "@nestjs/core";
import cookieParser from "cookie-parser";
import express from "express";
import helmet from "helmet";
import { AppModule } from "./app.module";
import { AllExceptionsFilter } from "./common/filters/all-exceptions.filter";
import { uploadRoot } from "./products/product-upload";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = app.get(ConfigService);
  const clientOrigin = config.getOrThrow<string>("CLIENT_ORIGIN");

  app.setGlobalPrefix("api");
  app.use(helmet());
  app.use(cookieParser());
  app.use("/uploads", express.static(uploadRoot));
  app.enableCors({
    origin: clientOrigin,
    credentials: true,
  });
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );
  app.useGlobalFilters(new AllExceptionsFilter());

  const port = config.get<number>("PORT", 4000);
  await app.listen(port);
}

void bootstrap();
