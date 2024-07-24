"use client";

import { Provider } from "react-redux";
import { store } from "./store";
// import { createStoreHook } from "react-redux";
// import { applyMiddleware } from "redux";
// const middlewares = [logger];

export function Providers({ children }) {


    
  return <Provider store={ (store)} >{children}</Provider>;}