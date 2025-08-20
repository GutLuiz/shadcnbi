import React, { ReactNode } from "react";
import { ArrowUpRight } from "lucide-react"

// import Botao, { BotaoProps } from "../botao/botao"; // ajuste o caminho se necessário

import { Button } from "@/components/ui/button"

import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"

interface GraficoContainerProps {
    titulografico: string;
    children: ReactNode;
    onclick?: () => void;
    showButton?: boolean;
}

const Grafico: React.FC<GraficoContainerProps> = ({
    titulografico,
    children,
    onclick,
    showButton = false
}) => (
    <Card>
        <CardHeader>
            <div className="flex items-center justify-between">
                <CardTitle>
                    {titulografico}
                </CardTitle>
                {showButton && (
                    <Button variant="secondary" size="icon" className="size-8 cursor-pointer" onClick={onclick}>
                        <ArrowUpRight />
                    </Button>
                )}
            </div>
        </CardHeader>
        <CardContent>
            {children}
        </CardContent>
    </Card>
);
export default Grafico;


