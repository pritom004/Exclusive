import { Instagram, Linkedin, Twitter } from "lucide-react";
import React from "react";
import { Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/pagination";

const teamMembers = [
  {
    name: "Tom Cruise",
    url: "https://randomuser.me/api/portraits/men/32.jpg",
    department: "Founder & Chairman",
  },
  {
    name: "Emma Watson",
    url: "https://randomuser.me/api/portraits/women/44.jpg",
    department: "Managing Director",
  },
  {
    name: "Will Smith",
    url: "https://randomuser.me/api/portraits/men/51.jpg",
    department: "Product Designer",
  },
  {
    name: "Robert Downey",
    url: "https://randomuser.me/api/portraits/men/12.jpg",
    department: "Lead Engineer",
  },
  {
    name: "Scarlett Johansson",
    url: "https://randomuser.me/api/portraits/women/18.jpg",
    department: "UI/UX Designer",
  },
  {
    name: "Chris Evans",
    url: "https://randomuser.me/api/portraits/men/25.jpg",
    department: "Marketing Head",
  },
  {
    name: "Natalie Portman",
    url: "https://randomuser.me/api/portraits/women/30.jpg",
    department: "HR Manager",
  },
  {
    name: "Leonardo DiCaprio",
    url: "https://randomuser.me/api/portraits/men/40.jpg",
    department: "Business Analyst",
  },
  {
    name: "Gal Gadot",
    url: "https://randomuser.me/api/portraits/women/22.jpg",
    department: "Customer Support Lead",
  },
];

const Team = () => {
  return (
    <div className="py-16">
      <Swiper
        modules={[Pagination]}
        spaceBetween={50}
        slidesPerView={3}
        pagination={{ 
            clickable: true,
            dynamicBullets: true,
        }}
      >
        {teamMembers.map((member) => (
          <SwiperSlide key={member.name}>
            <img src={member.url} className="mb-6 w-full" />
            <h4 className="text-3xl font-semibold mb-2">{member.name}</h4>
            <p className="mb-4">{member.department}</p>
            <div className="flex gap-4">
              <Twitter className="size-5.5" />
              <Instagram className="size-5.5" />
              <Linkedin className="size-5.5" />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Team;