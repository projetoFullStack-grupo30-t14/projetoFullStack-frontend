import { useState } from "react"

export function Header () {
    const [isOpen, setIsOpen] = useState(false)
    function toggleMenu () {
        setIsOpen(!isOpen)
    }

    function closeMenuEvent (e: any) {
        if (e.key === "Esc" || e.key === "Escape") {
            setIsOpen(false)
        }
    }
    document.addEventListener("keydown", closeMenuEvent)
    return (
        <>
            <header className="px-14 h-20 bg-grey-10 border-b-2 border-grey-6 flex justify-between items-center">
                <figure>
                    <img src="/Logo.png" alt="website logo" />
                </figure>
                <div className="relative" onClick={toggleMenu}>
                    <figure className="relative z-10 cursor-pointer">
                        <img src="/Hamburger_menu.png" alt="" />
                    </figure>
                </div>
            </header>
            {
                isOpen &&
                <>
                    <button tabIndex={-1} onClick={() => setIsOpen(false)} className="fixed inset-0 h-full w-full cursor-default"></button>
                    <div className="right-0 bg-grey-10 shadow-xl flex flex-col w-full">
                        <a href="#" className="hover:bg-grey-0 hover:text-grey-10 py-4 pl-3 pr-5 ">Fazer login</a>
                        <div className="pl-3 pr-5 pb-8 pt-4">
                            <button className="btn-big btn-outline2">Cadastrar</button>
                        </div>
                    </div>
                </>
            }
        </>
    )
}