import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  devIndicators: {
    appIsrStatus: false, // substitui o antigo comportamento booleano
  },
  
};

export default nextConfig;
