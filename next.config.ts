import { withNextVideo } from "next-video/process";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ["ybqzcyfozmtolhtsqclg.supabase.co"], // Add your Supabase storage hostname
  },
};

export default withNextVideo(nextConfig);