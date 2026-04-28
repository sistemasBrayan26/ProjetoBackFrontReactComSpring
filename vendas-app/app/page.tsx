import Link from 'next/link';
import { Layout } from './components'

const Home: React.FC = () => {
    return (
     <div>
        <header>
            <title>Vendas App</title>
            <link rel='icon' href='/favicon.ico' />
        </header>

        <Layout titulo='Home'>
            Testando a parte do Home
        </Layout>
     </div>
      

    )
}

export default Home;
