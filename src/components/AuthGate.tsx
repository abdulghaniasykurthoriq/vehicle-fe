import { useEffect, useRef, useState } from "react";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { refreshThunk } from "../store/slices/authSlice";
import { selectAuth } from "../store/selectors";

export default function AuthGate({ children }: { children: React.ReactNode }) {
  const dispatch = useAppDispatch();
  const { isAuth } = useAppSelector(selectAuth);
  const [checked, setChecked] = useState(false);
  const ran = useRef(false);

  useEffect(() => {
    if (ran.current) return; // <-- guard StrictMode
    ran.current = true;

    if (isAuth) {
      setChecked(true);
      return;
    }
    dispatch(refreshThunk()).finally(() => setChecked(true));
  }, [dispatch, isAuth]);

  if (!checked && !isAuth) return <div className="p-6">Loading session…</div>;
  return <>{children}</>;
}
