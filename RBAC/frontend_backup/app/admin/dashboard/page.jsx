'use client'
import withRole from "../../middleware/withRole"
import axiosInstance from "../../../lib/axios"
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import AdminNav from '../../components/adminNav'
const AdminDashboard = () => {

  
  return (
    <div>
<AdminNav />
    </div>
  )
}

export default withRole(AdminDashboard, ["admin"])
