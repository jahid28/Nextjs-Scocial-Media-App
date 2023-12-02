
import User from "@/models/user";
import { connectToDB } from "@/utils/database";
import { NextResponse } from "next/server";

  // pages/api/users.js

export async function POST(req){
    const { name,email } = await req.json();

    await connectToDB()
    await User.insertMany({name,email})
    return NextResponse.json({messgae:"done"},{status:201})
}

// export async function GET(req){
//     // const {name}=await req.json()
//     await connectToDB()
//     let res=await User.find()
//     // return NextResponse.json({getVal:res},{status:201})
// }
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
