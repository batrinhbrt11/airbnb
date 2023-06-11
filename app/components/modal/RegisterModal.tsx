'use client'
import axios from "axios";
import { signIn } from "next-auth/react";
import { FcGoogle } from "react-icons/fc";
import { useCallback, useState } from "react";
import { toast } from "react-hot-toast";
import { 
  FieldValues, 
  SubmitHandler,
  useForm
} from "react-hook-form";

import useRegisterModal from "@/app/hooks/useRegisterModal";
import Modal from "./Modal";
import Heading from "../Heading";
import Input from "../inputs/Inputs";
import Button from "../Button";
import useLoginModal from "@/app/hooks/useLoginModal";
const RegisterModal = () =>{
    const registerModal = useRegisterModal();
    const loginModal = useLoginModal();

    const [isLoading, setIsLoading] = useState(false);
    const {
        register,
        handleSubmit,
        formState:{
            errors
        }
    } = useForm<FieldValues>({
        defaultValues:{
            name:'',
            email:'',
            password:''
        }
    })

    const onSubmit: SubmitHandler <FieldValues> = (data) =>{
        setIsLoading(true)
        axios.post('api/register',data)
            .then(()=>{
                toast.success('Register Successfully!')
                registerModal.onClose();
                loginModal.onOpen();
            })
            .catch((error)=>{
                toast.error('Something went wrong')
            })
            .finally(()=>{
                setIsLoading(false)
            })
    }

    const onToggle = useCallback(() => {
      registerModal.onClose();
      loginModal.onOpen();
    }, [registerModal, loginModal])

    const bodyContent = (
        <div className="flex flex-col gap-4">
        <Heading
          title="Welcome to Airbnb"
          subtitle="Create an account!"
        />
        <Input id="email" label="Email" disabled={isLoading} register={register} errors={errors} required/>
        <Input id="name" label="Name" disabled={isLoading} register={register} errors={errors} required/>
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
        <p>Already have an account?
          <span 
            onClick={onToggle}
            className="
              text-neutral-800
              cursor-pointer 
              hover:underline
            "
            > Log in</span>
        </p>
      </div>
    </div>
    )
    return (
        <Modal disable={isLoading} isOpen={registerModal.isOpen} title="Register" actionLabel="Continue" onClose={registerModal.onClose} onSubmit={handleSubmit(onSubmit)} body={bodyContent} footer={footerContent }/>
    )
}

export default RegisterModal