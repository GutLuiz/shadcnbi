"use client";
import { useEffect, useState } from "react";

// componentes:
import Kards from "@/components/Cards/kards";
import Grafico from "@/components/Graficos/grafico";
import Tabelas from "@/components/Tabelas/tabelas";

import {
    ShoppingBag,
    Users,
    Crosshair,
    BadgeDollarSign,
    Circle,
    Package,
    Truck,
    UserCheck,
    UserCog,
    UserMinus,
    UserPen,
    UserPlus,
    Banknote,
    TrendingUp,
    Landmark,
    ChartBar,
    ChartBarDecreasingIcon,
    PieChartIcon,
    FilePieChart,
    InspectIcon,

} from "lucide-react";


import {
    TableCell,
} from "@/components/ui/table";



import {
    ChartConfig,
    ChartContainer,
    ChartLegend,
    ChartLegendContent,
    ChartTooltip,
    ChartTooltipContent,
} from "@/components/ui/chart";

import {
    CartesianGrid,
    Line,
    LineChart,
    Pie,
    PieChart,
    ResponsiveContainer,
    XAxis,
    YAxis,
    Label,
    PolarRadiusAxis,
    RadialBar,
    RadialBarChart,
    Bar,
    BarChart,
    Legend,
    Cell,
    LabelList,
    Area,
    AreaChart,
    Tooltip
} from "recharts";

//types
import { Pedido } from "@/types/pedidos";
import { Cliente } from "@/types/clientes";
import { Produto } from "@/types/produtos";

//api
import { BuscarPedidos } from "@/api/pedidos";
import { BuscarClientes } from "@/api/clientes";
import { BuscarProdutos } from "@/api/produtos";

//servicos
import {
    CadastradosxAtivos,
    topClientes,
    ClientesCategoria
} from "@/services/clientes";

const constas = [
    { month: "janeiro", desktop: 186, mobile: 80 },
    { month: "Fevereiro", desktop: 305, mobile: 200 },
    { month: "Março", desktop: 237, mobile: 120 },
    { month: "Abril", desktop: 73, mobile: 190 },
    { month: "Maio", desktop: 209, mobile: 130 },
    { month: "Junho", desktop: 214, mobile: 140 },
    { month: "julho", desktop: 209, mobile: 130 },
    { month: "Agosto", desktop: 214, mobile: 140 },
    { month: "Setembro", desktop: 209, mobile: 130 },
    { month: "Outubro", desktop: 214, mobile: 140 },
    { month: "Novembro", desktop: 209, mobile: 130 },
    { month: "Dezembro", desktop: 214, mobile: 140 },
]
const chartConfig = {
    desktop: {
        label: "Desktop",
        color: "var(--chart-1)",
    },
    mobile: {
        label: "Mobile",
        color: "var(--chart-2)",
    },
} satisfies ChartConfig


const despesasData = [
    { nome: "Inventario", valor: 50000 },
    { nome: "Outras", valor: 15000 },
    { nome: "Fornecedores", valor: 20000 },
];

const clientesConfig = {
    Inventario: { label: "Inventario", color: "var(--chart-1)" },
    Outras: { label: "Outras", color: "var(--chart-2)" },
    Fornecedores: { label: "Fornecedores", color: "var(--chart-3)" },
} satisfies ChartConfig;

// Criamos um array com cores baseadas no clientesConfig
const coresConfig = Object.values(clientesConfig).map(c => c.color);





