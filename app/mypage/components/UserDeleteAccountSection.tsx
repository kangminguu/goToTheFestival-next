import Button from "../../../components/Button/Button";
import DeleteAccountButton from "./DeleteAccountButton/DeleteAccountButton";

export default function UserDeleteAccountSection() {
    return (
        <div className="flex flex-col gap-[5px] border border-border-base rounded-[8px] py-[16px] px-[14px] md:py-[36px] md:px-[30px] mb-[40px]">
            {/* 모든후기 삭제 버튼 */}
            <Button title="모든 후기 삭제" />

            {/* 회원 탈퇴 버튼 */}
            <DeleteAccountButton />
        </div>
    );
}
