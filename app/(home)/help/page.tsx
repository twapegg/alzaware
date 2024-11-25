import HeaderPage from "@/components/sub/headerpage";
import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Link from "next/link";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

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
          <TabsContent value="Started">
            <div className="w-1/2 mx-auto ">
              <h1 className="px-8 text-5xl font-bold flex justify-center">
                Getting Started{" "}
              </h1>
              <div className="px-24 py-5">
                <Accordion type="single" collapsible>
                  <AccordionItem value="item-1">
                    <AccordionTrigger className="text-2xl flex items-center justify-start font-bold">
                      Create Your Account
                    </AccordionTrigger>
                    <AccordionContent>
                      <ol className="pl-10 list-disc py-2">
                        <li>
                          Go to create account page{" "}
                          <Link href="#" className="text-purple-500 underline">
                            here
                          </Link>
                        </li>
                        <li>Fill necessary details in the page</li>
                        <li>Click create account button once finished</li>
                        <li>Wait to be redirected to the login page</li>
                      </ol>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
                <Accordion type="single" collapsible>
                  <AccordionItem value="item-1">
                    <AccordionTrigger className="text-2xl flex items-center justify-start font-bold">
                      Login To Your Account
                    </AccordionTrigger>
                    <AccordionContent>
                      <ol className="pl-10 list-disc py-2">
                        <li>
                          If account already exist head to log in page{" "}
                          <Link href="#" className="text-purple-500 underline">
                            here
                          </Link>
                        </li>
                        <li>Fill login details</li>
                        <li>Click the log in button once finished</li>
                        <li>Wait to be redirected to the Home Page</li>
                      </ol>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
                <Accordion type="single" collapsible>
                  <AccordionItem value="item-1">
                    <AccordionTrigger className="text-2xl flex items-center justify-start font-bold">
                      Customize Your Profile
                    </AccordionTrigger>
                    <AccordionContent>
                      <ol className="pl-10 list-disc py-2">
                        <li>Go your profile settings</li>
                        <li>
                          Customize your preferences such as profile, pronoun,
                          etc.
                        </li>
                        <li>Save your preferences </li>
                      </ol>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
                <Accordion type="single" collapsible>
                  <AccordionItem value="item-1">
                    <AccordionTrigger className="text-2xl flex items-center justify-start font-bold">
                      For Additional Help
                    </AccordionTrigger>
                    <AccordionContent>
                      <ol className="pl-10 list-disc py-2">
                        <li>
                          Head to the FAQ or Contact Section of the Help Page
                        </li>
                        <li>Check out the FAQ section for common Questions</li>
                        <li>
                          Contact our support team with the details provided in
                          the contact section
                        </li>
                      </ol>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </div>
            </div>
          </TabsContent>
          <TabsContent value="FAQ">
            <div className="w-1/2 mx-auto ">
              <h1 className="px-8 text-5xl font-bold flex justify-center">
                Frequently Asked Questions{" "}
              </h1>
              <div className="px-24 py-5">
                <Accordion type="single" collapsible>
                  <AccordionItem value="item-1">
                    <AccordionTrigger className="text-2xl flex items-center justify-start font-bold">
                      What is AlzAware?
                    </AccordionTrigger>
                    <AccordionContent>
                      <p className="indent-5 text-justify">
                        AlzAware aims to develop a web-based application that
                        leverages machine learning to diagnose and classify
                        Alzheimer&apos;s disease from MRI scans. By using a
                        machine learning model, the application seeks to
                        streamline the diagnostic and classification process,
                        allowing neurologists and radiologists to focus on
                        patient care while relying on AI to enhance their
                        productivity.
                      </p>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
                <Accordion type="single" collapsible>
                  <AccordionItem value="item-1">
                    <AccordionTrigger className="text-2xl flex items-center justify-start font-bold">
                      Is AlzAware free to use?
                    </AccordionTrigger>
                    <AccordionContent>
                      <p className="indent-5 text-justify">
                        Yes, AlzAware is a web-based application that is free to
                        use for all users in the medical field.
                      </p>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
                <Accordion type="single" collapsible>
                  <AccordionItem value="item-1">
                    <AccordionTrigger className="text-2xl flex items-center justify-start font-bold">
                      Who can use AlzAware?
                    </AccordionTrigger>
                    <AccordionContent>
                      <p className="indent-5 text-justify">
                        AlzAware is designed for use by neurologists and
                        radiologists in the medical field.
                      </p>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
                <Accordion type="single" collapsible>
                  <AccordionItem value="item-1">
                    <AccordionTrigger className="text-2xl flex items-center justify-start font-bold">
                      Can I update my profile information?
                    </AccordionTrigger>
                    <AccordionContent>
                      <p className="indent-5 text-justify">
                        Yes, you can update your profile information by going to
                        your profile settings and updating your preferences.
                      </p>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
                <Accordion type="single" collapsible>
                  <AccordionItem value="item-1">
                    <AccordionTrigger className="text-2xl flex items-center justify-start font-bold">
                      Can I upload medical records to Alzaware?
                    </AccordionTrigger>
                    <AccordionContent>
                      <p className="indent-5 text-justify">
                        Medical Records are stored during the patient registration process of the application.
                      </p>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
                <Accordion type="single" collapsible>
                  <AccordionItem value="item-1">
                    <AccordionTrigger className="text-2xl flex items-center justify-start font-bold">
                      Is the medical data secure?
                    </AccordionTrigger>
                    <AccordionContent>
                      <p className="indent-5 text-justify">
                        Yes, the medical data is stored securely and is only accessible to authorized users.
                      </p>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
                <Accordion type="single" collapsible>
                  <AccordionItem value="item-1">
                    <AccordionTrigger className="text-2xl flex items-center justify-start font-bold">
                    The web app isn&apos;t working properly. What should I do?
                    </AccordionTrigger>
                    <AccordionContent>
                      <p className="indent-5 text-justify">
                        Try the following:
                        <ol className="list-decimal list-inside">
                          <li>Try to refresh the webpage.</li>
                          <li>Make sure you are connected to a stable internet.</li>
                          <li>Contact support at with the contact information provided in the contact section.</li>
                        </ol>
                      </p>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
                <Accordion type="single" collapsible>
                  <AccordionItem value="item-1">
                    <AccordionTrigger className="text-2xl flex items-center justify-start font-bold">
                    Can I use the app on multiple devices?
                    </AccordionTrigger>
                    <AccordionContent>
                      <p className="indent-5 text-justify">
                      Yes, log in with your account credentials on any supported device.
                      </p>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
                <Accordion type="single" collapsible>
                  <AccordionItem value="item-1">
                    <AccordionTrigger className="text-2xl flex items-center justify-start font-bold">
                    Can I remove patient data?
                    </AccordionTrigger>
                    <AccordionContent>
                      <p className="indent-5 text-justify">
                      No, patient data cannot be removed from the application since it is sensitive information.
                      </p>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </div>
            </div>
          </TabsContent>
          <TabsContent value="Contact" >
            <div className = "w-1/2 mx-auto " >
              <h1 className="px-8 text-5xl font-bold flex justify-center">
                Contact Information{" "}
              </h1>
            </div>
            <div className = " grid grid-cols-3 px-8  py-5">
                <div>
                  <div className="flex justify-center font-bold text-lg">
                    <h3>Contact Number</h3>
                  </div>
                  <div className="flex items-center pl-20 py-5">
                    <p> Number no.1: 09995843332
                      <br></br>
                      Number no.2: 09995843332
                      <br></br>
                      Number no.2: 09995843332   
                    </p>
                  </div>

                </div>
                <div >
                  <h3 >Email Address</h3>
                </div>
                <div className="flex justify-center font-bold text-lg">
                  <h3>Facebook</h3>
                </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default page;
