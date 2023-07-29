import replaceAll from "@/lib/replaceAll"
import { ImageResponse } from "next/server"

export const runtime = "edge"

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)

  let title = searchParams.get("code") ? searchParams.get("code") : ""

  title = unescape(replaceAll(title!, "\\", "%"))

  return new ImageResponse(
    (
      <div tw=' h-full w-full flex flex-col justify-center items-center bg-white'>
        <div tw='flex flex-col justify-center items-start '>
          <div tw='flex justify-center items-center mb-8'>
            <svg
              width='256'
              height='256'
              viewBox='0 0 512 512'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path
                d='M462 0H50C22.3858 0 0 22.3858 0 50V462C0 489.614 22.3858 512 50 512H462C489.614 512 512 489.614 512 462V50C512 22.3858 489.614 0 462 0Z'
                fill='white'
              />
              <g filter='url(#filter0_d_0_1)'>
                <path
                  d='M373.645 277.91L291.355 195.62C271.829 176.094 240.171 176.094 220.645 195.62L138.355 277.91C118.829 297.436 118.829 329.094 138.355 348.621L220.645 430.91C240.171 450.436 271.829 450.436 291.355 430.91L373.645 348.621C393.171 329.094 393.171 297.436 373.645 277.91Z'
                  fill='#0C7332'
                />
              </g>
              <path
                fill-rule='evenodd'
                clip-rule='evenodd'
                d='M139.062 277.203L138.355 277.91C118.829 297.436 118.829 329.094 138.355 348.621L220.645 430.91C240.171 450.436 271.829 450.436 291.355 430.91L373.645 348.621C393.171 329.094 393.171 297.436 373.645 277.91L372.938 277.203L291.355 358.785C271.829 378.311 240.171 378.311 220.645 358.785L139.062 277.203Z'
                fill='#16A34A'
              />
              <path
                d='M373.645 163.645L291.355 81.3553C271.829 61.8291 240.171 61.8291 220.645 81.3553L138.355 163.645C118.829 183.171 118.829 214.829 138.355 234.356L220.645 316.645C240.171 336.171 271.829 336.171 291.355 316.645L373.645 234.356C393.171 214.829 393.171 183.171 373.645 163.645Z'
                fill='#22C55E'
              />
              <defs>
                <filter
                  id='filter0_d_0_1'
                  x='107.71'
                  y='180.976'
                  width='296.579'
                  height='304.579'
                  filterUnits='userSpaceOnUse'
                  color-interpolation-filters='sRGB'
                >
                  <feFlood flood-opacity='0' result='BackgroundImageFix' />
                  <feColorMatrix
                    in='SourceAlpha'
                    type='matrix'
                    values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0'
                    result='hardAlpha'
                  />
                  <feOffset dy='24' />
                  <feGaussianBlur stdDeviation='8' />
                  <feComposite in2='hardAlpha' operator='out' />
                  <feColorMatrix
                    type='matrix'
                    values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0'
                  />
                  <feBlend
                    mode='normal'
                    in2='BackgroundImageFix'
                    result='effect1_dropShadow_0_1'
                  />
                  <feBlend
                    mode='normal'
                    in='SourceGraphic'
                    in2='effect1_dropShadow_0_1'
                    result='shape'
                  />
                </filter>
              </defs>
            </svg>

            <div tw='flex flex-col ml-8'>
              <div tw='text-8xl font-extrabold flex'>Moveto</div>
              <div tw='text-5xl font-bold text-green-600 mt-2 flex'>
                접속 코드: {title}
              </div>
            </div>
          </div>
          <div tw='text-4xl font-bold flex'>
            링크에 접속하면 공유된 파일을 다운받을 수 있습니다.
          </div>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  )
}
