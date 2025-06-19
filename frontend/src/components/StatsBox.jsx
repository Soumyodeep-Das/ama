export default function StatsBox({ stats }) {
    return (
      <div className="flex justify-between bg-white/5 p-4 rounded-xl mb-4 backdrop-blur-sm text-sm text-gray-200">
        <div>Total: {stats.total}</div>
        <div>Answered: {stats.answered}</div>
        <div>Unanswered: {stats.unanswered}</div>
      </div>
    );
  }
  