import Button from "@/components/button/Button";
import {
  ButtonWrapper,
  MenuItem,
  MenuWrapper,
} from "./StatusUpdateButton.styled";
import { useEffect, useRef, useState } from "react";
import { SERIAL_STATUS, STATUS_TRANSITIONS } from "@/constants/STATUS";

interface StatusUpdateButtonProps {
  currentStatus: string;
  onUpdateStatus: (newStatus: string) => Promise<boolean>;
}

const StatusUpdateButton = ({
  currentStatus,
  onUpdateStatus,
}: StatusUpdateButtonProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const toggleMenu = () => {
    setIsOpen((prev) => !prev);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);

      setTimeout(() => {
        if (menuRef.current) {
          menuRef.current.scrollIntoView({
            behavior: "smooth",
            block: "start",
          });
        }
      }, 100);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  const availableStatuses = STATUS_TRANSITIONS[currentStatus] || [];

  const handleStatusClick = async (status: string) => {
    const success = await onUpdateStatus(status);
    if (success) {
      setIsOpen(false);
    }
  };

  return (
    <ButtonWrapper>
      <Button
        buttonSize="small"
        onClick={toggleMenu}
        disabled={availableStatuses.length === 0}
      >
        {SERIAL_STATUS.find((s) => s.value === currentStatus)?.label ||
          "알 수 없음"}
      </Button>
      {isOpen && availableStatuses.length > 0 && (
        <MenuWrapper ref={menuRef}>
          {availableStatuses.map((status) => (
            <MenuItem key={status} onClick={() => handleStatusClick(status)}>
              {SERIAL_STATUS.find((s) => s.value === status)?.label}
            </MenuItem>
          ))}
        </MenuWrapper>
      )}
    </ButtonWrapper>
  );
};

export default StatusUpdateButton;
