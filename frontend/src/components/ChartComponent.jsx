import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend
} from "recharts";

const COLORS = ["#22c55e", "#ef4444"]; // green = income, red = expense

export default function ChartComponent({ data }) {
  return (
    <div style={{ display: "flex", justifyContent: "center"}}>
      <PieChart width={450} height={350}>
        <Pie
          data={data}
          dataKey="value"
          nameKey="name"
          cx="50%"
          cy="50%"
          outerRadius={100}
          label={({ name, percent }) =>
            `${name}: ${(percent * 100).toFixed(0)}%`
          }
        >
          {data.map((entry, index) => (
            <Cell key={index} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>

        {/* Tooltip on hover */}
        <Tooltip />

        {/* Legend (Income / Expense) */}
        <Legend />
      </PieChart>
    </div>
  );
}