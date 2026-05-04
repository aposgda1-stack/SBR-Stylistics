import { NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import dbConnect from '@/lib/mongodb';
import { UserProgress } from '@/lib/models';

export async function GET() {
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ score: 0 });
    }

    await dbConnect();
    const progress = await UserProgress.findOne({ userId }).select('totalScore');

    return NextResponse.json({ 
      score: progress?.totalScore || 0 
    });
  } catch (error: any) {
    console.error('Error fetching user score:', error);
    return NextResponse.json({ score: 0 });
  }
}
