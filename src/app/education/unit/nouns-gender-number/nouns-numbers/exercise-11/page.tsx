import React from 'react'
import NounsPluralPage1 from './NounsPluralPage1'
import NounsPluralPage2 from './NounsPluralPage2'

const page = () => {
  return (
    <div>
            <div className="rounded-xl border border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-white/[0.03] px-5 py-4 flex items-start gap-3">
          <span className="text-2xl leading-none mt-0.5">💡</span>
          <div>
            <p className="text-sm font-semibold text-gray-800 dark:text-white">Rule — Plural with Different Meaning</p>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">
              Some nouns have a{" "}
              <span className="font-semibold text-gray-700 dark:text-gray-200">
                different meaning in the plural
              </span>
              . Choose the correct option for each — these plurals have{" "}
              <span className="font-semibold text-gray-700 dark:text-gray-200">no singular</span>{" "}
              in this sense.
            </p>
          </div>
        </div>
      <div className='flex flex-row gap-0 mx-auto w-screen h-screen justify-center items-center'>

      <NounsPluralPage2 />
      <NounsPluralPage1 />
      </div>
    </div>
  )
}

export default page