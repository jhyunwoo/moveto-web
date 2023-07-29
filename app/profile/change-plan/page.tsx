import CenterLayout from "@/components/CenterLayout"
import PlanArea from "./PlanArea"

export const runtime = "edge"

export default function ChangePlan() {
  return (
    <CenterLayout>
      <div className='flex  w-full max-w-xl flex-col items-center justify-center rounded-lg bg-white p-4 shadow-lg'>
        <div className='mr-auto text-xl font-semibold'>플랜 변경</div>
        <PlanArea />
      </div>
    </CenterLayout>
  )
}
