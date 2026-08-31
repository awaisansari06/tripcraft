import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const CreateTripDetail = mutation({
    args: {
        tripId: v.string(),
        uid: v.id("UserTable"),
        tripDetail: v.any(),
    },
    handler: async (ctx, args) => {
        const result = await ctx.db.insert("TripDetailTable", {
            tripDetail: args.tripDetail,
            tripId: args.tripId,
            uid: args.uid, // This might need casting if schema expects v.id
        });

        return result;
    },
});


export const GetUserTrips = query({
    args: {
        uid: v.id("UserTable")
    },
    handler: async (ctx, args) => {
        const trips = await ctx.db.query("TripDetailTable")
            .withIndex("by_uid", q => q.eq("uid", args.uid))
            .collect();
        return trips;
    }
})

export const GetTrip = query({
    args: {
        tripId: v.string(),
    },
    handler: async (ctx, args) => {
        const trip = await ctx.db.query("TripDetailTable")
            .withIndex("by_tripId", q => q.eq("tripId", args.tripId))
            .first();
        return trip;
    },
});

export const UpdateTrip = mutation({
    args: {
        tripId: v.string(),
        tripDetail: v.any()
    },
    handler: async (ctx, args) => {
        const trip = await ctx.db.query("TripDetailTable")
            .withIndex("by_tripId", q => q.eq("tripId", args.tripId))
            .first();

        if (!trip) {
            throw new Error("Trip not found to update");
        }

        await ctx.db.patch(trip._id, {
            tripDetail: args.tripDetail
        });
    },
});
