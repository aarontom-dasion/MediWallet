import { NextResponse } from "next/server";
import { PublicKey } from "@solana/web3.js";
import nacl from "tweetnacl";

export async function POST(req: Request) {
  try {
    const { publicKey, message, signature } = await req.json();
    if (!publicKey || !message || !signature) {
      return NextResponse.json({ error: "Missing params" }, { status: 400 });
    }
    const verified = nacl.sign.detached.verify(
      new TextEncoder().encode(message),
      new Uint8Array(signature),
      new PublicKey(publicKey).toBytes()
    );
    if (!verified) {
      return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
    }
    const token = `session-${publicKey.slice(0, 8)}`;
    return NextResponse.json({ token });
  } catch (e) {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }
}
