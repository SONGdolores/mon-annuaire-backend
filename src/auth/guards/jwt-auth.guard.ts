import { ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';



@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
    canActivate(context: ExecutionContext) {
        return super.canActivate(context);
        
    }
    handleRequest(err: any, utilisateur: any, info: any) {
        
        if (err || !utilisateur) {
            throw err || new UnauthorizedException();
        }
        return utilisateur;
    }
}
