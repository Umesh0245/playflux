import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { MainLayout } from "@/components/MainLayout";
import { BackButton } from "@/components/BackButton";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useUserStore, Address } from "@/lib/user-store";
import { useToast } from "@/hooks/use-toast";
import { Package, MapPin, User as UserIcon, Edit, Save, X, Mail, Phone, Plus, Trash2, Check } from "lucide-react";

const Profile = () => {
  const navigate = useNavigate();
  const { user, orders, updateUser, addAddress, updateAddress, deleteAddress, setDefaultAddress } = useUserStore();
  const { toast } = useToast();
  const [isEditing, setIsEditing] = useState(false);
  const [isAddressDialogOpen, setIsAddressDialogOpen] = useState(false);
  const [editingAddressId, setEditingAddressId] = useState<string | null>(null);
  
  // Form state for personal info
  const [formData, setFormData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    phone: user?.phone || "",
    avatar: user?.avatar || "",
  });

  // Form state for address
  const [addressForm, setAddressForm] = useState<Omit<Address, 'id'>>({
    label: "",
    fullName: "",
    phone: "",
    addressLine1: "",
    addressLine2: "",
    city: "",
    state: "",
    zipCode: "",
    country: "",
    isDefault: false,
  });

  if (!user) {
    navigate("/login");
    return null;
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleAddressInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAddressForm({
      ...addressForm,
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
      avatar: user?.avatar || "",
    });
    setIsEditing(false);
  };

  const handleAddAddress = () => {
    if (editingAddressId) {
      updateAddress(editingAddressId, addressForm);
      toast({
        title: "Address Updated",
        description: "Your address has been updated successfully.",
      });
    } else {
      addAddress(addressForm);
      toast({
        title: "Address Added",
        description: "New address has been added to your profile.",
      });
    }
    resetAddressForm();
    setIsAddressDialogOpen(false);
  };

  const resetAddressForm = () => {
    setAddressForm({
      label: "",
      fullName: "",
      phone: "",
      addressLine1: "",
      addressLine2: "",
      city: "",
      state: "",
      zipCode: "",
      country: "",
      isDefault: false,
    });
    setEditingAddressId(null);
  };

  const handleEditAddress = (address: Address) => {
    setAddressForm({
      label: address.label,
      fullName: address.fullName,
      phone: address.phone,
      addressLine1: address.addressLine1,
      addressLine2: address.addressLine2 || "",
      city: address.city,
      state: address.state,
      zipCode: address.zipCode,
      country: address.country,
      isDefault: address.isDefault,
    });
    setEditingAddressId(address.id);
    setIsAddressDialogOpen(true);
  };

  const handleDeleteAddress = (id: string) => {
    deleteAddress(id);
    toast({
      title: "Address Deleted",
      description: "Address has been removed from your profile.",
    });
  };

  const handleSetDefault = (id: string) => {
    setDefaultAddress(id);
    toast({
      title: "Default Address Updated",
      description: "This address is now your default shipping address.",
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "delivered":
        return "bg-green-500 hover:bg-green-600";
      case "shipped":
        return "bg-blue-500 hover:bg-blue-600";
      case "processing":
        return "bg-yellow-500 hover:bg-yellow-600";
      default:
        return "bg-gray-500 hover:bg-gray-600";
    }
  };

  const addresses = user.addresses || [];

  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <BackButton />
        
        {/* Profile Header */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
          <div className="flex items-start gap-6">
            {formData.avatar && (
              <img
                src={formData.avatar}
                alt={formData.name}
                className="w-28 h-28 rounded-full border-4 border-black shadow-xl"
              />
            )}
            <div className="flex-1">
              <h1 className="text-4xl font-bold text-black mb-2">{user.name}</h1>
              <p className="text-gray-600 text-lg mb-4">{user.email}</p>
              <div className="flex gap-3">
                {!isEditing && (
                  <Button
                    onClick={() => setIsEditing(true)}
                    className="bg-black text-white hover:bg-gray-800"
                  >
                    <Edit className="mr-2 h-4 w-4" />
                    Edit Profile
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>

        <Tabs defaultValue="orders" className="space-y-6">
          <TabsList className="bg-white border-2 border-gray-200 p-1">
            <TabsTrigger 
              value="orders" 
              className="data-[state=active]:bg-black data-[state=active]:text-white text-black"
            >
              <Package className="mr-2 h-4 w-4" />
              My Orders
            </TabsTrigger>
            <TabsTrigger 
              value="account" 
              className="data-[state=active]:bg-black data-[state=active]:text-white text-black"
            >
              <UserIcon className="mr-2 h-4 w-4" />
              Account Details
            </TabsTrigger>
            <TabsTrigger 
              value="addresses" 
              className="data-[state=active]:bg-black data-[state=active]:text-white text-black"
            >
              <MapPin className="mr-2 h-4 w-4" />
              Addresses
            </TabsTrigger>
          </TabsList>

          {/* Orders Tab */}
          <TabsContent value="orders" className="space-y-4">
            {orders.length === 0 ? (
              <Card className="bg-white border-2 border-gray-200 text-center p-12">
                <Package className="h-16 w-16 mx-auto mb-4 text-gray-400" />
                <h3 className="text-xl font-semibold mb-2 text-black">No orders yet</h3>
                <p className="text-gray-600 mb-6">
                  Start shopping to see your orders here
                </p>
                <Button 
                  onClick={() => navigate("/products")} 
                  className="bg-black text-white hover:bg-gray-800"
                  size="lg"
                >
                  Browse Products
                </Button>
              </Card>
            ) : (
              orders.map((order) => (
                <Card key={order.id} className="bg-white border-2 border-gray-200 hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle className="text-xl mb-2 text-black">Order #{order.id}</CardTitle>
                        <p className="text-sm text-gray-600">
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
                        <div key={item.id} className="flex items-center gap-4 p-3 bg-gray-50 rounded-lg">
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-16 h-16 object-cover rounded-lg"
                          />
                          <div className="flex-1">
                            <p className="font-semibold text-black">{item.name}</p>
                            <p className="text-sm text-gray-600">
                              Quantity: {item.quantity}
                            </p>
                          </div>
                          <p className="font-bold text-black">
                            ${(item.price * item.quantity).toFixed(2)}
                          </p>
                        </div>
                      ))}
                    </div>
                    <Separator className="my-4 bg-gray-200" />
                    <div className="flex justify-between items-center">
                      <span className="font-semibold text-black">Total</span>
                      <span className="text-2xl font-bold text-black">
                        ${order.total.toFixed(2)}
                      </span>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </TabsContent>

          {/* Account Details Tab */}
          <TabsContent value="account" className="space-y-6">
            <Card className="bg-white border-2 border-gray-200">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-2xl text-black">Personal Information</CardTitle>
                  {isEditing && (
                    <div className="flex gap-2">
                      <Button
                        onClick={handleSave}
                        className="bg-green-600 hover:bg-green-700 text-white"
                      >
                        <Save className="mr-2 h-4 w-4" />
                        Save Changes
                      </Button>
                      <Button
                        onClick={handleCancel}
                        variant="outline"
                        className="border-2 border-red-600 text-red-600 hover:bg-red-50"
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
                  {/* Full Name */}
                  <div>
                    <Label htmlFor="name" className="flex items-center gap-2 mb-2 text-black font-semibold">
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
                        className="border-2 border-gray-200 focus:border-black"
                      />
                    ) : (
                      <p className="text-gray-700 bg-gray-50 p-3 rounded-lg">{formData.name}</p>
                    )}
                  </div>

                  {/* Email */}
                  <div>
                    <Label htmlFor="email" className="flex items-center gap-2 mb-2 text-black font-semibold">
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
                        className="border-2 border-gray-200 focus:border-black"
                      />
                    ) : (
                      <p className="text-gray-700 bg-gray-50 p-3 rounded-lg">{formData.email}</p>
                    )}
                  </div>

                  {/* Phone */}
                  <div>
                    <Label htmlFor="phone" className="flex items-center gap-2 mb-2 text-black font-semibold">
                      <Phone className="h-4 w-4" />
                      Phone Number
                    </Label>
                    {isEditing ? (
                      <Input
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        placeholder="+1 (555) 123-4567"
                        className="border-2 border-gray-200 focus:border-black"
                      />
                    ) : (
                      <p className="text-gray-700 bg-gray-50 p-3 rounded-lg">{formData.phone || "Not set"}</p>
                    )}
                  </div>

                  {/* Avatar URL */}
                  <div>
                    <Label htmlFor="avatar" className="flex items-center gap-2 mb-2 text-black font-semibold">
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
                        className="border-2 border-gray-200 focus:border-black"
                      />
                    ) : (
                      <p className="text-gray-700 bg-gray-50 p-3 rounded-lg truncate">{formData.avatar || "Not set"}</p>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Addresses Tab */}
          <TabsContent value="addresses" className="space-y-4">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold text-black">Saved Addresses</h2>
              <Dialog open={isAddressDialogOpen} onOpenChange={(open) => {
                setIsAddressDialogOpen(open);
                if (!open) resetAddressForm();
              }}>
                <DialogTrigger asChild>
                  <Button className="bg-black text-white hover:bg-gray-800">
                    <Plus className="mr-2 h-4 w-4" />
                    Add New Address
                  </Button>
                </DialogTrigger>
                <DialogContent className="bg-white max-w-2xl max-h-[90vh] overflow-y-auto">
                  <DialogHeader>
                    <DialogTitle className="text-2xl text-black">
                      {editingAddressId ? "Edit Address" : "Add New Address"}
                    </DialogTitle>
                    <DialogDescription className="text-gray-600">
                      Fill in the details below to {editingAddressId ? "update" : "add"} your address.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="label" className="text-black font-semibold">Address Label *</Label>
                        <Input
                          id="label"
                          name="label"
                          value={addressForm.label}
                          onChange={handleAddressInputChange}
                          placeholder="Home, Work, Office..."
                          className="border-2 border-gray-200 focus:border-black mt-1"
                        />
                      </div>
                      <div>
                        <Label htmlFor="fullName" className="text-black font-semibold">Full Name *</Label>
                        <Input
                          id="fullName"
                          name="fullName"
                          value={addressForm.fullName}
                          onChange={handleAddressInputChange}
                          placeholder="John Doe"
                          className="border-2 border-gray-200 focus:border-black mt-1"
                        />
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="phone" className="text-black font-semibold">Phone Number *</Label>
                      <Input
                        id="phone"
                        name="phone"
                        value={addressForm.phone}
                        onChange={handleAddressInputChange}
                        placeholder="+1 (555) 123-4567"
                        className="border-2 border-gray-200 focus:border-black mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor="addressLine1" className="text-black font-semibold">Address Line 1 *</Label>
                      <Input
                        id="addressLine1"
                        name="addressLine1"
                        value={addressForm.addressLine1}
                        onChange={handleAddressInputChange}
                        placeholder="Street address, P.O. box"
                        className="border-2 border-gray-200 focus:border-black mt-1"
                        />
                    </div>
                    <div>
                      <Label htmlFor="addressLine2" className="text-black font-semibold">Address Line 2</Label>
                      <Input
                        id="addressLine2"
                        name="addressLine2"
                        value={addressForm.addressLine2}
                        onChange={handleAddressInputChange}
                        placeholder="Apartment, suite, unit, building, floor, etc."
                        className="border-2 border-gray-200 focus:border-black mt-1"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="city" className="text-black font-semibold">City *</Label>
                        <Input
                          id="city"
                          name="city"
                          value={addressForm.city}
                          onChange={handleAddressInputChange}
                          placeholder="New York"
                          className="border-2 border-gray-200 focus:border-black mt-1"
                        />
                      </div>
                      <div>
                        <Label htmlFor="state" className="text-black font-semibold">State *</Label>
                        <Input
                          id="state"
                          name="state"
                          value={addressForm.state}
                          onChange={handleAddressInputChange}
                          placeholder="NY"
                          className="border-2 border-gray-200 focus:border-black mt-1"
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="zipCode" className="text-black font-semibold">ZIP Code *</Label>
                        <Input
                          id="zipCode"
                          name="zipCode"
                          value={addressForm.zipCode}
                          onChange={handleAddressInputChange}
                          placeholder="10001"
                          className="border-2 border-gray-200 focus:border-black mt-1"
                        />
                      </div>
                      <div>
                        <Label htmlFor="country" className="text-black font-semibold">Country *</Label>
                        <Input
                          id="country"
                          name="country"
                          value={addressForm.country}
                          onChange={handleAddressInputChange}
                          placeholder="United States"
                          className="border-2 border-gray-200 focus:border-black mt-1"
                        />
                      </div>
                    </div>
                    <div className="flex items-center space-x-2 pt-2">
                      <input
                        type="checkbox"
                        id="isDefault"
                        checked={addressForm.isDefault}
                        onChange={(e) => setAddressForm({ ...addressForm, isDefault: e.target.checked })}
                        className="w-4 h-4 rounded border-2 border-gray-300"
                      />
                      <Label htmlFor="isDefault" className="text-black font-semibold cursor-pointer">
                        Set as default address
                      </Label>
                    </div>
                  </div>
                  <DialogFooter>
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => {
                        setIsAddressDialogOpen(false);
                        resetAddressForm();
                      }}
                      className="border-2 border-gray-300"
                    >
                      Cancel
                    </Button>
                    <Button
                      type="button"
                      onClick={handleAddAddress}
                      className="bg-black text-white hover:bg-gray-800"
                    >
                      {editingAddressId ? "Update Address" : "Add Address"}
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>

            {addresses.length === 0 ? (
              <Card className="bg-white border-2 border-gray-200 text-center p-12">
                <MapPin className="h-16 w-16 mx-auto mb-4 text-gray-400" />
                <h3 className="text-xl font-semibold mb-2 text-black">No addresses saved</h3>
                <p className="text-gray-600 mb-6">
                  Add your first address for faster checkout
                </p>
              </Card>
            ) : (
              <div className="grid md:grid-cols-2 gap-4">
                {addresses.map((address) => (
                  <Card key={address.id} className={`bg-white border-2 ${address.isDefault ? 'border-black shadow-lg' : 'border-gray-200'} hover:shadow-md transition-shadow`}>
                    <CardContent className="p-6">
                      <div className="flex justify-between items-start mb-4">
                        <div className="flex items-center gap-2">
                          <Badge className="bg-black text-white hover:bg-gray-800">
                            {address.label}
                          </Badge>
                          {address.isDefault && (
                            <Badge className="bg-green-600 text-white hover:bg-green-700">
                              <Check className="h-3 w-3 mr-1" />
                              Default
                            </Badge>
                          )}
                        </div>
                        <div className="flex gap-2">
                          <Button
                            size="icon"
                            variant="ghost"
                            onClick={() => handleEditAddress(address)}
                            className="hover:bg-gray-100 text-black"
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            size="icon"
                            variant="ghost"
                            onClick={() => handleDeleteAddress(address.id)}
                            className="hover:bg-red-50 text-red-600"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                      <div className="space-y-2 text-gray-700">
                        <p className="font-semibold text-black">{address.fullName}</p>
                        <p>{address.addressLine1}</p>
                        {address.addressLine2 && <p>{address.addressLine2}</p>}
                        <p>{address.city}, {address.state} {address.zipCode}</p>
                        <p>{address.country}</p>
                        <p className="flex items-center gap-1">
                          <Phone className="h-3 w-3" />
                          {address.phone}
                        </p>
                      </div>
                      {!address.isDefault && (
                        <Button
                          onClick={() => handleSetDefault(address.id)}
                          variant="outline"
                          className="w-full mt-4 border-2 border-black text-black hover:bg-black hover:text-white"
                        >
                          Set as Default
                        </Button>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
};

export default Profile;
