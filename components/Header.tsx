"use client";
import Image from "next/image";
import logo from "@/public/visitLagosLogo.svg";
import hotel from "@/public/hotel1.jpg";
import { ArrowLeft, ArrowRight, Menu, X } from "lucide-react";

import * as React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
// import { NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, NavigationMenuTrigger } from "@radix-ui/react-navigation-menu";
import { Button } from "@radix-ui/themes";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "./ui/navigation-menu";

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const [subMenuOpen, setSubMenuOpen] = React.useState<string | null>(null);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    setSubMenuOpen(null);
  };

  const handleBack = () => {
    setSubMenuOpen(null);
  };

  const openSubMenu = (menu: string) => {
    setSubMenuOpen(menu);
  };

  React.useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setIsMenuOpen(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <>
      <nav className="lg:w-full  fixed top-0 left-0 lg:right-0  z-[10000000] bg-background/80 ">
        <div className="flex max-w-7xl  relative py-4 mx-auto items-center justify-between px-8">
          <Link href="/" className="flex items-center  z-[10000]">
            <Image src={logo} alt="Company Logo" width={48} height={48} />
          </Link>

          <NavigationMenu className="hidden lg:block ">
            <NavigationMenuList>
              <NavigationMenuItem className="flex ">
                <NavigationMenuTrigger>
                  <Link href="/things-to-do">Things To Do</Link>
                </NavigationMenuTrigger>
                <NavigationMenuContent className="flex px-8 w-full justify-between h-[400px]">
                  <div className="flex flex-col gap-1 p- text-4xl font-bold w-full ">
                    <Link
                      href="/things-to-do/tours"
                      className="text-green-600 hover:text-green-400 w-full"
                    >
                      Tourism
                    </Link>

                    <Link href="#" className="text-sky-600 hover:text-sky-400 ">
                      Sightseeing
                    </Link>

                    <Link
                      href="/things-to-do/events"
                      className="text-orange-600 hover:text-orange-400 "
                    >
                      Events
                    </Link>

                    <Link
                      href="/things-to-do/food-drinks"
                      className="text-pink-600 hover:text-pink-400 "
                    >
                      Food & Drinks
                    </Link>

                    <Link
                      href="/things-to-do/shopping"
                      className="text-teal-600 hover:text-teal-400 "
                    >
                      Shopping
                    </Link>

                    <Link
                      href="/things-to-do/nightlife"
                      className="text-indigo-600 hover:text-indigo-400 "
                    >
                      Nightlife
                    </Link>

                    <Link
                      href="#"
                      className="text-indigo-600 hover:text-indigo-400"
                    >
                      Recreation
                    </Link>

                    <Link
                      href="/things-to-do/culture"
                      className="text-amber-600 hover:text-amber-400"
                    >
                      Culture
                    </Link>
                  </div>
                  {/* Image and Description */}
                  <div className="mt-4 lg:mt-0 lg:ml-8 flex flex-col items-center">
                    <Image
                      src={hotel}
                      alt="Hotel Image"
                      className="w-[800px]"
                    />
                    <p className="mt-2 text-sm text-neutral-500 text-center">
                      Beautifully designed hotels in Akure for your delight.
                    </p>
                  </div>
                </NavigationMenuContent>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuTrigger>
                  {" "}
                  <Link href="/where-to-stay">Where To Stay</Link>
                </NavigationMenuTrigger>
                <NavigationMenuContent className="flex px-8 w-full justify-between">
                  <div className="flex flex-col gap-1 text-4xl font-bold w-full text-foreground">
                    <Link
                      href="/where-to-stay/hotels"
                      className="hover:text-accent  transition"
                    >
                      Hotel
                    </Link>

                    <Link
                      href="/where-to-stay/motels"
                      className="hover:text-accent transition"
                    >
                      Motel
                    </Link>

                    <Link
                      href="/where-to-stay/apartments"
                      className="hover:text-accent transition"
                    >
                      Apartment
                    </Link>

                    <Link
                      href="/where-to-stay/hostel"
                      className="hover:text-accent transition"
                    >
                      Hostel
                    </Link>
                  </div>
                  {/* Image and Description */}
                  <div className="mt-4 lg:mt-0 lg:ml-8 flex flex-col items-center">
                    <Image
                      src={hotel}
                      alt="Hotel Image"
                      className="w-[800px]"
                    />
                    <p className="mt-2 text-sm text-neutral-500 text-center">
                      Beautifully designed hotels in Akure for your delight.
                    </p>
                  </div>
                </NavigationMenuContent>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuTrigger>#</NavigationMenuTrigger>
                <NavigationMenuContent className="flex px-8 w-full justify-between ">
                  <div className="flex flex-col w-full ">
                    {" "}
                    <span className="font-semibold text-xl mb-4">
                      Follow us{" "}
                    </span>
                    <div className="flex flex-col gap-4 text-neutral-600 text-4xl font-bold w-full ">
                      <Link
                        href="https://instagram.com"
                        passHref
                        className="hover:text-accent transition flex flex-col"
                      >
                        Instagram
                        <span className="text-base ">11k</span>
                      </Link>

                      <Link
                        href="https://facebook.com"
                        passHref
                        className="hover:text-accent transition flex flex-col"
                      >
                        Facebook
                        <span className="text-base ">232k</span>
                      </Link>

                      <Link
                        href="https://twitter.com"
                        passHref
                        className="hover:text-accent transition flex flex-col"
                      >
                        Twitter
                        <span className="text-base ">9k</span>
                      </Link>

                      <Link
                        href="/#"
                        passHref
                        className="hover:text-accent transition flex flex-col"
                      >
                        #VisitOndoState
                        <span className="text-base ">
                          and share the best moments
                        </span>
                      </Link>
                    </div>
                  </div>
                </NavigationMenuContent>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </div>
      </nav>

      {/* Hamburger Menu Icon for Mobile */}
      <div className="lg:hidden bg-primary-foreground flex w-full justify-end">
        <Button
          onClick={toggleMenu}
          className="w-fit z-[30] bg-transparent text-primary hover:bg-transparent hover:text-"
        >
          {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </Button>
      </div>
      {/* Mobile Navigation Menu */}
      {isMenuOpen && (
        <nav className="lg:hidden bg-primary-foreground/75 absolute inset-0 top-16 h-screen">
          <div className="  flex h-screen fixed inset-0 justify-end z-20 bg-neutral-900/50">
            <div className=" flex flex-col space-y-4 p-6 items-end pt-24 bg-primary-foreground shadow-md w-1/2 h-full">
              {subMenuOpen === null ? (
                <>
                  <ul className="w-full flex flex-col gap-3">
                    <li
                      className="text-2xl font-semibold  transition flex items-center justify-between"
                      onClick={() => openSubMenu("thingsToDo")}
                    >
                      Things To Do
                      <ArrowRight />
                    </li>

                    <li
                      className="text-2xl font-semibold  transition flex items-center justify-between"
                      onClick={() => openSubMenu("destinations")}
                    >
                      Destinations
                      <ArrowRight />
                    </li>

                    <li
                      className="text-2xl font-semibold  transition flex items-center justify-between"
                      onClick={() => openSubMenu("whereToStay")}
                    >
                      Where To Stay
                      <ArrowRight />
                    </li>

                    <li
                      className="text-2xl font-semibold  transition flex items-center justify-between"
                      onClick={() => openSubMenu("followUs")}
                    >
                      Follow Us
                      <ArrowRight />
                    </li>
                  </ul>
                </>
              ) : (
                <div className=" w-full flex gap-8">
                  <button
                    onClick={handleBack}
                    className="mb-4 flex items-center"
                  >
                    <ArrowLeft className="mr-2" />
                  </button>
                  {subMenuOpen === "thingsToDo" && (
                    <>
                      <div className="flex flex-col">
                        <p className="text-lg py-3 font-semibold text-neutral-500">
                          Things to Do
                        </p>
                        <ul className="flex flex-col gap-1 text-2xl font-semibold border-y py-3 ">
                          <li>
                            <Link
                              href="/things-to-do/tours"
                              className="text-green-600 hover:text-green-400 transition"
                            >
                              Tourism
                            </Link>
                          </li>
                          <li>
                            <Link
                              href="/things-to-do/sightseeing"
                              className="text-sky-600 hover:text-sky-400 transition"
                            >
                              Sightseeing
                            </Link>
                          </li>
                          <li>
                            <Link
                              href="/things-to-do/events"
                              className="text-orange-600 hover:text-orange-400 transition"
                            >
                              Events
                            </Link>
                          </li>
                          <li>
                            <Link
                              href="/things-to-do/food-drinks"
                              className="text-pink-600 hover:text-pink-400 transition"
                            >
                              Food & Drinks
                            </Link>
                          </li>
                          <li>
                            <Link
                              href="/things-to-do/shopping"
                              className="text-teal-600 hover:text-teal-400 transition"
                            >
                              Shopping
                            </Link>
                          </li>
                          <li>
                            <Link
                              href="/things-to-do/nightlife"
                              className="text-indigo-600 hover:text-indigo-400 transition"
                            >
                              Nightlife
                            </Link>
                          </li>
                          <li>
                            <Link
                              href="/things-to-do/recreation"
                              className="text-indigo-600 hover:text-indigo-400 transition"
                            >
                              Recreation
                            </Link>
                          </li>
                          <li>
                            <Link
                              href="/things-to-do/culture"
                              className="text-amber-600 hover:text-amber-400 transition"
                            >
                              Culture
                            </Link>
                          </li>
                        </ul>
                      </div>
                    </>
                  )}
                  {subMenuOpen === "destinations" && (
                    <div className="flex flex-col">
                      <p className="text-lg py-3 font-semibold text-neutral-500">
                        Destinations
                      </p>
                      <ul className="flex flex-col gap-1 text-2xl font-semibold border-y py-3">
                        <li>
                          <Link
                            href="/destinations/hotel"
                            className="hover:text-accent transition"
                            onClick={toggleMenu}
                          >
                            Hotel
                          </Link>
                        </li>
                        <li>
                          <Link
                            href="/destinations/motel"
                            className="hover:text-accent transition"
                            onClick={toggleMenu}
                          >
                            Motel
                          </Link>
                        </li>
                        <li>
                          <Link
                            href="/destinations/apartment"
                            className="hover:text-accent transition"
                            onClick={toggleMenu}
                          >
                            Apartment
                          </Link>
                        </li>
                        <li>
                          <Link
                            href="/destinations/hostel"
                            className="hover:text-accent transition"
                            onClick={toggleMenu}
                          >
                            Hostel
                          </Link>
                        </li>
                      </ul>
                    </div>
                  )}

                  {subMenuOpen === "whereToStay" && (
                    <div className="flex flex-col">
                      <p className="text-lg py-3 font-semibold text-neutral-500">
                        Where to Stay
                      </p>
                      <ul className="flex flex-col gap-1 text-2xl font-semibold border-y py-3">
                        <li>
                          <Link
                            href="/where-to-stay/hotels"
                            className="hover:text-accent transition"
                            onClick={toggleMenu}
                          >
                            Hotel
                          </Link>
                        </li>
                        <li>
                          <Link
                            href="/where-to-stay/motels"
                            className="hover:text-accent transition"
                            onClick={toggleMenu}
                          >
                            Motel
                          </Link>
                        </li>
                        <li>
                          <Link
                            href="/where-to-stay/apartments"
                            className="hover:text-accent transition"
                            onClick={toggleMenu}
                          >
                            Apartment
                          </Link>
                        </li>
                        <li>
                          <Link
                            href="/where-to-stay/hostel"
                            className="hover:text-accent transition"
                            onClick={toggleMenu}
                          >
                            Hostel
                          </Link>
                        </li>
                      </ul>
                    </div>
                  )}

                  {subMenuOpen === "followUs" && (
                    <div className="flex flex-col">
                      <p className="text-lg py-3 font-semibold text-neutral-500">
                        #
                      </p>
                      <ul className="flex flex-col gap-2 text-2xl font-semibold border-y py-6">
                        <p className="text-lg">Follow us</p>
                        <li>
                          <Link
                            href="https://instagram.com"
                            className="hover:text-accent transition flex flex-col text-3xl font-bold"
                            onClick={toggleMenu}
                          >
                            Instagram{" "}
                            <span className="text-sm text-neutral-500">
                              11k
                            </span>
                          </Link>
                        </li>
                        <li>
                          <Link
                            href="https://facebook.com"
                            className="hover:text-accent transition flex flex-col text-3xl font-bold"
                            onClick={toggleMenu}
                          >
                            Facebook{" "}
                            <span className="text-sm text-neutral-500">
                              232k
                            </span>
                          </Link>
                        </li>
                        <li>
                          <Link
                            href="https://twitter.com"
                            className="hover:text-accent transition flex flex-col text-3xl font-bold"
                            onClick={toggleMenu}
                          >
                            Twitter{" "}
                            <span className="text-sm text-neutral-500">9k</span>
                          </Link>
                        </li>
                        <li className="">
                          <Link
                            href="/#"
                            className="hover:text-accent transition flex flex-col text-3xl font-bold"
                            onClick={toggleMenu}
                          >
                            #VisitOndoState{" "}
                            <span className="text-sm text-neutral-500">
                              and share the best moments
                            </span>
                          </Link>
                        </li>
                      </ul>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </nav>
      )}
    </>
  );
}

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = "ListItem";
