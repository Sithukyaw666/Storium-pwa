import { Fragment } from "react";

import { Disclosure, Menu, Transition } from "@headlessui/react";
import { MenuIcon, XIcon } from "@heroicons/react/outline";
import { Link } from "react-router-dom";

import { useAuth } from "../hooks/auth";
import logo from "../assets/logo/logo.svg";
import { createProfile } from "../utils/profile";

import Logout from "./Logout";

const Header = () => {
  const user = useAuth();
  const svg = createProfile(user?.id);
  const userNavigation = [
    { name: "Your Profile", href: `/profile/${user?.id}` },
    { name: "Settings", href: "#" },
  ];

  return (
    <Disclosure as="nav" className="bg-blue-700">
      {({ open }) => (
        <>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <img className="h-12 w-12" src={logo} alt="Storium" />
                </div>
                <div className="md:hidden block">
                  <div className="ml-10 flex items-baseline space-x-4">
                    <Link
                      to="/"
                      className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                    >
                      Stories
                    </Link>
                    {user?.id && (
                      <Link
                        to="/Editor"
                        className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                      >
                        Create Story
                      </Link>
                    )}
                  </div>
                </div>
              </div>
              <div className="md:hidden block">
                <div className="md:ml-4 flex items-center ml-6">
                  {/* Profile dropdown */}
                  {user?.id ? (
                    <Menu as="div" className="ml-3 relative">
                      <div>
                        <Menu.Button className="max-w-xs bg-gray-800 rounded-full flex items-center text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
                          <span className="sr-only">Open user menu</span>
                          {user?.id && (
                            <div
                              className="w-10 h-10"
                              dangerouslySetInnerHTML={{ __html: svg }}
                            />
                          )}
                        </Menu.Button>
                      </div>
                      <Transition
                        as={Fragment}
                        enter="transition ease-out duration-100"
                        enterFrom="transform opacity-0 scale-95"
                        enterTo="transform opacity-100 scale-100"
                        leave="transition ease-in duration-75"
                        leaveFrom="transform opacity-100 scale-100"
                        leaveTo="transform opacity-0 scale-95"
                      >
                        <Menu.Items className="origin-top-right absolute z-10 right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                          {userNavigation.map((item) => (
                            <Menu.Item key={item.name}>
                              {({ active }) => (
                                <Link
                                  to={item.href}
                                  className="block px-4 py-2 text-sm text-gray-700"
                                >
                                  {item.name}
                                </Link>
                              )}
                            </Menu.Item>
                          ))}
                          <div className="mx-2">
                            <Logout link />
                          </div>
                        </Menu.Items>
                      </Transition>
                    </Menu>
                  ) : (
                    <Link
                      to="/login"
                      className="text-center text-blue-600 bg-white hover:bg-gray-200 hover:text-blue-800 block px-10  py-2 rounded-md text-base font-medium"
                    >
                      Login
                    </Link>
                  )}
                </div>
              </div>
              <div className="-mr-2 md:flex hidden">
                {/* Mobile menu button */}
                <Disclosure.Button className="bg-gray-800 inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <MenuIcon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
            </div>
          </div>

          <Disclosure.Panel className="hidden md:block">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              <Link
                to="/"
                className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
              >
                Stories
              </Link>
              {user?.id && (
                <Link
                  to="/editor"
                  className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
                >
                  Create Story
                </Link>
              )}
            </div>
            {user?.id ? (
              <div className="pt-4 pb-3 border-t border-gray-700">
                <div className="flex items-center px-5">
                  <div className="flex-shrink-0">
                    <div
                      className="w-10 h-10"
                      dangerouslySetInnerHTML={{ __html: svg }}
                    />
                  </div>
                  <div className="ml-3">
                    <div className="text-base font-medium leading-none text-white">
                      {user.username}
                    </div>
                  </div>
                </div>

                <div className="mt-3 px-2 space-y-1">
                  {userNavigation.map((item) => (
                    <Link
                      key={item.name}
                      to={item.href}
                      className="block px-3 py-2 rounded-md text-base font-medium text-gray-400 hover:text-white hover:bg-gray-700"
                    >
                      {item.name}
                    </Link>
                  ))}
                  <div className="mx-2">
                    <Logout link />
                  </div>
                </div>
              </div>
            ) : (
              <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                <Link
                  to="/login"
                  className="text-center text-blue-600 bg-white hover:bg-gray-200 hover:text-blur-800 block px-3 py-2 rounded-md text-base font-medium"
                >
                  Login
                </Link>
              </div>
            )}
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
};
export default Header;
