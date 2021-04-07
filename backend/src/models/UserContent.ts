import mongoose from 'mongoose';
import { prop, modelOptions, getModelForClass, Severity } from '@typegoose/typegoose';

import { ModelName } from '../enums/ModelNameEnum';

import { ToDo } from './ToDo';

@modelOptions({ options: { allowMixed: Severity.ALLOW }})
class UserContent {
  @prop({ required: [true, 'User id is required.'] })
  public userId: string;

  @prop()
  public toDos?: ToDo[];
}

const UserContentModel = getModelForClass(UserContent, {
  existingMongoose: mongoose
});

if (UserContent.name !== ModelName.USER_CONTENT) {
  throw new Error(`Typegoose Model Class name doesn't match that of ModelName enums.`);
}

export { UserContent, UserContentModel };

export default UserContentModel;
