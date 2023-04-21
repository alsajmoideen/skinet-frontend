import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { useCookies } from 'react-cookie'

import NavBar from "./components/NavBar"
import Login from "./pages/Auth/Login"
import Register from "./pages/Auth/Register"
import Verification from "./pages/Auth/Verification"
import Home from "./pages/Home/Home"
import Landing from "./pages/Landing/Landing"
import Profile from "./pages/Profile/Profile"
import Post from './pages/Post/Post'
import Work from './pages/Work/Work'
import User from './pages/User/User'
import PostView from './pages/Post/PostView'


function App() {
  const [cookie, _] = useCookies()

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          {!cookie.accessToken ?
            <>
              <Route path='/' element={<Landing />} />
              <Route path='/register' element={<Register />} />
            </> : null}

          <Route path='/login' element={<Login />} />
          <Route path='/auth/verify' element={<Verification />} />

          {cookie.accessToken ?
            <>
              <Route path='/profile' element={<Profile />} />
              <Route path='/' element={<NavBar />} >
                <Route path='/' element={<Home />} />
                <Route path='/postview/:postID' element={<PostView/>} />
                <Route path='post' element={<Post />} />
                <Route path='work' element={<Work />} />
                <Route path='user' element={<User />} />
              </Route>
            </> : null}

        </Routes>
      </BrowserRouter>
      
    </div>
  )
}

export default App
