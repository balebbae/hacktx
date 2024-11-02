import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Mail, User, Phone, Eye, ArrowRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import Swim from "@/assets/swim.gif";

export default function SignUpPage() {
  return (
    <form id="signup">
      <div className="flex flex-col items-center min-h-screen px-6 py-12 text-center">
        <div className="mb-6">
          <Image src={Swim} alt="swim" width={220} height={220} />
        </div>

        <h1 className="text-2xl font-bold  mb-1">Create an Account</h1>
        <p className=" mb-6">
          Already a Member?{" "}
          <a href="/login" className=" font-medium hover:underline">
            Log In
          </a>
        </p>
        <div className="w-full max-w-md space-y-4">
          <div className="relative text-black">
            <Input placeholder="Caleb Bae" className="pl-10 border-none " />
            <User className="absolute left-1 top-1/2 transform -translate-y-1/2 size-5" />
          </div>

          <div className="relative">
            <Input
              type="email"
              placeholder="johndoe@nomail.com"
              className="pl-10   border-none"
            />
            <Mail className="absolute left-1 top-1/2 transform -translate-y-1/2 size-5" />
          </div>

          <div className="relative">
            <Input
              type="tel"
              placeholder="123 456 7890"
              className="pl-10   border-none"
            />
            <Phone className="absolute left-1 top-1/2 transform -translate-y-1/2 size-5" />
          </div>

          <div className="relative">
            <Input
              type="password"
              placeholder="Password"
              className="pl-10   border-none"
            />
            <Eye className="absolute left-1 top-1/2 transform -translate-y-1/2  cursor-pointer size-5" />
          </div>
        </div>

        <div className="w-full max-w-md flex justify-end mt-6">
          <Button
            variant="ghost"
            className="w-12 h-12 bg-black rounded-full text-white "
          >
            <Link href="/camera">
              <ArrowRight className="w-6 h-6" />
            </Link>
          </Button>
        </div>
      </div>
    </form>
  );
}
