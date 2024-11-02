import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Mail, User, Phone, Eye, ArrowRight } from "lucide-react";

export default function SignUpPage() {
  return (
    <div className="flex flex-col items-center min-h-screen px-6 py-12 text-center">
      <div className="mb-6">
        <img src="your-logo-url.png" alt="Logo" className="h-12" />
      </div>

      <h1 className="text-2xl font-bold text-white mb-1">Create an Account</h1>
      <p className=" mb-6">
        Already a Member?{" "}
        <a href="#" className=" font-medium hover:underline">
          Log In
        </a>
      </p>

      <div className="w-full max-w-md space-y-4">
        <div className="relative">
          <Input
            placeholder="Johnson Doe"
            className="pl-10  text-white border-none"
          />
          <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-indigo-300" />
        </div>

        <div className="relative">
          <Input
            type="email"
            placeholder="johndoe@nomail.com"
            className="pl-10  text-white border-none"
          />
          <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-indigo-300" />
        </div>

        <div className="relative">
          <Input
            type="tel"
            placeholder="(123) 456-7890"
            className="pl-10  text-white border-none"
          />
          <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-indigo-300" />
        </div>

        <div className="relative">
          <Input
            type="password"
            placeholder="Password"
            className="pl-10  text-white border-none"
          />
          <Eye className="absolute right-3 top-1/2 transform -translate-y-1/2 text-indigo-300 cursor-pointer" />
        </div>

        <div className="flex items-start space-x-2 mt-4">
          <Checkbox id="terms" className="border-indigo-300 text-indigo-600" />
          <label
            htmlFor="terms"
            className="text-sm text-indigo-300 leading-tight"
          >
            I have read and agree to the{" "}
            <a href="#" className="text-indigo-500 font-medium underline">
              Terms & Conditions
            </a>{" "}
            of the Company
          </label>
        </div>
      </div>

      <div className="w-full max-w-md flex justify-end mt-6">
        <Button
          variant="ghost"
          className="w-12 h-12 bg-yellow-300 rounded-full text-indigo-900 hover:bg-yellow-400"
        >
          <ArrowRight className="w-6 h-6" />
        </Button>
      </div>
    </div>
  );
}
