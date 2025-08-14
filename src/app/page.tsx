"use client"


import {
  ShoppingBag,
  Users,
  Crosshair,
  BadgeDollarSign,
  Circle
} from "lucide-react";

import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";


import { CartesianGrid, Line, LineChart, Pie, PieChart, ResponsiveContainer, XAxis, YAxis, Label, PolarRadiusAxis, RadialBar, RadialBarChart, Bar, BarChart, Legend } from "recharts"

// componentes:
import Kards from "@/components/Cards/kards";
import Grafico from "@/components/Graficos/grafico";
import Tabelas from "@/components/Tabelas/tabelas";


const pedidos = [
  { month: "Janeiro", pedidos: 186 },
  { month: "Fevereiro", pedidos: 305 },
  { month: "Março", pedidos: 237 },
  { month: "Abril", pedidos: 73 },
  { month: "Maio", pedidos: 209 },
  { month: "Julho", pedidos: 214 },
];


const pedidosConfig = {
  desktop: {
    label: "pedidos",
    color: "var(--chart-1)",
  }
} satisfies ChartConfig

const clientes = [
  { name: "Cadastrados", value: 350, fill: "var(--chart-1)" },
  { name: "Ativos", value: 100, fill: "var(--chart-2)" },
]
const clientesConfig = {
  value: {
    label: "Clientes",
  },
  Cadastrados: {
    label: "Cadastrados",
    color: "var(--chart-1)",
  },
  Ativos: {
    label: "Ativos",
    color: "var(--chart-2)",
  },
} satisfies ChartConfig

const vendapormeta = [{ vendas: 1260, meta: 5700 }]

const vendapormetaconfig = {
  desktop: {
    label: "meta",
    color: "var(--chart-1)",
  },
  mobile: {
    label: "vendas",
    color: "var(--chart-2)",
  },
} satisfies ChartConfig

const totalVisitors = vendapormeta[0].vendas

const produtos = [
  { produtos: "Eletrônicos", quantidade: 275, fill: "var(--color-chrome)" },
  { produtos: "Moda", quantidade: 200, fill: "var(--color-safari)" },
  { produtos: "Alimentos", quantidade: 187, fill: "var(--color-firefox)" },
  { produtos: "Decoração", quantidade: 173, fill: "var(--color-edge)" },
  { produtos: "Outros", quantidade: 90, fill: "var(--color-other)" },
]

const produtosConfig = {
  quantidade: {
    label: "Visitors",
  },
  chrome: {
    label: "Eletrônicos",
    color: "var(--chart-1)",
  },
  safari: {
    label: "Moda",
    color: "var(--chart-2)",
  },
  firefox: {
    label: "Alimentos",
    color: "var(--chart-3)",
  },
  edge: {
    label: "Decoração",
    color: "var(--chart-4)",
  },
  other: {
    label: "Outros",
    color: "var(--chart-5)",
  },
} satisfies ChartConfig


interface Fatura {
  idcliente: string;
  nome: string;
  pedidos: string;
  totalAmount: string;
}

const faturas: Fatura[] = [
  { idcliente: "1", nome: "juliana", pedidos: "5 pedidos", totalAmount: "R$1100" },
  { idcliente: "2", nome: "Felipe", pedidos: "2 pedidos", totalAmount: "R$200" },
  { idcliente: "3", nome: "jonas", pedidos: "1 pedidos", totalAmount: "R$4100" },
  { idcliente: "4", nome: "luiz", pedidos: "4 pedidos", totalAmount: "R$2200" },
  { idcliente: "5", nome: "gustavo", pedidos: "3 pedidos", totalAmount: "R$4100" },
];


