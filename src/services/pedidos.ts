//types
import { Pedido } from "@/types/pedidos";
import { Produto } from "@/types/produtos";

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

    // Percorre por todas as datas que tem em pedidos, pega o mes desse pedido, pega o mes e coloca ele em minuscul, tira o . para "vazio" e coloca tudo minusculo
    pedidos.forEach((pedido) => {
        try {
            const data = new Date(pedido.date);
            const mes = data.toLocaleString("pt-BR", { month: "short" }).replace(".", "").toLowerCase();
            if (!contagem[mes]) {
                contagem[mes] = 0;
            }
            contagem[mes]++;
        } catch (error) {
            console.error("Erro ao processar data:", pedido.date, error);
        }
    });
    return meses
        .map((mes) => ({ mes, totalPedidos: contagem[mes] || 0, }))
        .filter((item) => item.totalPedidos > 0);
}

export function ProdutosMaisPedidos(pedidos: Pedido[], produtos: Produto[]) {
    const contagemProdutos: Record<number, number> = {}

    const cores = [
        "var(--chart-1)",
        "var(--chart-2)",
        "var(--chart-3)",
        "var(--chart-4)",
        "var(--chart-5)"
    ];

    pedidos.forEach((pedido) => {
        pedido.products.forEach((produto) => {
            if (!contagemProdutos[produto.productId]) {
                contagemProdutos[produto.productId] = 0;
            }
            contagemProdutos[produto.productId] += produto.quantity;
        })
    })
    const produtosOrdenados = Object.entries(contagemProdutos)
        .map(([productId, total]) => ({ productId: Number(productId), total }))
        .sort((a, b) => b.total - a.total).slice(0, 5);


    const produtosComNome = produtosOrdenados.map((p, index) => {
        const produtoInfo = produtos.find((prod) => prod.id === p.productId);
        return {
            pedidos: p.total,
            nome: produtoInfo ? produtoInfo.title.slice(0, 6) : "Produto desconhecido",
            cor: cores[index] || "var(--chart-1)",
        };
    });

    return produtosComNome;
}