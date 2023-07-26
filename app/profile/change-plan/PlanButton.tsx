import planColor from "@/lib/planColor"

type MyFunctionType = () => void

export default function PlanButton({
  planType,
  uploadLimit,
  shareTime,
  selectedPlan,
  changePlan,
}: {
  planType: string
  uploadLimit: string
  shareTime: string
  selectedPlan: string
  changePlan: MyFunctionType
}) {
  const color = planColor(planType)
  return (
    <button
      onClick={changePlan}
      type='button'
      className={`flex w-full items-center justify-between rounded-lg ring-2 transition duration-200 ring-${color} p-1 ${
        selectedPlan === planType ? `shadow-lg shadow-${color}` : ""
      } `}
    >
      <div className='flex grow items-center space-x-2'>
        <div className='w-1/4 p-1 text-base font-bold'>{planType}</div>
        <div className='flex flex-col items-start text-xs'>
          <div>최대 {uploadLimit}까지 업로드</div>
          <div>{shareTime}간 파일 공유</div>
        </div>
      </div>
      <div
        className={`m-1 h-6 w-6  rounded-full shadow-md ring-2 ring-offset-2 transition duration-200 ring-${color} bg-${
          selectedPlan === planType ? color : "white"
        }`}
      />
    </button>
  )
}
