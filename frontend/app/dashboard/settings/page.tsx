"use client"

import { useState } from "react"
import { createClient } from "@/utils/supabase/client"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Bell, CreditCard, Lock, User, ShieldAlert } from "lucide-react"

export default function SettingsPage() {
    const [user, setUser] = useState<any>(null)
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [loading, setLoading] = useState(false)

    // Load initial data
    useState(() => {
        const loadUser = async () => {
            const supabase = createClient()
            const { data: { user } } = await supabase.auth.getUser()
            if (user) {
                setUser(user)
                setFirstName(user.user_metadata?.first_name || "")
                setLastName(user.user_metadata?.last_name || "")
            }
        }
        loadUser()
    })

    const handleUpdateProfile = async () => {
        setLoading(true)
        const supabase = createClient()
        const { error } = await supabase.auth.updateUser({
            data: {
                first_name: firstName,
                last_name: lastName
            }
        })

        if (error) {
            alert("Error updating profile")
        } else {
            alert("Profile updated successfully!")
        }
        setLoading(false)
    }

    return (
        <div className="max-w-4xl mx-auto space-y-8">
            <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tight text-neutral-950">Settings</h1>
                <p className="text-neutral-500">Manage your account settings and preferences.</p>
            </div>

            <Tabs defaultValue="account" className="space-y-6">
                <TabsList className="bg-neutral-100 p-1 rounded-xl">
                    <TabsTrigger value="account" className="rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-sm">Account</TabsTrigger>
                    <TabsTrigger value="notifications" className="rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-sm">Notifications</TabsTrigger>
                    <TabsTrigger value="billing" className="rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-sm">Billing</TabsTrigger>
                </TabsList>

                {/* Account Settings */}
                <TabsContent value="account" className="space-y-6">
                    <Card className="border-neutral-200 shadow-sm">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <User className="h-5 w-5 text-amber-500" />
                                General Information
                            </CardTitle>
                            <CardDescription>Update your personal information.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="grid gap-4 md:grid-cols-2">
                                <div className="space-y-2">
                                    <Label htmlFor="firstName">First name</Label>
                                    <Input
                                        id="firstName"
                                        placeholder="Enter your first name"
                                        className="bg-neutral-50 border-neutral-200"
                                        value={firstName}
                                        onChange={(e) => setFirstName(e.target.value)}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="lastName">Last name</Label>
                                    <Input
                                        id="lastName"
                                        placeholder="Enter your last name"
                                        className="bg-neutral-50 border-neutral-200"
                                        value={lastName}
                                        onChange={(e) => setLastName(e.target.value)}
                                    />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="email">Email address</Label>
                                <Input
                                    id="email"
                                    type="email"
                                    className="bg-neutral-50 border-neutral-200"
                                    disabled
                                    value={user?.email || ""}
                                />
                            </div>
                            <Button
                                className="bg-neutral-900 text-white hover:bg-neutral-800 rounded-lg"
                                onClick={handleUpdateProfile}
                                disabled={loading}
                            >
                                {loading ? "Saving..." : "Save Changes"}
                            </Button>
                        </CardContent>
                    </Card>

                    <Card className="border-neutral-200 shadow-sm">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Lock className="h-5 w-5 text-amber-500" />
                                Security
                            </CardTitle>
                            <CardDescription>Manage your password and security settings.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="currentPassword">Current Password</Label>
                                <Input id="currentPassword" type="password" className="bg-neutral-50 border-neutral-200" />
                            </div>
                            <div className="grid gap-4 md:grid-cols-2">
                                <div className="space-y-2">
                                    <Label htmlFor="newPassword">New Password</Label>
                                    <Input id="newPassword" type="password" className="bg-neutral-50 border-neutral-200" />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="confirmPassword">Confirm Password</Label>
                                    <Input id="confirmPassword" type="password" className="bg-neutral-50 border-neutral-200" />
                                </div>
                            </div>
                            <Button variant="outline" className="border-neutral-200">Update Password</Button>
                        </CardContent>
                    </Card>

                    <Card className="border-red-100 bg-red-50/50 shadow-sm">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2 text-red-600">
                                <ShieldAlert className="h-5 w-5" />
                                Danger Zone
                            </CardTitle>
                            <CardDescription>Irreversible actions for your account.</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <Button variant="destructive" className="bg-red-600 hover:bg-red-700 rounded-lg">Delete Account</Button>
                        </CardContent>
                    </Card>
                </TabsContent>

                {/* Notifications Settings */}
                <TabsContent value="notifications" className="space-y-6">
                    <Card className="border-neutral-200 shadow-sm">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Bell className="h-5 w-5 text-amber-500" />
                                Email Notifications
                            </CardTitle>
                            <CardDescription>Choose what you want to be notified about.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div className="flex items-center justify-between space-x-2">
                                <Label htmlFor="marketing-emails" className="flex flex-col space-y-1">
                                    <span>Marketing emails</span>
                                    <span className="font-normal text-xs text-neutral-500">Receive emails about new products, features, and more.</span>
                                </Label>
                                <Switch id="marketing-emails" />
                            </div>
                            <div className="flex items-center justify-between space-x-2">
                                <Label htmlFor="security-emails" className="flex flex-col space-y-1">
                                    <span>Security emails</span>
                                    <span className="font-normal text-xs text-neutral-500">Receive emails about your account security.</span>
                                </Label>
                                <Switch id="security-emails" defaultChecked />
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>

                {/* Billing Settings */}
                <TabsContent value="billing" className="space-y-6">
                    <Card className="border-neutral-200 shadow-sm">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <CreditCard className="h-5 w-5 text-amber-500" />
                                Subscription Plan
                            </CardTitle>
                            <CardDescription>Manage your subscription and billing details.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="p-4 rounded-xl bg-amber-50 border border-amber-100 flex items-center justify-between">
                                <div>
                                    <h4 className="font-bold text-amber-900">Free Plan</h4>
                                    <p className="text-sm text-amber-700">Basic features included.</p>
                                </div>
                                <Button className="bg-amber-400 text-neutral-900 hover:bg-amber-500 rounded-lg font-bold">Upgrade to Pro</Button>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    )
}
