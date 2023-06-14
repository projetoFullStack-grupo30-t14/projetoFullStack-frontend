import { useModal } from "@/contexts/modalContext"

export default function TestForm () {
    const { closeModal } = useModal()
    return (
        <form action="" className="flex flex-col">
            <input type="text" />
            <input type="text" />
            <input type="text" />
            <input type="text" />
            <button>Teste</button>
        </form>
    )
}