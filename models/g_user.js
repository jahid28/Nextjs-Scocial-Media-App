import { Schema, model, models } from 'mongoose';

const UserSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  pic: {
    type: String,
    required: true
  }
});

// const User = models.User || model("User", UserSchema);

export default models.G_user || model("G_user", UserSchema);;