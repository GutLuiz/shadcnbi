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





const chartData = [
    { month: "Janeiro", desktop: 186 },
    { month: "Fevereiro", desktop: 305 },
    { month: "Março", desktop: 237 },
    { month: "Abril", desktop: 73 },
    { month: "Maio", desktop: 209 },
    { month: "Junho", desktop: 144 },
    { month: "julho", desktop: 114 },
    { month: "agosto", desktop: 144 },
    { month: "setembro", desktop: 34 },
    { month: "Outubro", desktop: 54 },
    { month: "Novembro", desktop: 64 },
    { month: "Dezembro", desktop: 414 },
]
const chartConfig = {
    desktop: {
        label: "Desktop",
        color: "var(--chart-1)",
    },
} satisfies ChartConfig

export default function ClientesPage() {

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

    //CONFIGS
    const clientesCategoriaConfig = {
        value: {
            label: "Pedidos",
        },
        ...dataClientes.reduce((acc, item) => {
            acc[item.nome] = {
                label: item.nome,
                color: item.cor,
            };
            return acc;
        }, {} as Record<string, { label: string; color: string }>)
    } satisfies ChartConfig;

    const pedidosConfig = {
        totalPedidos: {
            label: "Pedidos",
            color: "var(--chart-1)",
        },
    } satisfies ChartConfig;

    return (
        <main className="sm:ml-14">
            <h1 className="m-5 font-bold text-lg lg:text-2xl">DashBoard Clientes</h1>
            <section
                className="grid grid-cols-2 w-[90%] mx-auto gap-5 
      sm:w-[80%]
      md:w-[75%]
      lg:grid-cols-4 
      2xl:w-[70%] 2xl:gap-15"
            >
                <Kards
                    titulo="Cadastrados:"
                    tituloDesc="Clientes Cadastrados"
                    icone={<Users size={18} />}
                    dados={10}

                />
                <Kards
                    titulo="Novos:"
                    tituloDesc="Clientes Novos"
                    icone={<UserPlus size={18} />}
                    dados={2}

                />
                <Kards
                    titulo="Ativos:"
                    tituloDesc="Clientes Ativos"
                    icone={<UserCheck size={18} />}
                    dados="5"

                />
                <Kards
                    titulo="Inativos:"
                    tituloDesc="clientes Inativos"
                    icone={<UserMinus size={18} />}
                    dados="6"

                />
            </section>
            <section
                className="flex flex-col justify-center items-center mb-5
            lg:flex-row lg:flex-wrap lg:gap-5"
            >
                <div className="w-[95%] mb-5 lg:w-[50%] lg:mb-0 xl:w-[60%]" >
                    <Grafico titulografico="Clientes Cadastrados">
                        <ResponsiveContainer height={250}>
                            <ChartContainer config={chartConfig} className="h-full w-full">
                                <BarChart
                                    accessibilityLayer
                                    data={chartData}
                                    margin={{
                                        top: 20,
                                    }}
                                >
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
                                        content={<ChartTooltipContent hideLabel />}
                                    />
                                    <Bar dataKey="desktop" fill="var(--color-desktop)" radius={8}>
                                        <LabelList
                                            position="top"
                                            offset={12}
                                            className="fill-foreground"
                                            fontSize={12}
                                        />
                                    </Bar>
                                </BarChart>
                            </ChartContainer>
                        </ResponsiveContainer>
                    </Grafico>
                </div>

                <div className="w-[95%] lg:w-[45%] xl:w-[30%]">
                    <Grafico titulografico="Clientes Categoria" >
                        <ResponsiveContainer height={250}>
                            <ChartContainer
                                config={clientesCategoriaConfig}
                                className="h-full w-full"
                            >
                                <PieChart>

                                    <Pie
                                        outerRadius={80}
                                        data={dataClientes}
                                        dataKey="pedidos"
                                        nameKey="nome"
                                        legendType="circle"
                                        label
                                    >
                                        {dataClientes.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={entry.cor} />
                                        ))}
                                    </Pie>
                                    <ChartTooltip content={<ChartTooltipContent />} />
                                    <ChartLegend content={<ChartLegendContent />} />

                                </PieChart>
                            </ChartContainer>
                        </ResponsiveContainer>
                    </Grafico>
                </div>


            </section>
            <section className="flex flex-col items-center justify-center lg:flex-row lg:justify-around ">
                <div className=" w-[95%] mb-5  lg:w-[40%] lg:mt-5">
                    <Tabelas
                        titulo="Clintes Mais Pedidos"
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
                        titulo="Clientes Mais Vendas"
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