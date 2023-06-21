import { UserType } from "@/schemas";
import { getInitials } from "./utils";

interface UserCars {
    name: string;
    id: string;
    description: string;
}
interface InfoSellerProps{
    userData: UserType | UserCars | null;
    children: JSX.Element;
}
const InfoSellerProfile = ({userData, children}: InfoSellerProps) => {
    if (!userData){
        return null
    }

    const initials = getInitials(userData.name);

    return (
        <div className='bg-grey-10 rounded mx-4' >
            <div className='flex flex-col gap-5 p-10'>
                <div className="bg-brand-1 w-32 h-32 rounded-full flex items-center justify-center">
                    <span className="text-brand-4 font-inter text-heading1">{initials}</span>
                </div>
                <div className="flex items-center gap-2.5">
                    <h1 className='heading-6-600 font-lexend'>{userData.name}</h1>
                    <span className="flex items-center bg-brand-4 rounded p-1 font-inter text-brand-1 text-body2-500"> Anunciante </span>
                </div>
                <p className="text-body1 font-inter text-grey-2">{userData.description}</p>
                {children}
            </div>
        </div>
    )
}

export default InfoSellerProfile;
