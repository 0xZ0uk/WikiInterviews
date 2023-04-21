/* eslint-disable @next/next/no-img-element */
import Image from "next/image";
import React from "react";

interface ProfileProps {
  name: string;
  description: string;
  image?: string;
}

const Profile: React.FC<ProfileProps> = ({ name, description, image }) => {
  return (
    <div className="flex h-full basis-1/3 flex-col rounded-lg border">
      <div className="flex h-2/3 flex-col items-center justify-center gap-4">
        <div className="h-48 w-48 rounded-full border">
          <img
            src={image || ""}
            alt={name}
            className="aspect-square h-full w-full rounded-full object-fill"
          />
        </div>
        <div className="text-center">
          <h3 className="text-2xl font-bold text-stone-800">{name}</h3>
          <p className="text-sm text-stone-500">{description}</p>
        </div>
      </div>
    </div>
  );
};

export default Profile;
