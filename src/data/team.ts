export interface TeamMemberData {
  id: string;
  image: string;
  social?: {
    linkedin?: string;
    github?: string;
    twitter?: string;
  };
}

export const teamMembers: TeamMemberData[] = [
  {
    id: "andriy",
    image: "/images/team/andriy.jpg",
    social: {
      linkedin: "https://linkedin.com/in/andriy-kovalenko",
      github: "https://github.com/andriy-kovalenko",
    },
  },
  {
    id: "maria",
    image: "/images/team/maria.jpg",
    social: {
      linkedin: "https://linkedin.com/in/maria-petrenko",
      github: "https://github.com/maria-petrenko",
    },
  },
  {
    id: "oleksiy",
    image: "/images/team/oleksiy.jpg",
    social: {
      linkedin: "https://linkedin.com/in/oleksiy-sydorenko",
      github: "https://github.com/oleksiy-sydorenko",
    },
  },
  {
    id: "kateryna",
    image: "/images/team/kateryna.jpg",
    social: {
      linkedin: "https://linkedin.com/in/kateryna-melnyk",
    },
  },
  {
    id: "igor",
    image: "/images/team/igor.jpg",
    social: {
      linkedin: "https://linkedin.com/in/igor-bondarenko",
      github: "https://github.com/igor-bondarenko",
    },
  },
];
