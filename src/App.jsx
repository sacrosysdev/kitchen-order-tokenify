import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from './layouts/Layout';
import './App.css'

import OrderStatus from './pages/orderStatus/page'
import ReadyView from './pages/readyView/page'
import ResultLayout from './layouts/ResultLayout';
import StartScreen from './pages/startScreen/page'

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
