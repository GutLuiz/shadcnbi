import axios from "axios";

export async function BuscarPedidos() {
  try {
    const pedidos = await axios.get("https://fakestoreapi.com/carts");
    return pedidos.data;
  } catch (error) {
    console.error("Erro ao buscar pedidos da api: ", error);
    return [];
  }
}
