"use client";

import { ReactNode } from "react";
import SmoothScroll from "./smooth-scroll";
import { Cursor } from "./cursor";

export const Providers = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <SmoothScroll>
        <Cursor />
        {children}
      </SmoothScroll>
    </>
  );
};
