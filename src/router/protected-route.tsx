import { PropsWithChildren, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function ProtectedRoute({ children }: PropsWithChildren) {
  const isLogin = false;

  const navigate = useNavigate();

  useEffect(() => {
    if (!isLogin) {
      navigate("/login");
    } else {
      navigate("/123");
    }
  }, [navigate, isLogin]);

  return children;
}
