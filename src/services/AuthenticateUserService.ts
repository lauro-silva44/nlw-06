import { getCustomRepository } from "typeorm";
import { UserRepository } from "../repositories/UsersRepositories";
import { compare} from "bcryptjs"
import { sign } from "jsonwebtoken"
 

interface IAutthenticateRequest {
  email: string;
  password: string;
}

class AuthenticateUserService {
  async execute({email, password }: IAutthenticateRequest){
    const userRepositories = getCustomRepository(UserRepository);
    
    const userExists = await userRepositories.findOne({ email});

    if(!userExists){
      throw new Error(" EMAIL/PASSWORD INCORRECT!");
    }

    const passwordMatch = await compare(password, userExists.password);

    if(!passwordMatch){
      throw new Error(" EMAIL/PASSWORD INCORRECT!");
    }
    const token = sign({
      email: userExists.email,
    },
    "286b2409fdcc28f10e7227fde9836d4f",
    { 
      subject: userExists.id,
      expiresIn: "1d"
    }  
  )
  
  return token;


  }
}

export {AuthenticateUserService};