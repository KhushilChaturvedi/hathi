import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import validator from 'validator';

const LevelSchema = new mongoose.Schema({
  role: { type: String, required: true },
  level: { type: String, enum: ['Level 1', 'Level 2', 'Level 3'], required: true }
}, {_id: false});

const PreferenceSchema = new mongoose.Schema({
  industry: { type: String, enum: ['software', 'marketing'] },
  goal: { type: String, enum: ['learning', 'earning'] }
}, {_id: false});

const UserSchema = new mongoose.Schema({
  email: { type: String, unique: true, required: true, validate: [validator.isEmail, 'Invalid email'] },
  password: { type: String, required: true, minlength: 8 },
  emailVerified: { type: Boolean, default: false },
  role: { type: String, enum: ['entrepreneur', 'student', 'admin'], required: true },
  skills: [{ type: String }],
  levels: [LevelSchema],
  preferences: PreferenceSchema,
  suspended: { type: Boolean, default: false }
}, { timestamps: true });

UserSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

UserSchema.methods.comparePassword = function(candidate) {
  return bcrypt.compare(candidate, this.password);
};

export default mongoose.model('User', UserSchema);
