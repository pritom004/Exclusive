import React from 'react'
import { Outlet } from "react-router";
import Header from '../common/Header';
import Footer from '../common/Footer';

const UserLayout = () => {
  return (
   <main>
    <Header />
    <Outlet />
    <Footer />
   </main>
  )
}

export default UserLayout;
