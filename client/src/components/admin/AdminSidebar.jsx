
import { LayoutDashboardIcon, ListCollapseIcon, ListIcon, PlusSquareIcon, UsersIcon } from 'lucide-react'
import React from 'react'
import { NavLink } from 'react-router-dom'
import { useUser } from '@clerk/clerk-react'

const AdminSidebar = () => {
    const { user, isLoaded } = useUser();

    const adminNavlinks = [
        { name: 'Dashboard', path: '/admin', icon: LayoutDashboardIcon },
        { name: 'Add Shows', path: '/admin/add-shows', icon: PlusSquareIcon },
        { name: 'List Shows', path: '/admin/list-shows', icon: ListIcon },
        { name: 'List Bookings', path: '/admin/list-bookings', icon: ListCollapseIcon },
        { name: 'Users', path: '/admin/users', icon: UsersIcon }, 
    ]

    if (!isLoaded) {
        return (
            <div className='h-[calc(100vh-64px)] flex items-center justify-center'>
                <p className='text-gray-400'>Loading...</p>
            </div>
        );
    }

    return (
        <div className='h-[calc(100vh-64px)] md:flex flex-col items-center pt-8 max-w-13 md:max-w-60 w-full border-r border-gray-300/20 text-sm'>
            {/*  Use Clerk user data */}
            <img 
                className='h-9 md:h-14 w-9 md:w-14 rounded-full mx-auto object-cover border-2 border-red-500' 
                src={user?.imageUrl || 'https://via.placeholder.com/150'} 
                alt="admin" 
            />
            <p className='mt-2 text-base max-md:hidden text-white font-semibold'>
                {user?.firstName} {user?.lastName}
            </p>
            <p className='text-xs text-gray-400 max-md:hidden'>
                {user?.primaryEmailAddress?.emailAddress}
            </p>
            
            <div className='w-full mt-6'>
                {adminNavlinks.map((link, index) => (
                    <NavLink 
                        key={index} 
                        to={link.path} 
                        end 
                        className={({ isActive }) => 
                            `relative flex items-center max-md:justify-center gap-2 w-full py-2.5 md:pl-10 text-gray-400 hover:bg-gray-800 transition ${isActive && 'bg-primary/15 text-primary group'}`
                        }
                    >
                        {({ isActive }) => (
                            <>
                                <link.icon className="w-5 h-5" />
                                <p className="max-md:hidden">{link.name}</p>
                                <span className={`w-1.5 h-10 rounded-l right-0 absolute ${isActive && 'bg-primary'}`} />
                            </>
                        )}
                    </NavLink>
                ))}
            </div>
        </div>
    )
}

export default AdminSidebar