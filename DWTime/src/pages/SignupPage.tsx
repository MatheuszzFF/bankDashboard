import { Input, Button, FormControl, FormLabel } from '@chakra-ui/react';
import { useContext, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AuthContext from '../contexts/Firebase/Auth';
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const schema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  name: z.string().min(1, { message: "Name is required" }),
  userName: z.string().min(1, { message: "Username is required" }),
  birth: z.string().min(1, { message: "Birthdate is required" }),
  password: z.string().min(6, { message: "Password must be at least 6 characters" }),
  address: z.string().min(1, { message: "Address is required" }),
  city: z.string().min(1, { message: "City is required" }),
  postalCode: z.string().min(1, { message: "Postal code is required" })
  .transform(val => parseInt(val, 10))
  .refine(val => !isNaN(val), { message: "Postal code must be a number" }),
  country: z.string().min(1, { message: "Country is required" }),
});

type FormData = z.infer<typeof schema>;

export const SignupPage = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const auth = useContext(AuthContext);
  const authState = auth.authState;
  const navigate = useNavigate();

  useEffect(() => {
    if (authState.loading) return; 
    if (authState.user) navigate("/");
    console.log(authState.user, "mudou o estado do usuario");
  }, [authState.user, authState.loading, navigate]);

  const onSubmit = (data: FormData) => {
    const settings = {
      email: data.email,
      name: data.name,
      userName: data.userName,
      birth: data.birth,
      address: data.address,
      city: data.city,
      postalCode: data.postalCode,
      country: data.country,
      theme: "light",
      notifications: false,
      locale: "pt-BR",
      language: "pt-br",
    }
    auth.signUp(data.email, data.password, settings);
  };

  return (
    <div className="flex flex-col gap-6 items-center justify-center h-screen w-screen bg-[#E2E8F0]"> 
      <div className="flex flex-col p-10 gap-2 rounded-lg bg-white">
        <h1 className="text-secondary text-[24px] mb-10">Create your account</h1>
        {auth && auth.authState.error && <p className="text-red-500 text-[14px]">{auth.authState.error}</p>}
        <FormControl as="form" onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-2">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <FormLabel className="text-gray-600 text-[12px]">Name:</FormLabel>
              <Input type="text" {...register("name")} placeholder="Your Name" className="p-3 w-full placeholder:text-secondary outline-none border-[1px] border-secondary rounded-lg" />
              {errors.name && <p className="text-red-500 text-[12px]">{errors.name.message}</p>}
            </div>
            <div>
              <FormLabel className="text-gray-600 text-[12px]">User Name:</FormLabel>
              <Input type="text" {...register("userName")} placeholder="User Name" className="p-3 w-full placeholder:text-secondary outline-none border-[1px] border-secondary rounded-lg" />
              {errors.userName && <p className="text-red-500 text-[12px]">{errors.userName.message}</p>}
            </div>
            <div>
              <FormLabel className="text-gray-600 text-[12px]">Email:</FormLabel>
              <Input type="email" {...register("email")} placeholder="Email" className="p-3 w-full placeholder:text-secondary outline-none border-[1px] border-secondary rounded-lg" />
              {errors.email && <p className="text-red-500 text-[12px]">{errors.email.message}</p>}
            </div>
            <div>
              <FormLabel className="text-gray-600 text-[12px]">Password:</FormLabel>
              <Input type="password" {...register("password")} placeholder="Password" className="p-3 w-full placeholder:text-secondary outline-none border-[1px] border-secondary rounded-lg" />
              {errors.password && <p className="text-red-500 text-[12px]">{errors.password.message}</p>}
            </div>
            <div>
              <FormLabel className="text-gray-600 text-[12px]">Date of Birth:</FormLabel>
              <Input type="date" {...register("birth")} placeholder="Date of Birth" className="p-3 w-full placeholder:text-secondary outline-none border-[1px] border-secondary rounded-lg" />
              {errors.birth && <p className="text-red-500 text-[12px]">{errors.birth.message}</p>}
            </div>
            <div>
              <FormLabel className="text-gray-600 text-[12px]">Address:</FormLabel>
              <Input type="text" {...register("address")} placeholder="Address" className="p-3 w-full placeholder:text-secondary outline-none border-[1px] border-secondary rounded-lg" />
              {errors.address && <p className="text-red-500 text-[12px]">{errors.address.message}</p>}
            </div>
            <div>
              <FormLabel className="text-gray-600 text-[12px]">City:</FormLabel>
              <Input type="text" {...register("city")} placeholder="City" className="p-3 w-full placeholder:text-secondary outline-none border-[1px] border-secondary rounded-lg" />
              {errors.city && <p className="text-red-500 text-[12px]">{errors.city.message}</p>}
            </div>
            <div>
              <FormLabel className="text-gray-600 text-[12px]">Postal Code:</FormLabel>
              <Input type="number" {...register("postalCode")} placeholder="Postal Code" className="p-3 w-full placeholder:text-secondary outline-none border-[1px] border-secondary rounded-lg" />
              {errors.postalCode && <p className="text-red-500 text-[12px]">{errors.postalCode.message}</p>}
            </div>
            <div>
              <FormLabel className="text-gray-600 text-[12px]">Country:</FormLabel>
              <Input type="text" {...register("country")} placeholder="Country" className="p-3 w-full placeholder:text-secondary outline-none border-[1px] border-secondary rounded-lg" />
              {errors.country && <p className="text-red-500 text-[12px]">{errors.country.message}</p>}
            </div>
          </div>
          <Button variant="primary" type='submit' className="w-full text-white bg-secondary rounded-lg p-3">Create my account!</Button>
        </FormControl>
      </div>

      <div className="text-center text-secondary text-[14px] mt-6">Already have an account? <Link to="/login" className="text-primary hover:opacity-60 transition-opacity">Login</Link></div>
    </div>
  );
};
