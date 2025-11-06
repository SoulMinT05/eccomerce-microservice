import React from 'react';
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import CardList from '@/components/CardList';
import { HoverCard, HoverCardContent, HoverCardTrigger } from '@/components/ui/hover-card';
import { BadgeCheck, Candy, Citrus, Shield } from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Sheet, SheetTrigger } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

import EditUser from '@/components/EditUser';
import AppLineChart from '@/components/AppLineChart';

const SingleUserPage = () => {
    return (
        <div>
            <Breadcrumb>
                <BreadcrumbList>
                    <BreadcrumbItem>
                        <BreadcrumbLink href="/">Dashboard</BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                        <BreadcrumbLink href="/users">Users</BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                        <BreadcrumbPage>Tam Nguyen</BreadcrumbPage>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>

            {/* Container */}
            <div className="mt-4 flex flex-col xl:flex-row gap-8">
                {/* Left */}
                <div className="w-full xl:w-1/3 space-y-6">
                    {/* User badge container */}
                    <div className="bg-primary-foreground p-4 rounded-lg">
                        <h1 className="text-xl font-semibold">User Badges</h1>
                        <div className="flex gap-4 mt-4">
                            <HoverCard>
                                <HoverCardTrigger>
                                    <BadgeCheck
                                        size={36}
                                        className="rounded-full bg-blue-500/30 border border-blue-500/50 p-2"
                                    />
                                </HoverCardTrigger>
                                <HoverCardContent>
                                    <h1 className="font-bold mb-2">Verified User</h1>
                                    <p className="text-sm text-muted-foreground">
                                        This user has been verified by the admin
                                    </p>
                                </HoverCardContent>
                            </HoverCard>
                            <HoverCard>
                                <HoverCardTrigger>
                                    <Shield
                                        size={36}
                                        className="rounded-full bg-green-800/30 border border-green-800/50 p-2"
                                    />
                                </HoverCardTrigger>
                                <HoverCardContent>
                                    <h1 className="font-bold mb-2">Admin</h1>
                                    <p className="text-sm text-muted-foreground">
                                        Admin users have access to all features and can manage users.
                                    </p>
                                </HoverCardContent>
                            </HoverCard>
                            <HoverCard>
                                <HoverCardTrigger>
                                    <Candy
                                        size={36}
                                        className="rounded-full bg-yellow-500/30 border border-yellow-500/50 p-2"
                                    />
                                </HoverCardTrigger>
                                <HoverCardContent>
                                    <h1 className="font-bold mb-2">Awarded</h1>
                                    <p className="text-sm text-muted-foreground">
                                        This user has been awarded for their contributions.
                                    </p>
                                </HoverCardContent>
                            </HoverCard>
                            <HoverCard>
                                <HoverCardTrigger>
                                    <Citrus
                                        size={36}
                                        className="rounded-full bg-orange-500/30 border border-orange-500/50 p-2"
                                    />
                                </HoverCardTrigger>
                                <HoverCardContent>
                                    <h1 className="font-bold mb-2">Popular</h1>
                                    <p className="text-sm text-muted-foreground">
                                        This user has been popular in the community.
                                    </p>
                                </HoverCardContent>
                            </HoverCard>
                        </div>
                    </div>
                    {/*  USER CARD container */}
                    <div className="bg-primary-foreground p-4 rounded-lg space-y-2">
                        <div className="flex items-center gap-2">
                            <Avatar className="size-12">
                                <AvatarImage src="https://github.com/shadcn.png" />
                                <AvatarFallback>TN</AvatarFallback>
                            </Avatar>
                            <h1 className="text-xl font-semibold">Tam Nguyen</h1>
                        </div>
                        <p className="text-sm text-muted-foreground">
                            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Laboriosam aspernatur cum et
                            dolor. Et tempora repellat deserunt voluptatum molestiae quam incidunt! Et quaerat quia
                            illo?
                        </p>
                    </div>
                    {/*  Information container */}
                    <div className="bg-primary-foreground p-4 rounded-lg">
                        <div className="flex items-center justify-between">
                            <h1 className="text-xl font-semibold">User Information</h1>
                            <Sheet>
                                <SheetTrigger asChild>
                                    <Button>Edit User</Button>
                                </SheetTrigger>

                                <EditUser />
                            </Sheet>
                        </div>

                        <div className="space-y-4 mt-4">
                            <div className="flex flex-col gap-2 mb-8">
                                <p className="text-sm text-muted-foreground">Profile completion</p>
                                <Progress value={33} />
                            </div>
                            <div className="flex items-center gap-2">
                                <span className="font-bold">Full name:</span>
                                <span>Tam Nguyen</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <span className="font-bold">Email:</span>
                                <span>tam.soul05@gmail.com</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <span className="font-bold">Phone:</span>
                                <span>+84 234 92091</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <span className="font-bold">Address:</span>
                                <span>125 Tran Main</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <span className="font-bold">City:</span>
                                <span>Ho Chi Minh, Viet Nam</span>
                            </div>
                        </div>
                        <p className="text-sm text-muted-foreground mt-4">Joined on 2025.05.05</p>
                    </div>
                    {/* Card list container */}
                </div>

                {/* Right */}
                <div className="w-full xl:w-2/3 space-y-6">
                    {/*  CHART container */}
                    <div className="bg-primary-foreground p-4 rounded-lg">
                        <h1 className="text-xl font-semibold mb-4">User Activity</h1>
                        <AppLineChart />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SingleUserPage;
