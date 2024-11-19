import HeaderPage from "@/components/sub/headerpage";
import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Link from "next/link";

const page = () => {
  return (
    <div className="">
      <HeaderPage title="Help" />
      <div className="">
        <Tabs defaultValue="account" className="">
        <div className="w-50 flex items-center justify-center py-8">
          <TabsList className="flex justify-center">
            <TabsTrigger value="Started" className="px-8">
              Getting Started
            </TabsTrigger>
            <TabsTrigger value="FAQ" className="px-16">
              FAQ
            </TabsTrigger>
            <TabsTrigger value="Contact" className="px-16">
              Contact
            </TabsTrigger>
          </TabsList>
        </div>
          <TabsContent value="Started" >
            <div className="w-1/2 mx-auto ">
              <h1 className="px-8 text-5xl font-bold flex justify-center">Getting Started </h1>
            <div className="px-24 py-5">
              <h2 className="text-2xl flex items-center justify-start font-bold">Create an Account</h2>
              <ol className="pl-10 list-disc py-2">
                <li>Go to create account page <Link href="#" className="text-purple-500 underline">here</Link></li>
                <li>Fill necessary details in the page</li>
                <li>Click create account button once finished</li>
                <li>Wait to be redirected to the login page</li>
              </ol>
            </div>
            <div className="px-24 py-5">
              <h2 className="text-2xl flex items-center justify-start font-bold">Log in to you account</h2>
              <ol className="pl-10 list-disc py-2">
                <li>Go to create account page <Link href="#" className="text-purple-500 underline">here</Link></li>
                <li>Fill necessary details in the page</li>
                <li>Click create account button once finished</li>
                <li>Wait to be redirected to the login page</li>
              </ol>
            </div>
            </div>
            
          </TabsContent>
          <TabsContent value="password">Change your password here.</TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default page;
