//types
import { Cliente } from "@/types/clientes";
import { Pedido } from "@/types/pedidos";
import { Produto } from "@/types/produtos";


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

export function topClientes(pedidos: Pedido[], clientes: Cliente[], produtos: Produto[]) {
    const contagemClientes: Record<number, { totalPedidos: number; totalValor: number }> = {};

    pedidos.forEach((pedido) => {
        if (!contagemClientes[pedido.userId]) {
            contagemClientes[pedido.userId] = { totalPedidos: 0, totalValor: 0 };
        }

        contagemClientes[pedido.userId].totalPedidos += 1;

        // Somar o valor de cada produto do pedido
        pedido.products.forEach((item) => {
            const produtoInfo = produtos.find((p) => p.id === item.productId);
            if (produtoInfo) {
                contagemClientes[pedido.userId].totalValor += produtoInfo.price * item.quantity;
            }
        });
    });

    // Transformar em array com nome do cliente
    const clientesComNome = Object.entries(contagemClientes)
        .map(([userId, dados]) => {
            const clienteInfo = clientes.find((cli) => cli.id === Number(userId));
            return {
                id: Number(userId),
                nome: clienteInfo ? clienteInfo.name.firstname : "Cliente desconhecido",
                totalPedidos: dados.totalPedidos,
                totalValor: dados.totalValor,
            };
        })
        .sort((a, b) => b.totalValor - a.totalValor)
        .slice(0, 5);

    return clientesComNome;
}

export function ClientesCategoria(pedidos: Pedido[], produtos: Produto[]) {
    const cores = [
        "var(--chart-1)",
        "var(--chart-2)",
        "var(--chart-3)",
        "var(--chart-4)",
        "var(--chart-5)"
    ];


    const contagemCategoria: Record<string, number> = {}

    pedidos.forEach((pedido) => {
        pedido.products.forEach((produto) => {
            const produtoInfo = produtos.find((p) => p.id === produto.productId);
            if (produtoInfo) {
                const categoria = produtoInfo.category;
                if (!contagemCategoria[categoria]) {
                    contagemCategoria[categoria] = 0;
                }
                contagemCategoria[categoria] += produto.quantity;
            }
        });
    });
    const categoriasOrdenadas = Object.entries(contagemCategoria)
        .map(([categoria, total]) => ({ categoria, total }))
        .sort((a, b) => b.total - a.total)
        .slice(0, 5);


    const dataClientes = categoriasOrdenadas.map((c, index) => ({
        pedidos: c.total,
        nome: c.categoria.slice(0, 8), 
        cor: cores[index] || "var(--chart-1)",
    }));

    return dataClientes;
}