//types
import { Pedido } from "@/types/pedidos";
import { Produto } from "@/types/produtos";


export function totalGeralVendas(pedidos: Pedido[], produtos: Produto[]): number {
    let total = 0;

    pedidos.forEach((pedido) => {
        pedido.products.forEach((item) => {
            const produtoInfo = produtos.find((p) => p.id === item.productId);
            if (produtoInfo) {
                total += produtoInfo.price * item.quantity;
            }
        });
    });

    return total;
}

export function ProdutoMaisVendido(pedidos: Pedido[], produtos: Produto[]) {
    // Objeto para somar a quantidade de cada produto
    const vendas: Record<number, number> = {};

    pedidos.forEach((pedido) => {
        pedido.products.forEach((item) => {
            if (!vendas[item.productId]) vendas[item.productId] = 0;
            vendas[item.productId] += item.quantity;
        });
    });

    // Encontrar o produto com mais vendas
    let topProdutoId: number | null = null;
    let maiorQuantidade = 0;

    for (const [idStr, quantidade] of Object.entries(vendas)) {
        const id = Number(idStr);
        if (quantidade > maiorQuantidade) {
            maiorQuantidade = quantidade;
            topProdutoId = id;
        }
    }

    const produtoInfo = produtos.find((p) => p.id === topProdutoId);

    return {
        nome: produtoInfo ? produtoInfo.title.slice(0, 10) : "Produto desconhecido",
    };
}


