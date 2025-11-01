import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from './layouts/Layout';
import './App.css'

import OrderStatus from './pages/orderStatus/page'
import ReadyView from './pages/readyView/page'
import ResultLayout from './layouts/ResultLayout';
import Login from './pages/startScreen/login'
import StartScreen from './pages/startScreen/StartScreen'
import ConfigPage from './pages/config/ConfigPage'

function App() {


  return (
    <Router>
      <Routes>
        <Route path='/status' element={
          <Layout>
            <OrderStatus/>
          </Layout>
        }>
        </Route>
        <Route path='/login' element={
          
            <Login/>
          
        }>
        </Route>
        <Route path='/config' element={
          <ConfigPage/>
        }>
        </Route>
        
        <Route path='/result' element={
          <ResultLayout>
            <ReadyView />
          </ResultLayout>
        }></Route>
        <Route path='/' element={

            <StartScreen/>
        }>
        </Route>
      </Routes>
    </Router>
  )
}

export default App
