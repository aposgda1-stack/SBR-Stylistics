import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import { UserProgress } from '@/lib/models';

export async function GET() {
  try {
    await dbConnect();
    
    const leaderboard = await UserProgress.find({})
      .sort({ totalScore: -1 })
      .limit(10)
      .select('name totalScore updatedAt');

    return NextResponse.json(leaderboard);
  } catch (error: any) {
    console.error('Error fetching leaderboard:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
