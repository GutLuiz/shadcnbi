//types
import { Cliente } from "@/types/clientes";
import { Pedido } from "@/types/pedidos";

// AQUI ESTA TODAS AS FUNCOES QUE SÃO USADAS NA HOMEPAGE:

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
    { nome: "Cadastrados", ativos: totalclientes },
    { nome: "Ativos", ativos: quantidadeAtivos },
  ];
}
