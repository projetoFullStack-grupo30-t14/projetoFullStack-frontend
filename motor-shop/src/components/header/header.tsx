export function Header () {
    return (
        <header className="my-10 font-inter body-1-400 justify-between w-full">
            <div>Aqui fica a logo</div>
            <div>Aqui fica o menu</div>
            <input type="text" name="text" id="text" placeholder="this is a text"/>
            <select name="select" id="select">
                <option value="1">Uma opção qualquer</option>
                <option value="2">Uma opção qualquer</option>
            </select>
            <button className="btn-big btn-success">Um botão</button>
            <button className="btn-medium btn-grey1">Um botão</button>
        </header>
    )
}