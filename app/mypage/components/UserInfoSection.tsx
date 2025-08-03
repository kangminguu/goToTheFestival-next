import SignOutButton from "./SignOutButton/SignOutButton";

export default function UserInfoSection({ name, email, profileImg }) {
    return (
        <div className="flex flex-col md:gap-[25px] gap-[20px] border border-border-base rounded-[8px] py-[16px] px-[14px] my-[41px] md:py-[36px] md:px-[30px] mb-[40px]">
            <h2 className="md:text-[24px] text-[16px] font-semibold">
                내 정보
            </h2>

            <div className="row-center gap-[15px]">
                <img
                    className="md:h-[54px] h-[44px] rounded-full"
                    src={profileImg}
                    alt="프로필_사진"
                />
                <div className="flex flex-col">
                    <span className="md:text-[20px] text-[16px]">{name}</span>

                    <div className="row-center gap-[8px]">
                        <span className="md:text-[14px] text-[12px]">
                            {email}
                        </span>
                        <img
                            className="md:h-[24px] h-[20px] rounded-full md:p-[6px] p-[5px] bg-[#FEE500]"
                            src="/assets/kakao.svg"
                            alt="카카오계정"
                        />
                    </div>
                </div>

                <div className="md:block hidden w-full h-[56px] relative">
                    <div className=" absolute bottom-0 right-0">
                        <SignOutButton />
                    </div>
                </div>
            </div>

            <div className="md:hidden block w-full">
                <div className="flex flex-row justify-end">
                    <SignOutButton />
                </div>
            </div>
        </div>
    );
}
