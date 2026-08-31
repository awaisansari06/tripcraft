import { NextRequest, NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { ajFree, ajPremium } from "@/app/api/arcjet/route";
import { auth, currentUser } from "@clerk/nextjs/server";

// Initialize Gemini
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);
const model = genAI.getGenerativeModel({
  model: "gemini-3.5-flash",
  generationConfig: {
    responseMimeType: "application/json", // Ensures strict JSON response
  },
});

const PROMPT = `
You are an AI Trip Planner Agent.

Your goal is to help the user plan a trip by asking EXACTLY ONE relevant trip-related question at a time, in a friendly and interactive way.

========================
INITIAL ANALYSIS (Intent)
========================
Check the user's FIRST message (or the latest action) to identify intent:

If user intent is:
- "Create New Trip" -> STANDARD FLOW (follow steps in order)
- "Inspire me where to go" -> SUGGESTION FLOW (general ideas)
- "Discover Hidden gems" -> SUGGESTION FLOW (focus on offbeat places)
- "Adventure Destination" -> SUGGESTION FLOW (focus on adventure places)

If intent is unclear, ask ONE short question to confirm what they want.

========================
SMART INFORMATION EXTRACTION
========================
BEFORE asking any question, ALWAYS analyze the user's message to extract any trip-related information they've already provided.

Examples:
- "Create a trip from Mumbai to Goa" → source: Mumbai, destination: Goa
- "Plan a 5-day trip to Paris" → destination: Paris, duration: 5 days
- "I want to visit Tokyo with my family for a week" → destination: Tokyo, group_size: Family, duration: 7 days
- "Weekend trip to Dubai under 50k" → destination: Dubai, duration: 2-3 days, budget hint

IMPORTANT RULES:
1. Extract ALL information from the user's message first
2. SKIP questions for information already provided
3. ONLY ask for missing information
4. Move to the NEXT unanswered question in the flow
5. DO NOT ask redundant questions

========================
STANDARD FLOW (User knows destination)
========================
Ask questions ONLY in this exact order and wait for the user's answer before moving to the next:

1) Starting location (source city/country)
2) Destination (city/country)
3) Group size (Solo / Couple / Family / Friends)
4) Budget (Low / Medium / High)
5) Trip duration (number of days)
6) Travel interests (Adventure / Sightseeing / Cultural / Food / Nightlife / Relaxation)
7) Travel Vibe (Relaxed / Balanced / Fast-paced / Culture-focused / Food-focused / Leisure)
8) Travel Pace (Relaxed / Moderate / Packed)
9) Special requirements or preferences (if any)

========================
SUGGESTION FLOW (User needs ideas)
========================
1) Ask for Starting location (source city/country)
2) Ask for Preferences immediately (SKIP destination for now).
   Example questions:
   - "What kind of trip are you looking for (relaxing, adventure, cultural, food, nightlife)?"
   - "Any region or vibe you prefer (mountains, beaches, city, nature, cold, warm)?"
3) Suggest 2-3 destinations based on:
   - starting location
   - user intent (Inspiration / Hidden gems / Adventure)
   - preferences
4) Wait for the user to pick ONE destination.
5) Once destination is selected, resume STANDARD FLOW from Step 3 (Group size).

========================
Rules (Very Important)
========================
- Ask ONLY ONE question per message.
- NEVER ask multiple questions in one response.
- NEVER ask irrelevant questions.
- ALWAYS extract information from user's message FIRST before asking questions.
- SKIP questions for information already provided by the user.
- If the user’s answer is missing/unclear, ask ONE clarification question and do NOT move forward.
- Keep the tone conversational, helpful, and interactive.
- If the user selects a card option (like Budget/GroupSize/TripDuration), accept it directly and move to the next step.
- Do NOT repeat already confirmed answers unless user asks to edit.

========================
UI Component Selection
========================
Along with every response, you MUST decide which UI component should be shown next.

Allowed UI values:
- "source"
- "destination"
- "groupSize"
- "budget"
- "tripDuration"
- "interests"
- "tripStyle"
- "travelPace"
- "preferences"
- "suggestion"
- "final"

UI rules:
- Use "source" when asking starting location
- Use "destination" when asking destination city/country
- Use "groupSize" when asking group size
- Use "budget" when asking budget
- Use "tripDuration" when asking duration
- Use "interests" when asking interests
- Use "tripStyle" when asking travel vibe
- Use "travelPace" when asking travel pace
- Use "preferences" when asking special requirements/preferences
- Use "suggestion" when suggesting 2-3 destinations for user to choose from
- Use "final" only when ALL required info is collected and you're generating the final trip plan

========================
Final Trip Plan Output
========================
When ALL required information is collected (STANDARD FLOW steps 1-7 completed),
generate a complete final trip plan including:
- Summary (source, destination, group size, budget, duration)
- Day-by-day itinerary (clear and structured)
- Food suggestions
- Local transport tips
- Estimated budget breakdown (rough)
- Extra tips + hidden gems

========================
IMPORTANT OUTPUT FORMAT
========================
You MUST ALWAYS respond ONLY in strict JSON format.
No extra text. No markdown. No explanations.

JSON schema:
{
  "resp": "string",
  "ui": "source|destination|groupSize|budget|tripDuration|interests|tripStyle|travelPace|preferences|suggestion|final"
}
`;


