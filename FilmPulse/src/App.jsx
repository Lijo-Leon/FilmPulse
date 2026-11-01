import { Route, Routes } from 'react-router-dom'
import './App.css'
import Home from './pages/Home'
import Auth from './pages/Auth'
import Cinematography from './pages/Cinematography'
import CameraMovements from './pages/CameraMovements'
import CMResults from './pages/CMResults'
import Subscription from './pages/Subscription'
import ShotType from './pages/ShotType'
import STResults from './pages/STResults'
import Lens from './pages/Lens'
import Header from './components/Header'
import Audio from './components/Audio'
import Profile from './pages/Profile'
import Notification from './pages/Notification'
import AdminHome from './admin/pages/AdminHome'
import AdminPreloader from './admin/pages/AdminPreloader'
import PageNotFound from './pages/PageNotFound'
import AdminTechniques from './admin/pages/AdminTechniques'
import AdminUsers from './admin/pages/AdminUsers'
import PaymentSuccess from './pages/PaymentSuccess'
import PaymentError from './pages/PaymentError'
import Requests from './admin/pages/Requests'
import About from './pages/About'
import Favourite from './pages/Favourite'





function App() {

  return (
    <>
      <Header />

      <Routes>
        <Route path='/' element={<Auth />}></Route>
        <Route path='register' element={<Auth register />}></Route>
        <Route path='home' element={<Home />} />
        <Route path='about' element={<About />} />
        <Route path='cinematography' element={<Cinematography />}></Route>
        <Route path='cameramovements' element={<CameraMovements />}></Route>
        <Route path='cmresults/:id' element={<CMResults />}></Route>
        <Route path='shottype' element={<ShotType />}></Route>
        <Route path='stresults/:id' element={<STResults />}></Route>
        <Route path='lens_depths' element={<Lens />}></Route>
        <Route path='subscription' element={<Subscription />}></Route>
        <Route path='profile' element={<Profile />}></Route>
        <Route path='notification' element={<Notification />}></Route>
        <Route path='favourites' element={<Favourite />}></Route>
        <Route path='payment-success' element={<PaymentSuccess />}></Route>
        <Route path='payment-error' element={<PaymentError />}></Route>



        <Route path='admin-home' element={<AdminHome />}></Route>
        <Route path='admin-preloader' element={<AdminPreloader />}></Route>
        <Route path='admin-techniques' element={<AdminTechniques />}></Route>
        <Route path='admin-users' element={<AdminUsers />}></Route>
        <Route path='admin-requests' element={<Requests />}></Route>

        <Route path='*' element={<PageNotFound />}></Route>

      </Routes>
    </>
  )
}

export default App
