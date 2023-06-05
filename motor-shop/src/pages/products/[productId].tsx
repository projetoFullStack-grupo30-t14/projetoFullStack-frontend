import { useRouter } from "next/router";

export default function Products () {
    const router = useRouter()
    const { productId } = router.query

    return (
        <>
            {/* Top Background = Blue
            Bottom background = Grey? */}
            <header>Same as homepage</header>
            <main>
                <div>Main car picture</div>
                <div>Car info card</div>
                <div>Car description card</div>
                <ul>Lista com comentários</ul>
                <div>Componente para fazer novos comentários</div>
                <aside>
                    <div>Additional car pictures</div>
                    <div>
                        <div>Announcer info</div>
                        <button>All announcer's products</button>
                    </div>
                </aside>
            </main>
            <footer>Same as homepage</footer>
        </>
    )
}