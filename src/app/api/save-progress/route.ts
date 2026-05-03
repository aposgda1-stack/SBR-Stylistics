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

    const { lessonId } = await req.json();
    if (!lessonId) {
      return NextResponse.json({ error: 'Lesson ID required' }, { status: 400 });
    }

    await dbConnect();
    const user = await currentUser();

    const result = await UserProgress.findOneAndUpdate(
      { userId },
      {
        $addToSet: { completedLessons: lessonId },
        $set: { 
          name: user?.firstName ? `${user.firstName} ${user.lastName || ''}` : user?.username || 'Student',
          email: user?.emailAddresses[0]?.emailAddress,
          updatedAt: new Date() 
        },
      },
      { upsert: true, new: true }
    );

    return NextResponse.json({ success: true, completedLessons: result.completedLessons });
  } catch (error: any) {
    console.error('Error saving progress:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
