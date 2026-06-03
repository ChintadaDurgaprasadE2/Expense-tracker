import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer
} from "recharts";

const COLORS = ["#22c55e", "#ef4444"]; // green = income, red = expense

export default function ChartComponent({ data }) {
  return (
    <div className="chart-wrapper">
      <ResponsiveContainer width="100%" height={350}>
        <PieChart>
        <Pie
          data={data}
          dataKey="value"
          nameKey="name"
          cx="50%"
          cy="50%"
          outerRadius={110}
          label={({ name, percent }) =>
            `${name}: ${(percent * 100).toFixed(0)}%`
          }
        >
          {data.map((entry, index) => (
            <Cell key={index} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>

        <Tooltip />
        <Legend verticalAlign="bottom" height={36} />
      </PieChart>
      </ResponsiveContainer>
    </div>
  );
}