export default function Home() {
  return (
    <main className="sm:ml-14">
      <h1 className="m-5 font-bold text-lg lg:text-2xl">Dahsboard Geral</h1>
      <section className="grid grid-cols-2 w-[90%] mx-auto gap-5 
      sm:w-[80%]
      md:w-[75%]
      lg:grid-cols-4 
      2xl:w-[70%] 2xl:gap-15">
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
          icone={<BadgeDollarSign size={18} />}
          dados="3200"
        />
        <Kards
          titulo="Meta:"
          tituloDesc="Meta Atingida"
          icone={<Crosshair size={18} />}
          dados="20%"
        />


      </section>

      <section className="flex flex-col justify-center items-center mb-5
            lg:flex-row lg:flex-wrap lg:gap-5">
        <div className="w-[95%] mb-5 lg:w-[60%] lg:mb-0">
          <Grafico titulografico="Pedidos Realizados">
            <ResponsiveContainer height={250}>
              <ChartContainer config={pedidosConfig} className="h-full w-full">
                <LineChart
                  accessibilityLayer
                  data={pedidos}

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
                    dataKey="pedidos"
                    type="natural"
                    stroke="var(--chart-1)"
                    strokeWidth={2}
                    dot={{
                      fill: "var(--chart-1)",
                    }}
                    activeDot={{
                      r: 6,
                    }}
                  />
                </LineChart>
              </ChartContainer>
            </ResponsiveContainer>
          </Grafico>
        </div>
        <div className="w-[95%] lg:w-[35%]">
          <Grafico titulografico="Clientes">
            <ChartContainer
              config={clientesConfig}
              className="[&_.recharts-pie-label-text]:fill-foreground mx-auto aspect-square max-h-[250px] pb-0"
            >
              <PieChart height={250}>
                <ChartTooltip content={<ChartTooltipContent hideLabel />} />
                <ChartLegend content={<ChartLegendContent />} />
                <Pie data={clientes} dataKey="value" label nameKey="browser" />
              </PieChart>
            </ChartContainer>
          </Grafico>
        </div>
      </section>
      <section className="flex flex-col justify-center items-center  lg:flex-row lg:gap-5 ">
        <div className="w-[95%] mb-5 lg:w-[25%] lg:mb-0" >
          <Grafico titulografico="Vendas/Meta">
            <ResponsiveContainer height={250}>
              <ChartContainer

                config={vendapormetaconfig}
                className="mx-auto aspect-square w-full max-w-[250px]"
              >
                <RadialBarChart

                  data={vendapormeta}
                  endAngle={180}
                  innerRadius={80}
                  outerRadius={130}
                >
                  <ChartTooltip
                    cursor={false}
                    content={<ChartTooltipContent hideLabel />}
                  />

                  <PolarRadiusAxis tick={false} tickLine={false} axisLine={false}>

                    <Label
                      content={({ viewBox }) => {
                        if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                          return (
                            <text x={viewBox.cx} y={viewBox.cy} textAnchor="middle">
                              <tspan
                                x={viewBox.cx}
                                y={(viewBox.cy || 0) - 16}
                                className="fill-foreground text-2xl font-bold"
                              >
                                {totalVisitors.toLocaleString()}
                              </tspan>
                              <tspan
                                x={viewBox.cx}
                                y={(viewBox.cy || 0) + 4}
                                className="fill-muted-foreground"
                              >
                                Vendas
                              </tspan>
                            </text>
                          )
                        }
                      }}
                    />
                  </PolarRadiusAxis>
                  <RadialBar
                    dataKey="meta"
                    stackId="a"
                    cornerRadius={5}
                    fill="var(--color-desktop)"
                    className="stroke-transparent stroke-2"
                  />
                  <RadialBar
                    dataKey="vendas"
                    fill="var(--color-mobile)"
                    stackId="a"
                    cornerRadius={5}
                    className="stroke-transparent stroke-2"
                  />
                  <Legend
                    layout="horizontal"
                    verticalAlign="bottom"
                    align="center"
                    payload={[
                      { value: "Meta", type: "line", color: "var(--color-desktop)" },
                      { value: "Vendas", type: "line", color: "var(--color-mobile)" },
                    ]}
                  />
                </RadialBarChart>
              </ChartContainer>
            </ResponsiveContainer>

          </Grafico>
        </div>
        <div className="w-[95%] mb-5  lg:w-[39%] lg:mb-0">
          <Grafico titulografico="Produtos">
            <ResponsiveContainer height={250}>
              <ChartContainer config={produtosConfig} className="h-full w-full">
                <BarChart
                  accessibilityLayer
                  data={produtos}
                  layout="vertical"
                  margin={{ left: 0 }}
                >
                  <YAxis
                    dataKey="produtos"
                    type="category"
                    tickLine={false}
                    tickMargin={10}
                    axisLine={false}
                    width={100}
                  />
                  <XAxis type="number" dataKey="quantidade" hide />
                  <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
                  <Bar dataKey="quantidade" layout="vertical" fill="var(--chart-1)" />
                </BarChart>
              </ChartContainer>
            </ResponsiveContainer>
          </Grafico>
        </div>
        <div className="w-[95%] lg:w-[30%]">
          <Tabelas
            titulo="Top Clientes"
            colunas={["ID", "Nome", "Pedidos", "Total"]}
            dados={faturas}
            renderItem={(item) => (
              <>
                <TableCell className="font-medium">{item.idcliente}</TableCell>
                <TableCell>{item.nome}</TableCell>
                <TableCell>{item.pedidos}</TableCell>
                <TableCell className="text-right">{item.totalAmount}</TableCell>
              </>
            )}
          />
        </div>
      </section>
    </main>
  );
}
