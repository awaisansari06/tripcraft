"use client";

import React from 'react';
import { Rocket, Map } from 'lucide-react';

interface StatsOverviewProps {
    totalTrips: number;
    user?: {
        email?: string;
        name?: string;
        subscription?: string;
    };
    loading?: boolean;
}

function StatSkeleton() {
    return (
        <div className="flex items-center gap-4 p-4 rounded-xl bg-white/50 dark:bg-white/5 border border-gray-100 dark:border-white/10 animate-pulse">
            <div className="w-11 h-11 rounded-full bg-gray-200 dark:bg-gray-700 shrink-0" />
            <div className="space-y-2 flex-1">
                <div className="h-5 w-10 bg-gray-200 dark:bg-gray-700 rounded" />
                <div className="h-3 w-24 bg-gray-200 dark:bg-gray-700 rounded" />
            </div>
        </div>
    );
}

function StatsOverview({ totalTrips, user, loading = false }: StatsOverviewProps) {
    const stats = [
        { label: "Trips Planned", value: totalTrips ?? 0, icon: Rocket, color: "text-blue-500 bg-blue-100 dark:bg-blue-900/30" },
        { label: "Places Visited", value: 0, icon: Map, color: "text-orange-500 bg-orange-100 dark:bg-orange-900/30" },
    ];

    if (loading) {
        return (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                <StatSkeleton />
                <StatSkeleton />
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
            {stats.map((stat, index) => (
                <div
                    key={index}
                    className="flex items-center gap-4 p-4 rounded-xl bg-white/50 dark:bg-white/5 border border-gray-100 dark:border-white/10 hover:shadow-sm transition-all"
                >
                    <div className={`p-3 rounded-full shrink-0 ${stat.color}`}>
                        <stat.icon className="w-5 h-5" />
                    </div>
                    <div>
                        <h3 className="text-xl font-bold text-gray-900 dark:text-white leading-none capitalize">
                            {stat.value}
                        </h3>
                        <p className="text-xs text-gray-500 mt-1 font-medium">{stat.label}</p>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default StatsOverview;
