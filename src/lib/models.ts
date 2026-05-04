import mongoose, { Schema, model, models } from 'mongoose';

const QuizScoreSchema = new Schema({
  quizId:         { type: String, required: true },
  score:          { type: Number, required: true },
  totalQuestions: { type: Number, required: true },
  timestamp:      { type: Date, default: Date.now },
}, { _id: false });

const UserProgressSchema = new Schema({
  userId:           { type: String, required: true, unique: true, index: true },
  name:             { type: String, default: 'Student' },
  email:            { type: String },
  completedLessons: { type: [String], default: [] },
  quizScores:       { type: [QuizScoreSchema], default: [] },
  totalScore:       { type: Number, default: 0, index: true }, // indexed for fast leaderboard sort
  updatedAt:        { type: Date, default: Date.now },
});



export const UserProgress =
  models.UserProgress || model('UserProgress', UserProgressSchema);
