import { useState } from "react";

function Navbar() {
    const [isOpen, setIsOpen] = useState(false);

    return(
        //Cotaniner principal: fundo cinza escuro e texto branco
        <nav className = "bg-gray-800 text-white p-4">
            {/*
                Esta div interna alinha o LOGO e o BOTÃO/LINKS.
                'flex justify-between': joga o Logo para a esquerda e o resto para a direita.
                'items-center': alinha verticalmente no centro.
            */}

            <div className = "container mx-auto flex justify-between items-center">
                <div className = "text-xl font-bold"> Paloma Brito </div>
            </div>
        </nav>
    )
}