export default function TitulosPage() {

    //constantes states
    const [pedidos, setPedidos] = useState<Pedido[]>([]);
    const [clientes, setClientes] = useState<Cliente[]>([]);
    const [produtos, setProdutos] = useState<Produto[]>([]);

    // Buscando as Funções da api:
    async function FetchPedidos() {
        const dataPedidos = await BuscarPedidos();
        setPedidos(dataPedidos || []);
    }

    async function FetchClientes() {
        const dataClientes = await BuscarClientes();
        setClientes(dataClientes || []);
    }

    async function FetchProdutos() {
        const dataProdutos = await BuscarProdutos();
        setProdutos(dataProdutos || []);
    }

    useEffect(() => {
        FetchPedidos();
        FetchClientes();
        FetchProdutos();
    }, []);

    //GRAFICOS:



    // CLIENTES POR CATEGORIA
    const dataClientes = ClientesCategoria(pedidos, produtos)


    //TABELAS:
    const dataTabela = topClientes(pedidos, clientes, produtos)
    return (
        <main className="sm:ml-14">
            <h1 className="m-5 font-bold text-lg lg:text-2xl">DashBoard Titulos</h1>

            <section
                className="flex flex-col w-[75%] mx-auto gap-5 
      md:w-[55%] 
      lg:grid-cols-3 lg:grid lg:w-[85%]
      2xl:w-[55%] 2xl:gap-15"
            >
                <Kards
                    titulo="Bruto:"
                    tituloDesc="Lucro Bruto"
                    icone={<BadgeDollarSign size={18} />}
                    dados={10000}

                />
                <Kards
                    titulo="Operacional:"
                    tituloDesc="Lucro Operacional"
                    icone={<Landmark size={18} />}
                    dados={2000}

                />
                <Kards
                    titulo="Liquido:"
                    tituloDesc="Lucro Liquido"
                    icone={<TrendingUp size={18} />}
                    dados={8000}

                />
            </section>

            <section
                className="flex flex-col justify-center items-center mb-5
            lg:flex-row lg:flex-wrap lg:gap-5"
            >
                <div
                    className="w-[95%] mb-5
                lg:w-[65%] lg:mb-0"
                >
                    <Grafico titulografico="Contas A Pagar" >
                        <ResponsiveContainer height={300}>
                            <ChartContainer config={chartConfig} className="h-full w-full">
                                <BarChart accessibilityLayer data={constas}>
                                    <CartesianGrid vertical={false} />
                                    <XAxis
                                        dataKey="month"
                                        tickLine={false}
                                        tickMargin={10}
                                        axisLine={false}
                                        tickFormatter={(value) => value.slice(0, 3)}
                                    />
                                    <ChartTooltip
                                        cursor={false}
                                        content={<ChartTooltipContent indicator="dashed" />}
                                    />
                                    <ChartLegend content={<ChartLegendContent />} />
                                    <Bar dataKey="desktop" fill="var(--color-desktop)" radius={4} />
                                    <Bar dataKey="mobile" fill="var(--color-mobile)" radius={4} />
                                </BarChart>
                            </ChartContainer>
                        </ResponsiveContainer>
                    </Grafico>
                </div>
                <div className="w-[95%] lg:w-[25%]">
                    <Grafico titulografico="Despesas">
                        <ResponsiveContainer height={300}>
                            <ChartContainer
                                config={clientesConfig}
                                className="[&_.recharts-pie-label-text]:fill-foreground mx-auto aspect-square max-h-[250px] pb-0"
                            >
                                <PieChart>
                                    <Pie
                                        data={despesasData}
                                        dataKey="valor"        // sempre a chave de valor principal
                                        nameKey="nome"         // nome que aparecerá na legenda
                                        cx="50%"
                                        cy="50%"
                                        outerRadius={85}
                                        label
                                    >
                                        {despesasData.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={coresConfig[index % coresConfig.length]} />
                                        ))}
                                    </Pie>

                                    <ChartTooltip content={<ChartTooltipContent />} />
                                    <ChartLegend content={<ChartLegendContent className="flex justify-center absolute bottom w-full" />} />
                                </PieChart>
                            </ChartContainer>
                        </ResponsiveContainer>

                    </Grafico>
                </div>

            </section>
            <section className="flex flex-col items-center justify-center lg:flex-row lg:justify-around ">
                <div className=" w-[95%] mb-5  lg:w-[40%] lg:mt-5">
                    <Tabelas
                        titulo="Contas A Pagar"
                        colunas={["ID", "Nome", "Pedidos", "Total"]}
                        dados={dataTabela}
                        renderItem={(item) => (
                            <>
                                <TableCell className="font-medium">{item.id}</TableCell>
                                <TableCell>{item.nome}</TableCell>
                                <TableCell>{item.totalPedidos}</TableCell>
                                <TableCell className="text-right">
                                    R${item.totalValor.toLocaleString()}
                                </TableCell>
                            </>
                        )}
                    />
                </div>
                <div className=" w-[95%] mb-5  lg:w-[40%] lg:mt-5">
                    <Tabelas
                        titulo="Despesas"
                        colunas={["ID", "Nome", "Pedidos", "Total"]}
                        dados={dataTabela}
                        renderItem={(item) => (
                            <>
                                <TableCell className="font-medium">{item.id}</TableCell>
                                <TableCell>{item.nome}</TableCell>
                                <TableCell>{item.totalPedidos}</TableCell>
                                <TableCell className="text-right">
                                    R${item.totalValor.toLocaleString()}
                                </TableCell>
                            </>
                        )}
                    />
                </div>
            </section>

        </main>
    )
}