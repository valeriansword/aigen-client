import React from 'react'
import {BrowserRouter,Routes,Route,Link} from "react-router-dom";
import Header from './components/Header';
import Home from './components/Home';
import CreatePost from './components/CreatePost';
function App() {
  return (
    <div>
      <BrowserRouter>
        <Header />
        <main className='w-full sm:p-8 px-4 py-8 bg-[#f9fafe] min-h-[calc(100vh-73px)]'>
          <Routes>
            <Route path="/"  element={<Home />} />
            <Route path="/createPost"  element={<CreatePost />} />
          </Routes>
        </main>
      </BrowserRouter>
    </div>
  )
}

export default App
