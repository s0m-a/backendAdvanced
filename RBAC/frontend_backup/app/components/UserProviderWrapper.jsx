"use client";
//UserProviderWrapper
import { usePathname } from "next/navigation";
import { UserProvider } from "../../context/UserContext";
import Navbar from "../components/navbar";


export default function UserProviderWrapper({ children }) {
    const pathname = usePathname();
    const isAuthPage = pathname === "/auth/login" || pathname === "/auth/register";


    return (
        <UserProvider>
            {!isAuthPage && <Navbar />} 
            {children}
        </UserProvider>
    );
}
