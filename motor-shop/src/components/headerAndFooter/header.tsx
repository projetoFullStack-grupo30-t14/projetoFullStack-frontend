import { useModal } from "@/contexts/modalContext"
import Link from "next/link"
import { useRouter } from "next/router"
import { useContext, useEffect, useState } from "react"
import Modal from "../modal/modal"
import { useAuth } from "@/contexts/authContext"
import { UserContext } from "@/contexts/userContext"
import UpdateUserForm from "../forms/updateUserForm"
import UpdateAddressForm from "../forms/updateAddressForm"


export function Header () {
    const [isHamburgerOpen, setIsHamburgerOpen] = useState(false)
    const [isLoginOpen, setIsLoginOpen] = useState(false)
    const { token, logout } = useAuth()
    const { currUser } = useContext(UserContext)
    const { showModal, stateModal } = useModal()
    const router = useRouter()

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

    function getInitials (name: string | undefined): string | undefined {
        const nameParts = name?.split(' ')
        let initials: string[] = [];
  
        if (nameParts && nameParts.length > 0) {
            initials.push(nameParts[0].charAt(0));
            
            if (nameParts.length > 1) {
            initials.push(nameParts[nameParts.length - 1].charAt(0));
            }
        }
        return initials?.join('')
    }
    const iconName = getInitials(currUser?.name)
    
    return (
        <>
            {stateModal && <Modal/>}
            <header className="px-8 h-20 bg-grey-10 border-b-2 border-grey-6 flex justify-between items-center">
                <Link href="/" className="relative z-20 cursor-pointer">
                    <img src="/Logo.png" alt="website logo" />
                </Link>
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
                    token ?
                    <div  onClick={toggleLoginMenu} className="relative hidden sm:flex gap-2 border-l-2 border-grey-6 py-6 pl-11 cursor-pointer">
                        <div className="bg-random-1 w-8 h-8 flex items-center justify-center rounded-full text-grey-whiteFixed font-inter font-bold">
                            {iconName}
                        </div>
                        <p>{currUser?.name}</p>
                        {
                            isLoginOpen &&
                            <>
                                <button tabIndex={-1} onClick={() => setIsLoginOpen(false)} className="fixed inset-0 h-full w-full cursor-default"></button>
                                <div className="absolute z-20 right-0 top-14 w-48 bg-grey-10 rounded shadow-xl flex flex-col">
                                    <button onClick={() => showModal(<UpdateUserForm/>, "Editar perfil")} className="text-left font-inter hover:bg-grey-0 hover:text-grey-10 py-4 pl-3 pr-5 ">Editar Perfil</button>
                                    <button onClick={() => showModal(<UpdateAddressForm/>, "Editar endereço")} className="text-left font-inter hover:bg-grey-0 hover:text-grey-10 py-4 pl-3 pr-5 ">Editar endereço</button>
                                    <Link href="/profile" className="text-left font-inter hover:bg-grey-0 hover:text-grey-10 py-4 pl-3 pr-5 ">Meus Anúncios</Link>
                                    <a onClick={logout} href="#" className="text-left font-inter hover:bg-grey-0 hover:text-grey-10 py-4 pl-3 pr-5 ">Sair</a>
                                </div>
                            </>
                        }
                    </div>
                    :
                    <div className="relative z-10 hidden sm:block border-l-2 border-grey-6 py-4">
                        <button tabIndex={-1} onClick={() => setIsLoginOpen(false)} className="fixed inset-0 h-full w-full cursor-default"></button>
                        <a onClick={() => router.push("/login")} className="relative rounded font-inter hover:bg-brand-1 hover:text-grey-10 text-brand-1 font-semibold py-4 ml-14 pl-5 pr-5 cursor-pointer">Fazer login</a>
                        <button onClick={() => router.push("/register")} className="relative btn-big btn-outline2 ml-10">Cadastrar</button>
                    </div>
                }
            </header>
            {
                isHamburgerOpen &&
                <>
                    <button tabIndex={-1} onClick={() => setIsHamburgerOpen(false)} className="fixed inset-0 h-full w-full cursor-default"></button>
                    <div className="absolute z-20 right-0 sm:hidden bg-grey-10 shadow-xl flex flex-col w-full">
                        {
                            token ?
                            <>
                                <button onClick={() => showModal(<UpdateUserForm/>, "Editar perfil")} className="text-left font-inter hover:bg-grey-0 hover:text-grey-10 py-4 pl-3 pr-5 ">Editar Perfil</button>
                                <button onClick={() => showModal(<UpdateAddressForm/>, "Editar endereço")} className="text-left font-inter hover:bg-grey-0 hover:text-grey-10 py-4 pl-3 pr-5 ">Editar endereço</button>
                                <Link href="/profile" className="text-left font-inter hover:bg-grey-0 hover:text-grey-10 py-4 pl-3 pr-5 ">Meus Anúncios</Link>
                                <a onClick={logout} href="#" className="font-inter hover:bg-grey-0 hover:text-grey-10 py-4 pl-3 pr-5 ">Sair</a>
                            </>
                            :
                            <>
                                <a onClick={() => router.push("/login")} className="font-inter hover:bg-grey-0 hover:text-grey-10 py-4 pl-3 pr-5 cursor-pointer">Fazer login</a>
                                <div className="pl-3 pr-5 pb-8 pt-4">
                                    <button onClick={() => router.push("/register")} className="btn-big btn-outline2 w-full">Cadastrar</button>
                                </div>
                            </>

                        }
                    </div>
                </>
            }
        </>
    )
}