import HeaderPage from "@/components/sub/headerpage";
import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const page = () => {
  return (
    <div>
      <HeaderPage title="Help" />
      <div className="flex items-center justify-center py-8">
        <Tabs defaultValue="account" className="w-full flex justify-center">
          <TabsList className="">
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
          <TabsContent value="Started" className="">
            <div className="flex w-full h-full items-start ">sadas</div>
          </TabsContent>
          <TabsContent value="password">Change your password here.</TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default page;
