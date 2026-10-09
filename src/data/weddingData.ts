export interface WeddingData {
  couple: {
    brideShort: string;
    groomShort: string;
    hashtag: string;
  };
  invite: {
    kicker: string;
    line: string;
  };
  families: {
    groom: {
      label: string;
      name: string;
      parents: string;
    };
    bride: {
      label: string;
      name: string;
      parents: string;
    };
  };
  event: {
    title: string;
    startsAt: string;
    endsAt: string;
    dateLabel: string;
    dayLabel: string;
    timeLabel: string;
    dressCode?: string;
    note: string;
    contact?: string;
  };
  venue: {
    name: string;
    address: string;
    url: string;
  };
  story: Array<{
    label: string;
    title: string;
    text: string;
    image: string;
    position: string;
  }>;
  blessing: {
    line: string;
    translation: string;
    source: string;
  };
  footer: {
    families: string;
  };
}

export const weddingData: WeddingData = {
  couple: {
    brideShort: "Sayali",
    groomShort: "Pranav",
    hashtag: "#SayaliPranav",
  },
  invite: {
    kicker: "With blessings of Bhosale & Sangle Family",
    line: "cordially invite you to celebrate their engagement",
  },
  families: {
    groom: {
      label: "The Groom",
      name: "Pranav Sangle",
      parents: "S/O Mrs. Jyoti & Mr. Sampat Rambhau Sangle",
    },
    bride: {
      label: "The Bride",
      name: "Sayali Bhosale",
      parents: "D/O Mrs. Seema & Mr. Sanjay Dattaramrao Bhosale",
    },
  },
  event: {
    title: "The Engagement of Sayali & Pranav",
    startsAt: "2026-10-25T11:00:00+05:30",
    endsAt: "2026-10-25T15:00:00+05:30",
    dateLabel: "25 . 10 . 2026",
    dayLabel: "Sunday",
    timeLabel: "11 AM onwards",
    note: "Celebratory lunch to follow",
    contact: "9881887547",
  },
  venue: {
    name: "GITAI Lawns & Banquets",
    address:
      "Survey No. 280/1/1/1, Dhanori-Lohegaon Road, Sathe Nagar, Lohegaon, Pune, Maharashtra 411047",
    url: "https://maps.google.com/?q=GITAI+Lawns+%26+Banquets,+Survey+No.+280/1/1/1,+Dhanori-Lohegaon+Road,+Sathe+Nagar,+Lohegaon,+Pune,+Maharashtra+411047",
  },
  story: [
    {
      label: "Chapter One",
      title: "The First Meeting",
      text: "A warm introduction, shared smiles, and a conversation that effortlessly turned into something meaningful.",
      image: "/assets/couple-3.jpg",
      position: "50% 20%",
    },
    {
      label: "Chapter Two",
      title: "Growing Together",
      text: "Cherished memories, mutual understanding, and two souls discovering their perfect match.",
      image: "/assets/couple-2.jpg",
      position: "50% 25%",
    },
    {
      label: "Chapter Three",
      title: "The Engagement",
      text: "Surrounded by our loved ones, we celebrate this joyous milestone and begin our journey together.",
      image: "/assets/couple-1.jpg",
      position: "50% 15%",
    },
  ],
  blessing: {
    line: "May your intentions be one, may your hearts beat as one.",
    translation:
      "Two families, one thread of gold — and a lifetime of happiness made luminous together.",
    source: "With blessings of Bhosale & Sangle Family",
  },
  footer: {
    families: "With blessings of Bhosale & Sangle Family",
  },
};
