import { ViewInfoButton, ViewInfoUl } from "./ProfileMenu.styled";
import { USER_INFO_ALIGN } from "@/constants/USER_INFO_LIST";

interface ProfileMenuProps {
  selectedMenu: string;
  setSelectedMenu: (value: string) => void;
}

const ProfileMenu = ({ selectedMenu, setSelectedMenu }: ProfileMenuProps) => {
  return (
    <ViewInfoUl>
      {USER_INFO_ALIGN.map((list) => {
        const isActive = selectedMenu === list.value;

        return (
          <li key={list.id}>
            <ViewInfoButton
              onClick={() => {
                setSelectedMenu(list.value);
              }}
              $isActive={isActive}
            >
              {list.label}
            </ViewInfoButton>
          </li>
        );
      })}
    </ViewInfoUl>
  );
};

export default ProfileMenu;
