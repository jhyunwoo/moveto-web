import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server"

export async function GET(){
  if(process.env.NODE_ENV === 'production'){
    return NextResponse.json({error: 'Backup is disabled in production'}, {status: 403})
  }else{
    const nouns = await prisma.nouns.findMany()
    const adjectives = await prisma.adjectives.findMany()
    return NextResponse.json({nouns, adjectives})
  }
}