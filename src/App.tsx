import React from 'react';
import { WorkoutProvider } from './context/WorkoutContext';
import { WorkoutForm } from './components/WorkoutForm';
import { WorkoutList } from './components/WorkoutList';
import { Dumbbell } from 'lucide-react';

function App() {
  return (
    <WorkoutProvider>
      <div className="min-h-screen bg-gray-100">
        <header className="bg-white shadow-sm">
          <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
            <div className="flex items-center gap-2">
              <Dumbbell className="w-8 h-8 text-blue-600" />
              <h1 className="text-2xl font-bold text-gray-900">Workout Tracker</h1>
            </div>
          </div>
        </header>

        <main className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div>
              <WorkoutForm />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-gray-800 mb-4">Your Workouts</h2>
              <WorkoutList />
            </div>
          </div>
        </main>
      </div>
    </WorkoutProvider>
  );
}

export default App;