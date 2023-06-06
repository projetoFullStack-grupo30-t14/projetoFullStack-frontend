import { CommentList } from "@/components/commentList";
import { NewComment } from "@/components/commentNew";
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
                <CommentList/>
                <NewComment/>
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