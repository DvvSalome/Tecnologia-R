import 'normalize.css'
import './App.css'
import './index.css'
import Header from './layout/Header';
import Footer from './layout/Footer';
import Rounting from './routes/Routing';

function App() {

  return (
    <>
      <Header />
      <div className='flex flex-col justify-center nunito-sans-regular'>
        <div className='ContainerPrimary relative'>
          <Rounting />
        </div>
      </div>
      <Footer />
    </>
  )
}

export default App