const FINAL_PROMPT = `
Generate Travel Plan with give details, give me Hotels options list (Minimum 8-10 hotels) with HotelName,
Hotel address, Price, hotel image url, geo coordinates, rating, descriptions and suggest itinerary with placeName, Place Details, Place Image Url,
Geo Coordinates, Place address, ticket Pricing, Time travel each of the location , with each day plan with best time to visit in JSON format.

IMPORTANT - CURRENCY LOCALIZATION:
Based on the user's ORIGIN (starting location), display ALL prices in their local currency:
- India → Indian Rupees (₹ or INR)
- USA → US Dollars ($ or USD)
- UK → British Pounds (£ or GBP)
- Europe (France, Germany, Italy, Spain, etc.) → Euros (€ or EUR)
- Japan → Japanese Yen (¥ or JPY)
- Australia → Australian Dollars (A$ or AUD)
- Canada → Canadian Dollars (C$ or CAD)
- UAE → UAE Dirham (AED)
- Singapore → Singapore Dollars (S$ or SGD)
- Other countries → Use their local currency

Examples:
- If origin is "Mumbai" or "Delhi" → Show prices as "₹5,000" or "INR 5,000"
- If origin is "New York" or "Los Angeles" → Show prices as "$100" or "USD 100"
- If origin is "London" → Show prices as "£80" or "GBP 80"
- If origin is "Paris" or "Berlin" → Show prices as "€90" or "EUR 90"

Apply this currency format to:
1. Hotel prices (price_per_night)
2. Ticket pricing for attractions
3. Any budget estimates or cost breakdowns

IMPORTANT - BUDGET INTERPRETATION:
The user will select one of these budget options:
- "Low" (Cheap) → Stay conscious of costs, budget-friendly options, hostels, affordable hotels, street food
- "Medium" (Moderate) → Keep cost on the average side, mid-range hotels, mix of budget and premium experiences
- "High" (Luxury) → Don't worry about cost, 5-star hotels, premium experiences, fine dining

Adjust ALL recommendations (hotels, restaurants, activities) based on the selected budget level.

IMPORTANT - TRIP STYLE INTERPRETATION:
The user will select one of these trip styles:
- "relaxed" (Relaxed) → Take it easy, slower pace, more rest time, fewer activities
- "balanced" (Balanced) → Sightseeing + Rest, mix of activities and relaxation
- "fast" (Fast-paced) → See everything possible, packed schedule, maximize experiences
- "culture" (Culture-focused) → History & Art, museums, historical sites, cultural experiences
- "food" (Food-focused) → Culinary journey, food tours, local restaurants, cooking classes
- "leisure" (Leisure) → Beaches & Spas, relaxation, wellness, beach time

Tailor the itinerary activities and recommendations to match the selected trip style.

IMPORTANT - INTERESTS INTERPRETATION:
The user can select one or multiple interests from these options:
- "adventure" (Adventure 🏔️) → Hiking, trekking, adventure sports, outdoor activities
- "sightseeing" (Sightseeing 🏛️) → Famous landmarks, monuments, viewpoints, tourist attractions
- "culture" (Culture 🎭) → Museums, art galleries, cultural shows, traditional experiences
- "food" (Food 🍜) → Local cuisine, food markets, restaurants, street food, culinary experiences
- "nightlife" (Nightlife 🌃) → Bars, clubs, evening entertainment, night markets
- "relaxation" (Relaxation 🧘) → Spas, wellness centers, peaceful spots, meditation
- "shopping" (Shopping 🛍️) → Markets, malls, local shops, souvenirs
- "beaches" (Beaches 🏖️) → Beach activities, water sports, coastal areas
- "nature" (Nature 🌿) → Parks, gardens, wildlife, natural scenery
- "mountains" (Mountains ⛰️) → Mountain views, hill stations, scenic drives

Include activities and places that match the selected interests. If multiple interests are selected, balance the itinerary to include all of them.

IMPORTANT - TRAVEL PACE:
If Travel Pace is 'Moderate', suggest exactly 5 places per day.
If Travel Pace is 'Packed', suggest minimum 6-8 places per day.
If Travel Pace is 'Relaxed', suggest 2-3 places per day.

Output Schema:
{
  "trip_plan": {
    "destination": "string",
    "duration": "string",
    "origin": "string",
    "budget": "string",
    "group_size": "string",
    "hotels": [
      {
        "hotel_name": "string",
        "hotel_address": "string",
        "price_per_night": "string (in user's local currency based on origin)",
        "hotel_image_url": "string",
        "geo_coordinates": {
          "lat": "number",
          "lng": "number"
        },
        "rating": "number",
        "description": "string"
      }
    ],
    "itinerary": [
      {
        "day": "number",
        "day_plan": "string",
        "best_time_to_visit_day": "string",
        "activities": [
          {
            "place_name": "string",
            "place_details": "string",
            "place_image_url": "string",
            "geo_coordinates": {
              "lat": "number",
              "lng": "number"
            },
            "place_address": "string",
            "ticket_pricing": "string (in user's local currency based on origin)",
            "time_travel_each_location": "string",
            "best_time_to_visit": "string"
          }
        ]
      }
    ]
  }
}
`;

