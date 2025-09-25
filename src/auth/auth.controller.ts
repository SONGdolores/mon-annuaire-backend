import { Controller, Post, Body, UseGuards, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { ApiBearerAuth, ApiOperation, ApiTags,ApiResponse } from '@nestjs/swagger';
import { JwtAuthGuard } from './guards/jwt-auth.guard';

@ApiTags("Authentification")
@ApiBearerAuth('')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @ApiOperation({  summary: 'Connexion de l’utilisateur', 
    description: 'Se connecter en tant que utilistateur',
  })
  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    return await  this.authService.login(loginDto);
  }


  @Post('logout')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Déconnexion de l’utilisateur', description: 'Permet à l’utilisateur de se déconnecter' })
  @ApiResponse({ status: 200, description: 'Déconnexion réussie. Token à supprimer côté client.'})
  logout(@Req()req) {
   
    return { message: 'Déconnexion réussie' };
  }
}
