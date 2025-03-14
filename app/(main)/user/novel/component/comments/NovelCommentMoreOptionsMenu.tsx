"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import {
  Dropdown,
  MenuItem,
  MoreButton,
  Wrapper,
  EditBox,
} from "@/app/(main)/user/community/components/MoreOptionMenu.styled";

interface MoreOptionsMenuProps {
  onDelete?: () => void;
  onEdit?: () => void;
  isOwner?: boolean;
}

const MoreOptionsMenu = ({ onDelete, onEdit, isOwner }: MoreOptionsMenuProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const handleToggleMenu = () => setIsOpen((prev) => !prev);

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsOpen(false);
      }
    };

    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  return (
    <Wrapper ref={menuRef}>
      <MoreButton onClick={handleToggleMenu}>
        <Image
          src="/icon/more_options.svg"
          alt="더보기"
          width={24}
          height={24}
        />
      </MoreButton>
      {isOpen && (
        <Dropdown>
          {onEdit && isOwner && (
            <EditBox onClick={onEdit}>
              <Image
                src="/icon/edit_pen.svg"
                alt="수정"
                width={20}
                height={20}
              />
              수정
            </EditBox>
          )}

          <MenuItem onClick={onDelete}>
            <Image src="/icon/delete.svg" alt="삭제" width={20} height={20} />
            삭제
          </MenuItem>
        </Dropdown>
      )}
    </Wrapper>
  );
};

export default MoreOptionsMenu;
