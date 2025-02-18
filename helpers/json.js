export const JSON_ONBOARD_TAB_LIST = [
  {
    page: 1,
    heading: "Shop smart, live better",
    subtext:
      "Discover a seamless shopping experience, tailored just for your satisfaction",
    thumbnails: ["", "", ""],
  },
  {
    page: 2,
    heading: "No more excuses, take that step",
    subtext:
      "Purchase your desired hairs at your own time, pase and financial capability",
    thumbnails: ["", "", ""],
  },
];

export const JSON_QUICK_OPTIONS_LIST = [
  /*{
    tab: 1,
    title: "Free Flow Package",
    desc: "Don't have any hair in mind yet? Save freely at your own pase. No limits, no pressure.",
    path: "/create/?type=free",
  },*/
  {
    tab: 1,
    title: "EFH Ultimate Payment",
    desc: "Found a hair you want? Set the target price, save towards it, meet your hair goal.",
    path: "/create/",
  },
];

export const RECORDS_SORTING_OPTIONS = [
  {
    name: "deposits",
    filters: ["all", "pending", "success", "failed"],
  },
  {
    name: "packages",
    filters: [
      "all",
      "in-progress",
      "completed",
      "on-delivery",
      "delivered",
      "canceled",
    ],
  },
];

export const PACKAGE_DURATION_OPTIONS = [
  "1 month",
  "3 months",
  "6 months",
  "9 months",
  "12 months",
  "15 months",
  "18 months",
  "24 months",
];

export const NOTICE_TITLE = {
  "package-created": "New Package Created",
  "fund-added-to-package": "Funds Added To Package",
};
