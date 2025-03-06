import { useOutletContext } from "react-router-dom";
import MyProfileRecipes from "../../components/MyProfilRecipes";
import SeeProfile from "../../components/SeeProfile";
import type { OutletContext } from "../../types/UserData";
import "./ViewProfile.css";

function Profile() {
  const { user } = useOutletContext<OutletContext>();

  return (
    <section className="view-profile_content">
      {user && (
        <>
          <SeeProfile user={user} />
          <MyProfileRecipes />
        </>
      )}
    </section>
  );
}

export default Profile;
