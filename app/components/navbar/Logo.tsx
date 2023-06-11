'use client';

import Image from "next/image";
import { useRouter } from "next/navigation";

const Logo = ()=>{
    const router= useRouter();
    return ( 
        <Image alt="logo" className="hidden md:block cursor-pointer" width="100" height="100" src="/images/logo.png" onClick={() => router.push('/')}/>
    )
}
export default Logo