interface SectionType {
  name: string;
  link: string;
}

const sections: SectionType[] = [
  {
    name: 'TFCC Zones',
    link: '/tfcc/zone',
  },
  {
    name: 'TFCC Cells',
    link: '/tfcc/cell',
  },
  {
    name: 'TFCC Leaders',
    link: '/tfcc/leader',
  },
];

export default sections;
