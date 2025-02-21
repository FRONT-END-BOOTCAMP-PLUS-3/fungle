import { Menu, MenuButton, MenuItems, MenuItem } from "@headlessui/react";
import { DropdownWrapper, StyledButton, StyledMenu, StyledItem, DropdownArrow } from "@/components/dropdown/Dropdown.styled";

interface Option {
  value: string;
  label: string;
}

interface DropdownProps {
  options: Option[];
  onSelect: (value: string) => void;
  selected: string;
  size?: "default" | "small";
}

const Dropdown = ({ options, onSelect, selected, size = "default" }: DropdownProps) => {
  const selectedLabel = options.find((option) => option.value === selected)?.label || "선택하세요";

  return (
    <DropdownWrapper size={size}>
      <Menu>
        {({ open }) => (
          <div>
            <MenuButton as={StyledButton} size={size}>
              {selectedLabel}
              <DropdownArrow src="/icon/dropdown_arrow.svg" alt="dropdown arrow" />
            </MenuButton>
            {open && (
              <MenuItems as={StyledMenu}>
                {options.map((option, index) => (
                  <MenuItem key={option.value} as="div">
                    <StyledItem
                      onClick={() => onSelect(option.value)}
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
        )}
      </Menu>
    </DropdownWrapper>
  );
};

export default Dropdown;
