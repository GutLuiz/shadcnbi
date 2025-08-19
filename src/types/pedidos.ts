import { Cliente } from "./clientes";
import { Produto } from "./produtos";

export type Pedido = {
  id: number;
  userId: Cliente["id"];
  date: string;
  products: Products[];
};

interface Products {
  productId: Produto["id"];
  quantity: number;
}
