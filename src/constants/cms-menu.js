import { Routes } from "./routes";

export const menuList = [
  {
    text: "ראשי",
    route: Routes.cmsHome,
  },
  {
    text: "טקסטים",
    route: Routes.cmsTexts,
  },
  {
    text: "מדיה",
    route: Routes.cmsMedia,
    menus: [
      {
        text: "הוספת מדיה",
        route: Routes.cmsAddMedia,
      },
    ],
  },
  {
    text: "הגדרות כלליות",
    route: Routes.cmsGeneral,
  },
];
