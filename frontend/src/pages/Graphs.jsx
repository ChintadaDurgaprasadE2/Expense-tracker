import { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer
} from "recharts";

export default function Graphs() {
  const [cryptoData, setCryptoData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchCrypto();
  }, []);

  const fetchCrypto = async () => {
    setLoading(true);
    setError("");

    try {
      const res = await fetch(
        "https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum,solana&vs_currencies=inr"
      );

      if (!res.ok) throw new Error("Unable to load crypto prices.");

      const data = await res.json();
      const chartData = Object.entries(data).map(([key, value]) => ({
        name: key.charAt(0).toUpperCase() + key.slice(1),
        price: value.inr
      }));

      setCryptoData(chartData);
    } catch (err) {
      setError(err.message || "Error loading crypto prices.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <h2>Crypto Graphs</h2>

      <div className="card">
        <h3>Live Crypto Prices</h3>

        {loading ? (
          <p>Loading coin prices...</p>
        ) : error ? (
          <p>{error}</p>
        ) : (
          <>
            <p className="hint">
              Prices are fetched from CoinGecko and displayed in INR.
            </p>

            <div className="chart-wrapper">
              <ResponsiveContainer width="100%" height={360}>
                <BarChart data={cryptoData} margin={{ top: 20, right: 24, bottom: 20, left: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#cbd5e1" />
                  <XAxis dataKey="name" tick={{ fill: "#334155", fontSize: 14 }} />
                  <YAxis tick={{ fill: "#334155", fontSize: 14 }} />
                  <Tooltip formatter={(value) => [`₹${value.toLocaleString()}`, "Price"]} />
                  <Legend />
                  <Bar dataKey="price" fill="#0ea5e9" radius={[12, 12, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>

            <div className="crypto-summary">
              {cryptoData.map((item) => (
                <div key={item.name} className="summary-card">
                  <h3>{item.name}</h3>
                  <p>₹{item.price.toLocaleString()}</p>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
