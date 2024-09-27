import { render } from "@react-email/render";
import WelcomeEmail from "@/emails";
import { Resend } from "resend";
import { NextRequest, NextResponse } from "next/server";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: NextRequest) {
  // rate limit
  // authorization

  const { email, userFirstname } = await request.json();

  const { data, error } = await resend.emails.send({
    from: "neirinzarlwin <noreply@neirinzaralwin.com>",
    to: [email],
    subject: "Thank for reaching me",
    html: await render(WelcomeEmail({ userFirstname })),
  });

  if (error) {
    return new NextResponse(JSON.stringify(error), { status: 500 });
  }

  return new NextResponse(
    JSON.stringify({ message: "Email sent successfully" }),
    { status: 200 }
  );
}
