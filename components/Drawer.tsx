'use client'

import { useState } from 'react'
import { Dialog } from '@headlessui/react'
import { ReactIconInline } from 'components/Icons'
import { MDXLayoutRenderer } from 'pliny/mdx-components'

export default function Drawer({ title, contents, service = false }) {
  const [open, setOpen] = useState(false)

  return (
    <li className="w-full">
      <button
        onClick={() => setOpen(true)}
        className="zoom flex w-full rounded bg-transparent px-4 py-2 text-left font-bold text-pink-500 hover:bg-gray-500 hover:bg-opacity-20 hover:text-pink-400"
      >
        {title}
      </button>
      <Dialog open={open} onClose={setOpen} className="relative z-10">
        <div className="fixed inset-0" />

        <div className="fixed inset-0 overflow-hidden">
          <div className="absolute inset-0 overflow-hidden">
            <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10 sm:pl-16">
              <div className="fixed inset-0" />
              <div className="fixed inset-0 overflow-hidden">
                <div className="absolute inset-0 overflow-hidden">
                  <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10 sm:pl-16">
                    <Dialog.Panel className="pointer-events-auto w-screen max-w-2xl transform transition duration-500 ease-in-out data-[closed]:translate-x-full sm:duration-700">
                      <div className="flex h-full flex-col overflow-y-scroll bg-white shadow-xl">
                        <div className="px-4 py-6 sm:px-6">
                          <div className="flex items-start justify-between">
                            <Dialog.Title className="text-base font-semibold leading-6 text-gray-900">
                              {title}
                            </Dialog.Title>
                            <div className="ml-3 flex h-7 items-center">
                              <button
                                type="button"
                                onClick={() => setOpen(false)}
                                className="relative rounded-md bg-white text-gray-400 hover:text-gray-500 focus:ring-2 focus:ring-indigo-500"
                              >
                                <span className="absolute -inset-2.5" />
                                <span className="sr-only">Close panel</span>
                                <ReactIconInline i="MdClose" color={'black'}>
                                  Close
                                </ReactIconInline>
                              </button>
                            </div>
                          </div>
                        </div>
                        {/* Main */}
                        <div className="divide-y divide-gray-200">
                          <div className="px-4 py-5 sm:px-0 sm:py-0">
                            <dl className="space-y-8 sm:space-y-0 sm:divide-y sm:divide-gray-200">
                              {contents}
                            </dl>
                          </div>
                        </div>
                      </div>
                    </Dialog.Panel>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Dialog>
    </li>
  )
}
