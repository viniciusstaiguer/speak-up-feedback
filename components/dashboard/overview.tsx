"use client"

import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts"

const data = [
  {
    name: "Jan",
    nps: 220,
    sentiment: 180,
  },
  {
    name: "Feb",
    nps: 300,
    sentiment: 200,
  },
  {
    name: "Mar",
    nps: 280,
    sentiment: 250,
  },
  {
    name: "Apr",
    nps: 350,
    sentiment: 300,
  },
  {
    name: "May",
    nps: 450,
    sentiment: 350,
  },
  {
    name: "Jun",
    nps: 500,
    sentiment: 390,
  },
]

export function Overview() {
  return (
    <ResponsiveContainer width="100%" height={350}>
      <BarChart data={data}>
        <XAxis dataKey="name" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
        <YAxis stroke="#888888" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `${value}`} />
        <Bar dataKey="nps" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} className="fill-primary" />
        <Bar dataKey="sentiment" fill="hsl(var(--secondary))" radius={[4, 4, 0, 0]} className="fill-secondary" />
      </BarChart>
    </ResponsiveContainer>
  )
}

