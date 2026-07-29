'use client'

import {useGetMeQuery} from "@/api/usersApi";

export default function AuthBootstrap() {
    useGetMeQuery()
    return null
}