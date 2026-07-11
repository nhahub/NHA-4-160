import { useTeacherProfile } from "../../hooks/useTeacherProfile";

const Dashbourd = () => {
  const { data: profile, isLoading, error } = useTeacherProfile();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading profile: {error.message}</div>;

  return (
    <div>
      <header className="p-3 border-bottom">
        <h1>Welcome, {profile.name}!</h1>
        <p>Academy: {profile.tenants?.academy_name}</p>
      </header>
    </div>
  );
};

export default Dashbourd;