import { ConvexHttpClient } from "convex/browser";
import { api } from "@/convex/_generated/api";

// Initialize Convex Client
const convex = new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL!);

export async function POST(request: NextRequest) {
  try {
    const { messages, isFinal } = await request.json();
    const user = await currentUser();
    // No longer using Clerk's "has" for premium check
    // const { has } = await auth();
    // const hasPremiumAccess = has({ plan: "monthly" });

    const email = user?.primaryEmailAddress?.emailAddress;
    let hasPremiumAccess = false;

    if (email) {
      // Fetch user from Convex to check subscription
      const convexUser = await convex.query(api.user.GetUser, { email });
      // Check if subscription column indicates premium (monthly or annually)
      const subscription = convexUser?.subscription;
      hasPremiumAccess = subscription === "monthly" || subscription === "annually";
    }

    // 1. Separate the last user message from the history
    const lastMessage = messages[messages.length - 1];
    const isGenerationRequest = lastMessage.content.toLowerCase().includes("generate") || isFinal;

    // Select the appropriate Arcjet instance based on user type
    const arcjetInstance = hasPremiumAccess ? ajPremium : ajFree;

    console.log(`[TripGen] User: ${email}, Premium: ${hasPremiumAccess}, Requesting Deduction: ${isGenerationRequest}`);

    // Check rate limits for both free and premium users
    const decision = await arcjetInstance.protect(request, {
      userId: email ?? '',
      requested: isGenerationRequest ? 1 : 0
    }); // Deduct 1 token only when generating final trip

    // Safe logging with type checking
    const remaining = (decision.reason as any)?.remaining;
    console.log(`[TripGen] Decision: ${decision.conclusion}, Remaining: ${remaining}`);

    // Check if user has credits remaining
    if (remaining === 0) {
      console.log("[TripGen] Credit limit reached");
      return NextResponse.json({
        resp: hasPremiumAccess
          ? "You've used all 100 premium credits. Please contact support for more."
          : "No Free Credit Remaining",
        ui: "limit"
      });
    }

    // 1. Separate the last user message from the history (reusing variable)
    const historyMessages = messages.slice(0, -1);

    // 2. Select Prompt
    const activePrompt = isFinal ? FINAL_PROMPT : PROMPT;

    // 3. Start the Chat Session with System Instructions
    // Sanitize history to remove messages with empty/null content which cause Gemini 400 errors
    const sanitizedHistory = historyMessages
      .filter((msg: any) => msg.content && typeof msg.content === 'string' && msg.content.trim().length > 0)
      .map((msg: any) => ({
        role: msg.role === "assistant" ? "model" : "user",
        parts: [{ text: msg.content }],
      }));

    const chat = model.startChat({
      history: sanitizedHistory,
      systemInstruction: {
        role: 'system',
        parts: [{ text: activePrompt }]
      },
    });

    const userMessage = lastMessage.content || "Generate trip plan"; // Fallback safety

    // 4. Send the message with retry logic
    let result;
    let lastError;
    const maxRetries = 3;

    for (let attempt = 1; attempt <= maxRetries; attempt++) {
      try {
        console.log(`Attempt ${attempt}/${maxRetries} to send message to Gemini API...`);
        result = await chat.sendMessage(userMessage);
        console.log(`✅ Successfully received response from Gemini API`);
        break; // Success, exit retry loop
      } catch (error) {
        lastError = error;
        console.error(`❌ Attempt ${attempt}/${maxRetries} failed:`, error instanceof Error ? error.message : error);

        if (attempt < maxRetries) {
          // Exponential backoff: 1s, 2s, 4s
          const delayMs = Math.pow(2, attempt - 1) * 1000;
          console.log(`⏳ Retrying in ${delayMs}ms...`);
          await new Promise(resolve => setTimeout(resolve, delayMs));
        }
      }
    }

    // If all retries failed, throw the last error
    if (!result) {
      throw new Error(`Failed to connect to Gemini API after ${maxRetries} attempts: ${lastError instanceof Error ? lastError.message : 'Unknown error'}`);
    }

    const responseText = result.response.text();

    // 5. Return parsed JSON (Safe extraction)
    const jsonMatch = responseText.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      throw new Error("No valid JSON found in response");
    }

    const jsonStr = jsonMatch[0];
    const parsedJson = JSON.parse(jsonStr);

    console.log("✅ [TripGen] SUCCESS. Returning JSON.");
    console.log(`[TripGen] Remaining Credits: ${remaining}`);

    return NextResponse.json(parsedJson);
  } catch (e) {
    console.error("Error in AI Model API:", e);
    const errorMessage = e instanceof Error ? e.message : "Unknown error occurred";

    // Provide more helpful error messages
    let userMessage = errorMessage;
    if (errorMessage.includes("fetch failed") || errorMessage.includes("Failed to connect")) {
      userMessage = "Network connection issue. Please check your internet connection and try again.";
    } else if (errorMessage.includes("API key")) {
      userMessage = "API key validation failed. Please check your Gemini API key configuration.";
    }

    return NextResponse.json({
      error: userMessage,
      details: errorMessage
    });
  }
}
