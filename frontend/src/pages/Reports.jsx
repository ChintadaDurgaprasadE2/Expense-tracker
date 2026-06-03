import { useEffect, useMemo, useState } from "react";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  BarChart,
  Bar
} from "recharts";
import API from "../api.jsx";

const formatDate = (value) => {
  const date = new Date(value);
  return date.toLocaleDateString("en-GB", { day: "2-digit", month: "short" });
};

const formatMonth = (value) => {
  const date = new Date(value);
  return date.toLocaleDateString("en-GB", { month: "short", year: "numeric" });
};

const getItemDate = (item) => {
  return item.date || item.createdAt || item.updatedAt || new Date().toISOString();
};

const groupByKey = (items, keyFn) => {
  return items.reduce((acc, item) => {
    const key = keyFn(item);
    acc[key] = (acc[key] || 0) + Number(item.amount || item.value || 0);
    return acc;
  }, {});
};

export default function Reports() {
  const [income, setIncome] = useState([]);
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchReports = async () => {
      setLoading(true);
      setError("");

      try {
        const [incRes, expRes] = await Promise.all([
          API.get("/income"),
          API.get("/expenses")
        ]);

        setIncome(incRes.data);
        setExpenses(expRes.data);
      } catch (err) {
        setError(err.response?.data?.msg || "Unable to fetch report data.");
      } finally {
        setLoading(false);
      }
    };

    fetchReports();
  }, []);

  const dailyData = useMemo(() => {
    const incomeByDay = groupByKey(income, (item) => {
      const date = new Date(getItemDate(item));
      return date.toISOString().slice(0, 10);
    });

    const expenseByDay = groupByKey(expenses, (item) => {
      const date = new Date(getItemDate(item));
      return date.toISOString().slice(0, 10);
    });

    const days = Array.from(
      new Set([...Object.keys(incomeByDay), ...Object.keys(expenseByDay)])
    ).sort();

    return days.map((day) => ({
      date: formatDate(day),
      Income: incomeByDay[day] || 0,
      Expense: expenseByDay[day] || 0
    }));
  }, [income, expenses]);

  const monthlyData = useMemo(() => {
    const incomeByMonth = groupByKey(income, (item) => {
      const date = new Date(getItemDate(item));
      return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}`;
    });

    const expenseByMonth = groupByKey(expenses, (item) => {
      const date = new Date(getItemDate(item));
      return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}`;
    });

    const months = Array.from(
      new Set([...Object.keys(incomeByMonth), ...Object.keys(expenseByMonth)])
    ).sort();

    return months.map((monthKey) => {
      const [year, month] = monthKey.split("-");
      const date = new Date(Number(year), Number(month) - 1, 1);
      return {
        month: formatMonth(date),
        Income: incomeByMonth[monthKey] || 0,
        Expense: expenseByMonth[monthKey] || 0
      };
    });
  }, [income, expenses]);

  return (
    <div className="container">
      <h2>Reports</h2>

      {loading ? (
        <div className="card">
          <p>Loading report charts...</p>
        </div>
      ) : error ? (
        <div className="card">
          <p>{error}</p>
        </div>
      ) : (
        <>
          <div className="card">
            <h3>Day-wise Income vs Expense</h3>
            <div className="chart-wrapper">
              <ResponsiveContainer width="100%" height={320}>
                <LineChart data={dailyData} margin={{ top: 20, right: 24, left: 0, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#cbd5e1" />
                  <XAxis dataKey="date" tick={{ fill: "#334155", fontSize: 12 }} />
                  <YAxis tick={{ fill: "#334155", fontSize: 12 }} />
                  <Tooltip formatter={(value) => [`₹${value.toLocaleString()}`, "Amount"]} />
                  <Legend />
                  <Line type="monotone" dataKey="Income" stroke="#22c55e" strokeWidth={3} dot={{ r: 4 }} />
                  <Line type="monotone" dataKey="Expense" stroke="#ef4444" strokeWidth={3} dot={{ r: 4 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="card">
            <h3>Monthly Income vs Expense</h3>
            <div className="chart-wrapper">
              <ResponsiveContainer width="100%" height={320}>
                <BarChart data={monthlyData} margin={{ top: 20, right: 24, left: 0, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#cbd5e1" />
                  <XAxis dataKey="month" tick={{ fill: "#334155", fontSize: 12 }} />
                  <YAxis tick={{ fill: "#334155", fontSize: 12 }} />
                  <Tooltip formatter={(value) => [`₹${value.toLocaleString()}`, "Amount"]} />
                  <Legend />
                  <Bar dataKey="Income" fill="#22c55e" radius={[12, 12, 0, 0]} />
                  <Bar dataKey="Expense" fill="#ef4444" radius={[12, 12, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
