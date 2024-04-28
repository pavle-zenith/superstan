/* eslint-disable no-unused-vars */
import { useState } from "react";

import Footer from "./Footer.jsx";
import { MdOutlineAlternateEmail } from "react-icons/md";
import { FaLocationArrow } from "react-icons/fa";
import { FaShareAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
export default function Kontakt() {
  const [subject, setSubject] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  return (
    <div>
      <div className="container my-24 mx-auto md:px-6">
        {/* Section: Design Block */}
        <section className="mb-32">
          <div className="relative h-[300px] rounded-xl overflow-hidden bg-cover bg-[80%] bg-no-repeat bg-[url('https://i.imgur.com/8qSiXi5.jpeg')]" />
          <div className="container px-6 md:px-12">
            <div className="block rounded-lg bg-superstan px-6 py-12 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] md:py-16 md:px-12 -mt-[100px] backdrop-blur-[30px]">
              <div className="flex flex-wrap">
                <div className="mb-12 w-full shrink-0 grow-0 basis-auto md:px-3 lg:mb-0 lg:w-5/12 lg:px-6">
                  <form>
                    <div className="relative mb-6">
                      <label
                        htmlFor="exampleInput90"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                      >
                        Naslov poruke
                      </label>
                      <input
                        type="text"
                        className="peer block min-h-[auto] w-full rounded border-0 border-b border-white bg-transparent py-[0.32rem] px-3 leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 peer-focus:text-primary data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-neutral-200 dark:placeholder:text-neutral-200 dark:peer-focus:text-primary [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0"
                        id="exampleInput90"
                        placeholder="Subject"
                        onChange={(e) => setSubject(e.target.value)}
                        defaultValue={subject}
                      />
                    </div>

                    <div className="relative mb-6">
                      <label
                        htmlFor="exampleInput91"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                      >
                        Vaš E-mail
                      </label>
                      <input
                        type="email"
                        className="peer block min-h-[auto] w-full rounded border-0 border-b border-white bg-transparent py-[0.32rem] px-3 leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 peer-focus:text-primary data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-neutral-200 dark:placeholder:text-neutral-200 dark:peer-focus:text-primary [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0"
                        id="exampleInput91"
                        placeholder="Email adresa"
                        onChange={(e) => setEmail(e.target.value)}
                        defaultValue={email}
                      />
                    </div>

                    <div className="relative mb-6">
                      <label
                        htmlFor="exampleFormControlTextarea1"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                      >
                        Poruka
                      </label>
                      <textarea
                        className="peer block min-h-[auto] w-full rounded border-0 border-b border-white bg-transparent py-[0.32rem] px-3 leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-neutral-200 dark:placeholder:text-neutral-200 [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0"
                        id="exampleFormControlTextarea1"
                        rows={3}
                        placeholder="Vaša poruka"
                        onChange={(e) => setMessage(e.target.value)}
                        defaultValue={""}
                      />
                    </div>

                    <button
                      type="button"
                      className="mb-6 inline-block bg-white text-red-600 w-full rounded bg-primary px-6 pt-2.5 pb-2 text-xs font-bold font-medium uppercase leading-normal text-red shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18ax_0_rgba(59,113,202,0.1)] lg:mb-0"
                      onClick={() => {
                        window.open(
                          `mailto:pavlem2004@gmail.com?subject=${subject}&body=${message}`
                        );
                      }}
                    >
                      Pošalji
                    </button>
                  </form>
                </div>
                <div className="w-full shrink-0 grow-0 basis-auto lg:w-7/12">
                  <div className="flex flex-wrap">
                    <div className="mb-12 w-full shrink-0 grow-0 basis-auto md:w-6/12 md:px-3 lg:w-full lg:px-6 xl:w-6/12">
                      <div className="flex items-start">
                        <div className="shrink-0">
                          <div className="inline-block rounded-md bg-primary-100 p-4 text-primary">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              strokeWidth={2}
                              stroke="white"
                              className="h-6 w-6"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M14.25 9.75v-4.5m0 4.5h4.5m-4.5 0l6-6m-3 18c-8.284 0-15-6.716-15-15V4.5A2.25 2.25 0 014.5 2.25h1.372c.516 0 .966.351 1.091.852l1.106 4.423c.11.44-.054.902-.417 1.173l-1.293.97a1.062 1.062 0 00-.38 1.21 12.035 12.035 0 007.143 7.143c.441.162.928-.004 1.21-.38l.97-1.293a1.125 1.125 0 011.173-.417l4.423 1.106c.5.125.852.575.852 1.091V19.5a2.25 2.25 0 01-2.25 2.25h-2.25z"
                              />
                            </svg>
                          </div>
                        </div>
                        <div className="ml-6 grow">
                          <p className="mb-2 font-bold dark:text-white">
                            Broj Telefona
                          </p>
                          <p className="text-neutral-500 dark:text-neutral-200">
                            063 413 113
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="mb-12 w-full shrink-0 grow-0 basis-auto md:w-6/12 md:px-3 lg:w-full lg:px-6 xl:w-6/12">
                      <div className="flex items-start">
                        <div className="shrink-0">
                          <div className="inline-block rounded-md bg-primary-100 p-4 text-primary">
                            <MdOutlineAlternateEmail className="text-lg text-white" />
                          </div>
                        </div>
                        <div className="ml-6 grow">
                          <p className="mb-2 font-bold dark:text-white">
                            E-Mail Adresa
                          </p>
                          <p className="text-neutral-500 dark:text-neutral-200">
                            office@superstanbg.rs
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="mb-12 w-full shrink-0 grow-0 basis-auto md:mb-0 md:w-6/12 md:px-3 lg:mb-12 lg:w-full lg:px-6 xl:w-6/12">
                      <div className="align-start flex">
                        <div className="shrink-0">
                          <div className="inline-block rounded-md bg-primary-100 p-4 text-primary">
                            <FaLocationArrow className="text-lg text-white"></FaLocationArrow>
                          </div>
                        </div>
                        <div className="ml-6 grow">
                          <p className="mb-2 font-bold dark:text-white">
                            Adresa
                          </p>
                          <p className="text-neutral-500 dark:text-neutral-200">
                            Španskih boraca 24v lokal, Novi Beograd
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="w-full shrink-0 grow-0 basis-auto md:w-6/12 md:px-3 lg:w-full lg:px-6 xl:mb-12 xl:w-6/12">
                      <div className="align-start flex">
                        <div className="shrink-0">
                          <div className="inline-block rounded-md bg-primary-100 p-4 text-primary">
                            <FaShareAlt className="text-lg scale-105 text-white" />
                          </div>
                        </div>
                        <div className="ml-6 grow">
                          <p className="mb-2 font-bold dark:text-white">
                            Društvene Mreže
                          </p>
                          <a
                            href="https://www.instagram.com/superstannekretnine/"
                            className="text-neutral-500 dark:text-neutral-200"
                          >
                            Instagram
                          </a>{" "}
                          <br></br>
                          <a
                            href="https://www.facebook.com/superstannekretnine"
                            className="text-neutral-500 dark:text-neutral-200"
                          >
                            Faceboook
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section: Design Block */}
      </div>
      <Footer></Footer>
    </div>
  );
}
