'use client'
import UserDashboard from "./dashboard/UserDashboard";
import ManagerDashboard from "./dashboard/managerDashboard";
import AdminProfile from "./admin/page";
import { useUser } from '../context/UserContext';
import { useEffect } from "react";
import {  Loader} from 'lucide-react';

export default function HomePage() {
  const { user,loading, checkAuth, checkingAuth } = useUser();

  useEffect(() => {
    checkAuth();
  }, []);
  if (checkingAuth) return <p> <Loader /> loading</p>;
  if (!user) return <p>Please log in.</p>; 

  return (
      <div>
          {user.role === "admin" ? <AdminProfile /> :
          user.role === "manager" ? <ManagerDashboard /> :
          <UserDashboard />}
      </div>
  );
}

