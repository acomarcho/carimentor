import React from "react";

export default function Wrapper({ children }: { children: React.ReactNode }) {
  return <div className="relative">{children}</div>;
}
