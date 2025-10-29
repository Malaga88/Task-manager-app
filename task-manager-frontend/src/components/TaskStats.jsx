const TaskStats = ({ tasks }) => {
  const stats = {
    total: tasks.length,
    todo: tasks.filter((t) => t.status === 'todo').length,
    inProgress: tasks.filter((t) => t.status === 'in-progress').length,
    done: tasks.filter((t) => t.status === 'done').length,
  };

  const statCards = [
    { label: 'Total Tasks', value: stats.total, color: 'from-blue-500 to-blue-600', icon: '📋' },
    { label: 'To Do', value: stats.todo, color: 'from-yellow-500 to-yellow-600', icon: '📝' },
    { label: 'In Progress', value: stats.inProgress, color: 'from-purple-500 to-purple-600', icon: '⚡' },
    { label: 'Completed', value: stats.done, color: 'from-green-500 to-green-600', icon: '✅' },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      {statCards.map((stat, index) => (
        <div
          key={index}
          className="bg-white rounded-xl shadow-md p-6 border border-gray-100 hover:shadow-lg transition-shadow duration-200"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm font-medium mb-1">{stat.label}</p>
              <p className="text-3xl font-bold text-gray-800">{stat.value}</p>
            </div>
            <div className={`text-4xl bg-gradient-to-br ${stat.color} w-14 h-14 rounded-xl flex items-center justify-center shadow-lg`}>
              {stat.icon}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TaskStats;