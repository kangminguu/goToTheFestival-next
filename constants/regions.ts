export const REGION_CODES = {
    ALL: "",
    SEOUL: "1",
    INCHEON: "2",
    DAEJEON: "3",
    DAEGU: "4",
    GWANGJU: "5",
    BUSAN: "6",
    ULSAN: "7",
    SEJONG: "8",
    GYEONGGI: "31",
    GANGWON: "32",
    CHUNGBUK: "33",
    CHUNGNAM: "34",
    GYEONGBUK: "35",
    GYEONGNAM: "36",
    JEONBUK: "37",
    JEONNAM: "38",
    JEJU: "39",
} as const;

export type RegionCode = (typeof REGION_CODES)[keyof typeof REGION_CODES];

export const REGION_LIST = [
    {
        rnum: 0,
        code: REGION_CODES.ALL,
        name: "전국",
    },
    {
        rnum: 1,
        code: REGION_CODES.SEOUL,
        name: "서울",
    },
    {
        rnum: 2,
        code: REGION_CODES.INCHEON,
        name: "인천",
    },
    {
        rnum: 3,
        code: REGION_CODES.DAEJEON,
        name: "대전",
    },
    {
        rnum: 4,
        code: REGION_CODES.DAEGU,
        name: "대구",
    },
    {
        rnum: 5,
        code: REGION_CODES.GWANGJU,
        name: "광주",
    },
    {
        rnum: 6,
        code: REGION_CODES.BUSAN,
        name: "부산",
    },
    {
        rnum: 7,
        code: REGION_CODES.ULSAN,
        name: "울산",
    },
    {
        rnum: 8,
        code: REGION_CODES.SEJONG,
        name: "세종",
    },
    {
        rnum: 9,
        code: REGION_CODES.GYEONGGI,
        name: "경기",
    },
    {
        rnum: 10,
        code: REGION_CODES.GANGWON,
        name: "강원",
    },
    {
        rnum: 11,
        code: REGION_CODES.CHUNGBUK,
        name: "충북",
    },
    {
        rnum: 12,
        code: REGION_CODES.CHUNGNAM,
        name: "충남",
    },
    {
        rnum: 13,
        code: REGION_CODES.GYEONGBUK,
        name: "경북",
    },
    {
        rnum: 14,
        code: REGION_CODES.GYEONGNAM,
        name: "경남",
    },
    {
        rnum: 15,
        code: REGION_CODES.JEONBUK,
        name: "전북",
    },
    {
        rnum: 16,
        code: REGION_CODES.JEONNAM,
        name: "전남",
    },
    {
        rnum: 17,
        code: REGION_CODES.JEJU,
        name: "제주",
    },
];
