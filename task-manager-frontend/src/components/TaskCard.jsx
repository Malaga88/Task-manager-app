import DueDateBadge from './DueDateBadge';

// --- REFACTOR 1: Helper functions moved outside ---
// This prevents them from being redefined on every render.

const formatDate = (dateString) => {
  if (!dateString) return 'No due date';
  const date = new Date(dateString);
  // Using 'en-GB' as a common non-US format, or 'sv-SE' for YYYY-MM-DD.
  // Or stick with your 'en-US' if preferred.
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
};

// --- REFACTOR 2: Label map for cleaner display ---
// This makes it easier to add/change labels later without inline logic.
const statusLabels = {
  todo: 'Todo',
  'in-progress': 'In Progress',
  done: 'Done',
};

const TaskCard = ({ task, onEdit, onDelete }) => {
  const statusColors = {
    todo: 'bg-yellow-100 text-yellow-800 border-yellow-200 dark:bg-yellow-900/30 dark:text-yellow-400 dark:border-yellow-800',
    'in-progress': 'bg-purple-100 text-purple-800 border-purple-200 dark:bg-purple-900/30 dark:text-purple-400 dark:border-purple-800',
    done: 'bg-green-100 text-green-800 border-green-200 dark:bg-green-900/30 dark:text-green-400 dark:border-green-800',
  };

  const priorityColors = {
    // --- BUGFIX: Changed dark:bg-gray-800 to dark:bg-gray-700 ---
    // The old color would be invisible against the card's dark:bg-gray-800
    low: 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300',
    medium: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400',
    high: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400',
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md border border-gray-200 dark:border-gray-700 p-6 hover:shadow-xl transition-all duration-200 fade-in flex flex-col h-full">
      <div className="flex justify-between items-start mb-3">
        <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100 flex-1 break-words">
          {task.title}
        </h3>
        <div className="flex gap-2 ml-2 flex-shrink-0">
          <button
            onClick={() => onEdit(task)}
            className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 hover:bg-blue-50 dark:hover:bg-blue-900/30 p-2 rounded-lg transition"
            title="Edit task"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
              />
            </svg>
          </button>
          <button
            onClick={() => onDelete(task._id)}
            className="text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 hover:bg-red-50 dark:hover:bg-red-900/30 p-2 rounded-lg transition"
            title="Delete task"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
              />
            </svg>
          </button>
        </div>
      </div>

      {/* This component presumably shows the "Overdue" / "Due soon" text */}
      <div className="mb-3">
        <DueDateBadge dueDate={task.dueDate} status={task.status} />
      </div>

      {/* Added flex-grow to push footer to bottom */}
      <div className="flex-grow">
        {task.description && (
          <p className="text-gray-600 dark:text-gray-400 mb-4 line-clamp-2">
            {task.description}
          </p>
        )}
      </div>

      {/* Footer section */}
      <div className="mt-auto pt-4">
        <div className="flex flex-wrap gap-2 mb-4">
          <span
            className={`px-3 py-1 rounded-full text-xs font-semibold border ${
              statusColors[task.status]
            }`}
          >
            {/* Used the statusLabels map here */}
            {statusLabels[task.status] || 'Unknown'}
          </span>
          <span
            className={`px-3 py-1 rounded-full text-xs font-semibold ${
              priorityColors[task.priority]
            }`}
          >
            {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}{' '}
            Priority
          </span>
        </div>

        {/* --- REFACTOR 3: Removed redundant date display ---
            Since you have a <DueDateBadge />, this text display of the 
            same date is likely redundant. I've commented it out.
            If you want it back, just uncomment this block.
        */}
        {/*
        <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
          <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          {formatDate(task.dueDate)}
        </div>
        */}
      </div>
    </div>
  );
};

export default TaskCard;