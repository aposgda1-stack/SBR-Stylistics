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
    if (score === undefined || totalQuestions === undefined) {
      return NextResponse.json({ error: 'Score and totalQuestions required' }, { status: 400 });
    }

    await dbConnect();
    const user = await currentUser();

    const existingProgress = await UserProgress.findOne({ userId });
    
    // Calculate new total score
    // We replace the score for the same quiz if it exists, otherwise add it
    const updatedScores = existingProgress?.quizScores || [];
    const scoreIndex = updatedScores.findIndex((s: any) => s.quizId === quizId);
    
    if (scoreIndex > -1) {
      // Only update if current score is higher
      if (score > updatedScores[scoreIndex].score) {
        updatedScores[scoreIndex].score = score;
        updatedScores[scoreIndex].totalQuestions = totalQuestions;
        updatedScores[scoreIndex].timestamp = new Date();
      }
    } else {
      updatedScores.push({ quizId, score, totalQuestions, timestamp: new Date() });
    }

    const newTotalScore = updatedScores.reduce((acc: number, curr: any) => acc + curr.score, 0);

    const result = await UserProgress.findOneAndUpdate(
      { userId },
      {
        $set: { 
          quizScores: updatedScores,
          totalScore: newTotalScore,
          name: user?.firstName ? `${user.firstName} ${user.lastName || ''}` : user?.username || 'Student',
          email: user?.emailAddresses[0]?.emailAddress,
          updatedAt: new Date() 
        },
      },
      { upsert: true, new: true }
    );

    return NextResponse.json({ success: true, totalScore: result.totalScore });
  } catch (error: any) {
    console.error('Error saving score:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
