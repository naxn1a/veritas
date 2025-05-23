"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Avatar from "@/components/build/Avatar";
import ChangePasswordForm from "@/components/form/ChangePasswordForm";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";
import ProfileForm from "./form";

export default function Setting() {
  const { user } = useAuth();

  const handleImageUpload = () => {
    alert("Image upload functionality is not implemented yet.");
  };

  return (
    <div className="w-full">
      <h1 className="text-2xl font-semibold mb-4">Account Settings</h1>
      <Card className="w-full border-1 border-slate-100">
        <CardHeader>
          <CardTitle className="text-xl">Edit Profile</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-8 mb-8">
            <Avatar className="w-32 h-32" user={user} />
            <div className="flex flex-col space-y-1.5 items-start gap-4">
              <h2 className="text-xl">Upload Profile Picture</h2>
              <Button onClick={handleImageUpload}>Choose Image</Button>
            </div>
          </div>
          {user && (
            <ProfileForm
              core={{
                id: user.id,
                firstname: user.firstname,
                lastname: user.lastname,
                email: user.email,
                phone: user.phone || "",
                gender: user.gender || "",
                birthdate: user.birthdate || "",
              }}
            />
          )}
        </CardContent>
      </Card>
      <br />
      <Card className="w-full border-1 border-slate-100">
        <CardHeader>
          <CardTitle className="text-xl">Change Password</CardTitle>
        </CardHeader>
        <CardContent>
          <ChangePasswordForm id={user?.id} />
        </CardContent>
      </Card>
      <br />
      {/* <Card className="w-full border-1 border-slate-100">
        <CardHeader>
          <CardTitle className="text-xl">Manage Account</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="w-full">
            <h3 className="font-semibold">Delete Account</h3>
            <p className="my-4">
              When you delete your account, you will no longer have access to
              the information stored in your Eventpop Account, such as order
              history or your tickets.
            </p>
            <div className="w-full text-right mt-4">
              <Button variant="destructive">Delete</Button>
            </div>
          </div>
        </CardContent>
      </Card>
      <br /> */}
    </div>
  );
}
