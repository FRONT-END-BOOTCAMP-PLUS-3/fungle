import { Menu, MenuButton, MenuItems, MenuItem } from "@headlessui/react";
import { DropdownWrapper, StyledButton, StyledMenu, StyledItem, DropdownArrow } from "@/components/dropdown/Dropdown.styled";
import { ReactNode } from "react";

interface DropdownProps<T extends ReactNode> {
  options: T[];
  onSelect: (option: T) => void;
  selected: T;
  size?: "default" | "small";
}

const Dropdown = <T extends ReactNode>({ options, onSelect, selected, size = "default" }: DropdownProps<T>) => {
  return (
    <DropdownWrapper size={size}>
      <Menu>
        {({ open }) => (
          <div>
            <MenuButton as={StyledButton} size={size}>
              {selected}
              <DropdownArrow src="/icon/dropdown_arrow.svg" alt="dropdown arrow" />
            </MenuButton>
            {open && (
              <MenuItems as={StyledMenu}>
                {options.map((option, index) => (
                  <MenuItem key={String(option)} as="div">
                    <StyledItem
                      onClick={() => onSelect(option)}
                      $isFirst={index === 0}
                      $isLast={index === options.length - 1}
                    >
                      {option}
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
