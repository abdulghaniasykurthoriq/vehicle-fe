import {
  Root as DropdownMenuRoot,
  Trigger as DropdownMenuTrigger,
  Content as DropdownMenuContent,
  Item as DropdownMenuItem,
} from "@radix-ui/react-dropdown-menu";

import { useAppDispatch, useAppSelector } from "../store/hooks";
import { logoutThunk } from "../store/slices/authSlice";
import { selectAuth } from "../store/selectors";

export default function Navbar() {
  const { user } = useAppSelector(selectAuth);
  const dispatch = useAppDispatch();

  return (
    <div className="w-full flex items-center justify-between p-3 border-b bg-white">
      <div className="font-semibold">Vehicle Dashboard</div>
      <DropdownMenuRoot>
        <DropdownMenuTrigger className="btn">
          {user?.email ?? "User"}
        </DropdownMenuTrigger>
        <DropdownMenuContent className="bg-white border rounded-xl shadow p-1">
          <DropdownMenuItem
            className="px-3 py-2 hover:bg-gray-100 rounded-lg cursor-pointer"
            onClick={() => dispatch(logoutThunk())}
          >
            Logout
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenuRoot>
    </div>
  );
}
