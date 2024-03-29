import { Fragment } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import toast from "react-hot-toast";
import { FaPlus } from "react-icons/fa";
import { Tooltip } from "react-tooltip";
import initializeUser from "../utils/initializeUser";
import Logo from "./Logo";
import { logout } from "../api/auth";

function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
};

function NavigationBar(
    { role, activeTab, setActiveTab, renderTabContent, navigation, user }
) {
    const dispatch = useDispatch();

    const handleLogout = async () => {
        const response = await logout({ role });
        if (response && response.status === 200) {
            if (role === "admin") {
                initializeUser("admin", dispatch);
                navigate("/admin/login");
            } else {
                initializeUser("user", dispatch);
                navigate("/");
            }
        } else {
            toast.error("An error occured while logging out");
            console.log("logout error: ", response);
        }
    };

    return (
        <div className="min-h-full">
            <Disclosure as="nav" className="bg-gray-800">
                {({ open }) => (
                    <>
                        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                            <div className="flex h-16 items-center justify-between">
                                <div className="flex items-center">
                                    <div className="flex-shrink-0">
                                        <Logo />
                                    </div>
                                    <div className="hidden md:block">
                                        <div className="ml-10 flex items-baseline space-x-4">
                                            {navigation.map((item) => (
                                                <a
                                                    key={item.name}
                                                    href={item.href}
                                                    className={classNames(
                                                        item.current
                                                            ? "bg-gray-900 text-white"
                                                            : "text-gray-300 hover:bg-gray-700 hover:text-white",
                                                        "rounded-md px-3 py-2 text-sm font-medium cursor-pointer"
                                                    )}
                                                    aria-current={item.current ? "page" : undefined}
                                                    onClick={() => setActiveTab(item.name)}
                                                >
                                                    {item.name}
                                                </a>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                                <div className="hidden md:block">
                                    <div className="ml-4 flex items-center md:ml-6">
                                        {/* Profile dropdown */}
                                        <Menu as="div" className="relative ml-3">
                                            <div>
                                                <Menu.Button className="relative flex max-w-xs items-center rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                                                    <span className="absolute -inset-1.5" />
                                                    <span className="sr-only">Open user menu</span>
                                                    <img className="h-8 w-8 rounded-full" src={user.imageUrl} alt="" />
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
                                                <Menu.Items className="absolute right-0 z-10 mt-2 w-32 origin-top-right rounded-md bg-gray-900 py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                                                    <Menu.Item>
                                                        <div className="flex justify-center"> {/* Center the content horizontally */}
                                                            <button
                                                                className="rounded-md bg-gray-700 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm"
                                                                onClick={handleLogout}
                                                            >
                                                                Sign out
                                                            </button>
                                                        </div>
                                                    </Menu.Item>
                                                </Menu.Items>
                                            </Transition>
                                        </Menu>
                                    </div>
                                </div>
                                <div className="-mr-2 flex md:hidden">
                                    {/* Mobile menu button */}
                                    <Disclosure.Button className="relative inline-flex items-center justify-center rounded-md bg-gray-800 p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                                        <span className="absolute -inset-0.5" />
                                        <span className="sr-only">Open main menu</span>
                                        {open ? (
                                            <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                                        ) : (
                                            <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                                        )}
                                    </Disclosure.Button>
                                </div>
                            </div>
                        </div>

                        <Disclosure.Panel className="md:hidden">
                            <div className="space-y-1 px-2 pb-3 pt-2 sm:px-3">
                                {navigation.map((item) => (
                                    <Disclosure.Button
                                        key={item.name}
                                        as="a"
                                        href={item.href}
                                        className={classNames(
                                            item.current ? "bg-gray-900 text-white" : "text-gray-300 hover:bg-gray-700 hover:text-white",
                                            "block rounded-md px-3 py-2 text-base font-medium"
                                        )}
                                        aria-current={item.current ? "page" : undefined}
                                        onClick={() => setActiveTab(item.name)}
                                    >
                                        {item.name}
                                    </Disclosure.Button>
                                ))}
                            </div>
                            <div className="border-t border-gray-700 pb-3 pt-4">
                                <div className="flex items-center px-5">
                                    <div className="flex-shrink-0">
                                        <img className="h-10 w-10 rounded-full" src={user.imageUrl} alt="" />
                                    </div>
                                    <div className="ml-3">
                                        <div className="text-base font-medium leading-none text-white">{user.name}</div>
                                    </div>
                                </div>
                                <div className="mt-3 flex items-center px-5">
                                    <button
                                        className="rounded-md bg-gray-700 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm"
                                        onClick={handleLogout}
                                    >
                                        Sign out
                                    </button>
                                </div>
                            </div>
                        </Disclosure.Panel>
                    </>
                )}
            </Disclosure>

            <header className="bg-zinc-950 shadow">
                <div className="flex justify-between items-center mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
                    <h1 className="text-3xl font-bold tracking-tight text-white mb-4 sm:mb-0">{activeTab}</h1>
                    {role === "user" && (
                        <>
                            <Tooltip
                                id="add-icon-tooltip"
                                anchorSelect=".add-icon-tooltip"
                                place="bottom"
                                effect="solid"
                                content={"Creat new form"}
                            />
                            <Link
                                className="add-icon-tooltip rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm"
                                to={"/new-project"}
                            >
                                <FaPlus />
                            </Link>
                        </>
                    )}
                </div>
            </header>
            <main>
                <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
                    {/* Your content */}
                    {renderTabContent()}
                </div>
            </main>
        </div>
    );
};

export default NavigationBar;
