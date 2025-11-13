import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { MainLayout } from "@/components/MainLayout";
import { BackButton } from "@/components/BackButton";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useUserStore } from "@/lib/user-store";
import { useToast } from "@/hooks/use-toast";
import { Package, MapPin, User as UserIcon, Edit, Save, X, Mail, Phone, Calendar, MapPinned } from "lucide-react";

const Profile = () => {
  const navigate = useNavigate();
  const { user, orders, updateUser } = useUserStore();
  const { toast } = useToast();
  const [isEditing, setIsEditing] = useState(false);
  
  // Form state
  const [formData, setFormData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    phone: user?.phone || "",
    address: user?.address || "",
    city: user?.city || "",
    state: user?.state || "",
    zipCode: user?.zipCode || "",
    country: user?.country || "",
    bio: user?.bio || "",
    dateOfBirth: user?.dateOfBirth || "",
    avatar: user?.avatar || "",
  });

  if (!user) {
    navigate("/login");
    return null;
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSave = () => {
    updateUser(formData);
    setIsEditing(false);
    toast({
      title: "Profile Updated",
      description: "Your profile information has been saved successfully.",
    });
  };

  const handleCancel = () => {
    setFormData({
      name: user?.name || "",
      email: user?.email || "",
      phone: user?.phone || "",
      address: user?.address || "",
      city: user?.city || "",
      state: user?.state || "",
      zipCode: user?.zipCode || "",
      country: user?.country || "",
      bio: user?.bio || "",
      dateOfBirth: user?.dateOfBirth || "",
      avatar: user?.avatar || "",
    });
    setIsEditing(false);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "delivered":
        return "bg-green-500";
      case "shipped":
        return "bg-blue-500";
      case "processing":
        return "bg-yellow-500";
      default:
        return "bg-gray-500";
    }
  };

  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <BackButton />
        <div className="flex items-center gap-4 mb-8">
          {formData.avatar && (
            <img
              src={formData.avatar}
              alt={formData.name}
              className="w-24 h-24 rounded-full border-4 border-primary shadow-xl"
            />
          )}
          <div className="flex-1">
            <h1 className="text-5xl font-bold">
              <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                {user.name}
              </span>
            </h1>
            <p className="text-gray-300 text-lg mt-1">{user.email}</p>
          </div>
          {!isEditing && (
            <Button
              onClick={() => setIsEditing(true)}
              className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600"
              size="lg"
            >
              <Edit className="mr-2 h-5 w-5" />
              Edit Profile
            </Button>
          )}
        </div>

        <Tabs defaultValue="orders" className="space-y-6">
          <TabsList className="glass border-2">
            <TabsTrigger value="orders" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              <Package className="mr-2 h-4 w-4" />
              My Orders
            </TabsTrigger>
            <TabsTrigger value="account" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              <UserIcon className="mr-2 h-4 w-4" />
              Account Details
            </TabsTrigger>
          </TabsList>

          <TabsContent value="orders" className="space-y-4">
            {orders.length === 0 ? (
              <Card className="glass text-center p-12">
                <Package className="h-16 w-16 mx-auto mb-4 text-gray-300" />
                <h3 className="text-xl font-semibold mb-2">No orders yet</h3>
                <p className="text-gray-300 mb-6">
                  Start shopping to see your orders here
                </p>
                <Button 
                  onClick={() => navigate("/products")} 
                  className="bg-gradient-to-r from-primary to-blue-600 hover:from-primary/90 hover:to-blue-600/90 text-white shadow-lg shadow-primary/50"
                  size="lg"
                >
                  Browse Products
                </Button>
              </Card>
            ) : (
              orders.map((order) => (
                <Card key={order.id} className="glass">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle className="text-xl mb-2">Order #{order.id}</CardTitle>
                        <p className="text-sm text-gray-300">
                          {new Date(order.date).toLocaleDateString("en-US", {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          })}
                        </p>
                      </div>
                      <Badge className={getStatusColor(order.status)}>
                        {order.status.toUpperCase()}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3 mb-4">
                      {order.items.map((item) => (
                        <div key={item.id} className="flex items-center gap-4">
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-16 h-16 object-cover rounded"
                          />
                          <div className="flex-1">
                            <p className="font-medium">{item.name}</p>
                            <p className="text-sm text-gray-300">
                              Quantity: {item.quantity}
                            </p>
                          </div>
                          <p className="font-semibold text-primary">
                            ${(item.price * item.quantity).toFixed(2)}
                          </p>
                        </div>
                      ))}
                    </div>
                    <Separator className="my-4" />
                    <div className="flex justify-between items-center">
                      <span className="font-semibold">Total</span>
                      <span className="text-2xl font-bold text-primary">
                        ${order.total.toFixed(2)}
                      </span>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </TabsContent>

          <TabsContent value="account" className="space-y-6">
            <Card className="glass">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-2xl">Personal Information</CardTitle>
                  {isEditing && (
                    <div className="flex gap-2">
                      <Button
                        onClick={handleSave}
                        className="bg-green-500 hover:bg-green-600"
                      >
                        <Save className="mr-2 h-4 w-4" />
                        Save Changes
                      </Button>
                      <Button
                        onClick={handleCancel}
                        variant="outline"
                        className="border-red-500 text-red-500 hover:bg-red-500/10"
                      >
                        <X className="mr-2 h-4 w-4" />
                        Cancel
                      </Button>
                    </div>
                  )}
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  {/* Avatar URL */}
                  <div className="md:col-span-2">
                    <Label htmlFor="avatar" className="flex items-center gap-2 mb-2">
                      <UserIcon className="h-4 w-4" />
                      Avatar URL
                    </Label>
                    {isEditing ? (
                      <Input
                        id="avatar"
                        name="avatar"
                        value={formData.avatar}
                        onChange={handleInputChange}
                        placeholder="https://example.com/avatar.jpg"
                        className="glass"
                      />
                    ) : (
                      <p className="text-gray-300">{formData.avatar || "Not set"}</p>
                    )}
                  </div>

                  {/* Full Name */}
                  <div>
                    <Label htmlFor="name" className="flex items-center gap-2 mb-2">
                      <UserIcon className="h-4 w-4" />
                      Full Name
                    </Label>
                    {isEditing ? (
                      <Input
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        placeholder="John Doe"
                        className="glass"
                      />
                    ) : (
                      <p className="text-gray-300">{formData.name}</p>
                    )}
                  </div>

                  {/* Email */}
                  <div>
                    <Label htmlFor="email" className="flex items-center gap-2 mb-2">
                      <Mail className="h-4 w-4" />
                      Email Address
                    </Label>
                    {isEditing ? (
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="john@example.com"
                        className="glass"
                      />
                    ) : (
                      <p className="text-gray-300">{formData.email}</p>
                    )}
                  </div>

                  {/* Phone */}
                  <div>
                    <Label htmlFor="phone" className="flex items-center gap-2 mb-2">
                      <Phone className="h-4 w-4" />
                      Phone Number
                    </Label>
                    {isEditing ? (
                      <Input
                        id="phone"
                        name="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={handleInputChange}
                        placeholder="+1 (555) 123-4567"
                        className="glass"
                      />
                    ) : (
                      <p className="text-gray-300">{formData.phone || "Not set"}</p>
                    )}
                  </div>

                  {/* Date of Birth */}
                  <div>
                    <Label htmlFor="dateOfBirth" className="flex items-center gap-2 mb-2">
                      <Calendar className="h-4 w-4" />
                      Date of Birth
                    </Label>
                    {isEditing ? (
                      <Input
                        id="dateOfBirth"
                        name="dateOfBirth"
                        type="date"
                        value={formData.dateOfBirth}
                        onChange={handleInputChange}
                        className="glass"
                      />
                    ) : (
                      <p className="text-gray-300">{formData.dateOfBirth || "Not set"}</p>
                    )}
                  </div>

                  {/* Bio */}
                  <div className="md:col-span-2">
                    <Label htmlFor="bio" className="flex items-center gap-2 mb-2">
                      <UserIcon className="h-4 w-4" />
                      Bio
                    </Label>
                    {isEditing ? (
                      <Textarea
                        id="bio"
                        name="bio"
                        value={formData.bio}
                        onChange={handleInputChange}
                        placeholder="Tell us about yourself..."
                        rows={4}
                        className="glass"
                      />
                    ) : (
                      <p className="text-gray-300">{formData.bio || "Not set"}</p>
                    )}
                  </div>
                </div>

                <div className="pt-6 border-t border-white/10">
                  <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                    <MapPinned className="h-5 w-5" />
                    Address Information
                  </h3>
                  <div className="grid md:grid-cols-2 gap-6">
                    {/* Street Address */}
                    <div className="md:col-span-2">
                      <Label htmlFor="address" className="flex items-center gap-2 mb-2">
                        <MapPin className="h-4 w-4" />
                        Street Address
                      </Label>
                      {isEditing ? (
                        <Input
                          id="address"
                          name="address"
                          value={formData.address}
                          onChange={handleInputChange}
                          placeholder="123 Main St, Apt 4B"
                          className="glass"
                        />
                      ) : (
                        <p className="text-gray-300">{formData.address || "Not set"}</p>
                      )}
                    </div>

                    {/* City */}
                    <div>
                      <Label htmlFor="city" className="mb-2 block">City</Label>
                      {isEditing ? (
                        <Input
                          id="city"
                          name="city"
                          value={formData.city}
                          onChange={handleInputChange}
                          placeholder="San Francisco"
                          className="glass"
                        />
                      ) : (
                        <p className="text-gray-300">{formData.city || "Not set"}</p>
                      )}
                    </div>

                    {/* State */}
                    <div>
                      <Label htmlFor="state" className="mb-2 block">State</Label>
                      {isEditing ? (
                        <Input
                          id="state"
                          name="state"
                          value={formData.state}
                          onChange={handleInputChange}
                          placeholder="CA"
                          className="glass"
                        />
                      ) : (
                        <p className="text-gray-300">{formData.state || "Not set"}</p>
                      )}
                    </div>

                    {/* Zip Code */}
                    <div>
                      <Label htmlFor="zipCode" className="mb-2 block">Zip Code</Label>
                      {isEditing ? (
                        <Input
                          id="zipCode"
                          name="zipCode"
                          value={formData.zipCode}
                          onChange={handleInputChange}
                          placeholder="94105"
                          className="glass"
                        />
                      ) : (
                        <p className="text-gray-300">{formData.zipCode || "Not set"}</p>
                      )}
                    </div>

                    {/* Country */}
                    <div>
                      <Label htmlFor="country" className="mb-2 block">Country</Label>
                      {isEditing ? (
                        <Input
                          id="country"
                          name="country"
                          value={formData.country}
                          onChange={handleInputChange}
                          placeholder="United States"
                          className="glass"
                        />
                      ) : (
                        <p className="text-gray-300">{formData.country || "Not set"}</p>
                      )}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
};

export default Profile;
