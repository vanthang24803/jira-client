import useAuth from "@/hooks/use-auth";

export default function Projects() {
  const { profile } = useAuth();

  return <>{JSON.stringify(profile)}</>;
}
