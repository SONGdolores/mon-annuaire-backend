import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from './dto/login.dto';
import * as bcrypt from 'bcrypt';
import { PrismaService } from '../prisma/prisma.service';
import { ConfigService } from '@nestjs/config';


@Injectable()
export class AuthService {
  PrismaService: any;
  activityLogService: any;
  constructor(private jwtService: JwtService, private prismaService: PrismaService, private configService: ConfigService) { }

  async login(loginDto: LoginDto) {

    try {
      const { login, mot_de_passe } = loginDto;

      // Recherche de l'utilisateur par email
      const user = await this.prismaService.utilisateur.findUnique({
        where: { login },
        include: {
          role: {
            include: {
              permissions: true, 
            },
          },
        },
      });

      // Vérification si l'utilisateur existe
      if (!user) {
        throw new NotFoundException('Utilisateur non trouvé');
      }

      // Vérification du mot de passe
      const isPasswordValid = await bcrypt.compare(mot_de_passe, user.mot_de_passe);
      if (!isPasswordValid) {
        throw new UnauthorizedException('Mot de passe incorrect');
      }

      const accessToken = await this.generateJwtToken(user.id);
      const permissions = user.role.permissions.map((p) => p.nom)

      return {
        accessToken,
        user: {
          id: user.id,
          login: user.login,
          codeRole: user.role.code,
        },
        permissions
      };

    } catch (error) {
      throw error;
    }
  }
  // Génération d'un jeton JWT avec le userId et l'email de l'utilisateur
  async generateJwtToken(id: string): Promise<string> {
    const payload = { id };
    const secret = this.configService.get<string>('JWT_SECRET');
    return await this.jwtService.sign(payload, { secret });
  }
  // Verification de l'utilisateur
  async validateUser(userId: string) {
    try {
      // Recherche de l'utilisateur par ID
      const user = await this.prismaService.utilisateur.findUnique({
        where: { id: userId },
        include: {
          role: {
            include: {
              permissions: true, // Inclure les permissions associées au rôle
            },
          },
        },
      });
      
      return user

    } catch (error) {
      throw error;
    }
  }
}


