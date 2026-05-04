import { NextResponse } from 'next/server';
import { auth, currentUser } from '@clerk/nextjs/server';
import dbConnect from '@/lib/mongodb';
import { UserProgress } from '@/lib/models';

export async function POST(req: Request) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { quizId, score, totalQuestions } = await req.json();
    if (score === undefined || totalQuestions === undefined || !quizId) {
      return NextResponse.json({ error: 'quizId, score, and totalQuestions are required' }, { status: 400 });
    }

    await dbConnect();
    const user = await currentUser();

    const name = user?.firstName
      ? `${user.firstName} ${user.lastName || ''}`.trim()
      : user?.username || 'Student';
    const email = user?.emailAddresses[0]?.emailAddress;

    // Step 1: Check if this quiz already has a saved score for this user
    const existing = await UserProgress.findOne({ userId }, { quizScores: 1 });
    const existingEntry = existing?.quizScores?.find((s: any) => s.quizId === quizId);

    // If score isn't higher than existing, skip the update but return current total
    if (existingEntry && existingEntry.score >= score) {
      const current = await UserProgress.findOne({ userId }, { totalScore: 1 });
      return NextResponse.json({ success: true, totalScore: current?.totalScore || 0, updated: false });
    }

    const scoreDelta = existingEntry ? score - existingEntry.score : score;

    // Step 2: Atomic update — either insert new quiz score or update existing one
    const result = await UserProgress.findOneAndUpdate(
      { userId },
      {
        $set: {
          name,
          email,
          updatedAt: new Date(),
        },
        $inc: { totalScore: scoreDelta },
      },
      { upsert: true, new: true }
    );

    // Step 3: Update the specific quiz score entry atomically
    await UserProgress.findOneAndUpdate(
      { userId, 'quizScores.quizId': quizId },
      {
        $set: {
          'quizScores.$.score': score,
          'quizScores.$.totalQuestions': totalQuestions,
          'quizScores.$.timestamp': new Date(),
        },
      }
    ).then(async (matched) => {
      // If no quizScore entry existed yet, push a new one
      if (!matched) {
        await UserProgress.findOneAndUpdate(
          { userId },
          {
            $push: {
              quizScores: { quizId, score, totalQuestions, timestamp: new Date() },
            },
          }
        );
      }
    });

    return NextResponse.json({ success: true, totalScore: result.totalScore, updated: true });
  } catch (error: any) {
    console.error('Error saving score:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
