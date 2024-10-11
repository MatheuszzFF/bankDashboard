import { Input, Button, FormControl } from '@chakra-ui/react'
import { useContext, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom'
import AuthContext from '../contexts/Firebase/Auth';
import { LoadingScreen } from '../components';
import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"

    const createUserFormSchema = z.object({
        email: z.string({
            required_error: "Email is required",
        })
        .email({message: "Please enter a valid email address" }),
        password: z.string({
            required_error: "Password is required",
        })
        .min(6, "Password must be at least 6 characters long")
    })

    type createUserFormData = z.infer<typeof createUserFormSchema>

export const LoginPage = () => {
    const { register, handleSubmit, formState: { errors } } = useForm<createUserFormData>({
        resolver: zodResolver(createUserFormSchema)
    })
    

      const onSubmit = (data: createUserFormData) => {
        auth.login(data.email, data.password);
      }
    const auth = useContext(AuthContext);
    const authState = auth.authState;
    const navigate = useNavigate();


    useEffect(() => {
        if (authState.loading) return; 
        if (authState.user) navigate("/");
        console.log(authState.user, "mudou o estado do usuario")
    }, [authState.user, authState.loading]);

    return (
        <>
           {authState.loading && <LoadingScreen/>}
           {!authState.loading && (
            <div className="flex flex-col gap-6 items-center justify-center h-screen w-screen bg-[#E2E8F0]"> 
                <div className="flex flex-col p-10 gap-2 rounded-lg bg-white">
                    <h1 className="text-secondary text-[24px] mb-10">Login so you can use our webapp!</h1>
                    {authState.error && <p className="text-red-500 text-[14px]">{authState.error}</p>}
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <FormControl  className='flex flex-col gap-2'>
                            {errors.email && <span>{errors.email.message}</span>}
                            <Input {...register("email")} placeholder="Email" className="p-3 w-full placeholder:text-secondary outline-none border-[1px] border-secondary rounded-lg" />
                            {errors.password && <span>{errors.password.message}</span>}
                            <Input {...register("password")}  placeholder="Password" className="p-3 w-full placeholder:text-secondary outline-none border-[1px] border-secondary rounded-lg" />
                            <Button type="submit" variant="primary" className="w-full text-white bg-secondary rounded-lg p-3">Login</Button>
                        </FormControl>
                    </form>
                </div>

                <div className="text-center text-secondary text-[14px] mt-6">Don't have an account? <Link to="/signUp" className="text-primary hover:opacity-60 transition-opacity">Sign up</Link></div>
            </div>
           )}
        </>
    )
}