import React, { useState } from 'react';
import { useWorkout } from '../context/WorkoutContext';
import { Dumbbell, Save } from 'lucide-react';

interface WorkoutFormProps {
  onClose?: () => void;
  editingWorkout?: any;
}

export const WorkoutForm: React.FC<WorkoutFormProps> = ({ onClose, editingWorkout }) => {
  const { addWorkout, editWorkout } = useWorkout();
  const [formData, setFormData] = useState({
    exerciseName: editingWorkout?.exerciseName || '',
    weight: editingWorkout?.weight || '',
    reps: editingWorkout?.reps || '',
    sets: editingWorkout?.sets || '',
    date: editingWorkout?.date || new Date().toISOString().split('T')[0],
    notes: editingWorkout?.notes || '',
    dayName: editingWorkout?.dayName || ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingWorkout) {
      editWorkout({
        ...editingWorkout,
        ...formData,
        weight: Number(formData.weight),
        reps: Number(formData.reps),
        sets: Number(formData.sets)
      });
    } else {
      addWorkout({
        exerciseName: formData.exerciseName,
        weight: Number(formData.weight),
        reps: Number(formData.reps),
        sets: Number(formData.sets),
        date: formData.date,
        notes: formData.notes,
        dayName: formData.dayName
      });
    }
    setFormData({
      exerciseName: '',
      weight: '',
      reps: '',
      sets: '',
      date: new Date().toISOString().split('T')[0],
      notes: '',
      dayName: ''
    });
    if (onClose) onClose();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 rounded-lg shadow-md">
      <div className="flex items-center gap-2 mb-6">
        <Dumbbell className="w-6 h-6 text-blue-600" />
        <h2 className="text-xl font-semibold text-gray-800">
          {editingWorkout ? 'Edit Workout' : 'Log Workout'}
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700">Workout Day</label>
          <input
            type="text"
            required
            placeholder="e.g., Leg Day, Push Day"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            value={formData.dayName}
            onChange={(e) => setFormData({ ...formData, dayName: e.target.value })}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Exercise Name</label>
          <input
            type="text"
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            value={formData.exerciseName}
            onChange={(e) => setFormData({ ...formData, exerciseName: e.target.value })}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Weight (kg/lbs)</label>
          <input
            type="number"
            required
            min="0"
            step="0.5"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            value={formData.weight}
            onChange={(e) => setFormData({ ...formData, weight: e.target.value })}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Reps</label>
          <input
            type="number"
            required
            min="1"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            value={formData.reps}
            onChange={(e) => setFormData({ ...formData, reps: e.target.value })}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Sets</label>
          <input
            type="number"
            required
            min="1"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            value={formData.sets}
            onChange={(e) => setFormData({ ...formData, sets: e.target.value })}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Date</label>
          <input
            type="date"
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            value={formData.date}
            onChange={(e) => setFormData({ ...formData, date: e.target.value })}
          />
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700">Notes</label>
          <textarea
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            rows={3}
            value={formData.notes}
            onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
          />
        </div>
      </div>

      <div className="flex justify-end mt-6">
        <button
          type="submit"
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          <Save className="w-4 h-4" />
          {editingWorkout ? 'Update Workout' : 'Save Workout'}
        </button>
      </div>
    </form>
  );
};