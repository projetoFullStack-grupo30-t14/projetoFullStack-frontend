
const InfoSellerProfile = () => {
    return (
        <div className='bg-grey-10 rounded mx-4' >
            <div className='flex flex-col gap-5 p-10'>
                <div className="bg-brand-1 w-32 h-32 rounded-full flex items-center justify-center">
                    <span className="text-brand-4 font-inter text-heading1">AN</span>
                </div>
                <div className="flex items-center gap-2.5">
                    <h1 className='heading-6-600 font-lexend'>Announcer name</h1>
                    <span className="flex items-center bg-brand-4 rounded p-1 font-inter text-brand-1 text-body2-500"> Anunciante </span>
                </div>
                <p className="text-body1 font-inter text-grey-2">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's</p>
                <div className="text-left">
                    <button className='btn-brand-outline-brand1 rounded py-3 px-4 font-inter'>Criar Anúncio</button>
                </div>
            </div>
        </div>
    )
}

export default InfoSellerProfile;
