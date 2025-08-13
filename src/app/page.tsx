"use client"


import {
  ShoppingBag,
  Users,
  Crosshair
} from "lucide-react";

import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"

import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"


import { CartesianGrid, Line, LineChart, XAxis, YAxis } from "recharts"

// componentes:
import Kards from "@/components/Cards/kards";
import Grafico from "@/components/Graficos/grafico";

const chartData = [
  { month: "January", clientes: 186 },
  { month: "February", clientes: 305 },
  { month: "March", clientes: 237 },
  { month: "April", clientes: 73 },
  { month: "May", clientes: 209 },
  { month: "June", clientes: 214 },
];
const chartConfig = {
  desktop: {
    label: "clientes",
    color: "var(--chart-1)",
  }
} satisfies ChartConfig


export default function Home() {
  return (
    <main className="sm:ml-14">
      <h1 className="m-5 font-bold text-lg lg:text-2xl">Dahsboard Geral</h1>
      <section className="grid grid-cols-2
      lg:grid-cols-4 w-[90%] mx-auto gap-4 ">
        <Kards
          titulo="Pedidos:"
          tituloDesc="Pedidos aprovados"
          icone={<ShoppingBag size={18} />}
          dados="200"
        />
        <Kards
          titulo="Ativos:"
          tituloDesc="Clientes Ativos"
          icone={<Users size={18} />}
          dados="55"
        />
        <Kards
          titulo="Ticket:"
          tituloDesc="Ticket Médio"
          icone={<Users size={18} />}
          dados="3200"
        />
        <Kards
          titulo="Meta:"
          tituloDesc="Meta Atingida"
          icone={<Crosshair size={18} />}
          dados="200"
        />
      </section>

      <section className="flex flex-col w-[100%]
      xl:flex-row flex-wrap g-10">
        <div className="w-full max-w-[100%] h-[300px]">
          <Grafico titulografico="Pedidos Realizados">
            <ChartContainer config={chartConfig} className="h-full">
              <LineChart
                accessibilityLayer
                data={chartData}
                height={300} // segurança extra
              >
                <CartesianGrid vertical={false} />
                <XAxis
                  dataKey="month"
                  tickLine={false}
                  axisLine={false}
                  tickMargin={8}
                  tickFormatter={(value) => value.slice(0, 3)}
                />
                <YAxis />
                <ChartTooltip
                  cursor={false}
                  content={<ChartTooltipContent hideLabel />}
                />
                <Line
                  dataKey="clientes"
                  type="natural"
                  stroke="var(--color-desktop)"
                  strokeWidth={2}
                  dot={{
                    fill: "var(--color-desktop)",
                  }}
                  activeDot={{
                    r: 6,
                  }}
                />
              </LineChart>
            </ChartContainer>
          </Grafico>
        </div>


      </section>

    </main>
  );
}
