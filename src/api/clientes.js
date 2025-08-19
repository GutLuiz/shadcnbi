
import axios from "axios";

export async function BuscarClientes() {
    try {
        const response = await axios.get('https://fakestoreapi.com/users')
        return response.data; 
    } catch (error) {
        console.error("Erro ao buscar clientes:", error);
        return [];
    }
}
