import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";

interface TabelaProps<T> {
    dados: T[];
    colunas: string[];
    renderItem: (item: T, index: number) => React.ReactNode;
    titulo: string;
    onClick?: () => void;
}

export default function ListaDinamica<T>({
    dados,
    colunas,
    renderItem,
    titulo,
}: TabelaProps<T>) {
    return (
        <Table>
            <TableCaption>{titulo}</TableCaption>
            <TableHeader>
                <TableRow>
                    {colunas.map((col, idx) => (
                        <TableHead key={idx} className={idx === colunas.length - 1 ? "text-right" : ""}>
                            {col}
                        </TableHead>
                    ))}
                </TableRow>
            </TableHeader>
            <TableBody>
                {dados.map((item, index) => (
                    <TableRow key={index}>
                        {renderItem(item, index)}
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );
}
