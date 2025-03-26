export interface Workout {
  id: string;
  exerciseName: string;
  weight: number;
  reps: number;
  sets: number;
  date: string;
  notes?: string;
  dayName: string;
}

export interface WorkoutDay {
  name: string;
  workouts: Workout[];
}

export interface WorkoutContextType {
  workouts: Workout[];
  addWorkout: (workout: Omit<Workout, 'id'>) => void;
  editWorkout: (workout: Workout) => void;
  deleteWorkout: (id: string) => void;
  getWorkoutsByDay: () => WorkoutDay[];
}