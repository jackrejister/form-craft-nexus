
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { toast } from "@/components/ui/use-toast";
import { User, Mail, Phone, MapPin, Building, Calendar } from "lucide-react";

const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    name: "John Doe",
    email: "john.doe@example.com",
    phone: "+1 (555) 123-4567",
    company: "Acme Inc.",
    location: "San Francisco, CA",
    bio: "Form builder and UX designer with over 8 years of experience creating intuitive digital experiences.",
    joinDate: "January 2023",
  });

  const handleSaveProfile = () => {
    toast({
      title: "Profile updated",
      description: "Your profile has been updated successfully.",
    });
    setIsEditing(false);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">My Profile</h1>
          <p className="text-muted-foreground">
            Manage your account information and preferences
          </p>
        </div>
        <div>
          {isEditing ? (
            <div className="flex gap-2">
              <Button variant="outline" onClick={() => setIsEditing(false)}>
                Cancel
              </Button>
              <Button onClick={handleSaveProfile}>Save Changes</Button>
            </div>
          ) : (
            <Button onClick={() => setIsEditing(true)}>Edit Profile</Button>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="md:col-span-2 overflow-hidden">
          <CardHeader>
            <CardTitle>Profile Information</CardTitle>
            <CardDescription>
              Manage your personal information
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-medium">Full Name</label>
                {isEditing ? (
                  <Input
                    value={profileData.name}
                    onChange={(e) =>
                      setProfileData({ ...profileData, name: e.target.value })
                    }
                  />
                ) : (
                  <div className="flex items-center gap-2">
                    <User className="h-4 w-4 text-muted-foreground" />
                    <span>{profileData.name}</span>
                  </div>
                )}
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Email Address</label>
                {isEditing ? (
                  <Input
                    type="email"
                    value={profileData.email}
                    onChange={(e) =>
                      setProfileData({ ...profileData, email: e.target.value })
                    }
                  />
                ) : (
                  <div className="flex items-center gap-2">
                    <Mail className="h-4 w-4 text-muted-foreground" />
                    <span>{profileData.email}</span>
                  </div>
                )}
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Phone Number</label>
                {isEditing ? (
                  <Input
                    value={profileData.phone}
                    onChange={(e) =>
                      setProfileData({ ...profileData, phone: e.target.value })
                    }
                  />
                ) : (
                  <div className="flex items-center gap-2">
                    <Phone className="h-4 w-4 text-muted-foreground" />
                    <span>{profileData.phone}</span>
                  </div>
                )}
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Company</label>
                {isEditing ? (
                  <Input
                    value={profileData.company}
                    onChange={(e) =>
                      setProfileData({
                        ...profileData,
                        company: e.target.value,
                      })
                    }
                  />
                ) : (
                  <div className="flex items-center gap-2">
                    <Building className="h-4 w-4 text-muted-foreground" />
                    <span>{profileData.company}</span>
                  </div>
                )}
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Location</label>
                {isEditing ? (
                  <Input
                    value={profileData.location}
                    onChange={(e) =>
                      setProfileData({
                        ...profileData,
                        location: e.target.value,
                      })
                    }
                  />
                ) : (
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-muted-foreground" />
                    <span>{profileData.location}</span>
                  </div>
                )}
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Joined</label>
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <span>{profileData.joinDate}</span>
                </div>
              </div>
            </div>

            <Separator />

            <div className="space-y-2">
              <label className="text-sm font-medium">Bio</label>
              {isEditing ? (
                <Textarea
                  value={profileData.bio}
                  onChange={(e) =>
                    setProfileData({ ...profileData, bio: e.target.value })
                  }
                  rows={4}
                />
              ) : (
                <p className="text-sm">{profileData.bio}</p>
              )}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Profile Picture</CardTitle>
            <CardDescription>
              Update your profile photo
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col items-center space-y-4">
            <Avatar className="h-32 w-32">
              <AvatarImage src="/placeholder.svg" alt="Profile picture" />
              <AvatarFallback>JD</AvatarFallback>
            </Avatar>

            {isEditing && (
              <Button variant="outline">Upload New Picture</Button>
            )}
          </CardContent>
          <CardFooter className="flex flex-col space-y-2">
            <div className="text-sm text-muted-foreground">
              Recommended: Square image, at least 200x200px
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default Profile;
