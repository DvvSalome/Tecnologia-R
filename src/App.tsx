import './App.css'
import 'normalize.css'
import Header from './layout/Header';
import Footer from './layout/Footer';
import Rounting from './routes/Routing';

function App() {

  return (
    <>
      <Header />
      <div className='flex flex-col justify-center'>
        <div className='ContainerPrimary relative'>
          <Rounting />
        </div>
      </div>
      <Footer />
    </>
  )
}

export default App
