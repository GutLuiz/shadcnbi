import React, { ReactNode } from "react";

// import Botao, { BotaoProps } from "../botao/botao"; // ajuste o caminho se necessário

import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"

interface GraficoContainerProps {
    titulografico: string;
    children: ReactNode;
    // botao?: BotaoProps;
}

const Grafico: React.FC<GraficoContainerProps> = ({
    titulografico,
    children,
}) => (
    <Card>
        <CardHeader>
            <div className="flex items-center justify-center">
                <CardTitle>
                    {titulografico}
                </CardTitle>
            </div>
        </CardHeader>
        <CardContent>
            {children}
        </CardContent>
    </Card>
);
export default Grafico;


