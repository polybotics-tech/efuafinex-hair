export const DEMO_PACKAGE_LIST = [
  {
    id: 3,
    created_time: "2025-01-01 11:02:10",
    package_id: "PID-301pHk69",
    package_type: "defined",
    deadline: "2025-02-14 11:02:10",
    title: "End of year Bone straight money",
    description:
      "Planning a major hair transformation? Our savings package allows you to invest in high-quality services like coloring, extensions, or keratin treatments while staying within budget. \n\nSave more as you refresh your look with professional hair services tailored to your needs. Perfect for those looking to switch up their style without worrying about high costs.",
    status: "in-progress",
    target_amount: 244990,
    available_amount: 32500,
  },
  {
    id: 2,
    created_time: "2024-09-23 14:02:10",
    package_id: "PID-73Yqe299",
    package_type: "free",
    deadline: "2026-09-23 11:02:10",
    title: "Hair care deposit for next session",
    description:
      "Pamper your hair with the finest treatments at a fraction of the cost with our luxury savings package. \n\nGet access to top-tier styling, deep-conditioning treatments, and premium haircare products at discounted rates. \n\nWhether you love frequent salon visits or just want to keep your hair in top shape, this plan ensures you experience luxury without overspending.",
    status: "in-progress",
    target_amount: 0,
    available_amount: 213500,
  },
  {
    id: 1,
    created_time: "2024-11-01 11:02:10",
    package_id: "PID-427Ty34",
    package_type: "defined", //free or defined
    deadline: "2024-01-25 11:02:10",
    title: "Savings for valentine wig",
    description:
      "Take control of your hair care routine with a savings package designed for consistency and affordability. \n\nEnjoy exclusive discounts on premium hair treatments, styling services, and maintenance essentials while keeping your hair healthy all year round. \n\nThis package is perfect for those who want to maintain beautiful hair without breaking the bank.",
    status: "on-delivery", //in-progress, completed, on-delivery, delivered, discontinued
    target_amount: 73750,
    available_amount: 73750,
  },
];

export const DEMO_DEPOSIT_LIST = [
  {
    id: 1,
    created_time: "2025-01-11 11:02:22",
    deposit_id: "DEPOSIT-324GHd24",
    transaction_ref: "TREF-YHdcA1799834902324",
    package_id: "PID-432HjE16",
    amount: 5500,
    status: "success",
    user_id: "USER-34FSJ173094244244",
  },
  {
    id: 2,
    created_time: "2025-01-23 21:23:04",
    deposit_id: "DEPOSIT-914GHd25",
    transaction_ref: "TREF-YHdcA1799834902324",
    package_id: "PID-410ifD39",
    amount: 20500,
    status: "pending",
    user_id: "USER-34FSJ173094244244",
  },
];
