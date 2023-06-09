import { useEffect, useState } from "react"

export function Header () {
    const [isHamburgerOpen, setIsHamburgerOpen] = useState(false)
    const [isLoginOpen, setIsLoginOpen] = useState(false)
    const [isLoggedIn, setIsLoggedIn] = useState(false)

    useEffect(() => {
        function closeMenuEvent (e: any) {
            if (e.key === "Esc" || e.key === "Escape") {
                setIsHamburgerOpen(false)
                setIsLoginOpen(false)
            }
        }
        window.addEventListener("keydown", closeMenuEvent)
    }, [])

    function toggleMenu () {
        setIsHamburgerOpen(!isHamburgerOpen)
    }
    function toggleLoginMenu () {
        setIsLoginOpen(!isLoginOpen)
    }

    const mockAnnounc = [{}]

    const mock = 
        {
            avatar: '',
            name: 'Julia Lima',
            date: '2023-06-06 14:03:12.983433',
            commentary:
                'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.',
        }

    
    return (
        <>
            <header className="px-8 h-20 bg-grey-10 border-b-2 border-grey-6 flex justify-between items-center">
                <figure>
                    <img src="/Logo.png" alt="website logo" />
                </figure>
                <div className="relative sm:hidden w-10 h-10 flex items-center justify-center" onClick={toggleMenu}>
                    <figure className="relative cursor-pointer z-10">
                        {
                            isHamburgerOpen ?
                            <img src="/xmark.png" alt="" />
                            :
                            <img src="/Hamburger_menu.png" alt="" />
                        }
                    </figure>
                </div>
                {
                    isLoggedIn ?
                    <div  onClick={toggleLoginMenu} className="relative hidden sm:flex gap-2 border-l-2 border-grey-6 py-6 pl-11 cursor-pointer">
                        <div className="bg-random-1 w-7 h-7 rounded-full">
                            {mock.avatar}
                        </div>
                        <p>{mock.name}</p>
                        {
                            isLoginOpen &&
                            <>
                                <button tabIndex={-1} onClick={() => setIsLoginOpen(false)} className="fixed inset-0 h-full w-full cursor-default"></button>
                                <div className="absolute z-10 right-0 top-14 w-48 bg-grey-10 rounded shadow-xl flex flex-col">
                                    <a href="#" className="font-inter hover:bg-grey-0 hover:text-grey-10 py-4 pl-3 pr-5 ">Editar Perfil</a>
                                    <a href="#" className="font-inter hover:bg-grey-0 hover:text-grey-10 py-4 pl-3 pr-5 ">Editar endereço</a>
                                    {
                                        mockAnnounc.length > 0 &&
                                        <a href="#" className="font-inter hover:bg-grey-0 hover:text-grey-10 py-4 pl-3 pr-5 ">Meus Anúncios</a>
                                    }
                                    <a onClick={() => setIsLoggedIn(false)} href="#" className="font-inter hover:bg-grey-0 hover:text-grey-10 py-4 pl-3 pr-5 ">Sair</a>
                                </div>
                            </>
                        }
                    </div>
                    :
                    <div className="relative z-10 hidden sm:block border-l-2 border-grey-6 py-4">
                        <button tabIndex={-1} onClick={() => setIsLoginOpen(false)} className="fixed inset-0 h-full w-full cursor-default"></button>
                        <a href="#" onClick={() => setIsLoggedIn(true)} className="relative rounded font-inter hover:bg-brand-1 hover:text-grey-10 text-brand-1 font-semibold py-4 ml-14 pl-5 pr-5">Fazer login</a>
                        <button className="relative btn-big btn-outline2 ml-10">Cadastrar</button>
                    </div>
                }
            </header>
            {
                isHamburgerOpen &&
                <>
                    <button tabIndex={-1} onClick={() => setIsHamburgerOpen(false)} className="fixed inset-0 h-full w-full cursor-default"></button>
                    <div className="absolute z-10 right-0 sm:hidden bg-grey-10 shadow-xl flex flex-col w-full">
                        {
                            isLoggedIn ?
                            <>
                                <a href="#" className="font-inter hover:bg-grey-0 hover:text-grey-10 py-4 pl-3 pr-5 ">Editar Perfil</a>
                                <a href="#" className="font-inter hover:bg-grey-0 hover:text-grey-10 py-4 pl-3 pr-5 ">Editar endereço</a>
                                {
                                    mockAnnounc.length > 0 &&
                                    <a href="#" className="font-inter hover:bg-grey-0 hover:text-grey-10 py-4 pl-3 pr-5 ">Meus Anúncios</a>
                                }
                                <a onClick={() => setIsLoggedIn(false)} href="#" className="font-inter hover:bg-grey-0 hover:text-grey-10 py-4 pl-3 pr-5 ">Sair</a>
                            </>
                            :
                            <>
                                <a href="#" onClick={() => setIsLoggedIn(true)} className="font-inter hover:bg-grey-0 hover:text-grey-10 py-4 pl-3 pr-5 ">Fazer login</a>
                                <div className="pl-3 pr-5 pb-8 pt-4">
                                    <button className="btn-big btn-outline2 w-full">Cadastrar</button>
                                </div>
                            </>

                        }
                    </div>
                </>
            }
        </>
    )
}