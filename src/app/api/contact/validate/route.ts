import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const validationSchema = z.object({
  email: z.string().email(),
});

const blockedDomains = new Set([
  "10minutemail.com",
  "guerrillamail.com",
  "mailinator.com",
  "temp-mail.org",
  "tempmail.com",
  "yopmail.com",
  "trashmail.com",
  "fakeinbox.com",
]);

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const parsed = validationSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { valid: false, code: "email.invalid" },
        { status: 400 }
      );
    }

    const email = parsed.data.email.trim().toLowerCase();
    const domain = email.split("@")[1] ?? "";

    if (!domain) {
      return NextResponse.json(
        { valid: false, code: "email.invalid" },
        { status: 400 }
      );
    }

    if (blockedDomains.has(domain)) {
      return NextResponse.json(
        { valid: false, code: "email.disposable" },
        { status: 200 }
      );
    }

    return NextResponse.json({ valid: true }, { status: 200 });
  } catch {
    return NextResponse.json(
      { valid: false, code: "email.validation_failed" },
      { status: 500 }
    );
  }
}
