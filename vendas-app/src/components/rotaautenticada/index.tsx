"use client";

import { useSession, signIn, signOut } from "next-auth/react"

interface RotaAutenticadaProps {
    children: React.ReactNode;
}

export const RotaAutenticada: React.FC<RotaAutenticadaProps> = ({
    children
}) => {

    const { data: session } = useSession();

    if (!session) {
        return (
            <button onClick={() => signIn()}>
                Você não está logado, clique para logar
            </button>
        )
    }

    return (
        <div>
            {children}

        </div>
    )


}

export default RotaAutenticada;