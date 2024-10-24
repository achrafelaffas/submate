import { UserApi, UserResponse } from "@/api";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import useAuth from "@/hooks/useAuth";
import { Edit3 } from "lucide-react";
import { useEffect, useState } from "react";
import useAuthUser from "react-auth-kit/hooks/useAuthUser";

interface User {
  id: number;
}

const Profile = () => {
  const userData = useAuthUser<User>();
  const config = useAuth();
  const userApi = new UserApi(config);
  const [user, setUser] = useState<UserResponse>({});

  const fecthUser = async (id: number) => {
    await userApi.getUser(id).then(
      (response) => setUser(response.data),
      (error) => console.log(error)
    );
  };

  useEffect(() => {
    if (userData?.id) fecthUser(userData?.id);
  }, []);

  return (
    <div>
      <Card className="p-3 md:p-7 border">
        <div className="flex flex-row justify-between items-center gap-5">
          <h1 className="text-sm md:text-xl">
            <small className="text-primary">Full name</small> <br />{" "}
            {user.firstname + " " + user.lastname}
          </h1>
          <Button className="text-primary" variant="ghost">
            <Edit3 />
          </Button>
        </div>

        <div className="flex flex-row justify-between items-center gap-5">
          <h1 className="text-sm md:text-xl">
            <small className="text-primary">Email</small> <br /> {user.email}
          </h1>
          <Button className="text-primary" variant="ghost">
            <Edit3 />
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default Profile;
