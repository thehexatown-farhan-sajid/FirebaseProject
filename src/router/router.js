import React from "react";
import Home from "../components/home";
import Form from "../components/create";
import Explore from "../components/explore";
import Collection from "../components/collection";
import UserProfile from "../components/profile";
import ItemsInfo from "../components/itemsinfo";
import ItemsList from "../components/itemlist";
import MakeOffer from "../components/makeoffer";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "../components/navbar";

const Routers = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/create" element={<Form />} />
        <Route path="/explore" element={<Explore />} />
        <Route path="/collection" element={<Collection />} />
        <Route path="/userprofile" element={<UserProfile />} />
        <Route path="/itemsinfo" element={<ItemsInfo />} />
        <Route path="/itemlist" element={<ItemsList />} />
        <Route path="/makeoffer" element={<MakeOffer />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Routers;
