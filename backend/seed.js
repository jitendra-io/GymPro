import { syncDatabase, User, Member, GymClass, Workout, BmiRecord } from './models/index.js';

async function seedData() {
  try {
    console.log('🌱 Starting database seeding for Gym Project...');
    await syncDatabase();

    // 1. Seed Classes
    const existingClasses = await GymClass.count();
    if (existingClasses === 0) {
      await GymClass.bulkCreate([
        {
          title: 'HIIT Extreme',
          instructor: 'Marcus Johnson',
          scheduleTime: 'Mon, Wed, Fri - 6:00 AM',
          level: 'Advanced',
          capacity: 20,
          description: 'High-intensity interval training designed to push your cardiovascular limits and burn maximum calories.',
          image: 'https://images.unsplash.com/photo-1548690312-e3b507d8c110?w=600&q=80',
        },
        {
          title: 'Powerlifting Base',
          instructor: 'Alex Mercer',
          scheduleTime: 'Tue, Thu - 5:30 PM',
          level: 'All Levels',
          capacity: 15,
          description: 'Focus on the big three: squat, bench, and deadlift. Build raw strength with expert form coaching.',
          image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=600&q=80',
        },
        {
          title: 'Zen Yoga Flow',
          instructor: 'Sarah Chen',
          scheduleTime: 'Weekends - 8:00 AM',
          level: 'Beginner Friendly',
          capacity: 25,
          description: 'Improve flexibility, balance, and core strength through guided flows and deep stretching.',
          image: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?w=600&q=80',
        },
        {
          title: 'Endurance Cycling',
          instructor: 'Emily Davis',
          scheduleTime: 'Mon, Wed - 7:00 PM',
          level: 'Intermediate',
          capacity: 20,
          description: 'Rhythm-based indoor cycling that will challenge your endurance and build lower body power.',
          image: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=600&q=80',
        },
      ]);
      console.log('✅ Gym Classes seeded successfully');
    } else {
      console.log('ℹ️ Classes already exist, skipping class seed');
    }

    // 2. Seed Sample Members
    const existingMembers = await Member.count();
    if (existingMembers === 0) {
      await Member.bulkCreate([
        {
          name: 'Jiten Sharma',
          email: 'jiten@example.com',
          phone: '+91 9876543210',
          plan: 'VIP',
          status: 'Active',
        },
        {
          name: 'Alex Mercer',
          email: 'alex@example.com',
          phone: '+91 9876543211',
          plan: 'Premium',
          status: 'Active',
        },
        {
          name: 'Sarah Chen',
          email: 'sarah@example.com',
          phone: '+91 9876543212',
          plan: 'Standard',
          status: 'Active',
        },
      ]);
      console.log('✅ Members seeded successfully');
    } else {
      console.log('ℹ️ Members already exist, skipping member seed');
    }

    // 3. Seed Sample Workouts
    const existingWorkouts = await Workout.count();
    if (existingWorkouts === 0) {
      await Workout.bulkCreate([
        {
          workoutType: 'Chest & Back Hypertrophy',
          durationMinutes: 60,
          caloriesBurned: 520,
          notes: 'Bench press 4x8, Lat pulldowns 4x10, Incline DB press.',
        },
        {
          workoutType: 'HIIT Cardio Circuit',
          durationMinutes: 45,
          caloriesBurned: 480,
          notes: 'Sprints, box jumps, kettlebell swings.',
        },
        {
          workoutType: 'Leg Day & Core',
          durationMinutes: 70,
          caloriesBurned: 650,
          notes: 'Barbell Squats 5x5, Romanian Deadlifts 4x8.',
        },
      ]);
      console.log('✅ Workouts seeded successfully');
    } else {
      console.log('ℹ️ Workouts already exist, skipping workout seed');
    }

    // 4. Seed Sample BMI Record
    const existingBmi = await BmiRecord.count();
    if (existingBmi === 0) {
      await BmiRecord.create({
        heightCm: 175,
        weightKg: 72,
        bmi: 23.5,
        category: 'Normal weight',
      });
      console.log('✅ Initial BMI Record seeded');
    }

    // 5. Seed Demo User
    const existingUsers = await User.count();
    if (existingUsers === 0) {
      await User.create({
        name: 'Jiten Sharma',
        email: 'jiten@gympro.com',
        password: 'password123',
        phone: '+91 9876543210',
        role: 'admin',
      });
      console.log('✅ Demo Admin User created: email: jiten@gympro.com, password: password123');
    } else {
      console.log('ℹ️ Users already exist, skipping user seed');
    }

    console.log('🎉 Seeding completed successfully!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Seeding error:', error);
    process.exit(1);
  }
}

seedData();

