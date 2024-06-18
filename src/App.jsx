import { useState } from 'react'
import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { UserProvider } from './UserContext';
import {Home} from './Main Pages/Home'
import {LogIn} from './Main Pages/LogIn'
import {Search} from './Main Pages/Search'
import { UserMainPage } from './Main Pages/UserMainPage'
import {ArticlePage} from './Main Pages/ArticlePage'
import {PostArticle} from './Main Pages/PostArticle'
import { Header } from './Components/Header';

function App() {
  return (
    <UserProvider>
    <BrowserRouter>
    <Header />
    <Routes>
      <Route path="/" element={<Home/>}/>
      {/* <Route path="/home/:username" element={<Home/>}/> */}
      <Route path="/login" element={<LogIn/>}/>
      <Route path="/search" element={<Search/>}/>
      {/* <Route path="/search/:username" element={<Search/>}/> */}
      <Route path="/user-page" element={<UserMainPage/>}/>
      <Route path="/post-article" element={<PostArticle/>}/>
      <Route path="/article/:article_id" element={<ArticlePage/>}/>
    </Routes>
    </BrowserRouter>
    </UserProvider>
      
  )
}

export default App
