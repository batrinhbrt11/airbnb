'use client'

import { signIn } from "next-auth/react";
import { FcGoogle } from "react-icons/fc";
import { useCallback, useState } from "react";
import { toast } from "react-hot-toast";
import { 
  FieldValues, 
  SubmitHandler,
  useForm
} from "react-hook-form";

import Modal from "./Modal";
import Heading from "../Heading";
import Input from "../inputs/Inputs";
import Button from "../Button";
import useLoginModal from "@/app/hooks/useLoginModal";
import { useRouter } from "next/navigation";
import useRegisterModal from "@/app/hooks/useRegisterModal";
const LoginModal = () =>{
    const loginModal = useLoginModal();
    const registerModal = useRegisterModal();

    const router = useRouter();

    const [isLoading, setIsLoading] = useState(false);
    const {
        register,
        handleSubmit,
        formState:{
            errors
        }
    } = useForm<FieldValues>({
        defaultValues:{
            email:'',
            password:''
        }
    })

    const onToggle = useCallback(() => {
      loginModal.onClose();
      registerModal.onOpen();
    }, [loginModal,registerModal])

    const onSubmit: SubmitHandler <FieldValues> = (data) =>{
        setIsLoading(true)
        signIn('credentials',{
            ...data,
            redirect:false
        })
        .then((callback) =>{
            setIsLoading(false);
            if(callback?.ok){
                toast.success('Logged in')
                router.refresh()
                loginModal.onClose();
            }
            if(callback?.error){
                toast.error(callback.error)
            }
        })
    }

    const bodyContent = (
        <div className="flex flex-col gap-4">
        <Heading
          title="Welcome back"
          subtitle="Login to your account!"
        />
        <Input id="email" label="Email" disabled={isLoading} register={register} errors={errors} required/>
        <Input id="password" label="Password" disabled={isLoading} register={register} errors={errors} required type="password"/>
      </div>
    )


    const footerContent = (
        <div className="flex flex-col gap-4 mt-3">
      <hr />
      <Button 
        outline 
        label="Continue with Google"
        icon={FcGoogle}
        onClick={() => signIn('google')} 
      />
      <div 
        className="
          text-neutral-500 
          text-center 
          mt-4 
          font-light
        "
      >
        <p>First time using Airbnb?
          <span 
          onClick={onToggle}
            className="
              text-neutral-800
              cursor-pointer 
              hover:underline
            "
            > Create an account</span>
        </p>
      </div>
    </div>
    )
    return (
        <Modal disable={isLoading} isOpen={loginModal.isOpen} title="Login" actionLabel="Login" onClose={loginModal.onClose} onSubmit={handleSubmit(onSubmit)} body={bodyContent} footer={footerContent }/>
    )
}

export default LoginModal