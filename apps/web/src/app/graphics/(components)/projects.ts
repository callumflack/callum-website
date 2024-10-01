import path from "node:path";
import sizeOf from "image-size";

export interface ProjectImage {
  image: string;
  height: number;
  width: number;
}

export interface Project extends ProjectImage {
  title: string;
  date: string;
  caseStudyLink?: string;
  noBorder?: boolean;
}

function getImageSize(imagePath: string) {
  const fullPath = path.join(process.cwd(), "public", imagePath);
  const dimensions = sizeOf(fullPath);
  return { width: dimensions.width || 0, height: dimensions.height || 0 };
}

const projectsData = [
  {
    title: "Sagatiba illustration for Saatchi & Saatchi, London",
    date: "2006-01-01",
    image: "/images/saatchi-sagatiba-1200.png",
  },
  {
    title: "Poster for Millennius Fashion",
    date: "1998-01-01",
    image: "/images/_millennius-1211A.jpg",
  },
  // {
  //   title: "Logo for Barriosoundz",
  //   date: "2000-01-01",
  //   image: "/images/barriosoundz.jpg",
  // },
  {
    title: "Outdoor campaign for Brisbane Arcade",
    date: "2001-01-01",
    image: "/images/brisbane-arcade-love-me.jpg",
    caseStudyLink: "/breaka",
  },
  {
    title: "Kalaurie website",
    date: "2020-01-01",
    image: "/images/kalaurie-overview-poster-1600-1000.jpg",
    caseStudyLink: "/kalaurie",
  },
  {
    title: "Library of Economic Possibility website",
    date: "2021-01-01",
    image: "/images/lep-brand-clean-1600-1000.jpg",
    caseStudyLink: "/the-library-of-economic-possibility",
  },
  {
    title: "Logo for Oshan Jarrow's Musing Mind podcast",
    date: "2021-01-01",
    image: "/images/musing-mind-podcast.jpg",
  },
  {
    title: "Ocean Blue Living",
    date: "2017-01-01",
    image: "/images/oceanblueliving-visual-system.png",
  },
  // {
  //   title: "Logo for Feedback Cafe",
  //   date: "2009-01-01",
  //   image: "/images/FB002_Sign1mW_M01.jpg",
  // },
  {
    title: "Replier logotype",
    date: "2020-01-01",
    image: "/images/replier-card.jpg",
    caseStudyLink: "/replier",
  },
  {
    title: "Logo for Melbourne Soul Weekender (Covid edition)",
    date: "2022-01-01",
    image: "/images/MSW-2022.png",
  },
  {
    title: "InnerSpace CD booklet for Votary Records",
    date: "2008-01-01",
    image: "/images/votary-innerspacedvd.jpg",
  },
  {
    title: "CD cover for the famous Waxidermy Mixtape Swap",
    date: "2010-01-01",
    image: "/images/colouring-in-2010.png",
    noBorder: true,
  },
  {
    title: "Record cover for Dual Planet",
    date: "2011-01-01",
    image: "/images/dualplanet-donharper-cover.jpg",
    noBorder: true,
  },
  {
    title: "Logo for Roundtable Records",
    date: "2008-01-01",
    image: "/images/roundtable-label-birds-2.jpg",
  },
  {
    title: "Poster for Watch Your Step",
    date: "2010-01-01",
    image: "/images/WYS11_GenericFlyer_01.jpg",
  },
  {
    title: "Poster for Weird Gear",
    date: "2010-01-01",
    image: "/images/WeirdGearBrisbane_1011.jpg",
  },
  {
    title: "Another poster for Weird Gear",
    date: "2011-01-01",
    image: "/images/WeirdGearBrisbane_1101.jpg",
  },
  {
    title: "Youtube brand system for Deep Gospel Sound",
    date: "2015-01-01",
    // image: "/images/BJL-DeepGospelSound-M03.jpg",
    image: "/images/deep-soul-gospel.png",
    caseStudyLink: "https://www.youtube.com/@DeepGospelSound",
  },
  {
    title: "The Substation website",
    date: "2016-01-01",
    image: "/images/the-substation.png",
  },
  {
    title: "Marinetti CD cover for Roundtable Records",
    date: "2011-01-01",
    image: "/images/roundtable-marinetti-back.jpg",
  },
  {
    title: "Dido & Aeneas poster for Vision Opera, London",
    date: "2005-01-01",
    image: "/images/visionopera-dido-aenaes-lg.jpg",
  },
  {
    title: "Solar Flares record cover for Votary Records",
    date: "2009-01-01",
    image: "/images/votary-solarflares-coverback.jpg",
  },
];

const projects: Project[] = projectsData.map((project) => {
  const { width, height } = getImageSize(project.image);
  return { ...project, width, height };
});

export default projects;
