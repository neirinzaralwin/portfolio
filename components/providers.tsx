"use client";

import { ReactNode } from "react";
import { SmoothScroll } from "./smooth-scroll";
import { Cursor } from "./cursor";
import { Preloader } from "./preloader";

export const Providers = ({ children }: { children: ReactNode }) => {
  return (
    <SmoothScroll>
      <Preloader />
      <Cursor />
      {children}
    </SmoothScroll>
  );
};
