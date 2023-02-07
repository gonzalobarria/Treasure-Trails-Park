import { Fragment } from 'react';
import { Menu, Transition } from '@headlessui/react';
import { BiChevronDown, BiMenu } from 'react-icons/bi';
import Router from 'next/router';

export default function DropDownMenu({ options }) {
  const { titulo, menu } = options;

  // return (
  //   <div className="dropdown dropdown-end ">
  //     <label tabIndex={0} className="m-1 btn ">
  //       Click
  //     </label>
  //     <ul
  //       tabIndex={0}
  //       className="p-2 shadow dropdown-content menu bg-base-100 rounded-box w-52"
  //     >
  //       <li>
  //         <a>Item 1</a>
  //       </li>
  //       <li>
  //         <a>Item 2</a>
  //       </li>
  //     </ul>
  //   </div>
  // );

  return (
    <div className="relative z-50 px-5 pt-4 pb-2 transition-all duration-700 border-b-2 border-white lg:pt-3 hover:border-b-2 hover:border-purple-700">
      <Menu as="div" className="relative inline-block text-left">
        <div>
          <Menu.Button className="inline-flex justify-center w-full font-semibold uppercase rounded-sm text-negro-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">
            {titulo}
            {titulo ? (
              <BiChevronDown
                fontSize={20}
                className="ml-1 text-negro-500"
                aria-hidden="true"
              />
            ) : (
              <BiMenu
                fontSize={20}
                className="text-negro-500"
                aria-hidden="true"
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
          <Menu.Items className="absolute right-0 mt-2 origin-top-right bg-white divide-y divide-gray-100 shadow-2xl rounded-2xl w-36 ring-1 ring-black ring-opacity-5 focus:outline-none">
            <div className="px-1 py-1 ">
              {menu.map((item) => (
                <Menu.Item key={item.url}>
                  {({ active }) => (
                    <button
                      onClick={() => Router.push(item.url)}
                      className={`${
                        active ? 'bg-purple-700 text-white' : 'text-gray-900'
                      } group flex rounded-2xl justify-center font-semibold items-center w-full px-2 py-3 text-sm uppercase hover:text-negro-500`}
                    >
                      {item.glosa}
                    </button>
                  )}
                </Menu.Item>
              ))}
            </div>
          </Menu.Items>
        </Transition>
      </Menu>
    </div>
  );
}
