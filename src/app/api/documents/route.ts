import { NextResponse } from "next/server";
import { RequestOptions } from "http";
import https from "https";

export async function POST(request: Request) {
    const form = await request.json();
    try {
        console.log("payload:", form);

        const message =
            "Magandang Araw Kabaranggay! \nAng iyong dokumento ay handa na at pwede mo nang makuha sa ating baranggay hall. Hanapin si Maria Dennise Moreno para makuha Ang iyong dokumento.";

        const postData = JSON.stringify({
            messages: [
                {
                    destinations: [{ to: process.env.DEFAULT_PHONE_NUMBER }],
                    from: process.env.SENDER_NAME,
                    text: message,
                },
            ],
        });

        const options: RequestOptions = {
            method: "POST",
            hostname: process.env.INFOBIP_HOST_NAME,
            path: process.env.INFOBIP_PATH,
            headers: {
                Authorization: `App ${process.env.INFOBIP_API_KEY}`,
                "Content-Type": "application/json",
                Accept: "application/json",
            },
        };

        const reqInfobip = https.request(options, (infobipRes) => {
            let chunks: Uint8Array[] = [];

            infobipRes.on("data", (chunk) => {
                chunks.push(chunk);
            });

            infobipRes.on("end", () => {
                const body = Buffer.concat(chunks);
                console.log(body.toString());
            });

            infobipRes.on("error", (error) => {
                console.error(error);
            });
        });

        reqInfobip.write(postData);
        reqInfobip.end();
        return NextResponse.json({ success: "Message sent!" }, { status: 200 });
    } catch (error) {
        console.log(error);
        return NextResponse.json({}, { status: 500 });
    }
}
