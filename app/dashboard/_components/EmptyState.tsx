import Link from 'next/link'
import React from 'react'
import { Plane } from 'lucide-react'
import { Button } from '@/components/ui/button'
import GradientButton from '@/components/ui/gradient-button'

function EmptyState() {
    return (
        <div className='flex flex-col items-center justify-center py-20 bg-white/30 dark:bg-white/5 backdrop-blur-sm border border-gray-100 dark:border-white/10 rounded-2xl'>
            <div className='bg-gray-100 dark:bg-gray-800 p-6 rounded-full mb-6'>
                <Plane className='w-10 h-10 text-gray-400 dark:text-gray-500' />
            </div>
            <h2 className='text-xl font-bold text-gray-800 dark:text-gray-200 mb-2'>You don't have any trip planned!</h2>
            <p className='text-gray-500 dark:text-gray-400 mb-8 max-w-md text-center'>Start planning your next adventure with TripCraft AI in just a few clicks.</p>

            <Link href={'/create-new-trip'}>
                <GradientButton className='px-8 h-12 text-base font-semibold shadow-lg shadow-orange-500/20'>
                    Create Your First Trip
                </GradientButton>
            </Link>
        </div>
    )
}

export default EmptyState
