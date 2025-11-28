import "../../css/charts.css";
import { useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Area,
} from "recharts";

import { semanas } from "../../db/semanas.js";
import {
  calcularInflacionAcumulada,
  filtrarSemanas,
} from "../../utils/inflacion.js";

export default function Charts() {
  const [filtro, setFiltro] = useState("all");

  const semanasFiltradas = filtrarSemanas(semanas, filtro);

  const dataFiltrada = calcularInflacionAcumulada(semanasFiltradas);

  return (
    <div className="chart-section">
      <div className="chart_buttons">
        <button onClick={() => setFiltro("1m")}>1 Mes</button>
        <button onClick={() => setFiltro("2m")}>2 Meses</button>
        <button onClick={() => setFiltro("4m")}>4 Meses</button>
        <button onClick={() => setFiltro("6m")}>6 Meses</button>
        <button onClick={() => setFiltro("1y")}>1 Año</button>
        <button onClick={() => setFiltro("all")}>Todo</button>
      </div>

      <div className="chart">
        <ResponsiveContainer>
          <LineChart
            data={dataFiltrada}
            margin={{ top: 5, right: 0, left: 0, bottom: 5 }}
          >
            <defs>
              <linearGradient id="greenGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#00ff00" stopOpacity={0.4} />
                <stop offset="100%" stopColor="#003300" stopOpacity={0.2} />
              </linearGradient>
            </defs>

            <CartesianGrid strokeDasharray="3 3" stroke="#003300" />

            <XAxis
              dataKey="semana"
              tick={{ fill: "#aaa", fontSize: 12 }}
              angle={-30}
              textAnchor="end"
              height={60}
              padding={{ left: 0, right: 0 }}
            />

            <YAxis
              tick={{ fill: "#aaa", fontSize: 12 }}
              tickFormatter={(value) => `${value.toFixed(1)}%`}
            />

            <Tooltip
              formatter={(value) => `${value.toFixed(2)}%`}
              contentStyle={{
                background: "#000",
                border: "1px solid #0f0",
                borderRadius: "10px",
              }}
              labelStyle={{ color: "#0f0" }}
            />

            <Area
              type="monotone"
              dataKey="acumulado"
              stroke="none"
              fill="url(#greenGradient)"
            />

            <Line
              type="monotone"
              dataKey="acumulado"
              stroke="#00ff88"
              strokeWidth={3}
              dot={{
                r: 6,
                strokeWidth: 2,
                stroke: "#000",
                fill: "#00ffcc",
              }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
