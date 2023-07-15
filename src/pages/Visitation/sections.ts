interface SectionType {
  name: string;
  link: string;
}

const sections: SectionType[] = [
  {
    name: 'All Visitors',
    link: '/visitation/all',
  },
  {
    name: 'First Timers',
    link: '/visitation/first-timers',
  },
  {
    name: 'Second Timers',
    link: '/visitation/second-timers',
  },
  {
    name: 'Assigned First Timers',
    link: '/visitation/assigned-first-timers',
  },
  {
    name: 'Assigned Second Timers',
    link: '/visitation/assigned-second-timers',
  },
];

export default sections;
