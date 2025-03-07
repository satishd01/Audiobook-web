import React, { useState } from "react";
import { user } from "../../../utils/constants";

const EditProfile = ({ setIsEditOpen }) => {
  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [image, setImage] = useState(user.imageUrl);

  return (
    <form className="py-4 px-6">
      <p className="text-center text-xl">Edit Profile</p>
      <div className="mt-3">
        <label htmlFor="name">Name</label>
        <input
          type="text"
          placeholder="ex: xyz"
          id="name"
          className="bg-[#151515] py-2 px-3 rounded-md w-full"
          value={name}
          required
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div className="mt-3">
        <label htmlFor="email">Email</label>
        <input
          type="email"
          placeholder="ex: xyz"
          required
          className="bg-[#151515] py-2 px-3 rounded-md w-full"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div className="mt-3">
        <p>Change Image</p>
        <img alt={name} src={image} className="rounded-lg mt-2 h-28" />
      </div>
      <div className="mt-3 flex justify-end gap-4">
        <button
          className="px-3 py-1 bg-gray-500 rounded-md"
          onClick={(e) => {
            e.preventDefault(); // Prevent form submission
            setIsEditOpen(false);
          }}>
          Close
        </button>
        <button className="px-3 py-1 bg-gray-100 text-black rounded-md">
          Save
        </button>
      </div>
    </form>
  );
};

export default EditProfile;
