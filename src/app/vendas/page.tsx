"use client";

// componentes:
import Kards from "@/components/Cards/kards";
import Grafico from "@/components/Graficos/grafico";
import Tabelas from "@/components/Tabelas/tabelas";

import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Label,
  LabelList,
  PolarAngleAxis,
  PolarGrid,
  PolarRadiusAxis,
  RadarChart,
  RadialBar,
  RadialBarChart,
  Rectangle,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  Radar,
} from "recharts";

import {
  ShoppingBag,
  Users,
  Crosshair,
  BadgeDollarSign,
  Circle,
  Package,
  Truck,
} from "lucide-react";

import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

const vendas = [
  { month: "janeiro", vendas: 186 },
  { month: "fevereiro", vendas: 305 },
  { month: "Marco", vendas: 237 },
  { month: "Abril", vendas: 73 },
  { month: "Maio", vendas: 209 },
  { month: "Julho", vendas: 214 },
];
const vendasConfig = {
  desktop: {
    label: "vendas",
    color: "var(--chart-1)",
  },
} satisfies ChartConfig;

const vendaporempresa = [
  { empresa: "Matriz", vendas: 500, fill: "var(--chart-1)" },
  { empresa: "Filial 1", vendas: 305, fill: "var(--chart-2)" },
  { empresa: "Filial 2", vendas: 237, fill: "var(--chart-3)" },
  { empresa: "Filial 3", vendas: 73, fill: "var(--chart-4)" },
];

const vendasporempresaConfig = {
  visitors: {
    label: "Visitors",
  },
  Matriz: {
    label: "Matriz",
    color: "var(--chart-1)",
  },
  Filial1: {
    label: "Filial1",
    color: "var(--chart-2)",
  },
  filial2: {
    label: "Filial2",
    color: "var(--chart-3)",
  },
  filial3: {
    label: "Filial3",
    color: "var(--chart-4)",
  },
} satisfies ChartConfig;

const vendasUltimoMes = [
  { nome: "janeiro", vendas: 1300, fill: "var(--chart-1)" },
];
const vendasMesConfig = {
  vendas: {
    label: "vendas",
  },
  safari: {
    label: "janeiro",
    color: "var(--chart-1)",
  },
} satisfies ChartConfig;

const ticketmedio = [{ nome: "media", vendas: 350, fill: "var(--chart-1)" }];
const tickectConfig = {
  vendas: {
    label: "vendas",
  },
  safari: {
    label: "janeiro",
    color: "var(--chart-1)",
  },
} satisfies ChartConfig;

const formasDePagamento = [
  { month: "Credito", desktop: 186 },
  { month: "Débito", desktop: 305 },
  { month: "Boleto", desktop: 237 },
  { month: "Dinheiro", desktop: 273 },
  { month: "Digitais", desktop: 209 },
];

const formasConfig = {
  desktop: {
    label: "desktop",
    color: "var(--chart-1)",
  },
} satisfies ChartConfig;

