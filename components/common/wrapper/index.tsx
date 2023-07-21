import React from "react";
import DecorationVector from "../decoration-vector";

export default function Wrapper({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative min-h-[calc(100vh-90px)] mt-[70px] lg:mt-[90px]">
      <DecorationVector />
      {children}
    </div>
  );
}
