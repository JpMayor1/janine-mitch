import { TemplateHandler } from "easy-template-x";
import { readFileSync, writeFileSync } from "fs";
import { NextResponse } from "next/server";
import { join } from "path";
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const twilioPhone = process.env.TWILIO_PHONE_NUMBER;
const client = require('twilio')(accountSid, authToken);

export async function POST(request: Request) {
  const form = await request.json()
  try {
    console.log("payload:", form)
    let messageRes = "";
    client.messages
      .create({
        body: 'Magandang Araw Kabaranggay! \nAng iyong dokumento ay handa na at pwede mo nang makuha sa ating baranggay hall. Hanapin si Maria Dennise Moreno para makuha Ang iyong dokumento.',
        from: twilioPhone,
        to: form.data.sms
      })
      .then(message => messageRes = message);
    console.log("done")
    return NextResponse.json({ success: messageRes }, { status: 200 });

  } catch (error) {
    console.log(error);
    return NextResponse.json({}, { status: 500 });
  }
}