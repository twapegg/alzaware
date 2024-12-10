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
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

const page = () => {
  return (
    <div className="">
      <HeaderPage title="Help" />
      <div className="">
        <Tabs defaultValue="Started" className="">
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
                Getting Started
              </h1>
              <div className="px-24 py-5">
                <Accordion type="single" collapsible>
                  <AccordionItem value="item-1">
                    <AccordionTrigger className="text-xl font-bold">
                      Create an Account
                    </AccordionTrigger>
                    <AccordionContent>
                      <ol className="pl-10 list-disc py-2">
                        <li>
                          Go to the sign up page and create an account{" "}
                          <Link
                            href="/auth/sign-up"
                            className="text-purple-500 underline"
                          >
                            here
                          </Link>
                        </li>
                        <li>Fill necessary details in the page</li>
                        <li>Click create account button once finished</li>
                        <li>Wait to be redirected to the login page</li>
                      </ol>
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="item-2">
                    <AccordionTrigger className="text-xl font-bold">
                      Logging in to an account
                    </AccordionTrigger>
                    <AccordionContent>
                      <ol className="pl-10 list-disc py-2">
                        <li>
                          If you already have an existing account, head to the
                          log in page{" "}
                          <Link
                            href="/auth/login"
                            className="text-purple-500 underline"
                          >
                            here
                          </Link>
                        </li>
                        <li>Fill login details</li>
                        <li>Click the log in button once finished</li>
                        <li>Wait to be redirected to the Home Page</li>
                      </ol>
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="item-3">
                    <AccordionTrigger className="text-xl font-bold">
                      Adding a Patient
                    </AccordionTrigger>
                    <AccordionContent>
                      <ol className="pl-10 list-decimal py-2">
                        <li>
                          <span className="font-bold">
                            Input Patient's Personal Information:{" "}
                          </span>
                          Fill in the required personal details, including name,
                          age, gender, and contact information in the patient
                          registration form.
                        </li>
                        <li>
                          <span className="font-bold">
                            Provide Medical History:{" "}
                          </span>
                          Enter the patient's medical history, including any
                          relevant conditions, family medical background, or
                          previous diagnoses.
                        </li>
                        <li>
                          <span className="font-bold">Upload MRI Scan: </span>
                          Upload the patient's MRI scan in the designated
                          section. Ensure the file is in the required format
                          (e.g., JPG, PNG, or DICOM).
                        </li>
                        <li>
                          <span className="font-bold">
                            Get Prediction Results and Confirm:{" "}
                          </span>
                          Review the prediction results generated by the AI. If
                          everything is correct, confirm the addition of the
                          patient's data to complete the process.
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
                    <AccordionTrigger className="text-xl font-bold">
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

                  <AccordionItem value="item-2">
                    <AccordionTrigger className="text-xl font-bold">
                      Is AlzAware free to use?
                    </AccordionTrigger>
                    <AccordionContent>
                      <p className="indent-5 text-justify">
                        Yes, AlzAware is a web-based application that is free to
                        use for all users in the medical field.
                      </p>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="item-3">
                    <AccordionTrigger className="text-xl font-bold">
                      Who can use AlzAware?
                    </AccordionTrigger>
                    <AccordionContent>
                      <p className="indent-5 text-justify">
                        AlzAware is designed for use by neurologists and
                        radiologists in the medical field.
                      </p>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="item-4">
                    <AccordionTrigger className="text-xl font-bold">
                      Can I upload medical records to Alzaware?
                    </AccordionTrigger>
                    <AccordionContent>
                      <p className="indent-5 text-justify">
                        Medical Records are stored during the patient
                        registration process of the application.
                      </p>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="item-5">
                    <AccordionTrigger className="text-xl font-bold">
                      Is the medical data secure?
                    </AccordionTrigger>
                    <AccordionContent>
                      <p className="indent-5 text-justify">
                        Yes, the medical data is stored securely and is only
                        accessible to authorized users.
                      </p>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="item-6">
                    <AccordionTrigger className="text-xl font-bold">
                      The web app isn&apos;t working properly. What should I do?
                    </AccordionTrigger>
                    <AccordionContent>
                      <div className="flex flex-col gap-2">
                        <p className="indent-5 text-justify">
                          Try the following:
                        </p>

                        <ol className="list-decimal list-inside indent-10">
                          <li>Try to refresh the webpage.</li>
                          <li>
                            Make sure you are connected to a stable internet.
                          </li>
                          <li>
                            Contact support at with the contact information
                            provided in the contact section.
                          </li>
                        </ol>
                      </div>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="item-7">
                    <AccordionTrigger className="text-xl font-bold">
                      Can I use the app on multiple devices?
                    </AccordionTrigger>
                    <AccordionContent>
                      <p className="indent-5 text-justify">
                        Currently, the application is only available for use on
                        desktop devices.
                      </p>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </div>
            </div>
          </TabsContent>
          <TabsContent value="Contact">
            <div className="w-1/2 mx-auto ">
              <h1 className="px-8 text-5xl font-bold flex justify-center"></h1>
            </div>
            <div>
              <Card className="w-1/2 mx-auto">
                <CardHeader>
                  <CardTitle className="text-xl">
                    For any inquiries, feel free to reach out via:
                  </CardTitle>
                  <Separator />
                </CardHeader>
                <CardContent className="flex flex-col gap-4">
                  <span>
                    Email Address:{" "}
                    <Link
                      href="mailto:johnbnacaytuna@su.edu.ph"
                      className="text-brand font-bold underline"
                    >
                      johnbnacaytuna@su.edu.ph
                    </Link>
                  </span>
                  <span>
                    Phone Number:{" "}
                    <Link
                      href="tel:09461617887"
                      className="text-brand font-bold underline"
                    >
                      09461617887
                    </Link>
                  </span>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default page;
