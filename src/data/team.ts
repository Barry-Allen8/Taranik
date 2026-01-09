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
    id: "ievgenii",
    image: "/images/team/ievgenii.jpg",
    social: {
      linkedin: "https://linkedin.com/in/ievgenii-bigun",
      github: "https://github.com/ievgenii-bigun",
    },
  },
  {
    id: "vladyslav",
    image: "/images/team/vladyslav.jpg",
    social: {
      linkedin: "https://linkedin.com/in/vladyslav-bereza",
      github: "https://github.com/vladyslav-bereza",
    },
  },
  {
    id: "alex",
    image: "/images/team/alex.jpg",
    social: {
      linkedin: "https://linkedin.com/in/alex-sydorenko",
    },
  },
  {
    id: "katherine",
    image: "/images/team/katherine.jpg",
    social: {
      linkedin: "https://linkedin.com/in/katherine-melnyk",
    },
  },
  {
    id: "pawel",
    image: "/images/team/pawel.jpg",
    social: {
      linkedin: "https://linkedin.com/in/pawel-koterski",
      github: "https://github.com/pawel-koterski",
    },
  },
];