export default function VendasPage() {
  return (
    <main className="sm:ml-14">
      <h1 className="m-5 font-bold text-lg lg:text-2xl">DashBoard Vendas</h1>
      <section
        className="flex flex-col w-[75%] mx-auto gap-5 
      md:w-[55%] 
      lg:grid-cols-3 lg:grid lg:w-[85%]
      2xl:w-[70%] 2xl:gap-15"
      >
        <Kards
          titulo="Produto:"
          tituloDesc="Mais Vendido"
          icone={<Package size={18} />}
          dados="Teclado gamer hypex"
        />
        <Kards
          titulo="Fornecedor:"
          tituloDesc="Fornecedor líder"
          icone={<Truck size={18} />}
          dados="Transporte logicom ltda"
        />
        <Kards
          titulo="Vendas:"
          tituloDesc="Total Vendas"
          icone={<BadgeDollarSign size={18} />}
          dados="32000"
        />
      </section>
      <section
        className="flex flex-col justify-center items-center mb-5
            lg:flex-row lg:flex-wrap lg:gap-5"
      >
        <div
          className="w-[95%] mb-5
                lg:w-[60%] lg:mb-0"
        >
          <Grafico titulografico="Vendas">
            <ResponsiveContainer height={200}>
              <ChartContainer config={vendasConfig} className="h-full w-full">
                <AreaChart
                  accessibilityLayer
                  data={vendas}
                  margin={{
                    left: -20,
                    right: 12,
                  }}
                >
                  <CartesianGrid vertical={false} />
                  <XAxis
                    dataKey="month"
                    tickLine={false}
                    axisLine={false}
                    tickMargin={8}
                    tickFormatter={(value) => value.slice(0, 3)}
                  />
                  <YAxis
                    tickLine={false}
                    axisLine={false}
                    tickMargin={8}
                    tickCount={3}
                  />
                  <ChartTooltip
                    cursor={false}
                    content={<ChartTooltipContent />}
                  />
                  <Area
                    dataKey="vendas"
                    type="natural"
                    fill="var(--color-desktop)"
                    fillOpacity={0.4}
                    stroke="var(--color-desktop)"
                    stackId="a"
                  />
                </AreaChart>
              </ChartContainer>
            </ResponsiveContainer>
          </Grafico>
        </div>
        <div className="w-[95%] lg:w-[30%]">
          <Grafico titulografico="Vendas Por Empresa">
            <ResponsiveContainer height={200}>
              <ChartContainer
                config={vendasporempresaConfig}
                className="h-full w-full"
              >
                <BarChart accessibilityLayer data={vendaporempresa}>
                  <CartesianGrid vertical={false} />
                  <XAxis dataKey="empresa" tickMargin={10} axisLine={false} />
                  <YAxis />
                  <ChartTooltip
                    cursor={false}
                    content={<ChartTooltipContent hideLabel />}
                  />
                  <Bar
                    dataKey="vendas"
                    fill="var(--color-desktop)"
                    radius={5}
                  />
                </BarChart>
              </ChartContainer>
            </ResponsiveContainer>
          </Grafico>
        </div>
      </section>
      <section className="flex flex-col justify-center mb-5 items-center lg:flex-row lg:flex-wrap lg:gap-5 lg:mb-0">
        <div className="w-[95%] lg:w-[30%] mb-5 lg:mb-0">
          <Grafico titulografico="Vendas Ultimo Mês">
            <ResponsiveContainer height={250}>
              <ChartContainer
                config={vendasMesConfig}
                className="h-full w-full"
              >
                <RadialBarChart
                  data={vendasUltimoMes}
                  startAngle={0}
                  endAngle={250}
                  innerRadius={80}
                  outerRadius={110}
                >
                  <PolarGrid
                    gridType="circle"
                    radialLines={false}
                    stroke="none"
                    className="first:fill-muted last:fill-background"
                    polarRadius={[86, 74]}
                  />
                  <RadialBar dataKey="vendas" background cornerRadius={10} />

                  <PolarRadiusAxis
                    tick={false}
                    tickLine={false}
                    axisLine={false}
                  >
                    <Label
                      content={({ viewBox }) => {
                        if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                          return (
                            <text
                              x={viewBox.cx}
                              y={viewBox.cy}
                              textAnchor="middle"
                              dominantBaseline="middle"
                            >
                              <tspan
                                x={viewBox.cx}
                                y={viewBox.cy}
                                className="fill-foreground text-3xl font-bold"
                              >
                                R${vendasUltimoMes[0].vendas.toLocaleString()}
                              </tspan>
                              <tspan
                                x={viewBox.cx}
                                y={(viewBox.cy || 0) + 24}
                                className="fill-muted-foreground"
                              >
                                Vendas
                              </tspan>
                            </text>
                          );
                        }
                      }}
                    />
                  </PolarRadiusAxis>
                </RadialBarChart>
              </ChartContainer>
            </ResponsiveContainer>
          </Grafico>
        </div>
        <div className="w-[95%] lg:w-[29%] mb-5 lg:mb-0">
          <Grafico titulografico="Ticket Médio">
            <ResponsiveContainer height={250}>
              <ChartContainer
                config={tickectConfig}
                className="mx-auto aspect-square max-h-[250px]"
              >
                <RadialBarChart
                  data={ticketmedio}
                  endAngle={100}
                  innerRadius={80}
                  outerRadius={140}
                >
                  <PolarGrid
                    gridType="circle"
                    radialLines={false}
                    stroke="none"
                    className="first:fill-muted last:fill-background"
                    polarRadius={[86, 74]}
                  />
                  <RadialBar dataKey="vendas" background />
                  <PolarRadiusAxis
                    tick={false}
                    tickLine={false}
                    axisLine={false}
                  >
                    <Label
                      content={({ viewBox }) => {
                        if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                          return (
                            <text
                              x={viewBox.cx}
                              y={viewBox.cy}
                              textAnchor="middle"
                              dominantBaseline="middle"
                            >
                              <tspan
                                x={viewBox.cx}
                                y={viewBox.cy}
                                className="fill-foreground text-3xl font-bold"
                              >
                                R${ticketmedio[0].vendas.toLocaleString()}
                              </tspan>
                              <tspan
                                x={viewBox.cx}
                                y={(viewBox.cy || 0) + 24}
                                className="fill-muted-foreground"
                              >
                                Média
                              </tspan>
                            </text>
                          );
                        }
                      }}
                    />
                  </PolarRadiusAxis>
                </RadialBarChart>
              </ChartContainer>
            </ResponsiveContainer>
          </Grafico>
        </div>
        <div className="w-[95%] lg:w-[30%]">
          <Grafico titulografico="Formas De Pagamento">
            <ResponsiveContainer height={250}>
              <ChartContainer config={formasConfig} className="h-full w-full">
                <RadarChart data={formasDePagamento}>
                  <ChartTooltip
                    cursor={false}
                    content={<ChartTooltipContent />}
                  />
                  <PolarAngleAxis dataKey="month" />
                  <PolarGrid />
                  <Radar
                    dataKey="desktop"
                    fill="var(--color-desktop)"
                    fillOpacity={0.6}
                    dot={{
                      r: 4,
                      fillOpacity: 1,
                    }}
                  />
                </RadarChart>
              </ChartContainer>
            </ResponsiveContainer>
          </Grafico>
        </div>
      </section>
    </main>
  );
}
