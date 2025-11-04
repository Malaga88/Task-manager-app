const DueDateBadge = ({ dueDate, status }) => {
  if (!dueDate || status === 'done') return null;

  const today = new Date();
  today.setHours(0, 0, 0, 0);
  
  const due = new Date(dueDate);
  due.setHours(0, 0, 0, 0);

  const diffTime = due - today;
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  let badgeColor = '';
  let badgeText = '';
  let icon = '';

  if (diffDays < 0) {
    badgeColor = 'bg-red-100 text-red-700 border-red-300 dark:bg-red-900/30 dark:text-red-400 dark:border-red-800';
    badgeText = `Overdue by ${Math.abs(diffDays)} day${Math.abs(diffDays) !== 1 ? 's' : ''}`;
    icon = '🚨';
  } else if (diffDays === 0) {
    badgeColor = 'bg-orange-100 text-orange-700 border-orange-300 dark:bg-orange-900/30 dark:text-orange-400 dark:border-orange-800';
    badgeText = 'Due today';
    icon = '⚠️';
  } else if (diffDays <= 3) {
    badgeColor = 'bg-yellow-100 text-yellow-700 border-yellow-300 dark:bg-yellow-900/30 dark:text-yellow-400 dark:border-yellow-800';
    badgeText = `Due in ${diffDays} day${diffDays !== 1 ? 's' : ''}`;
    icon = '⏰';
  } else {
    return null; // Don't show badge if more than 3 days away
  }

  return (
    <div className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold border ${badgeColor} animate-pulse`}>
      <span>{icon}</span>
      <span>{badgeText}</span>
    </div>
  );
};

export default DueDateBadge;