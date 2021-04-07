import mongoose from 'mongoose';
import { prop, getModelForClass } from '@typegoose/typegoose';

import { ModelName } from '../enums/ModelNameEnum';

class User {
  @prop({ required: [true, 'Name is required.'] })
  public name: string;

  @prop({ required: [true, 'Email is required.'], unique: true })
  public email: string;

  @prop()
  public password?: string;

  @prop()
  public googleId?: string;

  @prop()
  public facebookId?: string;
}

const UserModel = getModelForClass(User, {
  existingMongoose: mongoose
});

if (User.name !== ModelName.USER) {
  throw new Error(`Typegoose Model Class name doesn't match that of ModelName enums.`);
}

export { User, UserModel };

export default UserModel;
