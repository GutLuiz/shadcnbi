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
    RadialBar,
    RadialBarChart,
    ResponsiveContainer,
    XAxis,
    YAxis
} from "recharts"


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
} from "@/components/ui/chart"

const vendas = [
    { month: "janeiro", vendas: 186 },
    { month: "fevereiro", vendas: 305 },
    { month: "Marco", vendas: 237 },
    { month: "Abril", vendas: 73 },
    { month: "Maio", vendas: 209 },
    { month: "Julho", vendas: 214 },
]
const vendasConfig = {
    desktop: {
        label: "vendas",
        color: "var(--chart-1)",
    },
} satisfies ChartConfig

const vendaporempresa = [
    { empresa: "Matriz", vendas: 500, fill: "var(--chart-1)" },
    { empresa: "Filial 1", vendas: 305, fill: "var(--chart-2)" },
    { empresa: "Filial 2", vendas: 237, fill: "var(--chart-3)" },
    { empresa: "Filial 3", vendas: 73, fill: "var(--chart-4)" },
]

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

} satisfies ChartConfig

export default function VendasPage() {
    return (
        <main className="sm:ml-14">
            <h1 className="m-5 font-bold text-lg lg:text-2xl">DashBoard Vendas</h1>
            <section className="flex flex-col w-[75%] mx-auto gap-5 
      md:w-[55%] 
      lg:grid-cols-3 lg:grid lg:w-[85%]
      2xl:w-[70%] 2xl:gap-15">
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
            <section className="flex flex-col justify-center items-center mb-5
            lg:flex-row lg:flex-wrap lg:gap-5">
                <div className="w-[95%] mb-5
                lg:w-[60%] lg:mb-0">
                    <Grafico titulografico="Vendas">
                        <ResponsiveContainer height={300}>
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
                                    <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
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
                        <ResponsiveContainer height={300}>
                            <ChartContainer
                                config={vendasporempresaConfig}
                                className="mx-auto aspect-square max-h-[250px]"
                            >
                                <RadialBarChart
                                    data={vendaporempresa}
                                    startAngle={-90}
                                    endAngle={380}
                                    innerRadius={30}
                                    outerRadius={110}
                                >
                                    <ChartTooltip
                                        cursor={false}
                                        content={<ChartTooltipContent hideLabel nameKey="browser" />}
                                    />
                                    <RadialBar dataKey="vendas" background>
                                        <LabelList
                                            position="insideStart"
                                            dataKey="empresa"
                                            className="fill-white Acapitalize mix-blend-luminosity"
                                            fontSize={12}
                                        />
                                    </RadialBar>
                                </RadialBarChart>
                            </ChartContainer>
                        </ResponsiveContainer>
                    </Grafico>
                </div>
            </section>
        </main>
    )
}
