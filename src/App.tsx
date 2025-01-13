import 'normalize.css'
import './App.css'
import './index.css'
import Header from './layout/Header';
import Footer from './layout/Footer';
import Rounting from './routes/Routing';

function App() {

  return (
    <div className='bg-slate-600'>
      <Header />
      <div className='flex flex-col justify-center nunito-sans-regular pt-10 md:pt-20'>
        <div className='ContainerPrimary relative'>
          <Rounting />
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default App
