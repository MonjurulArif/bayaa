"use client";

import { useAuthStore } from "@/store/authStore";
import { useRouter } from "next/navigation";
import { useState } from "react";

import AuthGuard from "@/components/auth/AuthGuard";
import Link from "next/link";

export default function ProfilePage() {
  const user = useAuthStore((state) => state.user);

  const updateProfile = useAuthStore((state) => state.updateProfile);

  const [firstName, setFirstName] = useState(user?.firstName);
  const [lastName, setLastName] = useState(user?.lastName);
  const [email, setEmail] = useState(user?.email);
  const [phone, setPhone] = useState(user?.phone);
  const [gender, setGender] = useState(user?.gender);
  const [birthDate, setBirthDate] = useState(user?.birthDate);

  const handleSave = () => {
    updateProfile({
      firstName,
      lastName,
      email,
      phone,
      gender,
      birthDate,
    });

    alert("Profile updated successfully!");
  };

  return (
    <AuthGuard>
      <div className="mx-auto max-w-3xl p-6">
        <h1 className="mb-8 text-3xl font-bold">My Profile</h1>

        <div className="space-y-4">
          <input
            type="text"
            placeholder="First Name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            className="w-full rounded border p-3"
          />

          <input
            type="text"
            placeholder="Last Name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            className="w-full rounded border p-3"
          />

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full rounded border p-3"
          />

          <input
            type="text"
            placeholder="Phone Number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="w-full rounded border p-3"
          />
          <select
            value={gender}
            onChange={(e) => setGender(e.target.value)}
            className="w-full rounded border p-3"
          >
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>

          <input
            value={birthDate}
            onChange={(e) => setBirthDate(e.target.value)}
            type="date"
            className="w-full rounded border p-3"
          />
          <button
            onClick={handleSave}
            className="rounded bg-black px-6 py-3 text-white cursor-pointer"
          >
            Save Changes
          </button>
        </div>
      </div>
    </AuthGuard>
  );
}
