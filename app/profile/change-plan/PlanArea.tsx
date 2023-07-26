"use client"

import { useState } from "react"
import { useSetRecoilState } from "recoil"
import { alertWithLinkState } from "@/lib/recoil"
import PlanButton from "./PlanButton"

export default function PlanArea() {
  const [plan, setPlan] = useState("")

  const setAlert = useSetRecoilState(alertWithLinkState)

  function selectPlan(planType: string) {
    if (plan === planType) {
      setPlan("")
    } else {
      setPlan(planType)
    }
  }

  async function updateUserPlan() {
    // 사용자 플랜 변경 코드
    setAlert({ message: "플랜을 변경했습니다.", link: "/user" })
  }

  return (
    <div>
      <div className='mt-6 flex w-full flex-col space-y-4'>
        <PlanButton
          planType='FREE'
          uploadLimit='10GB'
          shareTime='10분'
          selectedPlan={plan}
          changePlan={() => selectPlan("FREE")}
        />
        <PlanButton
          planType='BASIC'
          uploadLimit='100GB'
          shareTime='30분'
          selectedPlan={plan}
          changePlan={() => selectPlan("BASIC")}
        />
        <PlanButton
          planType='PRO'
          uploadLimit='1TB'
          shareTime='1시'
          selectedPlan={plan}
          changePlan={() => selectPlan("PRO")}
        />
      </div>
      <button
        onClick={updateUserPlan}
        type='button'
        className='mt-4 hidden w-full rounded-lg bg-green-500 p-2 text-center font-semibold text-white transition duration-300 hover:bg-green-600'
      >
        변경
      </button>
    </div>
  )
}
