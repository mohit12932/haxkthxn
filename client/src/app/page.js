"use client"
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
export default function Home() {
   
  const router = useRouter();

  useEffect(() => {
    router.push('./patientPortal');
  }); 

  return (
   <div className="container h-full">
   </div>
  );
}

