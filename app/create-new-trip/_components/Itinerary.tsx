"use client";

import React, { useState, useEffect } from 'react';
import { Timeline } from '@/components/ui/timeline';
import HotelCardItem from './HotelCardItem';
import PlaceCardItem from './PlaceCardItem';
import { useTripDetail } from '@/app/provider';
import { TripContextType } from '@/context/TripDetailContext';
import { TripInfo, ModalItem } from './types';
import Image from "next/image";
import { ArrowLeft } from 'lucide-react';
import TripItemModal from './TripItemModal';
import GlobalMap from './GlobalMap';

import { useQuery } from 'convex/react';
import { api } from '@/convex/_generated/api';
import { useContext } from 'react';
import { UserDetailContext } from '@/context/UserDetailContext';

function Itinerary({
    scrollContainer,
    onTripReady
}: {
    scrollContainer?: React.RefObject<HTMLDivElement | null>;
    onTripReady?: (isReady: boolean) => void;
}) {
    const { userDetail } = useContext(UserDetailContext);
    const { tripDetailInfo, setTripDetailInfo } = useTripDetail();
    const [tripData, setTripData] = useState<TripInfo | null>(null);
    const [selectedItem, setSelectedItem] = useState<ModalItem | null>(null);

    // Fetch Saved Places
    const savedPlaces = useQuery(api.savedPlaces.GetSavedPlaces,
        userDetail ? { userId: userDetail.email } : "skip"
    );

    useEffect(() => {
        if (tripDetailInfo) {
            setTripData(tripDetailInfo);
            onTripReady?.(true);
        } else {
            setTripData(null);
            onTripReady?.(false);
        }
    }, [tripDetailInfo, onTripReady]);

    const handleHotelSelect = (hotel: any, imageUrl: string, images: string[]) => {
        setSelectedItem({
            type: 'hotel',
            title: hotel.hotel_name,
            subtitle: hotel.hotel_address,
            description: hotel.description,
            imageUrl: imageUrl,
            images: images && images.length > 0 ? images : [imageUrl],
            context: "Recommended Hotel",
            price: hotel.price_per_night,
            rating: hotel.rating,
            geoCoordinates: hotel.geo_coordinates,
            countryName: tripData?.destination
        });
    };

    const handleActivitySelect = (activity: any, imageUrl: string, images: string[], context: string) => {
        setSelectedItem({
            type: 'activity',
            title: activity.place_name,
            subtitle: activity.place_address || activity.place_details,
            description: activity.place_details,
            imageUrl: imageUrl,
            images: images && images.length > 0 ? images : [imageUrl],
            context: context,
            price: activity.ticket_pricing,
            rating: activity.rating ?? null,
            duration: activity.time_travel_each_location,
            bestTime: activity.best_time_to_visit,
            geoCoordinates: typeof activity.geo_coordinates === 'string'
                ? { lat: 0, lng: 0 }
                : activity.geo_coordinates,
            countryName: tripData?.destination
        });
    };

    const data = tripData ? [
        {
            title: 'Hotels',
            content: (
                <div className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5'>
                    {tripData.hotels.map((hotel, index) => (
                        <HotelCardItem
                            key={index}
                            hotel={hotel}
                            onSelect={(imageUrl, images) => handleHotelSelect(hotel, imageUrl, images)}
                        />
                    ))}
                </div>
            ),
        },
        ...tripData?.itinerary.map((dayData) => ({
            title: `Day ${dayData?.day}`,
            content: (
                <div className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5'>
                    {dayData.activities.map((activity, index) => (
                        <PlaceCardItem
                            key={index}
                            activity={activity}
                            onSelect={(imageUrl, images) => handleActivitySelect(activity, imageUrl, images, `Day ${dayData.day}`)}
                        />
                    ))}
                </div>
            ),
        }))
    ] : [];

    // Extract valid days for the sidebar
    const tripDays = tripData ? tripData.itinerary.map((d) => d.day) : [];

    return (
        <div className={`relative w-full flex flex-col md:flex-row gap-6 ${!tripData ? 'h-full overflow-hidden' : ''}`}>
            {tripData ? (
                <>
                    {/* Main Timeline Content */}
                    <div className="flex-1">
                        <Timeline
                            data={data}
                            scrollContainer={scrollContainer}
                            tripData={tripData}
                        />
                    </div>

                    {/* 4. Timeline Mini-Navigation (Floating) */}
                    <div className="hidden xl:block w-32 relative">
                        <div className="sticky top-24 flex flex-col gap-2 p-4 border-l border-gray-100 dark:border-zinc-800">
                            <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Days</p>
                            {tripDays.map((day) => (
                                <button
                                    key={day}
                                    onClick={() => {
                                        const el = document.getElementById(`day-${day}`);
                                        el?.scrollIntoView({ behavior: 'smooth', block: 'center' });
                                    }}
                                    className="text-sm text-left text-gray-500 hover:text-primary dark:text-gray-400 dark:hover:text-primary transition-colors py-1 pl-2 border-l-2 border-transparent hover:border-primary"
                                >
                                    Day {day}
                                </button>
                            ))}
                        </div>
                    </div>

                    <TripItemModal
                        isOpen={!!selectedItem}
                        onClose={() => setSelectedItem(null)}
                        item={selectedItem}
                    />
                </>
            ) : (
                <div className="w-full h-full p-4 md:px-10 md:pb-10 md:pt-14 overflow-hidden">
                    {!tripData ? (
                        <div className="flex flex-col gap-8 h-full">
                            {/* Global 3D Map (Fills remaining space) */}
                            <div className="flex-1 w-full min-h-0">
                                <GlobalMap />
                            </div>
                        </div>
                    ) : null}
                </div>
            )}
        </div>
    );
}

export default Itinerary;