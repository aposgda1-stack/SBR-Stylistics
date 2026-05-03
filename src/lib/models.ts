import mongoose, { Schema, model, models } from 'mongoose';

const UserProgressSchema = new Schema({
  userId: { type: String, required: true, unique: true },
  name: { type: String },
  email: { type: String },
  completedLessons: [{ type: String }], // Array of lesson IDs
  quizScores: [
    {
      quizId: { type: String },
      score: { type: Number },
      totalQuestions: { type: Number },
      timestamp: { type: Date, default: Date.now },
    },
  ],
  totalScore: { type: Number, default: 0 },
  updatedAt: { type: Date, default: Date.now },
});

export const UserProgress = models.UserProgress || model('UserProgress', UserProgressSchema);
