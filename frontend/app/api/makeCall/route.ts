// app/api/makeCall/route.ts

import { NextRequest, NextResponse } from "next/server";
import twilio from "twilio";

const accountSid = process.env.TWILIO_ACCOUNT_SID!;
const authToken = process.env.TWILIO_AUTH_TOKEN!;
const twilioClient = twilio(accountSid, authToken);

const fromNumber = process.env.TWILIO_PHONE_NUMBER!;
const toNumber = process.env.ALERT_PHONE_NUMBER!;

export async function GET(req: NextRequest) {
  try {
    const twiml = `<Response>
      <Say voice="alice">
        There is currently someone drowning. I am calling from coordinates 9999, 9999. Please send help immediately.
      </Say>
    </Response>`;
    const call = await twilioClient.calls.create({
      to: toNumber,
      from: fromNumber,
      twiml: twiml,
    });

    console.log(`Call initiated with SID: ${call.sid}`);

    return NextResponse.json({ message: "Call initiated" }, { status: 200 });
  } catch (error: any) {
    console.error("Error making call:", error);
    return NextResponse.json(
      { message: "Error making call", error: error.message },
      { status: 500 }
    );
  }
}
