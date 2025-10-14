import { registerAs } from '@nestjs/config';

export const jwtConfig = registerAs('jwt', () => ({
  secretAT: process.env.JWT_SECRET_AT,
  secretRT: process.env.JWT_SECRET_RT,
  expireAT: process.env.JWT_EXPIRATION_AT,
  expireRT: process.env.JWT_EXPIRATION_RT,
  issuer: process.env.JWT_ISSUER,
}));
