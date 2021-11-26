import React from 'react'

import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'

//imports admin
import Dashboard from './pages/admin/dashboard'

import ArticlesList from './pages/admin/articles'
import AddArticle from './pages/admin/articles/addArticle'
import EditArticle from './pages/admin/articles/editArticle'

import UsersList from './pages/admin/users'
import AddUser from './pages/admin/users/addUser'
import EditUser from './pages/admin/users/editUser'

//imports client
import Home from './pages/client/home'
import ArticlesDetails from './pages/client/articles/articles.details'
import Login from './pages/admin/login'

import WAuth from './services/wAuth'

export default function Root() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Client route */}
        <Route path="/" element={<Home />} />
        <Route path="/articles/:idArticle" element={<ArticlesDetails />} />
        {/* Admin route */}
        <Route path="/admin" element={<Dashboard />} />

        <Route path="/admin/login" element={<Login />} />

        {/* <Route path="/admin/users" element={<WAuth />} /> */}

        <Route path="/admin/articles" element={<ArticlesList />} />
        <Route path="/admin/articles/cadastrar" element={<AddArticle />} />
        <Route path="/admin/articles/editar/:idArticle" element={<EditArticle />} />

        <Route path="/admin/users" element={<UsersList />} />
        <Route path="/admin/users/cadastrar" element={<AddUser />} />
        <Route path="/admin/users/editar/:idUser" element={<EditUser />} />
      </Routes>
    </BrowserRouter>
  )
}
