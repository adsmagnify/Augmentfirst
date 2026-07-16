import type { MetadataRoute } from "next";
import { SITE_DESCRIPTION, SITE_NAME } from "@/app/lib/site";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: SITE_NAME,
    short_name: SITE_NAME,
    description: SITE_DESCRIPTION,
    start_url: "/",
    display: "standalone",
    background_color: "#080b12",
    theme_color: "#c9a227",
    icons: [
      {
        src: "/augment_first_logo.png",
        sizes: "any",
        type: "image/png",
      },
    ],
  };
}
