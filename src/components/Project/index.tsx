import useAuth from "@/hooks/use-auth";

export default function Project() {
  const { profile } = useAuth();

  return <>{JSON.stringify(profile)}</>;
}
