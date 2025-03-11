import { useEffect, useRef, useState } from "react";
import { Menu, MenuButton, MenuItems, MenuItem } from "@headlessui/react";
import {
  DropdownWrapper,
  StyledButton,
  StyledMenu,
  StyledItem,
  DropdownArrow,
} from "@/components/dropdown/Dropdown.styled";

interface Option {
  value: string;
  label: string;
}

interface DropdownProps {
  options: Option[];
  onSelect: (value: string) => void;
  selected: string | string[];
  size?: "default" | "small";
}

const Dropdown = ({
  options,
  onSelect,
  selected,
  size = "default",
}: DropdownProps) => {
  const menuRef = useRef<HTMLDivElement | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (isOpen && menuRef.current) {
      setTimeout(() => {
        menuRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
      }, 100);
    }
  }, [isOpen]); 

  return (
    <DropdownWrapper size={size}>
      <Menu>
        {({ open }) => {
          useEffect(() => {
            setIsOpen(open);
          }, [open]);

          const selectedLabel = Array.isArray(selected)
            ? selected
                .map(
                  (value) =>
                    options.find((option) => option.value === value)?.label || ""
                )
                .filter((value) => value)
                .join(", ") || "선택하세요"
            : options.find((option) => option.value === selected)?.label || "선택하세요";

          return (
            <div>
              <MenuButton as={StyledButton} size={size}>
                {selectedLabel}
                <DropdownArrow src="/icon/dropdown_arrow.svg" alt="dropdown arrow" />
              </MenuButton>
              {open && (
                <MenuItems as={StyledMenu} ref={menuRef}>
                  {options.map((option, index) => (
                    <MenuItem key={option.value} as="div">
                      <StyledItem
                        onClick={() => {
                          onSelect(option.value);
                        }}
                        $isFirst={index === 0}
                        $isLast={index === options.length - 1}
                      >
                        {option.label}
                      </StyledItem>
                    </MenuItem>
                  ))}
                </MenuItems>
              )}
            </div>
          );
        }}
      </Menu>
    </DropdownWrapper>
  );
};

export default Dropdown;
