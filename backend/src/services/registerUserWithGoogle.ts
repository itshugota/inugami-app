import { User, UserModel } from '../models/User';
import { UserContentModel } from '../models/UserContent';

interface Profile {
  displayName: string;
  id: string;
  emails: [{
    value: string;
  }];
}

const registerUserWithGoogle = async (profile: Profile): Promise<User> => {
  const name = profile.displayName;
  const googleId = profile.id;
  const email = profile.emails[0].value;
  const foundUser = await UserModel.findOne({ email });

  if (foundUser) {
    foundUser.googleId = googleId;
    foundUser.name = name;

    await foundUser.save();

    return foundUser;
  }

  const newUser = new UserModel({
    name,
    email,
    googleId
  });

  await newUser.save();

  const newUserContent = new UserContentModel({
    userId: newUser._id,
    toDos: []
  });

  await newUserContent.save();

  return newUser;
};

export { registerUserWithGoogle };
