import {
    Home,
    Inbox,
    Calendar,
    Search,
    Settings,
    User2,
    ChevronUp,
    Plus,
    Shirt,
    User,
    ShoppingBasket,
    Projector,
    ChevronDown,
} from 'lucide-react';
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupAction,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuBadge,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarMenuSub,
    SidebarMenuSubButton,
    SidebarMenuSubItem,
    SidebarSeparator,
} from '@/components/ui/sidebar';
import Link from 'next/link';
import Image from 'next/image';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from './ui/collapsible';
import { Sheet, SheetTrigger } from './ui/sheet';
import { Button } from './ui/button';
import EditUser from './EditUser';
import AddOrder from './AddOrder';
import AddUser from './AddUser';
import AddCategory from './AddCategory';
import AddProduct from './AddProduct';

const items = [
    {
        title: 'Home',
        url: '/',
        icon: Home,
    },
    {
        title: 'Inbox',
        url: '#',
        icon: Inbox,
    },
    {
        title: 'Calendar',
        url: '#',
        icon: Calendar,
    },
    {
        title: 'Search',
        url: '#',
        icon: Search,
    },
    {
        title: 'Settings',
        url: '#',
        icon: Settings,
    },
];

const AppSidebar = () => {
    return (
        <Sidebar collapsible="icon">
            <SidebarHeader className="py-4">
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton asChild>
                            <Link href="/">
                                <Image src="/logo.svg" alt="logo" width={20} height={20} />
                                <span>TAMNGUYEN</span>
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarSeparator />

            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupLabel>Application</SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {items.map((item) => (
                                <SidebarMenuItem key={item.title}>
                                    <SidebarMenuButton asChild>
                                        <Link href={item.url}>
                                            <item.icon />
                                            <span>{item.title}</span>
                                        </Link>
                                    </SidebarMenuButton>
                                    {item.title === 'Inbox' && <SidebarMenuBadge>20</SidebarMenuBadge>}
                                </SidebarMenuItem>
                            ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>

                {/* Users Collapsible */}
                <Collapsible defaultOpen className="group/collapsible">
                    <SidebarGroup>
                        <SidebarGroupLabel asChild>
                            <CollapsibleTrigger>
                                Users
                                <ChevronDown className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-180" />
                            </CollapsibleTrigger>
                        </SidebarGroupLabel>
                        <CollapsibleContent>
                            <SidebarGroupContent>
                                <SidebarMenu>
                                    <SidebarMenuItem>
                                        <SidebarMenuButton asChild>
                                            <Link href="/users">
                                                <User />
                                                See All Users
                                            </Link>
                                        </SidebarMenuButton>
                                    </SidebarMenuItem>
                                    <SidebarMenuItem>
                                        <SidebarMenuButton asChild>
                                            <Sheet>
                                                <SheetTrigger asChild>
                                                    <SidebarMenuButton asChild>
                                                        <Link href="#">
                                                            <Plus />
                                                            Add User
                                                        </Link>
                                                    </SidebarMenuButton>
                                                </SheetTrigger>

                                                <AddUser />
                                            </Sheet>
                                        </SidebarMenuButton>
                                    </SidebarMenuItem>
                                </SidebarMenu>
                            </SidebarGroupContent>
                        </CollapsibleContent>
                    </SidebarGroup>
                </Collapsible>

                {/* Products Collapsible */}
                <Collapsible defaultOpen className="group/collapsible">
                    <SidebarGroup>
                        <SidebarGroupLabel asChild>
                            <CollapsibleTrigger>
                                Products
                                <ChevronDown className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-180" />
                            </CollapsibleTrigger>
                        </SidebarGroupLabel>
                        <CollapsibleContent>
                            <SidebarGroupContent>
                                <SidebarMenu>
                                    <SidebarMenuItem>
                                        <SidebarMenuButton asChild>
                                            <Link href="/products">
                                                <Shirt />
                                                See All Products
                                            </Link>
                                        </SidebarMenuButton>
                                    </SidebarMenuItem>
                                    <SidebarMenuItem>
                                        <SidebarMenuButton asChild>
                                            <Sheet>
                                                <SheetTrigger asChild>
                                                    <SidebarMenuButton asChild>
                                                        <Link href="#">
                                                            <Plus />
                                                            Add Product
                                                        </Link>
                                                    </SidebarMenuButton>
                                                </SheetTrigger>

                                                <AddProduct />
                                            </Sheet>
                                        </SidebarMenuButton>
                                    </SidebarMenuItem>
                                    <SidebarMenuItem>
                                        <SidebarMenuButton asChild>
                                            <Sheet>
                                                <SheetTrigger asChild>
                                                    <SidebarMenuButton asChild>
                                                        <Link href="#">
                                                            <Plus />
                                                            Add Category
                                                        </Link>
                                                    </SidebarMenuButton>
                                                </SheetTrigger>

                                                <AddCategory />
                                            </Sheet>
                                        </SidebarMenuButton>
                                    </SidebarMenuItem>
                                </SidebarMenu>
                            </SidebarGroupContent>
                        </CollapsibleContent>
                    </SidebarGroup>
                </Collapsible>

                {/* Orders Collapsible */}
                <Collapsible defaultOpen className="group/collapsible">
                    <SidebarGroup>
                        <SidebarGroupLabel asChild>
                            <CollapsibleTrigger>
                                Orders
                                <ChevronDown className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-180" />
                            </CollapsibleTrigger>
                        </SidebarGroupLabel>
                        <CollapsibleContent>
                            <SidebarGroupContent>
                                <SidebarMenu>
                                    <SidebarMenuItem>
                                        <SidebarMenuButton asChild>
                                            <Link href="/orders">
                                                <ShoppingBasket />
                                                See All Orders
                                            </Link>
                                        </SidebarMenuButton>
                                    </SidebarMenuItem>
                                    <SidebarMenuItem>
                                        <SidebarMenuButton asChild>
                                            <Sheet>
                                                <SheetTrigger asChild>
                                                    <SidebarMenuButton asChild>
                                                        <Link href="#">
                                                            <Plus />
                                                            Add Order
                                                        </Link>
                                                    </SidebarMenuButton>
                                                </SheetTrigger>

                                                <AddOrder />
                                            </Sheet>
                                        </SidebarMenuButton>
                                    </SidebarMenuItem>
                                </SidebarMenu>
                            </SidebarGroupContent>
                        </CollapsibleContent>
                    </SidebarGroup>
                </Collapsible>
            </SidebarContent>
            <SidebarFooter>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <SidebarMenuButton>
                                    <User2 />
                                    Tam Nguyen
                                    <ChevronUp className="ml-auto" />
                                </SidebarMenuButton>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                                <DropdownMenuItem>Profile</DropdownMenuItem>
                                <DropdownMenuItem>Settings</DropdownMenuItem>
                                <DropdownMenuItem variant="destructive">Logout</DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarFooter>
        </Sidebar>
    );
};

export default AppSidebar;

{
    /* <SidebarGroup>
<SidebarGroupLabel>Projects</SidebarGroupLabel>
<SidebarGroupAction>
<Plus /> <span className="sr-only">Add Project</span>
</SidebarGroupAction>
<SidebarGroupContent>
<SidebarMenu>
    <SidebarMenuItem>
        <SidebarMenuButton asChild>
            <Link href="/#">
                <Projector />
                See All Projects
            </Link>
        </SidebarMenuButton>
    </SidebarMenuItem>
    <SidebarMenuItem>
        <SidebarMenuButton asChild>
            <Link href="/#">
                <Plus />
                Add Project
            </Link>
        </SidebarMenuButton>
    </SidebarMenuItem>
</SidebarMenu>
</SidebarGroupContent>
</SidebarGroup> */
}

/* Nested */
// <SidebarGroup>
//     <SidebarGroupLabel>Nested Items</SidebarGroupLabel>
//     <SidebarGroupContent>
//         <SidebarMenu>
//             <SidebarMenuItem>
//                 <SidebarMenuButton asChild>
//                     <Link href="/#">
//                         <Projector />
//                         See All Projects
//                     </Link>
//                 </SidebarMenuButton>
//                 <SidebarMenuSub>
//                     <SidebarMenuSubItem>
//                         <SidebarMenuSubButton asChild>
//                             <Link href="/#">
//                                 <Plus />
//                                 Add Project Nested
//                             </Link>
//                         </SidebarMenuSubButton>
//                     </SidebarMenuSubItem>
//                 </SidebarMenuSub>
//             </SidebarMenuItem>
//         </SidebarMenu>
//     </SidebarGroupContent>
// </SidebarGroup>
// {/* Nested Collapsible */}
// <SidebarMenu>
//     <Collapsible defaultOpen className="group/collapsible">
//         <SidebarGroup>
//             <SidebarGroupLabel asChild>
//                 <CollapsibleTrigger>
//                     Nested Collapsible
//                     <ChevronDown className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-180" />
//                 </CollapsibleTrigger>
//             </SidebarGroupLabel>
//             <CollapsibleContent>
//                 <SidebarGroupContent>
//                     <SidebarMenu>
//                         <SidebarMenuItem>
//                             <SidebarMenuButton asChild>
//                                 <Link href="/#">
//                                     <Projector />
//                                     See All Projects
//                                 </Link>
//                             </SidebarMenuButton>
//                             <SidebarMenuSub>
//                                 <SidebarMenuSubItem>
//                                     <SidebarMenuSubButton asChild>
//                                         <Link href="/#">
//                                             <Plus />
//                                             Add Project
//                                         </Link>
//                                     </SidebarMenuSubButton>
//                                 </SidebarMenuSubItem>
//                             </SidebarMenuSub>
//                         </SidebarMenuItem>
//                         <SidebarMenuItem>
//                             <SidebarMenuButton asChild>
//                                 <Link href="/#">
//                                     <Plus />
//                                     Add Project
//                                 </Link>
//                             </SidebarMenuButton>
//                         </SidebarMenuItem>
//                     </SidebarMenu>
//                 </SidebarGroupContent>
//             </CollapsibleContent>
//         </SidebarGroup>
//     </Collapsible>
// </SidebarMenu>
