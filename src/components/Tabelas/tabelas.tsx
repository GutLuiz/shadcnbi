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

import { Button } from "@/components/ui/button"

import { ArrowUpRight } from "lucide-react"

interface TabelaProps<T> {
    dados: T[];
    colunas: string[];
    renderItem: (item: T, index: number) => React.ReactNode;
    titulo: string;
    onClick?: () => void;
    showButton?: boolean;

}

export default function ListaDinamica<T>({
    dados,
    colunas,
    renderItem,
    titulo,
    showButton = false,
    onClick
}: TabelaProps<T>) {
    return (
        <div className="space-y-4">
            <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold">{titulo}</h3>
                {showButton && (
                    <Button variant="secondary" size="icon" className="size-8 cursor-pointer" onClick={onClick}>
                        <ArrowUpRight />
                    </Button>
                )}
            </div>
            <Table>
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
        </div>
    );
}
