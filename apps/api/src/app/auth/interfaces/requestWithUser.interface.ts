import { Request } from 'express';
import UserModel from '../../user/respository/user.model';

interface RequestWithUser extends Request {
  user: UserModel;
}

export default RequestWithUser;
