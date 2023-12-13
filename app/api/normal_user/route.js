import Normal_user from "@/models/normal_user";
import { connectToDB } from "@/utils/database";
import { NextResponse } from "next/server";
import bcryptjs from "bcryptjs";

// pages/api/users.js

export async function POST(req) {
  const { name, email, pass } = await req.json();
  await connectToDB();
  const check = await Normal_user.findOne({ email });
  if(check){
    return NextResponse.json({ msg: "exist" });
  }
  else{
    const newPass =await bcryptjs.hash(pass, 10);
    
    await Normal_user.insertMany({ name, email, password: newPass,pic:"https://media.istockphoto.com/id/1337144146/vector/default-avatar-profile-icon-vector.jpg?s=612x612&w=0&k=20&c=BIbFwuv7FxTWvh5S3vB6bkT0Qv8Vn8N5Ffseq84ClGI=" });
    // res.json({ message: 'saved' })
    // res.json("saved")
   return NextResponse.json({ msg: "saved" }, { status: 201 });
    // return new Response("yesssss", { status: 200 })

  }
  
}

export async function PUT(req,res) {
  const { email, pass } = await req.json();
  await connectToDB();
  const check = await Normal_user.findOne({ email });
  // console.log('detail s',pass,check.password)
  // const check = false;

  if (check) {
    let passCheck=await bcryptjs.compare(pass, check.password);
    
    // console.log('pass is ',passCheck)

    if(passCheck){return NextResponse.json({ msg: "correct" });}
    else{return NextResponse.json({ msg: "incorrect" });}
    // passCheck ? res.json("loginPass") : res.json("loginFail");
  } else {
    return NextResponse.json({ msg: "incorrect" });

    // res.json("nouser");
  }

  // return NextResponse.json({ messgae: "done" }, { status: 201 });
  // const {name}=await req.json()
  // return NextResponse.json({getVal:res},{status:201})
}

// export async function DELETE(req){
//     // const {name}=await req.json()
//     // await connectToDB()
//     // await User.insertMany({name:'jk'})
//     // return NextResponse.json({messgae:"del"},{status:201})
// }

// export default async function handler(req, res) {
//     //   if (req.method !== 'POST') {
//     //     return res.status(405).end();
//     //   }

//     await connectToDB();

//     //   const { name } = req.body;

//     try {
//         // const newUser = new User({ name });
//         await User.insertMany({ name: 'jk' })
//         console.log('inserted')
//         // res.status(201).json({ message: 'User created successfully' });
//     } catch (error) {
//         console.log('Error creating user:', error);
//         // res.status(500).json({ error: 'Server error' });
//     }
// }
