'use client'

import Image from "next/image";
import { useEffect, useState } from "react";
import clientCookies from "js-cookie";
import { JwtPayload } from "jsonwebtoken";
import fetchToken from "@/utils/fecthToken";

interface IUserInfo {
  id: number
  name: string
  email: string
  password: string
  totalIncome: number
  totalOutcome: number
}

// Functional Component
export default function Card({type}: ICard) {
  const [userInfo, setUserInfo] = useState<IUserInfo>({id: 0, name: 'user', email: 'email', password: 'password', totalIncome: 0, totalOutcome: 0})

  useEffect(() => {
    const fetchData = async () => {
      try {
        const decodedToken = await fetchToken()
        const { id: decodedId } = decodedToken as JwtPayload
        let token = clientCookies.get("token")
        const response = await fetch(`http://localhost:3333/users/${decodedId}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
  
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
  
        const data = await response.json();
        setUserInfo(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
  
    fetchData();
  
    const interval = setInterval(fetchData, 1000);
  
    return () => clearInterval(interval); 
  }, [])


  // Rendering
  return (
    <div className="flex items-center gap-4 md:gap-6 rounded-[10px] w-full max-w-[20rem] bg-neutral-700 px-4 md:px-6 py-8 md:py-10 ">
    <Image
    className="w-[40px] md:w-[45px]"
      src={type === 'income' ? "/dashboard/income.svg" : "/dashboard/outcome.svg"}
      alt="Income icon"
      width={45}
      height={45}
    />
    <div>
      <h2 className="text-sm md:text-base text-neutral-400">Total {type === 'income' ? "income" : "outcome"}</h2>
      <p className="text-base md:text-xl font-semibold text-white">R$ {type === 'income' ? userInfo.totalIncome : userInfo.totalOutcome}</p>
    </div>
  </div>
  );
}