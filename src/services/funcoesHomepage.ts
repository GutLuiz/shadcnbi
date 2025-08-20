//types
import { Cliente } from "@/types/clientes";
import { Pedido } from "@/types/pedidos";
import { Produto } from "@/types/produtos";

// AQUI ESTA TODAS AS FUNCOES QUE SÃO USADAS NA HOMEPAGE:

// CARDS:
export function ClientesAtivosCard(pedidos: Pedido[]) {
  return new Set(pedidos.map((pedido) => pedido.userId)).size;
}

export function pedidosAprovadosCard(pedidos: Pedido[]) {
  return new Set(pedidos.map((pedido) => pedido.id)).size;
}

export function calcularValorPedido(
  pedido: Pedido,
  produtos: Produto[]
) {
  return pedido.products.reduce((total, item) => {
    const produto = produtos.find((p) => p.id === item.productId);
    if (!produto) return total; // se não encontrar, ignora
    return total + produto.price * item.quantity;
  }, 0);
}

// GRAFICOS:

export function CadastradosxAtivos(clientes: Cliente[], pedidos: Pedido[]) {
  // buscando todos os clientes:
  const totalclientes = clientes.length;

  // buscar todos os ids que estao vinculados a algum pedido:
  const idsClientesAtivos = new Set(pedidos.map((pedido) => pedido.userId));

  // Faz uma "comparacao" com os ids e faz essa contagem de ativos:
  const quantidadeAtivos = clientes.filter((clientes) =>
    idsClientesAtivos.has(clientes.id)
  ).length;

  return [
    { name: "Cadastrados", value: totalclientes, fill: "var(--chart-1)" },
    { name: "Ativos", value: quantidadeAtivos, fill: "var(--chart-2)" },
  ];
}

export function PedidosRealizados(pedidos: Pedido[]) {
  const meses = [
    "jan",
    "fev",
    "mar",
    "abr",
    "mai",
    "jun",
    "jul",
    "ago",
    "set",
    "out",
    "nov",
    "dez",
  ];

  // fazendo uma contagem com o record com as chaves: string e numero. Primeiramente retornando vazio
  const contagem: Record<string, number> = {};

  // Percorre por todas as datas que tem em pedidos, pega o mes desse pedido, pega o mes e coloca ele em pequeno, tira o . para "vazio" e coloca tudo minusculo
  pedidos.forEach((pedido) => {
    try {
      const data = new Date(pedido.date);
      const mes = data
        .toLocaleString("pt-BR", { month: "short" })
        .replace(".", "")
        .toLowerCase();

      if (!contagem[mes]) {
        contagem[mes] = 0;
      }
      contagem[mes]++;
    } catch (error) {
      console.error("Erro ao processar data:", pedido.date, error);
    }
  });
  return meses
    .map((mes) => ({ mes, totalPedidos: contagem[mes] || 0 }))
    .filter((item) => item.totalPedidos > 0);
}
