"use client";

import { Rate } from "antd";
import Image from "next/image";
import { useState } from "react";

interface Superhero {
  humilityRating: number;
  id?: string;
  name: string;
  image?: string;
  powers: { id: string; name: string }[];
}

interface SuperheroCardProps {
  superhero: Superhero;
  onEdit: (superhero: Superhero) => void;
}



const SuperheroCard = ({ superhero, onEdit }: SuperheroCardProps) => {
  const [shImage] = useState(Math.floor(Math.random() * 21) + 1);
  
  return (
    <div className="relative bg-gray-900 text-white rounded-2xl overflow-hidden shadow-lg p-6">
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-transparent to-gray-900"></div>
      <Image
        src={`/sh-${shImage}.${shImage > 16 ? 'png' : 'jpg'}`}
        alt={superhero.name}
        width={500}
        height={200}
        className="w-full h-40 object-cover rounded-t-2xl"
      />
      <div className="relative z-10 p-4">
        <h2 className="text-2xl font-bold">{superhero.name}</h2>
        <div className="flex items-start gap-2 mt-2 cursor-pointer" onClick={() => onEdit(superhero)}>
          <div className="text-yellow-400">Rating</div>
          <Rate
            disabled
            defaultValue={superhero.humilityRating}
            count={10}
          />
        </div>
        <p className="text-gray-400 mt-2">
          Powers: {superhero.powers.map((p) => p.name).join(", ")}
        </p>
      </div>
    </div>
  );
};

export default SuperheroCard;
