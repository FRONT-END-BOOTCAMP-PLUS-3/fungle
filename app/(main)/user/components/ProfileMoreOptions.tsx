import Image from "next/image";
import {
  ButtonWrapper,
  Dropdown,
  MoreOptionsButton,
} from "./ProfileMoreOptions.styled";
import { useEffect, useRef, useState } from "react";

const ProfileMoreOptions = ({
  onDeleteClick,
}: {
  onDeleteClick: () => void;
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const handleToggleMenu = () => setIsOpen((prev) => !prev);

  useEffect(() => {
    if (!isOpen) return;

    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && menuRef.current.contains(e.target as Node)) return;

      if (buttonRef.current && buttonRef.current.contains(e.target as Node))
        return;

      setIsOpen(false);
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  return (
    <ButtonWrapper>
      <MoreOptionsButton onClick={handleToggleMenu} ref={buttonRef}>
        <Image
          src="/icon/more_options.svg"
          alt="더보기 버튼"
          width={20}
          height={20}
        />
      </MoreOptionsButton>
      {isOpen && (
        <Dropdown ref={menuRef}>
          <button onClick={onDeleteClick}>탈퇴하기</button>
        </Dropdown>
      )}
    </ButtonWrapper>
  );
};

export default ProfileMoreOptions;
