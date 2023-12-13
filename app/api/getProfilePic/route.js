import Normal_user from "@/models/normal_user";
import { connectToDB } from "@/utils/database";
import { NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import g_user from "@/models/g_user";

export async function PUT(req,res) {
  const { email } = await req.json();
  console.log('server ',email)
  await connectToDB();
  const check = await Normal_user.findOne({ email });
  // console.log('detail s',pass,check.password)
  // const check = false;

  if (check) {
    return NextResponse.json({ msg: check.pic });
   } else {
    return NextResponse.json({ msg: "incorrect" });
  }
}
export async function PATCH(req,res) {
  const { email } = await req.json();
  console.log('server ',email)
  await connectToDB();
  const check = await g_user.findOne({ email });
  // console.log('detail s',pass,check.password)
  // const check = false;

  if (check) {
    return NextResponse.json({ msg: check.pic });
   } else {
    return NextResponse.json({ msg: "incorrect" });
  }
}
