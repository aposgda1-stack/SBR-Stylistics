import { NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import dbConnect from '@/lib/mongodb';
import { UserProgress } from '@/lib/models';

export async function GET() {
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await dbConnect();
    const progress = await UserProgress.findOne({ userId });

    if (!progress) {
      return NextResponse.json({
        completedLessons: [],
        quizScores: [],
        totalScore: 0
      });
    }

    return NextResponse.json(progress);
  } catch (error: any) {
    console.error('Error fetching user progress:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
