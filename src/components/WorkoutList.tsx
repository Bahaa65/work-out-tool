import React, { useState } from 'react';
import { useWorkout } from '../context/WorkoutContext';
import { Trash2, Edit, Search, ChevronDown, ChevronUp } from 'lucide-react';
import { WorkoutForm } from './WorkoutForm';
import { Workout } from '../types/workout';

export const WorkoutList: React.FC = () => {
  const { getWorkoutsByDay, deleteWorkout } = useWorkout();
  const [searchTerm, setSearchTerm] = useState('');
  const [editingWorkout, setEditingWorkout] = useState<Workout | null>(null);
  const [expandedDays, setExpandedDays] = useState<string[]>([]);

  const workoutDays = getWorkoutsByDay();
  
  const filteredWorkoutDays = workoutDays.filter(day => {
    const matchesDay = day.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesExercise = day.workouts.some(workout => 
      workout.exerciseName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      workout.date.includes(searchTerm)
    );
    return matchesDay || matchesExercise;
  });

  const toggleDay = (dayName: string) => {
    setExpandedDays(prev => 
      prev.includes(dayName)
        ? prev.filter(d => d !== dayName)
        : [...prev, dayName]
    );
  };

  const handleEdit = (workout: Workout) => {
    setEditingWorkout(workout);
  };

  return (
    <div className="space-y-4">
      {editingWorkout && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg w-full max-w-2xl">
            <div className="p-4">
              <WorkoutForm
                editingWorkout={editingWorkout}
                onClose={() => setEditingWorkout(null)}
              />
            </div>
          </div>
        </div>
      )}

      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
        <input
          type="text"
          placeholder="Search by day, exercise, or date..."
          className="pl-10 pr-4 py-2 w-full rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="space-y-4">
        {filteredWorkoutDays.map(day => (
          <div key={day.name} className="bg-white rounded-lg shadow-md overflow-hidden">
            <button
              onClick={() => toggleDay(day.name)}
              className="w-full px-4 py-3 flex justify-between items-center bg-gray-50 hover:bg-gray-100"
            >
              <h3 className="text-lg font-semibold text-gray-800">{day.name}</h3>
              {expandedDays.includes(day.name) ? (
                <ChevronUp className="w-5 h-5 text-gray-500" />
              ) : (
                <ChevronDown className="w-5 h-5 text-gray-500" />
              )}
            </button>

            {expandedDays.includes(day.name) && (
              <div className="divide-y divide-gray-200">
                {day.workouts.map(workout => (
                  <div
                    key={workout.id}
                    className="p-4 hover:bg-gray-50"
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="text-lg font-semibold text-gray-800">{workout.exerciseName}</h4>
                        <p className="text-sm text-gray-600">{new Date(workout.date).toLocaleDateString()}</p>
                      </div>
                      <div className="flex space-x-2">
                        <button
                          onClick={() => handleEdit(workout)}
                          className="p-1 text-blue-600 hover:bg-blue-50 rounded-full"
                        >
                          <Edit className="w-5 h-5" />
                        </button>
                        <button
                          onClick={() => deleteWorkout(workout.id)}
                          className="p-1 text-red-600 hover:bg-red-50 rounded-full"
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </div>
                    </div>
                    
                    <div className="mt-2 grid grid-cols-3 gap-4">
                      <div>
                        <p className="text-sm text-gray-600">Weight</p>
                        <p className="font-medium">{workout.weight} kg</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Reps</p>
                        <p className="font-medium">{workout.reps}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Sets</p>
                        <p className="font-medium">{workout.sets}</p>
                      </div>
                    </div>
                    
                    {workout.notes && (
                      <div className="mt-2">
                        <p className="text-sm text-gray-600">Notes</p>
                        <p className="text-sm mt-1">{workout.notes}</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};