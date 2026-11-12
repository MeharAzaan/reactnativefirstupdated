import { supabase } from "@/lib/supabase/client";
import { createContext, ReactNode, useState } from "react";
export interface User{
    id : string , 
    name : string , 
    email : string , 
    username : string ,
     profileimage? : string,
     onboardingCompleted?:boolean
}
interface AuthContextType {
    user : User | null;
}
const AuthContext = createContext<AuthContextType  | undefined>(undefined);

export const AuthProvider = ({children} : {children:ReactNode})=>{
    const [user, setUser]= useState<User |null>(null);
    const Signin = async (email : string , password : string )=>{
   const {data,error}=   await supabase.auth.signUp({
        email , password
     })
     if (error) throw error;
     if(data.user){
        console.log(user);
     }
    }
     return <AuthContext.Provider value = {{user }}>{children}</AuthContext.Provider>;
}