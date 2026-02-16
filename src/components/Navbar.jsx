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
                <div className="hidden md:flex space-x-6">
                    <a href="#" className="hover:text-gray-300">Home</a>
                    <a href="#" className="hover:text-gray-300">Sobre</a>
                    <a href="#" className="hover:text-gray-300">Projetos</a>
                    <a href="#" className="hover:text-gray-300">Contato</a>
                </div>
                {/*Botão Hamburger 
                md: hidden: em telas médias esse botão some */}
                <button className="md:hidden focus:outline-none" onClick={() => setIsOpen(!isOpen)}>
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"/>
                    {isOpen ? (
                        <path strokeLinecap = "round" strokeLinejoin = "round" strokeWidth={2} d = "M6 18L18 6M6 6l12 12" />
                    ) : (
                        <path strokeLinecap = "round" strokeLinejoin = "round" strokeWidth={2} d = "M4 6L16M4 12M16 18h16" />
                    )}
                    <svg/>
                </button>           
            </div>

            {/*Menu Dropdown
            Se isOpen for true, mostramos essa div
            md:garante que, mesmo se estiver aberto, se a pessoa esticar a tela, esse menu some.
            */}

            {isOpen &&(
                <div className="md:hidden mt-4 space-y-2 pb-4">
                    <a href="#" className="block px-4 hover:bg-gray-700 rounded">
                        Home
                    </a>
                    <a href="#" className="block px-4 hover:bg-gray-700 rounded">
                        Sobre
                    </a>
                    <a href="#" className="block px-4 hover:bg-gray-700 rounded">
                        Projetos
                    </a>
                    <a href="#" className="block px-4 hover:bg-gray-700 rounded">
                        Contato
                    </a>
                </div>
            )}
        </nav>
    )
}