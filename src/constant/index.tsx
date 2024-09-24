const categories = [
  {
    value: "Software",
    name: "Software",
  },
  {
    value: "Marketing",
    name: "Marketing",
  },
  {
    value: "Business",
    name: "Business",
  },
];

const roles = [
  {
    value: "Member",
    name: "Member",
  },
  {
    value: "Viewer",
    name: "Viewer",
  },
];

const taskTypes = [
  {
    value: "Task",
    name: "Task",
  },
  {
    value: "Bug",
    name: "Bug",
  },
  {
    value: "Story",
    name: "Story",
  },
];

const taskStatus = [
  {
    value: "Backlog",
    name: "Backlog",
  },
  {
    value: "Process",
    name: "Process",
  },
  {
    value: "Done",
    name: "Done",
  },
  {
    value: "Develop",
    name: "Develop",
  },
];

const taskLevel = [
  {
    value: "Lowest",
    name: "Lowest",
  },
  {
    value: "Low",
    name: "Low",
  },
  {
    value: "Medium",
    name: "Medium",
  },
  {
    value: "High",
    name: "High",
  },
  {
    value: "Highest",
    name: "Highest",
  },
];

const menuItems = [
  {
    label: "Board",
    url: "board",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" role="presentation">
        <g fill="currentcolor">
          <path d="M4 18h16.008C20 18 20 6 20 6H3.992C4 6 4 18 4 18M2 5.994C2 4.893 2.898 4 3.99 4h16.02C21.108 4 22 4.895 22 5.994v12.012A1.997 1.997 0 0 1 20.01 20H3.99A1.994 1.994 0 0 1 2 18.006z"></path>
          <path d="M8 6v12h2V6zm6 0v12h2V6z"></path>
        </g>
      </svg>
    ),
  },
  {
    label: "Settings",
    url: "setting",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" role="presentation">
        <path
          fill="currentcolor"
          fill-rule="evenodd"
          d="M11.701 16.7a5.002 5.002 0 1 1 0-10.003 5.002 5.002 0 0 1 0 10.004m8.368-3.117a1.995 1.995 0 0 1-1.346-1.885c0-.876.563-1.613 1.345-1.885a.48.48 0 0 0 .315-.574 9 9 0 0 0-.836-1.993.48.48 0 0 0-.598-.195 2.04 2.04 0 0 1-1.29.08 1.99 1.99 0 0 1-1.404-1.395 2.04 2.04 0 0 1 .076-1.297.48.48 0 0 0-.196-.597 9 9 0 0 0-1.975-.826.48.48 0 0 0-.574.314 1.995 1.995 0 0 1-1.885 1.346 1.99 1.99 0 0 1-1.884-1.345.48.48 0 0 0-.575-.315c-.708.2-1.379.485-2.004.842a.47.47 0 0 0-.198.582A2.002 2.002 0 0 1 4.445 7.06a.48.48 0 0 0-.595.196 9 9 0 0 0-.833 1.994.48.48 0 0 0 .308.572 1.995 1.995 0 0 1 1.323 1.877c0 .867-.552 1.599-1.324 1.877a.48.48 0 0 0-.308.57 9 9 0 0 0 .723 1.79.477.477 0 0 0 .624.194c.595-.273 1.343-.264 2.104.238.117.077.225.185.302.3.527.8.512 1.58.198 2.188a.473.473 0 0 0 .168.628 9 9 0 0 0 2.11.897.474.474 0 0 0 .57-.313 1.995 1.995 0 0 1 1.886-1.353c.878 0 1.618.567 1.887 1.353a.475.475 0 0 0 .57.313 9 9 0 0 0 2.084-.883.473.473 0 0 0 .167-.631c-.318-.608-.337-1.393.191-2.195.077-.116.185-.225.302-.302.772-.511 1.527-.513 2.125-.23a.477.477 0 0 0 .628-.19 9 9 0 0 0 .728-1.793.48.48 0 0 0-.314-.573"
        ></path>
      </svg>
    ),
  },
];

const disableItems = [
  {
    label: "Timeline",
    url: "timeline",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" role="presentation">
        <path
          fill="currentcolor"
          fill-rule="evenodd"
          d="M6 2h10a3 3 0 0 1 0 6H6a3 3 0 1 1 0-6m0 2a1 1 0 1 0 0 2h10a1 1 0 0 0 0-2zm4 5h8a3 3 0 0 1 0 6h-8a3 3 0 0 1 0-6m0 2a1 1 0 0 0 0 2h8a1 1 0 0 0 0-2zm-4 5h6a3 3 0 0 1 0 6H6a3 3 0 0 1 0-6m0 2a1 1 0 0 0 0 2h6a1 1 0 0 0 0-2z"
        ></path>
      </svg>
    ),
  },
  {
    label: "Reports",
    url: "#",
    icon: (
      <svg
        fill="#000000"
        xmlns="http://www.w3.org/2000/svg"
        width="24px"
        height="24px"
        viewBox="0 0 100 100"
      >
        <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
        <g
          id="SVGRepo_tracerCarrier"
          stroke-linecap="round"
          stroke-linejoin="round"
        ></g>
        <g id="SVGRepo_iconCarrier">
          <g>
            <g>
              <path d="M39,32h22c1.1,0,2-0.9,2-2v-4c0-3.3-2.7-6-6-6H43c-3.3,0-6,2.7-6,6v4C37,31.1,37.9,32,39,32z"></path>
            </g>
            <g>
              <path d="M72,25h-2c-0.6,0-1,0.4-1,1v4c0,4.4-3.6,8-8,8H39c-4.4,0-8-3.6-8-8v-4c0-0.6-0.4-1-1-1h-2c-3.3,0-6,2.7-6,6 v43c0,3.3,2.7,6,6,6h44c3.3,0,6-2.7,6-6V31C78,27.7,75.3,25,72,25z M43,66c0,1.1-0.9,2-2,2h-2c-1.1,0-2-0.9-2-2V56 c0-1.1,0.9-2,2-2h2c1.1,0,2,0.9,2,2V66z M53,66c0,1.1-0.9,2-2,2h-2c-1.1,0-2-0.9-2-2V47c0-1.1,0.9-2,2-2h2c1.1,0,2,0.9,2,2V66z M63,66c0,1.1-0.9,2-2,2h-2c-1.1,0-2-0.9-2-2V51c0-1.1,0.9-2,2-2h2c1.1,0,2,0.9,2,2V66z"></path>
            </g>
          </g>
        </g>
      </svg>
    ),
  },
];

export {
  categories,
  disableItems,
  menuItems,
  roles,
  taskTypes,
  taskStatus,
  taskLevel,
};
