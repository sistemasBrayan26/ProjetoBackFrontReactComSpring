import { ReactNode } from 'react';
import { Menu } from './menu'
import { Message } from '@/src/components/common/message'
import { Alert } from '@/src/components/common/message';
import { PrimeReactProvider } from 'primereact/api';

interface LayoutProps {
    titulo: string;
    children?: ReactNode;
    mensagens?: Array<Alert>;

}

export const Layout: React.FC<LayoutProps> = (props: LayoutProps) => {
    return (
        <PrimeReactProvider>

            <div className="app">
                <section className="main-content columns is-fullheight">
                    <Menu />

                    <div className="container column is-10">
                        <div className="section">
                            <div className="card">
                                <div className="card-header">
                                    <p className="card-header-title">
                                        {props.titulo}
                                    </p>
                                </div>
                                <div className="card-content">
                                    <div className="content">
                                        {
                                            props.mensagens && props.mensagens.map((msg, index) => <Message key={index} {...msg} />)
                                        }

                                        {props.children}

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                </section>
            </div>
        </PrimeReactProvider>
    )
}