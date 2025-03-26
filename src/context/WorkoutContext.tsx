import React, { createContext, useContext, useState, useEffect } from 'react';
import { Workout, WorkoutContextType, WorkoutDay } from '../types/workout';

const WorkoutContext = createContext<WorkoutContextType | undefined>(undefined);

export const WorkoutProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [workouts, setWorkouts] = useState<Workout[]>(() => {
    const savedWorkouts = localStorage.getItem('workouts');
    return savedWorkouts ? JSON.parse(savedWorkouts) : [];
  });

  useEffect(() => {
    localStorage.setItem('workouts', JSON.stringify(workouts));
  }, [workouts]);

  const addWorkout = (workout: Omit<Workout, 'id'>) => {
    const newWorkout = {
      ...workout,
      id: crypto.randomUUID(),
    };
    setWorkouts([...workouts, newWorkout]);
  };

  const editWorkout = (updatedWorkout: Workout) => {
    setWorkouts(workouts.map(workout => 
      workout.id === updatedWorkout.id ? updatedWorkout : workout
    ));
  };

  const deleteWorkout = (id: string) => {
    setWorkouts(workouts.filter(workout => workout.id !== id));
  };

  const getWorkoutsByDay = (): WorkoutDay[] => {
    const workoutsByDay = workouts.reduce((acc: { [key: string]: Workout[] }, workout) => {
      const day = workout.dayName || 'Uncategorized';
      if (!acc[day]) {
        acc[day] = [];
      }
      acc[day].push(workout);
      return acc;
    }, {});

    return Object.entries(workoutsByDay).map(([name, workouts]) => ({
      name,
      workouts: workouts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    }));
  };

  return (
    <WorkoutContext.Provider value={{ workouts, addWorkout, editWorkout, deleteWorkout, getWorkoutsByDay }}>
      {children}
    </WorkoutContext.Provider>
  );
};

export const useWorkout = () => {
  const context = useContext(WorkoutContext);
  if (context === undefined) {
    throw new Error('useWorkout must be used within a WorkoutProvider');
  }
  return context;
};