import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server"
const nounData = [
  {
    word: "정영진",
  },
  {
    word: "가게",
  },
  {
    word: "가격",
  },
  {
    word: "가구",
  },
  {
    word: "가까이",
  },
  {
    word: "가난",
  },
  {
    word: "가능",
  },
  {
    word: "가능성",
  },
  {
    word: "가로",
  },
  {
    word: "가로등",
  },
  {
    word: "가로수",
  },
  {
    word: "가루",
  },
  {
    word: "가르침",
  },
  {
    word: "가뭄",
  },
  {
    word: "가방",
  },
  {
    word: "가사",
  },
  {
    word: "가상",
  },
  {
    word: "가수",
  },
  {
    word: "가스",
  },
  {
    word: "가슴속",
  },
  {
    word: "가요",
  },
  {
    word: "가운데",
  },
  {
    word: "가위",
  },
  {
    word: "가을",
  },
  {
    word: "가이드",
  },
  {
    word: "가입",
  },
  {
    word: "가장",
  },
  {
    word: "가정",
  },
  {
    word: "가족",
  },
  {
    word: "가죽",
  },
  {
    word: "가지",
  },
  {
    word: "가짜",
  },
  {
    word: "가치",
  },
  {
    word: "가치관",
  },
  {
    word: "가톨릭",
  },
  {
    word: "각각",
  },
  {
    word: "각국",
  },
  {
    word: "각오",
  },
  {
    word: "각자",
  },
  {
    word: "각종",
  },
  {
    word: "간",
  },
  {
    word: "간격",
  },
  {
    word: "간부",
  },
  {
    word: "간섭",
  },
  {
    word: "간식",
  },
  {
    word: "간장",
  },
  {
    word: "간접",
  },
  {
    word: "간판",
  },
  {
    word: "간호",
  },
  {
    word: "갈등",
  },
  {
    word: "갈비",
  },
  {
    word: "갈비탕",
  },
  {
    word: "갈색",
  },
  {
    word: "갈증",
  },
  {
    word: "감",
  },
  {
    word: "감각",
  },
  {
    word: "감기",
  },
  {
    word: "감독",
  },
  {
    word: "감동",
  },
  {
    word: "감사",
  },
  {
    word: "감상",
  },
  {
    word: "감소",
  },
  {
    word: "감수성",
  },
  {
    word: "감옥",
  },
  {
    word: "감자",
  },
  {
    word: "감정",
  },
  {
    word: "갑",
  },
  {
    word: "값",
  },
  {
    word: "강",
  },
  {
    word: "강남",
  },
  {
    word: "강당",
  },
  {
    word: "강도",
  },
  {
    word: "강물",
  },
  {
    word: "강변",
  },
  {
    word: "강북",
  },
  {
    word: "강수량",
  },
  {
    word: "강아지",
  },
  {
    word: "강원도",
  },
  {
    word: "강의",
  },
  {
    word: "강제",
  },
  {
    word: "강조",
  },
  {
    word: "갖가지",
  },
  {
    word: "개",
  },
  {
    word: "개개인",
  },
  {
    word: "개구리",
  },
  {
    word: "개나리",
  },
  {
    word: "개미",
  },
  {
    word: "개방",
  },
  {
    word: "개별",
  },
  {
    word: "개선",
  },
  {
    word: "개성",
  },
  {
    word: "거리",
  },
  {
    word: "거실",
  },
  {
    word: "거액",
  },
  {
    word: "거울",
  },
  {
    word: "거짓",
  },
  {
    word: "거짓말",
  },
  {
    word: "거품",
  },
  {
    word: "걱정",
  },
  {
    word: "건강",
  },
  {
    word: "건너",
  },
  {
    word: "건너편",
  },
  {
    word: "건넌방",
  },
  {
    word: "건물",
  },
  {
    word: "건설",
  },
  {
    word: "건조",
  },
  {
    word: "건축",
  },
  {
    word: "걷기",
  },
  {
    word: "걸음",
  },
  {
    word: "검은색",
  },
  {
    word: "검정색",
  },
  {
    word: "검토",
  },
  {
    word: "겁",
  },
  {
    word: "겉",
  },
  {
    word: "게",
  },
  {
    word: "게시판",
  },
  {
    word: "게임",
  },
  {
    word: "겨울",
  },
  {
    word: "겨울철",
  },
  {
    word: "겨자",
  },
  {
    word: "견해",
  },
  {
    word: "결과",
  },
  {
    word: "결국",
  },
  {
    word: "결론",
  },
  {
    word: "결석",
  },
  {
    word: "결승",
  },
  {
    word: "결심",
  },
  {
    word: "결정",
  },
  {
    word: "결혼",
  },
  {
    word: "결혼식",
  },
  {
    word: "경계",
  },
  {
    word: "경고",
  },
  {
    word: "경기",
  },
  {
    word: "경기도",
  },
  {
    word: "경기장",
  },
  {
    word: "경력",
  },
  {
    word: "경복궁",
  },
  {
    word: "경비",
  },
  {
    word: "경상도",
  },
  {
    word: "경영",
  },
  {
    word: "경우",
  },
  {
    word: "경쟁",
  },
  {
    word: "경쟁력",
  },
  {
    word: "경제",
  },
  {
    word: "경제력",
  },
  {
    word: "경제학",
  },
  {
    word: "경주",
  },
  {
    word: "경찰",
  },
  {
    word: "경찰관",
  },
  {
    word: "경찰서",
  },
  {
    word: "경치",
  },
  {
    word: "경향",
  },
  {
    word: "경험",
  },
  {
    word: "곁",
  },
  {
    word: "계곡",
  },
  {
    word: "계단",
  },
  {
    word: "계란",
  },
  {
    word: "계산",
  },
  {
    word: "계산기",
  },
  {
    word: "계약",
  },
  {
    word: "계절",
  },
  {
    word: "계좌",
  },
  {
    word: "계층",
  },
  {
    word: "계획",
  },
  {
    word: "고개",
  },
  {
    word: "고객",
  },
  {
    word: "고교",
  },
  {
    word: "고구려",
  },
  {
    word: "고구마",
  },
  {
    word: "고궁",
  },
  {
    word: "고급",
  },
  {
    word: "고기",
  },
  {
    word: "고등학교",
  },
  {
    word: "고려",
  },
  {
    word: "고무신",
  },
  {
    word: "고민",
  },
  {
    word: "고생",
  },
  {
    word: "고속",
  },
  {
    word: "고속도로",
  },
  {
    word: "고속버스",
  },
  {
    word: "고양이",
  },
  {
    word: "고장",
  },
  {
    word: "고전",
  },
  {
    word: "고집",
  },
  {
    word: "고추장",
  },
  {
    word: "고춧가루",
  },
  {
    word: "고통",
  },
  {
    word: "고함",
  },
  {
    word: "고향",
  },
  {
    word: "곡",
  },
  {
    word: "곡식",
  },
  {
    word: "골",
  },
  {
    word: "골목",
  },
  {
    word: "골목길",
  },
  {
    word: "골짜기",
  },
  {
    word: "골치",
  },
  {
    word: "골프",
  },
  {
    word: "골프장",
  },
  {
    word: "곰",
  },
  {
    word: "곳",
  },
  {
    word: "곳곳",
  },
  {
    word: "공",
  },
  {
    word: "공간",
  },
  {
    word: "공개",
  },
  {
    word: "공격",
  },
  {
    word: "공공",
  },
  {
    word: "공군",
  },
  {
    word: "공급",
  },
  {
    word: "공기",
  },
  {
    word: "공동",
  },
  {
    word: "공부",
  },
  {
    word: "공사",
  },
  {
    word: "공식",
  },
  {
    word: "공업",
  },
  {
    word: "공연",
  },
  {
    word: "공연장",
  },
  {
    word: "공원",
  },
  {
    word: "공장",
  },
  {
    word: "공주",
  },
  {
    word: "공중",
  },
  {
    word: "공중전화",
  },
  {
    word: "공짜",
  },
  {
    word: "공책",
  },
  {
    word: "공통",
  },
  {
    word: "공통점",
  },
  {
    word: "공포",
  },
  {
    word: "공항",
  },
  {
    word: "공항버스",
  },
  {
    word: "공해",
  },
  {
    word: "공휴일",
  },
  {
    word: "과",
  },
  {
    word: "과거",
  },
  {
    word: "과목",
  },
  {
    word: "과외",
  },
  {
    word: "과일",
  },
  {
    word: "과자",
  },
  {
    word: "과장",
  },
  {
    word: "과정",
  },
  {
    word: "과제",
  },
  {
    word: "과학",
  },
  {
    word: "관객",
  },
  {
    word: "관계",
  },
  {
    word: "관계자",
  },
  {
    word: "관광",
  },
  {
    word: "관광객",
  },
  {
    word: "관광버스",
  },
  {
    word: "관광지",
  },
  {
    word: "관념",
  },
  {
    word: "관람",
  },
  {
    word: "관람객",
  },
  {
    word: "관련",
  },
  {
    word: "관리",
  },
  {
    word: "관습",
  },
  {
    word: "관심",
  },
  {
    word: "관심사",
  },
  {
    word: "관점",
  },
  {
    word: "관찰",
  },
  {
    word: "광경",
  },
  {
    word: "광고",
  },
  {
    word: "광장",
  },
  {
    word: "광주",
  },
  {
    word: "괴로움",
  },
  {
    word: "교과서",
  },
  {
    word: "교내",
  },
  {
    word: "교대",
  },
  {
    word: "교류",
  },
  {
    word: "교문",
  },
  {
    word: "교복",
  },
  {
    word: "교실",
  },
  {
    word: "교양",
  },
  {
    word: "교외",
  },
  {
    word: "교육",
  },
  {
    word: "교육비",
  },
  {
    word: "교장",
  },
  {
    word: "교재",
  },
  {
    word: "교직",
  },
  {
    word: "교체",
  },
  {
    word: "교통",
  },
  {
    word: "교통사고",
  },
  {
    word: "교포",
  },
  {
    word: "교환",
  },
  {
    word: "교회",
  },
  {
    word: "교훈",
  },
  {
    word: "구",
  },
  {
    word: "구경",
  },
  {
    word: "구두",
  },
  {
    word: "구름",
  },
  {
    word: "구멍",
  },
  {
    word: "구별",
  },
  {
    word: "구분",
  },
  {
    word: "구석",
  },
  {
    word: "구석구석",
  },
  {
    word: "구성",
  },
  {
    word: "구속",
  },
  {
    word: "구십",
  },
  {
    word: "구역",
  },
  {
    word: "구월",
  },
  {
    word: "구입",
  },
  {
    word: "구조",
  },
  {
    word: "구청",
  },
  {
    word: "국",
  },
  {
    word: "국가",
  },
  {
    word: "국기",
  },
  {
    word: "국내",
  },
  {
    word: "국내선",
  },
  {
    word: "국내외",
  },
  {
    word: "국립",
  },
  {
    word: "국물",
  },
  {
    word: "국민",
  },
  {
    word: "국사",
  },
  {
    word: "국산",
  },
  {
    word: "국수",
  },
  {
    word: "국어",
  },
  {
    word: "국왕",
  },
  {
    word: "국적",
  },
  {
    word: "국제",
  },
  {
    word: "국제선",
  },
  {
    word: "국제화",
  },
  {
    word: "국회",
  },
  {
    word: "군",
  },
  {
    word: "군대",
  },
  {
    word: "군사",
  },
  {
    word: "군인",
  },
  {
    word: "권리",
  },
  {
    word: "권위",
  },
  {
    word: "권투",
  },
  {
    word: "귀",
  },
  {
    word: "귀가",
  },
  {
    word: "귀국",
  },
  {
    word: "귀신",
  },
  {
    word: "귓속",
  },
  {
    word: "규모",
  },
  {
    word: "규정",
  },
  {
    word: "규칙",
  },
  {
    word: "균형",
  },
  {
    word: "귤",
  },
  {
    word: "그간",
  },
  {
    word: "그날",
  },
  {
    word: "그늘",
  },
  {
    word: "그다음",
  },
  {
    word: "그동안",
  },
  {
    word: "그때",
  },
  {
    word: "그래픽",
  },
  {
    word: "그렇게",
  },
  {
    word: "그룹",
  },
  {
    word: "그릇",
  },
  {
    word: "그리움",
  },
  {
    word: "그림",
  },
  {
    word: "그림자",
  },
  {
    word: "그사이",
  },
  {
    word: "그저께",
  },
  {
    word: "그전",
  },
  {
    word: "그중",
  },
  {
    word: "그해",
  },
  {
    word: "극",
  },
  {
    word: "극복",
  },
  {
    word: "극작가",
  },
  {
    word: "극장",
  },
  {
    word: "근거",
  },
  {
    word: "근교",
  },
  {
    word: "근래",
  },
  {
    word: "근로",
  },
  {
    word: "근무",
  },
  {
    word: "근본",
  },
  {
    word: "근원",
  },
  {
    word: "근육",
  },
  {
    word: "근처",
  },
  {
    word: "글",
  },
  {
    word: "글쓰기",
  },
  {
    word: "글씨",
  },
  {
    word: "글자",
  },
  {
    word: "금",
  },
  {
    word: "금강산",
  },
  {
    word: "금고",
  },
  {
    word: "금년",
  },
  {
    word: "금메달",
  },
  {
    word: "금액",
  },
  {
    word: "금연",
  },
  {
    word: "금요일",
  },
  {
    word: "금지",
  },
  {
    word: "급",
  },
  {
    word: "기",
  },
  {
    word: "기간",
  },
  {
    word: "기계",
  },
  {
    word: "기관",
  },
  {
    word: "기구",
  },
  {
    word: "기기",
  },
  {
    word: "기념",
  },
  {
    word: "기념일",
  },
  {
    word: "기념품",
  },
  {
    word: "기능",
  },
  {
    word: "기대",
  },
  {
    word: "기도",
  },
  {
    word: "기독교",
  },
  {
    word: "기둥",
  },
  {
    word: "기록",
  },
  {
    word: "기름",
  },
  {
    word: "기법",
  },
  {
    word: "기본",
  },
  {
    word: "기분",
  },
  {
    word: "기쁨",
  },
  {
    word: "기성",
  },
  {
    word: "기성세대",
  },
  {
    word: "기숙사",
  },
  {
    word: "기술",
  },
  {
    word: "기억",
  },
  {
    word: "기업",
  },
  {
    word: "기업인",
  },
  {
    word: "기여",
  },
  {
    word: "기온",
  },
  {
    word: "기운",
  },
  {
    word: "기원",
  },
  {
    word: "기원전",
  },
  {
    word: "기적",
  },
  {
    word: "기준",
  },
  {
    word: "기차",
  },
  {
    word: "기초",
  },
  {
    word: "기침",
  },
  {
    word: "기타",
  },
  {
    word: "기호",
  },
  {
    word: "기혼",
  },
  {
    word: "기회",
  },
  {
    word: "기획",
  },
  {
    word: "기후",
  },
  {
    word: "긴급",
  },
  {
    word: "긴장",
  },
  {
    word: "긴장감",
  },
  {
    word: "길",
  },
  {
    word: "길가",
  },
  {
    word: "길거리",
  },
  {
    word: "길이",
  },
  {
    word: "김",
  },
  {
    word: "김밥",
  },
  {
    word: "김치",
  },
  {
    word: "김치찌개",
  },
  {
    word: "김포공항",
  },
  {
    word: "깊이",
  },
  {
    word: "까닭",
  },
  {
    word: "까만색",
  },
  {
    word: "까치",
  },
  {
    word: "깍두기",
  },
  {
    word: "깡패",
  },
  {
    word: "깨달음",
  },
  {
    word: "깨소금",
  },
  {
    word: "껌",
  },
  {
    word: "껍질",
  },
  {
    word: "꼬리",
  },
  {
    word: "꼬마",
  },
  {
    word: "꼭대기",
  },
  {
    word: "꼴",
  },
  {
    word: "꽃",
  },
  {
    word: "꽃씨",
  },
  {
    word: "꽃잎",
  },
  {
    word: "꾸중",
  },
  {
    word: "꿀",
  },
  {
    word: "꿈",
  },
  {
    word: "꿈속",
  },
  {
    word: "끈",
  },
  {
    word: "끝",
  },
  {
    word: "끼",
  },
  {
    word: "나들이",
  },
  {
    word: "나라",
  },
  {
    word: "나머지",
  },
  {
    word: "나무",
  },
  {
    word: "나물",
  },
  {
    word: "나뭇가지",
  },
  {
    word: "나뭇잎",
  },
  {
    word: "나비",
  },
  {
    word: "나이",
  },
  {
    word: "나중",
  },
  {
    word: "나침반",
  },
  {
    word: "나흘",
  },
  {
    word: "낙엽",
  },
  {
    word: "낚시",
  },
  {
    word: "낚시꾼",
  },
  {
    word: "낚싯대",
  },
  {
    word: "난리",
  },
  {
    word: "난방",
  },
  {
    word: "날",
  },
  {
    word: "날개",
  },
  {
    word: "날씨",
  },
  {
    word: "날짜",
  },
  {
    word: "남대문",
  },
  {
    word: "남대문시장",
  },
  {
    word: "남미",
  },
  {
    word: "남부",
  },
  {
    word: "남북",
  },
  {
    word: "남산",
  },
  {
    word: "남쪽",
  },
  {
    word: "낭비",
  },
  {
    word: "낮",
  },
  {
    word: "낱말",
  },
  {
    word: "내과",
  },
  {
    word: "내년",
  },
  {
    word: "내달",
  },
  {
    word: "내부",
  },
  {
    word: "내외",
  },
  {
    word: "내용",
  },
  {
    word: "내용물",
  },
  {
    word: "내일",
  },
  {
    word: "내적",
  },
  {
    word: "내후년",
  },
  {
    word: "냄비",
  },
  {
    word: "냄새",
  },
  {
    word: "냇물",
  },
  {
    word: "냉동",
  },
  {
    word: "냉면",
  },
  {
    word: "냉방",
  },
  {
    word: "냉장고",
  },
  {
    word: "너머",
  },
  {
    word: "네거리",
  },
  {
    word: "넥타이",
  },
  {
    word: "노동",
  },
  {
    word: "노란색",
  },
  {
    word: "노래",
  },
  {
    word: "노래방",
  },
  {
    word: "노랫소리",
  },
  {
    word: "노력",
  },
  {
    word: "노선",
  },
  {
    word: "노인",
  },
  {
    word: "노트",
  },
  {
    word: "녹색",
  },
  {
    word: "녹음",
  },
  {
    word: "녹차",
  },
  {
    word: "녹화",
  },
  {
    word: "논",
  },
  {
    word: "논리",
  },
  {
    word: "논문",
  },
  {
    word: "논쟁",
  },
  {
    word: "놀이",
  },
  {
    word: "놀이터",
  },
  {
    word: "농구",
  },
  {
    word: "농담",
  },
  {
    word: "농민",
  },
  {
    word: "농부",
  },
  {
    word: "농사",
  },
  {
    word: "농사일",
  },
  {
    word: "농산물",
  },
  {
    word: "농업",
  },
  {
    word: "농장",
  },
  {
    word: "농촌",
  },
  {
    word: "높이",
  },
  {
    word: "뇌",
  },
  {
    word: "누나",
  },
  {
    word: "눈",
  },
  {
    word: "눈가",
  },
  {
    word: "눈길",
  },
  {
    word: "눈동자",
  },
  {
    word: "눈물",
  },
  {
    word: "눈병",
  },
  {
    word: "눈빛",
  },
  {
    word: "눈썹",
  },
  {
    word: "눈앞",
  },
  {
    word: "뉴스",
  },
  {
    word: "뉴욕",
  },
  {
    word: "느낌",
  },
  {
    word: "늑대",
  },
  {
    word: "능력",
  },
  {
    word: "늦가을",
  },
  {
    word: "다",
  },
  {
    word: "다리",
  },
  {
    word: "다방",
  },
  {
    word: "다수",
  },
  {
    word: "다양성",
  },
  {
    word: "다음",
  },
  {
    word: "다이어트",
  },
  {
    word: "다툼",
  },
  {
    word: "다행",
  },
  {
    word: "단",
  },
  {
    word: "단계",
  },
  {
    word: "단골",
  },
  {
    word: "단독",
  },
  {
    word: "단맛",
  },
  {
    word: "단순",
  },
  {
    word: "단어",
  },
  {
    word: "단위",
  },
  {
    word: "단점",
  },
  {
    word: "단지",
  },
  {
    word: "단체",
  },
  {
    word: "단추",
  },
  {
    word: "단편",
  },
  {
    word: "단풍",
  },
  {
    word: "달",
  },
  {
    word: "달걀",
  },
  {
    word: "달러",
  },
  {
    word: "달력",
  },
  {
    word: "달리기",
  },
  {
    word: "달빛",
  },
  {
    word: "닭",
  },
  {
    word: "닭고기",
  },
  {
    word: "담",
  },
  {
    word: "담당",
  },
  {
    word: "담배",
  },
  {
    word: "담요",
  },
  {
    word: "담임",
  },
  {
    word: "답",
  },
  {
    word: "답변",
  },
  {
    word: "답장",
  },
  {
    word: "닷새",
  },
  {
    word: "당근",
  },
  {
    word: "당시",
  },
  {
    word: "당장",
  },
  {
    word: "대",
  },
  {
    word: "대가",
  },
  {
    word: "대개",
  },
  {
    word: "대구",
  },
  {
    word: "대규모",
  },
  {
    word: "대기",
  },
  {
    word: "대기업",
  },
  {
    word: "대낮",
  },
  {
    word: "대다수",
  },
  {
    word: "대답",
  },
  {
    word: "대도시",
  },
  {
    word: "대량",
  },
  {
    word: "대륙",
  },
  {
    word: "대문",
  },
  {
    word: "대부분",
  },
  {
    word: "대비",
  },
  {
    word: "대사관",
  },
  {
    word: "대신",
  },
  {
    word: "대응",
  },
  {
    word: "대입",
  },
  {
    word: "대전",
  },
  {
    word: "대접",
  },
  {
    word: "대중",
  },
  {
    word: "대중교통",
  },
  {
    word: "대중문화",
  },
  {
    word: "대책",
  },
  {
    word: "대출",
  },
  {
    word: "대통령",
  },
  {
    word: "대표",
  },
  {
    word: "대학",
  },
  {
    word: "대학교",
  },
  {
    word: "대학로",
  },
  {
    word: "대학원",
  },
  {
    word: "대한민국",
  },
  {
    word: "대합실",
  },
  {
    word: "대형",
  },
  {
    word: "대화",
  },
  {
    word: "대회",
  },
  {
    word: "댁",
  },
  {
    word: "댐",
  },
  {
    word: "더위",
  },
  {
    word: "덕",
  },
  {
    word: "덕분",
  },
  {
    word: "덕수궁",
  },
  {
    word: "덩어리",
  },
  {
    word: "데이트",
  },
  {
    word: "도",
  },
  {
    word: "도구",
  },
  {
    word: "도덕",
  },
  {
    word: "도둑",
  },
  {
    word: "도로",
  },
  {
    word: "도마",
  },
  {
    word: "도망",
  },
  {
    word: "도서관",
  },
  {
    word: "도시",
  },
  {
    word: "도시락",
  },
  {
    word: "도심",
  },
  {
    word: "도움",
  },
  {
    word: "도움말",
  },
  {
    word: "도입",
  },
  {
    word: "도자기",
  },
  {
    word: "도장",
  },
  {
    word: "도전",
  },
  {
    word: "도중",
  },
  {
    word: "도착",
  },
  {
    word: "도쿄(동경)",
  },
  {
    word: "독감",
  },
  {
    word: "독립",
  },
  {
    word: "독서",
  },
  {
    word: "독일",
  },
  {
    word: "독일어",
  },
  {
    word: "돈",
  },
  {
    word: "돌",
  },
  {
    word: "돌멩이",
  },
  {
    word: "동그라미",
  },
  {
    word: "동기",
  },
  {
    word: "동네",
  },
  {
    word: "동대문",
  },
  {
    word: "동대문시장",
  },
  {
    word: "동료",
  },
  {
    word: "동물",
  },
  {
    word: "동물원",
  },
  {
    word: "동부",
  },
  {
    word: "동생",
  },
  {
    word: "동서",
  },
  {
    word: "동서남북",
  },
  {
    word: "동시",
  },
  {
    word: "동아리",
  },
  {
    word: "동안",
  },
  {
    word: "동양",
  },
  {
    word: "동양인",
  },
  {
    word: "동의",
  },
  {
    word: "동작",
  },
  {
    word: "동전",
  },
  {
    word: "동쪽",
  },
  {
    word: "동창",
  },
  {
    word: "동포",
  },
  {
    word: "동행",
  },
  {
    word: "동화",
  },
  {
    word: "동화책",
  },
  {
    word: "돼지",
  },
  {
    word: "돼지고기",
  },
  {
    word: "된장",
  },
  {
    word: "된장찌개",
  },
  {
    word: "두께",
  },
  {
    word: "두뇌",
  },
  {
    word: "두려움",
  },
  {
    word: "두부",
  },
  {
    word: "두통",
  },
  {
    word: "둥지",
  },
  {
    word: "뒤",
  },
  {
    word: "뒤쪽",
  },
  {
    word: "뒤편",
  },
  {
    word: "뒷골목",
  },
  {
    word: "뒷모습",
  },
  {
    word: "뒷문",
  },
  {
    word: "뒷산",
  },
  {
    word: "드라마",
  },
  {
    word: "들",
  },
  {
    word: "등",
  },
  {
    word: "등록",
  },
  {
    word: "등록금",
  },
  {
    word: "등록증",
  },
  {
    word: "등산",
  },
  {
    word: "등산로",
  },
  {
    word: "등장",
  },
  {
    word: "디스크",
  },
  {
    word: "디자인",
  },
  {
    word: "딸",
  },
  {
    word: "딸기",
  },
  {
    word: "딸아이",
  },
  {
    word: "땀",
  },
  {
    word: "땅",
  },
  {
    word: "땅바닥",
  },
  {
    word: "땅속",
  },
  {
    word: "땅콩",
  },
  {
    word: "때",
  },
  {
    word: "떡",
  },
  {
    word: "떡국",
  },
  {
    word: "떡볶이",
  },
  {
    word: "떼",
  },
  {
    word: "뚜껑",
  },
  {
    word: "뜰",
  },
  {
    word: "뜻",
  },
  {
    word: "뜻밖",
  },
  {
    word: "라디오",
  },
  {
    word: "라면",
  },
  {
    word: "라운드",
  },
  {
    word: "라이벌",
  },
  {
    word: "라이터",
  },
  {
    word: "라인",
  },
  {
    word: "라켓",
  },
  {
    word: "러시아",
  },
  {
    word: "런던",
  },
  {
    word: "레몬",
  },
  {
    word: "레스토랑",
  },
  {
    word: "레이저",
  },
  {
    word: "레저",
  },
  {
    word: "렌즈",
  },
  {
    word: "로봇",
  },
  {
    word: "로터리",
  },
  {
    word: "리그",
  },
  {
    word: "리듬",
  },
  {
    word: "마누라",
  },
  {
    word: "마늘",
  },
  {
    word: "마당",
  },
  {
    word: "마디",
  },
  {
    word: "마라톤",
  },
  {
    word: "마련",
  },
  {
    word: "마루",
  },
  {
    word: "마무리",
  },
  {
    word: "마사지",
  },
  {
    word: "마약",
  },
  {
    word: "마요네즈",
  },
  {
    word: "마을",
  },
  {
    word: "마음",
  },
  {
    word: "마음가짐",
  },
  {
    word: "마음속",
  },
  {
    word: "마음씨",
  },
  {
    word: "마이크",
  },
  {
    word: "마중",
  },
  {
    word: "마지막",
  },
  {
    word: "마찬가지",
  },
  {
    word: "마찰",
  },
  {
    word: "마크",
  },
  {
    word: "막걸리",
  },
  {
    word: "막내",
  },
  {
    word: "만남",
  },
  {
    word: "만두",
  },
  {
    word: "만세",
  },
  {
    word: "만약",
  },
  {
    word: "만일",
  },
  {
    word: "만점",
  },
  {
    word: "만족",
  },
  {
    word: "만화",
  },
  {
    word: "만화가",
  },
  {
    word: "말",
  },
  {
    word: "말기",
  },
  {
    word: "말씀",
  },
  {
    word: "말투",
  },
  {
    word: "맘",
  },
  {
    word: "맛",
  },
  {
    word: "망원경",
  },
  {
    word: "맞은편",
  },
  {
    word: "매",
  },
  {
    word: "매너",
  },
  {
    word: "매력",
  },
  {
    word: "매스컴",
  },
  {
    word: "매일",
  },
  {
    word: "매장",
  },
  {
    word: "매체",
  },
  {
    word: "맥주",
  },
  {
    word: "머리",
  },
  {
    word: "머리말",
  },
  {
    word: "머리카락",
  },
  {
    word: "머리칼",
  },
  {
    word: "머릿속",
  },
  {
    word: "먹이",
  },
  {
    word: "먼지",
  },
  {
    word: "멋",
  },
  {
    word: "메뉴",
  },
  {
    word: "메모",
  },
  {
    word: "메시지",
  },
  {
    word: "메일",
  },
  {
    word: "며느리",
  },
  {
    word: "며칠",
  },
  {
    word: "면",
  },
  {
    word: "면담",
  },
  {
    word: "면적",
  },
  {
    word: "면접",
  },
  {
    word: "멸치",
  },
  {
    word: "명단",
  },
  {
    word: "명령",
  },
  {
    word: "명령어",
  },
  {
    word: "명예",
  },
  {
    word: "명의",
  },
  {
    word: "명절",
  },
  {
    word: "명칭",
  },
  {
    word: "명함",
  },
  {
    word: "모기",
  },
  {
    word: "모니터",
  },
  {
    word: "모델",
  },
  {
    word: "모두",
  },
  {
    word: "모래",
  },
  {
    word: "모레",
  },
  {
    word: "모범",
  },
  {
    word: "모습",
  },
  {
    word: "모양",
  },
  {
    word: "모임",
  },
  {
    word: "모자",
  },
  {
    word: "모집",
  },
  {
    word: "모퉁이",
  },
  {
    word: "목",
  },
  {
    word: "목걸이",
  },
  {
    word: "목록",
  },
  {
    word: "목소리",
  },
  {
    word: "목숨",
  },
  {
    word: "목요일",
  },
  {
    word: "목욕",
  },
  {
    word: "목욕탕",
  },
  {
    word: "목적",
  },
  {
    word: "목표",
  },
  {
    word: "몸",
  },
  {
    word: "몸매",
  },
  {
    word: "몸무게",
  },
  {
    word: "몸살",
  },
  {
    word: "몸속",
  },
  {
    word: "몸짓",
  },
  {
    word: "몸통",
  },
  {
    word: "못",
  },
  {
    word: "묘사",
  },
  {
    word: "무",
  },
  {
    word: "무게",
  },
  {
    word: "무관심",
  },
  {
    word: "무궁화",
  },
  {
    word: "무기",
  },
  {
    word: "무늬",
  },
  {
    word: "무대",
  },
  {
    word: "무더위",
  },
  {
    word: "무덤",
  },
  {
    word: "무료",
  },
  {
    word: "무릎",
  },
  {
    word: "무리",
  },
  {
    word: "무역",
  },
  {
    word: "무용",
  },
  {
    word: "무용가",
  },
  {
    word: "무지개",
  },
  {
    word: "문",
  },
  {
    word: "문구",
  },
  {
    word: "문밖",
  },
  {
    word: "문법",
  },
  {
    word: "문서",
  },
  {
    word: "문자",
  },
  {
    word: "문장",
  },
  {
    word: "문제",
  },
  {
    word: "문제점",
  },
  {
    word: "문학",
  },
  {
    word: "문화",
  },
  {
    word: "문화재",
  },
  {
    word: "물",
  },
  {
    word: "물가",
  },
  {
    word: "물건",
  },
  {
    word: "물결",
  },
  {
    word: "물고기",
  },
  {
    word: "물기",
  },
  {
    word: "물론",
  },
  {
    word: "물리학",
  },
  {
    word: "물속",
  },
  {
    word: "물음",
  },
  {
    word: "물질",
  },
  {
    word: "물체",
  },
  {
    word: "미",
  },
  {
    word: "미국",
  },
  {
    word: "미니",
  },
  {
    word: "미디어",
  },
  {
    word: "미래",
  },
  {
    word: "미만",
  },
  {
    word: "미사일",
  },
  {
    word: "미소",
  },
  {
    word: "미술",
  },
  {
    word: "미술관",
  },
  {
    word: "미스",
  },
  {
    word: "미역",
  },
  {
    word: "미용실",
  },
  {
    word: "미움",
  },
  {
    word: "미인",
  },
  {
    word: "미팅",
  },
  {
    word: "미혼",
  },
  {
    word: "민간",
  },
  {
    word: "민속",
  },
  {
    word: "민족",
  },
  {
    word: "믿음",
  },
  {
    word: "밀가루",
  },
  {
    word: "밑",
  },
  {
    word: "밑바닥",
  },
  {
    word: "바",
  },
  {
    word: "바가지",
  },
  {
    word: "바구니",
  },
  {
    word: "바깥",
  },
  {
    word: "바깥쪽",
  },
  {
    word: "바나나",
  },
  {
    word: "바늘",
  },
  {
    word: "바다",
  },
  {
    word: "바닥",
  },
  {
    word: "바닷가",
  },
  {
    word: "바닷물",
  },
  {
    word: "바람",
  },
  {
    word: "바보",
  },
  {
    word: "바위",
  },
  {
    word: "바이러스",
  },
  {
    word: "바이올린",
  },
  {
    word: "바지",
  },
  {
    word: "바퀴",
  },
  {
    word: "바탕",
  },
  {
    word: "박물관",
  },
  {
    word: "박수",
  },
  {
    word: "박스",
  },
  {
    word: "밖",
  },
  {
    word: "반",
  },
  {
    word: "반대",
  },
  {
    word: "반대편",
  },
  {
    word: "반말",
  },
  {
    word: "반면",
  },
  {
    word: "반발",
  },
  {
    word: "반성",
  },
  {
    word: "반응",
  },
  {
    word: "반장",
  },
  {
    word: "반죽",
  },
  {
    word: "반지",
  },
  {
    word: "반찬",
  },
  {
    word: "받침",
  },
  {
    word: "발",
  },
  {
    word: "발가락",
  },
  {
    word: "발걸음",
  },
  {
    word: "발견",
  },
  {
    word: "발길",
  },
  {
    word: "발끝",
  },
  {
    word: "발달",
  },
  {
    word: "발등",
  },
  {
    word: "발레",
  },
  {
    word: "발목",
  },
  {
    word: "발바닥",
  },
  {
    word: "발생",
  },
  {
    word: "발음",
  },
  {
    word: "발자국",
  },
  {
    word: "발전",
  },
  {
    word: "발톱",
  },
  {
    word: "발표",
  },
  {
    word: "밤",
  },
  {
    word: "밤낮",
  },
  {
    word: "밤새",
  },
  {
    word: "밤색",
  },
  {
    word: "밤중",
  },
  {
    word: "밤하늘",
  },
  {
    word: "밥",
  },
  {
    word: "밥그릇",
  },
  {
    word: "밥맛",
  },
  {
    word: "밥상",
  },
  {
    word: "밥솥",
  },
  {
    word: "방",
  },
  {
    word: "방면",
  },
  {
    word: "방문",
  },
  {
    word: "방바닥",
  },
  {
    word: "방법",
  },
  {
    word: "방송",
  },
  {
    word: "방송국",
  },
  {
    word: "방송사",
  },
  {
    word: "방식",
  },
  {
    word: "방안",
  },
  {
    word: "방울",
  },
  {
    word: "방지",
  },
  {
    word: "방학",
  },
  {
    word: "방해",
  },
  {
    word: "방향",
  },
  {
    word: "밭",
  },
  {
    word: "배",
  },
  {
    word: "배경",
  },
  {
    word: "배구",
  },
  {
    word: "배꼽",
  },
  {
    word: "배달",
  },
  {
    word: "배드민턴",
  },
  {
    word: "배우",
  },
  {
    word: "배추",
  },
  {
    word: "배추김치",
  },
  {
    word: "배치",
  },
  {
    word: "백두산",
  },
  {
    word: "백색",
  },
  {
    word: "백성",
  },
  {
    word: "백인",
  },
  {
    word: "백제",
  },
  {
    word: "백화점",
  },
  {
    word: "뱀",
  },
  {
    word: "버릇",
  },
  {
    word: "버섯",
  },
  {
    word: "버스",
  },
  {
    word: "버터",
  },
  {
    word: "버튼",
  },
  {
    word: "번개",
  },
  {
    word: "번역",
  },
  {
    word: "번지",
  },
  {
    word: "번호",
  },
  {
    word: "벌",
  },
  {
    word: "벌금",
  },
  {
    word: "벌레",
  },
  {
    word: "범위",
  },
  {
    word: "범인",
  },
  {
    word: "범죄",
  },
  {
    word: "법",
  },
  {
    word: "법률",
  },
  {
    word: "법원",
  },
  {
    word: "법칙",
  },
  {
    word: "베개",
  },
  {
    word: "베이징(북경)",
  },
  {
    word: "벤치",
  },
  {
    word: "벨트",
  },
  {
    word: "벼",
  },
  {
    word: "벽",
  },
  {
    word: "변경",
  },
  {
    word: "변동",
  },
  {
    word: "변명",
  },
  {
    word: "변신",
  },
  {
    word: "변화",
  },
  {
    word: "별",
  },
  {
    word: "별도",
  },
  {
    word: "별명",
  },
  {
    word: "별일",
  },
  {
    word: "병",
  },
  {
    word: "병실",
  },
  {
    word: "병아리",
  },
  {
    word: "병원",
  },
  {
    word: "보고",
  },
  {
    word: "보고서",
  },
  {
    word: "보관",
  },
  {
    word: "보너스",
  },
  {
    word: "보도",
  },
  {
    word: "보라색",
  },
  {
    word: "보람",
  },
  {
    word: "보름",
  },
  {
    word: "보리",
  },
  {
    word: "보상",
  },
  {
    word: "보수",
  },
  {
    word: "보안",
  },
  {
    word: "보자기",
  },
  {
    word: "보장",
  },
  {
    word: "보전",
  },
  {
    word: "보조",
  },
  {
    word: "보존",
  },
  {
    word: "보통",
  },
  {
    word: "보험",
  },
  {
    word: "보호",
  },
  {
    word: "복",
  },
  {
    word: "복도",
  },
  {
    word: "복사",
  },
  {
    word: "복사기",
  },
  {
    word: "복숭아",
  },
  {
    word: "복습",
  },
  {
    word: "볶음",
  },
  {
    word: "볶음밥",
  },
  {
    word: "본래",
  },
  {
    word: "본부",
  },
  {
    word: "본사",
  },
  {
    word: "본성",
  },
  {
    word: "본인",
  },
  {
    word: "본질",
  },
  {
    word: "볼",
  },
  {
    word: "볼링",
  },
  {
    word: "볼일",
  },
  {
    word: "볼펜",
  },
  {
    word: "봄",
  },
  {
    word: "봉사",
  },
  {
    word: "봉지",
  },
  {
    word: "봉투",
  },
  {
    word: "부",
  },
  {
    word: "부근",
  },
  {
    word: "부끄러움",
  },
  {
    word: "부담",
  },
  {
    word: "부대",
  },
  {
    word: "부동산",
  },
  {
    word: "부모",
  },
  {
    word: "부문",
  },
  {
    word: "부부",
  },
  {
    word: "부분",
  },
  {
    word: "부산",
  },
  {
    word: "부상",
  },
  {
    word: "부서",
  },
  {
    word: "부엌",
  },
  {
    word: "부위",
  },
  {
    word: "부인",
  },
  {
    word: "부작용",
  },
  {
    word: "부잣집",
  },
  {
    word: "부장",
  },
  {
    word: "부재",
  },
  {
    word: "부정",
  },
  {
    word: "부족",
  },
  {
    word: "부채",
  },
  {
    word: "부처",
  },
  {
    word: "부친",
  },
  {
    word: "부탁",
  },
  {
    word: "부품",
  },
  {
    word: "부피",
  },
  {
    word: "부회장",
  },
  {
    word: "북",
  },
  {
    word: "북부",
  },
  {
    word: "북쪽",
  },
  {
    word: "북한",
  },
  {
    word: "분노",
  },
  {
    word: "분량",
  },
  {
    word: "분리",
  },
  {
    word: "분석",
  },
  {
    word: "분야",
  },
  {
    word: "분위기",
  },
  {
    word: "분필",
  },
  {
    word: "분홍색",
  },
  {
    word: "불",
  },
  {
    word: "불고기",
  },
  {
    word: "불교",
  },
  {
    word: "불꽃",
  },
  {
    word: "불만",
  },
  {
    word: "불법",
  },
  {
    word: "불빛",
  },
  {
    word: "불안",
  },
  {
    word: "불이익",
  },
  {
    word: "불편",
  },
  {
    word: "불평",
  },
  {
    word: "불행",
  },
  {
    word: "브랜드",
  },
  {
    word: "블라우스",
  },
  {
    word: "비",
  },
  {
    word: "비교",
  },
  {
    word: "비극",
  },
  {
    word: "비난",
  },
  {
    word: "비누",
  },
  {
    word: "비닐",
  },
  {
    word: "비닐봉지",
  },
  {
    word: "비둘기",
  },
  {
    word: "비디오",
  },
  {
    word: "비만",
  },
  {
    word: "비명",
  },
  {
    word: "비밀",
  },
  {
    word: "비바람",
  },
  {
    word: "비빔밥",
  },
  {
    word: "비상",
  },
  {
    word: "비서",
  },
  {
    word: "비용",
  },
  {
    word: "비율",
  },
  {
    word: "비중",
  },
  {
    word: "비타민",
  },
  {
    word: "비판",
  },
  {
    word: "비행",
  },
  {
    word: "비행기",
  },
  {
    word: "비행장",
  },
  {
    word: "빌딩",
  },
  {
    word: "빗",
  },
  {
    word: "빗물",
  },
  {
    word: "빗방울",
  },
  {
    word: "빗줄기",
  },
  {
    word: "빚",
  },
  {
    word: "빛",
  },
  {
    word: "빛깔",
  },
  {
    word: "빨간색",
  },
  {
    word: "빨래",
  },
  {
    word: "빵",
  },
  {
    word: "뺨",
  },
  {
    word: "뼈",
  },
  {
    word: "뿌리",
  },
  {
    word: "사건",
  },
  {
    word: "사계절",
  },
  {
    word: "사고",
  },
  {
    word: "사과",
  },
  {
    word: "사기",
  },
  {
    word: "사나이",
  },
  {
    word: "사냥",
  },
  {
    word: "사랑",
  },
  {
    word: "사례",
  },
  {
    word: "사립",
  },
  {
    word: "사망",
  },
  {
    word: "사무",
  },
  {
    word: "사무소",
  },
  {
    word: "사무실",
  },
  {
    word: "사무직",
  },
  {
    word: "사물",
  },
  {
    word: "사방",
  },
  {
    word: "사상",
  },
  {
    word: "사생활",
  },
  {
    word: "사설",
  },
  {
    word: "사슴",
  },
  {
    word: "사실",
  },
  {
    word: "사업",
  },
  {
    word: "사용",
  },
  {
    word: "사원",
  },
  {
    word: "사월",
  },
  {
    word: "사이",
  },
  {
    word: "사자",
  },
  {
    word: "사장",
  },
  {
    word: "사전",
  },
  {
    word: "사정",
  },
  {
    word: "사진",
  },
  {
    word: "사진기",
  },
  {
    word: "사춘기",
  },
  {
    word: "사탕",
  },
  {
    word: "사투리",
  },
  {
    word: "사표",
  },
  {
    word: "사회",
  },
  {
    word: "사회생활",
  },
  {
    word: "사회주의",
  },
  {
    word: "사회학",
  },
  {
    word: "사흘",
  },
  {
    word: "산",
  },
  {
    word: "산길",
  },
  {
    word: "산부인과",
  },
  {
    word: "산소",
  },
  {
    word: "산속",
  },
  {
    word: "산업",
  },
  {
    word: "산책",
  },
  {
    word: "살",
  },
  {
    word: "살림",
  },
  {
    word: "살인",
  },
  {
    word: "삶",
  },
  {
    word: "삼계탕",
  },
  {
    word: "삼국",
  },
  {
    word: "삼월",
  },
  {
    word: "상",
  },
  {
    word: "상관",
  },
  {
    word: "상금",
  },
  {
    word: "상담",
  },
  {
    word: "상당",
  },
  {
    word: "상당수",
  },
  {
    word: "상대",
  },
  {
    word: "상대방",
  },
  {
    word: "상대성",
  },
  {
    word: "상대편",
  },
  {
    word: "상류",
  },
  {
    word: "상반기",
  },
  {
    word: "상상",
  },
  {
    word: "상상력",
  },
  {
    word: "상식",
  },
  {
    word: "상업",
  },
  {
    word: "상인",
  },
  {
    word: "상자",
  },
  {
    word: "상점",
  },
  {
    word: "상처",
  },
  {
    word: "상추",
  },
  {
    word: "상태",
  },
  {
    word: "상표",
  },
  {
    word: "상품",
  },
  {
    word: "상황",
  },
  {
    word: "새",
  },
  {
    word: "새끼",
  },
  {
    word: "새벽",
  },
  {
    word: "새소리",
  },
  {
    word: "새우",
  },
  {
    word: "새해",
  },
  {
    word: "색",
  },
  {
    word: "색깔",
  },
  {
    word: "색연필",
  },
  {
    word: "샌드위치",
  },
  {
    word: "생",
  },
  {
    word: "생각",
  },
  {
    word: "생기",
  },
  {
    word: "생명",
  },
  {
    word: "생물",
  },
  {
    word: "생방송",
  },
  {
    word: "생산",
  },
  {
    word: "생산력",
  },
  {
    word: "생선",
  },
  {
    word: "생신",
  },
  {
    word: "생일",
  },
  {
    word: "생활",
  },
  {
    word: "생활비",
  },
  {
    word: "생활수준",
  },
  {
    word: "생활용품",
  },
  {
    word: "생활환경",
  },
  {
    word: "샤워",
  },
  {
    word: "서구",
  },
  {
    word: "서랍",
  },
  {
    word: "서로",
  },
  {
    word: "서류",
  },
  {
    word: "서명",
  },
  {
    word: "서민",
  },
  {
    word: "서부",
  },
  {
    word: "서비스",
  },
  {
    word: "서양",
  },
  {
    word: "서양인",
  },
  {
    word: "서울",
  },
  {
    word: "서울역",
  },
  {
    word: "서적",
  },
  {
    word: "서점",
  },
  {
    word: "서쪽",
  },
  {
    word: "서클",
  },
  {
    word: "석유",
  },
  {
    word: "선",
  },
  {
    word: "선거",
  },
  {
    word: "선물",
  },
  {
    word: "선배",
  },
  {
    word: "선생",
  },
  {
    word: "선원",
  },
  {
    word: "선장",
  },
  {
    word: "선전",
  },
  {
    word: "선진",
  },
  {
    word: "선진국",
  },
  {
    word: "선택",
  },
  {
    word: "선풍기",
  },
  {
    word: "설거지",
  },
  {
    word: "설날",
  },
  {
    word: "설렁탕",
  },
  {
    word: "설명",
  },
  {
    word: "설문",
  },
  {
    word: "설악산",
  },
  {
    word: "설치",
  },
  {
    word: "설탕",
  },
  {
    word: "섬",
  },
  {
    word: "섭씨",
  },
  {
    word: "성격",
  },
  {
    word: "성경",
  },
  {
    word: "성공",
  },
  {
    word: "성당",
  },
  {
    word: "성명",
  },
  {
    word: "성장",
  },
  {
    word: "성질",
  },
  {
    word: "성함",
  },
  {
    word: "세계",
  },
  {
    word: "세계관",
  },
  {
    word: "세금",
  },
  {
    word: "세기",
  },
  {
    word: "세대",
  },
  {
    word: "세로",
  },
  {
    word: "세미나",
  },
  {
    word: "세상",
  },
  {
    word: "세수",
  },
  {
    word: "세월",
  },
  {
    word: "세제",
  },
  {
    word: "세종대왕",
  },
  {
    word: "세탁",
  },
  {
    word: "세탁기",
  },
  {
    word: "세탁소",
  },
  {
    word: "세트",
  },
  {
    word: "센터",
  },
  {
    word: "소",
  },
  {
    word: "소개",
  },
  {
    word: "소규모",
  },
  {
    word: "소금",
  },
  {
    word: "소나기",
  },
  {
    word: "소나무",
  },
  {
    word: "소녀",
  },
  {
    word: "소년",
  },
  {
    word: "소득",
  },
  {
    word: "소리",
  },
  {
    word: "소망",
  },
  {
    word: "소매",
  },
  {
    word: "소문",
  },
  {
    word: "소비",
  },
  {
    word: "소설",
  },
  {
    word: "소설가",
  },
  {
    word: "소속",
  },
  {
    word: "소수",
  },
  {
    word: "소스",
  },
  {
    word: "소시지",
  },
  {
    word: "소식",
  },
  {
    word: "소아과",
  },
  {
    word: "소용",
  },
  {
    word: "소원",
  },
  {
    word: "소유",
  },
  {
    word: "소음",
  },
  {
    word: "소재",
  },
  {
    word: "소주",
  },
  {
    word: "소지품",
  },
  {
    word: "소질",
  },
  {
    word: "소파",
  },
  {
    word: "소포",
  },
  {
    word: "소풍",
  },
  {
    word: "소프트웨어",
  },
  {
    word: "소형",
  },
  {
    word: "소화",
  },
  {
    word: "속",
  },
  {
    word: "속담",
  },
  {
    word: "속도",
  },
  {
    word: "속마음",
  },
  {
    word: "속옷",
  },
  {
    word: "손",
  },
  {
    word: "손가락",
  },
  {
    word: "손길",
  },
  {
    word: "손녀",
  },
  {
    word: "손등",
  },
  {
    word: "손목",
  },
  {
    word: "손바닥",
  },
  {
    word: "손발",
  },
  {
    word: "손뼉",
  },
  {
    word: "손수건",
  },
  {
    word: "손실",
  },
  {
    word: "손잡이",
  },
  {
    word: "손질",
  },
  {
    word: "손톱",
  },
  {
    word: "손해",
  },
  {
    word: "솜",
  },
  {
    word: "솜씨",
  },
  {
    word: "송아지",
  },
  {
    word: "송이",
  },
  {
    word: "송편",
  },
  {
    word: "쇠",
  },
  {
    word: "쇠고기",
  },
  {
    word: "쇼",
  },
  {
    word: "쇼핑",
  },
  {
    word: "수",
  },
  {
    word: "수건",
  },
  {
    word: "수고",
  },
  {
    word: "수년",
  },
  {
    word: "수단",
  },
  {
    word: "수도",
  },
  {
    word: "수도권",
  },
  {
    word: "수도꼭지",
  },
  {
    word: "수돗물",
  },
  {
    word: "수면",
  },
  {
    word: "수명",
  },
  {
    word: "수박",
  },
  {
    word: "수상",
  },
  {
    word: "수석",
  },
  {
    word: "수술",
  },
  {
    word: "수업",
  },
  {
    word: "수염",
  },
  {
    word: "수영",
  },
  {
    word: "수영장",
  },
  {
    word: "수요",
  },
  {
    word: "수요일",
  },
  {
    word: "수입",
  },
  {
    word: "수입품",
  },
  {
    word: "수저",
  },
  {
    word: "수준",
  },
  {
    word: "수집",
  },
  {
    word: "수출",
  },
  {
    word: "수컷",
  },
  {
    word: "수표",
  },
  {
    word: "수필",
  },
  {
    word: "수학",
  },
  {
    word: "수화기",
  },
  {
    word: "숙녀",
  },
  {
    word: "숙소",
  },
  {
    word: "숙제",
  },
  {
    word: "순간",
  },
  {
    word: "순서",
  },
  {
    word: "순수",
  },
  {
    word: "순식간",
  },
  {
    word: "순위",
  },
  {
    word: "숟가락",
  },
  {
    word: "술",
  },
  {
    word: "술병",
  },
  {
    word: "술자리",
  },
  {
    word: "술잔",
  },
  {
    word: "술집",
  },
  {
    word: "숨",
  },
  {
    word: "숫자",
  },
  {
    word: "숲",
  },
  {
    word: "슈퍼마켓",
  },
  {
    word: "스스로",
  },
  {
    word: "스승",
  },
  {
    word: "스웨터",
  },
  {
    word: "스위치",
  },
  {
    word: "스케이트",
  },
  {
    word: "스케줄",
  },
  {
    word: "스키",
  },
  {
    word: "스키장",
  },
  {
    word: "스타",
  },
  {
    word: "스타일",
  },
  {
    word: "스튜디오",
  },
  {
    word: "스트레스",
  },
  {
    word: "스포츠",
  },
  {
    word: "슬픔",
  },
  {
    word: "습관",
  },
  {
    word: "습기",
  },
  {
    word: "승객",
  },
  {
    word: "승리",
  },
  {
    word: "승부",
  },
  {
    word: "승용차",
  },
  {
    word: "승진",
  },
  {
    word: "시",
  },
  {
    word: "시각",
  },
  {
    word: "시간",
  },
  {
    word: "시계",
  },
  {
    word: "시골",
  },
  {
    word: "시금치",
  },
  {
    word: "시기",
  },
  {
    word: "시나리오",
  },
  {
    word: "시내",
  },
  {
    word: "시내버스",
  },
  {
    word: "시대",
  },
  {
    word: "시댁",
  },
  {
    word: "시도",
  },
  {
    word: "시디",
  },
  {
    word: "시디롬",
  },
  {
    word: "시리즈",
  },
  {
    word: "시멘트",
  },
  {
    word: "시민",
  },
  {
    word: "시부모",
  },
  {
    word: "시선",
  },
  {
    word: "시설",
  },
  {
    word: "시스템",
  },
  {
    word: "시야",
  },
  {
    word: "시외",
  },
  {
    word: "시외버스",
  },
  {
    word: "시월",
  },
  {
    word: "시위",
  },
  {
    word: "시인",
  },
  {
    word: "시일",
  },
  {
    word: "시작",
  },
  {
    word: "시장",
  },
  {
    word: "시절",
  },
  {
    word: "시점",
  },
  {
    word: "시중",
  },
  {
    word: "시즌",
  },
  {
    word: "시집",
  },
  {
    word: "시청",
  },
  {
    word: "시청률",
  },
  {
    word: "시합",
  },
  {
    word: "시험",
  },
  {
    word: "식구",
  },
  {
    word: "식기",
  },
  {
    word: "식당",
  },
  {
    word: "식량",
  },
  {
    word: "식료품",
  },
  {
    word: "식물",
  },
  {
    word: "식빵",
  },
  {
    word: "식사",
  },
  {
    word: "식생활",
  },
  {
    word: "식욕",
  },
  {
    word: "식용유",
  },
  {
    word: "식초",
  },
  {
    word: "식탁",
  },
  {
    word: "식품",
  },
  {
    word: "식품점",
  },
  {
    word: "신",
  },
  {
    word: "신경",
  },
  {
    word: "신고",
  },
  {
    word: "신규",
  },
  {
    word: "신념",
  },
  {
    word: "신라",
  },
  {
    word: "신랑",
  },
  {
    word: "신문",
  },
  {
    word: "신문사",
  },
  {
    word: "신문지",
  },
  {
    word: "신발",
  },
  {
    word: "신부",
  },
  {
    word: "신분",
  },
  {
    word: "신비",
  },
  {
    word: "신설",
  },
  {
    word: "신세",
  },
  {
    word: "신세대",
  },
  {
    word: "신용",
  },
  {
    word: "신인",
  },
  {
    word: "신입생",
  },
  {
    word: "신제품",
  },
  {
    word: "신청",
  },
  {
    word: "신청서",
  },
  {
    word: "신체",
  },
  {
    word: "신호",
  },
  {
    word: "신호등",
  },
  {
    word: "신혼부부",
  },
  {
    word: "신혼여행",
  },
  {
    word: "신화",
  },
  {
    word: "실",
  },
  {
    word: "실감",
  },
  {
    word: "실내",
  },
  {
    word: "실력",
  },
  {
    word: "실례",
  },
  {
    word: "실망",
  },
  {
    word: "실수",
  },
  {
    word: "실습",
  },
  {
    word: "실시",
  },
  {
    word: "실장",
  },
  {
    word: "실정",
  },
  {
    word: "실제",
  },
  {
    word: "실천",
  },
  {
    word: "실체",
  },
  {
    word: "실태",
  },
  {
    word: "실패",
  },
  {
    word: "실험",
  },
  {
    word: "실현",
  },
  {
    word: "심리",
  },
  {
    word: "심부름",
  },
  {
    word: "심사",
  },
  {
    word: "심장",
  },
  {
    word: "심정",
  },
  {
    word: "심판",
  },
  {
    word: "십이월",
  },
  {
    word: "십일월",
  },
  {
    word: "싸구려",
  },
  {
    word: "싸움",
  },
  {
    word: "싼값",
  },
  {
    word: "쌀",
  },
  {
    word: "쌍",
  },
  {
    word: "쌍둥이",
  },
  {
    word: "쓰레기",
  },
  {
    word: "쓰레기통",
  },
  {
    word: "쓴맛",
  },
  {
    word: "씨",
  },
  {
    word: "씨름",
  },
  {
    word: "씨앗",
  },
  {
    word: "아가씨",
  },
  {
    word: "아기",
  },
  {
    word: "아까",
  },
  {
    word: "아나운서",
  },
  {
    word: "아내",
  },
  {
    word: "아들",
  },
  {
    word: "아래",
  },
  {
    word: "아래쪽",
  },
  {
    word: "아래층",
  },
  {
    word: "아르바이트",
  },
  {
    word: "아무것",
  },
  {
    word: "아쉬움",
  },
  {
    word: "아스팔트",
  },
  {
    word: "아시아",
  },
  {
    word: "아이",
  },
  {
    word: "아이디어",
  },
  {
    word: "아이스크림",
  },
  {
    word: "아저씨",
  },
  {
    word: "아주머니",
  },
  {
    word: "아줌마",
  },
  {
    word: "아침",
  },
  {
    word: "아파트",
  },
  {
    word: "아프리카",
  },
  {
    word: "아픔",
  },
  {
    word: "악기",
  },
  {
    word: "악몽",
  },
  {
    word: "악수",
  },
  {
    word: "안",
  },
  {
    word: "안개",
  },
  {
    word: "안경",
  },
  {
    word: "안과",
  },
  {
    word: "안내",
  },
  {
    word: "안동",
  },
  {
    word: "안방",
  },
  {
    word: "안부",
  },
  {
    word: "안전",
  },
  {
    word: "안정",
  },
  {
    word: "안주",
  },
  {
    word: "안쪽",
  },
  {
    word: "안팎",
  },
  {
    word: "알",
  },
  {
    word: "알루미늄",
  },
  {
    word: "알코올",
  },
  {
    word: "암",
  },
  {
    word: "암시",
  },
  {
    word: "암컷",
  },
  {
    word: "압력",
  },
  {
    word: "앞",
  },
  {
    word: "앞길",
  },
  {
    word: "앞날",
  },
  {
    word: "앞뒤",
  },
  {
    word: "앞문",
  },
  {
    word: "앞바다",
  },
  {
    word: "앞쪽",
  },
  {
    word: "애",
  },
  {
    word: "애인",
  },
  {
    word: "애정",
  },
  {
    word: "애초",
  },
  {
    word: "액세서리",
  },
  {
    word: "액수",
  },
  {
    word: "앨범",
  },
  {
    word: "야간",
  },
  {
    word: "야구",
  },
  {
    word: "야구장",
  },
  {
    word: "야단",
  },
  {
    word: "야외",
  },
  {
    word: "야채",
  },
  {
    word: "약",
  },
  {
    word: "약간",
  },
  {
    word: "약국",
  },
  {
    word: "약속",
  },
  {
    word: "약수",
  },
  {
    word: "약점",
  },
  {
    word: "약품",
  },
  {
    word: "약혼녀",
  },
  {
    word: "양",
  },
  {
    word: "양국",
  },
  {
    word: "양념",
  },
  {
    word: "양력",
  },
  {
    word: "양말",
  },
  {
    word: "양배추",
  },
  {
    word: "양보",
  },
  {
    word: "양복",
  },
  {
    word: "양상추",
  },
  {
    word: "양식",
  },
  {
    word: "양심",
  },
  {
    word: "양옆",
  },
  {
    word: "양주",
  },
  {
    word: "양쪽",
  },
  {
    word: "양파",
  },
  {
    word: "얘기",
  },
  {
    word: "어깨",
  },
  {
    word: "어둠",
  },
  {
    word: "어려움",
  },
  {
    word: "어른",
  },
  {
    word: "어린아이",
  },
  {
    word: "어린애",
  },
  {
    word: "어린이",
  },
  {
    word: "어린이날",
  },
  {
    word: "어저께",
  },
  {
    word: "어제",
  },
  {
    word: "어젯밤",
  },
  {
    word: "언덕",
  },
  {
    word: "언론",
  },
  {
    word: "언어",
  },
  {
    word: "얼굴",
  },
  {
    word: "얼마",
  },
  {
    word: "얼마간",
  },
  {
    word: "얼음",
  },
  {
    word: "업무",
  },
  {
    word: "업종",
  },
  {
    word: "업체",
  },
  {
    word: "엉망",
  },
  {
    word: "엉터리",
  },
  {
    word: "에너지",
  },
  {
    word: "에어컨",
  },
  {
    word: "엔진",
  },
  {
    word: "엘리베이터",
  },
  {
    word: "여가",
  },
  {
    word: "여건",
  },
  {
    word: "여관",
  },
  {
    word: "여권",
  },
  {
    word: "여기저기",
  },
  {
    word: "여럿",
  },
  {
    word: "여론",
  },
  {
    word: "여름",
  },
  {
    word: "여름철",
  },
  {
    word: "여우",
  },
  {
    word: "여유",
  },
  {
    word: "여행",
  },
  {
    word: "여행사",
  },
  {
    word: "역",
  },
  {
    word: "역사",
  },
  {
    word: "역사상",
  },
  {
    word: "역사학",
  },
  {
    word: "역할",
  },
  {
    word: "연간",
  },
  {
    word: "연결",
  },
  {
    word: "연관",
  },
  {
    word: "연구",
  },
  {
    word: "연구소",
  },
  {
    word: "연구실",
  },
  {
    word: "연극",
  },
  {
    word: "연기",
  },
  {
    word: "연두색",
  },
  {
    word: "연락",
  },
  {
    word: "연락처",
  },
  {
    word: "연령",
  },
  {
    word: "연말",
  },
  {
    word: "연설",
  },
  {
    word: "연세",
  },
  {
    word: "연속",
  },
  {
    word: "연습",
  },
  {
    word: "연애",
  },
  {
    word: "연예인",
  },
  {
    word: "연인",
  },
  {
    word: "연장",
  },
  {
    word: "연주",
  },
  {
    word: "연출",
  },
  {
    word: "연필",
  },
  {
    word: "연합",
  },
  {
    word: "연휴",
  },
  {
    word: "열",
  },
  {
    word: "열기",
  },
  {
    word: "열매",
  },
  {
    word: "열쇠",
  },
  {
    word: "열정",
  },
  {
    word: "열차",
  },
  {
    word: "열흘",
  },
  {
    word: "염려",
  },
  {
    word: "엽서",
  },
  {
    word: "영국",
  },
  {
    word: "영남",
  },
  {
    word: "영상",
  },
  {
    word: "영양",
  },
  {
    word: "영어",
  },
  {
    word: "영업",
  },
  {
    word: "영역",
  },
  {
    word: "영웅",
  },
  {
    word: "영하",
  },
  {
    word: "영향",
  },
  {
    word: "영향력",
  },
  {
    word: "영혼",
  },
  {
    word: "영화",
  },
  {
    word: "영화관",
  },
  {
    word: "영화배우",
  },
  {
    word: "영화제",
  },
  {
    word: "옆",
  },
  {
    word: "옆구리",
  },
  {
    word: "옆방",
  },
  {
    word: "옆집",
  },
  {
    word: "예",
  },
  {
    word: "예감",
  },
  {
    word: "예금",
  },
  {
    word: "예방",
  },
  {
    word: "예보",
  },
  {
    word: "예비",
  },
  {
    word: "예산",
  },
  {
    word: "예상",
  },
  {
    word: "예선",
  },
  {
    word: "예술",
  },
  {
    word: "예술가",
  },
  {
    word: "예습",
  },
  {
    word: "예식장",
  },
  {
    word: "예약",
  },
  {
    word: "예외",
  },
  {
    word: "예의",
  },
  {
    word: "예전",
  },
  {
    word: "예절",
  },
  {
    word: "예정",
  },
  {
    word: "옛날",
  },
  {
    word: "옛날이야기",
  },
  {
    word: "오늘",
  },
  {
    word: "오늘날",
  },
  {
    word: "오락",
  },
  {
    word: "오래간만",
  },
  {
    word: "오래전",
  },
  {
    word: "오랜만",
  },
  {
    word: "오랫동안",
  },
  {
    word: "오렌지",
  },
  {
    word: "오른발",
  },
  {
    word: "오른손",
  },
  {
    word: "오른쪽",
  },
  {
    word: "오리",
  },
  {
    word: "오븐",
  },
  {
    word: "오빠",
  },
  {
    word: "오염",
  },
  {
    word: "오월",
  },
  {
    word: "오이",
  },
  {
    word: "오전",
  },
  {
    word: "오징어",
  },
  {
    word: "오페라",
  },
  {
    word: "오피스텔",
  },
  {
    word: "오해",
  },
  {
    word: "오후",
  },
  {
    word: "옥상",
  },
  {
    word: "옥수수",
  },
  {
    word: "온도",
  },
  {
    word: "온돌",
  },
  {
    word: "온라인",
  },
  {
    word: "온몸",
  },
  {
    word: "온종일",
  },
  {
    word: "올",
  },
  {
    word: "올가을",
  },
  {
    word: "올림픽",
  },
  {
    word: "올여름",
  },
  {
    word: "올해",
  },
  {
    word: "옷",
  },
  {
    word: "옷차림",
  },
  {
    word: "와이셔츠",
  },
  {
    word: "와인",
  },
  {
    word: "완성",
  },
  {
    word: "완전",
  },
  {
    word: "왕",
  },
  {
    word: "왕비",
  },
  {
    word: "외갓집",
  },
  {
    word: "외과",
  },
  {
    word: "외교",
  },
  {
    word: "외교관",
  },
  {
    word: "외국",
  },
  {
    word: "외국어",
  },
  {
    word: "외국인",
  },
  {
    word: "외로움",
  },
  {
    word: "외모",
  },
  {
    word: "외부",
  },
  {
    word: "외아들",
  },
  {
    word: "외제",
  },
  {
    word: "외출",
  },
  {
    word: "외침",
  },
  {
    word: "왼발",
  },
  {
    word: "왼손",
  },
  {
    word: "왼쪽",
  },
  {
    word: "요구",
  },
  {
    word: "요금",
  },
  {
    word: "요리",
  },
  {
    word: "요새",
  },
  {
    word: "요일",
  },
  {
    word: "요즈음",
  },
  {
    word: "요즘",
  },
  {
    word: "요청",
  },
  {
    word: "욕",
  },
  {
    word: "욕실",
  },
  {
    word: "욕심",
  },
  {
    word: "용",
  },
  {
    word: "용기",
  },
  {
    word: "용도",
  },
  {
    word: "용돈",
  },
  {
    word: "용서",
  },
  {
    word: "용어",
  },
  {
    word: "우려",
  },
  {
    word: "우리나라",
  },
  {
    word: "우리말",
  },
  {
    word: "우산",
  },
  {
    word: "우승",
  },
  {
    word: "우유",
  },
  {
    word: "우정",
  },
  {
    word: "우주",
  },
  {
    word: "우체국",
  },
  {
    word: "우편",
  },
  {
    word: "우표",
  },
  {
    word: "운",
  },
  {
    word: "운동",
  },
  {
    word: "운동복",
  },
  {
    word: "운동장",
  },
  {
    word: "운동화",
  },
  {
    word: "운명",
  },
  {
    word: "운반",
  },
  {
    word: "운전",
  },
  {
    word: "운행",
  },
  {
    word: "울산",
  },
  {
    word: "울음",
  },
  {
    word: "울음소리",
  },
  {
    word: "움직임",
  },
  {
    word: "웃어른",
  },
  {
    word: "웃음",
  },
  {
    word: "웃음소리",
  },
  {
    word: "원",
  },
  {
    word: "원고",
  },
  {
    word: "원래",
  },
  {
    word: "원서",
  },
  {
    word: "원숭이",
  },
  {
    word: "원인",
  },
  {
    word: "원장",
  },
  {
    word: "원피스",
  },
  {
    word: "월급",
  },
  {
    word: "월드컵",
  },
  {
    word: "월세",
  },
  {
    word: "월요일",
  },
  {
    word: "웨이터",
  },
  {
    word: "웬일",
  },
  {
    word: "위",
  },
  {
    word: "위기",
  },
  {
    word: "위로",
  },
  {
    word: "위반",
  },
  {
    word: "위법",
  },
  {
    word: "위성",
  },
  {
    word: "위아래",
  },
  {
    word: "위주",
  },
  {
    word: "위쪽",
  },
  {
    word: "위층",
  },
  {
    word: "위치",
  },
  {
    word: "위험",
  },
  {
    word: "위험성",
  },
  {
    word: "위협",
  },
  {
    word: "윗몸",
  },
  {
    word: "유교",
  },
  {
    word: "유럽",
  },
  {
    word: "유리",
  },
  {
    word: "유리창",
  },
  {
    word: "유머",
  },
  {
    word: "유명",
  },
  {
    word: "유물",
  },
  {
    word: "유산",
  },
  {
    word: "유월",
  },
  {
    word: "유적",
  },
  {
    word: "유치원",
  },
  {
    word: "유학",
  },
  {
    word: "유행",
  },
  {
    word: "유형",
  },
  {
    word: "육군",
  },
  {
    word: "육상",
  },
  {
    word: "은",
  },
  {
    word: "은행",
  },
  {
    word: "은행나무",
  },
  {
    word: "음력",
  },
  {
    word: "음료",
  },
  {
    word: "음료수",
  },
  {
    word: "음반",
  },
  {
    word: "음성",
  },
  {
    word: "음식",
  },
  {
    word: "음식물",
  },
  {
    word: "음식점",
  },
  {
    word: "음악",
  },
  {
    word: "음악가",
  },
  {
    word: "음주",
  },
  {
    word: "의견",
  },
  {
    word: "의논",
  },
  {
    word: "의도",
  },
  {
    word: "의류",
  },
  {
    word: "의무",
  },
  {
    word: "의문",
  },
  {
    word: "의미",
  },
  {
    word: "의복",
  },
  {
    word: "의식",
  },
  {
    word: "의심",
  },
  {
    word: "의욕",
  },
  {
    word: "의원",
  },
  {
    word: "의자",
  },
  {
    word: "의지",
  },
  {
    word: "의학",
  },
  {
    word: "이",
  },
  {
    word: "이것저것",
  },
  {
    word: "이곳저곳",
  },
  {
    word: "이날",
  },
  {
    word: "이내",
  },
  {
    word: "이념",
  },
  {
    word: "이다음",
  },
  {
    word: "이달",
  },
  {
    word: "이데올로기",
  },
  {
    word: "이동",
  },
  {
    word: "이때",
  },
  {
    word: "이렇게",
  },
  {
    word: "이력서",
  },
  {
    word: "이름",
  },
  {
    word: "이마",
  },
  {
    word: "이미지",
  },
  {
    word: "이민",
  },
  {
    word: "이발소",
  },
  {
    word: "이번",
  },
  {
    word: "이별",
  },
  {
    word: "이불",
  },
  {
    word: "이빨",
  },
  {
    word: "이사",
  },
  {
    word: "이상",
  },
  {
    word: "이슬",
  },
  {
    word: "이야기",
  },
  {
    word: "이외",
  },
  {
    word: "이용",
  },
  {
    word: "이웃",
  },
  {
    word: "이웃집",
  },
  {
    word: "이월",
  },
  {
    word: "이유",
  },
  {
    word: "이익",
  },
  {
    word: "이자",
  },
  {
    word: "이전",
  },
  {
    word: "이제",
  },
  {
    word: "이중",
  },
  {
    word: "이튿날",
  },
  {
    word: "이틀",
  },
  {
    word: "이하",
  },
  {
    word: "이해",
  },
  {
    word: "이해관계",
  },
  {
    word: "이혼",
  },
  {
    word: "이후",
  },
  {
    word: "인",
  },
  {
    word: "인간",
  },
  {
    word: "인간관계",
  },
  {
    word: "인격",
  },
  {
    word: "인공",
  },
  {
    word: "인구",
  },
  {
    word: "인근",
  },
  {
    word: "인기",
  },
  {
    word: "인도",
  },
  {
    word: "인류",
  },
  {
    word: "인물",
  },
  {
    word: "인사",
  },
  {
    word: "인사말",
  },
  {
    word: "인삼",
  },
  {
    word: "인삼차",
  },
  {
    word: "인상",
  },
  {
    word: "인생",
  },
  {
    word: "인쇄",
  },
  {
    word: "인연",
  },
  {
    word: "인원",
  },
  {
    word: "인재",
  },
  {
    word: "인제",
  },
  {
    word: "인종",
  },
  {
    word: "인천",
  },
  {
    word: "인천공항",
  },
  {
    word: "인체",
  },
  {
    word: "인터넷",
  },
  {
    word: "인터뷰",
  },
  {
    word: "인하",
  },
  {
    word: "인형",
  },
  {
    word: "일",
  },
  {
    word: "일기",
  },
  {
    word: "일등",
  },
  {
    word: "일반",
  },
  {
    word: "일반인",
  },
  {
    word: "일부",
  },
  {
    word: "일상",
  },
  {
    word: "일상생활",
  },
  {
    word: "일생",
  },
  {
    word: "일손",
  },
  {
    word: "일식",
  },
  {
    word: "일쑤",
  },
  {
    word: "일요일",
  },
  {
    word: "일월",
  },
  {
    word: "일자",
  },
  {
    word: "일자리",
  },
  {
    word: "일정",
  },
  {
    word: "일종",
  },
  {
    word: "일주일",
  },
  {
    word: "일체",
  },
  {
    word: "일치",
  },
  {
    word: "일행",
  },
  {
    word: "일회용",
  },
  {
    word: "일회용품",
  },
  {
    word: "임금",
  },
  {
    word: "임무",
  },
  {
    word: "임시",
  },
  {
    word: "임신",
  },
  {
    word: "임신부",
  },
  {
    word: "입",
  },
  {
    word: "입구",
  },
  {
    word: "입국",
  },
  {
    word: "입대",
  },
  {
    word: "입력",
  },
  {
    word: "입맛",
  },
  {
    word: "입사",
  },
  {
    word: "입술",
  },
  {
    word: "입시",
  },
  {
    word: "입원",
  },
  {
    word: "입장",
  },
  {
    word: "입학",
  },
  {
    word: "잎",
  },
  {
    word: "자",
  },
  {
    word: "자가용",
  },
  {
    word: "자격",
  },
  {
    word: "자격증",
  },
  {
    word: "자극",
  },
  {
    word: "자동",
  },
  {
    word: "자동차",
  },
  {
    word: "자랑",
  },
  {
    word: "자료",
  },
  {
    word: "자리",
  },
  {
    word: "자매",
  },
  {
    word: "자부심",
  },
  {
    word: "자세",
  },
  {
    word: "자신감",
  },
  {
    word: "자연",
  },
  {
    word: "자연현상",
  },
  {
    word: "자연환경",
  },
  {
    word: "자원",
  },
  {
    word: "자유",
  },
  {
    word: "자율",
  },
  {
    word: "자장면",
  },
  {
    word: "자전거",
  },
  {
    word: "자정",
  },
  {
    word: "자존심",
  },
  {
    word: "자체",
  },
  {
    word: "자취",
  },
  {
    word: "자판",
  },
  {
    word: "자판기",
  },
  {
    word: "작가",
  },
  {
    word: "작년",
  },
  {
    word: "작성",
  },
  {
    word: "작업",
  },
  {
    word: "작용",
  },
  {
    word: "작은딸",
  },
  {
    word: "작은아들",
  },
  {
    word: "작품",
  },
  {
    word: "잔",
  },
  {
    word: "잔디",
  },
  {
    word: "잔디밭",
  },
  {
    word: "잔치",
  },
  {
    word: "잘못",
  },
  {
    word: "잠",
  },
  {
    word: "잠깐",
  },
  {
    word: "잠바",
  },
  {
    word: "잠수함",
  },
  {
    word: "잠시",
  },
  {
    word: "잠옷",
  },
  {
    word: "잠자리",
  },
  {
    word: "잡지",
  },
  {
    word: "장",
  },
  {
    word: "장가",
  },
  {
    word: "장갑",
  },
  {
    word: "장관",
  },
  {
    word: "장군",
  },
  {
    word: "장기간",
  },
  {
    word: "장난",
  },
  {
    word: "장난감",
  },
  {
    word: "장래",
  },
  {
    word: "장례",
  },
  {
    word: "장례식",
  },
  {
    word: "장르",
  },
  {
    word: "장마",
  },
  {
    word: "장면",
  },
  {
    word: "장모",
  },
  {
    word: "장미",
  },
  {
    word: "장비",
  },
  {
    word: "장사",
  },
  {
    word: "장소",
  },
  {
    word: "장수",
  },
  {
    word: "장식",
  },
  {
    word: "장애인",
  },
  {
    word: "장인",
  },
  {
    word: "장점",
  },
  {
    word: "장학금",
  },
  {
    word: "재능",
  },
  {
    word: "재료",
  },
  {
    word: "재미",
  },
  {
    word: "재산",
  },
  {
    word: "재생",
  },
  {
    word: "재수",
  },
  {
    word: "재작년",
  },
  {
    word: "재정",
  },
  {
    word: "재주",
  },
  {
    word: "재즈",
  },
  {
    word: "재채기",
  },
  {
    word: "재판",
  },
  {
    word: "재학",
  },
  {
    word: "재활용",
  },
  {
    word: "재활용품",
  },
  {
    word: "저고리",
  },
  {
    word: "저녁",
  },
  {
    word: "저녁때",
  },
  {
    word: "저렇게",
  },
  {
    word: "저번",
  },
  {
    word: "저울",
  },
  {
    word: "저축",
  },
  {
    word: "적",
  },
  {
    word: "적성",
  },
  {
    word: "적용",
  },
  {
    word: "적응",
  },
  {
    word: "전",
  },
  {
    word: "전개",
  },
  {
    word: "전공",
  },
  {
    word: "전구",
  },
  {
    word: "전국",
  },
  {
    word: "전기",
  },
  {
    word: "전기밥솥",
  },
  {
    word: "전날",
  },
  {
    word: "전달",
  },
  {
    word: "전라도",
  },
  {
    word: "전망",
  },
  {
    word: "전문",
  },
  {
    word: "전문가",
  },
  {
    word: "전문점",
  },
  {
    word: "전문직",
  },
  {
    word: "전반",
  },
  {
    word: "전부",
  },
  {
    word: "전선",
  },
  {
    word: "전설",
  },
  {
    word: "전세",
  },
  {
    word: "전시",
  },
  {
    word: "전시장",
  },
  {
    word: "전시회",
  },
  {
    word: "전용",
  },
  {
    word: "전자",
  },
  {
    word: "전쟁",
  },
  {
    word: "전주",
  },
  {
    word: "전철",
  },
  {
    word: "전체",
  },
  {
    word: "전통",
  },
  {
    word: "전통문화",
  },
  {
    word: "전화",
  },
  {
    word: "전화기",
  },
  {
    word: "전화번호",
  },
  {
    word: "전환",
  },
  {
    word: "전후",
  },
  {
    word: "절",
  },
  {
    word: "절대",
  },
  {
    word: "절망",
  },
  {
    word: "절반",
  },
  {
    word: "절약",
  },
  {
    word: "절차",
  },
  {
    word: "젊은이",
  },
  {
    word: "젊음",
  },
  {
    word: "점",
  },
  {
    word: "점검",
  },
  {
    word: "점수",
  },
  {
    word: "점심",
  },
  {
    word: "점심때",
  },
  {
    word: "점심시간",
  },
  {
    word: "점원",
  },
  {
    word: "접근",
  },
  {
    word: "접시",
  },
  {
    word: "접촉",
  },
  {
    word: "젓가락",
  },
  {
    word: "정",
  },
  {
    word: "정거장",
  },
  {
    word: "정기",
  },
  {
    word: "정답",
  },
  {
    word: "정당",
  },
  {
    word: "정도",
  },
  {
    word: "정류장",
  },
  {
    word: "정리",
  },
  {
    word: "정말",
  },
  {
    word: "정면",
  },
  {
    word: "정문",
  },
  {
    word: "정반대",
  },
  {
    word: "정보",
  },
  {
    word: "정보화",
  },
  {
    word: "정부",
  },
  {
    word: "정비",
  },
  {
    word: "정상",
  },
  {
    word: "정성",
  },
  {
    word: "정식",
  },
  {
    word: "정신",
  },
  {
    word: "정신과",
  },
  {
    word: "정오",
  },
  {
    word: "정원",
  },
  {
    word: "정장",
  },
  {
    word: "정지",
  },
  {
    word: "정치",
  },
  {
    word: "정치권",
  },
  {
    word: "정치인",
  },
  {
    word: "정치학",
  },
  {
    word: "젖",
  },
  {
    word: "제공",
  },
  {
    word: "제과점",
  },
  {
    word: "제목",
  },
  {
    word: "제비",
  },
  {
    word: "제사",
  },
  {
    word: "제삿날",
  },
  {
    word: "제시",
  },
  {
    word: "제안",
  },
  {
    word: "제약",
  },
  {
    word: "제의",
  },
  {
    word: "제일",
  },
  {
    word: "제자리",
  },
  {
    word: "제작",
  },
  {
    word: "제주도",
  },
  {
    word: "제출",
  },
  {
    word: "제품",
  },
  {
    word: "제한",
  },
  {
    word: "조",
  },
  {
    word: "조각",
  },
  {
    word: "조개",
  },
  {
    word: "조건",
  },
  {
    word: "조금",
  },
  {
    word: "조기",
  },
  {
    word: "조깅",
  },
  {
    word: "조명",
  },
  {
    word: "조미료",
  },
  {
    word: "조사",
  },
  {
    word: "조상",
  },
  {
    word: "조선",
  },
  {
    word: "조절",
  },
  {
    word: "조정",
  },
  {
    word: "조직",
  },
  {
    word: "조카",
  },
  {
    word: "존댓말",
  },
  {
    word: "존재",
  },
  {
    word: "졸업",
  },
  {
    word: "졸업생",
  },
  {
    word: "졸음",
  },
  {
    word: "종",
  },
  {
    word: "종교",
  },
  {
    word: "종로",
  },
  {
    word: "종류",
  },
  {
    word: "종소리",
  },
  {
    word: "종이",
  },
  {
    word: "종이컵",
  },
  {
    word: "종일",
  },
  {
    word: "종합",
  },
  {
    word: "좌석",
  },
  {
    word: "좌우",
  },
  {
    word: "죄",
  },
  {
    word: "죄인",
  },
  {
    word: "주",
  },
  {
    word: "주거",
  },
  {
    word: "주름",
  },
  {
    word: "주름살",
  },
  {
    word: "주말",
  },
  {
    word: "주머니",
  },
  {
    word: "주먹",
  },
  {
    word: "주문",
  },
  {
    word: "주민",
  },
  {
    word: "주방",
  },
  {
    word: "주변",
  },
  {
    word: "주부",
  },
  {
    word: "주사",
  },
  {
    word: "주소",
  },
  {
    word: "주스",
  },
  {
    word: "주식",
  },
  {
    word: "주요",
  },
  {
    word: "주위",
  },
  {
    word: "주의",
  },
  {
    word: "주인",
  },
  {
    word: "주인공",
  },
  {
    word: "주장",
  },
  {
    word: "주전자",
  },
  {
    word: "주제",
  },
  {
    word: "주차",
  },
  {
    word: "주차장",
  },
  {
    word: "주택",
  },
  {
    word: "주한",
  },
  {
    word: "죽",
  },
  {
    word: "죽음",
  },
  {
    word: "준비",
  },
  {
    word: "준비물",
  },
  {
    word: "줄",
  },
  {
    word: "줄거리",
  },
  {
    word: "줄기",
  },
  {
    word: "줄무늬",
  },
  {
    word: "중간",
  },
  {
    word: "중계방송",
  },
  {
    word: "중국",
  },
  {
    word: "중국어",
  },
  {
    word: "중국집",
  },
  {
    word: "중년",
  },
  {
    word: "중단",
  },
  {
    word: "중독",
  },
  {
    word: "중반",
  },
  {
    word: "중부",
  },
  {
    word: "중세",
  },
  {
    word: "중소기업",
  },
  {
    word: "중순",
  },
  {
    word: "중식",
  },
  {
    word: "중심",
  },
  {
    word: "중심지",
  },
  {
    word: "중앙",
  },
  {
    word: "중요",
  },
  {
    word: "중요성",
  },
  {
    word: "중학교",
  },
  {
    word: "쥐",
  },
  {
    word: "즉석",
  },
  {
    word: "즉시",
  },
  {
    word: "즐거움",
  },
  {
    word: "증가",
  },
  {
    word: "증거",
  },
  {
    word: "증권",
  },
  {
    word: "증권사",
  },
  {
    word: "증상",
  },
  {
    word: "증세",
  },
  {
    word: "지각",
  },
  {
    word: "지갑",
  },
  {
    word: "지구",
  },
  {
    word: "지금",
  },
  {
    word: "지급",
  },
  {
    word: "지난날",
  },
  {
    word: "지난달",
  },
  {
    word: "지난번",
  },
  {
    word: "지난주",
  },
  {
    word: "지난해",
  },
  {
    word: "지능",
  },
  {
    word: "지대",
  },
  {
    word: "지도",
  },
  {
    word: "지름길",
  },
  {
    word: "지리산",
  },
  {
    word: "지방",
  },
  {
    word: "지붕",
  },
  {
    word: "지시",
  },
  {
    word: "지식",
  },
  {
    word: "지식인",
  },
  {
    word: "지역",
  },
  {
    word: "지우개",
  },
  {
    word: "지원",
  },
  {
    word: "지위",
  },
  {
    word: "지점",
  },
  {
    word: "지지",
  },
  {
    word: "지진",
  },
  {
    word: "지출",
  },
  {
    word: "지폐",
  },
  {
    word: "지하",
  },
  {
    word: "지하도",
  },
  {
    word: "지하철",
  },
  {
    word: "지혜",
  },
  {
    word: "직선",
  },
  {
    word: "직업",
  },
  {
    word: "직장",
  },
  {
    word: "직장인",
  },
  {
    word: "직전",
  },
  {
    word: "직접",
  },
  {
    word: "직후",
  },
  {
    word: "진급",
  },
  {
    word: "진단",
  },
  {
    word: "진달래",
  },
  {
    word: "진동",
  },
  {
    word: "진로",
  },
  {
    word: "진료",
  },
  {
    word: "진리",
  },
  {
    word: "진실",
  },
  {
    word: "진심",
  },
  {
    word: "진짜",
  },
  {
    word: "진찰",
  },
  {
    word: "진출",
  },
  {
    word: "진통",
  },
  {
    word: "진행",
  },
  {
    word: "질",
  },
  {
    word: "질문",
  },
  {
    word: "질병",
  },
  {
    word: "질서",
  },
  {
    word: "짐",
  },
  {
    word: "짐작",
  },
  {
    word: "집",
  },
  {
    word: "집단",
  },
  {
    word: "집안",
  },
  {
    word: "집안일",
  },
  {
    word: "집중",
  },
  {
    word: "짓",
  },
  {
    word: "짜증",
  },
  {
    word: "짝",
  },
  {
    word: "쪽",
  },
  {
    word: "찌개",
  },
  {
    word: "찌꺼기",
  },
  {
    word: "차",
  },
  {
    word: "차량",
  },
  {
    word: "차례",
  },
  {
    word: "차림",
  },
  {
    word: "차별",
  },
  {
    word: "차선",
  },
  {
    word: "차이",
  },
  {
    word: "차이점",
  },
  {
    word: "차창",
  },
  {
    word: "착각",
  },
  {
    word: "찬물",
  },
  {
    word: "찬성",
  },
  {
    word: "참가",
  },
  {
    word: "참기름",
  },
  {
    word: "참새",
  },
  {
    word: "참석",
  },
  {
    word: "참여",
  },
  {
    word: "참외",
  },
  {
    word: "참조",
  },
  {
    word: "찻잔",
  },
  {
    word: "창",
  },
  {
    word: "창가",
  },
  {
    word: "창고",
  },
  {
    word: "창구",
  },
  {
    word: "창문",
  },
  {
    word: "창밖",
  },
  {
    word: "창작",
  },
  {
    word: "창조",
  },
  {
    word: "채널",
  },
  {
    word: "채소",
  },
  {
    word: "채점",
  },
  {
    word: "책",
  },
  {
    word: "책가방",
  },
  {
    word: "책방",
  },
  {
    word: "책상",
  },
  {
    word: "책임",
  },
  {
    word: "책임감",
  },
  {
    word: "챔피언",
  },
  {
    word: "처녀",
  },
  {
    word: "처리",
  },
  {
    word: "처벌",
  },
  {
    word: "처음",
  },
  {
    word: "처지",
  },
  {
    word: "천",
  },
  {
    word: "천국",
  },
  {
    word: "천둥",
  },
  {
    word: "천장",
  },
  {
    word: "천재",
  },
  {
    word: "철",
  },
  {
    word: "철도",
  },
  {
    word: "철학",
  },
  {
    word: "첫날",
  },
  {
    word: "청년",
  },
  {
    word: "청바지",
  },
  {
    word: "청소",
  },
  {
    word: "청소기",
  },
  {
    word: "청소년",
  },
  {
    word: "청춘",
  },
  {
    word: "체력",
  },
  {
    word: "체온",
  },
  {
    word: "체육",
  },
  {
    word: "체육관",
  },
  {
    word: "체조",
  },
  {
    word: "체중",
  },
  {
    word: "체험",
  },
  {
    word: "초기",
  },
  {
    word: "초대",
  },
  {
    word: "초등학교",
  },
  {
    word: "초록색",
  },
  {
    word: "초반",
  },
  {
    word: "초밥",
  },
  {
    word: "초보",
  },
  {
    word: "초상화",
  },
  {
    word: "초순",
  },
  {
    word: "초여름",
  },
  {
    word: "초원",
  },
  {
    word: "초저녁",
  },
  {
    word: "초점",
  },
  {
    word: "초청",
  },
  {
    word: "초청장",
  },
  {
    word: "초콜릿",
  },
  {
    word: "촛불",
  },
  {
    word: "총",
  },
  {
    word: "총각",
  },
  {
    word: "총리",
  },
  {
    word: "총장",
  },
  {
    word: "촬영",
  },
  {
    word: "최고",
  },
  {
    word: "최고급",
  },
  {
    word: "최근",
  },
  {
    word: "최대",
  },
  {
    word: "최대한",
  },
  {
    word: "최상",
  },
  {
    word: "최선",
  },
  {
    word: "최소",
  },
  {
    word: "최소한",
  },
  {
    word: "최신",
  },
  {
    word: "최악",
  },
  {
    word: "최저",
  },
  {
    word: "최종",
  },
  {
    word: "최초",
  },
  {
    word: "최후",
  },
  {
    word: "추가",
  },
  {
    word: "추석",
  },
  {
    word: "추억",
  },
  {
    word: "추위",
  },
  {
    word: "추진",
  },
  {
    word: "추천",
  },
  {
    word: "추측",
  },
  {
    word: "축구",
  },
  {
    word: "축구공",
  },
  {
    word: "축구장",
  },
  {
    word: "축소",
  },
  {
    word: "축제",
  },
  {
    word: "축하",
  },
  {
    word: "출구",
  },
  {
    word: "출국",
  },
  {
    word: "출근",
  },
  {
    word: "출발",
  },
  {
    word: "출발점",
  },
  {
    word: "출산",
  },
  {
    word: "출신",
  },
  {
    word: "출연",
  },
  {
    word: "출입",
  },
  {
    word: "출입국",
  },
  {
    word: "출입문",
  },
  {
    word: "출장",
  },
  {
    word: "출퇴근",
  },
  {
    word: "출판",
  },
  {
    word: "출판사",
  },
  {
    word: "춤",
  },
  {
    word: "충격",
  },
  {
    word: "충고",
  },
  {
    word: "충돌",
  },
  {
    word: "충청도",
  },
  {
    word: "취미",
  },
  {
    word: "취소",
  },
  {
    word: "취업",
  },
  {
    word: "취재",
  },
  {
    word: "취직",
  },
  {
    word: "취향",
  },
  {
    word: "층",
  },
  {
    word: "치과",
  },
  {
    word: "치료",
  },
  {
    word: "치료법",
  },
  {
    word: "치마",
  },
  {
    word: "치아",
  },
  {
    word: "치약",
  },
  {
    word: "치즈",
  },
  {
    word: "친구",
  },
  {
    word: "친절",
  },
  {
    word: "친정",
  },
  {
    word: "친척",
  },
  {
    word: "칠월",
  },
  {
    word: "칠판",
  },
  {
    word: "침",
  },
  {
    word: "침대",
  },
  {
    word: "침묵",
  },
  {
    word: "침실",
  },
  {
    word: "칫솔",
  },
  {
    word: "칭찬",
  },
  {
    word: "카드",
  },
  {
    word: "카레",
  },
  {
    word: "카메라",
  },
  {
    word: "카운터",
  },
  {
    word: "카페",
  },
  {
    word: "칸",
  },
  {
    word: "칼",
  },
  {
    word: "칼국수",
  },
  {
    word: "캐나다",
  },
  {
    word: "캐릭터",
  },
  {
    word: "캠퍼스",
  },
  {
    word: "캠페인",
  },
  {
    word: "커튼",
  },
  {
    word: "커피",
  },
  {
    word: "컨디션",
  },
  {
    word: "컬러",
  },
  {
    word: "컴퓨터",
  },
  {
    word: "컵",
  },
  {
    word: "케첩",
  },
  {
    word: "코",
  },
  {
    word: "코끝",
  },
  {
    word: "코끼리",
  },
  {
    word: "코너",
  },
  {
    word: "코드",
  },
  {
    word: "코미디",
  },
  {
    word: "코스",
  },
  {
    word: "코스모스",
  },
  {
    word: "코치",
  },
  {
    word: "코트",
  },
  {
    word: "코피",
  },
  {
    word: "콘서트",
  },
  {
    word: "콜라",
  },
  {
    word: "콤플렉스",
  },
  {
    word: "콩",
  },
  {
    word: "콩나물",
  },
  {
    word: "쾌감",
  },
  {
    word: "쿠데타",
  },
  {
    word: "크기",
  },
  {
    word: "크리스마스",
  },
  {
    word: "크림",
  },
  {
    word: "큰길",
  },
  {
    word: "큰딸",
  },
  {
    word: "큰소리",
  },
  {
    word: "큰아들",
  },
  {
    word: "큰일",
  },
  {
    word: "큰절",
  },
  {
    word: "클래식",
  },
  {
    word: "클럽",
  },
  {
    word: "키",
  },
  {
    word: "키스",
  },
  {
    word: "타락",
  },
  {
    word: "타입",
  },
  {
    word: "타자기",
  },
  {
    word: "탁구",
  },
  {
    word: "탁자",
  },
  {
    word: "탄생",
  },
  {
    word: "탑",
  },
  {
    word: "탓",
  },
  {
    word: "태권도",
  },
  {
    word: "태도",
  },
  {
    word: "태아",
  },
  {
    word: "태양",
  },
  {
    word: "태풍",
  },
  {
    word: "택시",
  },
  {
    word: "탤런트",
  },
  {
    word: "터",
  },
  {
    word: "터널",
  },
  {
    word: "터미널",
  },
  {
    word: "턱",
  },
  {
    word: "털",
  },
  {
    word: "테니스",
  },
  {
    word: "테러",
  },
  {
    word: "테스트",
  },
  {
    word: "테이블",
  },
  {
    word: "테이프",
  },
  {
    word: "텍스트",
  },
  {
    word: "텔레비전",
  },
  {
    word: "토끼",
  },
  {
    word: "토대",
  },
  {
    word: "토론",
  },
  {
    word: "토론자",
  },
  {
    word: "토론회",
  },
  {
    word: "토마토",
  },
  {
    word: "토요일",
  },
  {
    word: "통",
  },
  {
    word: "통계",
  },
  {
    word: "통과",
  },
  {
    word: "통로",
  },
  {
    word: "통신",
  },
  {
    word: "통역",
  },
  {
    word: "통일",
  },
  {
    word: "통장",
  },
  {
    word: "통제",
  },
  {
    word: "통증",
  },
  {
    word: "통합",
  },
  {
    word: "통화",
  },
  {
    word: "퇴근",
  },
  {
    word: "퇴원",
  },
  {
    word: "퇴직금",
  },
  {
    word: "투자",
  },
  {
    word: "투표",
  },
  {
    word: "튀김",
  },
  {
    word: "트럭",
  },
  {
    word: "특급",
  },
  {
    word: "특별",
  },
  {
    word: "특성",
  },
  {
    word: "특수",
  },
  {
    word: "특수성",
  },
  {
    word: "특징",
  },
  {
    word: "틀",
  },
  {
    word: "틈",
  },
  {
    word: "티브이",
  },
  {
    word: "티셔츠",
  },
  {
    word: "팀",
  },
  {
    word: "파",
  },
  {
    word: "파도",
  },
  {
    word: "파란색",
  },
  {
    word: "파리",
  },
  {
    word: "파일",
  },
  {
    word: "파출소",
  },
  {
    word: "파티",
  },
  {
    word: "판",
  },
  {
    word: "판결",
  },
  {
    word: "판단",
  },
  {
    word: "판매",
  },
  {
    word: "팔",
  },
  {
    word: "팔월",
  },
  {
    word: "팝송",
  },
  {
    word: "패션",
  },
  {
    word: "팩",
  },
  {
    word: "팩스",
  },
  {
    word: "팩시밀리",
  },
  {
    word: "팬",
  },
  {
    word: "팬티",
  },
  {
    word: "페인트",
  },
  {
    word: "편견",
  },
  {
    word: "편의",
  },
  {
    word: "편의점",
  },
  {
    word: "편지",
  },
  {
    word: "평",
  },
  {
    word: "평가",
  },
  {
    word: "평균",
  },
  {
    word: "평상시",
  },
  {
    word: "평생",
  },
  {
    word: "평소",
  },
  {
    word: "평양",
  },
  {
    word: "평일",
  },
  {
    word: "평화",
  },
  {
    word: "폐지",
  },
  {
    word: "포도",
  },
  {
    word: "포도주",
  },
  {
    word: "포스터",
  },
  {
    word: "포인트",
  },
  {
    word: "포장",
  },
  {
    word: "포장마차",
  },
  {
    word: "포크",
  },
  {
    word: "포함",
  },
  {
    word: "폭",
  },
  {
    word: "폭력",
  },
  {
    word: "표",
  },
  {
    word: "표면",
  },
  {
    word: "표시",
  },
  {
    word: "표정",
  },
  {
    word: "표준",
  },
  {
    word: "표현",
  },
  {
    word: "풀",
  },
  {
    word: "품",
  },
  {
    word: "품목",
  },
  {
    word: "품질",
  },
  {
    word: "풍경",
  },
  {
    word: "풍속",
  },
  {
    word: "풍습",
  },
  {
    word: "프랑스",
  },
  {
    word: "프로",
  },
  {
    word: "프로그램",
  },
  {
    word: "프린터",
  },
  {
    word: "플라스틱",
  },
  {
    word: "피",
  },
  {
    word: "피곤",
  },
  {
    word: "피디",
  },
  {
    word: "피로",
  },
  {
    word: "피망",
  },
  {
    word: "피부",
  },
  {
    word: "피시",
  },
  {
    word: "피아노",
  },
  {
    word: "피자",
  },
  {
    word: "피해",
  },
  {
    word: "필름",
  },
  {
    word: "필수",
  },
  {
    word: "필요",
  },
  {
    word: "필요성",
  },
  {
    word: "필통",
  },
  {
    word: "핑계",
  },
  {
    word: "하",
  },
  {
    word: "하나",
  },
  {
    word: "하나하나",
  },
  {
    word: "하늘",
  },
  {
    word: "하드웨어",
  },
  {
    word: "하루",
  },
  {
    word: "하룻밤",
  },
  {
    word: "하반기",
  },
  {
    word: "하숙집",
  },
  {
    word: "하순",
  },
  {
    word: "하얀색",
  },
  {
    word: "하천",
  },
  {
    word: "하품",
  },
  {
    word: "학과",
  },
  {
    word: "학교",
  },
  {
    word: "학교생활",
  },
  {
    word: "학급",
  },
  {
    word: "학기",
  },
  {
    word: "학년",
  },
  {
    word: "학력",
  },
  {
    word: "학번",
  },
  {
    word: "학부모",
  },
  {
    word: "학비",
  },
  {
    word: "학생증",
  },
  {
    word: "학술",
  },
  {
    word: "학습",
  },
  {
    word: "학용품",
  },
  {
    word: "학원",
  },
  {
    word: "학위",
  },
  {
    word: "학점",
  },
  {
    word: "한",
  },
  {
    word: "한가운데",
  },
  {
    word: "한강",
  },
  {
    word: "한겨울",
  },
  {
    word: "한계",
  },
  {
    word: "한구석",
  },
  {
    word: "한글",
  },
  {
    word: "한글날",
  },
  {
    word: "한낮",
  },
  {
    word: "한눈",
  },
  {
    word: "한동안",
  },
  {
    word: "한때",
  },
  {
    word: "한라산",
  },
  {
    word: "한마디",
  },
  {
    word: "한문",
  },
  {
    word: "한반도",
  },
  {
    word: "한밤중",
  },
  {
    word: "한번",
  },
  {
    word: "한복",
  },
  {
    word: "한순간",
  },
  {
    word: "한숨",
  },
  {
    word: "한식",
  },
  {
    word: "한여름",
  },
  {
    word: "한자",
  },
  {
    word: "한잔",
  },
  {
    word: "한쪽",
  },
  {
    word: "한참",
  },
  {
    word: "한편",
  },
  {
    word: "한평생",
  },
  {
    word: "할인",
  },
  {
    word: "합격",
  },
  {
    word: "항공",
  },
  {
    word: "항공기",
  },
  {
    word: "항구",
  },
  {
    word: "항의",
  },
  {
    word: "해",
  },
  {
    word: "해결",
  },
  {
    word: "해군",
  },
  {
    word: "해답",
  },
  {
    word: "해당",
  },
  {
    word: "해물",
  },
  {
    word: "해석",
  },
  {
    word: "해설",
  },
  {
    word: "해소",
  },
  {
    word: "해수욕장",
  },
  {
    word: "해안",
  },
  {
    word: "해외",
  },
  {
    word: "해외여행",
  },
  {
    word: "핵",
  },
  {
    word: "핵심",
  },
  {
    word: "핸드백",
  },
  {
    word: "핸드폰",
  },
  {
    word: "햄",
  },
  {
    word: "햄버거",
  },
  {
    word: "햇볕",
  },
  {
    word: "햇빛",
  },
  {
    word: "햇살",
  },
  {
    word: "행동",
  },
  {
    word: "행복",
  },
  {
    word: "행사",
  },
  {
    word: "행운",
  },
  {
    word: "행위",
  },
  {
    word: "향",
  },
  {
    word: "향기",
  },
  {
    word: "향상",
  },
  {
    word: "향수",
  },
  {
    word: "허가",
  },
  {
    word: "허락",
  },
  {
    word: "허리",
  },
  {
    word: "허용",
  },
  {
    word: "헬기",
  },
  {
    word: "혀",
  },
  {
    word: "현관",
  },
  {
    word: "현관문",
  },
  {
    word: "현금",
  },
  {
    word: "현대",
  },
  {
    word: "현대인",
  },
  {
    word: "현상",
  },
  {
    word: "현실",
  },
  {
    word: "현장",
  },
  {
    word: "현재",
  },
  {
    word: "현지",
  },
  {
    word: "혈액",
  },
  {
    word: "협력",
  },
  {
    word: "형",
  },
  {
    word: "형부",
  },
  {
    word: "형성",
  },
  {
    word: "형식",
  },
  {
    word: "형제",
  },
  {
    word: "형태",
  },
  {
    word: "형편",
  },
  {
    word: "혜택",
  },
  {
    word: "호기심",
  },
  {
    word: "호랑이",
  },
  {
    word: "호박",
  },
  {
    word: "호수",
  },
  {
    word: "호실",
  },
  {
    word: "호주",
  },
  {
    word: "호주머니",
  },
  {
    word: "호흡",
  },
  {
    word: "혼잣말",
  },
  {
    word: "홈페이지",
  },
  {
    word: "홍보",
  },
  {
    word: "홍수",
  },
  {
    word: "홍차",
  },
  {
    word: "화",
  },
  {
    word: "화가",
  },
  {
    word: "화면",
  },
  {
    word: "화분",
  },
  {
    word: "화살",
  },
  {
    word: "화요일",
  },
  {
    word: "화장",
  },
  {
    word: "화장실",
  },
  {
    word: "화장지",
  },
  {
    word: "화장품",
  },
  {
    word: "화재",
  },
  {
    word: "화제",
  },
  {
    word: "화학",
  },
  {
    word: "확보",
  },
  {
    word: "확신",
  },
  {
    word: "확인",
  },
  {
    word: "확장",
  },
  {
    word: "확정",
  },
  {
    word: "환갑",
  },
  {
    word: "환경",
  },
  {
    word: "환경오염",
  },
  {
    word: "환영",
  },
  {
    word: "환율",
  },
  {
    word: "활기",
  },
  {
    word: "활동",
  },
  {
    word: "활용",
  },
  {
    word: "회견",
  },
  {
    word: "회관",
  },
  {
    word: "회복",
  },
  {
    word: "회사",
  },
  {
    word: "회색",
  },
  {
    word: "회의",
  },
  {
    word: "회장",
  },
  {
    word: "회전",
  },
  {
    word: "회화",
  },
  {
    word: "횟수",
  },
  {
    word: "횡단보도",
  },
  {
    word: "효과",
  },
  {
    word: "효도",
  },
  {
    word: "후",
  },
  {
    word: "후기",
  },
  {
    word: "후반",
  },
  {
    word: "후배",
  },
  {
    word: "후보",
  },
  {
    word: "후춧가루",
  },
  {
    word: "후회",
  },
  {
    word: "훈련",
  },
  {
    word: "휴가",
  },
  {
    word: "휴식",
  },
  {
    word: "휴일",
  },
  {
    word: "휴지",
  },
  {
    word: "휴지통",
  },
  {
    word: "흉내",
  },
  {
    word: "흐름",
  },
  {
    word: "흑백",
  },
  {
    word: "흑인",
  },
  {
    word: "흔적",
  },
  {
    word: "흙",
  },
  {
    word: "흥미",
  },
  {
    word: "흥분",
  },
  {
    word: "희곡",
  },
  {
    word: "희망",
  },
  {
    word: "희생",
  },
  {
    word: "흰색",
  },
  {
    word: "힘",
  },
  {
    word: "맥북",
  },
  {
    word: "에어팟",
  },
  {
    word: "아이폰",
  },
  {
    word: "김린우",
  },
  {
    word: "홍준혁",
  },
  {
    word: "박성철",
  },
  {
    word: "이수민",
  },
]

export async function GET() {
  if (process.env.NODE_ENV === "development") {
    const nouns = await prisma.nouns.createMany({ data: nounData })
    return NextResponse.json(nouns)
  } else {
    return NextResponse.json({ message: "Not Found" })
  }
}
