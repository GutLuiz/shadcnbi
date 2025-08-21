"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import {
  ShoppingBag,
  Users,
  Crosshair,
  BadgeDollarSign,
} from "lucide-react";

import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

import {
  TableCell,
} from "@/components/ui/table";

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
} from "recharts";

// componentes:
import Kards from "@/components/Cards/kards";
import Grafico from "@/components/Graficos/grafico";
import Tabelas from "@/components/Tabelas/tabelas";

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
  topClientes
} from "@/services/clientes";

import {
  PedidosRealizados,
  ProdutosMaisPedidos
} from "@/services/pedidos";


const vendapormeta = [{ vendas: 1260, meta: 5700 }];

const vendapormetaconfig = {
  desktop: {
    label: "meta",
    color: "var(--chart-1)",
  },
  mobile: {
    label: "vendas",
    color: "var(--chart-2)",
  },
} satisfies ChartConfig;

const totalVisitors = vendapormeta[0].vendas;



export default function Home() {

  //Rotas
  const router = useRouter();
  const rotaVendas = "/vendas";
  const rotaClientes = "/clientes"


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

  // CARDS:

  // PEDIDOS REALIZADOS:
  function PedidosAprovadosCard(pedidos: Pedido[]) {
    return new Set(pedidos.map((pedido) => pedido.id)).size;
  }

  // DATA CLIENTES ATIVOS:
  function ClientesAtivosCard(pedidos: Pedido[]) {
    return new Set(pedidos.map((pedido) => pedido.userId)).size;
  }

  //GRAFICOS:

  // DATA PEDIDOS REALIZADOS:
  const dadosPedidos = PedidosRealizados(pedidos);
  // DATA CADASTRADOS X ATIVOS:
  const dadosClientes = CadastradosxAtivos(clientes, pedidos);
  //DATA PRODUTO MAIS PEDIDOS:
  const dadosProdutos = ProdutosMaisPedidos(pedidos, produtos);

  //TABELAS:
  const dataTabela = topClientes(pedidos, clientes, produtos)

  //CONFIGS
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
  } satisfies ChartConfig;

  const pedidosConfig = {
    totalPedidos: {
      label: "Pedidos",
      color: "var(--chart-1)",
    },
  } satisfies ChartConfig;

  const produtosConfig = {
    pedidos: {
      label: "Pedidos",

    },
  } satisfies ChartConfig;

  return (
    <main className="sm:ml-14">
      <h1 className="m-5 font-bold text-lg lg:text-2xl">Dahsboard Geral</h1>
      <section
        className="grid grid-cols-2 w-[90%] mx-auto gap-5 
      sm:w-[80%]
      md:w-[75%]
      lg:grid-cols-4 
      2xl:w-[70%] 2xl:gap-15 cursor-pointer "
      >
        <Kards
          titulo="Pedidos:"
          tituloDesc="Pedidos aprovados"
          icone={<ShoppingBag size={18} />}
          dados={PedidosAprovadosCard(pedidos)}
          onclick={() => router.push(rotaVendas)}
          
        />
        <Kards
          titulo="Ativos:"
          tituloDesc="Clientes Ativos"
          icone={<Users size={18} />}
          dados={ClientesAtivosCard(pedidos)}
          onclick={() => router.push(rotaClientes)}
        />
        <Kards
          titulo="Ticket:"
          tituloDesc="Ticket Médio"
          icone={<BadgeDollarSign size={18} />}
          dados="3200"
          onclick={() => router.push(rotaVendas)}
        />
        <Kards
          titulo="Meta:"
          tituloDesc="Meta Atingida"
          icone={<Crosshair size={18} />}
          dados="20%"
          onclick={() => router.push(rotaVendas)}
        />
      </section>

      <section
        className="flex flex-col justify-center items-center mb-5
            lg:flex-row lg:flex-wrap lg:gap-5"
      >
        <div className="w-[95%] mb-5 lg:w-[60%] lg:mb-0">
          <Grafico titulografico="Pedidos Realizados" showButton onclick={() => router.push(rotaVendas)} >
            <ResponsiveContainer height={250}>
              <ChartContainer config={pedidosConfig} className="h-full w-full">
                <LineChart accessibilityLayer data={dadosPedidos}>
                  <CartesianGrid vertical={false} />
                  <XAxis dataKey="mes" tickMargin={10} />
                  <YAxis />
                  <ChartTooltip content={<ChartTooltipContent hideLabel />} />
                  <Line
                    dataKey="totalPedidos"
                    type="natural"
                    stroke={pedidosConfig.totalPedidos.color}
                    strokeWidth={2}
                  />
                </LineChart>
              </ChartContainer>
            </ResponsiveContainer>
          </Grafico>
        </div>
        <div className="w-[95%] lg:w-[35%]">
          <Grafico titulografico="Clientes" showButton onclick={() => router.push(rotaClientes)}>
            <ChartContainer
              config={clientesConfig}
              className="[&_.recharts-pie-label-text]:fill-foreground mx-auto aspect-square max-h-[250px] pb-0"
            >
              <PieChart height={250}>
                <ChartTooltip content={<ChartTooltipContent hideLabel />} />
                <ChartLegend content={<ChartLegendContent />} />
                <Pie
                  data={dadosClientes}
                  dataKey="value"
                  nameKey="name"
                  label
                />
              </PieChart>
            </ChartContainer>
          </Grafico>
        </div>
      </section>
      <section className="flex flex-col justify-center items-center  lg:flex-row lg:gap-5 ">

        <div className="w-[95%] mb-5 lg:w-[25%] lg:mb-0">
          <Grafico titulografico="Vendas/Meta" showButton onclick={() => router.push(rotaVendas)}>
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
                            >
                              <tspan
                                x={viewBox.cx}
                                y={(viewBox.cy || 0) - 16}
                                className="fill-foreground text-2xl font-bold"
                              >
                                R${totalVisitors.toLocaleString()}
                              </tspan>
                              <tspan
                                x={viewBox.cx}
                                y={(viewBox.cy || 0) + 4}
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
                      {
                        value: "Meta",
                        type: "line",
                        color: "var(--color-desktop)",
                      },
                      {
                        value: "Vendas",
                        type: "line",
                        color: "var(--color-mobile)",
                      },
                    ]}
                  />
                </RadialBarChart>
              </ChartContainer>
            </ResponsiveContainer>
          </Grafico>
        </div>

        <div className="w-[95%] mb-5  lg:w-[39%] lg:mb-0">
          <Grafico titulografico="Produtos Pedidos" showButton onclick={() => router.push(rotaVendas)} >
            <ResponsiveContainer height={250}>
              <ChartContainer config={produtosConfig} className="h-full w-full">
                <BarChart
                  accessibilityLayer
                  data={dadosProdutos}
                  layout="vertical"
                >
                  <YAxis
                    dataKey="nome"
                    type="category"
                    tickMargin={10}
                    width={100}
                  />
                  <XAxis type="number" dataKey="pedidos" hide />
                  <ChartTooltip
                    cursor={false}
                    content={<ChartTooltipContent hideLabel />}
                  />

                  <Bar
                    dataKey="pedidos"
                    label={{ position: "center", fill: "white" }}
                  >
                    {dadosProdutos.map((produto, index) => (
                      <Cell key={`cell-${index}`} fill={produto.cor} />
                    ))}
                  </Bar>
                </BarChart>
              </ChartContainer>
            </ResponsiveContainer>
          </Grafico>
        </div>

        <div className="w-[95%] lg:w-[30%]">
          <Tabelas
            titulo="Clientes Em Destaque"
            colunas={["ID", "Nome", "Pedidos", "Total"]}
            dados={dataTabela}
            showButton
            onClick={() => router.push(rotaClientes)}
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
    </main >
  );
}
