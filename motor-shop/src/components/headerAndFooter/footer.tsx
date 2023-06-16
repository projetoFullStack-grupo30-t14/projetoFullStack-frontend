export function Footer () {

    const isBrowser = () => typeof window !== "undefined"
    function scrollToTop () {
        if (!isBrowser()) return
        window.scrollTo({ top: 0, behavior: "smooth"})
    }
    return (
        <footer className="flex flex-col justify-between items-center gap-12 sm:flex-row bg-grey-0 px-14 py-10">
            <img src="/logo_footer.png" alt="" />
            <p className="body-2-400 text-grey-whiteFixed">©2023 - Todos os direitos reservados</p>
            <div onClick={scrollToTop} className="flex justify-center items-center h-12 w-12 bg-grey-1 rounded cursor-pointer z-10">
                <img src="/angle-up.png" alt="" />
            </div>
        </footer>
    )
}